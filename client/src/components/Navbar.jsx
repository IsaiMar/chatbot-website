import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ChatBot } from "./ChatBot";
import { Menu, X } from "lucide-react";

function Navbar() {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
    window.dispatchEvent(new Event("storage"));
    setMenuOpen(false);
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="bg-green-700 text-white px-6 py-4">
      <div className="flex justify-between items-center">
        <div className="font-bold text-xl">
          <Link to="/">Super General Pest Control</Link>
        </div>

        <div className="sm:hidden">
          <button onClick={toggleMenu}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <div className="hidden sm:flex space-x-6 items-center">
          <ChatBot />
          <Link to="/" className="hover:text-green-300">Home</Link>
          <Link to="/services" className="hover:text-green-300">Services</Link>
          <Link to="/book" className="hover:text-green-300">Book Appointment</Link>
          {isLoggedIn && (
            <Link to="/account" className="hover:text-green-300">My Account</Link>
          )}
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
            >
              Log Out
            </button>
          ) : (
            <Link to="/login" className="hover:text-green-300">Login</Link>
          )}
        </div>
      </div>

      {menuOpen && (
        <div className="sm:hidden mt-4 space-y-2">
          <ChatBot />
          <Link to="/" className="block hover:text-green-300" onClick={toggleMenu}>Home</Link>
          <Link to="/services" className="block hover:text-green-300" onClick={toggleMenu}>Services</Link>
          <Link to="/book" className="block hover:text-green-300" onClick={toggleMenu}>Book Appointment</Link>
          {isLoggedIn && (
            <Link to="/account" className="block hover:text-green-300" onClick={toggleMenu}>My Account</Link>
          )}
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="w-full text-left bg-red-500 px-3 py-1 rounded hover:bg-red-600"
            >
              Log Out
            </button>
          ) : (
            <Link to="/login" className="block hover:text-green-300" onClick={toggleMenu}>Login</Link>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
