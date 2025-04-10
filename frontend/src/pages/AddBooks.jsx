import React, { useState, useEffect } from 'react';
import backgroundImg from '../assets/dashboard-bg.jpg'; // ✅ Import your background image

function AddBooks() {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({
    BookId: '',
    ISBN: '',
    Title: '',
    Author: '',
    Quantity: 1,
  });
  const [isFormVisible, setIsFormVisible] = useState(false); // state to manage form visibility

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    const response = await fetch('http://localhost:5167/api/book');
    const data = await response.json();
    console.log("data", data);
    setBooks(data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewBook({ ...newBook, [name]: value });
  };

  const handleAddBook = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:5167/api/book', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ISBN: newBook.ISBN,
        Title: newBook.Title,
        Author: newBook.Author,
        Quantity: newBook.Quantity,
      }),
    });
    fetchBooks(); // Refresh the book list after adding
    setNewBook({ BookId: '', ISBN: '', Title: '', Author: '', Quantity: 1 });
    setIsFormVisible(false); // Hide form after adding the book
  };

  const handleUpdateBook = async (e) => {
    e.preventDefault();
    if (newBook.BookId) {
      await fetch(`http://localhost:5167/api/book/${newBook.BookId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBook),
      });
      fetchBooks(); // Refresh the book list after updating
      setNewBook({ BookId: '', ISBN: '', Title: '', Author: '', Quantity: 1 });
      setIsFormVisible(false); // Hide form after updating the book
    } else {
      console.error("Book ID is missing for the update.");
    }
  };

  const handleDeleteBook = async (id) => {
    await fetch(`http://localhost:5167/api/book/${id}`, {
      method: 'DELETE',
    });
    fetchBooks(); // Refresh the book list after deletion
  };

  const handleEditBook = (book) => {
    setNewBook({
      BookId: book.bookId, // Ensure BookId is part of the object
      ISBN: book.isbn,
      Title: book.title,
      Author: book.author,
      Quantity: book.quantity,
    });
    setIsFormVisible(true); // Show form for editing
  };

  const handleAddButtonClick = () => {
    setIsFormVisible(true); // Show form when "Add" button is clicked
  };

  const handleCancelButtonClick = () => {
    setIsFormVisible(false); // Hide form and show the table
    setNewBook({ BookId: '', ISBN: '', Title: '', Author: '', Quantity: 1 }); // Reset the form
  };

  return (
    <div
      className="min-h-screen p-6 bg-cover bg-center bg-no-repeat flex justify-center items-center rounded-lg"
      style={{ backgroundImage: `url(${backgroundImg})` }} // ✅ Use the imported image here
    >
      <div className="w-full max-w-4xl bg-[rgba(255,255,255,0.07)] backdrop-blur-md border border-white/30 p-8 rounded-2xl shadow-lg">
        {isFormVisible ? (
          <>
            <h1 className="cursor-pointer text-2xl font-bold text-center mb-6 text-white drop-shadow-md">
              {newBook.BookId ? 'Update Book' : 'Add Book'}
            </h1>
            <form
              onSubmit={newBook.BookId ? handleUpdateBook : handleAddBook}
              className="space-y-4 max-w-lg mx-auto"
            >
              <input
                type="text"
                name="ISBN"
                value={newBook.ISBN}
                onChange={handleChange}
                placeholder="Book ISBN"
                className="w-full p-3 border border-white/30 rounded-md shadow-sm bg-transparent text-white placeholder-white focus:outline-none"
              />
              <input
                type="text"
                name="Title"
                value={newBook.Title}
                onChange={handleChange}
                placeholder="Book Title"
                className="w-full p-3 border border-white/30 rounded-md shadow-sm bg-transparent text-white placeholder-white focus:outline-none"
              />
              <input
                type="text"
                name="Author"
                value={newBook.Author}
                onChange={handleChange}
                placeholder="Author"
                className="w-full p-3 border border-white/30 rounded-md shadow-sm bg-transparent text-white placeholder-white focus:outline-none"
              />
              <input
                type="number"
                name="Quantity"
                value={newBook.Quantity}
                onChange={handleChange}
                placeholder="Quantity"
                className="w-full p-3 border border-white/30 rounded-md shadow-sm bg-transparent text-white placeholder-white focus:outline-none"
              />
              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="cursor-pointer w-full bg-gradient-to-r from-cyan-200 to-blue-300 text-blue-900 p-3 rounded-md"
                >
                  {newBook.BookId ? 'Update Book' : 'Add Book'}
                </button>
                <button
                  type="button"
                  onClick={handleCancelButtonClick}
                  className="cursor-pointer w-full bg-gray-500 text-white p-3 rounded-md"
                >
                  Cancel
                </button>
              </div>
            </form>
          </>
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-white">Book List</h1>
              <button
                onClick={handleAddButtonClick}
                className="cursor-pointer bg-gradient-to-r from-cyan-200 to-blue-300 text-blue-900 px-4 py-2 rounded-md"
              >
                Add Book
              </button>
            </div>
            <table className="w-full mt-4 border-collapse bg-white/10 backdrop-blur-md shadow-md rounded-md">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border px-4 py-2">ISBN</th>
                  <th className="border px-4 py-2">Title</th>
                  <th className="border px-4 py-2">Author</th>
                  <th className="border px-4 py-2">Quantity</th>
                  <th className="border px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {books.length > 0 ? (
                  books.map((book, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="border px-4 py-2">{book.isbn}</td>
                      <td className="border px-4 py-2">{book.title}</td>
                      <td className="border px-4 py-2">{book.author}</td>
                      <td className="border px-4 py-2">{book.quantity}</td>
                      <td className="border px-4 py-2 text-center">
                        <button
                          onClick={() => handleEditBook(book)}
                          className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600 cursor-pointer"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteBook(book.bookId)}
                          className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 ml-2 cursor-pointer"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-2">No books available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
}

export default AddBooks;
