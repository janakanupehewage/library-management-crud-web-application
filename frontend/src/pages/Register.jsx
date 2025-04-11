import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi'; // Import eye icons from react-icons
import backgroundImg from '../assets/dashboard-bg.jpg'; // Import your background image

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [passwordVisible, setPasswordVisible] = useState(false); // State to toggle password visibility

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    // Perform register API call 
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
    <div
      className="min-h-screen p-6 bg-cover bg-center bg-no-repeat flex justify-center items-center rounded-lg"
      style={{ backgroundImage: `url(${backgroundImg})` }} // the imported image 
    >
      <form
        onSubmit={handleRegister}
        className="bg-[rgba(255,255,255,0.07)] backdrop-blur-md border border-white/30 p-8 rounded-2xl shadow-lg w-full max-w-sm flex flex-col space-y-4 text-white"
      >
        <h2 className="text-3xl font-semibold mb-4 text-center drop-shadow-md">Register</h2>
        
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
          className="w-full p-3 mb-4 border border-white/30 rounded-lg bg-transparent text-white placeholder-white focus:outline-none"
        />
        
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full p-3 mb-4 border border-white/30 rounded-lg bg-transparent text-white placeholder-white focus:outline-none"
        />
        
        <div className="relative">
          <input
            type={passwordVisible ? "text" : "password"} // Toggle between text and password type
            name="password"
            value={formData.password}
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
          Register
        </button>
        
        <p className="mt-4 text-center">
          Already have an account?{' '}
          <Link to="/" className="text-blue-400 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
