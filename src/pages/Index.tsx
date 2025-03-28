
import { useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { setupScrollReveal, animateSkillBars } from '@/utils/animations';

const Index = () => {
  const isLoaded = useRef(false);

  // Fix section animations and set skill progress bars width on load
  useEffect(() => {
    if (!isLoaded.current) {
      // Ensure all animations have fill-mode forwards
      document.querySelectorAll('.animate-fade-in').forEach(el => {
        if (el instanceof HTMLElement) {
          el.style.animationFillMode = 'forwards';
        }
      });
      
      // Animate skill bars after a delay
      animateSkillBars();
      
      // Set up scroll reveal animations for elements
      const observer = setupScrollReveal();
      
      // Check if hash in URL to scroll to section
      if (window.location.hash) {
        const id = window.location.hash.substring(1);
        const element = document.getElementById(id);
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth' });
          }, 1000); // Small delay to ensure elements are loaded
        }
      }
      
      isLoaded.current = true;
      
      return () => {
        if (observer) {
          // Clean up the observer
          observer.disconnect();
        }
      };
    }
  }, []);

  return (
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
  );
};

export default Index;
