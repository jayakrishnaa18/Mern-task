import { FaSun, FaMoon } from 'react-icons/fa';
import { FiLogOut, FiArrowLeft } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';

const AppHeader = ({ title, showBackButton = false, isDark, setIsDark }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
      <div className="flex items-center gap-4">
        {showBackButton && (
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors shadow-sm"
          >
            <FiArrowLeft className="text-lg" />
          </button>
        )}
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">{title}</h1>
      </div>
      
      <div className="flex gap-4 items-center">
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors shadow-sm"
        >
          {isDark ? <FaSun className="text-yellow-400" /> : <FaMoon />}
        </button>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors shadow-sm"
        >
          <FiLogOut className="inline mr-2" /> Logout
        </button>
      </div>
    </div>
  );
};

export default AppHeader;