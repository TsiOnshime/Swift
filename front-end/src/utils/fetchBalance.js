import { useWallet } from '@solana/wallet-adapter-react';
import { useConnection } from '@solana/wallet-adapter-react';
import { useEffect, useState } from 'react';
import { PublicKey } from '@solana/web3.js';
import { getAssociatedTokenAddress } from "@solana/spl-token";

const TOKEN_MINT = import.meta.env.VITE_MINT_ADDRESS;

export function useTokenBalance() {
  const { publicKey } = useWallet();
  const { connection } = useConnection();
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    if (!publicKey) return;
    (async () => {
      const ata = await getAssociatedTokenAddress(
        new PublicKey(TOKEN_MINT),
        publicKey
      );
      try {
        const accountInfo = await connection.getParsedAccountInfo(ata);
        const amount = accountInfo.value?.data?.parsed?.info?.tokenAmount?.amount || 0;
        setBalance(Number(amount));
      } catch {
        setBalance(0);
      }
    })();
  }, [publicKey, connection]);

  return balance;
}