
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BlogCardProps {
  post: {
    id: string;
    title: string;
    excerpt: string;
    date: string;
    readTime: string;
    image?: string;
    tags: string[];
    slug: string;
  };
  className?: string;
  featured?: boolean;
  style?: React.CSSProperties;
}

const BlogCard = ({ post, className, featured = false, style }: BlogCardProps) => {
  return (
    <div 
      className={cn(
        "glass-card rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl",
        featured ? "md:flex" : "",
        className
      )}
      style={style}
    >
      {/* Image container */}
      <div className={cn(
        "relative overflow-hidden", 
        featured ? "md:w-1/2 aspect-video md:aspect-auto" : "aspect-video"
      )}>
        <img 
          src={post.image || "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070"} 
          alt={post.title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        
        {/* Tags overlay */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          {post.tags.slice(0, 2).map(tag => (
            <span key={tag} className="text-xs px-2 py-1 rounded-full bg-primary/80 text-white backdrop-blur-sm">
              {tag}
            </span>
          ))}
          {post.tags.length > 2 && (
            <span className="text-xs px-2 py-1 rounded-full bg-background/80 text-foreground backdrop-blur-sm">
              +{post.tags.length - 2}
            </span>
          )}
        </div>
      </div>
      
      {/* Content */}
      <div className={cn(
        "p-6",
        featured ? "md:w-1/2" : ""
      )}>
        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>{post.date}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{post.readTime}</span>
          </div>
        </div>
        
        <h3 className={cn(
          "font-semibold mb-2 hover:text-primary transition-colors",
          featured ? "text-2xl" : "text-xl"
        )}>
          <Link to={`/blog/${post.slug}`}>{post.title}</Link>
        </h3>
        
        <p className="text-muted-foreground mb-4 text-sm line-clamp-3">{post.excerpt}</p>
        
        <Link 
          to={`/blog/${post.slug}`}
          className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:gap-2 transition-all"
        >
          <span>Read Article</span>
          <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
