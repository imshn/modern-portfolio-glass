
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PlusCircle, Pencil, Trash2, LogOut, Home, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import TextEditor from '@/components/TextEditor';
import { useBlogContext } from '@/context/BlogContext';
import Loader from '@/components/Loader';

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('posts');
  const [showSidebar, setShowSidebar] = useState(true);
  const [newPost, setNewPost] = useState({
    title: '',
    excerpt: '',
    content: '',
    tags: '',
    image: ''
  });
  const { blogPosts, addPost, deletePost } = useBlogContext();
  const navigate = useNavigate();

  // Handle login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Demo login (in a real app, this would validate against a backend)
    if (username === 'admin' && password === 'password') {
      setIsLoggedIn(true);
      localStorage.setItem('isLoggedIn', 'true');
    } else {
      alert('Invalid credentials. Try admin/password');
    }
  };

  // Handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
  };

  // Check if user is logged in
  useEffect(() => {
    const loginStatus = localStorage.getItem('isLoggedIn');
    if (loginStatus === 'true') {
      setIsLoggedIn(true);
    }
    
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Handle new post submission
  const handleNewPostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create a new post object
    const post = {
      id: Date.now().toString(),
      title: newPost.title,
      excerpt: newPost.excerpt,
      content: newPost.content,
      image: newPost.image || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070',
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      readTime: '5 min read',
      author: 'Aryan',
      slug: newPost.title.toLowerCase().replace(/[^\w\s]/gi, '').replace(/\s+/g, '-'),
      tags: newPost.tags.split(',').map(tag => tag.trim())
    };
    
    // Add the post
    addPost(post);
    
    // Reset form
    setNewPost({
      title: '',
      excerpt: '',
      content: '',
      tags: '',
      image: ''
    });
    
    // Switch to posts tab
    setActiveTab('posts');
  };

  if (isLoading) {
    return <Loader isLoading={true} />;
  }

  // Login page
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background relative">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-blue-500/5 filter blur-3xl"></div>
          <div className="absolute bottom-0 right-1/3 w-96 h-96 rounded-full bg-purple-500/5 filter blur-3xl"></div>
        </div>
        
        <div className="max-w-md w-full p-6 glass-card rounded-xl animate-fade-in">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold">Dashboard Login</h1>
            <p className="text-muted-foreground mt-2">Sign in to manage your blog content</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium mb-1">
                Username
              </label>
              <input
                type="text"
                id="username"
                className="w-full px-4 py-3 rounded-lg border border-border bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-4 py-3 rounded-lg border border-border bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <p className="text-xs text-muted-foreground mt-1">Demo: admin/password</p>
            </div>
            
            <Button type="submit" className="w-full py-6">
              Sign In
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <Link to="/" className="text-sm text-primary hover:underline flex items-center justify-center gap-1">
              <Home className="h-4 w-4" />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <div 
        className={`fixed md:relative inset-y-0 left-0 z-30 w-64 bg-secondary/80 backdrop-blur-md transition-all duration-300 ${
          showSidebar ? 'translate-x-0' : '-translate-x-full md:w-20'
        }`}
      >
        <div className="p-4 h-full flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <Link to="/" className={`font-bold ${showSidebar ? 'text-xl' : 'hidden md:block text-center'}`}>
              {showSidebar ? 'Aryan.dev' : 'A'}
            </Link>
            <Button 
              variant="ghost" 
              size="icon"
              className="md:hidden"
              onClick={() => setShowSidebar(false)}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </div>
          
          <nav className="space-y-2 flex-grow">
            <Button
              variant={activeTab === 'posts' ? 'default' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setActiveTab('posts')}
            >
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4 0v12h8a2 2 0 0 0 2-2V2H4z"/>
                </svg>
                {showSidebar && <span>Blog Posts</span>}
              </div>
            </Button>
            
            <Button
              variant={activeTab === 'new' ? 'default' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setActiveTab('new')}
            >
              <div className="flex items-center gap-2">
                <PlusCircle className="h-4 w-4" />
                {showSidebar && <span>New Post</span>}
              </div>
            </Button>
          </nav>
          
          <div className="pt-4 border-t border-border">
            <Button
              variant="ghost"
              className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
              onClick={handleLogout}
            >
              <div className="flex items-center gap-2">
                <LogOut className="h-4 w-4" />
                {showSidebar && <span>Log Out</span>}
              </div>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Toggle sidebar button (mobile) */}
      <button
        className={`fixed left-0 top-4 z-40 md:hidden p-2 bg-secondary rounded-r-lg shadow-lg transition-transform duration-300 ${
          showSidebar ? 'translate-x-64' : 'translate-x-0'
        }`}
        onClick={() => setShowSidebar(!showSidebar)}
      >
        {showSidebar ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
      </button>
      
      {/* Main content */}
      <div className={`flex-grow p-4 md:p-8 transition-all duration-300 ${showSidebar ? 'md:ml-0' : 'md:ml-0'}`}>
        <div className="max-w-6xl mx-auto">
          {activeTab === 'posts' && (
            <div className="animate-fade-in">
              <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold">Blog Posts</h1>
                <Button onClick={() => setActiveTab('new')}>
                  <PlusCircle className="h-4 w-4 mr-2" />
                  New Post
                </Button>
              </div>
              
              {blogPosts.length === 0 ? (
                <div className="p-8 text-center glass-card rounded-xl">
                  <p className="text-muted-foreground mb-4">No blog posts yet. Create your first post!</p>
                  <Button onClick={() => setActiveTab('new')}>
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Create Post
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {blogPosts.map((post) => (
                    <div key={post.id} className="glass-card rounded-xl overflow-hidden">
                      <div className="p-6">
                        <div className="flex items-start justify-between">
                          <div>
                            <h2 className="text-xl font-semibold">{post.title}</h2>
                            <p className="text-sm text-muted-foreground">
                              {post.date} · {post.readTime}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="icon">
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="icon" 
                              className="text-destructive hover:text-destructive hover:bg-destructive/10"
                              onClick={() => deletePost(post.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        
                        <div className="mt-4">
                          <p className="text-muted-foreground text-sm line-clamp-2">{post.excerpt}</p>
                        </div>
                        
                        <div className="mt-4 flex flex-wrap gap-2">
                          {post.tags.map(tag => (
                            <span key={tag} className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          
          {activeTab === 'new' && (
            <div className="animate-fade-in">
              <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold">Create New Post</h1>
                <Button variant="outline" onClick={() => setActiveTab('posts')}>Cancel</Button>
              </div>
              
              <form onSubmit={handleNewPostSubmit} className="space-y-6">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                    placeholder="Enter post title"
                    value={newPost.title}
                    onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="excerpt" className="block text-sm font-medium mb-1">
                    Excerpt
                  </label>
                  <textarea
                    id="excerpt"
                    rows={3}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none"
                    placeholder="Brief summary of the post"
                    value={newPost.excerpt}
                    onChange={(e) => setNewPost({ ...newPost, excerpt: e.target.value })}
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="content" className="block text-sm font-medium mb-1">
                    Content
                  </label>
                  <TextEditor
                    value={newPost.content}
                    onChange={(value) => setNewPost({ ...newPost, content: value })}
                  />
                </div>
                
                <div>
                  <label htmlFor="tags" className="block text-sm font-medium mb-1">
                    Tags (comma separated)
                  </label>
                  <input
                    type="text"
                    id="tags"
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                    placeholder="e.g. Web Development, React, Tutorial"
                    value={newPost.tags}
                    onChange={(e) => setNewPost({ ...newPost, tags: e.target.value })}
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="image" className="block text-sm font-medium mb-1">
                    Featured Image URL (optional)
                  </label>
                  <input
                    type="text"
                    id="image"
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                    placeholder="Enter image URL"
                    value={newPost.image}
                    onChange={(e) => setNewPost({ ...newPost, image: e.target.value })}
                  />
                </div>
                
                <div className="pt-4">
                  <Button type="submit" className="mr-2">
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Publish Post
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setActiveTab('posts')}>
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
