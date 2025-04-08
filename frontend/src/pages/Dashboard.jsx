import React, { useEffect, useState } from 'react';

function Dashboard() {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalBooks: 0,
    totalIssuedBooks: 0,
    totalAdmins: 0,
  });

  useEffect(() => {
    // Fetch the stats from the backend API (replace with actual endpoint)
    fetch('http://localhost:5167/api/dashboard')
      .then((response) => response.json())
      .then((data) => setStats(data))
      .catch((err) => console.error('Error fetching data:', err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6 rounded-lg">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center justify-center">
          <h2 className="text-xl font-semibold text-gray-700">Total Students</h2>
          <p className="text-4xl font-bold text-blue-600">{stats.totalStudents}</p>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center justify-center">
          <h2 className="text-xl font-semibold text-gray-700">Total Books</h2>
          <p className="text-4xl font-bold text-blue-600">{stats.totalBooks}</p>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center justify-center">
          <h2 className="text-xl font-semibold text-gray-700">Total Issued Books</h2>
          <p className="text-4xl font-bold text-blue-600">{stats.totalIssuedBooks}</p>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center justify-center">
          <h2 className="text-xl font-semibold text-gray-700">Total Admins</h2>
          <p className="text-4xl font-bold text-blue-600">{stats.totalAdmins}</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
