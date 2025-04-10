import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Adjust path as needed
import { FiEye, FiEyeOff } from 'react-icons/fi'; // Import eye icons from react-icons
import backgroundImg from '../assets/dashboard-bg.jpg'; // Import your background image here

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [passwordVisible, setPasswordVisible] = useState(false); // State to toggle password visibility

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
    <div
      className="flex justify-center items-center h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${backgroundImg})` }} // Apply the background image
    >
      <form
        onSubmit={handleLogin}
        className="bg-[rgba(255,255,255,0.07)] backdrop-blur-md border border-white/30 p-8 rounded-2xl shadow-lg w-full max-w-sm flex flex-col space-y-4 text-white"
      >
        <h2 className="text-3xl font-semibold mb-4 text-center drop-shadow-md">Login</h2>
        
        <input
          type="email"
          name="email"
          value={credentials.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full p-3 mb-4 border border-white/30 rounded-lg bg-transparent text-white placeholder-white focus:outline-none"
        />
        
        <div className="relative">
          <input
            type={passwordVisible ? "text" : "password"} // Toggle between text and password type
            name="password"
            value={credentials.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full p-3 mb-4 border border-white/30 rounded-lg bg-transparent text-white placeholder-white focus:outline-none"
          />
          <span
            onClick={() => setPasswordVisible(!passwordVisible)} // Toggle visibility on click
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-white"
          >
            {passwordVisible ? <FiEyeOff size={24} /> : <FiEye size={24} />} {/* Toggle between icons */}
          </span>
        </div>

        <button
          type="submit"
          className="cursor-pointer w-full bg-gradient-to-r from-cyan-200 to-blue-300 text-blue-900 p-2 rounded-lg"
        >
          Login
        </button>
        
        <p className="mt-4 text-center">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-400 hover:underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
