import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";

const allCourses = [
	{
		id: 101,
		title: "Advanced JavaScript",
		description: "Deep dive into JS concepts and best practices.",
		category: "Web Development",
		img: "https://source.unsplash.com/400x200/?javascript,web",
	},
	{
		id: 102,
		title: "Data Structures in Python",
		description: "Learn about lists, trees, graphs, and more.",
		category: "Machine Learning",
		img: "https://source.unsplash.com/400x200/?python,data-structures",
	},
	{
		id: 103,
		title: "UI/UX Design Basics",
		description: "Principles of user interface and experience design.",
		category: "Design",
		img: "https://source.unsplash.com/400x200/?ui,ux,design",
	},
	{
		id: 104,
		title: "Machine Learning 101",
		description: "Introduction to ML concepts and algorithms.",
		category: "Machine Learning",
		img: "https://source.unsplash.com/400x200/?machine-learning,ai",
	},
	{
		id: 105,
		title: "React for Beginners",
		description: "Start building web apps with React.",
		category: "Web Development",
		img: "https://source.unsplash.com/400x200/?react,web",
	},
	{
		id: 106,
		title: "Node.js & Express",
		description: "Backend web development with Node.js.",
		category: "Web Development",
		img: "https://source.unsplash.com/400x200/?nodejs,express,backend",
	},
	{
		id: 107,
		title: "Deep Learning Essentials",
		description: "Neural networks and deep learning basics.",
		category: "Machine Learning",
		img: "https://source.unsplash.com/400x200/?deep-learning,neural-network",
	},
	{
		id: 108,
		title: "HTML & CSS Crash Course",
		description: "Fundamentals of web page structure and style.",
		category: "Web Development",
		img: "https://source.unsplash.com/400x200/?html,css,web",
	},
	{
		id: 109,
		title: "Django for Web Apps",
		description: "Build robust web apps with Django.",
		category: "Web Development",
		img: "https://source.unsplash.com/400x200/?django,python,web",
	},
	{
		id: 110,
		title: "Natural Language Processing",
		description: "Text analysis and NLP basics.",
		category: "Machine Learning",
		img: "https://source.unsplash.com/400x200/?nlp,text,ai",
	},
	{
		id: 111,
		title: "Figma for Designers",
		description: "UI prototyping with Figma.",
		category: "Design",
		img: "https://source.unsplash.com/400x200/?figma,ui,design",
	},
	{
		id: 112,
		title: "Web Animation Techniques",
		description: "CSS and JS for interactive web animations.",
		category: "Web Development",
		img: "https://source.unsplash.com/400x200/?web,animation,css",
	},
];

const categories = ["All", "Web Development", "Machine Learning", "Design"];

const COURSES_PER_PAGE = 6;

const Courses = ({ user }) => {
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const [enrolling, setEnrolling] = useState(null);
	const [selectedCategory, setSelectedCategory] = useState("All");
	const [currentPage, setCurrentPage] = useState(1);
	const navigate = useNavigate();

	const filteredCourses = allCourses.filter(
		(course) => selectedCategory === "All" || course.category === selectedCategory
	);
	const totalPages = Math.ceil(filteredCourses.length / COURSES_PER_PAGE);
	const paginatedCourses = filteredCourses.slice(
		(currentPage - 1) * COURSES_PER_PAGE,
		currentPage * COURSES_PER_PAGE
	);

	const handleEnroll = async (courseId) => {
		setEnrolling(courseId);

		// Simulate enrollment process
		await new Promise((resolve) => setTimeout(resolve, 1000));

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
					<div className="flex gap-3 mb-8 flex-wrap">
						{categories.map((cat) => (
							<button
								key={cat}
								className={`px-4 py-2 rounded-full border text-sm font-medium transition-all duration-200 ${
									selectedCategory === cat
										? "bg-blue-600 text-white border-blue-600"
										: "bg-white text-gray-700 border-gray-300 hover:bg-blue-50"
								}`}
								onClick={() => {
									setSelectedCategory(cat);
									setCurrentPage(1); // Reset to first page on category change
								}}
							>
								{cat}
							</button>
						))}
					</div>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						{paginatedCourses.map((course) => (
							<div
								key={course.id}
								className="bg-white rounded-2xl shadow p-6 flex flex-col"
							>
								<img
									src={course.img}
									alt={course.title}
									className="w-full h-32 object-cover rounded-lg mb-4"
								/>
								<h3 className="text-lg font-semibold mb-2">
									{course.title}
								</h3>
								<p className="text-gray-600 flex-1">
									{course.description}
								</p>
								<button
									className={`mt-4 px-4 py-2 rounded-xl transition-all duration-300 ${
										enrolling === course.id
											? "bg-green-500 text-white"
											: "bg-green-600 text-white hover:bg-green-700"
									}`}
									onClick={() => handleEnroll(course.id)}
									disabled={enrolling === course.id}
								>
									{enrolling === course.id ? (
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
									)}
								</button>
							</div>
						))}
					</div>
					{/* Pagination Controls */}
					{totalPages > 1 && (
						<div className="flex justify-center mt-8 gap-2">
							<button
								className="px-3 py-1 rounded border bg-white text-gray-700 disabled:opacity-50"
								onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
								disabled={currentPage === 1}
							>
								Prev
							</button>
							{Array.from({ length: totalPages }, (_, i) => (
								<button
									key={i + 1}
									className={`px-3 py-1 rounded border ${
										currentPage === i + 1
											? "bg-blue-600 text-white border-blue-600"
											: "bg-white text-gray-700 border-gray-300"
									}`}
									onClick={() => setCurrentPage(i + 1)}
								>
									{i + 1}
								</button>
							))}
							<button
								className="px-3 py-1 rounded border bg-white text-gray-700 disabled:opacity-50"
								onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
								disabled={currentPage === totalPages}
							>
								Next
							</button>
						</div>
					)}
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default Courses;