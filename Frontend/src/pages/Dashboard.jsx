import React, { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

const Dashboard= ({ user }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div>
      <Header onMenuClick={() => setSidebarOpen(true)} user={user} />
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-transparent z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <div className="pt-28 pl-0 md:pl-0 min-h-screen bg-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Student Dashboard
          </h1>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;