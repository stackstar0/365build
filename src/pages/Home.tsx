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

      <div className="info-section">
        <h2>The Application and The Assignment</h2>
        <div className="assignment-info">
          <h3>Assignment</h3>
          <p>Go through this application in detail, understand what has been done</p>
          <p>Try to build, as much of this application as possible</p>
          <p>You can try to build same, less or more features</p>
          <ul>
            <li>You are free to use any tech/platform/language</li>
            <li>You are free to build a) webapp or b) mobile app or c) desktop app</li>
            <li>You can build SPA (react, vue etc...) or SSR (spring boot etc)</li>
          </ul>

          <h4>Bonus Points</h4>
          <p>Search & Sort Functions in Blogs and Users Page</p>
        </div>
      </div>
    </div>
  );
};

export default Home;