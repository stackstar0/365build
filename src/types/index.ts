// TypeScript interfaces for the Blogs Application

export interface Blog {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  address?: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  company?: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export interface SearchFilters {
  query: string;
  sortBy: 'title' | 'date' | 'author';
  sortOrder: 'asc' | 'desc';
}

export interface UserFilters {
  query: string;
  sortBy: 'name' | 'email' | 'username';
  sortOrder: 'asc' | 'desc';
}