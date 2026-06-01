// /components/Layout.jsx
import React, { useRef, useEffect } from "react";
import NavBar from "./NavBar";

export default function Layout({ children, onNavScroll }) {
  const navBarRef = useRef(null);

  return (
    <>
      <NavBar ref={navBarRef} onNavScroll={onNavScroll} />
      <div className="page-content">
        {children}
      </div>
    </>
  );
}