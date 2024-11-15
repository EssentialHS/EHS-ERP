import React, { useState } from 'react';
import { Star, TrendingUp, BarChart2, Plus } from 'lucide-react';

interface Review {
  id: number;
  employeeId: number;
  employeeName: string;
  avatar: string;
  position: string;
  department: string;
  rating: number;
  reviewDate: string;
  reviewPeriod: string;
  goals: {
    achieved: number;
    total: number;
  };
  strengths: string[];
  improvements: string[];
}

const initialReviews: Review[] = [
  {
    id: 1,
    employeeId: 1,
    employeeName: 'Sarah Chen',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    position: 'Senior Developer',
    department: 'Engineering',
    rating: 4.5,
    reviewDate: '2024-03-15',
    reviewPeriod: 'Q1 2024',
    goals: {
      achieved: 8,
      total: 10
    },
    strengths: ['Technical leadership', 'Problem solving', 'Team collaboration'],
    improvements: ['Documentation', 'Knowledge sharing']
  }
];

export default function PerformanceReview() {
  const [reviews] = useState<Review[]>(initialReviews);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < rating
            ? 'text-yellow-400 fill-current'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Performance Reviews</h2>
          <p className="text-sm text-gray-500 mt-1">
            Track and manage employee performance evaluations
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <Plus className="h-4 w-4" />
          New Review
        </button>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-2 gap-6">
        {reviews.map((review) => (
          <div
            key={review.id}
            onClick={() => setSelectedReview(review)}
            className="bg-white rounded-lg border border-gray-200 p-6 cursor-pointer hover:border-blue-500 transition-colors"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <img
                  src={review.avatar}
                  alt={review.employeeName}
                  className="h-12 w-12 rounded-full"
                />
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {review.employeeName}
                  </h3>
                  <p className="text-sm text-gray-500">{review.position}</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {renderStars(review.rating)}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Review Period</p>
                <p className="mt-1 text-sm text-gray-900">{review.reviewPeriod}</p>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-500">Goals Progress</p>
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{
                        width: `${(review.goals.achieved / review.goals.total) * 100}%`,
                      }}
                    />
                  </div>
                  <span className="text-sm text-gray-600">
                    {review.goals.achieved}/{review.goals.total}
                  </span>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-500">Key Strengths</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {review.strengths.map((strength, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full"
                    >
                      {strength}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Review Details Modal */}
      {selectedReview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Performance Review Details
              </h3>
              <button
                onClick={() => setSelectedReview(null)}
                className="text-gray-400 hover:text-gray-500"
              >
                ×
              </button>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <img
                  src={selectedReview.avatar}
                  alt={selectedReview.employeeName}
                  className="h-16 w-16 rounded-full"
                />
                <div>
                  <h4 className="text-xl font-medium text-gray-900">
                    {selectedReview.employeeName}
                  </h4>
                  <p className="text-sm text-gray-500">
                    {selectedReview.position} • {selectedReview.department}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-500">Rating</p>
                  <div className="mt-2 flex items-center gap-2">
                    <div className="flex">{renderStars(selectedReview.rating)}</div>
                    <span className="text-lg font-semibold text-gray-900">
                      {selectedReview.rating}
                    </span>
                  </div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-500">Review Period</p>
                  <p className="mt-2 text-lg font-semibold text-gray-900">
                    {selectedReview.reviewPeriod}
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-500">Goals Achieved</p>
                  <p className="mt-2 text-lg font-semibold text-gray-900">
                    {selectedReview.goals.achieved}/{selectedReview.goals.total}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h5 className="text-sm font-medium text-gray-900 mb-2">
                    Key Strengths
                  </h5>
                  <ul className="space-y-2">
                    {selectedReview.strengths.map((strength, index) => (
                      <li
                        key={index}
                        className="flex items-center gap-2 text-sm text-gray-600"
                      >
                        <span className="h-1.5 w-1.5 bg-green-500 rounded-full" />
                        {strength}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h5 className="text-sm font-medium text-gray-900 mb-2">
                    Areas for Improvement
                  </h5>
                  <ul className="space-y-2">
                    {selectedReview.improvements.map((improvement, index) => (
                      <li
                        key={index}
                        className="flex items-center gap-2 text-sm text-gray-600"
                      >
                        <span className="h-1.5 w-1.5 bg-yellow-500 rounded-full" />
                        {improvement}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setSelectedReview(null)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
              >
                Close
              </button>
              <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg">
                Edit Review
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}