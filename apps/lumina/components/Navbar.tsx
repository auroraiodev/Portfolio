"use client";

import { useState } from "react";
import Link from "next/link";
import { Container } from "@repo/ui/Container";
import { Button } from "@repo/ui/Button";
import { NavDrawer } from "./NavDrawer";

export const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const navItems = [
    { label: "CHRONICLE", href: "/#home" },
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
        <Container size="lg" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 1.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <span 
              className="material-symbols-outlined visible-mobile" 
              style={{ color: "var(--accent-primary)", cursor: "pointer" }}
              onClick={() => setIsDrawerOpen(true)}
            >
              menu
            </span>
            <Link href="/#home" onClick={(e) => handleScroll(e, "/#home")} style={{ 
              fontFamily: "'Noto Serif', serif", 
              fontSize: "1.25rem", 
              fontWeight: 700, 
              letterSpacing: "0.2em",
              color: "var(--accent-primary)",
              textDecoration: "none",
              textShadow: "0 0 8px rgba(233, 193, 118, 0.4)"
            }}>
              ARCHIVE_01
            </Link>
          </div>
          
          <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
            <div className="hidden-mobile" style={{ display: "flex", gap: "2rem" }}>
              {navItems.map((item) => (
                <Link 
                  key={item.label} 
                  href={item.href}
                  onClick={(e) => handleScroll(e, item.href)}
                  style={{ 
                    fontFamily: "'Noto Serif', serif",
                    fontSize: "0.8rem", 
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    textDecoration: "none", 
                    color: "rgba(229, 226, 225, 0.6)",
                    transition: "all var(--transition-fast)",
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.color = "var(--accent-secondary)")}
                  onMouseOut={(e) => (e.currentTarget.style.color = "rgba(229, 226, 225, 0.6)")}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </nav>
      <NavDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </>
  );
};
