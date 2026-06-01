import React, { useState, useEffect } from "react";

export default function ErrorBoundary({ children }) {
  const [error, setError] = useState(null);

  useEffect(() => {
    const handler = (e) => {
      // Filter out GSAP/React DOM sync errors that are not real app errors
      if (e.error?.name === "NotFoundError" || 
          (e.error?.message && e.error.message.includes("removeChild"))) {
        console.warn("DBSD: Suppressed DOM animation error:", e.error?.message);
        return;
      }
      console.error("DBSD: Global error caught:", e.error);
      setError(e.error);
    };
    window.addEventListener("error", handler);
    const unhandled = (e) => {
      console.error("DBSD: Unhandled rejection:", e.reason);
      setError(new Error(e.reason?.message || String(e.reason)));
    };
    window.addEventListener("unhandledrejection", unhandled);
    return () => {
      window.removeEventListener("error", handler);
      window.removeEventListener("unhandledrejection", unhandled);
    };
  }, []);

  if (error) {
    return (
      <div style={{
        minHeight: "100vh",
        background: "#111",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Inter, sans-serif",
        padding: "2rem",
        flexDirection: "column",
        gap: "1rem",
        textAlign: "center"
      }}>
        <h1 style={{ color: "#DE0015", fontSize: "1.5rem" }}>Error de JavaScript</h1>
        <p style={{ color: "#888", fontSize: "0.875rem" }}>{error?.message || String(error)}</p>
        <p style={{ color: "#555", fontSize: "0.75rem" }}>{error?.stack?.slice(0, 200)}</p>
        <button 
          onClick={() => window.location.reload()} 
          style={{
            padding: "12px 24px",
            background: "#DE0015",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            marginTop: "1rem"
          }}
        >
          Recargar página
        </button>
      </div>
    );
  }

  return children;
}