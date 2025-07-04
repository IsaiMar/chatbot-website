import React from "react";
import Hero from "../components/Hero";
import ServiceCards from "../components/ServiceCards";
import AppointmentList from "../components/Appointments/AppointmentList";

function HomePage() {
  
  return (
    <div className="font-sans text-gray-800">
      <Hero />
      <section id="book" className="bg-gray-50 py-16 px-4">
        <AppointmentList />
      </section>
      <ServiceCards />
    </div>
  );
}

export default HomePage;
