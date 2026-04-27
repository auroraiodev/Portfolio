"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@repo/ui/Container";
import data from "../data/portfolio.json";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X, Shield, Database, Network } from "lucide-react";

export const Relics = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isGlitching, setIsGlitching] = useState(false);
  const [cardSpacing, setCardSpacing] = useState(400);
  const { relics } = data;

  useEffect(() => {
    const updateSpacing = () => {
      const width = window.innerWidth;
      if (width <= 480) {
        setCardSpacing(160);
      } else if (width <= 768) {
        setCardSpacing(220);
      } else {
        setCardSpacing(280);
      }
    };
    updateSpacing();
    window.addEventListener("resize", updateSpacing);
    return () => window.removeEventListener("resize", updateSpacing);
  }, []);

  const triggerGlitch = () => {
    setIsGlitching(true);
    setTimeout(() => setIsGlitching(false), 300);
  };

  const nextRelic = () => {
    setActiveIndex((prev) => (prev + 1) % relics.length);
    triggerGlitch();
  };

  const prevRelic = () => {
    setActiveIndex((prev) => (prev - 1 + relics.length) % relics.length);
    triggerGlitch();
  };

  return (
    <section
      id="relics"
      style={{
        padding: "10rem 0",
        backgroundColor: "#0e0e0e",
        overflow: "hidden",
        position: "relative",
        width: "100%",
      }}
    >
      <Container size="lg">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          style={{ textAlign: "center", marginBottom: "6rem" }}
        >
          <span
            className="manrope"
            style={{
              color: "var(--accent-secondary)",
              fontSize: "10px",
              letterSpacing: "0.5em",
            }}
          >
            MANIFESTED WORKS
          </span>
          <h2
            className="noto-serif"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              marginTop: "1rem",
            }}
          >
            PROJECT RELICS
          </h2>
        </motion.div>

        {/* Progress Indicator - Above carousel for mobile centering */}
        <div
          className="progress-indicator"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
            marginBottom: "2rem",
          }}
        >
          <div
            className="progress-bar"
            style={{
              height: "1px",
              width: "100px",
              backgroundColor: "rgba(154, 143, 128, 0.2)",
              position: "relative",
            }}
          >
            <motion.div
              animate={{
                width: `${((activeIndex + 1) / relics.length) * 100}%`,
              }}
              style={{
                height: "100%",
                backgroundColor: "var(--accent-secondary)",
                position: "absolute",
                left: 0,
              }}
            />
          </div>
          <span
            className="manrope"
            style={{ fontSize: "10px", color: "var(--accent-secondary)" }}
          >
            0{activeIndex + 1} / 0{relics.length}
          </span>
        </div>

        <div
          className="carousel-container"
          style={{
            position: "relative",
            height: "700px",
            perspective: "1500px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <div
            ref={containerRef}
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transformStyle: "preserve-3d",
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
                    initial={{
                      opacity: 0,
                      scale: 0.8,
                      x: distance * cardSpacing,
                    }}
                    animate={{
                      opacity: isActive ? 1 : 0.4,
                      scale: isActive ? 1 : 0.85,
                      x: distance * cardSpacing,
                      z: isActive ? 0 : -350,
                      rotateY: distance * -35,
                      filter: isActive
                        ? "grayscale(0) blur(0px)"
                        : "grayscale(1) blur(2px)",
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="relic-card-wrapper"
                    style={{
                      position: "absolute",
                      width: "350px",
                      left: "50%",
                      marginLeft: "-175px",
                      zIndex: isActive ? 10 : 5 - Math.abs(distance),
                      cursor: isActive ? "grab" : "pointer",
                    }}
                    drag={isActive ? "x" : false}
                    dragConstraints={{ left: 0, right: 0 }}
                    onDragEnd={(_, info) => {
                      if (info.offset.x > 100) prevRelic();
                      else if (info.offset.x < -100) nextRelic();
                    }}
                    whileHover={
                      !isActive
                        ? {
                            scale: 1.05,
                            filter: "grayscale(0.5) blur(2px)",
                            opacity: 0.8,
                          }
                        : {}
                    }
                    whileTap={
                      isActive ? { cursor: "grabbing" } : { scale: 0.95 }
                    }
                    layoutId={relic.id}
                    onClick={() => {
                      if (isActive) {
                        setSelectedId(relic.id);
                      } else {
                        setActiveIndex(index);
                        triggerGlitch();
                      }
                    }}
                  >
                    <div
                      className={`relic-card-premium ${isActive && isGlitching ? "data-glitch" : ""}`}
                      style={{
                        aspectRatio: "9/16",
                        backgroundColor: "#1a1a1a",
                        overflow: "hidden",
                        border: "1px solid rgba(154, 143, 128, 0.1)",
                        position: "relative",
                        boxShadow: isActive
                          ? "0 30px 60px rgba(0,0,0,0.8)"
                          : "none",
                      }}
                    >
                      <Image
                        src={relic.image}
                        alt={relic.title}
                        fill
                        style={{ objectFit: "cover" }}
                      />
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          background:
                            "linear-gradient(to top, rgba(14,14,14,1) 0%, rgba(14,14,14,0) 50%)",
                        }}
                      />

                      {isActive && <div className="laser-line" />}
                      {isActive && (
                        <div
                          className="archival-grain"
                          style={{ opacity: 0.1 }}
                        />
                      )}

                      <div
                        style={{
                          position: "absolute",
                          bottom: 0,
                          left: 0,
                          padding: "2.5rem",
                          width: "100%",
                          display: "flex",
                          flexDirection: "column",
                          gap: "0.5rem",
                          alignItems: "flex-start",
                          textAlign: "left",
                        }}
                      >
                        <motion.h4
                          className="serif-text"
                          animate={
                            isActive
                              ? {
                                  backgroundImage: [
                                    "linear-gradient(90deg, #fff 0%, rgba(255,255,255,0.4) 50%, #fff 100%)",
                                    "linear-gradient(90deg, #fff 0%, rgba(255,255,255,1) 50%, #fff 100%)",
                                    "linear-gradient(90deg, #fff 0%, rgba(255,255,255,0.4) 50%, #fff 100%)",
                                  ],
                                }
                              : {}
                          }
                          transition={{ duration: 4, repeat: Infinity }}
                          style={{
                            fontSize: "2rem",
                            color: "white",
                            marginBottom: "0.25rem",
                            WebkitBackgroundClip: "text",
                            backgroundSize: "200% 100%",
                          }}
                        >
                          {relic.title}
                        </motion.h4>

                        <p
                          className="manrope"
                          style={{
                            color: "var(--text-secondary)",
                            fontSize: "0.85rem",
                            opacity: isActive ? 0.8 : 0,
                            maxWidth: "260px",
                            lineHeight: "1.6",
                            marginBottom: "1rem",
                          }}
                        >
                          {relic.description}
                        </p>

                        <div
                          style={{
                            display: "flex",
                            gap: "0.5rem",
                            flexWrap: "wrap",
                            justifyContent: "flex-start",
                            opacity: isActive ? 1 : 0,
                            transition: "opacity 0.5s ease",
                          }}
                        >
                          {relic.tech.map((t, i) => (
                            <motion.span
                              key={t}
                              initial={{ opacity: 0, x: -10 }}
                              animate={isActive ? { opacity: 1, x: 0 } : {}}
                              transition={{ delay: 0.3 + i * 0.1 }}
                              style={{
                                fontSize: "10px",
                                backgroundColor: "rgba(233, 193, 118, 0.08)",
                                padding: "6px 12px",
                                color: "var(--accent-primary)",
                                borderRadius: "2px",
                                border: "1px solid rgba(233, 193, 118, 0.2)",
                                fontWeight: "bold",
                                letterSpacing: "0.1em",
                                textTransform: "uppercase",
                                boxShadow: "0 0 15px rgba(233, 193, 118, 0.05)",
                                textShadow: "0 0 8px rgba(233, 193, 118, 0.3)",
                              }}
                              className="manrope"
                            >
                              {t}
                            </motion.span>
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
              <div
                style={{
                  position: "fixed",
                  inset: 0,
                  zIndex: 2000,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "1rem",
                }}
              >
                {/* Backdrop */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setSelectedId(null)}
                  style={{
                    position: "absolute",
                    inset: 0,
                    backgroundColor: "rgba(0,0,0,0.95)",
                    backdropFilter: "blur(30px)",
                  }}
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
                    backdropFilter: "blur(40px)",
                  }}
                >
                  {/* Dynamic Backdrop Image */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      zIndex: -1,
                      overflow: "hidden",
                    }}
                  >
                    <Image
                      src={relics.find((r) => r.id === selectedId)?.image || ""}
                      fill
                      style={{
                        objectFit: "cover",
                        opacity: 0.15,
                        filter: "blur(40px) contrast(1.2)",
                      }}
                      alt=""
                    />
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background:
                          "radial-gradient(circle at center, transparent, #000)",
                      }}
                    />
                  </div>

                  {/* Archival Grain Overlay */}
                  <div className="archival-grain" />
                  {/* Left Sidebar: Archival Meta */}
                  <div
                    style={{
                      width: "80px",
                      borderRight: "1px solid rgba(233, 193, 118, 0.1)",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      padding: "2rem 0",
                      gap: "4rem",
                      backgroundColor: "rgba(14, 14, 14, 0.6)",
                    }}
                    className="modal-sidebar"
                  >
                    <div
                      style={{
                        transform: "rotate(-90deg)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      <span
                        className="manrope"
                        style={{
                          color: "var(--accent-primary)",
                          fontSize: "10px",
                          letterSpacing: "0.5em",
                          opacity: 0.5,
                        }}
                      >
                        CLASSIFIED_ARCHIVE
                      </span>
                    </div>
                    {/* ... rest of the sidebar icons ... */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "2rem",
                        alignItems: "center",
                      }}
                    >
                      <Shield
                        style={{
                          color: "var(--accent-primary)",
                          width: "20px",
                          height: "20px",
                          opacity: 0.3,
                        }}
                      />
                      <Database
                        style={{
                          color: "var(--accent-primary)",
                          width: "20px",
                          height: "20px",
                          opacity: 0.3,
                        }}
                      />
                      <Network
                        style={{
                          color: "var(--accent-primary)",
                          width: "20px",
                          height: "20px",
                          opacity: 0.3,
                        }}
                      />
                    </div>
                    <div
                      style={{
                        marginTop: "auto",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "1rem",
                      }}
                    >
                      <div
                        style={{
                          width: "2px",
                          height: "100px",
                          background:
                            "linear-gradient(to bottom, transparent, var(--accent-primary), transparent)",
                        }}
                      />
                      <span
                        className="manrope"
                        style={{
                          fontSize: "10px",
                          color: "white",
                          opacity: 0.2,
                        }}
                      >
                        V3.1
                      </span>
                    </div>
                  </div>

                  {/* Main Grid: Data & Visual */}
                  <div
                    style={{
                      flex: 1,
                      display: "grid",
                      gridTemplateColumns: "1.2fr 1fr",
                      overflowY: "auto",
                    }}
                    className="modal-main-grid"
                  >
                    {/* Visual & Core Meta */}
                    <div
                      style={{
                        borderRight: "1px solid rgba(255,255,255,0.05)",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <div
                        style={{
                          position: "relative",
                          height: "450px",
                          backgroundColor: "#000",
                        }}
                      >
                        <Image
                          src={
                            relics.find((r) => r.id === selectedId)?.image || ""
                          }
                          fill
                          style={{ objectFit: "cover", opacity: 0.8 }}
                          alt=""
                        />
                        <div
                          style={{
                            position: "absolute",
                            inset: 0,
                            background:
                              "linear-gradient(to bottom, transparent 60%, #0a0a0a)",
                          }}
                        />
                        {/* Laser Scan Animation */}
                        <div className="laser-line" />

                        <div
                          style={{
                            position: "absolute",
                            bottom: "2rem",
                            left: "3rem",
                          }}
                        >
                          <span
                            className="manrope"
                            style={{
                              color: "var(--accent-primary)",
                              fontSize: "12px",
                              letterSpacing: "0.2em",
                              border: "1px solid var(--accent-primary)",
                              padding: "4px 12px",
                              borderRadius: "2px",
                            }}
                          >
                            {relics.find((r) => r.id === selectedId)?.status}
                          </span>
                          <h2
                            className="serif-text"
                            style={{
                              fontSize: "4.5rem",
                              color: "white",
                              marginTop: "1rem",
                              lineHeight: 0.9,
                            }}
                          >
                            {relics.find((r) => r.id === selectedId)?.title}
                          </h2>
                        </div>
                      </div>

                      <div
                        style={{
                          padding: "3rem",
                          display: "flex",
                          flexWrap: "wrap",
                          gap: "3rem",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "0.5rem",
                          }}
                        >
                          <span
                            className="manrope"
                            style={{
                              color: "rgba(255,255,255,0.3)",
                              fontSize: "10px",
                              letterSpacing: "0.1em",
                            }}
                          >
                            PRIMARY_ROLE
                          </span>
                          <span
                            className="manrope"
                            style={{ color: "white", fontSize: "1.1rem" }}
                          >
                            {relics.find((r) => r.id === selectedId)?.role}
                          </span>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "0.5rem",
                          }}
                        >
                          <span
                            className="manrope"
                            style={{
                              color: "rgba(255,255,255,0.3)",
                              fontSize: "10px",
                              letterSpacing: "0.1em",
                            }}
                          >
                            ACHIEVED_METRIC
                          </span>
                          <span
                            className="manrope"
                            style={{
                              color: "var(--accent-primary)",
                              fontSize: "1.1rem",
                              fontWeight: "bold",
                            }}
                          >
                            {relics.find((r) => r.id === selectedId)?.metrics}
                          </span>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "0.5rem",
                          }}
                        >
                          <span
                            className="manrope"
                            style={{
                              color: "rgba(255,255,255,0.3)",
                              fontSize: "10px",
                              letterSpacing: "0.1em",
                            }}
                          >
                            YEAR
                          </span>
                          <span
                            className="manrope"
                            style={{ color: "white", fontSize: "1.1rem" }}
                          >
                            {relics.find((r) => r.id === selectedId)?.year}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Technical Dossier */}
                    <div
                      style={{
                        padding: "4rem",
                        backgroundColor: "rgba(13, 13, 13, 0.4)",
                        display: "flex",
                        flexDirection: "column",
                        gap: "3rem",
                      }}
                    >
                      <div>
                        <span
                          className="manrope"
                          style={{
                            color: "var(--accent-primary)",
                            fontSize: "10px",
                            letterSpacing: "0.3em",
                            display: "block",
                            marginBottom: "1rem",
                          }}
                        >
                          [ ARCHIVAL_DESCRIPTION ]
                        </span>
                        <p
                          className="manrope"
                          style={{
                            color: "rgba(255,255,255,0.6)",
                            fontSize: "1rem",
                            lineHeight: "1.8",
                          }}
                        >
                          {relics.find((r) => r.id === selectedId)?.description}
                        </p>
                      </div>

                      <div>
                        <span
                          className="manrope"
                          style={{
                            color: "var(--accent-primary)",
                            fontSize: "10px",
                            letterSpacing: "0.3em",
                            display: "block",
                            marginBottom: "1.5rem",
                          }}
                        >
                          [ CORE_CONTRIBUTIONS ]
                        </span>
                        <ul
                          style={{
                            listStyle: "none",
                            padding: 0,
                            display: "flex",
                            flexDirection: "column",
                            gap: "1rem",
                          }}
                        >
                          {relics
                            .find((r) => r.id === selectedId)
                            ?.contributions?.map((c, i) => (
                              <li
                                key={i}
                                style={{
                                  display: "flex",
                                  gap: "1rem",
                                  alignItems: "flex-start",
                                }}
                              >
                                <span
                                  style={{
                                    color: "var(--accent-primary)",
                                    fontSize: "12px",
                                    marginTop: "4px",
                                  }}
                                >
                                  →
                                </span>
                                <span
                                  className="manrope"
                                  style={{
                                    color: "rgba(255,255,255,0.8)",
                                    fontSize: "0.95rem",
                                  }}
                                >
                                  {c}
                                </span>
                              </li>
                            ))}
                        </ul>
                      </div>

                      <div style={{ marginTop: "auto" }}>
                        <span
                          className="manrope"
                          style={{
                            fontSize: "10px",
                            color: "rgba(255,255,255,0.3)",
                            letterSpacing: "0.2em",
                            display: "block",
                            marginBottom: "1.5rem",
                          }}
                        >
                          SYSTEM_STACK_REQUISITION
                        </span>
                        <div
                          style={{
                            display: "flex",
                            gap: "0.5rem",
                            flexWrap: "wrap",
                          }}
                        >
                          {relics
                            .find((r) => r.id === selectedId)
                            ?.tech.map((t) => (
                              <span
                                key={t}
                                style={{
                                  fontSize: "10px",
                                  backgroundColor: "rgba(233, 193, 118, 0.05)",
                                  padding: "6px 14px",
                                  color: "var(--accent-primary)",
                                  borderRadius: "2px",
                                  border: "1px solid rgba(233, 193, 118, 0.15)",
                                  fontWeight: "bold",
                                }}
                                className="manrope"
                              >
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
                      zIndex: 10,
                    }}
                    className="close-btn"
                  >
                    <X size={20} />
                  </button>
                </motion.div>
              </div>
            )}
          </AnimatePresence>

          {/* Hardware Navigation Controls */}
          <div
            className="hardware-controls"
            style={{
              position: "absolute",
              bottom: "-2.5rem",
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              gap: "0.5rem",
              alignItems: "center",
              padding: "4px",
              backgroundColor: "#0a0a0a",
              borderRadius: "4px",
              border: "1px solid rgba(233, 193, 118, 0.15)",
              boxShadow:
                "inset 0 0 20px rgba(0,0,0,0.8), 0 10px 30px rgba(0,0,0,0.5)",
              zIndex: 20,
            }}
          >
            <button
              onClick={prevRelic}
              className="nav-btn-industrial"
              style={{
                padding: "0.75rem 1.5rem",
                background: "linear-gradient(to bottom, #1a1a1a, #0d0d0d)",
                color: "var(--accent-primary)",
                border: "1px solid rgba(233, 193, 118, 0.2)",
                borderRadius: "2px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
              }}
            >
              <ChevronLeft size={18} />
            </button>
            <div
              style={{
                padding: "0.5rem 2rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "2px",
                borderLeft: "1px solid rgba(255,255,255,0.05)",
                borderRight: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              <span
                className="manrope"
                style={{
                  fontSize: "8px",
                  color: "rgba(255,255,255,0.2)",
                  letterSpacing: "0.2em",
                }}
              >
                SELECTION_ID
              </span>
              <span
                className="manrope"
                style={{
                  fontSize: "14px",
                  color: "white",
                  fontWeight: "bold",
                  letterSpacing: "0.1em",
                }}
              >
                0{activeIndex + 1} / 0{relics.length}
              </span>
            </div>
            <button
              onClick={nextRelic}
              className="nav-btn-industrial"
              style={{
                padding: "0.75rem 1.5rem",
                background: "linear-gradient(to bottom, #1a1a1a, #0d0d0d)",
                color: "var(--accent-primary)",
                border: "1px solid rgba(233, 193, 118, 0.2)",
                borderRadius: "2px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
              }}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </Container>

      <style jsx>{`
        .nav-btn-industrial:hover {
          background: linear-gradient(to bottom, #252525, #1a1a1a) !important;
          border-color: var(--accent-primary) !important;
          box-shadow: 0 0 15px rgba(233, 193, 118, 0.2);
        }
        .nav-btn-industrial:active {
          transform: translateY(1px);
          box-shadow: none;
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
            background: linear-gradient(
              to bottom,
              transparent,
              #131313
            ) !important;
          }
          .modal-main-grid > div:first-child > div:first-child {
            height: 300px !important;
          }
          .modal-main-grid > div:first-child > div:first-child h2 {
            font-size: 2.5rem !important;
          }
          .modal-main-grid > div:first-child > div:last-child {
            padding: 1.5rem !important;
            gap: 1.5rem !important;
            flex-wrap: wrap;
          }
          .modal-main-grid > div:last-child {
            padding: 2rem 1.5rem !important;
            gap: 2rem !important;
          }
        }
        @media (max-width: 480px) {
          .modal-main-grid > div:first-child > div:first-child {
            height: 250px !important;
          }
          .modal-main-grid > div:first-child > div:first-child h2 {
            font-size: 2rem !important;
          }
          .modal-main-grid
            > div:first-child
            > div:first-child
            > div:last-child {
            left: 1.5rem !important;
            bottom: 1.5rem !important;
          }
          .close-btn {
            top: 1rem !important;
            right: 1rem !important;
            width: 32px !important;
            height: 32px !important;
          }
        }
        @media (max-width: 768px) {
          #relics {
            padding: 4rem 0 6rem 0 !important;
          }
          #relics h2 {
            font-size: 2rem !important;
          }
          #relics > div > div:first-child {
            margin-bottom: 1.5rem !important;
          }
          .progress-indicator {
            margin-bottom: 1rem !important;
          }
          .progress-bar {
            width: 70px !important;
          }
          .carousel-container {
            height: 450px !important;
            perspective: 800px !important;
          }
          .relic-card-wrapper {
            width: 280px !important;
          }
          .hardware-controls {
            bottom: -3rem !important;
            transform: scale(0.85);
          }
          .relic-card-premium > div:last-child {
            padding: 1.25rem !important;
          }
          .relic-card-premium h4 {
            font-size: 1.35rem !important;
          }
          .relic-card-premium p {
            font-size: 0.7rem !important;
            max-width: 200px !important;
          }
        }
        @media (max-width: 480px) {
          .carousel-container {
            height: 400px !important;
          }
          .relic-card-wrapper {
            width: 240px !important;
          }
          .hardware-controls {
            transform: scale(0.7);
            bottom: -2.5rem !important;
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
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
          opacity: 0.15;
          pointer-events: none;
          z-index: 5;
          filter: contrast(150%) brightness(120%);
        }
        @keyframes scan-laser {
          0% {
            top: 0;
            opacity: 0;
          }
          10% {
            opacity: 0.5;
          }
          90% {
            opacity: 0.5;
          }
          100% {
            top: 100%;
            opacity: 0;
          }
        }
        .data-glitch {
          animation: glitch-anim 0.2s ease infinite;
        }
        @keyframes glitch-anim {
          0% {
            transform: translate(0);
          }
          20% {
            transform: translate(-2px, 2px);
          }
          40% {
            transform: translate(-2px, -2px);
          }
          60% {
            transform: translate(2px, 2px);
          }
          80% {
            transform: translate(2px, -2px);
          }
          100% {
            transform: translate(0);
          }
        }
      `}</style>
    </section>
  );
};
