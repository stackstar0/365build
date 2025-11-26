import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useBlogs, useUsers } from '../hooks/useApi';
import { User } from '../types';
import './Blogs.css';

const Blogs: React.FC = () => {
  const { blogs, loading: blogsLoading, error: blogsError } = useBlogs();
  const { users, loading: usersLoading } = useUsers();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'title' | 'id' | 'userId'>('id');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Create a map of users for quick lookup
  const userMap = useMemo(() => {
    const map: { [key: number]: User } = {};
    users.forEach(user => {
      map[user.id] = user;
    });
    return map;
  }, [users]);

  // Filter and sort blogs
  const filteredAndSortedBlogs = useMemo(() => {
    let filtered = blogs.filter(blog =>
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.body.toLowerCase().includes(searchQuery.toLowerCase()) ||
      userMap[blog.userId]?.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    filtered.sort((a, b) => {
      let aValue: string | number;
      let bValue: string | number;

      switch (sortBy) {
        case 'title':
          aValue = a.title.toLowerCase();
          bValue = b.title.toLowerCase();
          break;
        case 'userId':
          aValue = userMap[a.userId]?.name.toLowerCase() || '';
          bValue = userMap[b.userId]?.name.toLowerCase() || '';
          break;
        case 'id':
        default:
          aValue = a.id;
          bValue = b.id;
          break;
      }

      if (sortOrder === 'desc') {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    });

    return filtered;
  }, [blogs, searchQuery, sortBy, sortOrder, userMap]);

  if (blogsLoading || usersLoading) {
    return (
      <div className="blogs-container">
        <div className="loading">Loading blogs...</div>
      </div>
    );
  }

  if (blogsError) {
    return (
      <div className="blogs-container">
        <div className="error">Error loading blogs: {blogsError}</div>
      </div>
    );
  }

  return (
    <div className="blogs-container">
      <div className="blogs-header">
        <h1>All Blogs</h1>
        <p>Discover and explore blogs from our community</p>
      </div>

      <div className="blogs-controls">
        <div className="search-section">
          <input
            type="text"
            placeholder="Search blogs by title, content, or author..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="sort-section">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'title' | 'id' | 'userId')}
            className="sort-select"
          >
            <option value="id">Sort by ID</option>
            <option value="title">Sort by Title</option>
            <option value="userId">Sort by Author</option>
          </select>

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
            className="sort-select"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>

      <div className="blogs-stats">
        Showing {filteredAndSortedBlogs.length} of {blogs.length} blogs
      </div>

      <div className="blogs-grid">
        {filteredAndSortedBlogs.map((blog) => (
          <div key={blog.id} className="blog-card">
            <div className="blog-header">
              <span className="blog-id">#{blog.id}</span>
              {userMap[blog.userId] && (
                <Link to={`/users/${blog.userId}`} className="blog-author">
                  By {userMap[blog.userId].name}
                </Link>
              )}
            </div>
            <h3 className="blog-title">
              <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
            </h3>
            <p className="blog-excerpt">
              {blog.body.length > 150
                ? `${blog.body.substring(0, 150)}...`
                : blog.body
              }
            </p>
            <div className="blog-actions">
              <Link to={`/blogs/${blog.id}`} className="read-more">
                Read Full Blog →
              </Link>
            </div>
          </div>
        ))}
      </div>

      {filteredAndSortedBlogs.length === 0 && searchQuery && (
        <div className="no-results">
          <p>No blogs found matching "{searchQuery}"</p>
          <button onClick={() => setSearchQuery('')} className="clear-search">
            Clear Search
          </button>
        </div>
      )}
    </div>
  );
};

export default Blogs;