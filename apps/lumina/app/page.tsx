"use client";

import { motion, Variants } from "framer-motion";
import { Button } from "@repo/ui/Button";
import { Container } from "@repo/ui/Container";
import { Arsenal } from "../components/Arsenal";
import { Relics } from "../components/Relics";
import { Chronicle } from "../components/Chronicle";
import { Signal } from "../components/Signal";
import { Chronograph } from "../components/Chronograph";
import { BottomNav } from "../components/BottomNav";
import { AuraBackground } from "../components/AuraBackground";
import data from "../data/portfolio.json";

export default function Home() {
  const { profile } = data;

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.5
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30, filter: "blur(10px)", scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      scale: 1,
      transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const revealVariants: Variants = {
    hidden: { opacity: 0, scale: 0.98, filter: "blur(8px)" },
    visible: { 
      opacity: 1, 
      scale: 1, 
      filter: "blur(0px)",
      transition: { duration: 1.5, ease: "easeOut" }
    }
  };

  return (
    <main style={{ position: "relative", scrollBehavior: "smooth" }}>
      {/* <AuraBackground /> */}
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
          className="hero-content"
          style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", gap: "1rem", maxWidth: "1200px", padding: "0 1.5rem" }}
        >
          <motion.p variants={itemVariants} className="manrope hero-meta" style={{ color: "var(--accent-secondary)", marginBottom: "0.5rem", fontSize: "12px", letterSpacing: "0.4em" }}>
            ACCESSING SYSTEM METADATA_01
          </motion.p>
          <motion.h1 variants={itemVariants} className="noto-serif hero-title" style={{
            fontSize: "clamp(3.5rem, 15vw, 9rem)",
            lineHeight: "0.85",
            letterSpacing: "-0.05em",
            textShadow: "0 20px 40px rgba(0,0,0,0.4)",
            position: "relative"
          }}>
            {/* The Magic Prism */}
            <motion.div 
               animate={{ 
                 opacity: [0.3, 0.6, 0.3],
                 rotate: [0, 360],
               }}
               transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
               style={{ 
                 position: "absolute", 
                 top: "50%", 
                 left: "50%", 
                 transform: "translate(-50%, -50%)",
                 width: "150%", 
                 height: "150%", 
                 background: "conic-gradient(from 0deg, transparent, rgba(233, 193, 118, 0.3), transparent, rgba(154, 143, 128, 0.3), transparent)",
                 pointerEvents: "none",
                 zIndex: -1,
                 filter: "blur(60px)"
               }}
            />
            {profile.name.split(" ")[0]} <br /> <span style={{ color: "var(--accent-primary)", fontStyle: "italic" }}>{profile.name.split(" ")[1]}</span>
          </motion.h1>
          <motion.div variants={itemVariants} className="hero-divider" style={{ width: "100px", height: "1px", backgroundColor: "var(--accent-primary)", margin: "1.5rem auto", boxShadow: "0 0 10px var(--accent-primary)" }}></motion.div>
          <motion.p variants={itemVariants} className="manrope hero-subtitle" style={{ color: "var(--text-secondary)", fontSize: "clamp(0.8rem, 2vw, 1.2rem)", letterSpacing: "0.6em", opacity: 0.8, marginBottom: "2rem" }}>
            <span style={{ color: "var(--accent-primary)" }}>•</span>  {profile.title.toUpperCase()} <span style={{ color: "var(--accent-primary)" }}>•</span>
          </motion.p>
          <motion.div variants={itemVariants} className="hero-actions" style={{ display: "flex", gap: "1.5rem", justifyContent: "center" }}>
            <Button variant="primary" className="hero-btn" style={{ padding: "1.25rem 3rem" }} onClick={() => document.getElementById("relics")?.scrollIntoView({ behavior: "smooth" })}>
              VIEW MY WORK
            </Button>
            <Button variant="outline" className="hero-btn" style={{ padding: "1.25rem 3rem" }} onClick={() => window.open(profile.resume_url, "_blank")}>
              DOWNLOAD CV
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: "-50%" }}
          animate={{ opacity: 0.4, x: "-50%" }}
          transition={{ delay: 2, duration: 1 }}
          style={{ 
            position: "absolute", 
            bottom: "40px", 
            left: "50%", 
            display: "flex", 
            flexDirection: "column", 
            alignItems: "center", 
            gap: "0.5rem", 
            cursor: "pointer",
            zIndex: 10
          }}
          className="hidden-mobile"
          onClick={() => document.getElementById("vision")?.scrollIntoView({ behavior: "smooth" })}
        >
          <span className="manrope" style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase" }}>Descend into the archive</span>
          <motion.span 
            className="material-symbols-outlined"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            expand_more
          </motion.span>
        </motion.div>
      </header>

      {/* The Archivist's Vision */}
      <section id="vision" style={{ padding: "10rem 2rem", backgroundColor: "#0e0e0e" }}>
        <Container size="lg">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "5rem", alignItems: "center" }}>
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
                  src="/photo.jpeg"
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

      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }
        @media (max-width: 768px) {
          main {
            padding-bottom: 80px;
          }
          .hero-title {
            line-height: 1.0 !important;
            margin-bottom: 0.5rem;
            text-align: center;
          }
          .hero-subtitle {
            letter-spacing: 0.2rem !important;
            line-height: 1.5;
            padding: 0 1rem;
            text-align: center;
          }
          .hero-divider {
            margin: 1rem auto !important;
          }
          .hero-actions {
            flex-direction: column;
            gap: 1rem !important;
            width: 100%;
            padding: 0 2rem;
            align-items: center;
          }
          .hero-actions :global(.hero-btn) {
            width: 100%;
            max-width: 300px;
            padding: 1rem 2rem !important;
          }
          #vision {
            padding: 5rem 1.5rem !important;
          }
          #vision .Container > div {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
            text-align: center !important;
          }
          #vision div[style*="flex-direction: column"] {
            align-items: center !important;
          }
        }
      `}</style>
    </main>
  );
}
