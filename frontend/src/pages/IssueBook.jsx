import React, { useState, useEffect } from 'react';

function IssueBook() {
  const [students, setStudents] = useState([]);
  const [books, setBooks] = useState([]);
  const [issueDetails, setIssueDetails] = useState({
    studentId: '',
    bookId: '',
    issueDate: '',
  });

  useEffect(() => {
    fetchStudents();
    fetchBooks();
  }, []);

  const fetchStudents = async () => {
    const response = await fetch('/api/students');
    const data = await response.json();
    setStudents(data);
  };

  const fetchBooks = async () => {
    const response = await fetch('/api/books');
    const data = await response.json();
    setBooks(data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIssueDetails({ ...issueDetails, [name]: value });
  };

  const handleIssueBook = async (e) => {
    e.preventDefault();
    await fetch('/api/issuebooks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(issueDetails),
    });
    setIssueDetails({ studentId: '', bookId: '', issueDate: '' });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Issue Book to Student</h1>
      <form onSubmit={handleIssueBook} className="space-y-4">
        <select
          name="studentId"
          value={issueDetails.studentId}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="">Select Student</option>
          {students.map((student) => (
            <option key={student.id} value={student.id}>
              {student.name}
            </option>
          ))}
        </select>
        <select
          name="bookId"
          value={issueDetails.bookId}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="">Select Book</option>
          {books.map((book) => (
            <option key={book.id} value={book.id}>
              {book.title}
            </option>
          ))}
        </select>
        <input
          type="date"
          name="issueDate"
          value={issueDetails.issueDate}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
          Issue Book
        </button>
      </form>
    </div>
  );
}

export default IssueBook;
