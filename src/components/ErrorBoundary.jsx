import React, { useState } from "react";

export default function ErrorBoundary({ children }) {
  const [error, setError] = useState(null);

  React.useEffect(() => {
    const handler = (e) => setError(e.error);
    window.addEventListener("error", handler);
    return () => window.removeEventListener("error", handler);
  }, []);

  if (error) {
    return (
      <div style={{minHeight:"100vh",background:"#181414",color:"white",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"Inter,sans-serif",padding:"2rem",flexDirection:"column",gap:"1rem"}}>
        <h1 style={{color:"#DE0015"}}>Error de JavaScript</h1>
        <p>{error.message}</p>
        <button onClick={()=>window.location.reload()} style={{padding:"12px 24px",background:"#DE0015",color:"white",border:"none",borderRadius:"8px",cursor:"pointer"}}>Recargar</button>
      </div>
    );
  }

  return children;
}