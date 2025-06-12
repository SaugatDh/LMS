import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CourseCard from "./CourseCard";

const AvailableCoursesSection = ({ availableCourses }) => {
  const [enrolling, setEnrolling] = useState(null);
  const navigate = useNavigate();

  const handleEnroll = async (courseId) => {
    setEnrolling(courseId);

    // Simulate enrollment process
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Navigate to course detail page
    navigate(`/course/${courseId}`);
  };

  return (
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
          <CourseCard
            key={course.id}
            title={course.title}
            description={course.description}
            img={
              course.img ||
              `https://placehold.co/400x200?text=learning,${encodeURIComponent(
                course.title
              )}`
            }
            button={
              enrolling === course.id ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Enrolling...
                </span>
              ) : (
                "Enroll"
              )
            }
            onClick={() => handleEnroll(course.id)}
            cardClassName="border-green-200 hover:border-green-400 hover:shadow-green-200"
            buttonClassName="bg-green-600 hover:bg-green-700"
          />
        ))}
      </div>
    </div>
  );
};

export default AvailableCoursesSection;