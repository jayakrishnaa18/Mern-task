import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";
import { FaUserGraduate, FaBriefcase, FaPalette, FaSun, FaMoon } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("fresher");
  const [bgClass, setBgClass] = useState("from-green-100 to-green-200");
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

  useEffect(() => {
    switch (selectedCategory) {
      case "experienced":
        setBgClass("from-gray-100 to-blue-200 dark:from-[#0f0f0f] dark:to-[#1a1a1a]");
        break;
      case "nonit":
        setBgClass("from-red-100 to-indigo-200 dark:from-[#0f0f0f] dark:to-[#1a1a1a]");
        break;
      default:
        setBgClass("from-cyan-100 to-red-200 dark:from-[#0f0f0f] dark:to-[#1a1a1a]");
    }
  }, [selectedCategory]);

  const allTemplates = {
    fresher: [
      { id: "fresher1", name: "Executive", image: "../../assets/fresher1.jpg" },
      { id: "fresher2", name: "Modern Pro", image: "../../assets/fresher2.jpg" },
      { id: "fresher3", name: "Minimalist", image: "../../assets/fresher3.jpg" },
      { id: "fresher4", name: "Creative", image: "../../assets/fresher4.jpg" },
      { id: "fresher5", name: "Corporate", image: "../../assets/fresher5.jpg" },
      { id: "fresher6", name: "Classic", image: "../../assets/fresher6.jpg" },
      { id: "fresher7", name: "Elite", image: "../../assets/fresher7.jpg" },
      { id: "fresher8", name: "Innovator", image: "../../assets/fresher8.jpg" },
      { id: "fresher9", name: "Visionary", image: "../../assets/fresher9.jpg" },
    ],
    experienced: [
      { id: "experienced1", name: "Senior Pro", image: "../../assets/experienced1.jpg" },
      { id: "experienced2", name: "Leadership", image: "../../assets/experienced2.jpg" },
      { id: "experienced3", name: "Director", image: "../../assets/experienced3.jpg" },
      { id: "experienced4", name: "Director", image: "../../assets/experienced4.jpg" },
      { id: "experienced5", name: "Extro", image: "../../assets/experienced5.jpg" },
    ],
    nonit: [
      { id: "nonit1", name: "Portfolio", image: "../../assets/nonit1.jpg" },
      { id: "nonit2", name: "Creative Pro", image: "../../assets/nonit2.jpg" },
      { id: "nonit3", name: "Artistic", image: "../../assets/nonit3.jpg" },
    ],
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleTemplateSelect = (templateType, templateId) => {
    navigate(`/resume-builder/${templateType}?template=${templateId}`);
  };

  useEffect(() => {
    const buttons = document.querySelectorAll(".ripple-button");
    buttons.forEach((btn) => {
      btn.addEventListener("click", function (e) {
        const ripple = document.createElement("span");
        ripple.className = "ripple";
        ripple.style.left = `${e.offsetX}px`;
        ripple.style.top = `${e.offsetY}px`;
        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
      });
    });
  }, []);

  return (
    <div className={`min-h-screen bg-gradient-to-br ${bgClass} transition-all duration-700 px-4 sm:px-10 py-8 font-sans dark:text-white`}>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
        <div>
          <h1 className="text-5xl font-extrabold tracking-tight bg-gradient-to-r from-green-500 to-blue-600 bg-clip-text text-transparent animate-pulse">
            SocialHire
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
            Build Your Dream Career with the Perfect Resume
          </p>
        </div>
        <div className="flex gap-4 mt-4 md:mt-0">
          <button
            onClick={toggleDarkMode}
            className="px-5 py-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white transition-all shadow-md hover:scale-105 flex items-center gap-2"
          >
            {isDark ? <FaSun /> : <FaMoon />}
          </button>
          <button
            onClick={handleLogout}
            className="group relative inline-flex items-center gap-2 px-6 py-2 rounded-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400"
          >
            <FiLogOut className="text-lg transition-transform duration-300 group-hover:-rotate-45" />
            <span className="tracking-wide">Log Out</span>
          </button>
        </div>
      </div>

      {/* Category Buttons */}
      <div className="flex justify-center mb-12 animate-fade-in-up">
        <div className="flex gap-4 flex-wrap justify-center px-6 py-4 rounded-2xl bg-white/10 dark:bg-white/5 shadow-xl backdrop-blur-md border border-white/20">
          {[
            {
              key: "fresher",
              label: "Fresher",
              color: "from-green-400 to-green-600",
              icon: <FaUserGraduate className="text-base sm:text-lg group-hover:animate-bounce-slow" />,
            },
            {
              key: "experienced",
              label: "Experienced",
              color: "from-blue-400 to-blue-600",
              icon: <FaBriefcase className="text-base sm:text-lg group-hover:animate-bounce-slow" />,
            },
            {
              key: "nonit",
              label: "Non-IT",
              color: "from-yellow-400 to-yellow-600",
              icon: <FaPalette className="text-base sm:text-lg group-hover:animate-bounce-slow" />,
            },
          ].map((cat) => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`ripple-button relative overflow-hidden flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold tracking-wider uppercase transition-all duration-300 ease-in-out shadow-sm group
                ${selectedCategory === cat.key
                  ? `bg-gradient-to-r ${cat.color} text-white shadow-lg scale-105`
                  : `bg-white text-gray-800 dark:bg-zinc-800 dark:text-white hover:shadow-xl hover:scale-105 hover:bg-gradient-to-r ${cat.color} hover:text-white`
                }
              `}
            >
              <span className="z-10 flex items-center gap-2">{cat.icon}{cat.label}</span>
              <div className="absolute top-0 left-0 w-full h-full opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none z-0">
                <div className="w-full h-full bg-white blur-xl rounded-full animate-pulse" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Resume Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
        {allTemplates[selectedCategory].map((template) => (
          <div
            key={template.id}
            onClick={() => handleTemplateSelect(selectedCategory, template.id)}
            className="cursor-pointer group transition-transform duration-300 transform hover:-translate-y-2"
          >
            <div className="relative rounded-xl bg-white border border-gray-200 shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]">
              <img
                src={template.image}
                alt={template.name}
                className="w-full h-[28rem] object-contain p-4 bg-white transition-all duration-300"
              />
              <div className="absolute bottom-0 left-0 w-full text-center p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-5 group-hover:translate-y-0">
                <h3 className="text-xl font-semibold text-white drop-shadow-md tracking-wide group-hover:text-yellow-300 transition-all duration-500 ease-in-out">
                  ✨ {template.name}
                </h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-20 text-center">
        <p className="text-gray-400 text-xs dark:text-gray-500">
          SocialHire © {new Date().getFullYear()} – All rights reserved
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
