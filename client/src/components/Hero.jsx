function Hero() {
  return (
    <section className="relative text-center min-h-[70vh] bg-gray-100 overflow-hidden flex flex-col justify-center items-center px-4">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: "url('/images/pestcontrol_house.jpg')" }}
        aria-hidden="true"
      ></div>

      {/* Content */}
      <div className="relative z-10">
        <h2 className="text-4xl font-bold mb-4">Protect Your Home from Pests</h2>
        <p className="text-lg text-gray-700 mb-6">
          Fast, reliable pest control backed by AI support
        </p>
        <a href="/book">
          <button className="bg-green-700 text-white px-6 py-2 rounded hover:bg-green-800">
            Book Now
          </button>
        </a>
      </div>
    </section>
  );
}

export default Hero;
