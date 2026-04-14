"use client";

import { motion } from "framer-motion";
import { Container } from "@repo/ui/Container";

export const Signal = () => {
  const handleAction = (url: string) => {
    window.open(url, "_blank");
  };

  const channels = [
    { label: "EMAIL", icon: "mail", action: "mailto:darmfma@gmail.com" },
    { label: "GITHUB", icon: "code", action: "https://github.com/DemisRincon" },
    { label: "LINKEDIN", icon: "person", action: "https://www.linkedin.com/in/demisrincon/" }
  ];

  return (
    <section id="signal" style={{ 
      padding: "15rem 0 10rem 0", 
      backgroundColor: "transparent", 
      position: "relative",
      overflow: "hidden"
    }}>
      <div style={{ 
        position: "absolute", 
        top: 0, 
        left: 0, 
        width: "100%", 
        height: "1px", 
        background: "linear-gradient(to right, transparent, rgba(233, 193, 118, 0.3), transparent)" 
      }}></div>
      
      <Container size="md" style={{ textAlign: "center", position: "relative", zIndex: 10 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="noto-serif" style={{ fontSize: "clamp(3rem, 8vw, 6rem)", marginBottom: "2rem" }}>Send a Signal</h2>
          <p className="manrope" style={{ color: "var(--text-secondary)", fontSize: "1.1rem", marginBottom: "4rem", textTransform: "none", letterSpacing: "normal", maxWidth: "600px", margin: "0 auto 4rem auto" }}>
            I am always open to new expeditions and collaborations. Reach out through the ether.
          </p>
        </motion.div>
        
        <div className="signal-channels" style={{ display: "flex", justifyContent: "center", gap: "3rem" }}>
          {channels.map((channel, index) => (
            <motion.div 
              key={channel.label} 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="signal-channel" 
              style={{ cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}
              onClick={() => handleAction(channel.action)}
            >
              <div 
                className="signal-icon"
                style={{ 
                  width: "64px", 
                  height: "64px", 
                  borderRadius: "50%", 
                  border: "1px solid rgba(233, 193, 118, 0.2)", 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center",
                  transition: "all 0.5s ease"
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: "1.5rem", color: "var(--accent-primary)" }}>
                  {channel.icon}
                </span>
              </div>
              <span className="manrope" style={{ fontSize: "10px", opacity: 0.6 }}>{channel.label}</span>
            </motion.div>
          ))}
        </div>
      </Container>
      
      <style jsx>{`
        .signal-channel:hover .signal-icon {
          background: rgba(233, 193, 118, 0.1);
          box-shadow: 0 0 20px rgba(233, 193, 118, 0.2);
          border-color: var(--accent-primary);
        }
        .signal-channel:hover span {
          opacity: 1;
        }
        @media (max-width: 768px) {
          #signal {
            padding: 8rem 0 6rem 0 !important;
          }
          .signal-channels {
            gap: 1.5rem !important;
          }
          .signal-icon {
            width: 48px !important;
            height: 48px !important;
          }
        }
      `}</style>
    </section>
  );
};
