import React, { useState } from "react";
import { FaBars, FaCog, FaUserCircle, FaHome, FaBook } from "react-icons/fa";

const Sidebar = ({ open, onClose }) => (
  <div
    className={`fixed top-0 left-0 h-full w-64 bg-white text-gray-800 transform ${
      open ? "translate-x-0" : "-translate-x-full"
    } transition-transform duration-300 z-40 shadow`}
  >
    <div className="flex items-center justify-between p-4 border-b border-gray-200">
      <span className="text-xl font-bold flex items-center">
        <FaBook className="mr-2" /> LMS
      </span>
      <button onClick={onClose} className="text-2xl text-gray-600 hover:text-gray-900">
        &times;
      </button>
    </div>
    <nav className="mt-6 flex flex-col gap-4 px-4">
      <a href="#" className="flex items-center gap-2 py-2 rounded hover:bg-gray-100 hover:text-gray-900 transition">
        <FaHome /> Home
      </a>
      {/* Add more sidebar links here */}
    </nav>
  </div>
);

const Navbar = ({ onMenuClick, user }) => (
  <nav className="flex items-center justify-between bg-white shadow px-4 py-3 fixed w-full z-30">
    <div className="flex items-center gap-2">
      <button onClick={onMenuClick} className="text-2xl text-gray-700 mr-2">
        <FaBars />
      </button>
      <span className="font-bold text-lg text-gray-800">Dashboard</span>
    </div>
    <div className="flex items-center gap-4">
      <FaCog className="text-xl text-gray-600 cursor-pointer" title="Settings" />
      <FaUserCircle className="text-2xl text-gray-600 cursor-pointer" title={user.email} />
    </div>
  </nav>
);

const Home = ({ user }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div>
      <Navbar onMenuClick={() => setSidebarOpen(true)} user={user} />
      {/* Sidebar should have higher z-index */}
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      {/* Overlay should have lower z-index than sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-transparent  z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <div className="pt-20 pl-0 md:pl-0">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Welcome, {user.email}!</h1>
          <p>
            You are logged in as <b>{user.role}</b>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;