// src/components/BookForm.js
import React, { useState, useEffect } from 'react';

const BookForm = ({ selectedBook, onSave, onCancel }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [status, setStatus] = useState(1); // Cambiar a un número
  const [genre, setGenre] = useState('');
  const [rating, setRating] = useState(0); // Estado para el rating

  useEffect(() => {
    if (selectedBook) {
      setTitle(selectedBook.title);
      setAuthor(selectedBook.author);
      setStatus(selectedBook.status); // Asegúrate de que esto sea un número
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

    const bookData = { title, author, status, genre, rating }; // Incluir rating en bookData
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
    <form onSubmit={handleSubmit} className="mb-4">
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
          step="0.1" // Permite decimales
        />
      </div>
      <button type="submit" className="btn btn-primary">Guardar</button>
      <button type="button" className="btn btn-secondary ms-2" onClick={onCancel}>
        Cancelar
      </button>
    </form>
  );
};

export default BookForm;
