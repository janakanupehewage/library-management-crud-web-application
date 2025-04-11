import React, { useState, useEffect } from 'react';
import backgroundImg from '../assets/dashboard-bg.jpg'; 

function RegisterStudent() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    UserId: '',
    name: '',
    email: '',
    address: '', 
  });
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await fetch('http://localhost:5167/api/student'); 
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
      UserId: user.studentId, 
      name: user.name,      
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
    <div
      className="min-h-screen p-6 bg-cover bg-center bg-no-repeat flex justify-center items-center rounded-lg"
      style={{ backgroundImage: `url(${backgroundImg})` }} 
    >
      <div className="w-full max-w-4xl bg-[rgba(255,255,255,0.07)] backdrop-blur-md border border-white/30 p-8 rounded-2xl shadow-lg">
        {isFormVisible ? (
          <>
            <h1 className="cursor-pointer text-2xl font-bold text-center mb-6 text-white drop-shadow-md">
              {formData.UserId ? 'Update Student' : 'Register Student'}
            </h1>
            <form
              onSubmit={formData.UserId ? handleUpdateUser : handleRegister}
              className="space-y-4 max-w-lg mx-auto"
            >
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                className="w-full p-3 border border-white/30 rounded-md shadow-sm bg-transparent text-white placeholder-white focus:outline-none"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full p-3 border border-white/30 rounded-md shadow-sm bg-transparent text-white placeholder-white focus:outline-none"
              />
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Address"
                className="w-full p-3 border border-white/30 rounded-md shadow-sm bg-transparent text-white placeholder-white focus:outline-none"
              />
              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="cursor-pointer w-full bg-gradient-to-r from-cyan-200 to-blue-300 text-blue-900 p-3 rounded-md"
                >
                  {formData.UserId ? 'Update' : 'Register'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
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
              <h1 className="text-2xl font-bold text-white">Registered Students</h1>
              <button
                onClick={() => setIsFormVisible(true)}
                className="cursor-pointer bg-gradient-to-r from-cyan-200 to-blue-300 text-blue-900 px-4 py-2 rounded-md"
              >
                Register Students
              </button>
            </div>
            <table className="w-full mt-4 border-collapse bg-white/10 backdrop-blur-md shadow-md rounded-md">
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
                    <tr key={index} className="border-b text-white">
                      <td className="border border-black px-4 py-2">{user.name}</td>
                      <td className="border border-black px-4 py-2">{user.email}</td>
                      <td className="border border-black px-4 py-2">{user.address}</td>
                      <td className="border border-black px-4 py-2 text-center">
                        <button
                          onClick={() => handleEditUser(user)}
                          className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600 cursor-pointer"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user.studentId)}
                          className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 ml-2 cursor-pointer"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center py-2">No students registered</td>
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

export default RegisterStudent;
