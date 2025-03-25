
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Blog post type
interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  readTime: string;
  image: string;
  tags: string[];
  slug: string;
}

// Context type
interface BlogContextType {
  blogPosts: BlogPost[];
  addPost: (post: BlogPost) => void;
  updatePost: (id: string, updatedPost: BlogPost) => void;
  deletePost: (id: string) => void;
}

// Sample blog posts data
const initialBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Understanding Data Visualization Techniques',
    excerpt: 'A comprehensive guide to choosing the right data visualization method for your dataset. Learn how to effectively communicate your data insights.',
    content: '<p>Data visualization is a powerful tool for understanding complex information at a glance. In this article, we\'ll explore various techniques for effectively visualizing data to communicate insights clearly.</p>',
    date: 'April 15, 2023',
    author: 'Shaan',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070',
    tags: ['Data Science', 'Visualization', 'Tutorial'],
    slug: 'understanding-data-visualization-techniques'
  },
  {
    id: '2',
    title: 'Building a Full-Stack Application with Next.js and Node',
    excerpt: 'Step by step tutorial on creating a modern web application using Next.js for the frontend and Node.js for the backend.',
    content: '<p>Building a full-stack application requires understanding both frontend and backend technologies. In this tutorial, we\'ll create a complete application using Next.js and Node.js.</p>',
    date: 'March 22, 2023',
    author: 'Shaan',
    readTime: '10 min read',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070',
    tags: ['Web Development', 'Next.js', 'Node.js'],
    slug: 'building-full-stack-application-nextjs-node'
  },
  {
    id: '3',
    title: 'Introduction to Machine Learning for Beginners',
    excerpt: 'A beginner-friendly introduction to machine learning concepts and applications. Learn the basics of ML algorithms and how to get started.',
    content: '<p>Machine learning can seem intimidating for beginners, but with the right approach, anyone can understand the core concepts. This article provides a gentle introduction to machine learning fundamentals.</p>',
    date: 'February 18, 2023',
    author: 'Shaan',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2070',
    tags: ['Machine Learning', 'AI', 'Beginners'],
    slug: 'introduction-machine-learning-beginners'
  }
];

// Create context
const BlogContext = createContext<BlogContextType | undefined>(undefined);

// Provider component
export const BlogProvider = ({ children }: { children: ReactNode }) => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(() => {
    // Load from localStorage if available
    const savedPosts = localStorage.getItem('blogPosts');
    return savedPosts ? JSON.parse(savedPosts) : initialBlogPosts;
  });

  // Save to localStorage whenever posts change
  useEffect(() => {
    localStorage.setItem('blogPosts', JSON.stringify(blogPosts));
  }, [blogPosts]);

  // Add a new post
  const addPost = (post: BlogPost) => {
    setBlogPosts([post, ...blogPosts]);
  };

  // Update an existing post
  const updatePost = (id: string, updatedPost: BlogPost) => {
    setBlogPosts(blogPosts.map(post => 
      post.id === id ? updatedPost : post
    ));
  };

  // Delete a post
  const deletePost = (id: string) => {
    setBlogPosts(blogPosts.filter(post => post.id !== id));
  };

  return (
    <BlogContext.Provider value={{ blogPosts, addPost, updatePost, deletePost }}>
      {children}
    </BlogContext.Provider>
  );
};

// Custom hook to use the blog context
export const useBlogContext = () => {
  const context = useContext(BlogContext);
  if (context === undefined) {
    throw new Error('useBlogContext must be used within a BlogProvider');
  }
  return context;
};
