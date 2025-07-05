import React, { useEffect, useState } from "react";

import { toast } from "react-toastify";

function AppointmentList() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpened, setModalOpened] = useState(false);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);
  

  useEffect(() => {
    fetch("http://localhost:8081/api/appointments")
      .then((res) => res.json())
      .then((data) => {
        setAppointments(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching appointments:", err);
        setLoading(false);
      });
  }, []);

  const openCancelModal = (id) => {
    console.log("Clicked cancel for ID:", id);
    setSelectedAppointmentId(id);
    setModalOpened(true);
  };

  const handleCancel = async () => {
    try {
      const res = await fetch(
        `http://localhost:8081/api/appointments/${selectedAppointmentId}`,
        { method: "DELETE" }
      );
      if (res.ok) {
        setAppointments((prev) =>
          prev.filter((a) => a._id !== selectedAppointmentId)
        );
        setModalOpened(false);
        setSelectedAppointmentId(null);

        toast.success("The appointment has been successfully cancelled.");
      } else {
        toast.error("Failed to cancel appointment");
      }
    } catch (err) {
      console.error("Error cancelling appointment:", err);
      toast.error("Error cancelling appointment");
    }
  };

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
            <li key={appt._id} className="flex justify-between items-center py-4">
              <div>
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
              </div>
              <button
                onClick={() => openCancelModal(appt._id)}
                className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 text-white"
              >
                Cancel
              </button>
            </li>
          ))}
        </ul>
      )}
      {modalOpened && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow max-w-md w-full">
            <h3 className="text-lg font-bold mb-4">Cancel Appointment</h3>
            <p className="text-sm mb-4">
              Are you sure you want to cancel this appointment? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setModalOpened(false)}
                className="px-4 py-2 text-sm border rounded hover:bg-gray-100"
              >
                No, go back
              </button>
              <button
                onClick={handleCancel}
                className="px-4 py-2 text-sm bg-red-500 text-white rounded hover:bg-red-600"
              >
                Yes, cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AppointmentList;
