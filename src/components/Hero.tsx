
import { useEffect, useRef } from 'react';
import { ArrowRight, Github, Linkedin, Mail, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Text animation effect
  useEffect(() => {
    const chars = headingRef.current?.querySelectorAll('.char');
    if (chars) {
      chars.forEach((char, i) => {
        const el = char as HTMLElement;
        el.style.animationDelay = `${i * 0.05}s`;
      });
    }
  }, []);

  // Parallax effect on mouse move
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      
      const moveX = (x - 0.5) * 20;
      const moveY = (y - 0.5) * 20;
      
      const decorElements = container.querySelectorAll('.decor-item');
      decorElements.forEach((elem, index) => {
        const factor = (index + 1) * 0.1;
        const el = elem as HTMLElement;
        el.style.transform = `translate(${moveX * factor}px, ${moveY * factor}px)`;
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="decor-item absolute top-1/4 left-1/5 w-64 h-64 rounded-full bg-purple-500/10 filter blur-3xl"></div>
        <div className="decor-item absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-blue-500/10 filter blur-3xl"></div>
        <div className="decor-item absolute top-1/2 right-1/3 w-72 h-72 rounded-full bg-pink-500/10 filter blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="mb-6 inline-block">
            <span className="px-3 py-1 text-sm font-medium rounded-full bg-primary/10 text-primary backdrop-blur-sm">
              Software Developer & Data Science Student
            </span>
          </div>
          
          <h1 
            ref={headingRef} 
            className="text-4xl md:text-6xl font-bold leading-tight mb-6"
          >
            {'Hi, I\'m Mohammed Shahnawaz'.split('').map((char, index) => (
              <span key={index} className="char inline-block animate-fade-in opacity-0">
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
            <div className="h-1.5 w-12 bg-primary rounded-full mx-auto mt-2"></div>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 animate-fade-in opacity-0 [animation-delay:0.5s] [animation-fill-mode:forwards] max-w-2xl mx-auto text-balance">
            Building elegant software solutions and exploring data science at IIT Madras. 
            Passionate about creating meaningful digital experiences that solve real problems.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in opacity-0 [animation-delay:0.7s] [animation-fill-mode:forwards]">
            <Button className="glass-card bg-primary/90 hover:bg-primary text-white flex items-center gap-2 transition-all duration-300 px-6 py-6">
              <span>View My Work</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
            
            <Button variant="outline" className="glass-card hover:bg-secondary/50 flex items-center gap-2 transition-all duration-300 px-6 py-6">
              <span>Download CV</span>
              <Download className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="mt-12 flex items-center justify-center gap-6 animate-fade-in opacity-0 [animation-delay:0.9s] [animation-fill-mode:forwards]">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 rounded-full glass-card hover:scale-110 transition-transform duration-300"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 rounded-full glass-card hover:scale-110 transition-transform duration-300"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a 
              href="mailto:contact@example.com"
              className="p-2 rounded-full glass-card hover:scale-110 transition-transform duration-300"
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-float">
        <div className="w-6 h-10 rounded-full border-2 border-primary flex items-start justify-center p-1.5">
          <div className="w-1 h-2 bg-primary rounded-full animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
