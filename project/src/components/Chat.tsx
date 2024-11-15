import React from 'react';
import { MessageSquare, X, Send, Paperclip, Smile } from 'lucide-react';

interface Message {
  id: number;
  sender: string;
  content: string;
  timestamp: string;
  isMe: boolean;
  avatar: string;
}

const initialMessages: Message[] = [
  {
    id: 1,
    sender: 'Sarah Chen',
    content: 'Hi team, has anyone reviewed the latest sales report?',
    timestamp: '10:30 AM',
    isMe: true,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: 2,
    sender: 'Alex Morgan',
    content: 'Yes, I just finished reviewing it. The Q1 numbers look promising!',
    timestamp: '10:32 AM',
    isMe: false,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: 3,
    sender: 'Sarah Chen',
    content: 'Great! Let\'s discuss this in the team meeting tomorrow.',
    timestamp: '10:33 AM',
    isMe: true,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
];

export default function Chat() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [messages, setMessages] = React.useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = React.useState('');
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message: Message = {
      id: messages.length + 1,
      sender: 'Sarah Chen',
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true,
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    };

    setMessages([...messages, message]);
    setNewMessage('');
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 p-4 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-110 ${
          isOpen ? 'hidden' : ''
        }`}
      >
        <MessageSquare className="h-6 w-6" />
      </button>

      {/* Chat Panel */}
      <div
        className={`fixed inset-y-0 right-0 w-96 bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="h-16 border-b border-gray-200 px-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Team Chat</h3>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto h-[calc(100vh-8rem)]">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start gap-3 ${
                  message.isMe ? 'flex-row-reverse' : ''
                }`}
              >
                <img
                  src={message.avatar}
                  alt={message.sender}
                  className="h-8 w-8 rounded-full"
                />
                <div
                  className={`flex flex-col ${
                    message.isMe ? 'items-end' : 'items-start'
                  }`}
                >
                  <div
                    className={`px-4 py-2 rounded-lg max-w-[80%] ${
                      message.isMe
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                  </div>
                  <span className="text-xs text-gray-500 mt-1">
                    {message.timestamp}
                  </span>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input */}
        <form
          onSubmit={handleSendMessage}
          className="h-16 border-t border-gray-200 px-4 flex items-center gap-2"
        >
          <button
            type="button"
            className="p-2 text-gray-500 hover:text-gray-600"
          >
            <Paperclip className="h-5 w-5" />
          </button>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            className="p-2 text-gray-500 hover:text-gray-600"
          >
            <Smile className="h-5 w-5" />
          </button>
          <button
            type="submit"
            className="p-2 text-blue-600 hover:text-blue-700"
          >
            <Send className="h-5 w-5" />
          </button>
        </form>
      </div>
    </>
  );
}