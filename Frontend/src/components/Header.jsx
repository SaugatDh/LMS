import { FaBars, FaCog, FaUserCircle } from "react-icons/fa";

const Header = ({ onMenuClick, user }) => (
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

export default Header;