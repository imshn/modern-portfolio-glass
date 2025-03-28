
// Animation utility functions for the portfolio website

/**
 * Applies reveal animation to elements as they scroll into view
 * @param selector CSS selector for elements to animate
 * @param options IntersectionObserver options
 */
export const setupScrollReveal = (
  selector: string = '.animate-on-scroll',
  options: IntersectionObserverInit = { 
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
  }
) => {
  // Check if IntersectionObserver is available
  if (typeof IntersectionObserver === 'undefined') {
    // Fallback for browsers that don't support IntersectionObserver
    const elements = document.querySelectorAll(selector);
    elements.forEach(el => {
      el.classList.add('animate-fade-in');
      el.classList.remove('opacity-0');
    });
    return;
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fade-in');
        entry.target.classList.remove('opacity-0');
        // Ensure animations stick after they complete
        const el = entry.target as HTMLElement;
        el.style.animationFillMode = 'forwards';
        observer.unobserve(entry.target);
      }
    });
  }, options);

  // Observe all elements matching the selector
  const elements = document.querySelectorAll(selector);
  elements.forEach(el => {
    el.classList.add('opacity-0');
    observer.observe(el);
  });

  // Return the observer for cleanup
  return observer;
};

/**
 * Sets up text animation for heading with character-by-character reveal
 * @param element Heading element reference
 */
export const setupTextAnimation = (element: HTMLElement | null) => {
  if (!element) return;
  
  const text = element.innerText;
  element.innerHTML = '';
  
  // Create spans for each character
  text.split('').forEach((char, index) => {
    const span = document.createElement('span');
    span.className = 'char inline-block animate-fade-in opacity-0';
    span.style.animationDelay = `${index * 0.05}s`;
    span.style.animationFillMode = 'forwards'; // Make sure characters remain visible
    span.textContent = char === ' ' ? '\u00A0' : char;
    element.appendChild(span);
  });
};

/**
 * Sets up parallax effect on mouse move
 * @param container Container element reference
 * @param selector CSS selector for elements to apply parallax effect
 */
export const setupParallaxEffect = (container: HTMLElement | null, selector: string = '.decor-item') => {
  if (!container) return;
  
  const handleMouseMove = (e: MouseEvent) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    const moveX = (x - 0.5) * 20;
    const moveY = (y - 0.5) * 20;
    
    const decorElements = container.querySelectorAll(selector);
    decorElements.forEach((elem, index) => {
      const factor = (index + 1) * 0.1;
      const el = elem as HTMLElement;
      el.style.transform = `translate(${moveX * factor}px, ${moveY * factor}px)`;
    });
  };

  window.addEventListener('mousemove', handleMouseMove);
  
  // Return cleanup function
  return () => window.removeEventListener('mousemove', handleMouseMove);
};

/**
 * Animate skill bars with width transition
 * @param selector CSS selector for skill bar elements
 * @param delay Delay before starting the animation in ms
 */
export const animateSkillBars = (selector: string = '[data-width]', delay: number = 500) => {
  setTimeout(() => {
    const skillBars = document.querySelectorAll(selector);
    skillBars.forEach(bar => {
      const width = bar.getAttribute('data-width');
      if (width && bar instanceof HTMLElement) {
        bar.style.width = width;
      }
    });
  }, delay);
};
