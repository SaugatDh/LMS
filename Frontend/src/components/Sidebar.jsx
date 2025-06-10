import { Link } from "react-router-dom";
import { FaHome, FaBook, FaGraduationCap, FaUserCircle, FaCog, FaChartLine } from "react-icons/fa";

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
    <nav className="mt-6 flex flex-col gap-2 px-4">
      <Link 
        to="/Home" 
        className="flex items-center gap-2 py-3 px-4 rounded-lg hover:bg-gray-100 hover:text-blue-600 transition"
        onClick={onClose}
      >
        <FaHome className="text-lg" /> 
        <span>Home</span>
      </Link>

      <Link 
        to="/courses" 
        className="flex items-center gap-2 py-3 px-4 rounded-lg hover:bg-gray-100 hover:text-blue-600 transition"
        onClick={onClose}
      >
        <FaGraduationCap className="text-lg" /> 
        <span>Courses</span>
      </Link>

      <Link 
        to="/student/dashboard" 
        className="flex items-center gap-2 py-3 px-4 rounded-lg hover:bg-gray-100 hover:text-blue-600 transition"
        onClick={onClose}
      >
        <FaChartLine className="text-lg" /> 
        <span>Dashboard</span>
      </Link>

      <div className="border-t border-gray-200 my-4"></div>

      <Link 
        to="/profile" 
        className="flex items-center gap-2 py-3 px-4 rounded-lg hover:bg-gray-100 hover:text-blue-600 transition"
        onClick={onClose}
      >
        <FaUserCircle className="text-lg" /> 
        <span>Profile</span>
      </Link>

      <Link 
        to="/settings" 
        className="flex items-center gap-2 py-3 px-4 rounded-lg hover:bg-gray-100 hover:text-blue-600 transition"
        onClick={onClose}
      >
        <FaCog className="text-lg" /> 
        <span>Settings</span>
      </Link>
    </nav>
  </div>
);

export default Sidebar;