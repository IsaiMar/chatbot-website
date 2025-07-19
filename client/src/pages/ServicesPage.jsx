import React, { useState } from "react";
import Hero from "../components/Hero";
// import serviceBanner from "../../public/images/pestcontrol_services.jpg";

const pestList = [
  {
    name: "Ants",
    image: "/images/ants.jpg",
    description: "We treat common household ants, carpenter ants, and fire ants with safe and effective methods.",
    notes: "",
  },
  {
    name: "Spiders",
    image: "/images/spiders.jpg",
    description: "Our spider control includes interior and exterior treatments for venomous and non-venomous species.",
    notes: "",
  },
  {
    name: "Rodents",
    image: "/images/rodents.jpg",
    description: "Get rid of mice and rats with our strategic baiting and exclusion services.",
    notes: "",
  },
  {
    name: "Cockroaches",
    image: "/images/roaches.jpg",
    description: "We eliminate roaches with targeted treatments and prevention strategies.",
    notes: "We do not treat for German Roaches.",
  },
  {
    name: "Wasps",
    image: "/images/wasps.jpeg",
    description: "Aggressive pests that build nests near your home.",
    notes: "We do not treat for bees. Please contact a beekeeper.",
  },
  {
    name: "Termites",
    image: "/images/termites.jpg",
    description: "Stop termite damage early with our comprehensive detection and treatment plans.",
    notes: "",
  },
];

// 💠 Pest Card Component
function PestCard({ pest, onClick }) {
  return (
    <div
      onClick={() => onClick(pest)}
      className="cursor-pointer bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition"
    >
      <img src={pest.image} alt={pest.name} className="h-40 w-full object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800 mb-1">{pest.name}</h3>
        <p className="text-gray-600 text-sm line-clamp-2">{pest.description}</p>
      </div>
    </div>
  );
}

function ServicesPage() {
  const [selectedPest, setSelectedPest] = useState(null);

  // Close when clicking outside modal
  const handleOverlayClick = (e) => {
    if (e.target.id === "overlay") {
      setSelectedPest(null);
    }
  };

  return (
    <div>
      <Hero
        title="Our Pest Control Services"
        subtitle="Safe, effective solutions for every pest problem"
        backgroundImage="/images/service-hero.webp"
      />
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
            {pestList.map((pest) => (
              <PestCard key={pest.name} pest={pest} onClick={setSelectedPest} />
            ))}
          </div>
        </section>

        {/* Modal */}
        {selectedPest && (
          <div
            id="overlay"
            onClick={handleOverlayClick}
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          >
            <div className="bg-white rounded-lg p-6 max-w-md w-full relative shadow-lg">
              <button
                className="absolute top-2 right-3 text-gray-500 hover:text-gray-800 text-xl"
                onClick={() => setSelectedPest(null)}
              >
                &times;
              </button>
              <img
                src={selectedPest.image}
                alt={selectedPest.name}
                className="w-full h-48 object-cover rounded mb-4"
              />
              <h3 className="text-2xl font-bold mb-2">{selectedPest.name}</h3>
              <p className="text-gray-700 mb-2">{selectedPest.description}</p>
              {selectedPest.notes && (
                <p className="text-red-600 font-semibold">{selectedPest.notes}</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ServicesPage;
