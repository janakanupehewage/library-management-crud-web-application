import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    // Perform register API call (replace with actual API endpoint)
    fetch('http://localhost:5167/api/user/register', { // Updated
      method: 'POST',
      body: JSON.stringify(formData),
      headers: { 'Content-Type': 'application/json' },
    })
    .then(res => {
      if (!res.ok) throw new Error('Registration failed');
      return res.json();
    })
    .then(() => navigate('/'))
    .catch(err => alert(err.message));
    
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 rounded-lg">
      <form onSubmit={handleRegister} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-3xl font-semibold mb-4">Register</h2>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
          className="w-full p-2 mb-4 border rounded"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full p-2 mb-4 border rounded"
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          className="w-full p-2 mb-4 border rounded"
        />
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">Register</button>
        <p className="mt-4 text-center">
          Already have an account? <Link to="/" className="text-blue-600">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
