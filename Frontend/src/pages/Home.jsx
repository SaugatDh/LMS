import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import EnrolledCourses from "../components/EnrolledCourses";
import AvailableCoursesSection from "../components/AvailableCoursesSection";

const courses = [
	{ id: 1, title: "React for Beginners", progress: 60, nextLesson: "Handling Events" },
	{ id: 2, title: "Intro to Python", progress: 80, nextLesson: "Functions and Loops" },
];

const availableCourses = [
	{ id: 101, title: "Advanced JavaScript", description: "Deep dive into JS concepts and best practices." },
	{ id: 102, title: "Data Structures in Python", description: "Learn about lists, trees, graphs, and more." },
	{ id: 103, title: "UI/UX Design Basics", description: "Principles of user interface and experience design." },
	{ id: 104, title: "Machine Learning 101", description: "Introduction to ML concepts and algorithms." },
];

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
			{/* Increased top padding to account for double-height header */}
			<div className="pt-35 px-4 min-h-screen bg-gray-100"> 
				<div className="max-w-7xl mx-auto">
					<EnrolledCourses
						studentName={user?.email || "Student"}
						courses={courses}
					/>
					<div className="mt-8"> {/* Added margin-top for separation */}
						<AvailableCoursesSection availableCourses={availableCourses} />
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default Home;