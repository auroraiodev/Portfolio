"use client";

import { motion } from "framer-motion";
import { Container } from "@repo/ui/Container";

const RELICS = [
  {
    title: "Smart Point Cloud",
    description: "Autonomous 3D mapping interface for complex architectural archives.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuACe9d5WZHywtetJjRYmvIXzyzTIBDHJgq2zTCqmxxMHH_XReQ_B4Fz65StKvVnmx64IRkoV-e68OIecMd3QEapFI9HEnZyMQlJyaMCa0pnVp7UitXxSg6aWH5jrWM3pywabAw5ZdVAxTwdpiWOHiE3LKDCLkSB1qDG-yrrnUcWWtxj0exS09Srec0jSKHyG_LEB0FIgwxB1yYUTEAcMdxCK-skhtRaL2Ek0494Sov-QAGg5HGgyFOWmELDw5zwcsdzVlSR7HiWAjY",
    offset: false
  },
  {
    title: "PMG Web Page",
    description: "Editorial web experience for a luxury digital production house.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCur_oADTX3GVLi9bB8_9650Jg-BZvZiRvQjvgg3cdakVZ7IJrj7GnATQ1tbMf1M98KAYbBz1FW9Ik_41RfyRnf6RGjDiaPUf68i_0w8AOQWI-YX3hcX-Wi5LtTZWn1jpGKLnrUyVmJVeI8yKDKi0V2_iTUp35aiKK6OyucafqZGz7ZwDwaYHihqhT2sucRWHa9eAnmXxHqNDgC9CbSMNwB7QjjQh-WlwRoFAeibmeLoFiIN_VtnyY8Kx4BQdxjCAbi3aC0Gz8oovY",
    offset: true
  },
  {
    title: "Neural Engine",
    description: "Interactive dashboard for monitoring real-time generative data streams.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC3O6wAscCXtco09U4YCVelBdePlp0L4I9l8wioj55DraSN2aPd00efuGK3lCDoTrwufitx5pvd332OhCv-8qx7tPx7CRHUkoNkMVTXHGo870aJhKp84kzcV05dpgySvqjuRW-YrhbXC6dbex2cLTdGHt32pHpCBd09nnF-dgVpbXCmQpQgYvQz9Kp77cr12rZC7grYGksoPvyYHwSTESF3XzLdRVqAA4ljfILdXKsOGuSAyyxfukKyr3XmqXXJAqsbRZcaBp8QYyM",
    offset: false
  }
];

export const Relics = () => {
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
          {RELICS.map((relic, index) => (
            <motion.div 
              key={relic.title} 
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2, ease: "easeOut" }}
              className={`relic-card ${relic.offset ? 'offset-card' : ''}`}
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
        </div>
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
