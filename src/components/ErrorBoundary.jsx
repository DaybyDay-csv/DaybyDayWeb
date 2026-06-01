import React, { useState, useEffect } from "react";

// Global error suppressor for GSAP/React DOM race conditions
if (typeof window !== "undefined") {
  const origWarn = console.warn;
  console.warn = (...args) => {
    if (args[0] && typeof args[0] === "string" && args[0].includes("DBSD: Suppressed")) return;
    origWarn.apply(console, args);
  };
  const origError = console.error;
  console.error = (...args) => {
    if (args[0] && typeof args[0] === "string" && (args[0].includes("removeChild") || args[0].includes("DBSD:"))) return;
    origError.apply(console, args);
  };
  window.onerror = (msg, src, line, col, err) => {
    if (err?.name === "NotFoundError" || (msg && msg.includes("removeChild"))) return true;
  };
}

export default function ErrorBoundary({ children }) {
  const [error, setError] = useState(null);

  useEffect(() => {
    // Catch unhandled errors BEFORE React can propagate them
    const handler = (e) => {
      // Filter out GSAP/React DOM sync errors
      if (e.error?.name === "NotFoundError" || 
          (e.error?.message && e.error.message.includes("removeChild"))) {
        e.preventDefault();  // Stop propagation to React
        e.stopPropagation();  // Stop bubbling
        console.warn("DBSD: Suppressed DOM animation error:", e.error?.message);
        return;
      }
      console.error("DBSD: Global error caught:", e.error);
      setError(e.error);
    };
    window.addEventListener("error", handler, true);  // useCapture=true
    const unhandled = (e) => {
      if (e.reason?.name === "NotFoundError" || 
          (e.reason?.message && e.reason.message.includes("removeChild"))) {
        e.preventDefault();
        console.warn("DBSD: Suppressed DOM animation error:", e.reason?.message);
        return;
      }
      console.error("DBSD: Unhandled rejection:", e.reason);
      setError(new Error(e.reason?.message || String(e.reason)));
    };
    window.addEventListener("unhandledrejection", unhandled, true);
    return () => {
      window.removeEventListener("error", handler, true);
      window.removeEventListener("unhandledrejection", unhandled, true);
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