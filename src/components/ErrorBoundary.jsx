import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("React Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: "100vh",
          background: "#181414",
          color: "white",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Inter, sans-serif",
          padding: "2rem",
          textAlign: "center"
        }}>
          <h1 style={{ color: "#DE0015", marginBottom: "1rem" }}>Algo salió mal</h1>
          <pre style={{ 
            background: "#2a2a2a", 
            padding: "1rem", 
            borderRadius: "8px",
            maxWidth: "600px",
            overflow: "auto",
            fontSize: "12px",
            textAlign: "left"
          }}>
            {this.state.error?.toString()}
          </pre>
          <button 
            onClick={() => window.location.reload()}
            style={{
              marginTop: "1rem",
              padding: "12px 24px",
              background: "#DE0015",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >
            Recargar página
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;