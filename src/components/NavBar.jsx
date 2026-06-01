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
  const mobileMenuRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(null);
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
    if (navRef.current && isHomePage) navRef.current.classList.add("nav-hidden");
  }, [isMobile, isHomePage]);

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
          navRef.current.classList.remove("nav-hidden");
          if (logoRef.current) logoHangingAnimation(logoRef.current);
        }
      }
    };
    runAnimations();
  }, [isMobile, isHomePage]);

  // Mobile menu animation
  useEffect(() => {
    if (!mobileMenuRef.current) return;
    if (mobileOpen) {
      gsap.fromTo(mobileMenuRef.current, 
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.25, ease: "power2.out" }
      );
    } else {
      gsap.to(mobileMenuRef.current, { opacity: 0, y: -20, duration: 0.2, ease: "power2.in" });
    }
  }, [mobileOpen]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const toggleMobileDropdown = (name) => {
    setMobileExpanded(mobileExpanded === name ? null : name);
  };

  const closeMobileMenu = () => {
    setMobileOpen(false);
    setMobileExpanded(null);
  };

  const handleMouseEnter = (dropdown) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setActiveDropdown(dropdown);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => setActiveDropdown(null), 150);
  };

  const [activeDropdown, setActiveDropdown] = useState(null);

  const LogoBlock = () => (
    <div
      className="logo-container"
      onClick={() => { 
        closeMobileMenu();
        if (typeof onNavScroll === "function") onNavScroll("inicio"); 
      }}
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

  const serviciosItems = [
    { label: "Meta Ads", href: "/servicios/meta-ads", desc: "Gestión y optimización de campañas" },
    { label: "Paid Media", href: "/servicios/paid-media", desc: "Estrategia omnicanal de pago" },
    { label: "Automatización", href: "/servicios/automatizacion", desc: "RPA, IA y flujos automatizados" },
    { label: "Captación", href: "/servicios/captacion-clientes", desc: "Embudos y lead generation" },
    { label: "eCommerce", href: "/servicios/ecommerce", desc: "Optimización de tiendas online" },
    { label: "Growth Partner", href: "/servicios/growth-partner", desc: "Alianza estratégica de crecimiento" },
  ];

  const masItems = [
    { label: "Cómo Trabajamos", href: "/como-trabajamos" },
    { label: "Glosario", href: "/glosario" },
    { label: "Resultados", href: "/resultados" },
    { label: "FAQ", href: "/faq" },
  ];

  const navItems = [
    { label: "Inicio", href: "/", scrollTo: "inicio" },
    { label: "Servicios", dropdown: "servicios", hasDropdown: true },
    { label: "Growth Partner", href: "/servicios/growth-partner" },
    { label: "Más", dropdown: "mas", hasDropdown: true },
    { label: "Nosotros", href: "/", scrollTo: "nosotros" },
    { label: "Agenda", href: "/", scrollTo: "agendar", primary: true },
  ];

  // Mobile NavItem component
  const MobileNavItem = ({ item }) => {
    const isOpen = mobileExpanded === item.dropdown;
    
    if (item.hasDropdown) {
      const items = item.dropdown === "servicios" ? serviciosItems : masItems;
      return (
        <div className="mobile-nav-item">
          <button 
            className={`mobile-nav-btn ${isOpen ? "active" : ""}`}
            onClick={() => toggleMobileDropdown(item.dropdown)}
          >
            <span>{item.label}</span>
            <svg className={`mobile-arrow ${isOpen ? "open" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
          <div className={`mobile-submenu ${isOpen ? "open" : ""}`}>
            {items.map((sub, i) => (
              <Link 
                key={i} 
                to={sub.href} 
                className="mobile-sublink"
                onClick={closeMobileMenu}
              >
                {sub.label}
              </Link>
            ))}
          </div>
        </div>
      );
    }

    if (item.primary) {
      return (
        <Link 
          to={item.href || "/"} 
          className="mobile-nav-btn primary"
          onClick={(e) => {
            e.preventDefault();
            closeMobileMenu();
            if (typeof onNavScroll === "function") onNavScroll(item.scrollTo);
          }}
        >
          {item.label}
        </Link>
      );
    }

    if (item.scrollTo) {
      return (
        <button 
          className="mobile-nav-btn"
          onClick={() => {
            closeMobileMenu();
            if (typeof onNavScroll === "function") onNavScroll(item.scrollTo);
          }}
        >
          {item.label}
        </button>
      );
    }

    return (
      <Link 
        to={item.href} 
        className="mobile-nav-btn"
        onClick={closeMobileMenu}
      >
        {item.label}
      </Link>
    );
  };

  return (
    <>
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

          {/* Desktop Servicios Dropdown */}
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

          <Link to="/servicios/growth-partner" className="nav-link">
            Growth Partner
          </Link>

          {/* Logo en medio solo en móvil */}
          {isMobile && <LogoBlock />}

          {/* Desktop Más Dropdown */}
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

          {/* Hamburger menu button for mobile */}
          {isMobile && (
            <button 
              className="hamburger-btn"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              <span className={`hamburger-icon ${mobileOpen ? "open" : ""}`}>
                <span></span>
                <span></span>
                <span></span>
              </span>
            </button>
          )}

          {!isMobile && (
            <a
              href="/"
              className={`nav-link btn-primary`}
              onClick={(e) => { e.preventDefault(); if (typeof onNavScroll === "function") onNavScroll("agendar"); }}
            >
              Agenda una reunión
            </a>
          )}
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobile && (
        <div 
          ref={mobileMenuRef}
          className={`mobile-menu ${mobileOpen ? "open" : ""}`}
          style={{ display: mobileOpen ? "flex" : "none" }}
        >
          <div className="mobile-menu-header">
            <LogoBlock />
            <button className="hamburger-btn active" onClick={closeMobileMenu}>
              <span className="hamburger-icon open">
                <span></span>
                <span></span>
                <span></span>
              </span>
            </button>
          </div>
          <div className="mobile-menu-content">
            {navItems.map((item, i) => (
              <MobileNavItem key={i} item={item} />
            ))}
          </div>
          <div className="mobile-menu-footer">
            <a
              href="/"
              className="mobile-cta-btn"
              onClick={(e) => {
                e.preventDefault();
                closeMobileMenu();
                if (typeof onNavScroll === "function") onNavScroll("agendar");
              }}
            >
              Agenda una reunión
            </a>
          </div>
        </div>
      )}
    </>
  );
});

NavBar.displayName = "NavBar";

export default NavBar;