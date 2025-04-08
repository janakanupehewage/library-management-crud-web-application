import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import AddBooks from './pages/AddBooks';
import RegisterStudent from './pages/RegisterStudent';
import IssueBook from './pages/IssueBook';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="flex flex-col min-h-screen">
      <Router>
      <Header isAuthenticated={isAuthenticated} />
        <main className="container mx-auto p-4 flex-grow">
          <Routes>
            <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} />
            <Route path="/register" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Register />} />

            <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />} />
            <Route path="/add-books" element={isAuthenticated ? <AddBooks /> : <Navigate to="/" />} />
            <Route path="/register-student" element={isAuthenticated ? <RegisterStudent /> : <Navigate to="/" />} />
            <Route path="/issue-book" element={isAuthenticated ? <IssueBook /> : <Navigate to="/" />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
