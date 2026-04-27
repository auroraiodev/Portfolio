"use client";

import React from "react";
import { motion } from "framer-motion";
import { Container } from "@repo/ui/Container";
import { Card } from "@repo/ui/Card";
import data from "../data/portfolio.json";

/**
 * Unified Technical Matrix Card
 * Gathers all professional technical expertise into a single cohesive unit.
 */
export const Arsenal = () => {
  const { technical_coordinates } = data;
  const [hoveredCategory, setHoveredCategory] = React.useState<string | null>(
    null,
  );

  return (
    <section
      id="arsenal"
      style={{
        padding: "10rem 0",
        backgroundColor: "#0b0b0b",
        position: "relative",
        overflow: "hidden",
        width: "100%",
      }}
    >
      <Container size="lg">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: "center", marginBottom: "5rem" }}
        >
          <span
            className="manrope"
            style={{
              color: "var(--accent-secondary)",
              fontSize: "10px",
              letterSpacing: "0.5em",
            }}
          >
            THE ARSENAL
          </span>
          <h2
            className="noto-serif"
            style={{ fontSize: "3.5rem", marginTop: "1rem" }}
          >
            Technical Matrix
          </h2>
          <div
            style={{
              width: "60px",
              height: "2px",
              background: "var(--accent-primary)",
              margin: "2rem auto",
              boxShadow: "0 0 15px var(--accent-primary)",
            }}
          ></div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <Card className="master-arsenal-card">
            {/* Background UI Decorations */}
            <div className="card-bg-grid" />
            <div className="card-scanline" />

            <div className="card-header-meta">
              <span className="manrope">
                SYSTEM_READY // COORDINATES_LOCKED
              </span>
              <div className="meta-dots">
                <span className="dot" />
                <span className="dot" />
                <span className="dot" />
              </div>
            </div>

            <div className="internal-matrix">
              {technical_coordinates.map((item, index) => (
                <div
                  key={item.category}
                  className={`matrix-quadrant ${hoveredCategory === item.category ? "active" : ""}`}
                  onMouseEnter={() => setHoveredCategory(item.category)}
                  onMouseLeave={() => setHoveredCategory(null)}
                >
                  <div className="quadrant-label">
                    <span className="material-symbols-outlined quadrant-icon">
                      {item.icon}
                    </span>
                    <h3 className="quadrant-title">{item.category}</h3>
                  </div>

                  <div className="quadrant-content">
                    <ul className="master-tool-list">
                      {item.tools.map((tool, toolIndex) => (
                        <li key={tool} className="master-tool-item">
                          <motion.span
                            animate={
                              item.category.includes("AI")
                                ? { scale: [1, 1.8, 1], opacity: [0.4, 1, 0.4] }
                                : { opacity: [0.4, 1, 0.4] }
                            }
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              delay: toolIndex * 0.2,
                            }}
                            className="master-tool-dot"
                          />
                          {tool}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Corner Visual Identifier */}
                  <div className="corner-tag">{`LOC_${(index + 1).toString().padStart(2, "0")}`}</div>
                </div>
              ))}
            </div>

            <div className="card-footer-meta">
              <span className="manrope">TECH_STACK_VERSION_2.5_STABLE</span>
              <span className="manrope">© 2026 ARCHIVIST_CORP</span>
            </div>
          </Card>
        </motion.div>
      </Container>

      <style jsx>{`
        .master-arsenal-card {
          position: relative;
          background: rgba(18, 18, 18, 0.6) !important;
          border: 1px solid rgba(233, 193, 118, 0.15) !important;
          backdrop-filter: blur(20px);
          padding: 0 !important;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 40px 100px rgba(0, 0, 0, 0.8);
        }

        .card-bg-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(233, 193, 118, 0.03) 1px, transparent 1px),
            linear-gradient(
              90deg,
              rgba(233, 193, 118, 0.03) 1px,
              transparent 1px
            );
          background-size: 40px 40px;
          z-index: 0;
          pointer-events: none;
        }

        .card-scanline {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 2px;
          background: linear-gradient(
            to right,
            transparent,
            var(--accent-primary),
            transparent
          );
          opacity: 0.2;
          animation: scanline 10s linear infinite;
          z-index: 1;
          pointer-events: none;
        }

        @keyframes scanline {
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

        .card-header-meta {
          padding: 1rem 2rem;
          border-bottom: 1px solid rgba(233, 193, 118, 0.1);
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: rgba(233, 193, 118, 0.02);
          position: relative;
          z-index: 2;
        }

        .card-header-meta span {
          font-size: 9px;
          letter-spacing: 0.3em;
          color: rgba(233, 193, 118, 0.4);
        }

        .meta-dots {
          display: flex;
          gap: 0.5rem;
        }

        .dot {
          width: 4px;
          height: 4px;
          background: rgba(233, 193, 118, 0.3);
          border-radius: 50%;
        }

        .internal-matrix {
          display: grid;
          grid-template-columns: 1fr 1fr;
          position: relative;
          z-index: 2;
        }

        .matrix-quadrant {
          padding: 4rem;
          border-right: 1px solid rgba(233, 193, 118, 0.08);
          border-bottom: 1px solid rgba(233, 193, 118, 0.08);
          position: relative;
          transition: background 0.4s ease;
        }

        .matrix-quadrant:nth-child(2n) {
          border-right: none;
        }

        .matrix-quadrant:nth-last-child(-n + 2) {
          border-bottom: none;
        }

        .matrix-quadrant.active {
          background: rgba(233, 193, 118, 0.02);
        }

        .quadrant-label {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          margin-bottom: 3rem;
        }

        .quadrant-icon {
          color: var(--accent-primary);
          opacity: 0.4;
          font-size: 2rem;
          transition: opacity 0.4s ease;
        }

        .active .quadrant-icon {
          opacity: 1;
          text-shadow: 0 0 15px var(--accent-primary);
        }

        .quadrant-title {
          font-family: "Manrope", sans-serif;
          font-size: 0.85rem;
          letter-spacing: 0.25em;
          color: var(--accent-primary);
          font-weight: 800;
          text-transform: uppercase;
        }

        .master-tool-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.25rem;
        }

        .master-tool-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          font-family: "Manrope", sans-serif;
          font-size: 1rem;
          color: var(--text-secondary);
          transition: color 0.3s ease;
        }

        .active .master-tool-item:hover {
          color: var(--text-primary);
        }

        .master-tool-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--accent-secondary);
        }

        .corner-tag {
          position: absolute;
          bottom: 1.5rem;
          right: 1.5rem;
          font-size: 8px;
          font-family: "Manrope", sans-serif;
          color: rgba(233, 193, 118, 0.2);
          letter-spacing: 0.2em;
        }

        .card-footer-meta {
          padding: 1rem 2rem;
          border-top: 1px solid rgba(233, 193, 118, 0.1);
          display: flex;
          justify-content: space-between;
          background: rgba(233, 193, 118, 0.02);
          position: relative;
          z-index: 2;
        }

        .card-footer-meta span {
          font-size: 8px;
          color: rgba(233, 193, 118, 0.3);
          letter-spacing: 0.2em;
        }

        @media (max-width: 992px) {
          .matrix-quadrant {
            padding: 3rem 2rem;
          }
          .quadrant-label {
            margin-bottom: 2rem;
          }
        }

        @media (max-width: 768px) {
          #arsenal {
            padding: 5rem 0 !important;
          }
          #arsenal h2 {
            font-size: 2rem !important;
          }
          #arsenal > div > div:first-child {
            margin-bottom: 3rem !important;
          }
          .internal-matrix {
            grid-template-columns: 1fr;
          }
          .matrix-quadrant {
            padding: 2rem 1.5rem !important;
            border-right: none !important;
          }
          .matrix-quadrant:nth-child(n) {
            border-bottom: 1px solid rgba(233, 193, 118, 0.08);
          }
          .matrix-quadrant:last-child {
            border-bottom: none;
          }
          .quadrant-label {
            gap: 1rem !important;
            margin-bottom: 1.5rem !important;
          }
          .quadrant-icon {
            font-size: 1.5rem !important;
          }
          .quadrant-title {
            font-size: 0.75rem !important;
          }
          .master-tool-list {
            gap: 1rem !important;
          }
          .master-tool-item {
            font-size: 0.9rem !important;
          }
          .card-header-meta,
          .card-footer-meta {
            padding: 0.75rem 1rem !important;
            flex-wrap: wrap;
            gap: 0.5rem;
          }
          .card-header-meta span,
          .card-footer-meta span {
            font-size: 7px !important;
          }
          .corner-tag {
            bottom: 1rem !important;
            right: 1rem !important;
            font-size: 7px !important;
          }
        }
      `}</style>
    </section>
  );
};
