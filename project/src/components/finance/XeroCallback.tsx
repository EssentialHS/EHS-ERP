import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { xeroAPI } from '../../lib/xero';

export default function XeroCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');
      const state = urlParams.get('state');

      if (!code || !state) {
        console.error('Missing code or state parameter');
        navigate('/finance');
        return;
      }

      try {
        await xeroAPI.handleCallback(code, state);
        navigate('/finance');
      } catch (error) {
        console.error('Error handling Xero callback:', error);
        navigate('/finance');
      }
    };

    handleCallback();
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    </div>
  );
}