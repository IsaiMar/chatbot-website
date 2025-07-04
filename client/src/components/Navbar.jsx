import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

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
        <Link to="/">PestControlPro</Link>
      </div>

      <div className="space-x-4">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/services" className="hover:text-green-600">Services</Link>
        <Link to="/book" className="hover:underline">Book Appointment</Link>
        {isLoggedIn ? (
          <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded hover:bg-red-600">
            Log Out
          </button>
        ) : (
          <Link to="/login" className="hover:underline">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
