import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useBlog, useBlogComments, useUser } from '../hooks/useApi';
import './BlogDetail.css';

const BlogDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const blogId = parseInt(id || '0');

  const { blog, loading: blogLoading, error: blogError } = useBlog(blogId);
  const { comments, loading: commentsLoading } = useBlogComments(blogId);
  const { user, loading: userLoading } = useUser(blog?.userId || 0);

  if (blogLoading || userLoading) {
    return (
      <div className="blog-detail-container">
        <div className="loading">Loading blog...</div>
      </div>
    );
  }

  if (blogError || !blog) {
    return (
      <div className="blog-detail-container">
        <div className="error">Error loading blog or blog not found</div>
        <Link to="/blogs" className="back-link">← Back to Blogs</Link>
      </div>
    );
  }

  return (
    <div className="blog-detail-container">
      <div className="blog-detail-header">
        <Link to="/blogs" className="back-link">← Back to Blogs</Link>
        <div className="blog-meta">
          <span className="blog-id">Blog #{blog.id}</span>
          {user && (
            <Link to={`/users/${user.id}`} className="blog-author">
              By {user.name} (@{user.username})
            </Link>
          )}
        </div>
      </div>

      <article className="blog-detail-content">
        <h1 className="blog-detail-title">{blog.title}</h1>
        <div className="blog-detail-body">
          {blog.body.split('\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </article>

      {user && (
        <div className="author-info">
          <h3>About the Author</h3>
          <div className="author-card">
            <div className="author-details">
              <h4>{user.name}</h4>
              <p>@{user.username}</p>
              <div className="author-contact">
                <span>Email: {user.email}</span>
                <span>Phone: {user.phone}</span>
                {user.website && (
                  <a href={`http://${user.website}`} target="_blank" rel="noopener noreferrer">
                    Website: {user.website}
                  </a>
                )}
              </div>
            </div>
            <Link to={`/users/${user.id}`} className="view-profile">
              View Profile
            </Link>
          </div>
        </div>
      )}

      <div className="comments-section">
        <h3>Comments ({comments.length})</h3>
        {commentsLoading ? (
          <div className="loading-comments">Loading comments...</div>
        ) : (
          <div className="comments-list">
            {comments.map((comment) => (
              <div key={comment.id} className="comment-card">
                <div className="comment-header">
                  <strong className="comment-name">{comment.name}</strong>
                  <span className="comment-email">{comment.email}</span>
                </div>
                <p className="comment-body">{comment.body}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogDetail;