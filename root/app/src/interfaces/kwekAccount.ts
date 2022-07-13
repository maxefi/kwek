import { PublicKey } from "@solana/web3.js";

export interface KwekAccount {
  author: PublicKey;
  topic: string;
  content: string;
  timestamp: string;
}
