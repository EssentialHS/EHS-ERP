import React, { useState } from 'react';
import { Plus, Image, Video, Link2, Calendar, MoreVertical, Heart, MessageCircle, Share2 } from 'lucide-react';

interface Post {
  id: number;
  content: string;
  image?: string;
  platform: 'facebook' | 'twitter' | 'linkedin' | 'instagram';
  status: 'draft' | 'scheduled' | 'published';
  publishDate?: string;
  engagement: {
    likes: number;
    comments: number;
    shares: number;
  };
  author: {
    name: string;
    avatar: string;
  };
}

const initialPosts: Post[] = [
  {
    id: 1,
    content: "Excited to announce our latest product launch! Stay tuned for more updates. #innovation #technology",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=2700&q=80",
    platform: "linkedin",
    status: "published",
    publishDate: "2024-03-15",
    engagement: {
      likes: 245,
      comments: 32,
      shares: 18
    },
    author: {
      name: "Sarah Chen",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    }
  },
  {
    id: 2,
    content: "Join us for our upcoming webinar on digital transformation strategies! Register now at the link below.",
    platform: "twitter",
    status: "scheduled",
    publishDate: "2024-03-20",
    engagement: {
      likes: 0,
      comments: 0,
      shares: 0
    },
    author: {
      name: "David Kim",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    }
  }
];

const platformColors = {
  facebook: 'bg-blue-100 text-blue-800',
  twitter: 'bg-sky-100 text-sky-800',
  linkedin: 'bg-indigo-100 text-indigo-800',
  instagram: 'bg-pink-100 text-pink-800'
};

const statusColors = {
  draft: 'bg-gray-100 text-gray-800',
  scheduled: 'bg-yellow-100 text-yellow-800',
  published: 'bg-green-100 text-green-800'
};

export default function PostsManager() {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [showNewPostForm, setShowNewPostForm] = useState(false);
  const [newPost, setNewPost] = useState<Partial<Post>>({
    platform: 'linkedin',
    status: 'draft'
  });

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Social Media Posts</h2>
          <p className="text-sm text-gray-500 mt-1">
            Create and manage your social media content
          </p>
        </div>
        <button
          onClick={() => setShowNewPostForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="h-4 w-4" />
          Create Post
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <p className="text-sm font-medium text-gray-500">Total Posts</p>
          <p className="mt-2 text-3xl font-semibold text-gray-900">
            {posts.length}
          </p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <p className="text-sm font-medium text-gray-500">Scheduled</p>
          <p className="mt-2 text-3xl font-semibold text-gray-900">
            {posts.filter(post => post.status === 'scheduled').length}
          </p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <p className="text-sm font-medium text-gray-500">Total Engagement</p>
          <p className="mt-2 text-3xl font-semibold text-gray-900">
            {posts.reduce((sum, post) => 
              sum + post.engagement.likes + post.engagement.comments + post.engagement.shares
            , 0)}
          </p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <p className="text-sm font-medium text-gray-500">Platforms</p>
          <p className="mt-2 text-3xl font-semibold text-gray-900">4</p>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-2 gap-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-lg border border-gray-200 overflow-hidden"
          >
            {post.image && (
              <img
                src={post.image}
                alt="Post"
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="h-8 w-8 rounded-full"
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {post.author.name}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${platformColors[post.platform]}`}>
                        {post.platform}
                      </span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[post.status]}`}>
                        {post.status}
                      </span>
                    </div>
                  </div>
                </div>
                <button className="p-2 hover:bg-gray-50 rounded-lg">
                  <MoreVertical className="h-5 w-5 text-gray-400" />
                </button>
              </div>

              <p className="text-gray-600 mb-4">{post.content}</p>

              {post.status !== 'draft' && (
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <Heart className="h-4 w-4" />
                      <span>{post.engagement.likes}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MessageCircle className="h-4 w-4" />
                      <span>{post.engagement.comments}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Share2 className="h-4 w-4" />
                      <span>{post.engagement.shares}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{post.publishDate}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* New Post Modal */}
      {showNewPostForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Create New Post
              </h3>
              <button
                onClick={() => setShowNewPostForm(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                ×
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Content
                </label>
                <textarea
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="What would you like to share?"
                  value={newPost.content || ''}
                  onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                />
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Platform
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newPost.platform}
                    onChange={(e) => setNewPost({ ...newPost, platform: e.target.value as Post['platform'] })}
                  >
                    <option value="linkedin">LinkedIn</option>
                    <option value="twitter">Twitter</option>
                    <option value="facebook">Facebook</option>
                    <option value="instagram">Instagram</option>
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newPost.status}
                    onChange={(e) => setNewPost({ ...newPost, status: e.target.value as Post['status'] })}
                  >
                    <option value="draft">Draft</option>
                    <option value="scheduled">Scheduled</option>
                    <option value="published">Published</option>
                  </select>
                </div>
              </div>

              {newPost.status === 'scheduled' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Publish Date
                  </label>
                  <input
                    type="datetime-local"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newPost.publishDate || ''}
                    onChange={(e) => setNewPost({ ...newPost, publishDate: e.target.value })}
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Media
                </label>
                <div className="flex gap-4">
                  <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    <Image className="h-5 w-5 text-gray-400" />
                    <span className="text-sm text-gray-700">Add Image</span>
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    <Video className="h-5 w-5 text-gray-400" />
                    <span className="text-sm text-gray-700">Add Video</span>
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    <Link2 className="h-5 w-5 text-gray-400" />
                    <span className="text-sm text-gray-700">Add Link</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowNewPostForm(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
              >
                Cancel
              </button>
              <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg">
                Create Post
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}