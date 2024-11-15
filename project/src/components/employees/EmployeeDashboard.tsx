import React from 'react';
import EmployeeDirectory from './EmployeeDirectory';
import AttendanceTracker from './AttendanceTracker';
import LeaveManagement from './LeaveManagement';
import PerformanceReview from './PerformanceReview';

interface EmployeeDashboardProps {
  activeView: string;
}

export default function EmployeeDashboard({ activeView }: EmployeeDashboardProps) {
  const renderContent = () => {
    switch (activeView) {
      case 'Directory':
        return <EmployeeDirectory />;
      case 'Attendance':
        return <AttendanceTracker />;
      case 'Leave Management':
        return <LeaveManagement />;
      case 'Performance':
        return <PerformanceReview />;
      default:
        return <EmployeeDirectory />;
    }
  };

  return (
    <div className="h-full">
      {renderContent()}
    </div>
  );
}