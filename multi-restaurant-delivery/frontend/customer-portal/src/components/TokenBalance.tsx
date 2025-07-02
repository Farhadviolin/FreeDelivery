import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import axios from 'axios';

export function TokenBalance() {
  const [balance, setBalance] = useState<string>("0");
  useEffect(() => {
    async function fetchBalance() {
      if (!window.ethereum) return;
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const [account] = await window.ethereum.request({ method: 'eth_accounts' });
      const res = await axios.get(`/api/balances/${account}`);
      setBalance(res.data[0]?.balance || "0");
    }
    fetchBalance();
  }, []);
  return <div>Ihre DLT-Balance: {ethers.utils.formatUnits(balance, 18)}</div>;
}
