import { Blog, User, Comment } from '../types';
import { transformBlogsToEnglish, transformBlogToEnglish } from './contentTransform';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

class ApiService {
  private async fetchData<T>(url: string, retries = 3): Promise<T> {
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Request failed: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        return data;
      } catch (error) {
        if (attempt === retries) {
          if (error instanceof TypeError) {
            throw new Error('Network error: Please check your internet connection');
          }
          throw error;
        }

        await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
      }
    }
    throw new Error('All retry attempts failed');
  }

  async getAllBlogs(): Promise<Blog[]> {
    const blogs = await this.fetchData<Blog[]>(`${BASE_URL}/posts`);
    return transformBlogsToEnglish(blogs);
  }

  async getAllUsers(): Promise<User[]> {
    return this.fetchData<User[]>(`${BASE_URL}/users`);
  }

  async getBlogComments(blogId: number): Promise<Comment[]> {
    return this.fetchData<Comment[]>(`${BASE_URL}/posts/${blogId}/comments`);
  }

  async getUserById(userId: number): Promise<User> {
    return this.fetchData<User>(`${BASE_URL}/users/${userId}`);
  }

  async getUserComments(userId: number): Promise<Comment[]> {
    return this.fetchData<Comment[]>(`${BASE_URL}/users/${userId}/comments`);
  }

  async getUserBlogs(userId: number): Promise<Blog[]> {
    const blogs = await this.fetchData<Blog[]>(`${BASE_URL}/users/${userId}/posts`);
    return transformBlogsToEnglish(blogs);
  }

  async getBlogById(blogId: number): Promise<Blog> {
    const blog = await this.fetchData<Blog>(`${BASE_URL}/posts/${blogId}`);
    return transformBlogToEnglish(blog);
  }
}

export const apiService = new ApiService();