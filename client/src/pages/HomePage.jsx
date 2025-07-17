import React from "react";
import Hero from "../components/Hero";
import ServiceCards from "../components/ServiceCards";
import AppointmentList from "../components/AppointmentList";
import AppointmentForm from "../components/AppointmentForm";
import Reviews from "../components/Reviews";

function HomePage() {
  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <div className="font-sans text-light-700 bg-light-50">
      <Hero />

      <section id="book" className="bg-light-200 py-16 px-4">
        <div className="max-w-3xl mx-auto px-4">
          {isLoggedIn ? (
            <>
              <h2 className="text-2xl font-bold mb-4 text-secondary-700">
                Your Appointments
              </h2>
              <AppointmentList />
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold mb-4 text-secondary-700">
                Get a Free Quote
              </h2>
              <p className="mb-6 text-light-600">
                Not ready to book yet? Submit your info and we'll contact you to schedule a free quote.
              </p>
              <AppointmentForm />
            </>
          )}
        </div>
      </section>

      <section className="bg-light-100">
        <ServiceCards />
      </section>

      {!isLoggedIn && (
        <section className="bg-tertiary-100 py-16 px-4">
          <div className="max-w-5xl mx-auto px-4">
            <Reviews />
          </div>
        </section>
      )}
    </div>
  );
}

export default HomePage;
