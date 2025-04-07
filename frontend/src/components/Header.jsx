import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <div className="text-xl font-bold">Library Management</div>
      <div className="flex space-x-4">
        <Link to="/add-books" className="text-white hover:text-gray-300">Add Books</Link>
        <Link to="/register-student" className="text-white hover:text-gray-300">Register Student</Link>
        <Link to="/issue-book" className="text-white hover:text-gray-300">Issue Book</Link>
        <button className="text-white hover:text-gray-300">Logout</button>
      </div>
    </header>
  );
}

export default Header;
