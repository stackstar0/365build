import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>Welcome to Blogs Application</h1>
        <p>Discover amazing blogs and connect with talented authors from around the world.</p>
      </div>

      <div className="features-section">
        <div className="feature-card">
          <h3>View List of Blogs</h3>
          <p>Browse through a comprehensive collection of blogs with search and sort functionality.</p>
          <Link to="/blogs" className="feature-link">
            Explore Blogs →
          </Link>
        </div>

        <div className="feature-card">
          <h3>View List Of Users</h3>
          <p>Discover authors and their profiles, including their contact information and published content.</p>
          <Link to="/users" className="feature-link">
            Browse Users →
          </Link>
        </div>

        <div className="feature-card">
          <h3>Search</h3>
          <p>Find specific blogs or users quickly with our powerful search functionality.</p>
          <Link to="/search" className="feature-link">
            Start Searching →
          </Link>
        </div>
      </div>

      <div className="features-section">
        <h2>Application Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>🔍 Advanced Search</h3>
            <p>Search across blogs and users with real-time filtering and smart matching</p>
          </div>
          <div className="feature-card">
            <h3>📊 Smart Sorting</h3>
            <p>Sort content by title, author, date, or relevance with ascending/descending options</p>
          </div>
          <div className="feature-card">
            <h3>📱 Responsive Design</h3>
            <p>Optimized for all devices with modern glass morphism UI and smooth animations</p>
          </div>
          <div className="feature-card">
            <h3>⚡ Performance</h3>
            <p>Fast loading with optimized bundles, caching, and efficient API management</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;