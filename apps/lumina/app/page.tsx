"use client";

import { motion } from "framer-motion";
import { Button } from "@repo/ui/Button";
import { Container } from "@repo/ui/Container";
import { Arsenal } from "../components/Arsenal";
import { Relics } from "../components/Relics";
import { Chronicle } from "../components/Chronicle";
import { Signal } from "../components/Signal";
import { Chronograph } from "../components/Chronograph";
import { BottomNav } from "../components/BottomNav";
import data from "../data/portfolio.json";

export default function Home() {
  const { profile } = data;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8 } 
    }
  };

  return (
    <main>
      {/* Hero Section */}
      <header id="home" style={{ 
        position: "relative", 
        minHeight: "100vh", 
        width: "100%", 
        display: "flex", 
        flexDirection: "column", 
        alignItems: "center", 
        justifyContent: "center", 
        textAlign: "center", 
        overflow: "hidden",
        backgroundColor: "#131313"
      }}>
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <img 
            alt="Cinematic digital architect" 
            style={{ 
              width: "100%", 
              height: "100%", 
              objectFit: "cover", 
              opacity: 0.4,
              filter: "grayscale(1) contrast(1.2)",
              mixBlendMode: "luminosity"
            } as any}
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAVkBFrGx8B87HVHfz3AWK0wGwEJxhJvoFZ9GiPk1dk9nOfnWPbF3x-Q7Xu6sH0_GMMhWKFfV4LGr0X8e-FQMXXbft2BQ51Tz08vBQaaUq3yH2EHlX4sRu_hK5TNsuznYyeJVLiB1LAUbeJ0EftuN4pmn0wL6OceywS6w6Iie0KRkYkO8f5Y0p2o2bE1AjfGIz137YxRc7jHxH9ua8qb8UEAen7b71gwVe3vkclDH4R7AXLBnDuxq8GlligT1zz1NhnlMHNgwHv8AE"
          />
          <div className="hero-gradient" style={{ position: "absolute", inset: 0 }}></div>
        </div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", gap: "1rem", maxWidth: "1200px", padding: "0 1.5rem" }}
        >
          <motion.p variants={itemVariants} className="manrope" style={{ color: "var(--accent-secondary)", marginBottom: "0.5rem", fontSize: "12px", letterSpacing: "0.4em" }}>
            ACCESSING SYSTEM METADATA_01
          </motion.p>
          <motion.h1 variants={itemVariants} className="noto-serif" style={{ 
            fontSize: "clamp(3.5rem, 15vw, 9rem)", 
            lineHeight: "0.85", 
            letterSpacing: "-0.05em",
            textShadow: "0 20px 40px rgba(0,0,0,0.4)"
          }}>
            {profile.name.split(" ")[0]} <br/> <span style={{ color: "var(--accent-primary)", fontStyle: "italic" }}>{profile.name.split(" ")[1]}</span>
          </motion.h1>
          <motion.div variants={itemVariants} style={{ width: "100px", height: "1px", backgroundColor: "var(--accent-primary)", margin: "1.5rem auto", boxShadow: "0 0 10px var(--accent-primary)" }}></motion.div>
          <motion.p variants={itemVariants} className="manrope" style={{ color: "var(--text-secondary)", fontSize: "clamp(0.8rem, 2vw, 1.2rem)", letterSpacing: "0.6em", opacity: 0.8, marginBottom: "2rem" }}>
            {profile.title.toUpperCase()} <span style={{ color: "var(--accent-primary)" }}>•</span> DIGITAL ARCHITECT
          </motion.p>
          <motion.div variants={itemVariants} style={{ display: "flex", gap: "1.5rem", justifyContent: "center" }}>
            <Button variant="primary" style={{ padding: "1.25rem 3rem" }} onClick={() => document.getElementById("relics")?.scrollIntoView({ behavior: "smooth" })}>
              VIEW MY WORK
            </Button>
            <Button variant="outline" style={{ padding: "1.25rem 3rem" }} onClick={() => window.open(profile.resume_url, "_blank")}>
              DOWNLOAD CV
            </Button>
          </motion.div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: 2, duration: 1 }}
          style={{ position: "absolute", bottom: "100px", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }} 
          className="hidden-mobile"
        >
          <span className="manrope" style={{ fontSize: "10px" }}>Descend into the archive</span>
          <span className="material-symbols-outlined" style={{ animation: "bounce 2s infinite" }}>expand_more</span>
        </motion.div>
      </header>

      {/* The Archivist's Vision */}
      <section id="vision" style={{ padding: "10rem 2rem", backgroundColor: "var(--bg-primary)" }}>
        <Container size="lg">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "5rem", alignItems: "center" }}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              style={{ position: "relative" }}
            >
              <div style={{ aspectRatio: "4/5", overflow: "hidden", border: "1px solid rgba(154, 143, 128, 0.2)", position: "relative" }}>
                <img 
                  alt={profile.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(1) contrast(1.1)", transition: "all 1s ease" } as any}
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAP1Gqzm08H75RI-KSR8k6gdDNcPp7vIn-mvLzsnHgkcvRXQGaNHfPrpSi88Z_MsKRXKZOL5_2219xW-N4ii5NV2ORPpTzYCeuQ-9t7Nla35J2zKTmS60ygF0Pwy1wQOjUSV5khX3AEFB-OofdvGSBhop8tYR4n7MSIMskf6s9tn4jeeSNhkKcJSiyqQOBR132_pdzwIFD_gq-7cw_z-ivWo1Jj-EFF6xbIWFbkIIGiISdx1tS-zBtlCX4JGcgm-n6Tacm44S_qGVE"
                  onMouseOver={(e) => (e.currentTarget.style.filter = "grayscale(0) contrast(1)")}
                  onMouseOut={(e) => (e.currentTarget.style.filter = "grayscale(1) contrast(1.1)")}
                />
              </div>
              <div style={{ position: "absolute", bottom: "-32px", right: "-32px", width: "192px", height: "192px", borderRight: "1px solid rgba(233, 193, 118, 0.4)", borderBottom: "1px solid rgba(233, 193, 118, 0.4)" }}></div>
              <div style={{ position: "absolute", top: "-16px", left: "-16px", transform: "rotate(90deg)", transformOrigin: "top left", fontSize: "10px", color: "var(--accent-secondary)", opacity: 0.5, letterSpacing: "0.2em" }} className="manrope">Bio_Identifier_01</div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
            >
              <div>
                <span className="manrope" style={{ color: "var(--accent-secondary)", fontSize: "10px", letterSpacing: "0.3em" }}>IDENTIFICATION</span>
                <h3 className="noto-serif" style={{ fontSize: "2.5rem", marginTop: "0.5rem" }}>THE ARCHIVIST'S VISION</h3>
              </div>
              <p className="manrope drop-cap" style={{ color: "var(--text-secondary)", fontSize: "1.1rem", lineHeight: "1.8", textTransform: "none", letterSpacing: "normal" }}>
                {profile.bio}
              </p>
              <div style={{ padding: "1.5rem", backgroundColor: "var(--bg-surface)", borderLeft: "4px solid var(--accent-primary)" }}>
                <p className="manrope" style={{ color: "var(--text-primary)", fontStyle: "italic", textTransform: "none", letterSpacing: "normal" }}>
                  "{profile.quote}"
                </p>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      <Chronicle />
      <Arsenal />
      <Chronograph />
      <Relics />
      <Signal />
      <BottomNav />

      <style jsx>{`
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {transform: translateY(0);}
          40% {transform: translateY(-10px);}
          60% {transform: translateY(-5px);}
        }
      `}</style>
    </main>
  );
}
