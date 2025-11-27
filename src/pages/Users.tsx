import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useUsers } from '../hooks/useApi';
import './Users.css';

const Users: React.FC = () => {
  const { users, loading, error } = useUsers();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'email' | 'username'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');


  const filteredAndSortedUsers = useMemo(() => {
    let filtered = users.filter(user =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.website.toLowerCase().includes(searchQuery.toLowerCase())
    );

    filtered.sort((a, b) => {
      let aValue = a[sortBy].toLowerCase();
      let bValue = b[sortBy].toLowerCase();

      if (sortOrder === 'desc') {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    });

    return filtered;
  }, [users, searchQuery, sortBy, sortOrder]);

  if (loading) {
    return (
      <div className="users-container">
        <div className="loading">Loading users...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="users-container">
        <div className="error-container">
          <div className="error">
            <h3>⚠️ Unable to Load Users</h3>
            <p>{error}</p>
            <button
              className="retry-button"
              onClick={() => window.location.reload()}
            >
              🔄 Try Again
            </button>
          </div>
          <div className="error-help">
            <p><strong>Possible solutions:</strong></p>
            <ul>
              <li>Check your internet connection</li>
              <li>Try refreshing the page</li>
              <li>The API server might be temporarily unavailable</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="users-container">
      <div className="users-header">
        <h1>All Users</h1>
        <p>Meet our community of talented authors and contributors</p>
      </div>

      <div className="users-controls">
        <div className="search-section">
          <input
            type="text"
            placeholder="Search users by name, username, email, phone, or website..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="sort-section">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'name' | 'email' | 'username')}
            className="sort-select"
          >
            <option value="name">Sort by Name</option>
            <option value="username">Sort by Username</option>
            <option value="email">Sort by Email</option>
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

      <div className="users-stats">
        Showing {filteredAndSortedUsers.length} of {users.length} users
      </div>

      <div className="users-grid">
        {filteredAndSortedUsers.map((user) => (
          <div key={user.id} className="user-card">
            <div className="user-header">
              <div className="user-avatar">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="user-basic-info">
                <h3 className="user-name">
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </h3>
                <p className="user-username">@{user.username}</p>
              </div>
            </div>

            <div className="user-contact">
              <div className="contact-item">
                <span className="contact-icon">Email:</span>
                <a href={`mailto:${user.email}`} className="contact-link">
                  {user.email}
                </a>
              </div>
              <div className="contact-item">
                <span className="contact-icon">Phone:</span>
                <span className="contact-text">{user.phone}</span>
              </div>
              {user.website && (
                <div className="contact-item">
                  <span className="contact-icon">Website:</span>
                  <a
                    href={`http://${user.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-link"
                  >
                    {user.website}
                  </a>
                </div>
              )}
            </div>

            <div className="user-actions">
              <Link to={`/users/${user.id}`} className="view-profile">
                View Profile
              </Link>
            </div>
          </div>
        ))}
      </div>

      {filteredAndSortedUsers.length === 0 && searchQuery && (
        <div className="no-results">
          <p>No users found matching "{searchQuery}"</p>
          <button onClick={() => setSearchQuery('')} className="clear-search">
            Clear Search
          </button>
        </div>
      )}
    </div>
  );
};

export default Users;