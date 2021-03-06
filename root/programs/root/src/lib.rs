use anchor_lang::prelude::*;

use crate::error_code::enums::ErrorCode;
use crate::send_kwek::structs::*;

pub mod error_code;
pub mod kwek;
pub mod send_kwek;

declare_id!("HTxyFrtDRXLmp7hwXkimUbp7hu5Gq3KuC6uZkyGtH4e8");

#[program]
pub mod root {
    use super::*;

    pub fn send_kwek(ctx: Context<SendKwek>, topic: String, content: String) -> Result<()> {
        if topic.chars().count() > 50 {
            return Err(error!(ErrorCode::TopicTooLong));
        }

        if content.chars().count() > 280 {
            return Err(error!(ErrorCode::ContentTooLong));
        }

        let kwek = &mut ctx.accounts.kwek;
        let author = &ctx.accounts.author;
        let clock = Clock::get().unwrap();

        kwek.author = *author.key;
        kwek.timestamp = clock.unix_timestamp;
        kwek.topic = topic;
        kwek.content = content;

        Ok(())
    }
}
