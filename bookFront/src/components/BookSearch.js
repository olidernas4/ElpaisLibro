
import React, { useEffect, useState } from 'react';
import BookList from './BookList';
import Filter from './Filter';
import { Modal, Button, Form } from 'react-bootstrap';

const BookManager = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [status, setStatus] = useState('');
  const [genre, setGenre] = useState('');
  const [query, setQuery] = useState('');

  // States for the edit modal
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState('');
  const [updatedAuthor, setUpdatedAuthor] = useState('');
  const [updatedGenre, setUpdatedGenre] = useState('');
  const [updatedStatus, setUpdatedStatus] = useState('');


  const fetchBooks = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/books', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();
      setBooks(data);
      setFilteredBooks(data); 
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  useEffect(() => {
    fetchBooks(); 
  }, []);

  useEffect(() => {
    let filtered = books;

    // Filter by status
    if (status) {
      const statusMap = {
        'por leer': 1,
        'leyendo': 2,
        'leído': 3,
      };
      const statusValue = statusMap[status];
      filtered = filtered.filter(book => book.status === statusValue);
    }

    // Filter by genre
    if (genre) {
      filtered = filtered.filter(book => book.genre.toLowerCase().includes(genre.toLowerCase()));
    }

    // Search by title or author
    if (query) {
      filtered = filtered.filter(book => 
        book.title.toLowerCase().includes(query.toLowerCase()) ||
        book.author.toLowerCase().includes(query.toLowerCase())
      );
    }

    setFilteredBooks(filtered);
  }, [status, genre, query, books]);

  const handleFilterChange = (field, value) => {
    if (field === 'status') {
      setStatus(value);
    } else if (field === 'genre') {
      setGenre(value);
    }
  };

  const handleSearchChange = (searchQuery) => {
    setQuery(searchQuery);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:3000/api/books/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setBooks(books.filter(book => book.id !== id));
      setFilteredBooks(filteredBooks.filter(book => book.id !== id));
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  //  handle editing
  const handleEdit = (book) => {
    setSelectedBook(book);
    setUpdatedTitle(book.title);
    setUpdatedAuthor(book.author);
    setUpdatedGenre(book.genre);
    setUpdatedStatus(book.status);
    setShowEditModal(true);
  };

  const handleUpdate = async () => {
    try {
      await fetch(`http://localhost:3000/api/books/${selectedBook.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: updatedTitle,
          author: updatedAuthor,
          genre: updatedGenre,
          status: updatedStatus,
        }),
      });

      const updatedBooks = books.map((book) =>
        book.id === selectedBook.id
          ? { ...book, title: updatedTitle, author: updatedAuthor, genre: updatedGenre, status: updatedStatus }
          : book
      );

      setBooks(updatedBooks);
      setFilteredBooks(updatedBooks);
      setShowEditModal(false);
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-center my-5">
          <div className="card p-3 shadow-sm" style={{ width: '100%', maxWidth: '500px' }}>
            <input
              type="text"
              className="form-control"
              value={query}
              placeholder="Buscar por título o autor"
              onChange={(e) => handleSearchChange(e.target.value)}
            />
            <Filter status={status} genre={genre} onFilterChange={handleFilterChange} />
          </div>
        </div>

      
      
      <BookList books={filteredBooks} onDelete={handleDelete} onEdit={handleEdit} />

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Libro</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formTitle">
              <Form.Label>Título</Form.Label>
              <Form.Control
                type="text"
                value={updatedTitle}
                onChange={(e) => setUpdatedTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formAuthor">
              <Form.Label>Autor</Form.Label>
              <Form.Control
                type="text"
                value={updatedAuthor}
                onChange={(e) => setUpdatedAuthor(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formGenre">
              <Form.Label>Género</Form.Label>
              <Form.Control
                type="text"
                value={updatedGenre}
                onChange={(e) => setUpdatedGenre(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formStatus">
              <Form.Label>Estado</Form.Label>
              <Form.Control
                as="select"
                value={updatedStatus}
                onChange={(e) => setUpdatedStatus(e.target.value)}
              >
                <option value={1}>Por leer</option>
                <option value={2}>Leyendo</option>
                <option value={3}>Leído</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default BookManager;
