import React from 'react';
import { TrendingUp, Clock, AlertCircle, CheckCircle2, BarChart2 } from 'lucide-react';

const stats = [
  {
    label: 'Total Projects',
    value: '24',
    change: '+12.5%',
    icon: BarChart2,
    color: 'blue'
  },
  {
    label: 'In Progress',
    value: '12',
    change: '+4.3%',
    icon: Clock,
    color: 'yellow'
  },
  {
    label: 'At Risk',
    value: '3',
    change: '-2.1%',
    icon: AlertCircle,
    color: 'red'
  },
  {
    label: 'Completed',
    value: '9',
    change: '+8.4%',
    icon: CheckCircle2,
    color: 'green'
  }
];

export default function ProjectsOverview() {
  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">Projects Overview</h2>
        <p className="text-sm text-gray-500 mt-1">
          Monitor project performance and metrics
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-lg border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                <p className="mt-2 text-3xl font-semibold text-gray-900">
                  {stat.value}
                </p>
                <div className="mt-2 flex items-center gap-1">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span className="text-sm font-medium text-green-500">
                    {stat.change}
                  </span>
                </div>
              </div>
              <div className={`h-12 w-12 bg-${stat.color}-100 rounded-lg flex items-center justify-center`}>
                <stat.icon className={`h-6 w-6 text-${stat.color}-600`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              Project Status Distribution
            </h3>
          </div>
          <div className="p-6">
            <div className="h-[300px] flex items-center justify-center text-gray-500">
              Pie chart will be implemented with a charting library of your choice
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              Project Completion Trend
            </h3>
          </div>
          <div className="p-6">
            <div className="h-[300px] flex items-center justify-center text-gray-500">
              Line chart will be implemented with a charting library of your choice
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 col-span-2">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              Resource Allocation
            </h3>
          </div>
          <div className="p-6">
            <div className="h-[300px] flex items-center justify-center text-gray-500">
              Bar chart will be implemented with a charting library of your choice
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}