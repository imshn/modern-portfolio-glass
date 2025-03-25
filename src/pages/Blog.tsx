
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Loader from '@/components/Loader';
import BlogCard from '@/components/BlogCard';
import { Button } from '@/components/ui/button';

// Sample blog posts data
const blogPosts = [
  {
    id: '1',
    title: 'Understanding Data Visualization Techniques',
    excerpt: 'A comprehensive guide to choosing the right data visualization method for your dataset. Learn how to effectively communicate your data insights.',
    date: 'April 15, 2023',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070',
    tags: ['Data Science', 'Visualization', 'Tutorial'],
    slug: 'understanding-data-visualization-techniques'
  },
  {
    id: '2',
    title: 'Building a Full-Stack Application with Next.js and Node',
    excerpt: 'Step by step tutorial on creating a modern web application using Next.js for the frontend and Node.js for the backend.',
    date: 'March 22, 2023',
    readTime: '10 min read',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070',
    tags: ['Web Development', 'Next.js', 'Node.js'],
    slug: 'building-full-stack-application-nextjs-node'
  },
  {
    id: '3',
    title: 'Introduction to Machine Learning for Beginners',
    excerpt: 'A beginner-friendly introduction to machine learning concepts and applications. Learn the basics of ML algorithms and how to get started.',
    date: 'February 18, 2023',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2070',
    tags: ['Machine Learning', 'AI', 'Beginners'],
    slug: 'introduction-machine-learning-beginners'
  },
  {
    id: '4',
    title: 'The Future of Software Development: Trends to Watch',
    excerpt: 'Exploring emerging trends in software development and how they will shape the industry in the coming years.',
    date: 'January 5, 2023',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?q=80&w=2070',
    tags: ['Software Development', 'Trends', 'Future Tech'],
    slug: 'future-software-development-trends'
  },
  {
    id: '5',
    title: 'Creating Responsive Interfaces with Tailwind CSS',
    excerpt: 'Learn how to build beautiful, responsive user interfaces quickly using the utility-first CSS framework Tailwind.',
    date: 'December 12, 2022',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?q=80&w=2070',
    tags: ['CSS', 'Tailwind', 'UI Design'],
    slug: 'creating-responsive-interfaces-tailwind-css'
  },
  {
    id: '6',
    title: 'Optimizing Database Performance in Web Applications',
    excerpt: 'Tips and techniques for improving database performance and query optimization in modern web applications.',
    date: 'November 28, 2022',
    readTime: '9 min read',
    image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?q=80&w=2021',
    tags: ['Databases', 'Performance', 'SQL'],
    slug: 'optimizing-database-performance-web-applications'
  }
];

// Blog categories
const categories = [
  'All',
  'Data Science',
  'Web Development',
  'Machine Learning',
  'UI Design',
  'Software Development'
];

const Blog = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [filteredPosts, setFilteredPosts] = useState(blogPosts);

  // Filter posts based on search and category
  useEffect(() => {
    let result = blogPosts;
    
    // Filter by category
    if (activeCategory !== 'All') {
      result = result.filter(post => 
        post.tags.some(tag => tag.toLowerCase().includes(activeCategory.toLowerCase()))
      );
    }
    
    // Filter by search query
    if (searchQuery) {
      result = result.filter(post => 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    setFilteredPosts(result);
  }, [searchQuery, activeCategory]);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Loader isLoading={isLoading} />
      
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-grow pt-20">
          {/* Header */}
          <section className="py-16 md:py-24 relative">
            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-blue-500/5 filter blur-3xl"></div>
              <div className="absolute bottom-0 right-1/3 w-96 h-96 rounded-full bg-purple-500/5 filter blur-3xl"></div>
            </div>
            
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
                  My Blog
                </h1>
                <p className="text-xl text-muted-foreground mb-10 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                  Thoughts, tutorials, and insights on software development, data science, and technology.
                </p>
                
                {/* Search bar */}
                <div className="max-w-xl mx-auto mb-10 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search articles..."
                      className="w-full py-3 px-12 rounded-full border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                  </div>
                </div>
                
                {/* Categories */}
                <div className="flex flex-wrap justify-center gap-3 animate-fade-in" style={{ animationDelay: '0.4s' }}>
                  {categories.map((category) => (
                    <Button 
                      key={category}
                      variant={activeCategory === category ? "default" : "outline"}
                      className="rounded-full transition-all duration-300"
                      onClick={() => setActiveCategory(category)}
                    >
                      {category === 'All' && <Filter className="h-4 w-4 mr-2" />}
                      {category}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </section>
          
          {/* Blog posts */}
          <section className="py-12 pb-24">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                {/* Featured post */}
                {filteredPosts.length > 0 && (
                  <div className="mb-12 animate-fade-in" style={{ animationDelay: '0.5s' }}>
                    <BlogCard post={filteredPosts[0]} featured={true} />
                  </div>
                )}
                
                {/* Post grid */}
                {filteredPosts.length > 1 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredPosts.slice(1).map((post, index) => (
                      <BlogCard 
                        key={post.id} 
                        post={post} 
                        className="animate-fade-in" 
                        style={{ animationDelay: `${0.6 + index * 0.1}s` }} 
                      />
                    ))}
                  </div>
                ) : filteredPosts.length === 0 ? (
                  <div className="text-center py-12 animate-fade-in">
                    <p className="text-xl text-muted-foreground">No posts found matching your criteria.</p>
                    <Button 
                      variant="outline" 
                      className="mt-4"
                      onClick={() => {
                        setSearchQuery('');
                        setActiveCategory('All');
                      }}
                    >
                      Reset Filters
                    </Button>
                  </div>
                ) : null}
                
                {/* Load more button */}
                {filteredPosts.length > 6 && (
                  <div className="mt-12 text-center animate-fade-in" style={{ animationDelay: '0.9s' }}>
                    <Button variant="outline">
                      Load More Articles
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Blog;
