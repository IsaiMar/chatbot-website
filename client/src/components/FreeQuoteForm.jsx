import React, { useState } from "react";

function FreeQuoteForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    pestType: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can add backend logic here later
    console.log("Quote request:", formData);
    setSubmitted(true);
  };

  return submitted ? (
    <p className="text-green-600 text-lg">Thank you! We'll be in touch shortly.</p>
  ) : (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded shadow">
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Full Name"
        required
        className="w-full border p-2 rounded"
      />
      <input
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        required
        className="w-full border p-2 rounded"
      />
      <input
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        placeholder="Phone"
        className="w-full border p-2 rounded"
      />
      <input
        name="pestType"
        value={formData.pestType}
        onChange={handleChange}
        placeholder="Type of Pest"
        className="w-full border p-2 rounded"
      />
      <textarea
        name="message"
        value={formData.message}
        onChange={handleChange}
        placeholder="Additional information"
        className="w-full border p-2 rounded"
      />
      <button
        type="submit"
        className="bg-green-600 text-white py-2 w-full rounded hover:bg-green-700"
      >
        Request Quote
      </button>
    </form>
  );
}

export default FreeQuoteForm;
