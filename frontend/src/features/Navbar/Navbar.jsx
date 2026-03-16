import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../store/features/auth/auth.thunk";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const Navbar = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(logoutUser());
    toast.success("User logged out successfully!");
  };

  const handleNavigateToHome = () => navigate("/");

  const handleLogin = () => navigate("/login");

  return (
    <div className="w-full bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 border-b border-slate-800">
      <div className="flex items-center justify-between px-4 sm:px-6 md:px-10 py-3">
        {/* Logo */}
        <div className="flex-1">
          <button
            onClick={handleNavigateToHome}
            className="text-white text-lg sm:text-xl font-semibold"
          >
            Interview-Ai
          </button>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-2 sm:gap-4">
          <button
            onClick={user ? handleLogout : handleLogin}
            className="bg-pink-600 hover:bg-pink-700 text-white font-semibold 
            px-3 py-2 sm:px-4 sm:py-2 md:px-6 md:py-2.5
            rounded-lg md:rounded-xl
            text-xs sm:text-sm
            transition-colors
            shadow-md hover:shadow-pink-500/40"
          >
            {user ? "Logout" : "Login"}
          </button>

          <button
            onClick={handleNavigateToHome}
            className="bg-pink-600 hover:bg-pink-700 text-white font-semibold 
            px-3 py-2 sm:px-4 sm:py-2 md:px-6 md:py-2.5
            rounded-lg md:rounded-xl
            text-xs sm:text-sm
            transition-colors
            shadow-md hover:shadow-pink-500/40"
          >
            Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
