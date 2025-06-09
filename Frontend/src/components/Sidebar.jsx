import { FaHome, FaBook } from "react-icons/fa";

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

export default Sidebar;