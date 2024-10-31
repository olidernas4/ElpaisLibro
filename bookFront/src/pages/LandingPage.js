
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LazyComponent from '../components/LazyComponent';
import libro1 from '../img/libro1.jpg';
import libro2 from '../img/libro2.jpg';
import libro3 from '../img/libro3.jpg';
import libro4 from '../img/libro4.jpg';
import libro5 from '../img/libro5.jpg';

const images = [
  libro1, 
  libro2, 
  libro3, 
  libro4, 
  libro5
];

const LandingPage = () => {
  const [loadLazyComponent, setLoadLazyComponent] = useState(false);
  const [visibleImages, setVisibleImages] = useState(Array(images.length).fill(false));
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const lazyComponentPosition = document.getElementById('lazy-component').getBoundingClientRect();
      if (lazyComponentPosition.top < window.innerHeight && !loadLazyComponent) {
        setLoadLazyComponent(true);
      }

      const updatedVisibleImages = visibleImages.map((_, index) => {
        const imagePosition = document.getElementById(`image-${index}`).getBoundingClientRect();
        return imagePosition.top < window.innerHeight;
      });

      setVisibleImages(updatedVisibleImages);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadLazyComponent, visibleImages]);

  const handleDashboardRedirect = () => {
    navigate('/dashboard');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{
        fontFamily: `'Playfair Display', serif`,
        fontWeight: 'bold',
        fontSize: '2.5rem',
        letterSpacing: '1px',
        textTransform: 'uppercase',
        textAlign: 'center',
        marginBottom: '20px'
      }}>
        Landing Page
      </h1>
      <h2 style={{
        fontFamily: `'Playfair Display', serif`,
        fontSize: '1.8rem',
        letterSpacing: '0.5px',
        textAlign: 'center',
        marginBottom: '30px'
      }}>
        Discover Our Collection
      </h2>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        {images.map((image, index) => (
          <div key={index} id={`image-${index}`} style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            maxWidth: '500px', 
            marginBottom: '20px',
            overflow: 'hidden',
            borderRadius: '10px'
          }}>
            {visibleImages[index] ? (
              <img src={image} alt={`img-${index}`} width="100%" style={{ objectFit: 'cover' }} />
            ) : (
              <div style={{ height: '300px', width: '100%', backgroundColor: '#e0e0e0' }} />
            )}
          </div>
        ))}
      </div>
      <div id="lazy-component" style={{ marginTop: '40px' }}>
        {loadLazyComponent && <LazyComponent />}
      </div>
      <button 
        onClick={handleDashboardRedirect} 
        style={{
          display: 'block',
          margin: '30px auto',
          padding: '12px 30px',
          fontSize: '16px',
          fontFamily: `'Playfair Display', serif`,
          fontWeight: 'bold',
          letterSpacing: '1px',
          backgroundColor: '#4CAF50',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          textTransform: 'uppercase',
          transition: 'background-color 0.3s ease'
        }}
      >
        Go to Dashboard
      </button>
    </div>
  );
};

export default LandingPage;
