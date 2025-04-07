import React, { useState, useEffect } from 'react';

function Register() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    UserId: '',
    name: '',
    email: '',
    address: '', // Correct field name
  });
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await fetch('http://localhost:5167/api/student'); // Adjust endpoint
    const data = await response.json();
    console.log("data", data);
    setUsers(data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:5167/api/student', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        Name: formData.name,
        Email: formData.email,
        Address: formData.address,
      }),
    });
    fetchUsers();
    resetForm();
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    await fetch(`http://localhost:5167/api/student/${formData.UserId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        StudentId: formData.UserId,
        Name: formData.name,
        Email: formData.email,
        Address: formData.address,
      }),
    });
    fetchUsers();
    resetForm();
  };

  const handleDeleteUser = async (id) => {
    await fetch(`http://localhost:5167/api/student/${id}`, {
      method: 'DELETE',
    });
    fetchUsers();
  };

  const handleEditUser = (user) => {
    setFormData({
      UserId: user.studentId, // Ensure correct field mapping here
      name: user.name,      // Use name, not username
      email: user.email,
      address: user.address,
    });
    setIsFormVisible(true);
  };

  const resetForm = () => {
    setFormData({ UserId: '', name: '', email: '', address: '' });
    setIsFormVisible(false);
  };

  return (
    <div className="container mx-auto p-6">
      {isFormVisible ? (
        <>
          <h1 className="text-2xl font-bold text-center mb-6">
            {formData.UserId ? 'Update Student' : 'Register Student'}
          </h1>
          <form
            onSubmit={formData.UserId ? handleUpdateUser : handleRegister}
            className="space-y-4 max-w-lg mx-auto bg-white p-6 rounded shadow-lg"
          >
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              className="w-full p-3 border rounded-md"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full p-3 border rounded-md"
            />
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Address"
              className="w-full p-3 border rounded-md"
            />
            <div className="flex space-x-4">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700"
              >
                {formData.UserId ? 'Update' : 'Register'}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="w-full bg-gray-500 text-white p-3 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </form>
        </>
      ) : (
        <>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Registered Students</h1>
            <button
              onClick={() => setIsFormVisible(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Register Students
            </button>
          </div>
          <table className="w-full mt-4 border-collapse bg-white shadow-md rounded-md">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Email</th>
                <th className="border px-4 py-2">Address</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="border px-4 py-2">{user.name}</td> {/* Fixed this to 'name' */}
                    <td className="border px-4 py-2">{user.email}</td>
                    <td className="border px-4 py-2">{user.address}</td>
                    <td className="border px-4 py-2 text-center">
                      <button
                        onClick={() => handleEditUser(user)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.studentId)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 ml-2"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center py-2">No Students registered</td>
                </tr>
              )}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

export default Register;
