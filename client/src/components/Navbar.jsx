import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About Us" },
    { path: "/products", label: "Products" },
    { path: "/gallery", label: "Gallery" },
    { path: "/support", label: "Contact" },
  ];

  const handleNavigate = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <header
      className={`header-wrapper ${isScrolled ? "scrolled" : ""}`}
      style={{
        backgroundColor: isScrolled
          ? "rgba(255,255,255,0.95)"
          : "rgba(255,255,255,0.9)",
        backdropFilter: "blur(12px)",
        borderBottom: `1px solid ${
          isScrolled ? "var(--border)" : "transparent"
        }`,
        transition: "all .3s ease",
      }}
    >
      <div
        className="container flex justify-between align-center"
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
        }}
      >
        {/* Logo */}

        <NavLink
          to="/"
          className="flex align-center"
          style={{ gap: "10px", height: "100%" }}
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            })
          }
        >
          <img
            src="/assets/logo.png"
            alt="Logo"
            style={{ height: "100%" }}
          />
        </NavLink>

        {/* Desktop Navigation */}

        <nav
          className="nav-links flex align-center"
          style={{ gap: "32px" }}
        >
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() =>
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                })
              }
              style={({ isActive }) => ({
                fontWeight: 600,
                fontSize: "0.875rem",
                color: isActive
                  ? "var(--green-dark)"
                  : "var(--blue-light)",
                position: "relative",
                padding: "6px 0",
                borderBottom: isActive
                  ? "2px solid var(--green-dark)"
                  : "2px solid transparent",
                transition: "all .25s ease",
                textDecoration: "none",
              })}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Right Side */}

        <div className="flex align-center" style={{ gap: "16px" }}>
          <button
            className="btn btn-primary btn-shine quotebtn"
            style={{
              backgroundColor: "var(--green-dark)",
              fontSize: ".8rem",
              padding: "8px 20px",
              borderRadius: "6px",
            }}
            onClick={() => handleNavigate("/support")}
          >
            REQUEST QUOTE
          </button>

          <button
            className="mobile-nav-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}

        {isMobileMenuOpen && (
          <div
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              right: 0,
              backgroundColor: "var(--bg-white)",
              boxShadow: "0 12px 24px rgba(31,61,90,.1)",
              borderBottom: "1px solid var(--border)",
              padding: "20px 24px",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              zIndex: 99,
            }}
          >
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => {
                  handleNavigate(item.path);
                }}
                style={({ isActive }) => ({
                  fontWeight: 600,
                  fontSize: "1rem",
                  color: isActive
                    ? "var(--green-dark)"
                    : "var(--blue-dark)",
                  padding: "8px 0",
                  borderBottom: "1px solid var(--bg-light)",
                  textDecoration: "none",
                })}
              >
                {item.label}
              </NavLink>
            ))}

            <button
              className="btn btn-primary btn-shine"
              style={{
                width: "100%",
                marginTop: "8px",
                backgroundColor: "var(--green-dark)",
                borderRadius: "6px",
              }}
              onClick={() => handleNavigate("/support")}
            >
              REQUEST QUOTE
            </button>
          </div>
        )}
      </div>
    </header>
  );
}