import React, { useState } from "react";

function AppointmentForm() {
  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    pestType: "",
    notes: "",
    date: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const endpoint = isLoggedIn
        ? "http://localhost:8081/api/appointments"
        : "http://localhost:8081/api/quotes"; // quote route for guests

      const headers = {
        "Content-Type": "application/json",
        ...(isLoggedIn && { Authorization: `Bearer ${token}` }),
      };

      const res = await fetch(endpoint, {
        method: "POST",
        headers,
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Request failed");
      }

      setMessage(
        isLoggedIn
          ? "✅ Appointment booked successfully!"
          : "✅ Your quote request has been submitted!"
      );

      setFormData({
        name: "",
        email: "",
        phone: "",
        pestType: "",
        notes: "",
        date: "",
      });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4 text-green-700">
        {isLoggedIn ? "Book an Appointment" : "Get a Free Quote"}
      </h2>

      {message && <p className="text-green-600 mb-2 font-medium">{message}</p>}
      {error && <p className="text-red-600 mb-2 font-medium">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full p-2 border rounded"
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          className="w-full p-2 border rounded"
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          className="w-full p-2 border rounded"
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
        />
        <input
          className="w-full p-2 border rounded"
          type="text"
          name="pestType"
          placeholder="Type of Pest"
          value={formData.pestType}
          onChange={handleChange}
          required
        />
        {isLoggedIn && (
          <input
            className="w-full p-2 border rounded"
            type="datetime-local"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        )}
        <textarea
          className="w-full p-2 border rounded"
          name="notes"
          placeholder="Additional notes"
          value={formData.notes}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          {isLoggedIn ? "Book Now" : "Request Quote"}
        </button>
      </form>
    </div>
  );
}

export default AppointmentForm;
