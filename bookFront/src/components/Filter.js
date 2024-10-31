
import React from 'react';

const Filter = ({ status, genre, onFilterChange }) => {
  return (
    <div className="d-flex mb-4">
      <select className="form-select" value={status} onChange={(e) => onFilterChange('status', e.target.value)}>
        <option value="">Todos</option>
        <option value="por leer">Por leer</option>
        <option value="leyendo">Leyendo</option>
        <option value="leído">Leído</option>
      </select>
      <input
        type="text"
        className="form-control ms-2"
        value={genre}
        placeholder="Género"
        onChange={(e) => onFilterChange('genre', e.target.value)}
      />
    </div>
  );
};

export default Filter;
