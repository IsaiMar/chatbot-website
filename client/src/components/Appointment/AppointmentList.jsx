import React, { useEffect, useState } from "react";

function AppointmentList() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

    useEffect(() => {
    fetch("http://localhost:8081/api/appointments")
        .then((res) => res.json())
        .then((data) => {
        console.log("Appointments received:", data);
        setAppointments(data);
        setLoading(false);
        })
        .catch((err) => {
        console.error("Error fetching appointments:", err);
        setLoading(false);
        });
    }, []);

  return (
    <div className="max-w-4xl mx-auto p-4 mt-8 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Scheduled Appointments</h2>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : appointments.length === 0 ? (
        <p className="text-gray-500">No appointments found.</p>
      ) : (
        <ul className="divide-y divide-gray-300">
          {appointments.map((appt) => (
            <li key={appt._id} className="py-4">
              <p className="font-semibold">{appt.name}</p>
              <p className="text-sm text-gray-500">{appt.email}</p>
              <p className="text-sm">Phone: {appt.phone}</p>
              <p className="text-sm">Pest: {appt.pestType}</p>
              <p className="text-sm">
                Date: {new Date(appt.date).toLocaleString()}
              </p>
              {appt.notes && (
                <p className="text-sm italic text-gray-600">Notes: {appt.notes}</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AppointmentList;
