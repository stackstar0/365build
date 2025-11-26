import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';

const Navigation: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="nav-brand">
          <Link to="/">Blogs App</Link>
        </div>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link
              to="/"
              className={`nav-link ${isActive('/') ? 'active' : ''}`}
            >
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/blogs"
              className={`nav-link ${isActive('/blogs') ? 'active' : ''}`}
            >
              Blogs
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/users"
              className={`nav-link ${isActive('/users') ? 'active' : ''}`}
            >
              Users
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/search"
              className={`nav-link ${isActive('/search') ? 'active' : ''}`}
            >
              Search
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;