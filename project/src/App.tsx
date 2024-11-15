import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { 
  Bell,
  Search,
  ChevronDown
} from 'lucide-react';
import Sidebar from './components/Sidebar';
import DashboardStats from './components/DashboardStats';
import RecentActivities from './components/RecentActivities';
import SalesChart from './components/SalesChart';
import Calendar from './components/Calendar';
import Chat from './components/Chat';
import TaskManagement from './components/TaskManagement';
import CRMDashboard from './components/crm/CRMDashboard';
import EmployeeDashboard from './components/employees/EmployeeDashboard';
import SocialDashboard from './components/social/SocialDashboard';
import ProjectsDashboard from './components/projects/ProjectsDashboard';
import FinanceDashboard from './components/finance/FinanceDashboard';
import XeroCallback from './components/finance/XeroCallback';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [activeSubItem, setActiveSubItem] = useState('Directory');

  const handleTabChange = (tab: string, subItem?: string) => {
    setActiveTab(tab);
    if (subItem) {
      setActiveSubItem(subItem);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'calendar':
        return <Calendar />;
      case 'tasks':
        return <TaskManagement />;
      case 'crm':
        return <CRMDashboard activeView={activeSubItem} />;
      case 'employees':
        return <EmployeeDashboard activeView={activeSubItem} />;
      case 'social':
        return <SocialDashboard activeView={activeSubItem} />;
      case 'projects':
        return <ProjectsDashboard activeView={activeSubItem} />;
      case 'finance':
        return <FinanceDashboard activeView={activeSubItem} />;
      default:
        return (
          <div className="p-8">
            <DashboardStats />
            <div className="grid grid-cols-3 gap-6 mt-8">
              <div className="col-span-2 bg-white rounded-xl shadow-sm p-6">
                <SalesChart />
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6">
                <RecentActivities />
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <Router>
      <div className="flex h-screen bg-gray-50">
        <Sidebar onTabChange={handleTabChange} activeTab={activeTab} />
        
        <main className="flex-1 overflow-y-auto">
          <header className="bg-white border-b border-gray-200 px-8 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">
                  {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                  {activeSubItem && ` - ${activeSubItem}`}
                </h1>
                <p className="text-sm text-gray-500">Welcome back, Sarah</p>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input 
                    type="text"
                    placeholder="Search..."
                    className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <button className="relative p-2 rounded-lg hover:bg-gray-100">
                  <Bell className="h-5 w-5 text-gray-600" />
                  <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
                </button>
                
                <div className="flex items-center gap-2">
                  <img 
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt="Profile"
                    className="h-8 w-8 rounded-full object-cover"
                  />
                  <ChevronDown className="h-4 w-4 text-gray-600" />
                </div>
              </div>
            </div>
          </header>

          <Routes>
            <Route path="/xero/callback" element={<XeroCallback />} />
            <Route path="*" element={renderContent()} />
          </Routes>
        </main>

        <Chat />
      </div>
    </Router>
  );
};

export default App;