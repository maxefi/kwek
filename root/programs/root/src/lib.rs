use anchor_lang::prelude::*;

declare_id!("3Zvdo2ZAKwygZJu3vadbwndzJcDw9RaLAWw4nLqcs9b8");

#[program]
pub mod root {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
