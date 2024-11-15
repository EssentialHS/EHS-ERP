import React from 'react';
import ProjectsList from './ProjectsList';
import ProjectsGantt from './ProjectsGantt';
import ProjectsOverview from './ProjectsOverview';

interface ProjectsDashboardProps {
  activeView: string;
}

export default function ProjectsDashboard({ activeView }: ProjectsDashboardProps) {
  const renderContent = () => {
    switch (activeView) {
      case 'List':
        return <ProjectsList />;
      case 'Gantt':
        return <ProjectsGantt />;
      case 'Overview':
        return <ProjectsOverview />;
      default:
        return <ProjectsList />;
    }
  };

  return (
    <div className="h-full">
      {renderContent()}
    </div>
  );
}