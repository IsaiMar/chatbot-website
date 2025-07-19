import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function TransitionPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/", { replace: true });
    }, 1500); // delay in milliseconds

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="h-screen flex items-center justify-center bg-white">
      <h1 className="text-2xl font-bold animate-pulse">Redirecting...</h1>
    </div>
  );
}

export default TransitionPage;
