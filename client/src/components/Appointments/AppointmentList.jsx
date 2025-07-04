import React, { useEffect, useState } from "react";
import { Modal, Button, Text } from "@mantine/core";
import { showNotification } from "@mantine/notifications";

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

        showNotification({
          title: "Appointment Cancelled",
          message: "The appointment has been successfully cancelled.",
          color: "green",
        });

      } else {
        console.error("Failed to cancel appointment");
      }
    } catch (err) {
      console.error("Error cancelling appointment:", err);
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
              <Button
                color="red"
                variant="outline"
                size="xs"
                onClick={() => openCancelModal(appt._id)}
              >
                Cancel
              </Button>
            </li>
          ))}
        </ul>
      )}

      {/* Mantine Modal */}
          <Modal
            withinPortal={false}
            opened={modalOpened}
            onClose={() => setModalOpened(false)}
            title="Cancel Appointment"
            centered
            size="md"
            padding="lg"
            radius="md"
            zIndex={1000} // Make sure it's above everything else
            overlayProps={{
              color: "#000",
              opacity: 0.5,
              blur: 3,
            }}
            styles={{
              content: {
                backgroundColor: "white",
                borderRadius: "0.5rem",
                boxShadow: "0 20px 50px rgba(0, 0, 0, 0.2)",
              },
            }}
          >
          <Text size="sm" mb="md">
            Are you sure you want to cancel this appointment? This action cannot be undone.
          </Text>
          <div className="flex justify-end gap-3">
            <Button variant="default" onClick={() => setModalOpened(false)}>
              No, go back
            </Button>
            <Button color="red" onClick={handleCancel}>
              Yes, cancel
            </Button>
          </div>
        </Modal>
    </div>
  );
}

export default AppointmentList;
