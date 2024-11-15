import React from 'react';
import PostsManager from './PostsManager';
import SocialAnalytics from './SocialAnalytics';
import CampaignManager from './CampaignManager';

interface SocialDashboardProps {
  activeView: string;
}

export default function SocialDashboard({ activeView }: SocialDashboardProps) {
  const renderContent = () => {
    switch (activeView) {
      case 'Posts':
        return <PostsManager />;
      case 'Analytics':
        return <SocialAnalytics />;
      case 'Campaigns':
        return <CampaignManager />;
      default:
        return <PostsManager />;
    }
  };

  return (
    <div className="h-full">
      {renderContent()}
    </div>
  );
}