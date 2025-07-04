import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-800 text-white text-center py-6 mt-16">
      <p className="text-sm">&copy; {new Date().getFullYear()} PestBot. All rights reserved.</p>
    </footer>
  );
}

export default Footer;