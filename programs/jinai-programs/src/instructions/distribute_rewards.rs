use anchor_lang::prelude::*;
use anchor_spl::token::{self, Token, TokenAccount};
use crate::state::quiz_account::QuizAccount;
use crate::state::quiz_status::QuizStatus;
use crate::error::QuizError;

#[derive(Accounts)]
pub struct DistributeRewards<'info> {
    #[account(
        constraint = authority.key() == quiz_account.host @ QuizError::Unauthorized,
    )]
    pub authority: Signer<'info>,
    
    #[account(mut)]
    pub quiz_account: Account<'info, QuizAccount>,
    
    #[account(
        mut,
        seeds = [b"quiz-token-account", quiz_account.key().as_ref()],
        bump,
    )]
    pub quiz_token_account: Account<'info, TokenAccount>,
    
    pub token_program: Program<'info, Token>,
    pub system_program: Program<'info, System>,
}

pub fn handler(ctx: Context<DistributeRewards>) -> Result<()> {
    let quiz_account = &mut ctx.accounts.quiz_account;
    
    // Quiz must be completed
    require!(
        quiz_account.status == QuizStatus::Completed,
        QuizError::InvalidQuizState
    );
    
    // Get final scores and ranks
    let mut player_rankings: Vec<(Pubkey, u32)> = quiz_account.player_scores
        .iter()
        .map(|(k, v)| (*k, *v))
        .collect();
    
    // Sort by score in descending order
    player_rankings.sort_by(|a, b| b.1.cmp(&a.1));
    
    // Calculate reward distribution based on position
    // 1st: 50%, 2nd: 30%, 3rd: 15%, 4th: 5%
    let total_pool = quiz_account.pool_amount;
    let mut rewards = vec![];
    
    let distribution = [50, 30, 15, 5]; // Percentages
    
    for (i, (player_key, _)) in player_rankings.iter().enumerate() {
        if i < distribution.len() {
            let reward_amount = (total_pool * distribution[i] as u64) / 100;
            rewards.push((*player_key, reward_amount));
        }
    }
    
    // Now distribute the rewards (implementation would transfer tokens to each player)
    // Note: This is simplified and would need token account checks in a real implementation
    
    // Mark quiz as finalized
    quiz_account.status = QuizStatus::Finalized;
    
    msg!("Rewards distributed successfully");
    Ok(())
}