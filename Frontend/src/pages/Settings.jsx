import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { FaMoon, FaSun, FaAdjust } from "react-icons/fa";

const Settings = ({ user }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "auto";
  });

  // Apply theme when it changes
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark" || (theme === "auto" && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div>
      <Header onMenuClick={() => setSidebarOpen(true)} user={user} />
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      {sidebarOpen && (
        <div className="fixed inset-0 bg-transparent z-30" onClick={() => setSidebarOpen(false)} />
      )}
      <div className="pt-36 px-4 min-h-screen bg-white">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Settings</h1>
          
          {/* Theme Settings */}
          <div className="mb-12 border-b pb-8">
            <h2 className="text-xl font-semibold text-gray-700 mb-6">Theme Preferences</h2>
            <div className="flex gap-6">
              <button
                onClick={() => setTheme("light")}
                className={`flex items-center gap-2 px-4 py-2 rounded ${
                  theme === "light" 
                    ? "bg-blue-50 text-blue-600 font-medium" 
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <FaSun className="text-lg" /> Light
              </button>
              
              <button
                onClick={() => setTheme("dark")}
                className={`flex items-center gap-2 px-4 py-2 rounded ${
                  theme === "dark" 
                    ? "bg-blue-50 text-blue-600 font-medium" 
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <FaMoon className="text-lg" /> Dark
              </button>
              
              <button
                onClick={() => setTheme("auto")}
                className={`flex items-center gap-2 px-4 py-2 rounded ${
                  theme === "auto" 
                    ? "bg-blue-50 text-blue-600 font-medium" 
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <FaAdjust className="text-lg" /> Auto
              </button>
            </div>
          </div>
          
          {/* Notification Settings */}
          <div className="mb-12">
            <h2 className="text-xl font-semibold text-gray-700 mb-6">Notifications</h2>
            <div className="flex items-center justify-between py-3 border-b">
              <span className="text-gray-700">Email Notifications</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox"
                  checked={notifications}
                  onChange={e => setNotifications(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Settings;
