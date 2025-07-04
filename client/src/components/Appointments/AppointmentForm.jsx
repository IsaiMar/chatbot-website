import React, { useState } from "react";

function AppointmentForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    pestType: "",
    date: "",
    notes: "",
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    try {
      const response = await fetch("http://localhost:8081/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to book appointment");
      }

      setSuccess(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        pestType: "",
        date: "",
        notes: "",
      });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Book an Appointment</h2>

      {success && <p className="text-green-600 mb-2">Appointment booked!</p>}
      {error && <p className="text-red-600 mb-2">{error}</p>}

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
        <input
          className="w-full p-2 border rounded"
          type="datetime-local"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
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
          Submit
        </button>
      </form>
    </div>
  );
}

export default AppointmentForm;
