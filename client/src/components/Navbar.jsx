import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ChatBot } from "./ChatBot";
import { Menu, X } from "lucide-react";

function Navbar() {
  const { isLoggedIn, logout } = useAuth();
  // const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    localStorage.removeItem("token");
    window.location.href = "/";  
    // navigate("/");
    window.dispatchEvent(new Event("storage"));
    // setMenuOpen(false);
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <>
      <nav className="bg-secondary-700 text-white px-6 py-4 shadow-md">
        <div className="flex justify-between items-center">
          <div className="font-bold text-xl text-primary-100">
            <Link to="/">Super General Pest Control</Link>
          </div>

          <div className="sm:hidden">
            <button onClick={toggleMenu}>
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          <div className="hidden sm:flex space-x-6 items-center">
            {/* {/* <div className="hidden sm:block"> */}
              <ChatBot />
            {/* </div> */}
            <Link to="/" className="hover:text-secondary-400 transition">Home</Link>
            <Link to="/services" className="hover:text-secondary-400 transition">Services</Link>
            <Link to="/book" className="hover:text-secondary-400 transition">Book Appointment</Link>
            {isLoggedIn && (
              <Link to="/account" className="hover:text-secondary-400 transition">My Account</Link>
            )}
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition"
              >
                Log Out
              </button>
            ) : (
              <Link to="/login" className="hover:text-secondary-400 transition">Login</Link>
            )}
          </div>
        </div>

        {menuOpen && (
          <div className="sm:hidden mt-4 flex flex-col items-center justify-center gap-2">
            <Link to="/" className="hover:text-secondary-400" onClick={toggleMenu}>Home</Link>
            <Link to="/services" className="hover:text-secondary-400" onClick={toggleMenu}>Services</Link>
            <Link to="/book" className="hover:text-secondary-400" onClick={toggleMenu}>Book Appointment</Link>
            {isLoggedIn && (
              <Link to="/account" className="hover:text-secondary-400" onClick={toggleMenu}>My Account</Link>
            )}
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
              >
                Log Out
              </button>
            ) : (
              <Link to="/login" className="hover:text-secondary-400" onClick={toggleMenu}>Login</Link>
            )}
          </div>
        )}
      </nav>

    </>
  );
}

export default Navbar;
