"use client";

import { useState } from "react";
// ARCHIVAL_SYNC_STABILITY_01

export const BottomNav = () => {
  const [activeSegment, setActiveSegment] = useState("home");

  const navItems = [
    { id: "home", label: "PROFILE", icon: "explore" },
    { id: "vision", label: "IDENTITY", icon: "fingerprint" },
    { id: "chronicle", label: "CHRONICLE", icon: "auto_stories" },
    { id: "arsenal", label: "ARSENAL", icon: "terminal" },
    { id: "relics", label: "RELICS", icon: "inventory_2" },
    { id: "signal", label: "SIGNAL", icon: "sensors" },
  ];

  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSegment(id);
    }
  };

  return (
    <nav
      className="visible-mobile"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        zIndex: 1000,
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        padding: "0.625rem 0.5rem calc(0.625rem + env(safe-area-inset-bottom))",
        backgroundColor: "rgba(19, 19, 19, 0.95)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderTop: "1px solid rgba(233, 193, 118, 0.15)",
        boxShadow: "0 -10px 30px rgba(0,0,0,0.5)",
      }}
    >
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => handleScroll(item.id)}
          style={{
            background: "none",
            border: "none",
            color:
              activeSegment === item.id
                ? "var(--accent-primary)"
                : "rgba(229, 226, 225, 0.4)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.125rem",
            cursor: "pointer",
            transition: "all var(--transition-normal)",
            position: "relative",
            padding: "0.25rem",
            minWidth: "48px",
          }}
        >
          <span
            className="material-symbols-outlined"
            style={{ fontSize: "1.25rem" }}
          >
            {item.icon}
          </span>
          <span
            className="manrope"
            style={{
              fontSize: "7px",
              letterSpacing: "0.08em",
              fontWeight: 600,
            }}
          >
            {item.label}
          </span>
          {activeSegment === item.id && (
            <div
              style={{
                position: "absolute",
                bottom: "-4px",
                width: "4px",
                height: "4px",
                borderRadius: "50%",
                backgroundColor: "var(--accent-secondary)",
                boxShadow: "0 0 10px var(--accent-secondary)",
              }}
            ></div>
          )}
        </button>
      ))}
    </nav>
  );
};
