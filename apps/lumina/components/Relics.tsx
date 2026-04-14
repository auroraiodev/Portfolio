"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@repo/ui/Container";
import data from "../data/portfolio.json";

export const Relics = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
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
                    layoutId={relic.id}
                    onClick={() => {
                      if (isActive) setSelectedId(relic.id);
                      else setActiveIndex(index);
                    }}
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
                      
                      <div style={{ position: "absolute", bottom: 0, left: 0, padding: "2.5rem", width: "100%", display: "flex", flexDirection: "column", gap: "0.5rem", alignItems: "flex-start", textAlign: "left" }}>
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
                            fontSize: "2rem", 
                            color: "white", 
                            marginBottom: "0.25rem",
                            WebkitBackgroundClip: "text",
                            backgroundSize: "200% 100%"
                          }}
                        >
                          {relic.title}
                        </motion.h4>
                        
                        <p className="manrope" style={{ color: "var(--text-secondary)", fontSize: "0.85rem", opacity: isActive ? 0.8 : 0, maxWidth: "260px", lineHeight: "1.6", marginBottom: "1rem" }}>
                          {relic.description}
                        </p>

                        <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", justifyContent: "flex-start", opacity: isActive ? 1 : 0, transition: "opacity 0.5s ease" }}>
                          {relic.tech.map(t => (
                            <span key={t} style={{ 
                              fontSize: "8px", 
                              backgroundColor: "rgba(233, 193, 118, 0.15)", 
                              padding: "4px 10px", 
                              color: "var(--accent-primary)", 
                              borderRadius: "4px",
                              border: "1px solid rgba(233, 193, 118, 0.2)",
                              fontWeight: "500",
                              letterSpacing: "0.05em"
                            }} className="manrope">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Modal Overlay */}
          <AnimatePresence>
            {selectedId && (
              <div style={{ position: "fixed", inset: 0, zIndex: 2000, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
                {/* Backdrop */}
                <motion.div 
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   exit={{ opacity: 0 }}
                   onClick={() => setSelectedId(null)}
                   style={{ position: "absolute", inset: 0, backgroundColor: "rgba(0,0,0,0.95)", backdropFilter: "blur(30px)" }}
                />
                
                {/* Modal Container */}
                <motion.div 
                  layoutId={selectedId}
                  style={{ 
                    position: "relative", 
                    width: "100%", 
                    maxWidth: "1200px", 
                    backgroundColor: "rgba(10, 10, 10, 0.4)", 
                    borderRadius: "4px", 
                    overflow: "hidden", 
                    border: "1px solid rgba(233, 193, 118, 0.15)",
                    display: "flex",
                    boxShadow: "0 100px 200px rgba(0,0,0,1)",
                    maxHeight: "90vh",
                    backdropFilter: "blur(40px)"
                  }}
                >
                  {/* Dynamic Backdrop Image */}
                  <div style={{ position: "absolute", inset: 0, zIndex: -1, overflow: "hidden" }}>
                    <img 
                      src={relics.find(r => r.id === selectedId)?.image} 
                      style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.15, filter: "blur(40px) contrast(1.2)" }} 
                      alt=""
                    />
                    <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at center, transparent, #000)" }} />
                  </div>
                  
                  {/* Archival Grain Overlay */}
                  <div className="archival-grain" />
                  {/* Left Sidebar: Archival Meta */}
                  <div style={{ width: "80px", borderRight: "1px solid rgba(233, 193, 118, 0.1)", display: "flex", flexDirection: "column", alignItems: "center", padding: "2rem 0", gap: "4rem", backgroundColor: "rgba(14, 14, 14, 0.6)" }} className="modal-sidebar">
                    <div style={{ transform: "rotate(-90deg)", whiteSpace: "nowrap" }}>
                      <span className="manrope" style={{ color: "var(--accent-primary)", fontSize: "10px", letterSpacing: "0.5em", opacity: 0.5 }}>CLASSIFIED_ARCHIVE</span>
                    </div>
                    {/* ... rest of the sidebar icons ... */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "2rem", alignItems: "center" }}>
                       <span className="material-symbols-outlined" style={{ color: "var(--accent-primary)", fontSize: "20px", opacity: 0.3 }}>security</span>
                       <span className="material-symbols-outlined" style={{ color: "var(--accent-primary)", fontSize: "20px", opacity: 0.3 }}>database</span>
                       <span className="material-symbols-outlined" style={{ color: "var(--accent-primary)", fontSize: "20px", opacity: 0.3 }}>hub</span>
                    </div>
                    <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
                       <div style={{ width: "2px", height: "100px", background: "linear-gradient(to bottom, transparent, var(--accent-primary), transparent)" }} />
                       <span className="manrope" style={{ fontSize: "10px", color: "white", opacity: 0.2 }}>V3.1</span>
                    </div>
                  </div>

                  {/* Main Grid: Data & Visual */}
                  <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1.2fr 1fr", overflowY: "auto" }} className="modal-main-grid">
                    {/* Visual & Core Meta */}
                    <div style={{ borderRight: "1px solid rgba(255,255,255,0.05)", display: "flex", flexDirection: "column" }}>
                      <div style={{ position: "relative", height: "450px", backgroundColor: "#000" }}>
                        <img 
                          src={relics.find(r => r.id === selectedId)?.image} 
                          style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.8 }} 
                        />
                        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 60%, #0a0a0a)" }} />
                        {/* Laser Scan Animation */}
                        <div className="laser-line" />
                        
                        <div style={{ position: "absolute", bottom: "2rem", left: "3rem" }}>
                           <span className="manrope" style={{ color: "var(--accent-primary)", fontSize: "12px", letterSpacing: "0.2em", border: "1px solid var(--accent-primary)", padding: "4px 12px", borderRadius: "2px" }}>
                             {relics.find(r => r.id === selectedId)?.status}
                           </span>
                           <h2 className="serif-text" style={{ fontSize: "4.5rem", color: "white", marginTop: "1rem", lineHeight: 0.9 }}>
                             {relics.find(r => r.id === selectedId)?.title}
                           </h2>
                        </div>
                      </div>

                      <div style={{ padding: "3rem", display: "flex", flexWrap: "wrap", gap: "3rem" }}>
                         <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                            <span className="manrope" style={{ color: "rgba(255,255,255,0.3)", fontSize: "10px", letterSpacing: "0.1em" }}>PRIMARY_ROLE</span>
                            <span className="manrope" style={{ color: "white", fontSize: "1.1rem" }}>{relics.find(r => r.id === selectedId)?.role}</span>
                         </div>
                         <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                            <span className="manrope" style={{ color: "rgba(255,255,255,0.3)", fontSize: "10px", letterSpacing: "0.1em" }}>ACHIEVED_METRIC</span>
                            <span className="manrope" style={{ color: "var(--accent-primary)", fontSize: "1.1rem", fontWeight: "bold" }}>{relics.find(r => r.id === selectedId)?.metrics}</span>
                         </div>
                         <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                            <span className="manrope" style={{ color: "rgba(255,255,255,0.3)", fontSize: "10px", letterSpacing: "0.1em" }}>YEAR</span>
                            <span className="manrope" style={{ color: "white", fontSize: "1.1rem" }}>{relics.find(r => r.id === selectedId)?.year}</span>
                         </div>
                      </div>
                    </div>

                    {/* Technical Dossier */}
                    <div style={{ padding: "4rem", backgroundColor: "rgba(13, 13, 13, 0.4)", display: "flex", flexDirection: "column", gap: "3rem" }}>
                       <div>
                         <span className="manrope" style={{ color: "var(--accent-primary)", fontSize: "10px", letterSpacing: "0.3em", display: "block", marginBottom: "1rem" }}>[ ARCHIVAL_DESCRIPTION ]</span>
                         <p className="manrope" style={{ color: "rgba(255,255,255,0.6)", fontSize: "1rem", lineHeight: "1.8" }}>
                           {relics.find(r => r.id === selectedId)?.description}
                         </p>
                       </div>

                       <div>
                         <span className="manrope" style={{ color: "var(--accent-primary)", fontSize: "10px", letterSpacing: "0.3em", display: "block", marginBottom: "1.5rem" }}>[ CORE_CONTRIBUTIONS ]</span>
                         <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "1rem" }}>
                           {relics.find(r => r.id === selectedId)?.contributions?.map((c, i) => (
                             <li key={i} style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                               <span style={{ color: "var(--accent-primary)", fontSize: "12px", marginTop: "4px" }}>→</span>
                               <span className="manrope" style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.95rem" }}>{c}</span>
                             </li>
                           ))}
                         </ul>
                       </div>

                       <div style={{ marginTop: "auto" }}>
                        <span className="manrope" style={{ fontSize: "10px", color: "rgba(255,255,255,0.3)", letterSpacing: "0.2em", display: "block", marginBottom: "1.5rem" }}>SYSTEM_STACK_REQUISITION</span>
                        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                          {relics.find(r => r.id === selectedId)?.tech.map(t => (
                            <span key={t} style={{ 
                              fontSize: "10px", 
                              backgroundColor: "rgba(233, 193, 118, 0.05)", 
                              padding: "6px 14px", 
                              color: "var(--accent-primary)", 
                              borderRadius: "2px",
                              border: "1px solid rgba(233, 193, 118, 0.15)",
                              fontWeight: "bold"
                            }} className="manrope">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Close Controls */}
                  <button 
                     onClick={() => setSelectedId(null)}
                     style={{ 
                       position: "absolute", 
                       top: "2.5rem", 
                       right: "2.5rem", 
                       background: "rgba(255,255,255,0.05)", 
                       border: "1px solid rgba(255,255,255,0.1)", 
                       color: "white", 
                       width: "40px",
                       height: "40px",
                       borderRadius: "50%",
                       cursor: "pointer",
                       display: "flex",
                       alignItems: "center",
                       justifyContent: "center",
                       zIndex: 10
                     }}
                     className="close-btn"
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>close</span>
                  </button>
                </motion.div>
              </div>
            )}
          </AnimatePresence>

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
        @media (max-width: 992px) {
          .modal-sidebar {
            display: none !important;
          }
          .modal-main-grid {
            grid-template-columns: 1fr !important;
          }
          .modal-img-gradient {
            background: linear-gradient(to bottom, transparent, #131313) !important;
          }
        }
        @media (max-width: 768px) {
          #relics {
            padding: 4rem 0 !important;
          }
          [style*="width: 350px"] {
            width: 85vw !important;
          }
        }
        .laser-line {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 2px;
          background: var(--accent-primary);
          box-shadow: 0 0 15px var(--accent-primary);
          opacity: 0.5;
          animation: scan-laser 4s linear infinite;
          z-index: 1;
        }
        .archival-grain {
          position: absolute;
          inset: 0;
          background-image: url("https://grainy-gradients.vercel.app/noise.svg");
          opacity: 0.05;
          pointer-events: none;
          z-index: 5;
          filter: contrast(150%) brightness(100%);
        }
        @keyframes scan-laser {
          0% { top: 0; opacity: 0; }
          10% { opacity: 0.5; }
          90% { opacity: 0.5; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>
    </section>
  );
};
