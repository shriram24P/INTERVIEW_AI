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
  return (
    <div className="navbar bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 px-10">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">Interview-Ai</a>
      </div>
      <div className="flex justify-between w-1/6">
        <button
          onClick={user ? () => handleLogout() : navigate("/login")}
          className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-2.5 px-6 rounded-xl transition-colors flex items-center gap-2 shadow-lg hover:shadow-pink-500/50 text-sm whitespace-nowrap"
        >
          {user ? <span>Logout</span> : <span>Login</span>}
        </button>
        <button
          onClick={() => handleNavigateToHome()}
          className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-2.5 px-6 rounded-xl transition-colors flex items-center gap-2 shadow-lg hover:shadow-pink-500/50 text-sm whitespace-nowrap"
        >
          <span>Home</span>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
