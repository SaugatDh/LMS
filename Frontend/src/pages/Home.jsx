import React, { useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";

// Dashboard content as a component
const courses = [
  {
    id: 1,
    title: "React for Beginners",
    progress: 60,
    nextLesson: "Handling Events",
  },
  {
    id: 2,
    title: "Intro to Python",
    progress: 80,
    nextLesson: "Functions and Loops",
  },
];

// Example available courses (replace or expand as needed)
const availableCourses = [
  {
    id: 101,
    title: "Advanced JavaScript",
    description: "Deep dive into JS concepts and best practices.",
  },
  {
    id: 102,
    title: "Data Structures in Python",
    description: "Learn about lists, trees, graphs, and more.",
  },
  {
    id: 103,
    title: "UI/UX Design Basics",
    description: "Principles of user interface and experience design.",
  },
  {
    id: 104,
    title: "Machine Learning 101",
    description: "Introduction to ML concepts and algorithms.",
  },
];

function StudentDashboard({ studentName }) {
  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        Welcome back, {studentName} 👋
      </h1>
      <h2 className="text-xl font-semibold mb-4">Your Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {courses.map((course) => (
          <div key={course.id} className="bg-white rounded-2xl shadow p-4">
            <h3 className="text-lg font-semibold">{course.title}</h3>
            <p className="text-sm text-gray-600">
              Next: {course.nextLesson}
            </p>
            <div className="mt-3">
              <div className="w-full bg-gray-200 h-2 rounded-full">
                <div
                  className="bg-blue-500 h-2 rounded-full"
                  style={{ width: `${course.progress}%` }}
                />
              </div>
              <p className="text-sm text-right mt-1 text-gray-500">
                {course.progress}% completed
              </p>
            </div>
            <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition">
              Continue
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

const AvailableCoursesSection = () => (
  <div className="max-w-7xl mx-auto mt-16">
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-2xl font-bold">Explore More Courses</h2>
      <Link
        to="/courses"
        className="text-blue-600 hover:underline font-medium text-base"
      >
        Browse All &rarr;
      </Link>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {availableCourses.slice(0, 3).map((course) => (
        <div key={course.id} className="bg-white rounded-2xl shadow p-6 flex flex-col">
          <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
          <p className="text-gray-600 flex-1">{course.description}</p>
          <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700 transition">
            Enroll
          </button>
        </div>
      ))}
    </div>
  </div>
);

const Home = ({ user }) => {
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
      <div className="pt-20 pl-0 md:pl-0 min-h-screen bg-gray-100">
        <StudentDashboard studentName={user?.email || "Student"} />
        <AvailableCoursesSection />
      </div>
      <Footer />
    </div>
  );
};

export default Home;