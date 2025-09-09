import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <div className="navbar bg-primary text-primary-content">
      <div className="flex-1">
        <Link to="/dashboard" className="btn btn-ghost normal-case text-xl">
          Resume Builder
        </Link>
      </div>
      <div className="flex-none gap-2">
        {user && (
          <>
            <Link to="/resumes" className="btn btn-ghost">My Resumes</Link>
            <Link to="/resume/new" className="btn btn-ghost">New Resume</Link>
            <button onClick={handleLogout} className="btn btn-error btn-sm">Logout</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
