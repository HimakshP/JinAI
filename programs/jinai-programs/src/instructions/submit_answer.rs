use anchor_lang::prelude::*;
use crate::state::quiz_account::QuizAccount;
use crate::state::quiz_status::QuizStatus;
use crate::error::QuizError;

#[derive(Accounts)]
pub struct SubmitAnswer<'info> {
    #[account(mut)]
    pub player: Signer<'info>,
    
    #[account(mut)]
    pub quiz_account: Account<'info, QuizAccount>,
    
    pub system_program: Program<'info, System>,
}

pub fn handler(
    ctx: Context<SubmitAnswer>,
    answer_index: u8,
    timestamp: i64,
) -> Result<()> {
    let quiz_account = &mut ctx.accounts.quiz_account;
    let player = &ctx.accounts.player;
    
    // Quiz must be in progress
    require!(
        quiz_account.status == QuizStatus::InProgress,
        QuizError::InvalidQuizState
    );
    
    // Player must be registered
    require!(
        quiz_account.players.contains(&player.key()),
        QuizError::PlayerNotRegistered
    );
    
    // Check if current round is valid
    require!(
        quiz_account.current_round > 0 && 
        quiz_account.current_round <= quiz_account.num_questions as u16,
        QuizError::InvalidRound
    );
    
    // Get current question
    let question_index = (quiz_account.current_round - 1) as usize;
    let current_question = &quiz_account.round_questions[question_index];
    
    // Check if the answer is valid
    require!(
        answer_index < 4, // Assuming 4 options per question
        QuizError::InvalidAnswer
    );
    
    // Check if the answer is within time limit
    let current_time = Clock::get()?.unix_timestamp;
    require!(
        timestamp <= current_time && 
        current_time - timestamp <= quiz_account.time_limit_per_question as i64,
        QuizError::TimeExpired
    );
    
    // Award points if correct
    if answer_index == current_question.correct_answer_index {
        let player_key = player.key();
        let current_score = quiz_account.player_scores.iter().find(|(k, _)| *k == player_key).map(|(_, v)| *v).unwrap_or(0);
        let new_score = current_score + 1;
        if let Some(score) = quiz_account.player_scores.iter_mut().find(|(k, _)| *k == player_key) {
            score.1 = new_score;
        } else {
            quiz_account.player_scores.push((player_key, new_score));
        }
        msg!("Player {} answered correctly! New score: {}", player_key, new_score);
    } else {
        msg!("Player {} answered incorrectly", player.key());
    }
    
    // Everyone has answered or time expired - move to next round
    quiz_account.current_round += 1;
    
    // If all rounds completed, finalize the quiz
    if quiz_account.current_round > quiz_account.num_questions as u16 {
        quiz_account.status = QuizStatus::Completed;
        msg!("Quiz completed! Calculating final results...");
    }
    
    Ok(())
}