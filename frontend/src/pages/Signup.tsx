import { useState } from "react";
import { signup } from "../api/auth";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        setIsLoading(true); 
      const data = await signup(fullName, email, password);
      localStorage.setItem("token", data.token);
      setUser(data.user);
      toast.success("Signup successful 🎉");
      navigate("/dashboard");
        setIsLoading(false);
    } catch (err: any) {
      toast.error(err?.response?.data.msg || "Signup failed!");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="w-full max-w-md bg-gray-900 p-8 rounded-2xl shadow-lg border border-gray-700">
        <h2 className="text-3xl font-bold text-center text-white mb-2">
          Create Account
        </h2>
        <p className="text-center text-gray-400 mb-6">
          Join us to build your resume!
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-300 mb-1">Full Name</label>
            <input
              type="text"
              placeholder="Enter full name"
              className="w-full input input-bordered bg-gray-800 text-white"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

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

          <button type="submit" disabled={isLoading} className="btn btn-primary w-full mt-2">
            Signup
          </button>
        </form>

        <p className="text-center mt-6 text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
