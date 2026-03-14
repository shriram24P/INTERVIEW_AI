import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { registerUser } from "../../../store/features/auth/auth.thunk";
import toast from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();
  const [formDetails, setFormDetails] = React.useState({
    username: "",
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.auth.loading);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormDetails({
      ...formDetails,
      [name]: value,
    });
  };

  const handleRegister = async () => {
    if (
      formDetails.username === "" ||
      formDetails.email === "" ||
      formDetails.password === ""
    )
      return toast.error("Please fill in all fields!");
    await dispatch(registerUser(formDetails));
    toast.success("User registered successfully!");
    setFormDetails({
      username: "",
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
            Create Account
          </h1>
          <p className="text-gray-400">
            Join us to get started with your interview prep
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
          {/* Username Field */}
          <div className="mb-5">
            <label className="block text-gray-200 font-medium mb-2">
              Username
            </label>
            <input
              name="username"
              type="text"
              className="w-full bg-slate-900/80 border border-slate-600 rounded px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-colors"
              placeholder="Choose a username"
              value={formDetails.username}
              onChange={handleInputChange}
            />
          </div>

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
              placeholder="Create a strong password"
              value={formDetails.password}
              onChange={handleInputChange}
            />
          </div>

          {/* Register Button */}
          <button
            onClick={handleRegister}
            disabled={isLoading}
            className="w-full bg-pink-600 hover:bg-pink-700 disabled:bg-pink-600/50 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg hover:shadow-pink-500/50"
          >
            {isLoading ? (
              <>
                <span className="inline-block animate-spin">⏳</span>
                Creating account...
              </>
            ) : (
              "Register"
            )}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-slate-700"></div>
            <span className="text-gray-400 text-sm">OR</span>
            <div className="flex-1 h-px bg-slate-700"></div>
          </div>

          {/* Login Link */}
          <p className="text-center text-gray-400 text-sm">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-pink-500 hover:text-pink-400 cursor-pointer font-semibold transition-colors"
            >
              Login here
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
