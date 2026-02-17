import { useEffect, useRef } from 'react';
import './Contact.css';

const Contact = () => {
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
      { threshold: 0.2 }
    );

    const content = sectionRef.current?.querySelector('.contact-content');
    if (content) observer.observe(content);

    return () => {
      if (content) observer.unobserve(content);
    };
  }, []);

  return (
    <section id="contact" className="contact" ref={sectionRef}>
      <div className="contact-content">
        <h2 className="section-title">Let's Create Together</h2>
        <p className="contact-subtitle">
          Have a project in mind? I'd love to hear from you.
        </p>
        <div className="contact-methods">
          <a href="mailto:hello@tejasphotography.com" className="contact-button">
            <span className="contact-icon">✉️</span>
            <span className="contact-text">
              <span className="contact-label">Email</span>
              <span className="contact-value">hello@tejasphotography.com</span>
            </span>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="contact-button">
            <span className="contact-icon">📷</span>
            <span className="contact-text">
              <span className="contact-label">Instagram</span>
              <span className="contact-value">@tejasphotography</span>
            </span>
          </a>
        </div>
      </div>
      <footer className="footer">
        <p>© 2026 Tejas Photography. All rights reserved.</p>
      </footer>
    </section>
  );
};

export default Contact;
