import { Link } from "react-router-dom";
import { FaChartLine } from "react-icons/fa";
import CourseCard from "./CourseCard";

const EnrolledCourses = ({ studentName, courses }) => (
  <div className="max-w-7xl mx-auto">
    <h2 className="text-xl font-semibold mb-4">Your Courses</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {courses.map((course) => (
        <CourseCard
          key={course.id}
          title={course.title}
          nextLesson={course.nextLesson}
          progress={course.progress}
          img={course.img || `https://source.unsplash.com/400x200/?education,course,${encodeURIComponent(course.title)}`}
          button="Continue"
          cardClassName="border-blue-200 hover:border-blue-400 hover:shadow-blue-200"
          buttonClassName="bg-blue-600 hover:bg-blue-700"
        />
      ))}
    </div>
  </div>
);

export default EnrolledCourses;