// src/components/Reviews.jsx
import React from "react";

const reviews = [
  {
    name: "Jane S.",
    comment: "Excellent service! Very professional and thorough. Highly recommend!",
  },
  {
    name: "Carlos T.",
    comment: "They arrived on time and took care of our ant problem quickly.",
  },
  {
    name: "Emily R.",
    comment: "The technician was friendly and explained everything clearly.",
  },
];

function Reviews() {
  return (
    <section className="bg-white py-12 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl font-bold text-green-700 mb-6">What Our Clients Say</h2>
        <div className="space-y-6">
          {reviews.map((r, i) => (
            <div key={i} className="bg-gray-100 p-4 rounded shadow">
              <p className="text-gray-800 italic">“{r.comment}”</p>
              <p className="mt-2 font-semibold text-green-700">— {r.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Reviews;
