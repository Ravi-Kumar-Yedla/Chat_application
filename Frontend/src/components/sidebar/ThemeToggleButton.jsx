import React, { useState, useEffect } from 'react';
import { BsSun, BsMoon } from 'react-icons/bs';

const ThemeToggleButton = () => {
  const [isDark, setIsDark] = useState(false); // local state to track theme

  // Set theme on initial load
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setIsDark(savedTheme === "dark");
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = isDark ? "light" : "dark";
    setIsDark(!isDark);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <button onClick={toggleTheme} className="text-white" >
      {isDark ? <BsSun className="w-5 h-5" /> : <BsMoon className="w-5 h-5" />}
    </button>
  );
};

export default ThemeToggleButton;
