import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Header({ isAuthenticated }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center shadow-md">
      <div className="text-2xl font-bold">📚 Library Management</div>

      {isAuthenticated && (
        <div className="flex space-x-3 items-center">
          <Link
            to="/dashboard"
            className="bg-gradient-to-r from-cyan-200 to-blue-300 text-blue-900 px-3 py-1.5 rounded-md hover:from-cyan-300 hover:to-blue-400 transition duration-200 font-medium shadow-sm"
          >
            Dashboard
          </Link>
          <Link
            to="/add-books"
            className="bg-gradient-to-r from-cyan-200 to-blue-300 text-blue-900 px-3 py-1.5 rounded-md hover:from-cyan-300 hover:to-blue-400 transition duration-200 font-medium shadow-sm"
          >
            Add Books
          </Link>
          <Link
            to="/register-student"
            className="bg-gradient-to-r from-cyan-200 to-blue-300 text-blue-900 px-3 py-1.5 rounded-md hover:from-cyan-300 hover:to-blue-400 transition duration-200 font-medium shadow-sm"
          >
            Register Student
          </Link>
          <Link
            to="/issue-book"
            className="bg-gradient-to-r from-cyan-200 to-blue-300 text-blue-900 px-3 py-1.5 rounded-md hover:from-cyan-300 hover:to-blue-400 transition duration-200 font-medium shadow-sm"
          >
            Issue Book
          </Link>
          <button
            onClick={handleLogout}
            className="cursor-pointer bg-gradient-to-r from-rose-300 to-pink-400 text-white px-4 py-2 rounded-md hover:from-rose-400 hover:to-pink-500 transition duration-200 font-semibold shadow-md"
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
