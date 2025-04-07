import React, { useState, useEffect } from 'react';

function IssueBook() {
  const [issueRecords, setIssueRecords] = useState([]);
  const [students, setStudents] = useState([]);
  const [books, setBooks] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
  const [returnPopupVisible, setReturnPopupVisible] = useState(false);
  const [formData, setFormData] = useState({ issueId: '', studentId: '', bookId: '', issueDate: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [fineAmount, setFineAmount] = useState(null);
  const [returningRecord, setReturningRecord] = useState(null);

  useEffect(() => {
    fetchIssueRecords();
    fetchStudents();
    fetchBooks();
  }, []);

  const fetchIssueRecords = async () => {
    const response = await fetch('http://localhost:5167/api/issuerecord');
    const data = await response.json();
    setIssueRecords(data);
  };

  const fetchStudents = async () => {
    const response = await fetch('http://localhost:5167/api/student');
    const data = await response.json();
    setStudents(data);
  };

  const fetchBooks = async () => {
    const response = await fetch('http://localhost:5167/api/book');
    const data = await response.json();
    setBooks(data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const resetForm = () => {
    setFormData({ issueId: '', studentId: '', bookId: '', issueDate: '' });
    setFormVisible(false);
  };

  const handleIssueBook = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:5167/api/issuerecord', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ studentId: formData.studentId, bookId: formData.bookId }),
    });
    fetchIssueRecords();
    resetForm();
  };

  const handleEdit = (record) => {
    setFormData({
      issueId: record.issueId,
      studentId: record.studentId,
      bookId: record.bookId,
      issueDate: record.issueDate ? record.issueDate.split('T')[0] : '',
    });
    setFormVisible(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    await fetch(`http://localhost:5167/api/issuerecord/${formData.issueId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    fetchIssueRecords();
    resetForm();
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5167/api/issuerecord/${id}`, { method: 'DELETE' });
    fetchIssueRecords();
  };

  const handleReturnClick = async (record) => {
    const response = await fetch(`http://localhost:5167/api/issuerecord/fine/${record.issueId}`);
    const fine = await response.json();
    setFineAmount(fine);
    setReturningRecord(record);
    setReturnPopupVisible(true);
  };

  const handleReturnConfirm = async (id) => {
    await fetch(`http://localhost:5167/api/issuerecord/${id}`, { method: 'DELETE' });
    //fetchIssueRecords();
    setReturnPopupVisible(false);
    setReturningRecord(null);
    setFineAmount(null);
    fetchIssueRecords();
  };

  const filteredRecords = issueRecords.filter((r) =>
    r.student?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.book?.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6">
      {formVisible ? (
        <>
          <h1 className="text-2xl font-bold text-center mb-6">{formData.issueId ? 'Update Issue Record' : 'Issue Book'}</h1>
          <form onSubmit={formData.issueId ? handleUpdate : handleIssueBook} className="space-y-4 max-w-lg mx-auto bg-white p-6 rounded shadow-lg">
            <input
              type="text"
              placeholder="Search Student"
              className="w-full p-2 border rounded"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select name="studentId" value={formData.studentId} onChange={handleChange} className="w-full p-3 border rounded-md">
              <option value="">Select Student</option>
              {students
                .filter((s) => s.name.toLowerCase().includes(searchTerm.toLowerCase()))
                .map((s) => (
                  <option key={s.studentId} value={s.studentId}>{s.name}</option>
                ))}
            </select>
            <select name="bookId" value={formData.bookId} onChange={handleChange} className="w-full p-3 border rounded-md">
              <option value="">Select Book</option>
              {books
                .filter((b) => b.title.toLowerCase().includes(searchTerm.toLowerCase()))
                .map((b) => (
                  <option key={b.bookId} value={b.bookId}>{b.title}</option>
                ))}
            </select>
            {formData.issueId && (
              <input type="date" name="issueDate" value={formData.issueDate} onChange={handleChange} className="w-full p-3 border rounded-md" />
            )}
            <div className="flex space-x-4">
              <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700">{formData.issueId ? 'Update' : 'Issue Book'}</button>
              <button type="button" onClick={resetForm} className="w-full bg-gray-500 text-white p-3 rounded hover:bg-gray-600">Cancel</button>
            </div>
          </form>
        </>
      ) : (
        <>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Issued Book Records</h1>
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="p-2 border rounded-md w-1/3"
            />
            <button onClick={() => setFormVisible(true)} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Issue Book</button>
          </div>
          <table className="w-full mt-4 border-collapse bg-white shadow-md rounded-md">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2">Student</th>
                <th className="border px-4 py-2">Book</th>
                <th className="border px-4 py-2">Issued On</th>
                <th className="border px-4 py-2">Due Date</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.length > 0 ? (
                filteredRecords.map((record, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="border px-4 py-2">{record.student?.name}</td>
                    <td className="border px-4 py-2">{record.book?.title}</td>
                    <td className="border px-4 py-2">{new Date(record.issueDate).toLocaleDateString()}</td>
                    <td className="border px-4 py-2">{new Date(record.dueDate).toLocaleDateString()}</td>
                    <td className="border px-4 py-2 text-center">
                      <button onClick={() => handleEdit(record)} className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">Edit</button>
                      <button onClick={() => handleDelete(record.issueId)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 ml-2">Delete</button>
                      <button onClick={() => handleReturnClick(record)} className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 ml-2">Return</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-2">No issued records found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </>
      )}

      {/* Return Popup */}
      {returnPopupVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Return Book</h2>
            <p><strong>Student:</strong> {returningRecord?.student?.name}</p>
            <p><strong>Book:</strong> {returningRecord?.book?.title}</p>
            <p><strong>Fine:</strong> Rs. {fineAmount}</p>
            <div className="flex justify-end mt-6 space-x-4">
              <button onClick={() => handleReturnConfirm(returningRecord?.issueId)} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Return</button>
              <button onClick={() => setReturnPopupVisible(false)} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default IssueBook;
