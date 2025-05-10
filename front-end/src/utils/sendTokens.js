import { Connection, PublicKey, Transaction } from '@solana/web3.js';
import {  getOrCreateAssociatedTokenAccount, transfer } from "@solana/spl-token";

// walletAdapterObj: { publicKey, sendTransaction }
export async function sendTokens(walletAdapterObj, toWalletAddress, amount, mintAddress) {
  const connection = new Connection('https://api.devnet.solana.com');
  const mint = new PublicKey(mintAddress);
  const fromWallet = walletAdapterObj.publicKey;
  const toWallet = new PublicKey(toWalletAddress);

  // Get or create associated token accounts
  const fromTokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    fromWallet, // payer (must be publicKey for wallet adapter)
    mint,
    fromWallet
  );
  const toTokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    fromWallet, // payer
    mint,
    toWallet
  );

  // Build transfer instruction
  const tx = new Transaction().add(
    transfer(
      fromTokenAccount.address,
      toTokenAccount.address,
      fromWallet,
      amount
    )
  );
  return { tx, connection };
}





