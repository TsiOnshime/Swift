import * as anchor from "@coral-xyz/anchor";
import BN from "bn.js";
import dotenv from "dotenv";
dotenv.config();

import { readFile } from "fs/promises";
import { getAssociatedTokenAddress } from "@solana/spl-token";

const programId = new anchor.web3.PublicKey(process.env.PROGRAM_ID);

const provider = new anchor.AnchorProvider(
  new anchor.web3.Connection("https://api.devnet.solana.com"),
  new anchor.Wallet(
    anchor.web3.Keypair.fromSecretKey(
      Uint8Array.from(JSON.parse(process.env.REWARD_WALLET_SECRET))
    )
  ),
  { commitment: "confirmed" }
);
anchor.setProvider(provider);

export async function rewardUser(userPubkey, amount) {
  try {
    console.log("Rewarding user:", userPubkey, amount);
    console.log("TOKEN_MINT:", process.env.TOKEN_MINT);
    console.log("userPubkey:", userPubkey);
    if (!process.env.TOKEN_MINT) throw new Error("TOKEN_MINT is not set");
    if (!userPubkey) throw new Error("userPubkey is not set");
    if (!programId) throw new Error("programId is not set");

    // Read the IDL JSON file manually
    const idlRaw = await readFile(
      new URL(
        "../../swift_rewards/target/idl/swift_rewards.json",
        import.meta.url
      )
    );
    const idl = JSON.parse(idlRaw.toString());
    const program = new anchor.Program(idl, programId, provider);

    const [mintAuthorityPda, bump] =
      await anchor.web3.PublicKey.findProgramAddress(
        [Buffer.from("mint-authority")],
        programId
      );
    const userTokenAccount = await getAssociatedTokenAddress(
      new anchor.web3.PublicKey(process.env.TOKEN_MINT),
      new anchor.web3.PublicKey(userPubkey)
    );
    await program.methods
      .reward_for_package(new BN(amount))
      .accounts({
        swift_mint: new anchor.web3.PublicKey(process.env.TOKEN_MINT),
        user_token_account: userTokenAccount,
        mint_authority: mintAuthorityPda,
        token_program: anchor.utils.token.TOKEN_PROGRAM_ID,
      })
      .rpc();
  } catch (err) {
    console.error("Reward error:", err);
    throw err;
  }
}

export async function transferTokens(fromPubkey, toPubkey, amount) {
  try {
    // Read the IDL JSON file manually
    const idlRaw = await readFile(
      new URL(
        "../../swift_rewards/target/idl/swift_rewards.json",
        import.meta.url
      )
    );
    const idl = JSON.parse(idlRaw.toString());
    const program = new anchor.Program(idl, programId, provider);

    // Get associated token accounts
    const fromTokenAccount = await getAssociatedTokenAddress(
      new anchor.web3.PublicKey(process.env.TOKEN_MINT),
      new anchor.web3.PublicKey(fromPubkey)
    );
    const toTokenAccount = await getAssociatedTokenAddress(
      new anchor.web3.PublicKey(process.env.TOKEN_MINT),
      new anchor.web3.PublicKey(toPubkey)
    );

    await program.methods
      .transferCoins(new BN(amount))
      .accounts({
        from_token_account: fromTokenAccount,
        to_token_account: toTokenAccount,
        user: new anchor.web3.PublicKey(fromPubkey),
        token_program: anchor.utils.token.TOKEN_PROGRAM_ID,
      })
      .signers([]) // If using a server wallet, add it here
      .rpc();
  } catch (err) {
    console.error("Transfer error:", err);
    throw err;
  }
}
