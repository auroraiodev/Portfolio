"use client";

interface NavDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NavDrawer = ({ isOpen, onClose }: NavDrawerProps) => {
  return (
    <>
      <div 
        onClick={onClose}
        style={{ 
          position: "fixed", 
          inset: 0, 
          backgroundColor: "rgba(0,0,0,0.8)", 
          zIndex: 1400, 
          opacity: isOpen ? 1 : 0, 
          pointerEvents: isOpen ? "auto" : "none", 
          transition: "opacity 0.5s ease" 
        }}
      ></div>
      <nav style={{ 
        position: "fixed", 
        top: 0, 
        right: 0, 
        height: "100%", 
        width: "300px", 
        backgroundColor: "#131313", 
        zIndex: 1500, 
        transform: isOpen ? "translateX(0)" : "translateX(100%)", 
        transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)", 
        padding: "3rem 2rem",
        borderLeft: "1px solid rgba(233, 193, 118, 0.1)",
        display: "flex",
        flexDirection: "column",
        gap: "2rem"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem" }}>
          <div style={{ 
            width: "48px", 
            height: "48px", 
            borderRadius: "50%", 
            overflow: "hidden", 
            border: "1px solid rgba(233, 193, 118, 0.2)",
            backgroundColor: "var(--bg-surface)"
          }}>
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBomGBhN-w-yWx1rfW3zzJwe79YI71AkHJga3Bdrst13c5E07gWuhf9oY2jVJhvzDicgyWb4guh7VwZY_jZmsyIE3xdPZwmfgQDBhK4m-kvmcn-0JTNtO9TWsf3P4HhrP8qFNB3CPcx1mTc8gzmBIO71seaHP7PVkdklCZzSs8qhdp4cgXNBwtZIIcyUQCgRNOqoi9kdMevy40FfMTAk2weXfMQLBTHwH9Qj0I_VunnY-OWMmFzxsR1TuP4n0B0VszQkAVDjHzBYjQ" alt="Archivist" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(1)" }} />
          </div>
          <div>
            <h4 style={{ color: "var(--accent-primary)", margin: 0, fontFamily: "'Noto Serif', serif" }}>OP_ARCHIVIST</h4>
            <p style={{ margin: 0, fontSize: "10px", color: "rgba(229, 226, 225, 0.5)", textTransform: "uppercase", letterSpacing: "0.2em" }}>Level 33 Architect</p>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <a href="#" style={{ display: "flex", alignItems: "center", gap: "1rem", color: "var(--accent-primary)", background: "rgba(233, 193, 118, 0.1)", borderLeft: "2px solid var(--accent-primary)", padding: "1rem", textDecoration: "none" }} className="manrope">
            <span className="material-symbols-outlined">explore</span> THE PATH
          </a>
          <a href="#" style={{ display: "flex", alignItems: "center", gap: "1rem", color: "rgba(229, 226, 225, 0.4)", padding: "1rem", textDecoration: "none" }} className="manrope">
            <span className="material-symbols-outlined">menu_book</span> KNOWLEDGE
          </a>
          <a href="#" style={{ display: "flex", alignItems: "center", gap: "1rem", color: "rgba(229, 226, 225, 0.4)", padding: "1rem", textDecoration: "none" }} className="manrope">
            <span className="material-symbols-outlined">category</span> ARTIFACTS
          </a>
        </div>

        <div style={{ marginTop: "auto", paddingTop: "2rem", borderTop: "1px solid rgba(154, 143, 128, 0.1)" }}>
          <p className="manrope" style={{ color: "var(--accent-primary)", fontSize: "10px", fontWeight: "bold" }}>SYSTEM ONLINE</p>
        </div>
      </nav>
    </>
  );
};
