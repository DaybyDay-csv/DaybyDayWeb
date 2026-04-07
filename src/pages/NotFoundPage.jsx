import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Footer from "../components/Footer";

const NotFoundPage = () => {
  return (
    <>
      <Helmet>
        <title>Página no encontrada | DayByDay Consulting</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div style={{ minHeight: "80vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "2rem", textAlign: "center" }}>
        <h1 style={{ fontSize: "4rem", fontWeight: "700", marginBottom: "1rem" }}>404</h1>
        <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Página no encontrada</h2>
        <p style={{ color: "#666", marginBottom: "2rem" }}>
          La página que buscas no existe o ha sido movida.
        </p>
        <Link to="/" style={{ background: "#000", color: "#fff", padding: "0.75rem 1.5rem", borderRadius: "0.5rem", textDecoration: "none", fontWeight: "600" }}>
          Volver al inicio
        </Link>
      </div>
      <Footer />
    </>
  );
};

export default NotFoundPage;
