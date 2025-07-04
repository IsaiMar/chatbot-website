import React from "react";

function ServiceCards() {
  const services = [
    { title: "Residential", desc: "Safe, effective treatments for your home." },
    { title: "Commercial", desc: "Protect your business from infestations." },
    { title: "Emergency", desc: "Same-day pest solutions when it can’t wait." },
  ];

  return (
    <section id="services" className="py-16 bg-white px-4">
      <h3 className="text-3xl font-bold text-center mb-12 text-gray-800">Our Services</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {services.map((s, i) => (
          <div
            key={i}
            className="bg-green-50 border border-green-200 rounded-lg p-6 shadow hover:shadow-lg transition duration-200"
          >
            <div className="text-green-700 text-2xl font-semibold mb-2">{s.title}</div>
            <p className="text-gray-600">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ServiceCards;
