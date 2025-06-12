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
	{ id: 101, title: "Advanced JavaScript", description: "Deep dive into JS concepts and best practices.", category: "Programming", img: "https://placehold.co/400x200?text=javascript,code" },
	{ id: 102, title: "Data Structures in Python", description: "Learn about lists, trees, graphs, and more.", category: "Programming", img: "https://placehold.co/400x200?text=python,data-structures" },
	{ id: 103, title: "UI/UX Design Basics", description: "Principles of user interface and experience design.", category: "Design", img: "https://placehold.co/400x200?text=ui,ux,design" },
	{ id: 104, title: "Machine Learning 101", description: "Introduction to ML concepts and algorithms.", category: "AI & ML", img: "https://placehold.co/400x200?text=machine-learning,ai" },
	{ id: 105, title: "Web Development Bootcamp", description: "HTML, CSS, JS, and modern frameworks.", category: "Programming", img: "https://placehold.co/400x200?text=web-development,html,css" },
	{ id: 106, title: "Digital Marketing Essentials", description: "SEO, SEM, and social media marketing.", category: "Marketing", img: "https://placehold.co/400x200?text=marketing,digital" },
	{ id: 107, title: "Cloud Computing Basics", description: "AWS, Azure, and cloud fundamentals.", category: "Cloud", img: "https://placehold.co/400x200?text=cloud,aws,azure" },
	{ id: 108, title: "Cybersecurity Fundamentals", description: "Protect systems and data from threats.", category: "Security", img: "https://placehold.co/400x200?text=cybersecurity,security" },
	{ id: 109, title: "Project Management", description: "Agile, Scrum, and project planning.", category: "Business", img: "https://placehold.co/400x200?text=project-management,agile" },
	{ id: 110, title: "Photography Masterclass", description: "Camera basics, lighting, and editing.", category: "Creative", img: "https://placehold.co/400x200?text=photography,camera" },
	{ id: 111, title: "Financial Literacy", description: "Personal finance, investing, and budgeting.", category: "Finance", img: "https://placehold.co/400x200?text=finance,money" },
	{ id: 112, title: "Mobile App Development", description: "Build apps for Android and iOS.", category: "Programming", img: "https://placehold.co/400x200?text=mobile,app-development" },
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
			<div className="pt-32 px-4 min-h-screen bg-gray-50">
				<div className="max-w-7xl mx-auto">
					{/* Minimal Welcome Banner */}
					<div className="bg-white rounded-lg border p-6 mb-8">
						<h1 className="text-2xl font-semibold text-gray-800">Welcome back, {user?.email || "Student"}</h1>
						<p className="text-gray-500 mt-1 text-base">Explore your courses and find new ones to learn.</p>
					</div>

					<EnrolledCourses courses={courses} />

					<div className="mt-10 mb-10">
						<AvailableCoursesSection availableCourses={availableCourses} />
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default Home;