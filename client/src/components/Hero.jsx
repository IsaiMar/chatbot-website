import React from "react";

function Hero() {
  return (
    <section className="text-center py-12 bg-gray-100">
      <h2 className="text-4xl font-bold mb-4">Protect Your Home from Pests</h2>
      <p className="text-lg text-gray-700 mb-6">
        Fast, reliable pest control backed by AI support
      </p>
      <a href="/book">
        <button className="bg-green-700 text-white px-6 py-2 rounded hover:bg-green-800">
          Book Now
        </button>
      </a>
    </section>
  );
}

export default Hero;
