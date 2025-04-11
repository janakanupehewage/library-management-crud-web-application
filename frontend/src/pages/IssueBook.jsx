import React, { useState, useEffect } from "react";
import backgroundImg from "../assets/dashboard-bg.jpg"; 

function IssueBook() {
  const [issueRecords, setIssueRecords] = useState([]);
  const [students, setStudents] = useState([]);
  const [books, setBooks] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
  const [returnPopupVisible, setReturnPopupVisible] = useState(false);
  const [formData, setFormData] = useState({
    issueId: "",
    studentId: "",
    bookId: "",
    issueDate: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [fineAmount, setFineAmount] = useState(null);
  const [returningRecord, setReturningRecord] = useState(null);

  useEffect(() => {
    fetchIssueRecords();
    fetchStudents();
    fetchBooks();
  }, []);

  const fetchIssueRecords = async () => {
    const response = await fetch("http://localhost:5167/api/issuerecord");
    const data = await response.json();
    setIssueRecords(data);
  };

  const fetchStudents = async () => {
    const response = await fetch("http://localhost:5167/api/student");
    const data = await response.json();
    setStudents(data);
  };

  const fetchBooks = async () => {
    const response = await fetch("http://localhost:5167/api/book");
    const data = await response.json();
    setBooks(data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const resetForm = () => {
    setFormData({ issueId: "", studentId: "", bookId: "", issueDate: "" });
    setFormVisible(false);
  };

  const handleIssueBook = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:5167/api/issuerecord", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        studentId: formData.studentId,
        bookId: formData.bookId,
      }),
    });
    fetchIssueRecords();
    resetForm();
  };

  const handleEdit = (record) => {
    setFormData({
      issueId: record.issueId,
      studentId: record.studentId,
      bookId: record.bookId,
      issueDate: record.issueDate ? record.issueDate.split("T")[0] : "",
    });
    setFormVisible(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    await fetch(`http://localhost:5167/api/issuerecord/${formData.issueId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    fetchIssueRecords();
    resetForm();
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5167/api/issuerecord/${id}`, {
      method: "DELETE",
    });
    fetchIssueRecords();
  };

  const handleReturnClick = async (record) => {
    const response = await fetch(
      `http://localhost:5167/api/issuerecord/fine/${record.issueId}`
    );
    const fine = await response.json();
    setFineAmount(fine);
    setReturningRecord(record);
    setReturnPopupVisible(true);
  };

  const handleReturnConfirm = async (id) => {
    await fetch(`http://localhost:5167/api/issuerecord/${id}`, {
      method: "DELETE",
    });
    setReturnPopupVisible(false);
    setReturningRecord(null);
    setFineAmount(null);
    fetchIssueRecords();
  };

  const filteredRecords = issueRecords.filter(
    (r) =>
      r.student?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.book?.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      className="min-h-screen p-6 bg-cover bg-center bg-no-repeat flex justify-center items-center rounded-lg"
      style={{ backgroundImage: `url(${backgroundImg})` }} 
    >
      <div className="w-full max-w-4xl bg-[rgba(255,255,255,0.1)] backdrop-blur-md border border-white/30 p-8 rounded-2xl shadow-lg">
        {/* Search bar always visible */}
        <input
          type="text"
          placeholder="Search Student or Book"
          className="w-full p-2 mb-6 border rounded-md bg-transparent text-white placeholder-white focus:outline-none"
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {formVisible ? (
          <>
            <h1 className="cursor-pointer text-2xl font-bold text-center mb-6 text-white drop-shadow-md">
              {formData.issueId ? "Update Issue Record" : "Issue Book"}
            </h1>
            <form
              onSubmit={formData.issueId ? handleUpdate : handleIssueBook}
              className="space-y-4 max-w-lg mx-auto"
            >
              <select
                name="studentId"
                value={formData.studentId}
                onChange={handleChange}
                className="cursor-pointer w-full p-3 border rounded-md bg-transparent text-white focus:outline-none"
              >
                <option className="text-black" value="">
                  Select Student
                </option>
                {students
                  .filter((s) =>
                    s.name.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((s) => (
                    <option
                      className="text-black"
                      key={s.studentId}
                      value={s.studentId}
                    >
                      {s.name}
                    </option>
                  ))}
              </select>
              <select
                name="bookId"
                value={formData.bookId}
                onChange={handleChange}
                className="cursor-pointer w-full p-3 border rounded-md bg-transparent text-white focus:outline-none"
              >
                <option className="text-black" value="">
                  Select Book
                </option>
                {books
                  .filter((b) =>
                    b.title.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((b) => (
                    <option
                      className="text-black"
                      key={b.bookId}
                      value={b.bookId}
                    >
                      {b.title}
                    </option>
                  ))}
              </select>

              <button
                type="submit"
                className="cursor-pointer w-full bg-gradient-to-r from-cyan-200 to-blue-300 text-blue-900 p-3 rounded-md"
              >
                {formData.issueId ? "Update Issue Record" : "Issue Book"}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="cursor-pointer w-full bg-gray-500 text-white p-3 rounded-md"
              >
                Cancel
              </button>
            </form>
          </>
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-white">Issue Records</h1>
              <button
                onClick={() => setFormVisible(true)}
                className="cursor-pointer bg-gradient-to-r from-cyan-200 to-blue-300 text-blue-900 px-4 py-2 rounded-md"
              >
                Issue Book
              </button>
            </div>
            <table className="w-full mt-4 border-collapse bg-white/10 backdrop-blur-md shadow-md rounded-md">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border px-4 py-2">Student</th>
                  <th className="border px-4 py-2">Book Title</th>
                  <th className="border px-4 py-2">Issue Date</th>
                  <th className="border px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRecords.length > 0 ? (
                  filteredRecords.map((record) => (
                    <tr
                      key={record.issueId}
                      className="border-b text-white"
                    >
                      <td className="border border-black px-4 py-2">
                        {record.student?.name}
                      </td>
                      <td className="border border-black px-4 py-2">{record.book?.title}</td>
                      <td className="border border-black px-4 py-2">
                        {record.issueDate.split("T")[0]}
                      </td>
                      <td className="border border-black px-4 py-2 text-center">
                        <button
                          onClick={() => handleEdit(record)}
                          className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600 cursor-pointer"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(record.issueId)}
                          className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 ml-2 cursor-pointer"
                        >
                          Delete
                        </button>
                        <button
                          onClick={() => handleReturnClick(record)}
                          className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 ml-2 cursor-pointer"
                        >
                          Return
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center py-4 text-white">
                      No records found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </>
        )}
      </div>

      {returnPopupVisible && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg w-1/3">
            <h2 className="text-lg font-bold mb-4">Return Confirmation</h2>
            <p className="mb-4">Fine Amount: Rs {fineAmount}</p>
            <div className="flex justify-between">
              <button
                onClick={() => handleReturnConfirm(returningRecord.issueId)}
                className="bg-green-500 text-white px-4 py-2 rounded-md cursor-pointer"
              >
                Confirm Return
              </button>
              <button
                onClick={() => setReturnPopupVisible(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-md cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default IssueBook;
