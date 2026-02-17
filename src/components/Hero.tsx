import { useEffect, useRef, useState } from 'react';
import './Hero.css';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState<Set<number>>(new Set());

  // Recommended: Landscape-oriented, 1920x1080 or higher
  const heroImages = [
    '/images/hero/IMAGE_1-optimised-optimised.jpg',
    '/images/hero/IMAGE_2-optimised-optimised.jpeg',
    '/images/hero/IMAGE_3-optimised-optimised.jpeg',
    '/images/hero/IMAGE_4-optimised-optimised.jpeg'
  ];

  useEffect(() => {
    // Preload images for smoother transitions
    const preloadImages = () => {
      // Preload first 3 images immediately for faster initial load
      heroImages.slice(0, 3).forEach((src, index) => {
        const img = new Image();
        img.onload = () => {
          setImagesLoaded(prev => new Set(prev).add(index));
        };
        img.src = src;
      });

      // Lazy load remaining images
      setTimeout(() => {
        heroImages.slice(3).forEach((src, index) => {
          const img = new Image();
          img.onload = () => {
            setImagesLoaded(prev => new Set(prev).add(index + 3));
          };
          img.src = src;
        });
      }, 2000);
    };

    preloadImages();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Image carousel rotation
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 6000); // Change image every 6 seconds

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, []);

  const parallaxY = scrollY * 0.8;
  const opacity = Math.max(0, 1 - scrollY / 400);
  const scale = Math.max(0.85, 1 - scrollY / 1200);

  return (
    <section id="hero" className="hero" ref={heroRef}>
      {/* Background gradient fallback */}
      <div className="hero-background">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`hero-background-image ${
              index === currentImageIndex ? 'active' : ''
            } ${imagesLoaded.has(index) ? 'loaded' : ''}`}
            style={{ backgroundImage: imagesLoaded.has(index) ? `url(${image})` : 'none' }}
          />
        ))}
        <div className="hero-overlay" />
      </div>

      <div 
        className="hero-content"
        style={{
          transform: `translateY(${parallaxY}px) scale(${scale})`,
          opacity: opacity
        }}
      >
        <h1 className="hero-title">
          Capturing moments.<br />
          Creating memories.
        </h1>
        <p className="hero-subtitle">
          Where art meets emotion through the lens
        </p>
        <button 
          className="hero-cta"
          onClick={() => {
            document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          View Portfolio
        </button>
      </div>
      
      <div className="scroll-indicator">
        <div className="scroll-indicator-line"></div>
      </div>
    </section>
  );
};

export default Hero;
