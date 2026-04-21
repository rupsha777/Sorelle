"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";

// Product Data
const products = [
  { id: 2, name: "Aurora Solitaire Ring", price: "$12,500", desc: "A singular brilliant-cut diamond suspended in platinum, radiating eternal grace.", x: "20%", y: "30%" },
  { id: 3, name: "Veloura Bracelet", price: "$8,900", desc: "Interlocking links of 18k white gold, capturing the essence of modern sophistication.", x: "50%", y: "20%" },
  { id: 1, name: "Elysian Necklace", price: "$24,000", desc: "Cascading pear-cut diamonds set in a timeless silhouette, a masterpiece of light.", x: "75%", y: "40%" },
  { id: 4, name: "Starlight Ring", price: "$15,200", desc: "A dual-halo setting that amplifies the inner brilliance, a true statement of luxury.", x: "35%", y: "70%" },
  { id: 6, name: "Lumina Drop Earrings", price: "$18,500", desc: "Exquisite teardrop diamonds framed in delicate pavé, illuminating your every movement.", x: "65%", y: "75%" }
];

export default function Page() {
  const [startExit, setStartExit] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [carouselReady, setCarouselReady] = useState(false);

  // Navigation State
  const [activeIndex, setActiveIndex] = useState(2); // For Hero Carousel
  const [stage, setStage] = useState(0); // 0=Scattered/Timeline, 1=Immersive Center, 2=Detail Split
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // Hover state for Artistry section
  const [artistryHovered, setArtistryHovered] = useState(false);

  // Global Mouse for Cursor
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [cursorHovered, setCursorHovered] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setMouse({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  useEffect(() => {
    const t1 = setTimeout(() => setStartExit(true), 2500);
    const t2 = setTimeout(() => setShowContent(true), 3200);
    const t3 = setTimeout(() => setCarouselReady(true), 3600);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  const handleNextProduct = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % products.length);
    }
  };

  const handlePrevProduct = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + products.length) % products.length);
    }
  };

  // The Immersive & Detail Stage overlay
  const renderCollectionSceneOverlay = () => {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
        onClick={() => {
          if (stage === 1) setStage(2);
        }}
      >
        {/* Animated luxury gradient background */}
        <motion.div
          animate={stage === 1 ? { scale: 1, opacity: 1 } : { scale: [1, 1.1, 1], opacity: [0.3, 0.4, 0.3] }}
          transition={stage === 1 ? { duration: 0.8 } : { duration: 15, repeat: Infinity, ease: "linear" }}
          style={{
            position: "absolute",
            width: "150%",
            height: "150%",
            background: stage === 1
              ? "linear-gradient(135deg, #a0a0a0 0%, #e0e0e0 40%, #c5c5c5 100%)"
              : "radial-gradient(circle at center, rgba(230,220,250,0.5) 0%, rgba(255,255,255,1) 60%)",
            pointerEvents: "none",
            zIndex: 0
          }}
        />

        {/* Floating Items Background (when stage 1 or 2) */}
        {products.map((item, index) => {
          const isSelected = index === selectedIndex;

          return (
            <motion.div
              key={item.id}
              initial={false}
              animate={{
                x: isSelected
                  ? (stage === 2 ? "25vw" : "0vw")
                  : (stage === 1 ? (index - (selectedIndex || 0)) * 300 : (index - (selectedIndex || 0)) * 300),
                y: isSelected ? 0 : (index % 2 === 0 ? -200 : 200),
                width: isSelected && stage === 1 ? "90vw" : "180px",
                height: isSelected && stage === 1 ? "85vh" : "260px",
                marginTop: isSelected && stage === 1 ? "-42.5vh" : "-130px",
                marginLeft: isSelected && stage === 1 ? "-45vw" : "-90px",
                borderRadius: isSelected && stage === 1 ? "30px" : "15px",
                scale: isSelected ? (stage === 1 ? 1 : 1.6) : 0.5,
                opacity: isSelected ? 1 : 0.1,
                filter: isSelected ? "blur(0px)" : "blur(10px)",
                zIndex: isSelected ? 20 : 1,
              }}
              transition={{
                duration: 1.2,
                ease: [0.22, 1, 0.36, 1],
              }}
              onClick={(e) => {
                if (isSelected && stage === 1) {
                  e.stopPropagation();
                  setStage(2);
                } else if (!isSelected) {
                  e.stopPropagation();
                  setSelectedIndex(index);
                  setStage(1);
                }
              }}
              onHoverStart={() => setCursorHovered(true)}
              onHoverEnd={() => setCursorHovered(false)}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                overflow: "hidden",
                boxShadow: (isSelected && stage === 1) ? "0 50px 150px rgba(0,0,0,0.5)" : (isSelected ? "0 40px 150px rgba(0,0,0,0.2)" : "none"),
                cursor: "none"
              }}
            >
              <motion.img
                src={`/jewelry/${item.id}.jpg`}
                alt={item.name}
                initial={{ scale: 1, filter: "brightness(1)" }}
                animate={{
                  scale: (isSelected && stage === 1) ? 1.08 : 1,
                  x: (isSelected && stage === 1) ? (typeof window !== "undefined" ? (mouse.x - window.innerWidth / 2) * -0.04 : 0) : 0,
                  y: (isSelected && stage === 1) ? (typeof window !== "undefined" ? (mouse.y - window.innerHeight / 2) * -0.04 : 0) : 0,
                  filter: (isSelected && stage === 1) ? "brightness(0.5)" : "brightness(1)",
                }}
                whileHover={{
                  filter: (isSelected && stage === 1) ? "brightness(1.05)" : "brightness(1)",
                }}
                transition={{
                  scale: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
                  filter: { duration: 0.8, ease: "easeOut" },
                  x: { type: "spring", stiffness: 30, damping: 20 },
                  y: { type: "spring", stiffness: 30, damping: 20 },
                }}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </motion.div>
          );
        })}

        {/* Stage 1: Centered Name Overlay */}
        <AnimatePresence>
          {stage === 1 && selectedIndex !== null && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{
                position: "absolute",
                right: "10vw",
                top: "30vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                zIndex: 30,
                pointerEvents: "none",
                gap: "35px"
              }}
            >
              {(() => {
                const parts = products[selectedIndex].name.split(" ");
                const last = parts.pop();
                const first = parts.join(" ");

                return (
                  <div style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "baseline",
                    justifyContent: "flex-end",
                    flexWrap: "wrap",
                    gap: "15px",
                    maxWidth: "50vw",
                    textAlign: "right"
                  }}>
                    <span style={{
                        fontFamily: "'Caveat', 'Dancing Script', 'Brush Script MT', cursive",
                        fontSize: "clamp(2rem, 4vw, 4rem)",
                        color: "#fff",
                        textShadow: "0 4px 20px rgba(0,0,0,0.5)"
                    }}>
                        {first}
                    </span>
                    <span style={{
                        fontFamily: "serif",
                        fontSize: "clamp(2.5rem, 4.5vw, 4.5rem)",
                        color: "#fff",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        textShadow: "0 4px 20px rgba(0,0,0,0.5)"
                    }}>
                        {last}
                    </span>
                  </div>
                );
              })()}

              {/* Bottom Right Click To Explore */}
              <div
                style={{
                  backgroundColor: "rgba(220, 220, 220, 0.9)",
                  padding: "12px 30px",
                  borderRadius: "30px",
                  display: "inline-block",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.3)"
                }}
              >
                <p style={{ 
                    fontFamily: "serif", 
                    fontSize: "0.9rem", 
                    letterSpacing: "0.15em", 
                    fontWeight: 700, 
                    color: "#000",
                    margin: 0,
                    textTransform: "uppercase" 
                }}>
                  CLICK TO EXPLORE
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stage 2: Detailed Panel (Slides from Left) */}
        <AnimatePresence>
          {stage === 2 && selectedIndex !== null && (
            <motion.div
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: "0%", opacity: 1 }}
              exit={{ x: "-50%", opacity: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                width: "45vw",
                height: "100%",
                background: "linear-gradient(to right, rgba(255,255,255,0.95) 0%, rgba(245,250,255,0.8) 100%)",
                backdropFilter: "blur(20px)",
                zIndex: 30,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                padding: "0 8vw",
                color: "#000",
              }}
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking panel
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                <div style={{ fontSize: "0.8rem", letterSpacing: "0.3em", color: "#555", marginBottom: "20px" }}>
                  COLLECTION {new Date().getFullYear()}
                </div>
                <h2 style={{ fontFamily: "serif", fontSize: "clamp(2rem, 4vw, 4rem)", fontWeight: 300, marginBottom: "30px", lineHeight: 1.1 }}>
                  {products[selectedIndex].name}
                </h2>
                <p style={{ color: "#333", fontSize: "1.1rem", lineHeight: 1.8, marginBottom: "40px", maxWidth: "400px" }}>
                  {products[selectedIndex].desc}
                </p>
                <div style={{ fontSize: "1.5rem", fontFamily: "serif", marginBottom: "40px" }}>
                  {products[selectedIndex].price}
                </div>

                <button
                  onMouseEnter={() => setCursorHovered(true)}
                  onMouseLeave={() => setCursorHovered(false)}
                  style={{
                    padding: "16px 40px",
                    background: "#000",
                    color: "#fff",
                    border: "none",
                    borderRadius: "30px",
                    fontSize: "0.9rem",
                    letterSpacing: "0.1em",
                    cursor: "none",
                    textTransform: "uppercase",
                    fontWeight: 500,
                    transition: "all 0.3s ease",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                  }}
                  onMouseOver={(e) => {
                    (e.target as HTMLButtonElement).style.transform = "scale(1.05)";
                    (e.target as HTMLButtonElement).style.boxShadow = "0 15px 40px rgba(0,0,0,0.2)";
                  }}
                  onMouseOut={(e) => {
                    (e.target as HTMLButtonElement).style.transform = "scale(1)";
                    (e.target as HTMLButtonElement).style.boxShadow = "0 10px 30px rgba(0,0,0,0.1)";
                  }}
                >
                  Add to Collection
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Global Navigation Arrows (Visible in Stage 2) */}
        <AnimatePresence>
          {stage === 2 && (
            <>
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.5 }}
                onClick={handlePrevProduct}
                onMouseEnter={() => setCursorHovered(true)}
                onMouseLeave={() => setCursorHovered(false)}
                style={{
                  position: "absolute",
                  left: "3vw",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "transparent",
                  border: "none",
                  color: "#000",
                  fontSize: "3rem",
                  cursor: "none",
                  zIndex: 40,
                  opacity: 0.5,
                  transition: "opacity 0.3s"
                }}
                onMouseOver={(e) => (e.target as HTMLElement).style.opacity = "1"}
                onMouseOut={(e) => (e.target as HTMLElement).style.opacity = "0.5"}
              >
                ‹
              </motion.button>
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.5 }}
                onClick={handleNextProduct}
                onMouseEnter={() => setCursorHovered(true)}
                onMouseLeave={() => setCursorHovered(false)}
                style={{
                  position: "absolute",
                  right: "3vw",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "transparent",
                  border: "none",
                  color: "#000",
                  fontSize: "3rem",
                  cursor: "none",
                  zIndex: 40,
                  opacity: 0.5,
                  transition: "opacity 0.3s"
                }}
                onMouseOver={(e) => (e.target as HTMLElement).style.opacity = "1"}
                onMouseOut={(e) => (e.target as HTMLElement).style.opacity = "0.5"}
              >
                ›
              </motion.button>
            </>
          )}
        </AnimatePresence>

        {/* Close button (global overlay) */}
        <AnimatePresence>
          {stage > 0 && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={(e) => { e.stopPropagation(); setStage(0); }}
              onMouseEnter={() => setCursorHovered(true)}
              onMouseLeave={() => setCursorHovered(false)}
              style={{
                position: "absolute",
                top: stage === 1 ? "2.5vh" : "4vw",
                right: stage === 1 ? "5vw" : "4vw",
                background: stage === 1 ? "rgba(0, 0, 0, 0.4)" : "transparent",
                color: stage === 1 ? "#fff" : "#000",
                padding: stage === 1 ? "8px 28px" : "0",
                borderRadius: stage === 1 ? "30px" : "0",
                border: stage === 1 ? "1px solid rgba(255,255,255,0.1)" : "none",
                fontSize: stage === 1 ? "0.7rem" : "1.5rem",
                fontWeight: stage === 1 ? 600 : "normal",
                cursor: "none",
                zIndex: 40,
                letterSpacing: "0.2em",
                fontFamily: "sans-serif",
                backdropFilter: stage === 1 ? "blur(10px)" : "none",
                textTransform: "uppercase"
              }}
            >
              CLOSE
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundColor: "#fff",
        color: "#000",
        overflow: "hidden",
        cursor: "none", // Custom cursor applies globally
        height: "100vh",
        width: "100vw"
      }}
    >
      {/* CUSTOM CURSOR */}
      <motion.div
        animate={{
          x: mouse.x - (cursorHovered ? 25 : 8),
          y: mouse.y - (cursorHovered ? 25 : 8),
          scale: cursorHovered ? 1.5 : 1,
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.15 }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: cursorHovered ? 50 : 16,
          height: cursorHovered ? 50 : 16,
          borderRadius: "50%",
          backgroundColor: cursorHovered ? "rgba(255,255,255,0.1)" : "#fff",
          border: cursorHovered ? "1px solid rgba(255,255,255,0.5)" : "none",
          pointerEvents: "none",
          zIndex: 9999,
          mixBlendMode: "difference"
        }}
      />

      {/* INTRO SPLASH SCREEN */}
      <div
        style={{
          position: "fixed",
          top: 0, left: 0, width: "100%", height: "100%",
          display: "flex",
          placeItems: "center",
          backgroundColor: "#000",
          backgroundImage: "url('/jewelry/5.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: 1,
          pointerEvents: showContent ? "none" : "all"
        }}
      >
        <motion.div
          animate={{
            opacity: showContent ? 0 : 1,
            pointerEvents: "none"
          }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center", position: "relative" }}
        >
          {/* Top Left Logo */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: startExit ? 0 : 1 }}
            transition={{ duration: 1 }}
            style={{
              position: "absolute",
              top: "40px",
              left: "40px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              color: "#fff",
              fontFamily: "sans-serif",
              fontSize: "1.2rem",
              fontWeight: 500
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ display: "block" }}>
              <path d="M12 2L2 8L12 22L22 8L12 2Z" />
              <path d="M2 8H22" />
              <path d="M12 2L8 8L12 22" />
              <path d="M12 2L16 8L12 22" />
            </svg>
            Sorelle
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40, scale: 1.1 }}
            animate={{
              opacity: startExit ? 0 : 1,
              y: startExit ? -50 : 0,
              scale: startExit ? 0.9 : 1,
            }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontSize: "clamp(4rem, 10vw, 9rem)",
              fontFamily: "sans-serif",
              fontWeight: 400,
              color: "#fff",
              letterSpacing: "0.02em",
              textShadow: "0 10px 40px rgba(0,0,0,0.3)"
            }}
          >
            Sorelle
          </motion.h1>
        </motion.div>
      </div>

      {/* TIMELINE BASED SCROLL CONTAINER */}
      <motion.div
        initial={{ y: "100vh" }}
        animate={{ y: showContent ? "0vh" : "100vh" }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "fixed",
          top: 0, left: 0,
          width: "100%", height: "100%",
          zIndex: 5,
          overflowY: stage > 0 ? "hidden" : "auto", // lock scroll in focused stages
          scrollSnapType: "y mandatory",
          scrollBehavior: "smooth"
        }}
      >
        {/* HERO SECTION */}
        <section
          style={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "0 8vw",
            position: "relative",
            scrollSnapAlign: "start",
            overflow: "hidden",
            backgroundColor: "#f7f5f0", // Ensures fallback mapping covers global 5.jpg
          }}
        >
          {/* Seamless infinitely flowing background */}
          <motion.div
            animate={{ x: ["-50%", "0%"] }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "200%",
              height: "100%",
              backgroundImage: "url('/jewelry/8.jpg')",
              backgroundSize: "50% 100%",
              backgroundRepeat: "repeat-x",
              zIndex: 0,
              pointerEvents: "none",
            }}
          />

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "40px",
              zIndex: 2,
              position: "relative",
            }}
          >
            {/* LEFT TEXT */}
            <motion.div
              initial={{ x: -80, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
            >
              <h1
                style={{
                  fontSize: "clamp(2.5rem, 5vw, 4rem)",
                  fontWeight: 300,
                  fontFamily: "serif",
                  lineHeight: 1.2
                }}
              >
                For the <br />
                <span style={{ fontWeight: 600, fontStyle: "italic", color: "#333" }}>
                  WOMAN YOU ARE
                </span>
              </h1>
            </motion.div>

            {/* RIGHT TEXT */}
            <motion.div
              initial={{ x: 80, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              style={{
                maxWidth: "420px",
                fontSize: "clamp(1.1rem, 1.4vw, 1.3rem)",
                lineHeight: "1.8",
                color: "#555",
              }}
            >
              We create pieces that mirror your strength and elegance —
              designed to feel seen, refined, and timeless.
            </motion.div>
          </div>

          {/* FLUID CAROUSEL */}
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            viewport={{ once: true }}
            style={{
              marginTop: "8vh",
              position: "relative",
              height: "35vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 2,
            }}
          >
            {products.map((item, index) => {
              const isHovered = index === activeIndex;

              return (
                <motion.div
                  key={index}
                  onHoverStart={() => { setActiveIndex(index); setCursorHovered(true); }}
                  onHoverEnd={() => setCursorHovered(false)}
                  onClick={() => {
                    setSelectedIndex(index);
                    setStage(1);
                  }}
                  animate={{
                    x: carouselReady ? (index - activeIndex) * 160 : 0,
                    scale: carouselReady
                      ? index === activeIndex ? 1.2 : 0.85
                      : 0.5,
                    opacity: carouselReady ? (index === activeIndex ? 1 : 0.4) : 0,
                    zIndex: index === activeIndex ? 10 : 1,
                    rotateY: carouselReady ? (index - activeIndex) * parseInt("-15") : 0,
                  }}
                  transition={{
                    duration: 0.8,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={{
                    position: "absolute",
                    width: "200px",
                    height: "300px",
                    borderRadius: "15px",
                    overflow: "hidden",
                    border: isHovered ? "1px solid rgba(0,0,0,0.1)" : "1px solid transparent",
                    boxShadow: isHovered
                      ? "0 20px 60px rgba(0,0,0,0.15), 0 0 30px rgba(0,0,0,0.05)"
                      : "0 10px 30px rgba(0,0,0,0.1)",
                    transformStyle: "preserve-3d",
                    cursor: "none"
                  }}
                >
                  <img
                    src={`/jewelry/${item.id}.jpg`}
                    alt={item.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform 0.5s ease",
                      transform: isHovered ? "scale(1.05)" : "scale(1)"
                    }}
                  />
                  {/* Subtle overlay */}
                  <div style={{
                    position: "absolute", inset: 0,
                    background: isHovered ? "transparent" : "rgba(255,255,255,0.6)",
                    transition: "background 0.5s ease"
                  }} />
                </motion.div>
              );
            })}
          </motion.div>
        </section>

        {/* COLLECTION SHOWCASE */}
        <section
          style={{
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            scrollSnapAlign: "start",
            position: "relative",
            backgroundColor: "#f7f5f0", // Masks the global background image
            overflow: "hidden", // Contains the animated gradient
          }}
        >
          {/* Left half: Text & Animated Gradient */}
          <div style={{
            width: "50%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "0 8vw",
            position: "relative",
            zIndex: 2,
            overflow: "hidden", // Ensures the flowing gradient effect stays within bounds
          }}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              style={{ zIndex: 3 }}
            >
              <h2 style={{ fontSize: "clamp(2.5rem, 4vw, 4rem)", fontFamily: "serif", marginBottom: "40px", fontWeight: 300, color: "#111" }}>
                Artistry and Vision
              </h2>
              <p style={{ color: "#444", lineHeight: 1.8, fontSize: "1.1rem", maxWidth: "500px" }}>
                Every curve, every facet is meticulously shaped to reflect the pinnacle of fine jewelry making.
                Our craftsmen dedicate hundreds of hours to a single piece, blending heritage techniques with modern minimalism.
              </p>
            </motion.div>

            {/* Smooth endless flowing animation from left to right */}
            <motion.div
              animate={{ x: ["-50%", "0%"] }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "200%", // Double width for seamless loop
                height: "100%",
                backgroundImage: "url('/jewelry/8.png')",
                backgroundSize: "50% 100%", // Fits one copy perfectly in the parent
                backgroundRepeat: "repeat-x",
                zIndex: 1,
                pointerEvents: "none",
              }}
            />
          </div>

          {/* Right half: Image & Video Hover */}
          <div
            style={{
              width: "50%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onMouseEnter={() => { setArtistryHovered(true); setCursorHovered(true); }}
            onMouseLeave={() => { setArtistryHovered(false); setCursorHovered(false); }}
          >
            <div style={{
              position: "relative",
              width: "85%",
              height: "80%",
              borderRadius: "30px",
              overflow: "hidden",
              boxShadow: "0 20px 60px rgba(0,0,0,0.1)",
            }}>
              {/* Background Image */}
              <img
                src="/jewelry/7.jpg"
                alt="Artistry and Vision"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  position: "absolute",
                  inset: 0,
                  opacity: artistryHovered ? 0 : 1,
                  transition: "opacity 0.6s ease"
                }}
              />
              {/* Hover Video Placeholder - Insert your video path in the src below */}
              <video
                src="/jewelry/video.mp4"
                autoPlay
                muted
                loop
                playsInline
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  position: "absolute",
                  inset: 0,
                  opacity: artistryHovered ? 1 : 0,
                  transition: "opacity 0.6s ease"
                }}
              />
            </div>
          </div>
        </section>

        {/* OUR COLLECTION SECTION (Replacing Brand Story) */}
        <section
          style={{
            height: "100vh",
            position: "relative",
            scrollSnapAlign: "start",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "8vh 8vw",
            backgroundColor: "#f7f5f0",
          }}
        >
          {/* Moving background same as Hero */}
          <motion.div
            animate={{ x: ["-50%", "0%"] }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "200%",
              height: "100%",
              backgroundImage: "url('/jewelry/8.jpg')",
              backgroundSize: "50% 100%",
              backgroundRepeat: "repeat-x",
              zIndex: 0,
              pointerEvents: "none",
            }}
          />

          {/* Header Row */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", zIndex: 1, position: "relative" }}>
            <h2 style={{ fontSize: "clamp(2rem, 5vw, 4rem)", fontFamily: "var(--font-serif)", fontWeight: 300, letterSpacing: "0.1em", textTransform: "uppercase", color: "#111" }}>
              ACCESSORIES
            </h2>
            <div style={{ display: "flex", gap: "10px", alignItems: "baseline" }}>
              <span style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)", fontFamily: "var(--font-serif)", fontWeight: 300, color: "#111" }}>Our</span>
              <span style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", fontFamily: "var(--font-serif)", fontStyle: "italic", marginLeft: "10px", color: "#111" }}>Collection</span>
            </div>
          </div>

          {/* Grid Row */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "2vw",
            zIndex: 1,
            position: "relative",
            flex: 1,
            maxHeight: "55vh",
            margin: "40px 0"
          }}>
            {[1, 2, 3].map((num) => (
              <motion.div
                key={num}
                whileHover={{ scale: 1.05, y: -15, boxShadow: "0 25px 50px rgba(0,0,0,0.15)" }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                style={{
                  position: "relative",
                  width: "100%",
                  height: "100%",
                  overflow: "hidden",
                  borderRadius: "4px",
                  background: "#eee",
                  cursor: "none"
                }}
                onMouseEnter={() => setCursorHovered(true)}
                onMouseLeave={() => setCursorHovered(false)}
              >
                <img
                  src={`/jewelry/coll_${num}.png`}
                  alt={`Collection item ${num}`}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </motion.div>
            ))}
          </div>

          {/* Bottom Text Row */}
          <div style={{ zIndex: 1, position: "relative" }}>
            <p style={{
              maxWidth: "1000px",
              fontSize: "1.1rem",
              lineHeight: 1.8,
              color: "#333",
              background: "rgba(255,255,255,0.1)",
              backdropFilter: "blur(10px)",
              padding: "20px",
              borderRadius: "2px",
              borderLeft: "2px solid #111"
            }}>
              <strong>Sorelle</strong> was founded on a singular belief: true luxury is quiet. It doesn't shout; it speaks softly, demanding closer inspection.
              Our materials are ethically sourced, our designs are uncompromising, and our vision is eternal.
            </p>
          </div>
        </section>

        {/* FOOTER / CONTACT */}
        <section
          style={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            scrollSnapAlign: "start",
            borderTop: "1px solid rgba(0,0,0,0.05)"
          }}
        >
          <h2 style={{ fontSize: "2rem", fontFamily: "serif", marginBottom: "20px", color: "#333" }}>Join The Inner Circle</h2>
          <div style={{ display: "flex", gap: "20px", marginTop: "30px" }}>
            <input
              type="email"
              placeholder="Email Address"
              style={{
                background: "transparent", border: "none", borderBottom: "1px solid #555",
                padding: "10px 20px", color: "#000", width: "300px", outline: "none", fontSize: "1rem",
                cursor: "none"
              }}
              onMouseEnter={() => setCursorHovered(true)}
              onMouseLeave={() => setCursorHovered(false)}
            />
            <button
              onMouseEnter={() => setCursorHovered(true)}
              onMouseLeave={() => setCursorHovered(false)}
              style={{
                background: "#000", color: "#fff", border: "none", padding: "10px 30px", borderRadius: "30px",
                cursor: "none", fontWeight: 600, textTransform: "uppercase", fontSize: "0.8rem", letterSpacing: "0.1em"
              }}
            >
              Subscribe
            </button>
          </div>
          <div style={{ marginTop: "100px", color: "#888", fontSize: "0.9rem", letterSpacing: "0.2em" }}>
            © {new Date().getFullYear()} SORELLE. ALL RIGHTS RESERVED.
          </div>
        </section>
      </motion.div>

      {/* OVERLAY STAGES (IMMERSIVE & DETAILED) */}
      <AnimatePresence>
        {stage > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "rgba(240,240,245,0.9)", // slightly see through to the timeline below
              backdropFilter: "blur(30px)",
              zIndex: 20,
              overflow: "hidden",
            }}
          >
            {renderCollectionSceneOverlay()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}