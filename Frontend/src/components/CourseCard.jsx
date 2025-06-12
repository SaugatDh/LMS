import React from "react";

const CourseCard = ({
  title,
  description,
  nextLesson,
  progress,
  img,
  button,
  onClick,
  children,
  cardClassName = '',
  buttonClassName = '',
}) => (
  <div className={`bg-white rounded-xl shadow-lg p-6 flex flex-col transition-transform duration-200 hover:scale-105 border ${cardClassName}`}>
    {img && (
      <img
        src={img}
        alt={title}
        className="w-full h-32 object-cover rounded-lg mb-4"
      />
    )}
    <h3 className="text-lg font-bold mb-1 text-gray-800 text-center">{title}</h3>
    {description && (
      <p className="text-sm text-gray-500 text-center mb-3">{description}</p>
    )}
    {nextLesson && (
      <p className="text-sm text-gray-500 text-center mb-3">Next: {nextLesson}</p>
    )}
    {typeof progress === "number" && (
      <div className="w-full mt-2">
        <div className="w-full bg-gray-200 h-2 rounded-full">
          <div
            className="bg-blue-500 h-2 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-xs text-right mt-1 text-gray-400">
          {progress}% completed
        </p>
      </div>
    )}
    {children}
    {button && (
      <button
        className={`mt-6 text-white px-4 py-2 rounded-lg transition w-full font-semibold ${buttonClassName}`}
        onClick={onClick}
      >
        {button}
      </button>
    )}
  </div>
);

export default CourseCard;
