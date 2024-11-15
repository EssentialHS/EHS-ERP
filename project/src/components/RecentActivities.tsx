import React from 'react';

const activities = [
  {
    user: 'Sarah Chen',
    action: 'enrolled in course',
    project: 'Advanced Marketing',
    time: '2h ago',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    user: 'Alex Morgan',
    action: 'closed deal with',
    project: 'TechCorp Inc.',
    time: '4h ago',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    user: 'David Kim',
    action: 'submitted leave request',
    project: 'Annual Leave',
    time: '5h ago',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    user: 'Emily Wang',
    action: 'completed training',
    project: 'Compliance 2024',
    time: '6h ago',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
];

export default function RecentActivities() {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Recent Activities
      </h3>
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-start gap-4">
            <img
              src={activity.avatar}
              alt={activity.user}
              className="h-8 w-8 rounded-full"
            />
            <div>
              <p className="text-sm text-gray-600">
                <span className="font-medium text-gray-900">
                  {activity.user}
                </span>{' '}
                {activity.action}{' '}
                <span className="font-medium text-gray-900">
                  {activity.project}
                </span>
              </p>
              <p className="text-xs text-gray-500 mt-0.5">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}