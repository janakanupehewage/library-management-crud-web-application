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
    fetch('/api/dashboard-stats')
      .then(response => response.json())
      .then(data => setStats(data));
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      <div className="bg-white p-4 rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-semibold">Total Students</h2>
        <p className="text-xl">{stats.totalStudents}</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-semibold">Total Books</h2>
        <p className="text-xl">{stats.totalBooks}</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-semibold">Total Issued Books</h2>
        <p className="text-xl">{stats.totalIssuedBooks}</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-semibold">Total Admins</h2>
        <p className="text-xl">{stats.totalAdmins}</p>
      </div>
    </div>
  );
}

export default Dashboard;
