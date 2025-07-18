import React, { useState, useEffect } from "react";
import axios from "axios";

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
    timeframe: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Auto-fill user info if logged in
  useEffect(() => {
    if (isLoggedIn) {
      axios
        .get("http://localhost:8081/api/account", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          const { name, email, phone } = res.data;
          setFormData((prev) => ({
            ...prev,
            name: name || "",
            email: email || "",
            phone: phone || "",
          }));
        })
        .catch((err) => {
          console.error("Failed to auto-fill user info", err);
        });
    }
  }, [isLoggedIn, token]);

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
        : "http://localhost:8081/api/quotes";

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
        timeframe: "",
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
          // readOnly={isLoggedIn}
        />
        <input
          className="w-full p-2 border rounded"
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          // readOnly={isLoggedIn}
        />
        <input
          className="w-full p-2 border rounded"
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          // readOnly={isLoggedIn}
        />
        <select
          className="w-full p-2 border rounded"
          name="pestType"
          value={formData.pestType}
          onChange={handleChange}
          required
        >
          <option value="">Select a Pest</option>
          <option value="Ants">Ants</option>
          <option value="Spiders">Spiders</option>
          <option value="Rodents">Rodents</option>
          <option value="Cockroaches">Cockroaches</option>
          <option value="Wasps">Wasps</option>
          <option value="Termites">Termites</option>
        </select>

        {isLoggedIn && (
          <>
            <input
              className="w-full p-2 border rounded"
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
            <select
              className="w-full p-2 border rounded"
              name="timeframe"
              value={formData.timeframe}
              onChange={handleChange}
              required
            >
              <option value="">Preferred Timeframe</option>
              <option value="morning">Morning (8am – 12pm)</option>
              <option value="afternoon">Afternoon (12pm – 5pm)</option>
            </select>
          </>
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
