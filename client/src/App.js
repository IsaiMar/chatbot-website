// src/App.js
import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import MainLayout from "./layout/MainLayout";
import HomePage from "./pages/HomePage";
import ServicesPage from "./pages/ServicesPage";
import BookPage from "./pages/BookPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import AccountPage from "./pages/AccountPage";
import PrivateRoute from "./components/PrivateRoute";
import { MobileChatBotTrigger } from "./components/MobileChatBotTrigger";
import TransitionPage from "./pages/TransitionPage";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded = jwtDecode(token);
        const expirationTime = decoded.exp * 1000;
        const now = Date.now();

        if (expirationTime < now) {
          // Token expired — logout
          localStorage.removeItem("token");
          navigate("/login");
        } else {
          // Auto-logout timer
          const timeout = setTimeout(() => {
            localStorage.removeItem("token");
            navigate("/login");
          }, expirationTime - now);

          // Cleanup timeout on unmount
          return () => clearTimeout(timeout);
        }
      } catch (err) {
        console.error("Invalid token:", err);
        localStorage.removeItem("token");
        navigate("/login");
      }
    }
  }, [navigate]);

  return (
    <>
      <Routes>
        {/* Nested routes inside layout */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="book" element={<BookPage />} />
          <Route
            path="account"
            element={
              <PrivateRoute>
                <AccountPage />
              </PrivateRoute>
            }
          />
        </Route>

        {/* Standalone routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/transition" element={<TransitionPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      </Routes>

      <ToastContainer
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        position="top-center"
      />
      {/* 💬 Mobile Chatbot Button */}
      <MobileChatBotTrigger />
    </>
  );
}

export default App;
