"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const AuraBackground = () => {
  const [dots, setDots] = useState<{ id: number; x: number; y: number; size: number; delay: number }[]>([]);

  useEffect(() => {
    // Generate random particles
    const newDots = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      delay: Math.random() * 10,
    }));
    setDots(newDots);
  }, []);

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      zIndex: -1,
      pointerEvents: "none",
      overflow: "hidden",
      backgroundColor: "#080808",
    }}>
      {/* Soft Glow Orbs */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          x: ["-20%", "20%", "-20%"],
          y: ["-20%", "20%", "-20%"]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{
          position: "absolute",
          top: "10%",
          left: "20%",
          width: "60vw",
          height: "60vw",
          background: "radial-gradient(circle, rgba(233, 193, 118, 0.08) 0%, transparent 70%)",
          filter: "blur(100px)",
        }}
      />
      <motion.div 
        animate={{ 
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2],
          x: ["20%", "-20%", "20%"],
          y: ["20%", "-20%", "20%"]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        style={{
          position: "absolute",
          bottom: "10%",
          right: "10%",
          width: "50vw",
          height: "50vw",
          background: "radial-gradient(circle, rgba(154, 143, 128, 0.1) 0%, transparent 70%)",
          filter: "blur(120px)",
        }}
      />

      {/* Floating Dust Particles */}
      {dots.map((dot) => (
        <motion.div
          key={dot.id}
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0, 0.4, 0],
            y: ["0%", "-10%"],
            x: ["0%", `${(Math.random() - 0.5) * 5}%`]
          }}
          transition={{ 
            duration: 10 + Math.random() * 10, 
            repeat: Infinity, 
            delay: dot.delay,
            ease: "easeInOut"
          }}
          style={{
            position: "absolute",
            left: `${dot.x}%`,
            top: `${dot.y}%`,
            width: `${dot.size}px`,
            height: `${dot.size}px`,
            backgroundColor: "var(--accent-secondary)",
            borderRadius: "50%",
            filter: "blur(1px)",
            boxShadow: `0 0 10px var(--accent-secondary)`,
          }}
        />
      ))}

      {/* Grid Pattern Overlay */}
      <div style={{
        position: "absolute",
        inset: 0,
        backgroundImage: `radial-gradient(rgba(154, 143, 128, 0.05) 1px, transparent 1px)`,
        backgroundSize: "40px 40px",
        opacity: 0.3
      }} />
    </div>
  );
};
