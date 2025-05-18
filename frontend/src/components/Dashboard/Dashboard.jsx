import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";
import { FaUserGraduate, FaBriefcase, FaPalette } from "react-icons/fa";
import AppHeader from "../AppHeader";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    }
  }, []);

  const toggleDarkMode = () => {
    const html = document.documentElement;
    if (html.classList.contains("dark")) {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    } else {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleCategorySelect = (category) => {
    navigate(`/resume-form/${category}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white dark:from-gray-950 dark:to-black text-gray-900 dark:text-white transition-colors duration-300 px-4 py-10 md:px-14 font-sans">
      <AppHeader
        title="Resume Builder"
        showBackButton={false}
        isDark={isDark}
        setIsDark={setIsDark}
      />

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-2">
             Choose Your Resume Category
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Create resumes based on your background and experience
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {[
            {
              label: "Fresher",
              description: "Ideal for students and recent graduates",
              icon: <FaUserGraduate />,
              iconColor: "text-indigo-500",
              category: "fresher",
              glow: "hover:ring-indigo-400",
            },
            {
              label: "Experienced",
              description: "Tailored for professionals with work experience",
              icon: <FaBriefcase />,
              iconColor: "text-green-500",
              category: "experienced",
              glow: "hover:ring-green-400",
            },
            {
              label: "Non-IT",
              description: "Perfect for creative or non-tech fields",
              icon: <FaPalette />,
              iconColor: "text-purple-500",
              category: "nonit",
              glow: "hover:ring-purple-400",
            },
          ].map(({ label, description, icon, iconColor, category, glow }) => (
            <div
              key={label}
              onClick={() => handleCategorySelect(category)}
              className={`cursor-pointer bg-white/30 dark:bg-white/10 border border-white/20 dark:border-white/10 backdrop-blur-2xl rounded-3xl p-8 shadow-xl transform transition-all hover:scale-105 hover:shadow-2xl hover:backdrop-blur-3xl ${glow} hover:ring-4 duration-300`}
            >
              <div className="flex flex-col items-center text-center">
                <div className={`w-20 h-20 ${iconColor} bg-opacity-10 rounded-full flex items-center justify-center mb-5 text-3xl`}>
                  {icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                  {label}
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-400">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
