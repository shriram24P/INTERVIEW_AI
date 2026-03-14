import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { loginUser } from "../../../store/features/auth/auth.thunk";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.auth.loading);

  const [formDetails, setFormDetails] = React.useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormDetails({
      ...formDetails,
      [name]: value,
    });
  };

  const handleLogin = async () => {
    if (formDetails.email === "" || formDetails.password === "")
      return toast.error("Please fill in all fields!");
    
    await dispatch(loginUser(formDetails));

    setFormDetails({
      email: "",
      password: "",
    });
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-400">Sign in to your account to continue</p>
        </div>

        {/* Form Container */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
          {/* Email Field */}
          <div className="mb-5">
            <label className="block text-gray-200 font-medium mb-2">
              Email
            </label>
            <input
              name="email"
              type="email"
              className="w-full bg-slate-900/80 border border-slate-600 rounded px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-colors"
              placeholder="Enter your email"
              value={formDetails.email}
              onChange={handleInputChange}
            />
          </div>

          {/* Password Field */}
          <div className="mb-6">
            <label className="block text-gray-200 font-medium mb-2">
              Password
            </label>
            <input
              name="password"
              type="password"
              className="w-full bg-slate-900/80 border border-slate-600 rounded px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-colors"
              placeholder="Enter your password"
              value={formDetails.password}
              onChange={handleInputChange}
            />
          </div>

          {/* Login Button */}
          <button
            onClick={handleLogin}
            disabled={isLoading}
            className="w-full bg-pink-600 hover:bg-pink-700 disabled:bg-pink-600/50 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg hover:shadow-pink-500/50"
          >
            {isLoading ? (
              <>
                <span className="inline-block animate-spin">⏳</span>
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-slate-700"></div>
            <span className="text-gray-400 text-sm">OR</span>
            <div className="flex-1 h-px bg-slate-700"></div>
          </div>

          {/* Register Link */}
          <p className="text-center text-gray-400 text-sm">
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              className="text-pink-500 hover:text-pink-400 cursor-pointer font-semibold transition-colors"
            >
              Register here
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
