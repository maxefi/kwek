use anchor_lang::prelude::*;
use anchor_lang::solana_program::entrypoint::ProgramResult;

use crate::send_kwek::structs::*;

pub mod kwek;
pub mod send_kwek;

declare_id!("3Zvdo2ZAKwygZJu3vadbwndzJcDw9RaLAWw4nLqcs9b8");

#[program]
pub mod root {

    use super::*;

    pub fn send_kwek(ctx: Context<SendKwek>, topic: String, content: String) -> ProgramResult {
        Ok(())
    }
}
