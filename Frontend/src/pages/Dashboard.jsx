import React, { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import EnrolledCourses from "../components/EnrolledCourses";

const Dashboard= ({ user }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const enrolledCourses = [
    { id: 1, title: "React for Beginners", progress: 100, nextLesson: "Course Complete", img: "https://source.unsplash.com/400x200/?react,web" },
    { id: 2, title: "Intro to Python", progress: 80, nextLesson: "Functions and Loops", img: "https://source.unsplash.com/400x200/?python,code" },
    { id: 3, title: "Machine Learning 101", progress: 60, nextLesson: "Supervised Learning", img: "https://source.unsplash.com/400x200/?machine-learning,ai" },
  ];

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
      <div className="pt-36 pl-0 md:pl-0 min-h-screen bg-gray-100 pb-16">
        <div className="max-w-7xl mx-auto px-4">
          {/* Dashboard Overview Title */}
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Overview</h1>
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center border-t-4 border-blue-500 hover:shadow-lg transition-shadow">
              <span className="text-4xl mb-2">📚</span>
              <h2 className="text-lg font-semibold mb-1">Total Courses</h2>
              <p className="text-2xl font-bold text-blue-600 mb-2">{enrolledCourses.length}</p>
              <span className="text-gray-500 text-sm">Active Courses</span>
            </div>
            <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center border-t-4 border-green-500 hover:shadow-lg transition-shadow">
              <span className="text-4xl mb-2">✅</span>
              <h2 className="text-lg font-semibold mb-1">Completed</h2>
              <p className="text-2xl font-bold text-green-600 mb-2">
                {enrolledCourses.filter(course => course.progress === 100).length}
              </p>
              <span className="text-gray-500 text-sm">Finished Courses</span>
            </div>
            <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center border-t-4 border-yellow-500 hover:shadow-lg transition-shadow">
              <span className="text-4xl mb-2">⏳</span>
              <h2 className="text-lg font-semibold mb-1">In Progress</h2>
              <p className="text-2xl font-bold text-yellow-600 mb-2">
                {enrolledCourses.filter(course => course.progress < 100).length}
              </p>
              <span className="text-gray-500 text-sm">Keep Learning!</span>
            </div>
          </div>
          {/* End Summary Cards */}

          <EnrolledCourses courses={enrolledCourses} />

          <div className="mt-10 bg-white rounded-xl shadow p-8">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Recent Activity</h2>
            <ul className="divide-y divide-gray-200">
              <li className="py-3 flex items-center justify-between">
                <span className="font-medium text-gray-700">Completed: React for Beginners</span>
                <span className="text-green-500 font-semibold">✔️</span>
              </li>
              <li className="py-3 flex items-center justify-between">
                <span className="font-medium text-gray-700">Started: Machine Learning 101</span>
                <span className="text-yellow-500 font-semibold">⏳</span>
              </li>
              <li className="py-3 flex items-center justify-between">
                <span className="font-medium text-gray-700">Enrolled: Data Structures in Python</span>
                <span className="text-blue-500 font-semibold">📚</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;