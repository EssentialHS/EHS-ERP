import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

const stats = [
  {
    label: 'Total Revenue',
    value: '$84,254.00',
    change: '+28.5%',
    trending: 'up',
  },
  {
    label: 'Active Employees',
    value: '156',
    change: '+12.3%',
    trending: 'up',
  },
  {
    label: 'Social Reach',
    value: '45.2K',
    change: '+32.5%',
    trending: 'up',
  },
  {
    label: 'CRM Deals',
    value: '284',
    change: '+8.4%',
    trending: 'up',
  },
];

export default function DashboardStats() {
  return (
    <div className="grid grid-cols-4 gap-6">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-white rounded-xl shadow-sm p-6 transition-transform hover:scale-[1.02]"
        >
          <p className="text-sm font-medium text-gray-500">{stat.label}</p>
          <p className="mt-2 text-3xl font-semibold text-gray-900">
            {stat.value}
          </p>
          <div className="mt-2 flex items-center gap-1">
            {stat.trending === 'up' ? (
              <TrendingUp className="h-4 w-4 text-green-500" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-500" />
            )}
            <span
              className={`text-sm font-medium ${
                stat.trending === 'up' ? 'text-green-500' : 'text-red-500'
              }`}
            >
              {stat.change}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}