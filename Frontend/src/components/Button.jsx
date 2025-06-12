const Button = ({ children, btnColor, btnFunction, className = "" }) => {
  // Use LMS palette by default
  const base =
    btnColor ||
    "bg-primary text-bg hover:bg-secondary transition-colors duration-200";
  return (
    <button
      className={`px-4 py-2 rounded font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${base} ${className}`}
      onClick={btnFunction}
    >
      {children}
    </button>
  );
};
export default Button;