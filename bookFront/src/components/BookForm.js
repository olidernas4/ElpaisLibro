// src/components/BookForm.js
import React, { useState, useEffect } from 'react';

const BookForm = ({ selectedBook, onSave, onCancel }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [status, setStatus] = useState(1);
  const [genre, setGenre] = useState('');
  const [rating, setRating] = useState(0);

  useEffect(() => {
    if (selectedBook) {
      setTitle(selectedBook.title);
      setAuthor(selectedBook.author);
      setStatus(selectedBook.status);
      setGenre(selectedBook.genre);
      setRating(selectedBook.rating || 0);
    } else {
      setTitle('');
      setAuthor('');
      setStatus(1);
      setGenre('');
      setRating(0);
    }
  }, [selectedBook]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const bookData = { title, author, status, genre, rating };
    console.log('Data sent to backend:', bookData);

    try {
      const response = await fetch('http://localhost:3000/api/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(bookData),
      });

      if (!response.ok) {
        throw new Error('Error al guardar el libro');
      }

      const newBook = await response.json();
      onSave(newBook);
      onCancel();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-lg p-4" style={{ width: '100%', maxWidth: '500px' }}>
        <h4 className="card-title text-center mb-4">{selectedBook ? 'Editar Libro' : 'Nuevo Libro'}</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Título</label>
            <input 
              type="text" 
              className="form-control" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              required 
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Autor</label>
            <input 
              type="text" 
              className="form-control" 
              value={author} 
              onChange={(e) => setAuthor(e.target.value)} 
              required 
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Estado</label>
            <select 
              className="form-select" 
              value={status} 
              onChange={(e) => setStatus(Number(e.target.value))} 
            >
              <option value={1}>Por leer</option>
              <option value={2}>Leyendo</option>
              <option value={3}>Leído</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Género</label>
            <input 
              type="text" 
              className="form-control" 
              value={genre} 
              onChange={(e) => setGenre(e.target.value)} 
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Rating</label>
            <input 
              type="number" 
              className="form-control" 
              value={rating} 
              onChange={(e) => setRating(Number(e.target.value))}
              min="0" 
              max="5" 
              step="0.1"
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Guardar</button>
          <button type="button" className="btn btn-secondary w-100 mt-2" onClick={onCancel}>
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookForm;
