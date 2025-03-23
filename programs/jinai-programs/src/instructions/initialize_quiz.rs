use anchor_lang::prelude::*;
use anchor_spl::token::{self, Token, TokenAccount};
use crate::state::quiz_account::QuizAccount;

#[derive(Accounts)]
#[instruction(bet_amount: u64, num_questions: u8, quiz_topic: String, time_limit_per_question: u32)]
pub struct InitializeQuiz<'info> {
    #[account(mut)]
    pub host: Signer<'info>,
    
    #[account(
        init,
        payer = host,
        space = QuizAccount::calculate_size(&quiz_topic, num_questions),
        seeds = [b"jinai-quiz", host.key().as_ref()],
        bump
    )]
    pub quiz_account: Account<'info, QuizAccount>,
    
    #[account(
        init,
        payer = host,
        seeds = [b"quiz-token-account", quiz_account.key().as_ref()],
        bump,
        token::mint = quiz_mint,
        token::authority = quiz_account,
    )]
    pub quiz_token_account: Account<'info, TokenAccount>,
    
    pub quiz_mint: Account<'info, token::Mint>,
    pub token_program: Program<'info, Token>,
    pub system_program: Program<'info, System>,
    pub rent: Sysvar<'info, Rent>,
}

pub fn handler(
    ctx: Context<InitializeQuiz>,
    bet_amount: u64,
    num_questions: u8,
    quiz_topic: String,
    time_limit_per_question: u32,
) -> Result<()> {
    let quiz_account = &mut ctx.accounts.quiz_account;
    let host = &ctx.accounts.host;

    // Initialize quiz parameters
    quiz_account.host = host.key();
    quiz_account.bet_amount = bet_amount;
    quiz_account.num_questions = num_questions;
    quiz_account.quiz_topic = quiz_topic;
    quiz_account.time_limit_per_question = time_limit_per_question;
    quiz_account.status = crate::state::quiz_status::QuizStatus::Recruiting;
    quiz_account.players = vec![];
    quiz_account.current_round = 0;
    quiz_account.round_questions = vec![];
    quiz_account.player_scores = vec![];
    quiz_account.pool_amount = 0;


    msg!("Quiz session initialized with ID: {}", quiz_account.key());
    Ok(())
}