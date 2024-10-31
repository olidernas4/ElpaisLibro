// src/components/BookList.js
import React from 'react';
import BookItem from './BookItem';

const BookList = ({ books, onEdit, onDelete }) => {
  return (
    <div>
      {books.length === 0 ? (
        <p>No hay libros disponibles.</p>
      ) : (
        books.map((book) => (
          <BookItem key={book.id} book={book} onEdit={onEdit} onDelete={onDelete} />
        ))
      )}
    </div>
  );
};

export default BookList;
