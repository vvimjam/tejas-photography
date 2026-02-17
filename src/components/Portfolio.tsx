import { useEffect, useRef, useState } from 'react';
import './Portfolio.css';
import ImageLightbox from './ImageLightbox';

interface PortfolioItem {
  id: number;
  title: string;
  category: string;
  image: string;
}

const Portfolio = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // Portfolio items - Replace with your own images in public/images/portfolio/
  // You can add as many as you want - the grid adapts automatically
  // All aspect ratios are supported (vertical, horizontal, square)
  const portfolioItems: PortfolioItem[] = [
    { id: 1, title: 'Golden Hour', category: 'Landscape', image: '/images/portfolio/IMG_1-optimised.jpeg' },
    { id: 2, title: 'Urban Stories', category: 'Street', image: '/images/portfolio/IMG_2-optimised.jpg' },
    { id: 3, title: 'Natural Beauty', category: 'Portrait', image: '/images/portfolio/IMG_3-optimised.jpeg' },
    { id: 4, title: 'Architectural Lines', category: 'Architecture', image: '/images/portfolio/IMG_4-optimised.JPEG' },
    { id: 5, title: 'Mountain Peaks', category: 'Landscape', image: '/images/portfolio/IMG_5-optimised.jpeg' },
    { id: 6, title: 'City Lights', category: 'Urban', image: '/images/portfolio/IMG_6-optimised.jpeg' },
    { id: 7, title: 'Ocean Dreams', category: 'Landscape', image: '/images/portfolio/IMG_7-optimised.jpeg' },
    { id: 8, title: 'Timeless Moments', category: 'Portrait', image: '/images/portfolio/IMG_8-optimised.jpeg' },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          } else {
            entry.target.classList.remove('visible');
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -100px 0px' }
    );

    // Observe portfolio items
    const items = sectionRef.current?.querySelectorAll('.portfolio-item');
    items?.forEach((item) => observer.observe(item));

    // Observe header
    const header = sectionRef.current?.querySelector('.portfolio-header');
    if (header) observer.observe(header);

    return () => {
      items?.forEach((item) => observer.unobserve(item));
      if (header) observer.unobserve(header);
    };
  }, []);

  return (
    <section id="portfolio" className="portfolio" ref={sectionRef}>
      <div className="portfolio-header">
        <h2 className="section-title">Portfolio</h2>
        <p className="section-subtitle">
          A collection of moments that tell stories
        </p>
      </div>
      <div className="portfolio-grid">
        {portfolioItems.map((item, index) => (
          <div
            key={item.id}
            className="portfolio-item"
            style={{ '--delay': `${index * 0.1}s` } as React.CSSProperties}
            onClick={() => setSelectedIndex(index)}
          >
            <div className="portfolio-item-inner">
              <img src={item.image} alt={item.title} />
              <div className="portfolio-overlay">
                <h3>{item.title}</h3>
                <p>{item.category}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedIndex !== null && (
        <ImageLightbox
          image={portfolioItems[selectedIndex].image}
          title={portfolioItems[selectedIndex].title}
          category={portfolioItems[selectedIndex].category}
          isOpen={selectedIndex !== null}
          onClose={() => setSelectedIndex(null)}
          onNext={() => setSelectedIndex((selectedIndex + 1) % portfolioItems.length)}
          onPrev={() => setSelectedIndex((selectedIndex - 1 + portfolioItems.length) % portfolioItems.length)}
          hasNext={true}
          hasPrev={true}
        />
      )}
    </section>
  );
};

export default Portfolio;
