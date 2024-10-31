// src/components/LazyComponent.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Asegúrate de importar Bootstrap si no lo has hecho

const LazyComponent = () => {
  return (
    <div className="text-center" style={{ padding: '20px', backgroundColor: '#f0f0f0', margin: '10px 0' }}>
      <h2 style={{
        fontFamily: `'Playfair Display', serif`,
        fontWeight: 'bold',
        fontSize: '2.5rem',
        letterSpacing: '1px',
        textTransform: 'uppercase'
      }}>
        Lazy Loaded Component
      </h2>
      <p style={{
        fontFamily: `'Playfair Display', serif`,
        fontSize: '1.2rem',
        letterSpacing: '0.5px',
      }}>
        This component is loaded lazily when it comes into view.
      </p>
    </div>
  );
};

export default LazyComponent;
