import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Header({ isAuthenticated }) {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center shadow-md">
      <div className="text-2xl font-bold">📚 Library Management Platform</div>

      {isAuthenticated && (
        <div className="flex space-x-3 items-center">
          {/* Show Dashboard link only if current path is NOT /dashboard */}
          {location.pathname !== '/dashboard' && (
            <Link
              to="/dashboard"
              className="bg-gradient-to-r from-cyan-200 to-blue-300 text-blue-900 px-3 py-1.5 rounded-md hover:from-cyan-300 hover:to-blue-400 transition duration-200 font-medium shadow-sm"
            >
              Dashboard
            </Link>
          )}

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
