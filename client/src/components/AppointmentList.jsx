import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

function AppointmentList() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpened, setModalOpened] = useState(false);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return;
    }

    fetch("http://localhost:8081/api/appointments", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // Sort appointments by date (newest first)
        const sorted = data.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        setAppointments(sorted);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching appointments:", err);
        setLoading(false);
      });
  }, []);

  const openCancelModal = (id) => {
    setSelectedAppointmentId(id);
    setModalOpened(true);
  };

  const handleCancel = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(
        `http://localhost:8081/api/appointments/${selectedAppointmentId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
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

  const mostRecent = appointments[0];
  const otherAppointments = appointments.slice(1);

  return (
    <div className="max-w-4xl mx-auto p-6 mt-8 bg-light-100 shadow rounded">
      {loading ? (
        <p className="text-light-500">Loading...</p>
      ) : appointments.length === 0 ? (
        <p className="text-light-500">No appointments found.</p>
      ) : (
        <>
          {/* Most Recent Appointment Highlight */}
          {mostRecent && (
            <div className="mb-8 p-4 border-l-4 border-secondary-700 bg-light-50 rounded shadow">
              <h3 className="text-lg font-bold text-secondary-800 mb-2">
                Most Recent Appointment
              </h3>
              <p className="font-semibold">{mostRecent.name}</p>
              <p className="text-sm text-light-600">{mostRecent.email}</p>
              <p className="text-sm">Phone: {mostRecent.phone}</p>
              <p className="text-sm">Pest: {mostRecent.pestType}</p>
              <p className="text-sm">
                Date: {new Date(mostRecent.date).toLocaleString()}
              </p>
              {mostRecent.notes && (
                <p className="text-sm italic text-light-600">
                  Notes: {mostRecent.notes}
                </p>
              )}
              {mostRecent.technicianNotes && (
                <p className="text-sm text-green-800 mt-2">
                  🛠 Technician Feedback: <em>{mostRecent.technicianNotes}</em>
                </p>
              )}
            </div>
          )}

          {/* Other Appointments */}
              <h3 className="text-lg font-bold text-secondary-800 mb-2">
                Scheduled Appointments
              </h3>
          <ul className="divide-y divide-light-300">
            {otherAppointments.map((appt) => (
              <li
                key={appt._id}
                className="flex justify-between items-start py-4"
              >
                <div>
                  <p className="font-semibold text-secondary-800">{appt.name}</p>
                  <p className="text-sm text-light-600">{appt.email}</p>
                  <p className="text-sm">Phone: {appt.phone}</p>
                  <p className="text-sm">Pest: {appt.pestType}</p>
                  <p className="text-sm">
                    Date: {new Date(appt.date).toLocaleString()}
                  </p>
                  {appt.notes && (
                    <p className="text-sm italic text-light-600">
                      Notes: {appt.notes}
                    </p>
                  )}
                  {appt.technicianNotes && (
                    <p className="text-sm text-green-800 mt-1">
                      🛠 Tech: {appt.technicianNotes}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => openCancelModal(appt._id)}
                  className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 text-white text-sm"
                >
                  Cancel
                </button>
              </li>
            ))}
          </ul>
        </>
      )}

      {/* Cancel Confirmation Modal */}
      {modalOpened && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-light-100 p-6 rounded shadow max-w-md w-full">
            <h3 className="text-lg font-bold mb-4 text-secondary-700">
              Cancel Appointment
            </h3>
            <p className="text-sm mb-4 text-light-600">
              Are you sure you want to cancel this appointment? This action
              cannot be undone.
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setModalOpened(false)}
                className="px-4 py-2 text-sm border border-light-300 rounded hover:bg-light-200"
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
