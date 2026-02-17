import { useEffect, useRef } from 'react';
import './About.css';

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

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
      { threshold: 0.2, rootMargin: '0px 0px -100px 0px' }
    );

    const textElement = sectionRef.current?.querySelector('.about-text');
    const imageElement = sectionRef.current?.querySelector('.about-image');

    if (textElement) observer.observe(textElement);
    if (imageElement) observer.observe(imageElement);

    return () => {
      if (textElement) observer.unobserve(textElement);
      if (imageElement) observer.unobserve(imageElement);
    };
  }, []);

  return (
    <section id="about" className="about" ref={sectionRef}>
      <div className="about-content">
        <div className="about-text">
          <h2 className="section-title">About</h2>
          <p className="about-description">
            Hi, I'm Teja. Photography is my way of capturing the extraordinary in the ordinary. 
            Every frame tells a story, every moment holds magic.
          </p>
          <p className="about-description">
            With a passion for visual storytelling and an eye for detail, I specialize in landscape, 
            portrait, and urban photography. My work is driven by a love for natural light, authentic 
            emotions, and timeless compositions.
          </p>
          <p className="about-description">
            When I'm not behind the camera, you'll find me exploring new places, seeking inspiration 
            in everyday moments, and constantly learning the art of seeing.
          </p>
        </div>
        <div className="about-image">
          <div className="image-placeholder">
            <img 
              src="/images/about/ABOUT_IMG-optimised.jpg" 
              alt="Photographer at work"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
