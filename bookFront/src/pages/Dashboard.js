// src/pages/Dashboard.js
import React, { useState } from 'react';
import BookForm from '../components/BookForm';
import BookList from '../components/BookList';
// import Filter from '../components/Filter';
import BookSearch from '../components/BookSearch';

const Dashboard = () => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [filter, setFilter] = useState({ status: '', genre: '' });
  const [searchQuery, setSearchQuery] = useState('');

  const handleSave = (book) => {
    if (selectedBook) {
      setBooks(books.map((b) => (b.id === selectedBook.id ? { ...b, ...book } : b)));
    } else {
      setBooks([...books, { ...book, id: Date.now() }]);
    }
    setSelectedBook(null);
  };

  const handleEdit = (book) => {
    setSelectedBook(book);
  };

  const handleDelete = (id) => {
    setBooks(books.filter((book) => book.id !== id));
  };

  // const handleFilterChange = (type, value) => {
  //   setFilter((prev) => ({ ...prev, [type]: value }));
  // };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  const filteredBooks = books
    .filter((book) => (filter.status ? book.status === filter.status : true))
    .filter((book) => (filter.genre ? book.genre.includes(filter.genre) : true))
    .filter((book) => 
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      book.author.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div className="container mt-4">
        <h1 
          className="text-center my-4" 
          style={{
            fontFamily: `'Playfair Display', serif`, // Fuente tipo periódico
            fontWeight: 'bold',
            fontSize: '2.5rem',
            letterSpacing: '1px', // Ligero espaciado para efecto de título
            textTransform: 'uppercase'
          }}
        >
          Dashboard de Libros
        </h1>
        <BookForm selectedBook={selectedBook} onSave={handleSave} onCancel={() => setSelectedBook(null)} />
        {/* <Filter 
          status={filter.status} 
          genre={filter.genre} 
          onFilterChange={handleFilterChange} 
        /> */}
        <BookSearch query={searchQuery} onSearchChange={handleSearchChange} />
        <BookList books={filteredBooks} onEdit={handleEdit} onDelete={handleDelete} />
      </div>

  );
};

export default Dashboard;
