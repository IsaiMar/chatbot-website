import React from "react";
import AppointmentForm from "../components/AppointmentForm";
import { Link } from "react-router-dom";

function BookPage() {
  const token = localStorage.getItem("token");

  return (
    <div className="min-h-screen flex flex-col">

      <main className="flex-grow px-4 py-16 bg-gray-50">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-green-800 mb-4">
            {token ? "Book a Pest Control Appointment" : "Get a Free Quote"}
          </h1>
          <p className="text-gray-700 mb-8">
            {token
          ? "Fill out the form below to schedule your appointment. We’ll get back to you shortly!"
          : "Fill out the form below and we’ll contact you shortly with a free quote and more details."}
          </p>
        </div>

        <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md">
          <AppointmentForm />
        </div>

        <div className="text-center mt-6">
          <Link
            to="/"
            className="text-green-700 hover:underline inline-block mt-4"
          >
            ← Back to Home
          </Link>
        </div>
      </main>

    </div>
  );
}

export default BookPage;
