use anchor_lang::prelude::*;

#[error_code]
pub enum ErrorCode {
    #[msg("The provided topic should be 50 charactes long maximum.")]
    TopicTooLong,
    #[msg("The provided content should be 280 characters long maximum.")]
    ContentTooLong,
}
