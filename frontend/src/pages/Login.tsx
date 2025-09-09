import { useState } from "react";
import { login } from "../api/auth";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await login(email, password);
      localStorage.setItem("token", data.token);
      setUser(data.user);
      toast.success("Login successful 🎉");
      navigate("/dashboard");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Login failed!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="w-full max-w-md bg-gray-900 p-8 rounded-2xl shadow-lg border border-gray-700">
        <h2 className="text-3xl font-bold text-center text-white mb-2">
          Welcome Back
        </h2>
        <p className="text-center text-gray-400 mb-6">
          Login to manage your resumes
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-300 mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter email"
              className="w-full input input-bordered bg-gray-800 text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              className="w-full input input-bordered bg-gray-800 text-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary w-full mt-2">
            Login
          </button>
        </form>

        <p className="text-center mt-6 text-gray-400">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-400 hover:underline">
            Signup here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
