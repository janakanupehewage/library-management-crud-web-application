import React, { useState, useEffect } from 'react';

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

    //const bookToAdd = { ...newBook };
    //delete bookToAdd.BookId;

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
    <div className="container mx-auto p-6">
      {isFormVisible ? (
        <>
          <h1 className="text-2xl font-bold text-center mb-6">
            {newBook.BookId ? 'Update Book' : 'Add Book'}
          </h1>
          <form
            onSubmit={newBook.BookId ? handleUpdateBook : handleAddBook}
            className="space-y-4 max-w-lg mx-auto bg-white p-6 rounded shadow-lg"
          >
            <input
              type="text"
              name="ISBN"
              value={newBook.ISBN}
              onChange={handleChange}
              placeholder="Book ISBN"
              className="w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <input
              type="text"
              name="Title"
              value={newBook.Title}
              onChange={handleChange}
              placeholder="Book Title"
              className="w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <input
              type="text"
              name="Author"
              value={newBook.Author}
              onChange={handleChange}
              placeholder="Author"
              className="w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <input
              type="number"
              name="Quantity"
              value={newBook.Quantity}
              onChange={handleChange}
              placeholder="Quantity"
              className="w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <div className="flex space-x-4">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white p-3 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                {newBook.BookId ? 'Update Book' : 'Add Book'}
              </button>
              <button
                type="button"
                onClick={handleCancelButtonClick}
                className="w-full bg-gray-500 text-white p-3 rounded-md shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-600"
              >
                Cancel
              </button>
            </div>
          </form>
        </>
      ) : (
        <>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Book List</h1>
            <button
              onClick={handleAddButtonClick}
              className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-700"
            >
              Add Book
            </button>
          </div>
          <table className="w-full mt-4 border-collapse bg-white shadow-md rounded-md">
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
                        className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteBook(book.bookId)}
                        className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 ml-2"
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
  );
}

export default AddBooks;
