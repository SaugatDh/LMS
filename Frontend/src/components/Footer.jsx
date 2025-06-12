import React from "react";

const Footer = () => (
  <footer className="w-full bg-primary text-bg py-10 px-4 border-t-4 border-gray-800 dark:border-gray-700">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-8">
      <div className="mb-6 md:mb-0">
        <h2 className="text-2xl font-bold mb-2 text-bg">LMS</h2>
        <p className="text-bg/80 max-w-xs text-sm">
          A modern, minimal learning management system for seamless online education and course management.
        </p>
      </div>
      <div className="mb-6 md:mb-0">
        <h3 className="font-semibold mb-2 text-bg">Quick Links</h3>
        <ul className="space-y-1 text-bg/80 text-sm">
          <li>
            <a href="/" className="hover:underline">
              Home
            </a>
          </li>
          <li>
            <a href="/dashboard" className="hover:underline">
              Dashboard
            </a>
          </li>
          <li>
            <a href="/courses" className="hover:underline">
              Courses
            </a>
          </li>
          <li>
            <a href="/profile" className="hover:underline">
              Profile
            </a>
          </li>
        </ul>
      </div>
      <div>
        <h3 className="font-semibold mb-2 text-bg">Contact</h3>
        <p className="text-bg/80 text-sm">
          Email:{" "}
          <a href="mailto:support@lms.com" className="underline">
            support@lms.com
          </a>
        </p>
        <p className="text-bg/80 text-sm mt-1">
          © {new Date().getFullYear()} LMS. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
