import React from 'react';
import { DollarSign } from 'lucide-react';

export default function AccountsOverview() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Chart of Accounts</h3>
        </div>
        <div className="p-6">
          <div className="text-center text-gray-500">
            Account data from Xero will be displayed here
          </div>
        </div>
      </div>
    </div>
  );
}