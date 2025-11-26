import { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import { Blog, User, Comment } from '../types';

// Custom hook for fetching all blogs
export const useBlogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        setError(null); // Clear any previous errors
        console.log('Starting to fetch blogs...');
        const data = await apiService.getAllBlogs();
        console.log('Blogs fetched successfully:', data.length);
        setBlogs(data);
      } catch (err) {
        console.error('Error in useBlogs hook:', err);
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch blogs';
        setError(`Error loading blogs: ${errorMessage}`);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return { blogs, loading, error };
};

// Custom hook for fetching all users
export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null); // Clear any previous errors
        console.log('Starting to fetch users...');
        const data = await apiService.getAllUsers();
        console.log('Users fetched successfully:', data.length);
        setUsers(data);
      } catch (err) {
        console.error('Error in useUsers hook:', err);
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch users';
        setError(`Error loading users: ${errorMessage}`);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return { users, loading, error };
};

// Custom hook for fetching a single blog
export const useBlog = (blogId: number) => {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const data = await apiService.getBlogById(blogId);
        setBlog(data);
      } catch (err) {
        setError('Failed to fetch blog');
      } finally {
        setLoading(false);
      }
    };

    if (blogId) {
      fetchBlog();
    }
  }, [blogId]);

  return { blog, loading, error };
};

// Custom hook for fetching a single user
export const useUser = (userId: number) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const data = await apiService.getUserById(userId);
        setUser(data);
      } catch (err) {
        setError('Failed to fetch user');
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUser();
    }
  }, [userId]);

  return { user, loading, error };
};

// Custom hook for fetching blog comments
export const useBlogComments = (blogId: number) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoading(true);
        const data = await apiService.getBlogComments(blogId);
        setComments(data);
      } catch (err) {
        setError('Failed to fetch comments');
      } finally {
        setLoading(false);
      }
    };

    if (blogId) {
      fetchComments();
    }
  }, [blogId]);

  return { comments, loading, error };
};