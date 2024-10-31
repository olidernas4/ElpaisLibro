// src/components/LazyComponent.js
import React from 'react';

const LazyComponent = () => {
  return (
    <div style={{ padding: '20px', backgroundColor: '#f0f0f0', margin: '10px 0' }}>
      <h2>Lazy Loaded Component</h2>
      <p>This component is loaded lazily when it comes into view.</p>
    </div>
  );
};

export default LazyComponent;
