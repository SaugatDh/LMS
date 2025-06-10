import React from 'react';
import { useParams } from 'react-router-dom';
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

const CourseDetail = ({ user }) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const { courseId } = useParams();
  
  // This would typically come from an API/database
  const getCourseDetails = (id) => {
    const courses = {
      '101': {
        title: "Advanced JavaScript",
        description: "Deep dive into JS concepts and best practices.",
        modules: [
          { title: "Module 1: ES6+ Features", duration: "2 hours" },
          { title: "Module 2: Async Programming", duration: "3 hours" },
          { title: "Module 3: Design Patterns", duration: "4 hours" }
        ]
      },
      // Add other courses as needed
    };
    return courses[id];
  };

  const course = getCourseDetails(courseId);

  return (
    <div>
      <Header onMenuClick={() => setSidebarOpen(true)} user={user} />
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="pt-20 pl-0 md:pl-0 min-h-screen bg-gray-100">
        <div className="max-w-4xl mx-auto py-10 px-4">
          <h1 className="text-3xl font-bold mb-6">{course?.title}</h1>
          <p className="text-gray-600 mb-8">{course?.description}</p>
          
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Course Content</h2>
            <div className="space-y-4">
              {course?.modules.map((module, index) => (
                <div key={index} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <span className="font-medium">{module.title}</span>
                  <span className="text-gray-500 text-sm">{module.duration}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CourseDetail;