
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
    <div className="d-flex justify-content-center my-3">
      <div className="card shadow-sm p-3" style={{ width: '100%', maxWidth: '500px' }}>
        <div className="card-body">
          <h5 className="card-title">{book.title}</h5>
          <p className="card-text"><strong>Autor:</strong> {book.author}</p>
          <p className="card-text"><strong>Estado:</strong> {getStatusText(book.status)}</p>
          <p className="card-text"><strong>Género:</strong> {book.genre}</p>
          <div className="d-flex justify-content-end">
            <button className="btn btn-warning me-2" onClick={() => onEdit(book)}>Editar</button>
            <button className="btn btn-danger" onClick={() => onDelete(book.id)}>Eliminar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookItem;
