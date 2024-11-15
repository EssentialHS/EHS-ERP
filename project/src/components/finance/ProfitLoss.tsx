import React from 'react';
import { BarChart2 } from 'lucide-react';

export default function ProfitLoss() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Profit & Loss Statement</h3>
        </div>
        <div className="p-6">
          <div className="text-center text-gray-500">
            P&L data from Xero will be displayed here
          </div>
        </div>
      </div>
    </div>
  );
}