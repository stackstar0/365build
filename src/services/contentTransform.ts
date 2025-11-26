import { Blog } from '../types';

// English blog content to replace the Lorem Ipsum content
const englishBlogContent: { [key: number]: { title: string; body: string } } = {
  1: {
    title: "Getting Started with React Development",
    body: "React is a powerful JavaScript library for building user interfaces. It allows developers to create dynamic and interactive web applications with ease. In this blog post, we'll explore the fundamentals of React development and how to get started with your first React project."
  },
  2: {
    title: "Understanding Modern JavaScript Features",
    body: "Modern JavaScript has evolved significantly with ES6 and beyond. Features like arrow functions, destructuring, and async/await have revolutionized how we write JavaScript code. Let's dive into these essential features that every developer should know."
  },
  3: {
    title: "Building Responsive Web Applications",
    body: "In today's mobile-first world, creating responsive web applications is crucial. This post covers the best practices for building applications that work seamlessly across all devices, from mobile phones to desktop computers."
  },
  4: {
    title: "The Importance of User Experience Design",
    body: "User experience design plays a vital role in the success of any web application. A well-designed interface not only looks good but also provides intuitive navigation and functionality that keeps users engaged and satisfied."
  },
  5: {
    title: "Introduction to TypeScript for Beginners",
    body: "TypeScript brings static typing to JavaScript, making code more reliable and maintainable. This comprehensive guide will help beginners understand the basics of TypeScript and how it can improve your development workflow."
  },
  6: {
    title: "Best Practices for API Integration",
    body: "Integrating with APIs is a common requirement in modern web development. This article covers best practices for making API calls, handling errors, and managing data in your applications effectively and securely."
  },
  7: {
    title: "CSS Grid vs Flexbox: When to Use Each",
    body: "Both CSS Grid and Flexbox are powerful layout systems, but they excel in different scenarios. Learn when to use Grid for two-dimensional layouts and when Flexbox is perfect for one-dimensional arrangements."
  },
  8: {
    title: "Optimizing Web Application Performance",
    body: "Performance optimization is crucial for user satisfaction and SEO rankings. Discover techniques for reducing load times, optimizing images, and implementing lazy loading to create faster web applications."
  },
  9: {
    title: "Understanding React Hooks and State Management",
    body: "React Hooks have transformed how we manage state and side effects in functional components. This guide explores useState, useEffect, and custom hooks to help you write cleaner, more efficient React code."
  },
  10: {
    title: "Accessibility in Web Development",
    body: "Building accessible web applications ensures that your content is usable by everyone, including people with disabilities. Learn about ARIA labels, keyboard navigation, and other accessibility best practices."
  },
  11: {
    title: "Version Control with Git",
    body: "Git is an essential tool for any developer. This guide covers the fundamentals of version control, branching strategies, and collaboration workflows that will help you manage your code effectively."
  },
  12: {
    title: "Database Design Principles",
    body: "Good database design is the foundation of any robust application. Learn about normalization, relationships, indexing, and other key concepts that will help you design efficient and scalable databases."
  },
  13: {
    title: "Security Best Practices for Web Apps",
    body: "Security should never be an afterthought in web development. This comprehensive guide covers authentication, authorization, data validation, and other security measures to protect your applications."
  },
  14: {
    title: "Cloud Deployment Strategies",
    body: "Moving your applications to the cloud offers scalability and reliability benefits. Explore different cloud platforms, deployment strategies, and best practices for cloud-native development."
  },
  15: {
    title: "Testing Your JavaScript Applications",
    body: "Testing is crucial for maintaining code quality and preventing bugs. Learn about unit testing, integration testing, and end-to-end testing frameworks to ensure your applications work reliably."
  }
};

// Function to transform blog content to English
export const transformBlogToEnglish = (blog: Blog): Blog => {
  const englishContent = englishBlogContent[blog.id];

  if (englishContent) {
    return {
      ...blog,
      title: englishContent.title,
      body: englishContent.body
    };
  }

  // For blogs not in our predefined list, create generic English content
  const genericTitles = [
    "Web Development Best Practices",
    "Modern Frontend Technologies",
    "Building Scalable Applications",
    "User Interface Design Principles",
    "JavaScript Development Tips",
    "React Component Architecture",
    "CSS Styling Techniques",
    "Database Integration Strategies",
    "Mobile-First Development",
    "Testing and Quality Assurance",
    "DevOps and Continuous Integration",
    "Progressive Web Applications",
    "Advanced React Patterns",
    "Node.js Backend Development",
    "GraphQL and API Design",
    "Microservices Architecture",
    "Performance Monitoring",
    "Code Review Guidelines",
    "Agile Development Methodologies",
    "Full-Stack Development Guide"
  ];

  const genericBodies = [
    "This blog post discusses important concepts and best practices in modern web development. It covers various techniques and strategies that developers can use to build better, more efficient applications.",
    "Exploring the latest trends and technologies in frontend development. This article provides insights into how modern tools and frameworks can improve your development workflow.",
    "Learn about building applications that can scale with your business needs. This comprehensive guide covers architecture patterns and performance optimization techniques.",
    "Understanding the principles of good user interface design is essential for creating applications that users love. This post explores key concepts in UI/UX design.",
    "Discover helpful tips and tricks for JavaScript development. From basic concepts to advanced techniques, this guide will help you write better JavaScript code.",
    "Dive deep into advanced programming concepts and design patterns. This article covers complex topics that will help you become a more proficient developer.",
    "Stay up-to-date with the latest industry trends and emerging technologies. This post highlights the most important developments in the tech world.",
    "Learn how to optimize your development workflow with better tools and practices. This guide covers productivity tips and time-saving techniques.",
    "Explore the intersection of design and development. This article discusses how to create beautiful and functional user experiences.",
    "Master the art of writing clean, maintainable code. This comprehensive guide covers coding standards, documentation, and collaboration practices."
  ];

  const titleIndex = (blog.id - 1) % genericTitles.length;
  const bodyIndex = (blog.id - 1) % genericBodies.length;

  return {
    ...blog,
    title: genericTitles[titleIndex],
    body: genericBodies[bodyIndex]
  };
};

// Function to transform an array of blogs to English
export const transformBlogsToEnglish = (blogs: Blog[]): Blog[] => {
  return blogs.map(transformBlogToEnglish);
};