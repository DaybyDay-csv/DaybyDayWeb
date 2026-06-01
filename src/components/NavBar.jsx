// /components/NavBar.jsx
import React, {
  useRef,
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import {
  logoHangingAnimation,
  navMenuAnimation,
  initNavbarScrollVisibility,
} from "../animation";

gsap.registerPlugin(ScrollToPlugin);

const NavBar = forwardRef(({ onNavScroll, isHomePage = true }, ref) => {
  const logoRef = useRef(null);
  const navRef = useRef(null);
  const navbarRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const scrollCleanupRef = useRef(null);
  const dropdownTimeoutRef = useRef(null);

  useImperativeHandle(ref, () => ({}));

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (navbarRef.current) {
      if (scrollCleanupRef.current) scrollCleanupRef.current();
      scrollCleanupRef.current = initNavbarScrollVisibility(navbarRef.current, isHomePage);
    }
    return () => { if (scrollCleanupRef.current) scrollCleanupRef.current(); };
  }, [isHomePage]);

  useEffect(() => {
    if (logoRef.current) {
      if (isMobile) logoRef.current.classList.add("logo-hidden");
      else logoRef.current.classList.remove("logo-hidden");
    }
    if (navRef.current) navRef.current.classList.add("nav-hidden");
  }, [isMobile]);

  useEffect(() => {
    const runAnimations = async () => {
      if (logoRef.current) gsap.set(logoRef.current, { autoAlpha: 1 });
      if (navRef.current) {
        if (isHomePage) {
          navRef.current.classList.add("nav-hidden");
          if (isMobile) {
            navMenuAnimation(navRef.current);
            setTimeout(() => logoHangingAnimation(logoRef.current), 200);
          } else {
            logoHangingAnimation(logoRef.current);
            await navMenuAnimation(navRef.current);
          }
        } else {
          // Non-home pages: show immediately
          navRef.current.classList.remove("nav-hidden");
          if (logoRef.current) logoHangingAnimation(logoRef.current);
        }
      }
    };
    runAnimations();
  }, [isMobile, isHomePage]);

  const handleMouseEnter = (dropdown) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setActiveDropdown(dropdown);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => setActiveDropdown(null), 150);
  };

  const LogoBlock = () => (
    <div
      className="logo-container"
      onClick={() => { if (typeof onNavScroll === "function") onNavScroll("inicio"); }}
      style={{ cursor: "pointer" }}
    >
      <div className="logo-text" ref={logoRef}>
        <div className="logo-line logo-first-line">
          <span className="logo-day">Day</span>
        </div>
        <div className="logo-line logo-second-line">
          <span className="logo-day">Da</span>
          <span className="logo-y rotated">y</span>
          <span className="logo-by rotated">by</span>
        </div>
      </div>
    </div>
  );

  // Submenu items
  const serviciosItems = [
    { label: "Meta Ads", href: "/servicios/meta-ads", desc: "Gestión y optimización de campañas" },
    { label: "Paid Media", href: "/servicios/paid-media", desc: "Estrategia omnicanal de pago" },
    { label: "Automatización", href: "/servicios/automatizacion", desc: "RPA, IA y flujos automatizados" },
    { label: "Captación", href: "/servicios/captacion-clientes", desc: "Embudos y lead generation" },
    { label: "eCommerce", href: "/servicios/ecommerce", desc: "Optimización de tiendas online" },
    { label: "Growth Partner", href: "/servicios/growth-partner", desc: "Alianza estratégica de crecimiento" },
  ];

  const masItems = [
    { label: "Cómo Trabajamos", href: "/como-trabajamos", icon: "process" },
    { label: "Glosario", href: "/glosario", icon: "book" },
    { label: "Resultados", href: "/resultados", icon: "chart" },
    { label: "FAQ", href: "/faq", icon: "help" },
  ];

  return (
    <nav
      ref={navbarRef}
      className={`navbar ${isMobile ? "mobile" : ""}`}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        opacity: 0,
        display: "none",
      }}
    >
      {!isMobile && <LogoBlock />}

      <div
        className={`nav-container ${isMobile ? "nav-mobile" : ""} nav-hidden`}
        ref={navRef}
      >
        <a href="/" className="nav-link" onClick={(e) => { e.preventDefault(); if (typeof onNavScroll === "function") onNavScroll("inicio"); }}>
          Inicio
        </a>

        {/* Servicios Dropdown */}
        {!isMobile && (
          <div
            className="nav-dropdown-wrapper"
            onMouseEnter={() => handleMouseEnter("servicios")}
            onMouseLeave={handleMouseLeave}
          >
            <button className={`nav-link nav-dropdown-trigger ${activeDropdown === "servicios" ? "active" : ""}`}>
              Servicios
              <svg className="nav-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            <div className={`nav-dropdown mega-dropdown ${activeDropdown === "servicios" ? "open" : ""}`}>
              <div className="mega-dropdown-grid">
                {serviciosItems.map((item, i) => (
                  <Link key={i} to={item.href} className="mega-dropdown-item" onClick={() => setActiveDropdown(null)}>
                    <span className="mega-item-label">{item.label}</span>
                    <span className="mega-item-desc">{item.desc}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Growth Partner - visible link */}
        <Link to="/servicios/growth-partner" className="nav-link">
          Growth Partner
        </Link>

        {/* Logo en medio solo en móvil */}
        {isMobile && <LogoBlock />}

        {/* Más Dropdown */}
        {!isMobile && (
          <div
            className="nav-dropdown-wrapper"
            onMouseEnter={() => handleMouseEnter("mas")}
            onMouseLeave={handleMouseLeave}
          >
            <button className={`nav-link nav-dropdown-trigger ${activeDropdown === "mas" ? "active" : ""}`}>
              Más
              <svg className="nav-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            <div className={`nav-dropdown simple-dropdown ${activeDropdown === "mas" ? "open" : ""}`}>
              {masItems.map((item, i) => (
                <Link key={i} to={item.href} className="dropdown-item" onClick={() => setActiveDropdown(null)}>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}

        <a href="/" className="nav-link" onClick={(e) => { e.preventDefault(); if (typeof onNavScroll === "function") onNavScroll("nosotros"); }}>
          Nosotros
        </a>

        <a
          href="/"
          className={`nav-link btn-primary`}
          onClick={(e) => { e.preventDefault(); if (typeof onNavScroll === "function") onNavScroll("agendar"); }}
          style={{
            padding: isMobile ? "12px 20px" : "",
            fontSize: isMobile ? "16px" : "",
            marginTop: isMobile ? "10px" : "",
            background: isMobile ? "linear-gradient(#ff3131, #d00000)" : "",
            fontWeight: isMobile ? "bold" : "",
          }}
        >
          Agenda una reunión
        </a>
      </div>
    </nav>
  );
});

NavBar.displayName = "NavBar";

export default NavBar;
