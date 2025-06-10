import { Link } from "react-router-dom";
import { FaChartLine } from "react-icons/fa";

const EnrolledCourses = ({ studentName, courses }) => (
  <div className="max-w-7xl mx-auto">
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold">
        Welcome back, {studentName} 
      </h1>
      <Link 
        to="/student/dashboard"
        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
      >
        <FaChartLine className="text-base" />
        <span>Student Dashboard</span>
        <span aria-hidden="true">→</span>
      </Link>
    </div>
    
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

export default EnrolledCourses;