import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AccountForm from "../components/AccountForm";

function AccountPage() {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    picture: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:8081/api/account", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
        setFormData({
          name: res.data.name,
          email: res.data.email,
          phone: res.data.phone || "",
          address: res.data.address || "",
          picture: res.data.picture || "",
        });
      } catch (err) {
        console.error("Failed to fetch user data", err);
        if (
          err.response &&
          (err.response.status === 401 || err.response.status === 403)
        ) {
          localStorage.removeItem("token");
          navigate("/login");
        } else {
          setError("Failed to load account info.");
        }
      }
    };

    fetchUser();
  }, [navigate, token]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({ ...prev, picture: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");

    try {
      const res = await axios.put(
        "http://localhost:8081/api/account",
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUser(res.data);
      setSuccess("Profile updated successfully.");
      setIsEditing(false);
    } catch (err) {
      console.error("Failed to update profile", err);
      setError("Update failed. Please try again.");
    }
  };

  const handleCancel = () => {
    if (!user) return;
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone || "",
      address: user.address || "",
      picture: user.picture || "",
    });
    setIsEditing(false);
    setSuccess("");
    setError("");
  };

  if (error && !user) {
    return (
      <div className="max-w-xl mx-auto p-6 mt-10 bg-light-100 shadow rounded">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (!user) return <p className="text-center mt-10 text-light-600">Loading...</p>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-light-100 shadow rounded mt-10">
      <h2 className="text-2xl font-bold mb-4 text-secondary-700">My Account</h2>
      <AccountForm
        formData={formData}
        isEditing={isEditing}
        handleChange={handleChange}
        handleImageUpload={handleImageUpload}
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
        handleEdit={() => setIsEditing(true)}
        success={success}
        error={error}
      />
    </div>
  );
}

export default AccountPage;
