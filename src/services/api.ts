import { Blog, User, Comment } from '../types';
import { transformBlogsToEnglish, transformBlogToEnglish } from './contentTransform';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

class ApiService {
  private async fetchData<T>(url: string, retries = 3): Promise<T> {
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        console.log(`Fetching data from: ${url} (attempt ${attempt}/${retries})`);
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Successfully fetched data:', data.length || 'single item');
        return data;
      } catch (error) {
        console.error(`API fetch error for URL: ${url} (attempt ${attempt}/${retries})`, error);

        if (attempt === retries) {
          // Last attempt failed
          if (error instanceof TypeError) {
            throw new Error('Network error: Please check your internet connection');
          }
          throw error;
        }

        // Wait before retrying (exponential backoff)
        await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
      }
    }
    throw new Error('All retry attempts failed');
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