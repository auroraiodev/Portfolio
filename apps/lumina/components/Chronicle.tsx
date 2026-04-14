"use client";

import { motion } from "framer-motion";
import { Container } from "@repo/ui/Container";
import data from "../data/portfolio.json";

export const Chronicle = () => {
  const { chronicle } = data;

  return (
    <section id="chronicle" style={{ padding: "10rem 0", backgroundColor: "var(--bg-primary)", position: "relative", overflow: "hidden" }}>
      <Container size="lg">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          style={{ textAlign: "center", marginBottom: "8rem" }}
        >
          <span className="manrope" style={{ color: "var(--accent-secondary)", fontSize: "10px", letterSpacing: "0.5em" }}>OPERATIONAL TIMELINE</span>
          <h2 className="noto-serif" style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", marginTop: "1rem" }}>THE WORK CHRONICLE</h2>
        </motion.div>

        <div style={{ position: "relative", maxWidth: "900px", margin: "0 auto" }}>
          {/* Central Line */}
          <div style={{ 
            position: "absolute", 
            left: "50%", 
            top: 0, 
            bottom: 0, 
            width: "1px", 
            backgroundColor: "rgba(233, 193, 118, 0.2)",
            transform: "translateX(-50%)"
          }} className="hidden-mobile"></div>

          {chronicle.map((item, index) => (
            <motion.div 
              key={item.company}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              style={{ 
                display: "flex", 
                justifyContent: index % 2 === 0 ? "flex-start" : "flex-end",
                alignItems: "center",
                marginBottom: "6rem",
                width: "100%",
                position: "relative"
              }}
              className="chronicle-row"
            >
              {/* Central Node */}
              <div style={{ 
                position: "absolute", 
                left: "50%", 
                top: "20px", 
                width: "12px", 
                height: "12px", 
                borderRadius: "50%", 
                backgroundColor: "var(--accent-primary)",
                border: "4px solid var(--bg-primary)",
                boxShadow: "0 0 15px var(--accent-primary)",
                transform: "translateX(-50%)",
                zIndex: 10
              }} className="hidden-mobile"></div>

              <div style={{ 
                width: "45%", 
                textAlign: index % 2 === 0 ? "right" : "left",
                padding: "0 2rem"
              }} className="chronicle-content">
                <span className="manrope" style={{ color: "var(--accent-secondary)", fontSize: "0.7rem", fontWeight: "bold" }}>{item.period}</span>
                <h3 className="noto-serif" style={{ fontSize: "1.75rem", margin: "0.5rem 0", color: "var(--text-primary)" }}>{item.company}</h3>
                <p className="manrope" style={{ color: "var(--accent-primary)", fontSize: "0.8rem", marginBottom: "1rem", fontWeight: "bold" }}>{item.role}</p>
                <p className="manrope" style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: "1.6", textTransform: "none", letterSpacing: "normal" }}>
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>

      <style jsx>{`
        @media (max-width: 768px) {
          .chronicle-row {
            justify-content: center !important;
            margin-bottom: 4rem !important;
          }
          .chronicle-content {
            width: 100% !important;
            text-align: center !important;
            padding: 0 1.5rem !important;
            border-left: none !important;
            margin-left: 0 !important;
          }
        }
      `}</style>
    </section>
  );
};
