use anchor_lang::prelude::*;

declare_id!("GkiKqSVfnU2y4TeUW7up2JS9Z8g1yjGYJ8x2QNf4K6Y");

pub mod state;
pub mod instructions;
pub mod error;

use instructions::*;
use state::*;

#[program]
pub mod jinai_programs {
    use super::*;

    pub fn initialize_quiz(
        ctx: Context<InitializeQuiz>,
        bet_amount: u64,
        num_questions: u8,
        quiz_topic: String,
        time_limit_per_question: u32,
    ) -> Result<()> {
        instructions::initialize_quiz::handler(
            ctx, 
            bet_amount, 
            num_questions, 
            quiz_topic, 
            time_limit_per_question
        )
    }

    pub fn join_quiz(ctx: Context<JoinQuiz>) -> Result<()> {
        instructions::join_quiz::handler(ctx)
    }

    pub fn start_quiz(
        ctx: Context<StartQuiz>,
        questions: Vec<state::question::QuizQuestion>,
    ) -> Result<()> {
        instructions::start_quiz::handler(ctx, questions)
    }

    pub fn submit_answer(
        ctx: Context<SubmitAnswer>,
        answer_index: u8,
        timestamp: i64,
    ) -> Result<()> {
        instructions::submit_answer::handler(ctx, answer_index, timestamp)
    }

    pub fn distribute_rewards(ctx: Context<DistributeRewards>) -> Result<()> {
        instructions::distribute_rewards::handler(ctx)
    }

    pub fn cancel_quiz(ctx: Context<CancelQuiz>) -> Result<()> {
        instructions::cancel_quiz::handler(ctx)
    }
}