
import { useEffect, useRef } from 'react';

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);

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
      { threshold: 0.2 }
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

  return (
    <section id="about" ref={sectionRef} className="py-24 relative">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-blue-300/10 filter blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-purple-300/10 filter blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-10 md:gap-20 items-center">
            {/* Image section */}
            <div className="w-full md:w-1/2 animate-on-scroll" style={{ animationDelay: '0.2s' }}>
              <div className="relative">
                <div className="aspect-square rounded-xl overflow-hidden glass-card">
                  <img 
                    src="/lovable-uploads/336ddc1f-79a9-49fe-86bf-260124f36ab5.png" 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -z-10 top-5 left-5 w-full h-full rounded-xl border border-primary/20 bg-primary/5"></div>
                
                {/* Floating elements */}
                <div className="absolute top-10 -right-10 glass-card p-4 rounded-lg animate-float [animation-delay:0.5s]">
                  <div className="text-sm font-medium">IIT Madras</div>
                  <div className="text-xs text-muted-foreground">BSc in Data Science</div>
                </div>
                
                <div className="absolute -bottom-6 -left-6 glass-card p-4 rounded-lg animate-float [animation-delay:0.2s]">
                  <div className="text-sm font-medium">Creative Coder</div>
                  <div className="text-xs text-muted-foreground">Problem Solver</div>
                </div>
              </div>
            </div>
            
            {/* Text content */}
            <div className="w-full md:w-1/2" ref={textContainerRef}>
              <div className="space-y-6">
                <div className="animate-on-scroll" style={{ animationDelay: '0.4s' }}>
                  <h2 className="text-3xl md:text-4xl font-bold mb-2">
                    About Me
                  </h2>
                  <div className="h-1 w-20 bg-primary rounded-full mb-6"></div>
                </div>
                
                <p className="text-lg text-muted-foreground animate-on-scroll" style={{ animationDelay: '0.6s' }}>
                  I'm a 19-year-old software developer and data science enthusiast currently pursuing my Bachelor's degree in Data Science and Applications at the prestigious Indian Institute of Technology Madras.
                </p>
                
                <p className="text-lg text-muted-foreground animate-on-scroll" style={{ animationDelay: '0.8s' }}>
                  My journey in technology began with a fascination for solving complex problems and creating elegant solutions. I'm passionate about the intersection of software development and data science, where I can leverage both coding skills and analytical thinking to build meaningful applications.
                </p>
                
                <p className="text-lg text-muted-foreground animate-on-scroll" style={{ animationDelay: '1s' }}>
                  When I'm not coding or analyzing data, you might find me exploring new technologies, contributing to open-source projects, or sharing my knowledge through my blog.
                </p>
                
                <div className="pt-4 animate-on-scroll" style={{ animationDelay: '1.2s' }}>
                  <h3 className="text-xl font-semibold mb-3">Education</h3>
                  <div className="glass-card p-4 rounded-lg">
                    <div className="font-medium">BSc in Data Science and Applications</div>
                    <div className="text-muted-foreground">Indian Institute of Technology Madras</div>
                    <div className="text-sm text-muted-foreground">2022 - Present</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
