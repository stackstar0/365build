import { Blog, User, Comment } from '../types';
import { transformBlogsToEnglish, transformBlogToEnglish } from './contentTransform';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

class ApiService {
  private async fetchData<T>(url: string): Promise<T> {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('API fetch error:', error);
      throw error;
    }
  }

  // Fetch All Blogs
  async getAllBlogs(): Promise<Blog[]> {
    const blogs = await this.fetchData<Blog[]>(`${BASE_URL}/posts`);
    return transformBlogsToEnglish(blogs);
  }

  // Fetch All Users
  async getAllUsers(): Promise<User[]> {
    return this.fetchData<User[]>(`${BASE_URL}/users`);
  }

  // Fetch Comments of a Blog by ID
  async getBlogComments(blogId: number): Promise<Comment[]> {
    return this.fetchData<Comment[]>(`${BASE_URL}/posts/${blogId}/comments`);
  }

  // Fetch Details of a User by ID
  async getUserById(userId: number): Promise<User> {
    return this.fetchData<User>(`${BASE_URL}/users/${userId}`);
  }

  // Fetch Comments Made by a User by ID
  async getUserComments(userId: number): Promise<Comment[]> {
    return this.fetchData<Comment[]>(`${BASE_URL}/users/${userId}/comments`);
  }

  // Fetch Blogs Created by a User by ID
  async getUserBlogs(userId: number): Promise<Blog[]> {
    const blogs = await this.fetchData<Blog[]>(`${BASE_URL}/users/${userId}/posts`);
    return transformBlogsToEnglish(blogs);
  }

  // Fetch Single Blog by ID
  async getBlogById(blogId: number): Promise<Blog> {
    const blog = await this.fetchData<Blog>(`${BASE_URL}/posts/${blogId}`);
    return transformBlogToEnglish(blog);
  }
}

export const apiService = new ApiService();