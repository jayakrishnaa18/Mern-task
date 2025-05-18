import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../components/Auth/Login';
import Register from '../components/Auth/Register';
import ForgotPassword from '../components/Auth/ForgotPassword';
import Dashboard from '../components/Dashboard/Dashboard';
import PrivateRoute from '../components/PrivateRoute';
import ResumeFormEditor from '../pages/ResumeFormEditor';
import ResumeTemplates from '../pages/ResumeTemplates';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />

      <Route
        path="/resume-form/:templateType"
        element={
          <PrivateRoute>
            <ResumeFormEditor />
          </PrivateRoute>
        }
      />

      <Route
        path="/resume-templates/:templateType"
        element={
          <PrivateRoute>
            <ResumeTemplates />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;