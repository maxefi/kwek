use anchor_lang::prelude::*;

use crate::kwek::structs::*;

#[derive(Accounts)]
pub struct SendKwek<'info> {
    #[account(init, payer = author, space = Kwek::LEN)]
    pub kwek: Account<'info, Kwek>,
    #[account(mut)]
    pub author: Signer<'info>,
    pub system_program: Program<'info, System>,
}
