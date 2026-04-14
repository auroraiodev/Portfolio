"use client";

import { motion } from "framer-motion";
import { Card } from "@repo/ui/Card";
import { Container } from "@repo/ui/Container";
import data from "../data/portfolio.json";

export const Arsenal = () => {
  const { technical_coordinates } = data;

  return (
    <section id="arsenal" style={{ padding: "5rem 0 8rem 0", backgroundColor: "transparent", position: "relative" }}>
      <Container size="lg">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "5rem" }}
        >
          <div>
            <span className="manrope" style={{ color: "var(--accent-secondary)", fontSize: "10px", letterSpacing: "0.4em" }}>THE ARSENAL</span>
            <h2 className="noto-serif" style={{ fontSize: "3rem", marginTop: "0.5rem" }}>Technical Coordinates</h2>
          </div>
          <div style={{ width: "128px", height: "1px", background: "linear-gradient(to right, var(--accent-primary), transparent)", marginBottom: "1rem" }}></div>
        </motion.div>
        
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "2rem" }}>
          {technical_coordinates.map((item, index) => (
            <motion.div
              key={item.category}
              initial={{ opacity: 0, scale: 0.9, rotate: -2, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
              whileHover={{ y: -10, scale: 1.02 }}
            >
              <Card className="arsenal">
                {/* Glow Background Overlay */}
                <motion.div 
                  className="card-glow"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  style={{ 
                    position: "absolute", 
                    inset: 0, 
                    zIndex: 0, 
                    background: "radial-gradient(circle at center, rgba(233, 193, 118, 0.12) 0%, transparent 70%)",
                    pointerEvents: "none"
                  }}
                />

                <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 2, background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(233, 193, 118, 0.03) 3px, transparent 4px)", backgroundSize: "100% 4px" }}></div>
                <div style={{ position: "absolute", top: 0, right: 0, padding: "1rem", opacity: 0.1 }}>
                  <span className="material-symbols-outlined" style={{ fontSize: "4rem", color: "var(--accent-primary)" }}>
                    {item.icon}
                  </span>
                </div>
                <span className="manrope" style={{ color: "var(--accent-primary)", fontWeight: "bold", display: "block", marginBottom: "1.5rem", position: "relative", zIndex: 3 }}>
                  {item.category}
                </span>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "1rem", position: "relative", zIndex: 3 }}>
                  {item.tools.map((tool, toolIndex) => (
                    <li key={tool} style={{ display: "flex", alignItems: "center", gap: "0.75rem", fontFamily: "'Manrope', sans-serif", fontSize: "1.1rem", color: "var(--text-secondary)" }}>
                      <motion.span 
                        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity, delay: (toolIndex * 0.2) % 2 }}
                        style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--accent-secondary)", boxShadow: "0 0 10px var(--accent-secondary)" }} 
                      />
                      {tool}
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
      <style jsx>{`
        @media (max-width: 768px) {
          #arsenal {
            padding: 8rem 0 4rem 0 !important;
          }
          #arsenal .Container > div:first-child {
            flex-direction: column !important;
            align-items: center !important;
            text-align: center !important;
            justify-content: center !important;
            gap: 1.5rem !important;
          }
          .arsenal {
            text-align: center !important;
          }
          .arsenal ul {
            align-items: center !important;
          }
          #arsenal div[style*="width: 128px"] {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
};
