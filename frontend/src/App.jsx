import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import AddBooks from './pages/AddBooks';
import RegisterStudent from './pages/RegisterStudent';
import IssueBook from './pages/IssueBook';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <Router>
      <Header />
      <main className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-books" element={<AddBooks />} />
          <Route path="/register-student" element={<RegisterStudent />} />
          <Route path="/issue-book" element={<IssueBook />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
