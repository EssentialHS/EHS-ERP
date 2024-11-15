import { useState, useEffect } from 'react';
import { xeroAPI, XeroTransaction, XeroBalance, XeroProfitLoss } from '../lib/xero';

export function useXero() {
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [transactions, setTransactions] = useState<XeroTransaction[]>([]);
  const [balances, setBalances] = useState<XeroBalance[]>([]);
  const [profitLoss, setProfitLoss] = useState<XeroProfitLoss | null>(null);

  const connect = () => {
    try {
      xeroAPI.connect();
    } catch (err) {
      setError('Failed to connect to Xero');
      console.error(err);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('xero_token');
    if (token) {
      setIsConnected(true);
      xeroAPI.setAccessToken(token);
    }
  }, []);

  const fetchData = async () => {
    if (!isConnected) return;
    
    setIsLoading(true);
    setError(null);

    try {
      const [txs, bals, pl] = await Promise.all([
        xeroAPI.getRecentTransactions(),
        xeroAPI.getAccountBalances(),
        xeroAPI.getProfitAndLoss(
          new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          new Date().toISOString().split('T')[0]
        )
      ]);

      setTransactions(txs);
      setBalances(bals);
      setProfitLoss(pl);
    } catch (err) {
      setError('Failed to fetch data from Xero');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isConnected) {
      fetchData();
    }
  }, [isConnected]);

  return {
    isConnected,
    isLoading,
    error,
    transactions,
    balances,
    profitLoss,
    connect,
    fetchData
  };
}