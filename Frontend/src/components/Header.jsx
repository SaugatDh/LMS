import { FaBars, FaCog, FaUserCircle, FaSearch, FaHome, FaGraduationCap, FaChartLine, FaMoon, FaSun, FaAdjust } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const Header = ({ onMenuClick, user }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "auto";
    }
    return "auto";
  });
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);
  const themeMenuRef = useRef(null);

  // Apply theme to <html>
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark" || (theme === "auto" && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Close theme menu on click outside
  useEffect(() => {
    const handleClick = (e) => {
      if (themeMenuRef.current && !themeMenuRef.current.contains(e.target)) {
        setThemeMenuOpen(false);
      }
    };
    if (themeMenuOpen) {
      document.addEventListener("mousedown", handleClick);
    } else {
      document.removeEventListener("mousedown", handleClick);
    }
    return () => document.removeEventListener("mousedown", handleClick);
  }, [themeMenuOpen]);

  const handleThemeChange = (nextTheme) => {
    setTheme(nextTheme);
    setThemeMenuOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search logic here
  };

  return (
    <div className="fixed w-full z-30">
      {/* Main Header */}
      <nav className="flex items-center justify-between bg-white dark:bg-gray-900 shadow px-4 py-3">
        <div className="flex items-center gap-2">
          <button onClick={onMenuClick} className="text-2xl text-gray-700 dark:text-gray-200 mr-2">
            <FaBars />
          </button>
          <span className="font-bold text-lg text-gray-800 dark:text-gray-100"></span>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex-1 max-w-xl mx-4">
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12"
            />
            <button
              type="submit"
              className="absolute right-0 h-full px-4 text-gray-400 hover:text-blue-500 transition-colors flex items-center justify-center"
            >
              <FaSearch className="w-4 h-4" />
            </button>
          </div>
        </form>

        {/* Right section: Theme, Settings, Profile */}
        <div className="flex items-center gap-4">
          {/* Theme Changer */}
          <div className="relative flex items-center" ref={themeMenuRef}>
            <button
              className="text-xl h-8 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              title="Change theme"
              onClick={() => setThemeMenuOpen((open) => !open)}
              aria-haspopup="true"
              aria-expanded={themeMenuOpen}
              style={{ minWidth: "2rem" }}
            >
              {theme === "dark" ? <FaMoon /> : theme === "light" ? <FaSun /> : <FaAdjust />}
            </button>
            {themeMenuOpen && (
              <div className="absolute left-2 top-full mt-2 w-32 bg-white dark:bg-gray-800 rounded shadow-lg border border-gray-100 dark:border-gray-700 z-50">
                <button
                  className={`flex items-center w-full px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 ${theme === "light" ? "font-bold text-blue-600" : "text-gray-700 dark:text-gray-200"}`}
                  onClick={() => { setTheme("light"); setThemeMenuOpen(false); }}
                >
                  <FaSun className="mr-2" /> Light
                </button>
                <button
                  className={`flex items-center w-full px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 ${theme === "dark" ? "font-bold text-blue-600" : "text-gray-700 dark:text-gray-200"}`}
                  onClick={() => { setTheme("dark"); setThemeMenuOpen(false); }}
                >
                  <FaMoon className="mr-2" /> Dark
                </button>
                <button
                  className={`flex items-center w-full px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 ${theme === "auto" ? "font-bold text-blue-600" : "text-gray-700 dark:text-gray-200"}`}
                  onClick={() => { setTheme("auto"); setThemeMenuOpen(false); }}
                >
                  <FaAdjust className="mr-2" /> Auto
                </button>
              </div>
            )}
          </div>
          <Link to="/settings">
            <FaCog className="text-xl text-gray-600 dark:text-gray-300 cursor-pointer" title="Settings" />
          </Link>
          <Link to="/profile">
            <FaUserCircle className="text-2xl text-gray-600 dark:text-gray-300 cursor-pointer" title={user.email} />
          </Link>
        </div>
      </nav>

      {/* Secondary Navigation */}
      <div className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center space-x-8">
            <Link 
              to="/Home" 
              className="flex items-center gap-2 py-3 text-sm font-medium text-gray-600 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 border-b-2 border-transparent hover:border-blue-600 transition-colors"
            >
              <FaHome className="text-lg" /> 
              <span>Home</span>
            </Link>
            <Link 
              to="/courses" 
              className="flex items-center gap-2 py-3 text-sm font-medium text-gray-600 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 border-b-2 border-transparent hover:border-blue-600 transition-colors"
            >
              <FaGraduationCap className="text-lg" /> 
              <span>Courses</span>
            </Link>
            <Link 
              to="/student/dashboard" 
              className="flex items-center gap-2 py-3 text-sm font-medium text-gray-600 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 border-b-2 border-transparent hover:border-blue-600 transition-colors"
            >
              <FaChartLine className="text-lg" /> 
              <span>Dashboard</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;