import React from "react";

const pestTypes = [
  {
    name: "Ants",
    description: "We treat common household ants, carpenter ants, and fire ants with safe and effective methods.",
  },
  {
    name: "Spiders",
    description: "Our spider control includes interior and exterior treatments for venomous and non-venomous species.",
  },
  {
    name: "Rodents",
    description: "Get rid of mice and rats with our strategic baiting and exclusion services.",
  },
  {
    name: "Cockroaches",
    description: "We eliminate roaches with targeted treatments and prevention strategies.",
  },
  {
    name: "Termites",
    description: "Stop termite damage early with our comprehensive detection and treatment plans.",
  },
];

function ServicesPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-green-700 mb-6">Our Services</h1>

      <section className="mb-12">
        <p className="text-lg text-gray-700">
          We offer professional pest control services for residential and commercial properties. Whether you're
          dealing with ants in the kitchen or termites in the walls, our licensed technicians use eco-friendly,
          effective methods to solve the problem.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-green-600 mb-4">Pests We Treat</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {pestTypes.map((pest) => (
            <div key={pest.name} className="bg-white shadow-md rounded-lg p-4">
              <h3 className="text-xl font-bold text-gray-800 mb-2">{pest.name}</h3>
              <p className="text-gray-600 text-sm">{pest.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default ServicesPage;
