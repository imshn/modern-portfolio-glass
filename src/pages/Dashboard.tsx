import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/components/ui/use-toast';
import { useBlogContext } from '@/context/BlogContext';
import { FileUp, Image, Link, Tag, Save, Trash } from 'lucide-react';
import TextEditor from '@/components/TextEditor';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Dashboard = () => {
  const navigate = useNavigate();
  const { blogPosts, addPost, updatePost, deletePost } = useBlogContext();
  const [activeTab, setActiveTab] = useState('blogs');
  
  // Blog form state
  const [blogTitle, setBlogTitle] = useState('');
  const [blogExcerpt, setBlogExcerpt] = useState('');
  const [blogContent, setBlogContent] = useState('');
  const [blogImage, setBlogImage] = useState('');
  const [blogTags, setBlogTags] = useState('');
  
  // Project form state
  const [projectTitle, setProjectTitle] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [projectLink, setProjectLink] = useState('');
  const [projectGithub, setProjectGithub] = useState('');
  const [projectImage, setProjectImage] = useState('');
  const [projectTags, setProjectTags] = useState('');

  // Handle blog submission
  const handleBlogSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newBlog = {
      id: Date.now().toString(),
      title: blogTitle,
      excerpt: blogExcerpt,
      content: blogContent,
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      author: 'Shaan',
      readTime: `${Math.max(1, Math.ceil(blogContent.replace(/<[^>]*>/g, '').length / 1000))} min read`,
      image: blogImage || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643',
      tags: blogTags.split(',').map(tag => tag.trim()),
      slug: blogTitle.toLowerCase().replace(/[^\w\s]/gi, '').replace(/\s+/g, '-')
    };
    
    addPost(newBlog);
    toast({
      title: "Blog post created",
      description: "Your blog post has been successfully published",
    });
    
    // Reset form
    setBlogTitle('');
    setBlogExcerpt('');
    setBlogContent('');
    setBlogImage('');
    setBlogTags('');
  };

  // Handle project submission
  const handleProjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, we would add the project to a projects context
    toast({
      title: "Project added",
      description: "Your project has been successfully added to your portfolio",
    });
    
    // Reset form
    setProjectTitle('');
    setProjectDescription('');
    setProjectLink('');
    setProjectGithub('');
    setProjectImage('');
    setProjectTags('');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="blogs">Manage Blogs</TabsTrigger>
            <TabsTrigger value="projects">Manage Projects</TabsTrigger>
          </TabsList>
          
          <TabsContent value="blogs" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Create New Blog Post</CardTitle>
                <CardDescription>
                  Fill out the form below to create a new blog post
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <form id="blog-form" onSubmit={handleBlogSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="blog-title">Title</Label>
                    <Input 
                      id="blog-title" 
                      value={blogTitle}
                      onChange={(e) => setBlogTitle(e.target.value)}
                      placeholder="Enter blog title" 
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="blog-excerpt">Excerpt</Label>
                    <Textarea 
                      id="blog-excerpt" 
                      value={blogExcerpt}
                      onChange={(e) => setBlogExcerpt(e.target.value)}
                      placeholder="Brief description of your blog post"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="blog-content">Content</Label>
                    <div className="min-h-[350px]">
                      <TextEditor 
                        value={blogContent}
                        onChange={setBlogContent}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="blog-image">Featured Image URL</Label>
                    <Input 
                      id="blog-image" 
                      value={blogImage}
                      onChange={(e) => setBlogImage(e.target.value)}
                      placeholder="https://example.com/image.jpg" 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="blog-tags">Tags (comma separated)</Label>
                    <Input 
                      id="blog-tags" 
                      value={blogTags}
                      onChange={(e) => setBlogTags(e.target.value)}
                      placeholder="Web Development, React, Tutorial" 
                    />
                  </div>
                </form>
              </CardContent>
              
              <CardFooter>
                <Button type="submit" form="blog-form" className="w-full md:w-auto flex items-center gap-2">
                  <Save className="h-4 w-4" />
                  <span>Publish Blog Post</span>
                </Button>
              </CardFooter>
            </Card>
            
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Your Blog Posts</h2>
              
              {blogPosts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {blogPosts.map((post) => (
                    <Card key={post.id} className="flex flex-col h-full">
                      <div className="aspect-video relative overflow-hidden rounded-t-lg">
                        <img 
                          src={post.image} 
                          alt={post.title}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg line-clamp-2">{post.title}</CardTitle>
                        <CardDescription className="flex justify-between text-xs">
                          <span>{post.date}</span>
                          <span>{post.readTime}</span>
                        </CardDescription>
                      </CardHeader>
                      
                      <CardContent className="pb-2 flex-grow">
                        <p className="text-sm text-muted-foreground line-clamp-3">{post.excerpt}</p>
                      </CardContent>
                      
                      <CardFooter className="flex justify-between pt-2">
                        <Button 
                          variant="outline"
                          size="sm"
                          onClick={() => navigate(`/blog/${post.slug}`)}
                        >
                          View
                        </Button>
                        
                        <Button 
                          variant="destructive"
                          size="sm"
                          onClick={() => {
                            deletePost(post.id);
                            toast({
                              title: "Blog post deleted",
                              description: "The blog post has been removed"
                            });
                          }}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-muted/50 rounded-lg">
                  <p className="text-muted-foreground">No blog posts yet. Create your first one!</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="projects" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Add New Project</CardTitle>
                <CardDescription>
                  Showcase your work by adding a new project
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <form id="project-form" onSubmit={handleProjectSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="project-title">Project Title</Label>
                    <Input 
                      id="project-title" 
                      value={projectTitle}
                      onChange={(e) => setProjectTitle(e.target.value)}
                      placeholder="Enter project title" 
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="project-description">Description</Label>
                    <Textarea 
                      id="project-description" 
                      value={projectDescription}
                      onChange={(e) => setProjectDescription(e.target.value)}
                      placeholder="Describe your project"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="project-link">Live Demo URL</Label>
                      <Input 
                        id="project-link" 
                        value={projectLink}
                        onChange={(e) => setProjectLink(e.target.value)}
                        placeholder="https://example.com" 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="project-github">GitHub URL</Label>
                      <Input 
                        id="project-github" 
                        value={projectGithub}
                        onChange={(e) => setProjectGithub(e.target.value)}
                        placeholder="https://github.com/username/repo" 
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="project-image">Project Image URL</Label>
                    <Input 
                      id="project-image" 
                      value={projectImage}
                      onChange={(e) => setProjectImage(e.target.value)}
                      placeholder="https://example.com/image.jpg" 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="project-tags">Technologies Used (comma separated)</Label>
                    <Input 
                      id="project-tags" 
                      value={projectTags}
                      onChange={(e) => setProjectTags(e.target.value)}
                      placeholder="React, TypeScript, Tailwind CSS" 
                    />
                  </div>
                </form>
              </CardContent>
              
              <CardFooter>
                <Button type="submit" form="project-form" className="w-full md:w-auto flex items-center gap-2">
                  <Save className="h-4 w-4" />
                  <span>Save Project</span>
                </Button>
              </CardFooter>
            </Card>
            
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Your Projects</h2>
              <div className="text-center py-12 bg-muted/50 rounded-lg">
                <p className="text-muted-foreground">You haven't added any projects yet.</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
