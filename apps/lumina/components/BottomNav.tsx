"use client";

import { useEffect, useState } from "react";

export const BottomNav = () => {
  const [activeSegment, setActiveSegment] = useState("home");

  const navItems = [
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
    <nav className="visible-mobile" style={{ 
      position: "fixed", 
      bottom: 0, 
      left: 0, 
      width: "100%", 
      zIndex: 1000, 
      display: "flex", 
      justifyContent: "space-around", 
      alignItems: "center", 
      padding: "0.75rem 1rem env(safe-area-inset-bottom)", 
      backgroundColor: "rgba(28, 27, 27, 0.9)", 
      backdropFilter: "blur(12px)", 
      borderTop: "1px solid rgba(233, 193, 118, 0.1)", 
      borderRadius: "1.5rem 1.5rem 0 0",
      boxShadow: "0 -20px 40px rgba(0,0,0,0.6)"
    }}>
      {navItems.map((item) => (
        <button 
          key={item.id}
          onClick={() => handleScroll(item.id)}
          style={{ 
            background: "none", 
            border: "none", 
            color: activeSegment === item.id ? "var(--accent-primary)" : "rgba(229, 226, 225, 0.4)", 
            display: "flex", 
            flexDirection: "column", 
            alignItems: "center", 
            gap: "0.25rem", 
            cursor: "pointer",
            transition: "all var(--transition-normal)",
            position: "relative"
          }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: "1.5rem" }}>{item.icon}</span>
          <span className="manrope" style={{ fontSize: "8px", letterSpacing: "0.15em", fontWeight: 600 }}>{item.label}</span>
          {activeSegment === item.id && (
            <div style={{ 
              position: "absolute", 
              bottom: "-4px", 
              width: "4px", 
              height: "4px", 
              borderRadius: "50%", 
              backgroundColor: "var(--accent-secondary)",
              boxShadow: "0 0 10px var(--accent-secondary)"
            }}></div>
          )}
        </button>
      ))}
    </nav>
  );
};
