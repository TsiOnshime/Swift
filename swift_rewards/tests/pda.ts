const anchor = require("@coral-xyz/anchor");


async function main() {
  const programId = new anchor.web3.PublicKey("2NB3BVcoJeCP5aEQLCFuCDYhERoCJyJrLzLVCdzYY7Zf"); // your program id
  const [pda] = await anchor.web3.PublicKey.findProgramAddress(
    [Buffer.from("mint-authority")],
    programId
  );
  console.log("PDA:", pda.toBase58());
}

main();