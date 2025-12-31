import React from 'react';

// Trang Dashboard sau khi login
const Dashboard = () => {
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl border border-gray-700 text-center">
        <h1 className="text-3xl font-bold text-white mb-4">🎉 Chào mừng!</h1>
        <p className="text-gray-400 mb-2">Đăng nhập thành công</p>
        <p className="text-gray-500 text-sm mb-6 font-mono bg-gray-700 p-2 rounded">
          {token?.substring(0, 30)}...
        </p>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition-all"
        >
          Đăng xuất
        </button>
      </div>
    </div>
  );
};
export default Dashboard;