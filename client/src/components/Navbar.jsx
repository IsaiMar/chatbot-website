import React from "react";

function Navbar() {
  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center sticky top-0 z-10">
      <h1 className="text-2xl font-bold text-green-700">PestBot</h1>
      <ul className="flex space-x-8 text-gray-700 font-medium">
        <li><a href="/" className="hover:text-green-700">Home</a></li>
        <li><a href="#services" className="hover:text-green-700">Services</a></li>
        <li><a href="#book" className="hover:text-green-700">Book</a></li>
        <li><a href="#contact" className="hover:text-green-700">Contact</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;
