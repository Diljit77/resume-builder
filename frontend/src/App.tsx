import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ResumeForm from "./pages/ResumeForm";
import ResumeList from "./pages/ResumeList";
import { AuthProvider, useAuth } from "./context/AuthContext";
import type { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import ResumePreview from "./pages/ResumePreview";

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

const AuthRuute = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth()
  return !user ? children : <Navigate to="/dashboard" />;
 }

function App() {
  return (
    <>
       <Toaster position="top-right" />
 
    <AuthProvider>
      <Router>
        <Routes>
     
          <Route path="/login" element={<AuthRuute><Login /> </AuthRuute>} />
          <Route path="/signup" element={<AuthRuute>
<Signup />
          </AuthRuute>} />
          <Route
            path="/dashboard"
            element={<PrivateRoute><Dashboard /></PrivateRoute>}
          />
          <Route
  path="/resume/preview"
  element={<PrivateRoute><ResumePreview /></PrivateRoute>}
/>
          <Route
            path="/resume/new"
            element={<PrivateRoute><ResumeForm /></PrivateRoute>}
          />
          // In your App.tsx, add this route
<Route
  path="/resume/edit"
  element={<PrivateRoute><ResumeForm /></PrivateRoute>}
/>
          <Route
            path="/resumes"
            element={<PrivateRoute><ResumeList /></PrivateRoute>}
          />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </AuthProvider>
    </>
  );
}

export default App;
