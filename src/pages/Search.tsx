import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useBlogs, useUsers } from '../hooks/useApi';
import './Search.css';

const Search: React.FC = () => {
  const { blogs, loading: blogsLoading } = useBlogs();
  const { users, loading: usersLoading } = useUsers();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState<'all' | 'blogs' | 'users'>('all');

  // Create a map of users for quick lookup
  const userMap = useMemo(() => {
    const map: { [key: number]: any } = {};
    users.forEach(user => {
      map[user.id] = user;
    });
    return map;
  }, [users]);

  // Search results
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) {
      return { blogs: [], users: [] };
    }

    const query = searchQuery.toLowerCase();

    const matchedBlogs = blogs.filter(blog =>
      blog.title.toLowerCase().includes(query) ||
      blog.body.toLowerCase().includes(query) ||
      userMap[blog.userId]?.name.toLowerCase().includes(query)
    );

    const matchedUsers = users.filter(user =>
      user.name.toLowerCase().includes(query) ||
      user.username.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query) ||
      user.phone.toLowerCase().includes(query) ||
      user.website.toLowerCase().includes(query) ||
      (user.company?.name && user.company.name.toLowerCase().includes(query))
    );

    return { blogs: matchedBlogs, users: matchedUsers };
  }, [searchQuery, blogs, users, userMap]);

  const loading = blogsLoading || usersLoading;

  const renderBlogResults = () => {
    if (searchType !== 'all' && searchType !== 'blogs') return null;

    return (
      <div className="search-section">
        <h3>Blogs ({searchResults.blogs.length})</h3>
        {searchResults.blogs.length > 0 ? (
          <div className="results-grid">
            {searchResults.blogs.map((blog) => (
              <div key={blog.id} className="result-card blog-result">
                <div className="result-header">
                  <span className="result-type">Blog #{blog.id}</span>
                  {userMap[blog.userId] && (
                    <Link to={`/users/${blog.userId}`} className="result-author">
                      By {userMap[blog.userId].name}
                    </Link>
                  )}
                </div>
                <h4>
                  <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                </h4>
                <p className="result-excerpt">
                  {blog.body.length > 150
                    ? `${blog.body.substring(0, 150)}...`
                    : blog.body
                  }
                </p>
                <Link to={`/blogs/${blog.id}`} className="result-link">
                  Read Blog →
                </Link>
              </div>
            ))}
          </div>
        ) : searchQuery.trim() && (
          <p className="no-results">No blogs found matching your search.</p>
        )}
      </div>
    );
  };

  const renderUserResults = () => {
    if (searchType !== 'all' && searchType !== 'users') return null;

    return (
      <div className="search-section">
        <h3>Users ({searchResults.users.length})</h3>
        {searchResults.users.length > 0 ? (
          <div className="results-grid">
            {searchResults.users.map((user) => (
              <div key={user.id} className="result-card user-result">
                <div className="user-result-header">
                  <div className="user-avatar">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="user-basic-info">
                    <h4>
                      <Link to={`/users/${user.id}`}>{user.name}</Link>
                    </h4>
                    <p>@{user.username}</p>
                  </div>
                </div>
                <div className="user-contact-preview">
                  <span>Email: {user.email}</span>
                  <span>Website: {user.website}</span>
                </div>
                <Link to={`/users/${user.id}`} className="result-link">
                  View Profile →
                </Link>
              </div>
            ))}
          </div>
        ) : searchQuery.trim() && (
          <p className="no-results">No users found matching your search.</p>
        )}
      </div>
    );
  };

  return (
    <div className="search-container">
      <div className="search-header">
        <h1>Search</h1>
        <p>Find blogs and users across the entire platform</p>
      </div>

      <div className="search-controls">
        <div className="search-input-section">
          <input
            type="text"
            placeholder="Search for blogs, users, topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
            autoFocus
          />
        </div>

        <div className="search-filters">
          <label>Search in:</label>
          <div className="filter-buttons">
            <button
              className={`filter-button ${searchType === 'all' ? 'active' : ''}`}
              onClick={() => setSearchType('all')}
            >
              All
            </button>
            <button
              className={`filter-button ${searchType === 'blogs' ? 'active' : ''}`}
              onClick={() => setSearchType('blogs')}
            >
              Blogs
            </button>
            <button
              className={`filter-button ${searchType === 'users' ? 'active' : ''}`}
              onClick={() => setSearchType('users')}
            >
              Users
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="loading">Loading search data...</div>
      ) : (
        <div className="search-results">
          {!searchQuery.trim() ? (
            <div className="search-placeholder">
              <div className="placeholder-content">
                <h3>Start searching to discover content</h3>
                <p>Use the search box above to find blogs, users, and topics across the platform.</p>
                <div className="search-tips">
                  <h4>Search Tips:</h4>
                  <ul>
                    <li>Search by blog titles, content, or author names</li>
                    <li>Find users by name, username, email, or company</li>
                    <li>Use specific keywords for better results</li>
                    <li>Filter results by type using the buttons above</li>
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <div className="results-container">
              <div className="results-summary">
                Found {searchResults.blogs.length} blog{searchResults.blogs.length !== 1 ? 's' : ''} and {searchResults.users.length} user{searchResults.users.length !== 1 ? 's' : ''} for "{searchQuery}"
              </div>

              {renderBlogResults()}
              {renderUserResults()}

              {searchResults.blogs.length === 0 && searchResults.users.length === 0 && (
                <div className="no-overall-results">
                  <h3>No results found</h3>
                  <p>Try adjusting your search terms or browse our <Link to="/blogs">blogs</Link> and <Link to="/users">users</Link> directly.</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;