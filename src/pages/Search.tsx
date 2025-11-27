import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useBlogs, useUsers, useComments } from '../hooks/useApi';
import './Search.css';

const Search: React.FC = () => {
  const { blogs, loading: blogsLoading } = useBlogs();
  const { users, loading: usersLoading } = useUsers();
  const { comments, loading: commentsLoading } = useComments();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState<'all' | 'blogs' | 'users' | 'comments'>('all');


  const userMap = useMemo(() => {
    const map: { [key: number]: any } = {};
    users.forEach(user => {
      map[user.id] = user;
    });
    return map;
  }, [users]);

  const blogMap = useMemo(() => {
    const map: { [key: number]: any } = {};
    blogs.forEach(blog => {
      map[blog.id] = blog;
    });
    return map;
  }, [blogs]);

  // Search results
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) {
      return { blogs: [], users: [], comments: [] };
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

    const matchedComments = comments.filter(comment =>
      comment.name.toLowerCase().includes(query) ||
      comment.body.toLowerCase().includes(query) ||
      comment.email.toLowerCase().includes(query) ||
      blogMap[comment.postId]?.title.toLowerCase().includes(query) ||
      userMap[blogMap[comment.postId]?.userId]?.name.toLowerCase().includes(query)
    );

    return { blogs: matchedBlogs, users: matchedUsers, comments: matchedComments };
  }, [searchQuery, blogs, users, comments, userMap, blogMap]);

  const loading = blogsLoading || usersLoading || commentsLoading;

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

  const renderCommentResults = () => {
    if (searchType !== 'all' && searchType !== 'comments') return null;

    return (
      <div className="search-section">
        <h3>Comments ({searchResults.comments.length})</h3>
        {searchResults.comments.length > 0 ? (
          <div className="results-grid">
            {searchResults.comments.map((comment) => {
              const relatedBlog = blogMap[comment.postId];
              const commentAuthorUser = userMap[relatedBlog?.userId];

              return (
                <div key={comment.id} className="result-card comment-result">
                  <div className="comment-result-header">
                    <span className="result-type">Comment #{comment.id}</span>
                    <div className="comment-context">
                      {relatedBlog && (
                        <Link to={`/blogs/${comment.postId}`} className="related-blog">
                          On: {relatedBlog.title.length > 40
                            ? `${relatedBlog.title.substring(0, 40)}...`
                            : relatedBlog.title}
                        </Link>
                      )}
                      {commentAuthorUser && (
                        <Link to={`/users/${commentAuthorUser.id}`} className="blog-author">
                          Blog by {commentAuthorUser.name}
                        </Link>
                      )}
                    </div>
                  </div>
                  <div className="comment-author-info">
                    <h4 className="comment-name">{comment.name}</h4>
                    <span className="comment-email">{comment.email}</span>
                  </div>
                  <p className="result-excerpt">
                    {comment.body.length > 150
                      ? `${comment.body.substring(0, 150)}...`
                      : comment.body
                    }
                  </p>
                  <div className="comment-actions">
                    {relatedBlog && (
                      <Link to={`/blogs/${comment.postId}`} className="result-link">
                        View Blog →
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : searchQuery.trim() && (
          <p className="no-results">No comments found matching your search.</p>
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
          <div className="search-input-wrapper">
            <input
              type="text"
              placeholder="Search for blogs, users, topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
              autoFocus
            />
            {searchQuery && (
              <button
                className="clear-search-button"
                onClick={() => setSearchQuery('')}
                title="Clear search"
              >
                ✕
              </button>
            )}
            <div className="search-icon">🔍</div>
          </div>
          {searchQuery && (
            <div className="search-status">
              Searching for "{searchQuery}" in {searchType === 'all' ? 'all content' : searchType}
            </div>
          )}
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
            <button
              className={`filter-button ${searchType === 'comments' ? 'active' : ''}`}
              onClick={() => setSearchType('comments')}
            >
              Comments
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
                    <li>Search comments by content, commenter name, or related blog</li>
                    <li>Use specific keywords for better results</li>
                    <li>Filter results by type using the buttons above</li>
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <div className="results-container">
              <div className="results-summary">
                Found {searchResults.blogs.length} blog{searchResults.blogs.length !== 1 ? 's' : ''}, {searchResults.users.length} user{searchResults.users.length !== 1 ? 's' : ''}, and {searchResults.comments.length} comment{searchResults.comments.length !== 1 ? 's' : ''} for "{searchQuery}"
              </div>

              {renderBlogResults()}
              {renderUserResults()}
              {renderCommentResults()}

              {searchResults.blogs.length === 0 && searchResults.users.length === 0 && searchResults.comments.length === 0 && (
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