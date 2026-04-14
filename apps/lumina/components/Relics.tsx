"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@repo/ui/Container";
import data from "../data/portfolio.json";

export const Relics = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { relics } = data;

  const nextRelic = () => setActiveIndex((prev) => (prev + 1) % relics.length);
  const prevRelic = () => setActiveIndex((prev) => (prev - 1 + relics.length) % relics.length);

  return (
    <section id="relics" style={{ padding: "10rem 0", backgroundColor: "#0e0e0e", overflow: "hidden" }}>
      <Container size="xl">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          style={{ textAlign: "center", marginBottom: "6rem" }}
        >
          <span className="manrope" style={{ color: "var(--accent-secondary)", fontSize: "10px", letterSpacing: "0.5em" }}>MANIFESTED WORKS</span>
          <h2 className="noto-serif" style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", marginTop: "1rem" }}>PROJECT RELICS</h2>
        </motion.div>

        <div style={{ position: "relative", height: "700px", perspective: "1500px", display: "flex", alignItems: "center", justifyContent: "center" }}>
          {/* Progress Indicator */}
          <div style={{ position: "absolute", top: "-2rem", right: "2rem", display: "flex", alignItems: "center", gap: "1rem" }}>
             <div style={{ height: "1px", width: "100px", backgroundColor: "rgba(154, 143, 128, 0.2)", position: "relative" }}>
                 <motion.div 
                   animate={{ width: `${((activeIndex + 1) / relics.length) * 100}%` }}
                   style={{ height: "100%", backgroundColor: "var(--accent-secondary)", position: "absolute", left: 0 }}
                 />
             </div>
             <span className="manrope" style={{ fontSize: "10px", color: "var(--accent-secondary)" }}>0{activeIndex + 1} / 0{relics.length}</span>
          </div>

          <div 
            ref={containerRef}
            style={{ 
              position: "relative", 
              width: "100%", 
              height: "100%", 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center",
              transformStyle: "preserve-3d"
            }}
          >
            <AnimatePresence initial={false}>
              {relics.map((relic, index) => {
                // Circular distance logic
                let distance = index - activeIndex;
                if (distance > relics.length / 2) distance -= relics.length;
                if (distance < -relics.length / 2) distance += relics.length;

                const isActive = index === activeIndex;
                
                // Show cards within view range
                if (Math.abs(distance) > 2.5) return null;

                return (
                  <motion.div
                    key={relic.id}
                    initial={{ opacity: 0, scale: 0.8, x: distance * 400 }}
                    animate={{ 
                      opacity: isActive ? 1 : 0.3,
                      scale: isActive ? 1 : 0.8,
                      x: distance * 400,
                      z: isActive ? 0 : -200,
                      rotateY: distance * -25,
                      filter: isActive ? "grayscale(0) blur(0px)" : "grayscale(1) blur(4px)",
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    style={{ 
                      position: "absolute", 
                      width: "350px", 
                      zIndex: isActive ? 10 : 5 - Math.abs(distance),
                      cursor: isActive ? "grab" : "pointer"
                    }}
                    drag={isActive ? "x" : false}
                    dragConstraints={{ left: 0, right: 0 }}
                    onDragEnd={(_, info) => {
                      if (info.offset.x > 100) prevRelic();
                      else if (info.offset.x < -100) nextRelic();
                    }}
                    whileTap={isActive ? { cursor: "grabbing" } : {}}
                    onClick={() => !isActive && setActiveIndex(index)}
                  >
                    <div className="relic-card-premium" style={{ 
                      aspectRatio: "9/16", 
                      backgroundColor: "#1a1a1a", 
                      overflow: "hidden", 
                      border: "1px solid rgba(154, 143, 128, 0.1)",
                      position: "relative",
                      boxShadow: isActive ? "0 30px 60px rgba(0,0,0,0.8)" : "none"
                    }}>
                      <img 
                        src={relic.image} 
                        alt={relic.title} 
                        style={{ width: "100%", height: "100%", objectFit: "cover" }} 
                      />
                      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(14,14,14,1) 0%, rgba(14,14,14,0) 50%)" }} />
                      
                      <div style={{ position: "absolute", bottom: 0, left: 0, padding: "2.5rem", width: "100%", display: "flex", flexDirection: "column", alignItems: "flex-start", textAlign: "left" }}>
                        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem", justifyContent: "flex-start" }}>
                          {relic.tech.map(t => (
                            <span key={t} style={{ fontSize: "8px", border: "1px solid var(--accent-secondary)", padding: "2px 8px", color: "var(--accent-secondary)", borderRadius: "2px" }} className="manrope">
                              {t}
                            </span>
                          ))}
                        </div>
                        <motion.h4 
                          className="serif-text" 
                          animate={isActive ? { 
                            backgroundImage: [
                              "linear-gradient(90deg, #fff 0%, rgba(255,255,255,0.4) 50%, #fff 100%)",
                              "linear-gradient(90deg, #fff 0%, rgba(255,255,255,1) 50%, #fff 100%)",
                              "linear-gradient(90deg, #fff 0%, rgba(255,255,255,0.4) 50%, #fff 100%)"
                            ] 
                          } : {}}
                          transition={{ duration: 4, repeat: Infinity }}
                          style={{ 
                            fontSize: "1.75rem", 
                            color: "white", 
                            marginBottom: "0.75rem",
                            WebkitBackgroundClip: "text",
                            backgroundSize: "200% 100%"
                          }}
                        >
                          {relic.title}
                        </motion.h4>
                        <p className="manrope" style={{ color: "var(--text-secondary)", fontSize: "0.85rem", opacity: isActive ? 0.8 : 0, maxWidth: "260px", lineHeight: "1.6" }}>
                          {relic.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Refined Navigation Controls */}
          <div style={{ 
            position: "absolute", 
            bottom: "-2rem", 
            display: "flex", 
            gap: "2rem", 
            alignItems: "center",
            padding: "1rem 2rem",
            backgroundColor: "rgba(255, 255, 255, 0.03)",
            backdropFilter: "blur(10px)",
            borderRadius: "100px",
            border: "1px solid rgba(154, 143, 128, 0.1)"
          }}>
            <button 
              onClick={prevRelic}
              className="nav-btn"
              style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", color: "rgba(255,255,255,0.4)", transition: "all 0.3s ease" }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: "24px" }}>chevron_left</span>
            </button>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <span className="manrope" style={{ fontSize: "12px", color: "white", letterSpacing: "0.1em" }}>0{activeIndex + 1}</span>
              <div style={{ width: "20px", height: "1px", backgroundColor: "rgba(154, 143, 128, 0.3)" }} />
              <span className="manrope" style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)" }}>0{relics.length}</span>
            </div>
            <button 
              onClick={nextRelic}
              className="nav-btn"
              style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", color: "rgba(255,255,255,0.4)", transition: "all 0.3s ease" }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: "24px" }}>chevron_right</span>
            </button>
          </div>
        </div>
      </Container>

      <style jsx>{`
        .nav-btn:hover span {
          color: white !important;
        }
        .relic-card-premium {
          transition: all 0.5s ease;
        }
        @media (max-width: 768px) {
          #relics {
            padding: 6rem 0 !important;
          }
          [style*="width: 350px"] {
            width: 80vw !important;
          }
        }
      `}</style>
    </section>
  );
};
