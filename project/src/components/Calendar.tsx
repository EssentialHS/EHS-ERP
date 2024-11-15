import React from 'react';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  type: 'meeting' | 'deadline' | 'reminder';
  participants?: string[];
}

const events: Event[] = [
  {
    id: 1,
    title: 'Team Sprint Planning',
    date: '2024-03-15',
    time: '10:00 AM',
    type: 'meeting',
    participants: ['Sarah Chen', 'Alex Morgan', 'David Kim']
  },
  {
    id: 2,
    title: 'Project Deadline: Q1 Report',
    date: '2024-03-15',
    time: '5:00 PM',
    type: 'deadline'
  },
  {
    id: 3,
    title: 'Client Meeting: TechCorp',
    date: '2024-03-15',
    time: '2:30 PM',
    type: 'meeting',
    participants: ['Sarah Chen', 'Emily Wang']
  }
];

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function Calendar() {
  const [currentDate, setCurrentDate] = React.useState(new Date());
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();
    
    return { daysInMonth, startingDay };
  };

  const { daysInMonth, startingDay } = getDaysInMonth(currentDate);
  
  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const isToday = (day: number) => {
    const today = new Date();
    return day === today.getDate() && 
           currentDate.getMonth() === today.getMonth() && 
           currentDate.getFullYear() === today.getFullYear();
  };

  const isSelected = (day: number) => {
    return day === selectedDate.getDate() && 
           currentDate.getMonth() === selectedDate.getMonth() && 
           currentDate.getFullYear() === selectedDate.getFullYear();
  };

  const hasEvents = (day: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events.some(event => event.date === dateStr);
  };

  const getDayEvents = (day: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events.filter(event => event.date === dateStr);
  };

  return (
    <div className="h-full flex">
      {/* Calendar Grid */}
      <div className="flex-1 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">
            {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
          </h2>
          <div className="flex items-center gap-4">
            <button
              onClick={prevMonth}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <ChevronLeft className="h-5 w-5 text-gray-600" />
            </button>
            <button
              onClick={nextMonth}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <ChevronRight className="h-5 w-5 text-gray-600" />
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <Plus className="h-4 w-4" />
              Add Event
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-px bg-gray-200 rounded-lg overflow-hidden">
          {/* Day headers */}
          {daysOfWeek.map(day => (
            <div key={day} className="bg-white p-4">
              <span className="text-sm font-medium text-gray-500">{day}</span>
            </div>
          ))}

          {/* Calendar days */}
          {Array.from({ length: 42 }, (_, i) => {
            const day = i - startingDay + 1;
            const isValidDay = day > 0 && day <= daysInMonth;

            return (
              <div
                key={i}
                className={`bg-white p-4 min-h-[120px] ${
                  isValidDay ? 'cursor-pointer hover:bg-gray-50' : ''
                }`}
                onClick={() => isValidDay && setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day))}
              >
                {isValidDay && (
                  <>
                    <span
                      className={`inline-flex h-8 w-8 items-center justify-center rounded-full text-sm ${
                        isToday(day)
                          ? 'bg-blue-600 text-white'
                          : isSelected(day)
                          ? 'bg-blue-100 text-blue-600'
                          : 'text-gray-900'
                      }`}
                    >
                      {day}
                    </span>
                    <div className="mt-2 space-y-1">
                      {getDayEvents(day).map((event) => (
                        <div
                          key={event.id}
                          className={`text-xs px-2 py-1 rounded ${
                            event.type === 'meeting'
                              ? 'bg-blue-100 text-blue-700'
                              : event.type === 'deadline'
                              ? 'bg-red-100 text-red-700'
                              : 'bg-yellow-100 text-yellow-700'
                          }`}
                        >
                          {event.time} - {event.title}
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Event Details Sidebar */}
      <div className="w-80 border-l border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {selectedDate.toLocaleDateString('default', { 
            month: 'long',
            day: 'numeric',
            year: 'numeric'
          })}
        </h3>
        <div className="space-y-4">
          {getDayEvents(selectedDate.getDate()).map((event) => (
            <div
              key={event.id}
              className="p-4 rounded-lg border border-gray-200 hover:border-blue-500 cursor-pointer transition-colors"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">{event.title}</h4>
                  <p className="text-sm text-gray-500 mt-1">{event.time}</p>
                </div>
                <span
                  className={`px-2 py-1 text-xs rounded ${
                    event.type === 'meeting'
                      ? 'bg-blue-100 text-blue-700'
                      : event.type === 'deadline'
                      ? 'bg-red-100 text-red-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}
                >
                  {event.type}
                </span>
              </div>
              {event.participants && (
                <div className="mt-3">
                  <p className="text-xs text-gray-500 mb-2">Participants:</p>
                  <div className="flex -space-x-2">
                    {event.participants.map((participant, index) => (
                      <div
                        key={index}
                        className="h-8 w-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center"
                        title={participant}
                      >
                        <span className="text-xs font-medium">
                          {participant.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
          {getDayEvents(selectedDate.getDate()).length === 0 && (
            <p className="text-sm text-gray-500 text-center py-4">
              No events scheduled for this day
            </p>
          )}
        </div>
      </div>
    </div>
  );
}