import React, { useState } from 'react';
import { Plus, Search, Filter, MoreVertical, DollarSign, Calendar, Building2, Users } from 'lucide-react';

interface Deal {
  id: number;
  title: string;
  company: string;
  value: number;
  stage: 'qualification' | 'proposal' | 'negotiation' | 'closed-won' | 'closed-lost';
  probability: number;
  expectedCloseDate: string;
  owner: {
    name: string;
    avatar: string;
  };
  contacts: {
    name: string;
    position: string;
  }[];
  notes: string;
  lastActivity: string;
}

const initialDeals: Deal[] = [
  {
    id: 1,
    title: 'Enterprise Software License',
    company: 'TechCorp Inc.',
    value: 75000,
    stage: 'negotiation',
    probability: 80,
    expectedCloseDate: '2024-04-15',
    owner: {
      name: 'Sarah Chen',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    contacts: [
      { name: 'John Smith', position: 'CTO' },
      { name: 'Emma Wilson', position: 'Procurement Manager' }
    ],
    notes: 'Final contract review in progress. Legal team reviewing terms.',
    lastActivity: '2024-03-15'
  },
  {
    id: 2,
    title: 'Cloud Migration Project',
    company: 'InnovaTech Solutions',
    value: 120000,
    stage: 'proposal',
    probability: 60,
    expectedCloseDate: '2024-05-01',
    owner: {
      name: 'Alex Morgan',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    contacts: [
      { name: 'Sarah Johnson', position: 'CEO' },
      { name: 'Mike Chen', position: 'IT Director' }
    ],
    notes: 'Technical requirements gathered. Preparing detailed proposal.',
    lastActivity: '2024-03-14'
  }
];

const stageColors = {
  qualification: 'bg-purple-100 text-purple-800',
  proposal: 'bg-blue-100 text-blue-800',
  negotiation: 'bg-yellow-100 text-yellow-800',
  'closed-won': 'bg-green-100 text-green-800',
  'closed-lost': 'bg-red-100 text-red-800',
};

export default function DealsList() {
  const [deals, setDeals] = useState<Deal[]>(initialDeals);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);
  const [showNewDealForm, setShowNewDealForm] = useState(false);
  const [newDeal, setNewDeal] = useState<Partial<Deal>>({
    stage: 'qualification',
    probability: 50,
  });

  const filteredDeals = deals.filter(deal =>
    deal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    deal.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };

  const handleCreateDeal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDeal.title || !newDeal.company || !newDeal.value) return;

    const deal: Deal = {
      id: deals.length + 1,
      title: newDeal.title,
      company: newDeal.company,
      value: newDeal.value,
      stage: newDeal.stage as Deal['stage'],
      probability: newDeal.probability || 50,
      expectedCloseDate: newDeal.expectedCloseDate || new Date().toISOString().split('T')[0],
      owner: {
        name: 'Sarah Chen',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      contacts: [],
      notes: '',
      lastActivity: new Date().toISOString().split('T')[0],
    };

    setDeals([...deals, deal]);
    setShowNewDealForm(false);
    setNewDeal({ stage: 'qualification', probability: 50 });
  };

  const handleStageChange = (dealId: number, newStage: Deal['stage']) => {
    setDeals(deals.map(deal =>
      deal.id === dealId ? { ...deal, stage: newStage } : deal
    ));
  };

  return (
    <div className="h-full flex">
      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">Deals</h2>
            <p className="text-sm text-gray-500 mt-1">
              Track and manage your sales opportunities
            </p>
          </div>
          <button 
            onClick={() => setShowNewDealForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="h-4 w-4" />
            New Deal
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <p className="text-sm font-medium text-gray-500">Total Pipeline</p>
            <p className="mt-2 text-2xl font-semibold text-gray-900">
              {formatCurrency(deals.reduce((sum, deal) => sum + deal.value, 0))}
            </p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <p className="text-sm font-medium text-gray-500">Average Deal Size</p>
            <p className="mt-2 text-2xl font-semibold text-gray-900">
              {formatCurrency(deals.reduce((sum, deal) => sum + deal.value, 0) / deals.length)}
            </p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <p className="text-sm font-medium text-gray-500">Win Rate</p>
            <p className="mt-2 text-2xl font-semibold text-gray-900">65%</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <p className="text-sm font-medium text-gray-500">Active Deals</p>
            <p className="mt-2 text-2xl font-semibold text-gray-900">{deals.length}</p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search deals..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50">
            <Filter className="h-5 w-5 text-gray-600" />
          </button>
        </div>

        {/* Deals Table */}
        <div className="bg-white rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Deal
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Value
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stage
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Owner
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Close Date
                </th>
                <th className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredDeals.map((deal) => (
                <tr
                  key={deal.id}
                  onClick={() => setSelectedDeal(deal)}
                  className="hover:bg-gray-50 cursor-pointer"
                >
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">
                      {deal.title}
                    </div>
                    <div className="text-sm text-gray-500">{deal.company}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {formatCurrency(deal.value)}
                    </div>
                    <div className="text-xs text-gray-500">
                      {deal.probability}% probability
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={deal.stage}
                      onChange={(e) => handleStageChange(deal.id, e.target.value as Deal['stage'])}
                      onClick={(e) => e.stopPropagation()}
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${stageColors[deal.stage]} border-0 focus:ring-2 focus:ring-blue-500`}
                    >
                      <option value="qualification">Qualification</option>
                      <option value="proposal">Proposal</option>
                      <option value="negotiation">Negotiation</option>
                      <option value="closed-won">Closed Won</option>
                      <option value="closed-lost">Closed Lost</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        className="h-8 w-8 rounded-full"
                        src={deal.owner.avatar}
                        alt={deal.owner.name}
                      />
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">
                          {deal.owner.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {deal.expectedCloseDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedDeal(deal);
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
      </div>

      {/* Deal Details Sidebar */}
      {selectedDeal && (
        <div className="w-96 border-l border-gray-200 p-6 bg-gray-50 overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Deal Details</h3>
            <button
              onClick={() => setSelectedDeal(null)}
              className="text-gray-400 hover:text-gray-500"
            >
              <MoreVertical className="h-5 w-5" />
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-medium text-gray-500">Deal Value</h4>
              <div className="mt-2 flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-gray-400" />
                <span className="text-2xl font-semibold text-gray-900">
                  {formatCurrency(selectedDeal.value)}
                </span>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-500">Company</h4>
              <div className="mt-2 flex items-center gap-2">
                <Building2 className="h-5 w-5 text-gray-400" />
                <span className="text-sm text-gray-900">
                  {selectedDeal.company}
                </span>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-500">Close Date</h4>
              <div className="mt-2 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-gray-400" />
                <span className="text-sm text-gray-900">
                  {selectedDeal.expectedCloseDate}
                </span>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-500">Owner</h4>
              <div className="mt-2 flex items-center gap-3">
                <img
                  src={selectedDeal.owner.avatar}
                  alt={selectedDeal.owner.name}
                  className="h-8 w-8 rounded-full"
                />
                <span className="text-sm text-gray-900">
                  {selectedDeal.owner.name}
                </span>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-500">Key Contacts</h4>
              <div className="mt-2 space-y-2">
                {selectedDeal.contacts.map((contact, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-900">{contact.name}</p>
                      <p className="text-xs text-gray-500">{contact.position}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-500">Notes</h4>
              <p className="mt-2 text-sm text-gray-600">{selectedDeal.notes}</p>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-500">Stage</h4>
              <div className="mt-2">
                <select
                  value={selectedDeal.stage}
                  onChange={(e) => handleStageChange(selectedDeal.id, e.target.value as Deal['stage'])}
                  className={`w-full px-3 py-2 text-sm rounded-lg ${stageColors[selectedDeal.stage]} border-0 focus:ring-2 focus:ring-blue-500`}
                >
                  <option value="qualification">Qualification</option>
                  <option value="proposal">Proposal</option>
                  <option value="negotiation">Negotiation</option>
                  <option value="closed-won">Closed Won</option>
                  <option value="closed-lost">Closed Lost</option>
                </select>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="text-sm font-medium text-gray-900 mb-2">Actions</h4>
            <div className="grid grid-cols-2 gap-2">
              <button className="px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100">
                Edit Deal
              </button>
              <button className="px-3 py-2 text-sm font-medium text-green-600 bg-green-50 rounded-lg hover:bg-green-100">
                Mark as Won
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Deal Modal */}
      {showNewDealForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Create New Deal
              </h3>
              <button
                onClick={() => setShowNewDealForm(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                ×
              </button>
            </div>
            <form onSubmit={handleCreateDeal}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Deal Title
                  </label>
                  <input
                    type="text"
                    value={newDeal.title || ''}
                    onChange={(e) =>
                      setNewDeal({ ...newDeal, title: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company
                  </label>
                  <input
                    type="text"
                    value={newDeal.company || ''}
                    onChange={(e) =>
                      setNewDeal({ ...newDeal, company: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Value
                    </label>
                    <input
                      type="number"
                      value={newDeal.value || ''}
                      onChange={(e) =>
                        setNewDeal({ ...newDeal, value: Number(e.target.value) })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Probability
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={newDeal.probability || 50}
                      onChange={(e) =>
                        setNewDeal({ ...newDeal, probability: Number(e.target.value) })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Expected Close Date
                  </label>
                  <input
                    type="date"
                    value={newDeal.expectedCloseDate || ''}
                    onChange={(e) =>
                      setNewDeal({ ...newDeal, expectedCloseDate: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Stage
                  </label>
                  <select
                    value={newDeal.stage}
                    onChange={(e) =>
                      setNewDeal({ ...newDeal, stage: e.target.value as Deal['stage'] })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="qualification">Qualification</option>
                    <option value="proposal">Proposal</option>
                    <option value="negotiation">Negotiation</option>
                    <option value="closed-won">Closed Won</option>
                    <option value="closed-lost">Closed Lost</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowNewDealForm(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
                >
                  Create Deal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}