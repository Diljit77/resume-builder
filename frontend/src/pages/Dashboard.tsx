import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div>
      <Navbar />
      <div className="p-6 text-center">
        <h1 className="text-3xl font-bold">Welcome, {user?.email}</h1>
        <p className="mt-4 text-lg">Go to <strong>My Resumes</strong> to manage your CVs.</p>
      </div>
    </div>
  );
};

export default Dashboard;

