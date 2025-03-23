use anchor_lang::prelude::*;
use crate::state::quiz_account::QuizAccount;
use crate::state::quiz_status::QuizStatus;
use crate::state::question::QuizQuestion;
use crate::error::QuizError;

#[derive(Accounts)]
pub struct StartQuiz<'info> {
    #[account(
        constraint = host.key() == quiz_account.host @ QuizError::Unauthorized
    )]
    pub host: Signer<'info>,
    
    #[account(mut)]
    pub quiz_account: Account<'info, QuizAccount>,
    
    pub system_program: Program<'info, System>,
}

pub fn handler(
    ctx: Context<StartQuiz>,
    questions: Vec<QuizQuestion>,
) -> Result<()> {
    let quiz_account = &mut ctx.accounts.quiz_account;
    let host = &ctx.accounts.host;
    
    // Only host can start the quiz
    require!(
        quiz_account.host == host.key(),
        QuizError::Unauthorized
    );
    
    // Quiz must be ready to start
    require!(
        quiz_account.status == QuizStatus::ReadyToStart,
        QuizError::InvalidQuizState
    );
    
    // Need at least 2 players to start
    require!(
        quiz_account.players.len() >= 2,
        QuizError::NotEnoughPlayers
    );

    // Validate questions
    require!(
        questions.len() as u8 == quiz_account.num_questions,
        QuizError::InvalidQuestionCount
    );
    
    // Store the questions and start the first round
    quiz_account.round_questions = questions;
    quiz_account.current_round = 1;
    quiz_account.status = QuizStatus::InProgress;
    
    msg!("Quiz started with {} questions", quiz_account.num_questions);
    Ok(())
}