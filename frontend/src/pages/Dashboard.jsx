import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import backgroundImg from "../assets/dashboard-bg.jpg"; // ✅ Import your background image

function Dashboard() {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalBooks: 0,
    totalIssuedBooks: 0,
    totalAdmins: 0,
  });

  useEffect(() => {
    fetch("http://localhost:5167/api/dashboard")
      .then((response) => response.json())
      .then((data) => setStats(data))
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  return (
    <div
      className="min-h-screen p-6 bg-cover bg-center bg-no-repeat rounded-2xl shadow-inner"
      style={{ backgroundImage: `url(${backgroundImg})` }} // ✅ Use the imported image here
    >
      {/* Operations Links Row */}
      <div className="flex justify-end mb-6 space-x-3">
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
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {[
          { label: "Total Students", value: stats.totalStudents },
          { label: "Total Books", value: stats.totalBooks },
          { label: "Total Issued Books", value: stats.totalIssuedBooks },
          { label: "Total Admins", value: stats.totalAdmins },
        ].map((item, index) => (
          <div
            key={index}
            className="bg-[rgba(255,255,255,0.07)] backdrop-blur-md border border-white/30 p-8 rounded-2xl shadow-lg flex flex-col items-center justify-center text-white transition-all duration-300 hover:shadow-2xl hover:scale-105"
          >
            <h2 className="text-xl font-semibold drop-shadow-md">
              {item.label}
            </h2>
            <p className="text-4xl font-bold drop-shadow">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
