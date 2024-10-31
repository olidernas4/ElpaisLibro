// src/components/BookItem.js
import React from 'react';

const getStatusText = (status) => {
  switch (status) {
    case 1:
      return 'Por leer';
    case 2:
      return 'Leyendo';
    case 3:
      return 'Leído';
    default:
      return 'Desconocido';
  }
};

const BookItem = ({ book, onEdit, onDelete }) => {
  return (
    <div className="d-flex justify-content-between align-items-center border p-2 mb-2">
      <div>
        <h5>{book.title}</h5>
        <p>Autor: {book.author}</p>
        <p>Estado: {getStatusText(book.status)}</p>
        <p>Género: {book.genre}</p>
      </div>
      <div>
        <button className="btn btn-warning" onClick={() => onEdit(book)}>Editar</button>
        <button className="btn btn-danger ms-2" onClick={() => onDelete(book.id)}>Eliminar</button>
      </div>
    </div>
  );
};

export default BookItem;
