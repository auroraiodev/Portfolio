"use client";

import { Container } from "@repo/ui/Container";

export const Chronograph = () => {
  return (
    <section
      style={{
        padding: "5rem 0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "var(--bg-primary)",
        position: "relative",
        width: "100%",
      }}
    >
      <Container size="lg" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <span
          className="manrope"
          style={{
            fontSize: "10px",
            color: "rgba(209, 197, 180, 0.4)",
            letterSpacing: "0.5em",
            marginBottom: "1rem",
          }}
        >
          SYSTEM UPTIME
        </span>
        <div
          style={{
            width: "100%",
            height: "1px",
            backgroundColor: "var(--bg-surface)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              width: "30%",
              backgroundColor: "var(--accent-secondary)",
              boxShadow: "0 0 15px var(--accent-secondary)",
              animation: "scan 12s linear infinite",
            }}
          ></div>
        </div>
      </Container>
      <style jsx>{`
        @keyframes scan {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(333%);
          }
        }
      `}</style>
    </section>
  );
};
