import React, { useState } from "react";
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
      <div className="pt-28 px-4 min-h-screen bg-gray-100">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-8 mb-10">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Profile</h1>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;