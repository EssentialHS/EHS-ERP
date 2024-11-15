import React from 'react';

export default function SalesChart() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Revenue Overview</h3>
        <select className="text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option>Last 7 days</option>
          <option>Last 30 days</option>
          <option>Last 90 days</option>
        </select>
      </div>
      
      <div className="h-[300px] flex items-center justify-center text-gray-500">
        Chart will be implemented with a charting library of your choice
      </div>
    </div>
  );
}