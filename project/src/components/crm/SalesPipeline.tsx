import React, { useState } from 'react';
import { Plus, MoreVertical, Users, Calendar } from 'lucide-react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

interface Deal {
  id: number;
  title: string;
  company: string;
  value: number;
  owner: {
    name: string;
    avatar: string;
  };
  contacts: string[];
  expectedCloseDate: string;
}

interface Stage {
  id: string;
  name: string;
  deals: Deal[];
}

const initialStages: Stage[] = [
  {
    id: 'qualification',
    name: 'Qualification',
    deals: [
      {
        id: 1,
        title: 'Software Implementation',
        company: 'Global Tech Ltd',
        value: 45000,
        owner: {
          name: 'Sarah Chen',
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
        contacts: ['John Smith', 'Emma Wilson'],
        expectedCloseDate: '2024-04-15'
      },
    ],
  },
  {
    id: 'proposal',
    name: 'Proposal',
    deals: [
      {
        id: 2,
        title: 'Cloud Migration Project',
        company: 'InnovaTech Solutions',
        value: 120000,
        owner: {
          name: 'Alex Morgan',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
        contacts: ['Sarah Johnson', 'Mike Chen'],
        expectedCloseDate: '2024-05-01'
      },
    ],
  },
  {
    id: 'negotiation',
    name: 'Negotiation',
    deals: [
      {
        id: 3,
        title: 'Enterprise Software License',
        company: 'TechCorp Inc.',
        value: 75000,
        owner: {
          name: 'David Kim',
          avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
        contacts: ['Robert Lee', 'Anna Wang'],
        expectedCloseDate: '2024-04-30'
      },
    ],
  },
  {
    id: 'closed-won',
    name: 'Closed Won',
    deals: [],
  },
  {
    id: 'closed-lost',
    name: 'Closed Lost',
    deals: [],
  },
];

const stageColors = {
  qualification: 'bg-purple-100',
  proposal: 'bg-blue-100',
  negotiation: 'bg-yellow-100',
  'closed-won': 'bg-green-100',
  'closed-lost': 'bg-red-100',
};

export default function SalesPipeline() {
  const [stages, setStages] = useState<Stage[]>(initialStages);
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const onDragEnd = (result: any) => {
    const { source, destination } = result;

    // Dropped outside the list
    if (!destination) {
      return;
    }

    // Find source and destination stages
    const sourceStage = stages.find(stage => stage.id === source.droppableId);
    const destStage = stages.find(stage => stage.id === destination.droppableId);

    if (!sourceStage || !destStage) return;

    // Create new stages array
    const newStages = stages.map(stage => {
      if (stage.id === source.droppableId) {
        const newDeals = [...stage.deals];
        const [removed] = newDeals.splice(source.index, 1);
        return { ...stage, deals: newDeals };
      }
      if (stage.id === destination.droppableId) {
        const newDeals = [...stage.deals];
        const [removed] = sourceStage.deals.splice(source.index, 1);
        newDeals.splice(destination.index, 0, removed);
        return { ...stage, deals: newDeals };
      }
      return stage;
    });

    setStages(newStages);
  };

  return (
    <div className="h-full p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Sales Pipeline</h2>
          <p className="text-sm text-gray-500 mt-1">
            Visualize and manage your sales pipeline
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <Plus className="h-4 w-4" />
          Add Deal
        </button>
      </div>

      {/* Pipeline Stats */}
      <div className="grid grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <p className="text-sm font-medium text-gray-500">Total Pipeline Value</p>
          <p className="mt-2 text-2xl font-semibold text-gray-900">
            {formatCurrency(
              stages.reduce((sum, stage) => 
                sum + stage.deals.reduce((dealSum, deal) => dealSum + deal.value, 0)
              , 0)
            )}
          </p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <p className="text-sm font-medium text-gray-500">Active Deals</p>
          <p className="mt-2 text-2xl font-semibold text-gray-900">
            {stages.reduce((sum, stage) => sum + stage.deals.length, 0)}
          </p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <p className="text-sm font-medium text-gray-500">Win Rate</p>
          <p className="mt-2 text-2xl font-semibold text-gray-900">65%</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <p className="text-sm font-medium text-gray-500">Avg. Deal Size</p>
          <p className="mt-2 text-2xl font-semibold text-gray-900">
            {formatCurrency(
              stages.reduce((sum, stage) => 
                sum + stage.deals.reduce((dealSum, deal) => dealSum + deal.value, 0)
              , 0) / stages.reduce((sum, stage) => sum + stage.deals.length, 0)
            )}
          </p>
        </div>
      </div>

      {/* Pipeline Board */}
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex gap-4 h-[calc(100vh-12rem)] overflow-x-auto pb-6">
          {stages.map((stage) => (
            <div
              key={stage.id}
              className={`flex-1 min-w-[320px] ${stageColors[stage.id as keyof typeof stageColors]} rounded-lg p-4`}
            >
              {/* Stage Header */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">
                    {stage.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {stage.deals.length} deals • {formatCurrency(stage.deals.reduce((sum, deal) => sum + deal.value, 0))}
                  </p>
                </div>
                <button className="p-1 hover:bg-white/50 rounded">
                  <Plus className="h-4 w-4 text-gray-600" />
                </button>
              </div>

              {/* Deals */}
              <Droppable droppableId={stage.id}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="space-y-3"
                  >
                    {stage.deals.map((deal, index) => (
                      <Draggable
                        key={deal.id}
                        draggableId={String(deal.id)}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-move"
                            onClick={() => setSelectedDeal(deal)}
                          >
                            <div className="flex items-start justify-between">
                              <div>
                                <h4 className="text-sm font-medium text-gray-900">
                                  {deal.title}
                                </h4>
                                <p className="text-sm text-gray-500 mt-1">
                                  {deal.company}
                                </p>
                              </div>
                              <button className="p-1 hover:bg-gray-100 rounded">
                                <MoreVertical className="h-4 w-4 text-gray-400" />
                              </button>
                            </div>
                            <div className="mt-3 flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <img
                                  src={deal.owner.avatar}
                                  alt={deal.owner.name}
                                  className="h-6 w-6 rounded-full"
                                />
                                <span className="text-xs text-gray-500">
                                  {deal.owner.name}
                                </span>
                              </div>
                              <span className="text-sm font-medium text-gray-900">
                                {formatCurrency(deal.value)}
                              </span>
                            </div>
                            <div className="mt-3 flex items-center gap-4 text-xs text-gray-500">
                              <div className="flex items-center gap-1">
                                <Users className="h-3 w-3" />
                                <span>{deal.contacts.length}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                <span>{deal.expectedCloseDate}</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>

      {/* Deal Details Modal */}
      {selectedDeal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Deal Details</h3>
              <button
                onClick={() => setSelectedDeal(null)}
                className="text-gray-400 hover:text-gray-500"
              >
                ×
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-medium text-gray-500">Deal Info</h4>
                <p className="mt-1 text-lg font-medium text-gray-900">{selectedDeal.title}</p>
                <p className="text-sm text-gray-500">{selectedDeal.company}</p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-500">Value</h4>
                <p className="mt-1 text-2xl font-semibold text-gray-900">
                  {formatCurrency(selectedDeal.value)}
                </p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-500">Owner</h4>
                <div className="mt-2 flex items-center gap-3">
                  <img
                    src={selectedDeal.owner.avatar}
                    alt={selectedDeal.owner.name}
                    className="h-8 w-8 rounded-full"
                  />
                  <span className="text-sm text-gray-900">{selectedDeal.owner.name}</span>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-500">Contacts</h4>
                <div className="mt-2 space-y-2">
                  {selectedDeal.contacts.map((contact, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{contact}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-500">Expected Close Date</h4>
                <div className="mt-2 flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-900">{selectedDeal.expectedCloseDate}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setSelectedDeal(null)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
              >
                Close
              </button>
              <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg">
                Edit Deal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}