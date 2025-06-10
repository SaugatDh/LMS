import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";

const allCourses = [
  { id: 101, title: "Advanced JavaScript", description: "Deep dive into JS concepts and best practices." },
  { id: 102, title: "Data Structures in Python", description: "Learn about lists, trees, graphs, and more." },
  { id: 103, title: "UI/UX Design Basics", description: "Principles of user interface and experience design." },
  { id: 104, title: "Machine Learning 101", description: "Introduction to ML concepts and algorithms." },
  // Add more courses as needed
];

const Courses = ({ user }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [enrolling, setEnrolling] = useState(null);
  const navigate = useNavigate();

  const handleEnroll = async (courseId) => {
    setEnrolling(courseId);
    
    // Simulate enrollment process
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Navigate to course detail page
    navigate(`/course/${courseId}`);
  };

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
        <div className="max-w-7xl mx-auto py-10">
          <h1 className="text-3xl font-bold mb-8 mt-7">All Courses</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {allCourses.map((course) => (
              <div key={course.id} className="bg-white rounded-2xl shadow p-6 flex flex-col">
                <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
                <p className="text-gray-600 flex-1">{course.description}</p>
                <button 
                  className={`mt-4 px-4 py-2 rounded-xl transition-all duration-300 
                    ${enrolling === course.id 
                      ? 'bg-green-500 text-white'
                      : 'bg-green-600 text-white hover:bg-green-700'
                    }`}
                  onClick={() => handleEnroll(course.id)}
                  disabled={enrolling === course.id}
                >
                  {enrolling === course.id ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Enrolling...
                    </span>
                  ) : 'Enroll'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Courses;