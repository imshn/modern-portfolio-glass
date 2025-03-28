
import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Calendar, Clock, ArrowLeft, User, Tag } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Loader from '@/components/Loader';
import BlogCard from '@/components/BlogCard';
import { Button } from '@/components/ui/button';
import { useBlogContext } from '@/context/BlogContext';

const BlogPost = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { blogPosts } = useBlogContext();
  
  // Find the current blog post based on slug
  const blogPost = blogPosts.find(post => post.slug === slug);
  
  // Get related posts (excluding current post)
  const relatedPosts = blogPosts
    .filter(post => post.slug !== slug)
    .slice(0, 3);
  
  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    window.scrollTo(0, 0);
    
    return () => clearTimeout(timer);
  }, [slug]);

  // If blog post not found, redirect to blog list
  useEffect(() => {
    if (!isLoading && !blogPost) {
      navigate('/blog');
    }
  }, [blogPost, isLoading, navigate]);

  if (isLoading || !blogPost) {
    return <Loader isLoading={true} />;
  }

  return (
    <>
      <Loader isLoading={isLoading} />
      
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-grow pt-20">
          {/* Blog post header */}
          <section className="pt-16 pb-8 relative">
            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-blue-500/5 filter blur-3xl"></div>
              <div className="absolute bottom-0 right-1/3 w-96 h-96 rounded-full bg-purple-500/5 filter blur-3xl"></div>
            </div>
            
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-3xl mx-auto">
                {/* Back link */}
                <Link 
                  to="/blog" 
                  className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-6"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back to Blog</span>
                </Link>
                
                {/* Post metadata */}
                <div className="mb-6 space-y-2 animate-fade-in" style={{animationFillMode: 'forwards'}}>
                  <div className="flex flex-wrap gap-2">
                    {blogPost.tags.map(tag => (
                      <span key={tag} className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <h1 className="text-3xl md:text-4xl font-bold">{blogPost.title}</h1>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      <span>{blogPost.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{blogPost.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{blogPost.readTime}</span>
                    </div>
                  </div>
                </div>
                
                {/* Featured image */}
                <div className="mb-8 rounded-xl overflow-hidden glass-card animate-fade-in" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
                  <img 
                    src={blogPost.image} 
                    alt={blogPost.title} 
                    className="w-full h-auto object-cover aspect-video"
                  />
                </div>
              </div>
            </div>
          </section>
          
          {/* Blog post content */}
          <section className="py-8 pb-16">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto">
                <article className="prose prose-lg max-w-none animate-fade-in" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
                  <div dangerouslySetInnerHTML={{ __html: blogPost.content }} />
                </article>
                
                {/* Share buttons */}
                <div className="mt-12 pt-6 border-t border-border animate-fade-in" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">Share this article:</span>
                      <div className="flex gap-2">
                        <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
                          </svg>
                        </Button>
                        <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
                          </svg>
                        </Button>
                        <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
                          </svg>
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Tag className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Tags:</span>
                      <div className="flex flex-wrap gap-2">
                        {blogPost.tags.map(tag => (
                          <Link 
                            key={tag} 
                            to={`/blog?tag=${encodeURIComponent(tag)}`}
                            className="text-xs px-2 py-1 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
                          >
                            {tag}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Related posts */}
          <section className="py-16 bg-secondary/50">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-2xl font-bold mb-8 animate-fade-in" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>Related Articles</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {relatedPosts.map((post, index) => (
                    <BlogCard 
                      key={post.id} 
                      post={post}
                      className="animate-fade-in" 
                      style={{ animationDelay: `${0.6 + index * 0.1}s`, animationFillMode: 'forwards' }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default BlogPost;
