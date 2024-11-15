import axios from 'axios';

export interface XeroTransaction {
  id: string;
  date: string;
  amount: number;
  description: string;
  status: string;
}

export interface XeroBalance {
  accountId: string;
  name: string;
  balance: number;
}

export interface XeroProfitLoss {
  revenue: number;
  expenses: number;
  netIncome: number;
  period: string;
}

class XeroAPI {
  private static instance: XeroAPI;
  private clientId: string;
  private clientSecret: string;
  private redirectUri: string;
  private accessToken: string | null = null;

  private constructor() {
    this.clientId = import.meta.env.VITE_XERO_CLIENT_ID;
    this.clientSecret = import.meta.env.VITE_XERO_CLIENT_SECRET;
    this.redirectUri = import.meta.env.VITE_XERO_REDIRECT_URI;
  }

  static getInstance(): XeroAPI {
    if (!XeroAPI.instance) {
      XeroAPI.instance = new XeroAPI();
    }
    return XeroAPI.instance;
  }

  connect(): void {
    const scope = 'openid profile email accounting.transactions accounting.reports.read accounting.settings.read offline_access';
    const state = Math.random().toString(36).substring(7);
    localStorage.setItem('xero_state', state);
    
    const url = `https://login.xero.com/identity/connect/authorize` +
      `?response_type=code` +
      `&client_id=${this.clientId}` +
      `&redirect_uri=${encodeURIComponent(this.redirectUri)}` +
      `&scope=${encodeURIComponent(scope)}` +
      `&state=${state}`;

    window.location.href = url;
  }

  async handleCallback(code: string, state: string): Promise<void> {
    const savedState = localStorage.getItem('xero_state');
    if (state !== savedState) {
      throw new Error('Invalid state parameter');
    }

    try {
      const tokenResponse = await axios.post('https://identity.xero.com/connect/token', 
        new URLSearchParams({
          grant_type: 'authorization_code',
          code,
          redirect_uri: this.redirectUri
        }), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${btoa(`${this.clientId}:${this.clientSecret}`)}`
        }
      });

      this.setAccessToken(tokenResponse.data.access_token);
      localStorage.setItem('xero_refresh_token', tokenResponse.data.refresh_token);
    } catch (error) {
      console.error('Error exchanging code for token:', error);
      throw error;
    }
  }

  isAuthenticated(): boolean {
    return !!this.accessToken;
  }

  setAccessToken(token: string): void {
    this.accessToken = token;
    localStorage.setItem('xero_token', token);
  }

  async refreshToken(): Promise<void> {
    const refreshToken = localStorage.getItem('xero_refresh_token');
    if (!refreshToken) throw new Error('No refresh token available');

    try {
      const response = await axios.post('https://identity.xero.com/connect/token',
        new URLSearchParams({
          grant_type: 'refresh_token',
          refresh_token: refreshToken
        }), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${btoa(`${this.clientId}:${this.clientSecret}`)}`
        }
      });

      this.setAccessToken(response.data.access_token);
      localStorage.setItem('xero_refresh_token', response.data.refresh_token);
    } catch (error) {
      console.error('Error refreshing token:', error);
      throw error;
    }
  }

  async getRecentTransactions(): Promise<XeroTransaction[]> {
    if (!this.accessToken) throw new Error('Not authenticated');

    try {
      const response = await axios.get('/api/xero/transactions', {
        headers: {
          Authorization: `Bearer ${this.accessToken}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching transactions:', error);
      throw error;
    }
  }

  async getAccountBalances(): Promise<XeroBalance[]> {
    if (!this.accessToken) throw new Error('Not authenticated');

    try {
      const response = await axios.get('/api/xero/balances', {
        headers: {
          Authorization: `Bearer ${this.accessToken}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching balances:', error);
      throw error;
    }
  }

  async getProfitAndLoss(fromDate: string, toDate: string): Promise<XeroProfitLoss> {
    if (!this.accessToken) throw new Error('Not authenticated');

    try {
      const response = await axios.get('/api/xero/profit-loss', {
        params: { fromDate, toDate },
        headers: {
          Authorization: `Bearer ${this.accessToken}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching profit and loss:', error);
      throw error;
    }
  }
}

export const xeroAPI = XeroAPI.getInstance();