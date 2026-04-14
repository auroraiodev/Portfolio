"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const AuraBackground = () => {
  const [dots, setDots] = useState<{ id: number; x: number; y: number; tx: number; size: number; delay: number; duration: number }[]>([]);

  useEffect(() => {
    // Generate stable random particles
    const newDots = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      tx: (Math.random() - 0.5) * 10, // Target x-offset
      size: Math.random() * 2 + 1,
      delay: Math.random() * 10,
      duration: 10 + Math.random() * 15,
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
      {/* Soft Glow Orbs - Stable Background Layer */}
      <motion.div 
        animate={{ 
          scale: [1, 1.15, 1],
          opacity: [0.2, 0.4, 0.2],
          x: ["-10%", "10%", "-10%"],
          y: ["-10%", "10%", "-10%"]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        style={{
          position: "absolute",
          top: "5%",
          left: "15%",
          width: "70vw",
          height: "70vw",
          background: "radial-gradient(circle, rgba(233, 193, 118, 0.06) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      <motion.div 
        animate={{ 
          scale: [1.15, 1, 1.15],
          opacity: [0.15, 0.35, 0.15],
          x: ["10%", "-10%", "10%"],
          y: ["10%", "-10%", "10%"]
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        style={{
          position: "absolute",
          bottom: "5%",
          right: "5%",
          width: "60vw",
          height: "60vw",
          background: "radial-gradient(circle, rgba(154, 143, 128, 0.08) 0%, transparent 70%)",
          filter: "blur(100px)",
        }}
      />

      {/* Floating Dust Particles - Optimized and Stable */}
      {dots.map((dot) => (
        <motion.div
          key={dot.id}
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0, 0.3, 0],
            y: ["0%", "-15%"],
            x: ["0%", `${dot.tx}%`]
          }}
          transition={{ 
            duration: dot.duration, 
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
            backgroundColor: "rgba(233, 193, 118, 0.4)",
            borderRadius: "50%",
            filter: "blur(0.5px)",
            boxShadow: `0 0 4px rgba(233, 193, 118, 0.2)`,
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
