import React, { useState } from 'react';
import { Plus, Search, Filter, MoreVertical, Calendar, Users, CheckSquare, X } from 'lucide-react';

interface Subtask {
  id: number;
  title: string;
  completed: boolean;
  assignee?: {
    name: string;
    avatar: string;
  };
}

interface ChecklistItem {
  id: number;
  text: string;
  completed: boolean;
}

interface Project {
  id: number;
  name: string;
  description: string;
  status: 'active' | 'completed' | 'on-hold';
  priority: 'low' | 'medium' | 'high';
  progress: number;
  startDate: string;
  endDate: string;
  budget: number;
  team: {
    name: string;
    avatar: string;
  }[];
  tasks: {
    total: number;
    completed: number;
  };
  subtasks: Subtask[];
  checklist: ChecklistItem[];
  labels: string[];
  attachments: number;
  comments: number;
}

const initialProjects: Project[] = [
  {
    id: 1,
    name: 'Website Redesign',
    description: 'Complete overhaul of company website with modern design',
    status: 'active',
    priority: 'high',
    progress: 65,
    startDate: '2024-03-01',
    endDate: '2024-04-15',
    budget: 25000,
    team: [
      {
        name: 'Sarah Chen',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      },
      {
        name: 'David Kim',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      }
    ],
    tasks: {
      total: 45,
      completed: 28
    },
    subtasks: [
      {
        id: 1,
        title: 'Design System Implementation',
        completed: true,
        assignee: {
          name: 'Sarah Chen',
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
        }
      },
      {
        id: 2,
        title: 'Homepage Redesign',
        completed: false,
        assignee: {
          name: 'David Kim',
          avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
        }
      }
    ],
    checklist: [
      { id: 1, text: 'Wireframe approval', completed: true },
      { id: 2, text: 'Content migration', completed: false },
      { id: 3, text: 'SEO optimization', completed: false }
    ],
    labels: ['Design', 'Frontend', 'High Priority'],
    attachments: 5,
    comments: 12
  },
  {
    id: 2,
    name: 'Mobile App Development',
    description: 'Native mobile app for iOS and Android platforms',
    status: 'active',
    priority: 'high',
    progress: 35,
    startDate: '2024-02-15',
    endDate: '2024-05-30',
    budget: 75000,
    team: [
      {
        name: 'Alex Morgan',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      }
    ],
    tasks: {
      total: 85,
      completed: 32
    },
    subtasks: [
      {
        id: 1,
        title: 'User Authentication',
        completed: true,
        assignee: {
          name: 'Alex Morgan',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
        }
      },
      {
        id: 2,
        title: 'Push Notifications',
        completed: false
      }
    ],
    checklist: [
      { id: 1, text: 'API Documentation', completed: true },
      { id: 2, text: 'Unit Tests', completed: false },
      { id: 3, text: 'App Store Submission', completed: false }
    ],
    labels: ['Mobile', 'Backend', 'Critical'],
    attachments: 8,
    comments: 24
  }
];

const statusColors = {
  active: 'bg-green-100 text-green-800',
  completed: 'bg-gray-100 text-gray-800',
  'on-hold': 'bg-yellow-100 text-yellow-800'
};

const priorityColors = {
  low: 'bg-blue-100 text-blue-800',
  medium: 'bg-yellow-100 text-yellow-800',
  high: 'bg-red-100 text-red-800'
};

const labelColors = {
  Design: 'bg-purple-100 text-purple-800',
  Frontend: 'bg-blue-100 text-blue-800',
  Backend: 'bg-green-100 text-green-800',
  Mobile: 'bg-indigo-100 text-indigo-800',
  Critical: 'bg-red-100 text-red-800',
  'High Priority': 'bg-orange-100 text-orange-800'
};

export default function ProjectsList() {
  const [projects] = useState<Project[]>(initialProjects);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Projects</h2>
          <p className="text-sm text-gray-500 mt-1">
            Manage and track all your projects
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <Plus className="h-4 w-4" />
          New Project
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50">
          <Filter className="h-5 w-5 text-gray-600" />
        </button>
      </div>

      {/* Projects Table */}
      <div className="bg-white rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Project
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Priority
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Progress
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Timeline
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Budget
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Team
              </th>
              <th className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {projects.map((project) => (
              <tr
                key={project.id}
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">
                    {project.name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {project.description}
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {project.labels.map((label) => (
                      <span
                        key={label}
                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                          labelColors[label as keyof typeof labelColors]
                        }`}
                      >
                        {label}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[project.status]}`}>
                    {project.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${priorityColors[project.priority]}`}>
                    {project.priority}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-1 bg-gray-200 rounded-full h-2 mr-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-500">
                      {project.progress}%
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Calendar className="h-4 w-4" />
                    <span>{project.startDate}</span>
                    <span>→</span>
                    <span>{project.endDate}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatCurrency(project.budget)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-4">
                    <div className="flex -space-x-2">
                      {project.team.map((member, index) => (
                        <img
                          key={index}
                          src={member.avatar}
                          alt={member.name}
                          className="h-8 w-8 rounded-full border-2 border-white"
                          title={member.name}
                        />
                      ))}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <CheckSquare className="h-4 w-4" />
                      <span>
                        {project.tasks.completed}/{project.tasks.total}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProject(project);
                    }}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <MoreVertical className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Project Details Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                Project Details
              </h3>
              <button
                onClick={() => setSelectedProject(null)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="space-y-6">
                {/* Project Header */}
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900">
                    {selectedProject.name}
                  </h2>
                  <p className="mt-1 text-gray-500">{selectedProject.description}</p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {selectedProject.labels.map((label) => (
                      <span
                        key={label}
                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                          labelColors[label as keyof typeof labelColors]
                        }`}
                      >
                        {label}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Project Stats */}
                <div className="grid grid-cols-4 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm font-medium text-gray-500">Status</p>
                    <span className={`mt-1 inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      statusColors[selectedProject.status]
                    }`}>
                      {selectedProject.status}
                    </span>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm font-medium text-gray-500">Priority</p>
                    <span className={`mt-1 inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      priorityColors[selectedProject.priority]
                    }`}>
                      {selectedProject.priority}
                    </span>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm font-medium text-gray-500">Budget</p>
                    <p className="mt-1 text-lg font-semibold text-gray-900">
                      {formatCurrency(selectedProject.budget)}
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm font-medium text-gray-500">Progress</p>
                    <div className="mt-2 flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${selectedProject.progress}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        {selectedProject.progress}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Subtasks */}
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-4">Subtasks</h4>
                  <div className="space-y-2">
                    {selectedProject.subtasks.map((subtask) => (
                      <div
                        key={subtask.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={subtask.completed}
                            className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                            onChange={() => {}}
                          />
                          <span className={`text-sm ${
                            subtask.completed ? 'text-gray-500 line-through' : 'text-gray-900'
                          }`}>
                            {subtask.title}
                          </span>
                        </div>
                        {subtask.assignee && (
                          <img
                            src={subtask.assignee.avatar}
                            alt={subtask.assignee.name}
                            className="h-6 w-6 rounded-full"
                            title={subtask.assignee.name}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Checklist */}
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-4">Checklist</h4>
                  <div className="space-y-2">
                    {selectedProject.checklist.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                      >
                        <input
                          type="checkbox"
                          checked={item.completed}
                          className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                          onChange={() => {}}
                        />
                        <span className={`text-sm ${
                          item.completed ? 'text-gray-500 line-through' : 'text-gray-900'
                        }`}>
                          {item.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Team Members */}
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-4">Team Members</h4>
                  <div className="flex flex-wrap gap-4">
                    {selectedProject.team.map((member, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg"
                      >
                        <img
                          src={member.avatar}
                          alt={member.name}
                          className="h-8 w-8 rounded-full"
                        />
                        <span className="text-sm font-medium text-gray-900">
                          {member.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}