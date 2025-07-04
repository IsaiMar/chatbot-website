import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ServiceCards from "../components/ServiceCards";
import AppointmentForm from "../components/Appointment/AppointmentForm";
import AppointmentList from "../components/Appointment/AppointmentList";
import Footer from "../components/Footer";

function HomePage() {
  return (
    <div className="font-sans text-gray-800">
      <Navbar />
      <Hero />
      <ServiceCards />
      <section id="book" className="bg-gray-50 py-16 px-4">
        <div className="max-w-3xl mx-auto mb-8">
          <h3 className="text-2xl font-bold mb-4 text-center">Book an Appointment</h3>
          <AppointmentForm />
        </div>
        <AppointmentList />
      </section>
      <Footer />
    </div>
  );
}

export default HomePage;
