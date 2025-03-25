
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Loader from '@/components/Loader';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Set skill progress bars width on load
  useEffect(() => {
    const skillBars = document.querySelectorAll('[data-width]');
    
    setTimeout(() => {
      skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        if (width) {
          (bar as HTMLElement).style.width = width;
        }
      });
    }, 1000);
  }, []);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Loader isLoading={isLoading} />
      
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-grow">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Contact />
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Index;
