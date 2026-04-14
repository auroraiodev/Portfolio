"use client";

import { useState } from "react";
import Link from "next/link";
import { Container } from "@repo/ui/Container";
import { Button } from "@repo/ui/Button";
import { NavDrawer } from "./NavDrawer";

export const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const navItems = [
    { label: "PROFILE", href: "/#home" },
    { label: "CHRONICLE", href: "/#chronicle" },
    { label: "ARSENAL", href: "/#arsenal" },
    { label: "RELICS", href: "/#relics" },
    { label: "SIGNAL", href: "/#signal" },
  ];

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("/#")) {
      e.preventDefault();
      const id = href.replace("/#", "");
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <nav style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "70px",
        display: "flex",
        alignItems: "center",
        zIndex: 1000,
        backgroundColor: "rgba(19, 19, 19, 0.8)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(229, 226, 225, 0.1)",
        boxShadow: "0 10px 30px rgba(0,0,0,0.8)"
      }}>
        <Container size="lg" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 2rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
            <span
              className="material-symbols-outlined visible-mobile"
              style={{ color: "var(--accent-primary)", cursor: "pointer" }}
              onClick={() => setIsDrawerOpen(true)}
            >
              menu
            </span>
            <Link href="/#home" onClick={(e) => handleScroll(e, "/#home")} style={{
              fontFamily: "'Noto Serif', serif",
              fontSize: "1.1rem",
              fontWeight: 800,
              letterSpacing: "0.25em",
              color: "var(--accent-primary)",
              textDecoration: "none",
              textShadow: "0 0 10px rgba(233, 193, 118, 0.3)"
            }}>
              AURORA<span style={{ opacity: 0.5 }}>.IO</span>
            </Link>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "3rem" }}>
            <div className="hidden-mobile" style={{ display: "flex", gap: "2.5rem" }}>
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleScroll(e, item.href)}
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    textDecoration: "none",
                    color: "rgba(255, 255, 255, 0.5)",
                    transition: "all 0.3s ease",
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.color = "var(--accent-primary)")}
                  onMouseOut={(e) => (e.currentTarget.style.color = "rgba(255, 255, 255, 0.5)")}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <Button 
              variant="outline" 
              size="sm" 
              className="hidden-mobile"
              onClick={() => window.open("/resume.pdf", "_blank")}
              style={{ 
                border: "1px solid rgba(233, 193, 118, 0.3)",
                color: "var(--accent-primary)",
              }}
            >
              DOWNLOAD CV
            </Button>
          </div>
        </Container>
      </nav>
      <NavDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </>
  );
};
