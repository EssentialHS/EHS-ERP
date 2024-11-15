import React from 'react';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

export default function ProjectsGantt() {
  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Project Timeline</h2>
          <p className="text-sm text-gray-500 mt-1">
            View and manage project schedules
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <ChevronLeft className="h-5 w-5 text-gray-600" />
            </button>
            <div className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg">
              <Calendar className="h-4 w-4 text-gray-400" />
              <span className="text-sm font-medium text-gray-900">March 2024</span>
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <ChevronRight className="h-5 w-5 text-gray-600" />
            </button>
          </div>
          <select className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Month</option>
            <option>Quarter</option>
            <option>Year</option>
          </select>
        </div>
      </div>

      {/* Gantt Chart */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="h-[600px] flex items-center justify-center text-gray-500">
          Gantt chart will be implemented with a charting library of your choice
        </div>
      </div>
    </div>
  );
}