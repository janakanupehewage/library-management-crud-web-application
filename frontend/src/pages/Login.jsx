import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Adjust path as needed

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [credentials, setCredentials] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    fetch('http://localhost:5167/api/user/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(res => {
        if (!res.ok) throw new Error('Login failed');
        return res.json();
      })
      .then(data => {
        login(data.Token); // <--- Update context immediately
        navigate('/dashboard'); // Now navigation should work immediately
      })
      .catch(err => alert(err.message));
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 rounded-lg">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-3xl font-semibold mb-4">Login</h2>
        <input
          type="text"
          name="email"
          value={credentials.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full p-2 mb-4 border rounded"
        />
        <input
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
          placeholder="Password"
          className="w-full p-2 mb-4 border rounded"
        />
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">Login</button>
        <p className="mt-4 text-center">
          Don't have an account? <Link to="/register" className="text-blue-600">Register</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
