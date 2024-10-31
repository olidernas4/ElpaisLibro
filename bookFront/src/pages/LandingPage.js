// src/pages/LandingPage.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
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
  const navigate = useNavigate(); // Hook para la navegación

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

  // Función para manejar la redirección al dashboard
  const handleDashboardRedirect = () => {
    navigate('/dashboard'); // Redirige al dashboard
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Landing Page</h1>
      <h2>Images:</h2>
      <div>
        {images.map((image, index) => (
          <div key={index} id={`image-${index}`} style={{ marginBottom: '10px' }}>
            {visibleImages[index] ? (
              <img src={image} alt={`img-${index}`} width="300" />
            ) : (
              <div style={{ height: '300px', backgroundColor: '#e0e0e0' }} />
            )}
          </div>
        ))}
      </div>
      <div id="lazy-component">
        {loadLazyComponent && <LazyComponent />}
      </div>
      {/* Botón para redirigir al dashboard */}
      <button 
        onClick={handleDashboardRedirect} 
        style={{ marginTop: '20px', padding: '10px 20px', fontSize: '16px' }}>
        Go to Dashboard
      </button>
    </div>
  );
};

export default LandingPage;
