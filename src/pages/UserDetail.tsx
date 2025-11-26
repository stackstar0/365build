import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useUser } from '../hooks/useApi';
import { apiService } from '../services/api';
import { Blog, Comment } from '../types';
import './UserDetail.css';

const UserDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const userId = parseInt(id || '0');

  const { user, loading, error } = useUser(userId);
  const [userBlogs, setUserBlogs] = useState<Blog[]>([]);
  const [userComments, setUserComments] = useState<Comment[]>([]);
  const [activeTab, setActiveTab] = useState<'profile' | 'blogs' | 'comments'>('profile');
  const [blogsLoading, setBlogsLoading] = useState(false);
  const [commentsLoading, setCommentsLoading] = useState(false);

  const loadUserBlogs = async () => {
    if (userBlogs.length === 0) {
      setBlogsLoading(true);
      try {
        const blogs = await apiService.getUserBlogs(userId);
        setUserBlogs(blogs);
      } catch (err) {
        console.error('Failed to load user blogs:', err);
      } finally {
        setBlogsLoading(false);
      }
    }
  };

  const loadUserComments = async () => {
    if (userComments.length === 0) {
      setCommentsLoading(true);
      try {
        const comments = await apiService.getUserComments(userId);
        setUserComments(comments);
      } catch (err) {
        console.error('Failed to load user comments:', err);
      } finally {
        setCommentsLoading(false);
      }
    }
  };

  const handleTabChange = (tab: 'profile' | 'blogs' | 'comments') => {
    setActiveTab(tab);
    if (tab === 'blogs') loadUserBlogs();
    if (tab === 'comments') loadUserComments();
  };

  if (loading) {
    return (
      <div className="user-detail-container">
        <div className="loading">Loading user profile...</div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="user-detail-container">
        <div className="error">Error loading user profile or user not found</div>
        <Link to="/users" className="back-link">← Back to Users</Link>
      </div>
    );
  }

  return (
    <div className="user-detail-container">
      <div className="user-detail-header">
        <Link to="/users" className="back-link">← Back to Users</Link>
      </div>

      <div className="user-profile-card">
        <div className="user-avatar-large">
          {user.name.charAt(0).toUpperCase()}
        </div>
        <div className="user-info">
          <h1 className="user-name">{user.name}</h1>
          <p className="user-username">@{user.username}</p>

          <div className="user-contact-grid">
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
        </div>
      </div>

      <div className="user-detail-tabs">
        <button
          className={`tab-button ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => handleTabChange('profile')}
        >
          Profile
        </button>
        <button
          className={`tab-button ${activeTab === 'blogs' ? 'active' : ''}`}
          onClick={() => handleTabChange('blogs')}
        >
          Blogs ({userBlogs.length > 0 ? userBlogs.length : '?'})
        </button>
        <button
          className={`tab-button ${activeTab === 'comments' ? 'active' : ''}`}
          onClick={() => handleTabChange('comments')}
        >
          Comments ({userComments.length > 0 ? userComments.length : '?'})
        </button>
      </div>

      <div className="user-detail-content">
        {activeTab === 'profile' && (
          <div className="profile-tab">
            {user.address && (
              <div className="info-section">
                <h3>Address</h3>
                <div className="address-info">
                  <p>{user.address.street}, {user.address.suite}</p>
                  <p>{user.address.city}, {user.address.zipcode}</p>
                  {user.address.geo && (
                    <p className="geo-coordinates">
                      Coordinates: {user.address.geo.lat}, {user.address.geo.lng}
                    </p>
                  )}
                </div>
              </div>
            )}

            {user.company && (
              <div className="info-section">
                <h3>Company</h3>
                <div className="company-info">
                  <h4>{user.company.name}</h4>
                  <p className="company-catchphrase">"{user.company.catchPhrase}"</p>
                  <p className="company-bs">{user.company.bs}</p>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'blogs' && (
          <div className="blogs-tab">
            {blogsLoading ? (
              <div className="loading">Loading user blogs...</div>
            ) : (
              <div className="blogs-list">
                {userBlogs.map((blog) => (
                  <div key={blog.id} className="blog-item">
                    <h4>
                      <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                    </h4>
                    <p className="blog-excerpt">
                      {blog.body.length > 200
                        ? `${blog.body.substring(0, 200)}...`
                        : blog.body
                      }
                    </p>
                    <Link to={`/blogs/${blog.id}`} className="read-more">
                      Read More →
                    </Link>
                  </div>
                ))}
                {userBlogs.length === 0 && (
                  <p className="no-content">This user hasn't published any blogs yet.</p>
                )}
              </div>
            )}
          </div>
        )}

        {activeTab === 'comments' && (
          <div className="comments-tab">
            {commentsLoading ? (
              <div className="loading">Loading user comments...</div>
            ) : (
              <div className="comments-list">
                {userComments.map((comment) => (
                  <div key={comment.id} className="comment-item">
                    <h5 className="comment-title">{comment.name}</h5>
                    <p className="comment-body">{comment.body}</p>
                    <div className="comment-meta">
                      <span>On post #{comment.postId}</span>
                      <Link to={`/blogs/${comment.postId}`} className="view-post">
                        View Post →
                      </Link>
                    </div>
                  </div>
                ))}
                {userComments.length === 0 && (
                  <p className="no-content">This user hasn't made any comments yet.</p>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDetail;