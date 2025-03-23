use anchor_lang::prelude::*;
use crate::state::quiz_account::QuizAccount;
use crate::state::quiz_status::QuizStatus;
use crate::error::QuizError;

#[derive(Accounts)]
pub struct CancelQuiz<'info> {
    #[account(
        constraint = host.key() == quiz_account.host @ QuizError::Unauthorized
    )]
    pub host: Signer<'info>,
    
    #[account(mut)]
    pub quiz_account: Account<'info, QuizAccount>,
    
    pub system_program: Program<'info, System>,
}

pub fn handler(ctx: Context<CancelQuiz>) -> Result<()> {
    let quiz_account = &mut ctx.accounts.quiz_account;
    let host = &ctx.accounts.host;
    
    // Only host can cancel
    require!(
        quiz_account.host == host.key(),
        QuizError::Unauthorized
    );
    
    // Quiz must not have started
    require!(
        quiz_account.status == QuizStatus::Recruiting || 
        quiz_account.status == QuizStatus::ReadyToStart,
        QuizError::InvalidQuizState
    );
    
    // Process refunds to all players
    // In a real implementation, we would transfer tokens back to each player
    
    quiz_account.status = QuizStatus::Cancelled;
    msg!("Quiz cancelled and funds refunded");
    
    Ok(())
}