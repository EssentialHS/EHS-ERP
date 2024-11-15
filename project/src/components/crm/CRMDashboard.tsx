import React from 'react';
import ContactsList from './ContactsList';
import DealsList from './DealsList';
import SalesPipeline from './SalesPipeline';

interface CRMDashboardProps {
  activeView: string;
}

export default function CRMDashboard({ activeView }: CRMDashboardProps) {
  const renderContent = () => {
    switch (activeView) {
      case 'Contacts':
        return <ContactsList />;
      case 'Deals':
        return <DealsList />;
      case 'Sales Pipeline':
        return <SalesPipeline />;
      default:
        return <ContactsList />;
    }
  };

  return (
    <div className="h-full">
      {renderContent()}
    </div>
  );
}