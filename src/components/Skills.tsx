
import { useEffect, useRef } from 'react';
import { Database, FileCode, Server, AreaChart, BrainCircuit, Globe } from 'lucide-react';

const skillCategories = [
  {
    name: "Programming Languages",
    icon: <FileCode className="h-6 w-6" />,
    skills: ["Python", "JavaScript", "TypeScript", "SQL"]
  },
  {
    name: "Web Development",
    icon: <Globe className="h-6 w-6" />,
    skills: ["React.js", "Next.js", "HTML/CSS", "Tailwind CSS"]
  },
  {
    name: "Backend Development",
    icon: <Server className="h-6 w-6" />,
    skills: ["Node.js", "Express.js", "REST APIs"]
  },
  {
    name: "Database",
    icon: <Database className="h-6 w-6" />,
    skills: ["MySQL", "MongoDB", "SQL", "Database Design"]
  },
  {
    name: "Data Science",
    icon: <AreaChart className="h-6 w-6" />,
    skills: ["Data Analysis", "Power BI", "Statistical Analysis"]
  },
  {
    name: "AI/ML",
    icon: <BrainCircuit className="h-6 w-6" />,
    skills: ["Modern AI Tools", "Machine Learning Basics", "Data Visualization"]
  }
];

const Skills = () => {
  const sectionRef = useRef<HTMLElement>(null);

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

  return (
    <section id="skills" ref={sectionRef} className="py-24 bg-secondary/50 relative">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/3 w-96 h-96 rounded-full bg-blue-500/5 filter blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-purple-500/5 filter blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              My Skills
            </h2>
            <div className="h-1 w-20 bg-primary rounded-full mx-auto mb-6"></div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              I've developed a diverse skill set spanning web development, data science, 
              and modern AI technologies. Here's what I bring to the table:
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillCategories.map((category, index) => (
              <div 
                key={category.name}
                className="glass-card p-6 rounded-xl transition-all duration-300 hover:shadow-xl animate-on-scroll"
                style={{ animationDelay: `${0.1 * index}s` }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary">
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-semibold">{category.name}</h3>
                </div>
                
                <div className="space-y-3">
                  {category.skills.map((skill) => (
                    <div key={skill} className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-primary"></div>
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          {/* Additional technical skills */}
          <div className="mt-16 animate-on-scroll" style={{ animationDelay: '0.6s' }}>
            <h3 className="text-2xl font-semibold text-center mb-8">Technical Proficiency</h3>
            <div className="glass-card rounded-xl p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { name: "Python", level: 90 },
                  { name: "JavaScript", level: 85 },
                  { name: "React.js", level: 80 },
                  { name: "Next.js", level: 75 },
                  { name: "Node.js", level: 75 },
                  { name: "SQL", level: 85 },
                  { name: "REST APIs", level: 80 },
                  { name: "AI Tools", level: 70 }
                ].map((skill) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-sm text-muted-foreground">{skill.level}%</span>
                    </div>
                    <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary rounded-full transition-all duration-1000" 
                        style={{ width: `0%`, transitionDelay: '0.3s' }}
                        data-width={`${skill.level}%`}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
