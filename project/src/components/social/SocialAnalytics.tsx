import React from 'react';
import { TrendingUp, TrendingDown, Users, Eye, Share2, MessageCircle } from 'lucide-react';

const metrics = [
  {
    label: 'Total Followers',
    value: '24.5K',
    change: '+12.3%',
    trending: 'up',
    icon: Users,
  },
  {
    label: 'Post Impressions',
    value: '845.2K',
    change: '+28.4%',
    trending: 'up',
    icon: Eye,
  },
  {
    label: 'Engagement Rate',
    value: '4.6%',
    change: '-2.1%',
    trending: 'down',
    icon: MessageCircle,
  },
  {
    label: 'Share Rate',
    value: '2.8%',
    change: '+5.3%',
    trending: 'up',
    icon: Share2,
  },
];

const platformMetrics = [
  {
    platform: 'LinkedIn',
    followers: '12.3K',
    engagement: '3.2%',
    posts: 45,
    reach: '234.5K',
  },
  {
    platform: 'Twitter',
    followers: '8.7K',
    engagement: '2.8%',
    posts: 67,
    reach: '156.2K',
  },
  {
    platform: 'Facebook',
    followers: '15.2K',
    engagement: '4.1%',
    posts: 38,
    reach: '298.7K',
  },
  {
    platform: 'Instagram',
    followers: '18.9K',
    engagement: '5.3%',
    posts: 52,
    reach: '412.4K',
  },
];

export default function SocialAnalytics() {
  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">Social Analytics</h2>
        <p className="text-sm text-gray-500 mt-1">
          Track your social media performance and engagement
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className="bg-white rounded-lg border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">{metric.label}</p>
                <p className="mt-2 text-3xl font-semibold text-gray-900">
                  {metric.value}
                </p>
                <div className="mt-2 flex items-center gap-1">
                  {metric.trending === 'up' ? (
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-500" />
                  )}
                  <span
                    className={`text-sm font-medium ${
                      metric.trending === 'up'
                        ? 'text-green-500'
                        : 'text-red-500'
                    }`}
                  >
                    {metric.change}
                  </span>
                </div>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <metric.icon className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Platform Performance */}
      <div className="bg-white rounded-lg border border-gray-200 mb-8">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Platform Performance
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Platform
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Followers
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Engagement Rate
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Posts
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reach
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {platformMetrics.map((platform) => (
                <tr key={platform.platform}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {platform.platform}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{platform.followers}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {platform.engagement}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{platform.posts}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{platform.reach}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Engagement Chart */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Engagement Overview
          </h3>
        </div>
        <div className="p-6">
          <div className="h-[400px] flex items-center justify-center text-gray-500">
            Chart will be implemented with a charting library of your choice
          </div>
        </div>
      </div>
    </div>
  );
}