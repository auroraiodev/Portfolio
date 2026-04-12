"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@repo/ui/Container";
import { Button } from "@repo/ui/Button";
import data from "../data/portfolio.json";

export const Relics = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { relics } = data;

  const displayRelics = isExpanded ? relics : relics.filter(r => r.pinned);

  return (
    <section id="relics" style={{ padding: "10rem 0", backgroundColor: "#0e0e0e", overflow: "hidden" }}>
      <Container size="lg">
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
        
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", 
          gap: "2.5rem", 
          alignItems: "start",
          paddingTop: "3rem"
        }}>
          <AnimatePresence mode="popLayout">
            {displayRelics.map((relic, index) => (
              <motion.div 
                key={relic.id} 
                layout
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                className={`relic-card ${index % 3 === 1 ? 'offset-card' : ''}`}
                style={{ cursor: "pointer", position: "relative" }}
              >
                <div style={{ 
                  aspectRatio: "9/16", 
                  backgroundColor: "var(--bg-secondary)", 
                  overflow: "hidden", 
                  border: "1px solid rgba(154, 143, 128, 0.2)",
                  position: "relative"
                }}>
                  <img 
                    alt={relic.title} 
                    style={{ 
                      width: "100%", 
                      height: "100%", 
                      objectFit: "cover", 
                      transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
                      opacity: 0.7
                    } as any}
                    className="relic-img"
                    src={relic.image}
                  />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, #131313, rgba(19, 19, 19, 0), transparent)" }}></div>
                  <div style={{ position: "absolute", bottom: 0, left: 0, padding: "2.5rem", width: "100%" }}>
                    <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.5rem" }}>
                      {relic.tech.map(t => (
                        <span key={t} style={{ fontSize: "8px", border: "1px solid var(--accent-secondary)", padding: "0.1rem 0.4rem", color: "var(--accent-secondary)" }} className="manrope">
                          {t}
                        </span>
                      ))}
                    </div>
                    <h4 className="serif-text" style={{ fontSize: "1.75rem", color: "var(--accent-primary)", marginBottom: "0.75rem" }}>{relic.title}</h4>
                    <p className="manrope" style={{ color: "var(--text-secondary)", fontSize: "0.85rem", textTransform: "none", letterSpacing: "normal", marginBottom: "1.5rem", opacity: 0.8 }}>
                      {relic.description}
                    </p>
                    <div 
                      className="view-artifact"
                      style={{ 
                        display: "flex", 
                        alignItems: "center", 
                        gap: "0.5rem", 
                        fontSize: "10px", 
                        letterSpacing: "0.2em", 
                        color: "var(--accent-secondary)", 
                        opacity: 0, 
                        transition: "opacity 0.5s ease" 
                      }}
                    >
                      <span>VIEW ARTIFACT</span>
                      <span className="material-symbols-outlined" style={{ fontSize: "14px" }}>arrow_forward</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {!isExpanded && (
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            style={{ textAlign: "center", marginTop: "6rem" }}
          >
            <Button variant="outline" style={{ padding: "1rem 3rem" }} onClick={() => setIsExpanded(true)}>
              EXPAND ALL ARCHIVE ARTIFACTS
            </Button>
          </motion.div>
        )}
      </Container>
      
      <style jsx>{`
        .relic-card:hover .relic-img {
          opacity: 1;
          transform: scale(1.1);
        }
        .relic-card:hover .view-artifact {
          opacity: 1;
        }
        @media (min-width: 769px) {
          .offset-card {
            transform: translateY(-3rem);
          }
        }
      `}</style>
    </section>
  );
};
