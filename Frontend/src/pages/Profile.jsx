import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

const Profile = ({ user }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div>
      <Header onMenuClick={() => setSidebarOpen(true)} user={user} />
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      {sidebarOpen && (
        <div className="fixed inset-0 bg-transparent z-30" onClick={() => setSidebarOpen(false)} />
      )}
      <div className="pt-36 px-4 min-h-screen bg-white">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Profile</h1>
          
          {/* User Information */}
          <div className="mb-12 border-b pb-8">
            <h2 className="text-xl font-semibold text-gray-700 mb-6">Personal Information</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <span className="w-32 text-gray-600">Email:</span>
                <span className="text-gray-800">{user.email}</span>
              </div>
              <div className="flex items-center">
                <span className="w-32 text-gray-600">Role:</span>
                <span className="text-gray-800">{user.role}</span>
              </div>
            </div>
          </div>
          
          {/* Account Settings */}
          <div className="mb-12">
            <h2 className="text-xl font-semibold text-gray-700 mb-6">Account Settings</h2>
            <div className="space-y-4">
              <Link to="/forgot-password">
                <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                  Change Password
                </button>
              </Link>
              <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors ml-4">
                Update Profile
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
