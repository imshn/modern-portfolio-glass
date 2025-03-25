
import { useState, useEffect, useRef } from 'react';
import { ExternalLink, Github, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// Sample project data
const projects = [
  {
    id: 1,
    title: "Data Visualization Dashboard",
    description: "Interactive dashboard for visualizing complex datasets using React and D3.js",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070",
    tags: ["React", "D3.js", "Data Visualization"],
    category: "data",
    github: "#",
    demo: "#"
  },
  {
    id: 2,
    title: "Personal Blog Platform",
    description: "A full-stack blog platform with a custom CMS built with Next.js and Node.js",
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070",
    tags: ["Next.js", "Node.js", "MongoDB"],
    category: "web",
    github: "#",
    demo: "#"
  },
  {
    id: 3,
    title: "E-commerce API",
    description: "RESTful API for e-commerce applications with authentication and payment processing",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=2070",
    tags: ["Express.js", "REST API", "MongoDB"],
    category: "backend",
    github: "#",
    demo: "#"
  },
  {
    id: 4,
    title: "Machine Learning Model for Stock Prediction",
    description: "Predictive model for stock market trends using Python and scikit-learn",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=2070",
    tags: ["Python", "Machine Learning", "Data Analysis"],
    category: "data",
    github: "#",
    demo: "#"
  },
  {
    id: 5,
    title: "Task Management Application",
    description: "A React-based application for managing daily tasks and projects",
    image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=2072",
    tags: ["React", "Redux", "Firebase"],
    category: "web",
    github: "#",
    demo: "#"
  },
  {
    id: 6,
    title: "Weather Forecast App",
    description: "Real-time weather forecasting app using external APIs and geolocation",
    image: "https://images.unsplash.com/photo-1527482797697-8795b05a13fe?q=80&w=2070",
    tags: ["JavaScript", "APIs", "Geolocation"],
    category: "web",
    github: "#",
    demo: "#"
  }
];

// Filter categories
const categories = [
  { id: "all", label: "All Projects" },
  { id: "web", label: "Web Development" },
  { id: "backend", label: "Backend" },
  { id: "data", label: "Data Science" }
];

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [animateCards, setAnimateCards] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Filter projects based on selected category
  useEffect(() => {
    if (activeFilter === "all") {
      setAnimateCards(false);
      setTimeout(() => {
        setFilteredProjects(projects);
        setAnimateCards(true);
      }, 300);
    } else {
      setAnimateCards(false);
      setTimeout(() => {
        const filtered = projects.filter(project => project.category === activeFilter);
        setFilteredProjects(filtered);
        setAnimateCards(true);
      }, 300);
    }
  }, [activeFilter]);

  // Intersection Observer for animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const section = sectionRef.current;
    if (section) {
      const animatedElements = section.querySelectorAll('.animate-on-scroll');
      animatedElements.forEach((el) => {
        el.classList.add('opacity-0');
        observer.observe(el);
      });
    }

    return () => {
      if (section) {
        const animatedElements = section.querySelectorAll('.animate-on-scroll');
        animatedElements.forEach((el) => observer.unobserve(el));
      }
    };
  }, []);

  // Initialize animation for project cards
  useEffect(() => {
    setAnimateCards(true);
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="py-24 relative">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 left-0 w-96 h-96 rounded-full bg-blue-500/5 filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-purple-500/5 filter blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              My Projects
            </h2>
            <div className="h-1 w-20 bg-primary rounded-full mx-auto mb-6"></div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore my portfolio of projects spanning web development, data science, and more.
              Each project reflects my passion for creating efficient, elegant solutions.
            </p>
          </div>
          
          {/* Filter buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-12 animate-on-scroll" style={{ animationDelay: '0.2s' }}>
            {categories.map((category) => (
              <Button 
                key={category.id}
                variant={activeFilter === category.id ? "default" : "outline"}
                className={cn(
                  "glass-card transition-all duration-300",
                  activeFilter === category.id ? "bg-primary text-white" : "hover:bg-secondary/50"
                )}
                onClick={() => setActiveFilter(category.id)}
              >
                {category.id === "all" && <Filter className="h-4 w-4 mr-2" />}
                {category.label}
              </Button>
            ))}
          </div>
          
          {/* Projects grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <div 
                key={project.id}
                className={cn(
                  "glass-card rounded-xl overflow-hidden transition-all duration-500 hover:shadow-xl",
                  animateCards ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                )}
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <div className="relative overflow-hidden aspect-video">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                
                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.tags.map((tag) => (
                      <span 
                        key={tag} 
                        className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  
                  <p className="text-muted-foreground mb-4 text-sm">{project.description}</p>
                  
                  <div className="flex items-center gap-3">
                    <a 
                      href={project.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-secondary/50 hover:bg-secondary transition-colors"
                      aria-label="GitHub Repository"
                    >
                      <Github className="h-4 w-4" />
                    </a>
                    <a 
                      href={project.demo} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                    >
                      <span>Live Demo</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Show more button */}
          <div className="mt-12 text-center animate-on-scroll" style={{ animationDelay: '0.6s' }}>
            <Button variant="outline" className="glass-card hover:bg-secondary/50">
              View More Projects
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
