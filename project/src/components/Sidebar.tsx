import React, { useState } from 'react';
import { 
  LayoutGrid, 
  Users, 
  Building2, 
  DollarSign, 
  ShoppingCart, 
  BarChart3,
  Settings,
  HelpCircle,
  GraduationCap,
  Share2,
  UserCircle,
  UserCog,
  Calendar,
  CheckSquare,
  FolderKanban
} from 'lucide-react';

interface SidebarProps {
  onTabChange: (tab: string, subItem?: string) => void;
  activeTab: string;
}

const menuItems = [
  { icon: LayoutGrid, label: 'dashboard', title: 'Dashboard' },
  { 
    icon: UserCircle, 
    label: 'crm',
    title: 'CRM',
    subItems: ['Contacts', 'Deals', 'Sales Pipeline']
  },
  { 
    icon: UserCog, 
    label: 'employees',
    title: 'Employees',
    subItems: ['Directory', 'Attendance', 'Leave Management', 'Performance']
  },
  { 
    icon: GraduationCap, 
    label: 'learning',
    title: 'Learning',
    subItems: ['Courses', 'Students', 'Assignments']
  },
  { 
    icon: Share2, 
    label: 'social',
    title: 'Social',
    subItems: ['Posts', 'Analytics', 'Campaigns']
  },
  { icon: Calendar, label: 'calendar', title: 'Calendar' },
  { icon: CheckSquare, label: 'tasks', title: 'Tasks' },
  { 
    icon: FolderKanban, 
    label: 'projects', 
    title: 'Projects',
    subItems: ['List', 'Gantt', 'Overview']
  },
  { icon: DollarSign, label: 'finance', title: 'Finance' },
  { icon: ShoppingCart, label: 'inventory', title: 'Inventory' },
  { icon: BarChart3, label: 'analytics', title: 'Analytics' },
];

export default function Sidebar({ onTabChange, activeTab }: SidebarProps) {
  const [expandedItem, setExpandedItem] = React.useState<string | null>(null);

  return (
    <aside className="w-64 bg-white border-r border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-8">
        <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
          <Building2 className="h-5 w-5 text-white" />
        </div>
        <span className="text-xl font-semibold text-gray-900">Nexus ERP</span>
      </div>

      <nav className="space-y-1">
        {menuItems.map((item) => (
          <div key={item.label}>
            <button
              onClick={() => {
                onTabChange(item.label, item.subItems?.[0]);
                setExpandedItem(expandedItem === item.label ? null : item.label);
              }}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === item.label
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span className="flex-1 text-left">{item.title}</span>
              {item.subItems && (
                <svg
                  className={`h-4 w-4 transition-transform ${
                    expandedItem === item.label ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              )}
            </button>
            {item.subItems && expandedItem === item.label && (
              <div className="ml-9 mt-1 space-y-1">
                {item.subItems.map((subItem) => (
                  <button
                    key={subItem}
                    onClick={() => onTabChange(item.label, subItem)}
                    className="block w-full text-left px-3 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                  >
                    {subItem}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      <div className="absolute bottom-8 space-y-1">
        <a
          href="#"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50"
        >
          <Settings className="h-5 w-5" />
          Settings
        </a>
        <a
          href="#"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50"
        >
          <HelpCircle className="h-5 w-5" />
          Help Center
        </a>
      </div>
    </aside>
  );
}