import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ChatBot } from "./ChatBot";

function Navbar() {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-green-700 text-white px-6 py-4 flex justify-between items-center">
      <div className="font-bold text-xl">
        <Link to="/">Super General Pest Control</Link>
      </div>

      <div className="space-x-7 flex items-center">
        <ChatBot />
        <Link to="/" className="hover:text-green-300">Home</Link>
        <Link to="/services" className="hover:text-green-300">Services</Link>
        <Link to="/book" className="hover:text-green-300">Book Appointment</Link>
        <Link to="/account" className="hover:text-green-300">My Account</Link>

        {isLoggedIn ? (
          <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded hover:bg-red-600">
            Log Out
          </button>
        ) : (
          <Link to="/login" className="hover:text-green-300">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
