"use client";

export const Footer = () => {
  return (
    <footer
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1rem",
        padding: "3rem 2rem",
        backgroundColor: "#131313",
        borderTop: "1px solid rgba(229, 226, 225, 0.1)",
        marginTop: "auto",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "2rem",
          marginBottom: "1rem",
          fontFamily: "'Manrope', sans-serif",
          fontSize: "10px",
          letterSpacing: "0.3em",
          textTransform: "uppercase",
        }}
      >
        <a
          href="#"
          style={{ color: "rgba(229, 226, 225, 0.4)", textDecoration: "none" }}
        >
          Terms of Chronicle
        </a>
        <a
          href="#"
          style={{ color: "rgba(229, 226, 225, 0.4)", textDecoration: "none" }}
        >
          Privacy Ghost
        </a>
      </div>
      <p
        style={{
          fontFamily: "'Manrope', sans-serif",
          fontSize: "10px",
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          opacity: 0.4,
        }}
      >
        © 1833-2024 THE ETHERIAL ARCHIVE. ALL RIGHTS RESERVED.
      </p>
    </footer>
  );
};
