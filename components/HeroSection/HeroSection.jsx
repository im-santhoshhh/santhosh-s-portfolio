"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { motion } from "framer-motion";
import profile from "@/data/profile";

const HeroSection = () => {
  const sectionRef = useRef(null);
  const videoContainerRef = useRef(null);
  const videoRef = useRef(null);
  const loaderRef = useRef(null);
  const [loaderDone, setLoaderDone] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentText, setCurrentText] = useState("சந்தோஷ் சி");

  useEffect(() => {
    if (typeof window === "undefined") return;

    document.body.style.overflow = "hidden";

    // Initial hidden state setup for background video (slightly scaled up to ease in)
    gsap.set(videoContainerRef.current, { autoAlpha: 0, scale: 1.05 });

    const tl = gsap.timeline({
      onComplete: () => {
        setLoaderDone(true);
        document.body.style.overflow = "";
      },
    });

    // Loader slide up reveal
    tl.to(
      loaderRef.current,
      {
        y: "-100%",
        duration: 1.1,
        ease: "power3.out",
      },
      "start+=3.0"
    );

    // Background video reveal (fade & scale down to 1)
    tl.to(
      videoContainerRef.current,
      {
        autoAlpha: 1,
        scale: 1,
        duration: 1.2,
        ease: "power2.out",
      },
      "start+=3.2"
    );

    // Timeout-based interactive name transitions: first சந்தோஷ் சி, then Santhosh S Portfolio
    const t1 = setTimeout(() => setCurrentText("Santhosh S Portfolio"), 1500);

    return () => {
      tl.kill();
      clearTimeout(t1);
      document.body.style.overflow = "";
    };
  }, []);

  const handleScrollToWork = (e) => {
    e.preventDefault();
    const target = document.getElementById("projects-section") || document.getElementById("about");
    if (target) {
      const lenis = window.__lenis;
      if (lenis && typeof lenis.scrollTo === "function") {
        lenis.scrollTo(target, { offset: 0, duration: 1.4 });
      } else {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleScrollToAbout = (e) => {
    e.preventDefault();
    const target = document.getElementById("about");
    if (target) {
      const lenis = window.__lenis;
      if (lenis && typeof lenis.scrollTo === "function") {
        lenis.scrollTo(target, { offset: 0, duration: 1.4 });
      } else {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
      window.dispatchEvent(
        new CustomEvent("hero-video-state", { detail: { isPlaying: false } })
      );
    } else {
      videoRef.current.muted = false;
      videoRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          window.dispatchEvent(
            new CustomEvent("hero-video-state", { detail: { isPlaying: true } })
          );
        })
        .catch(() => {
          // If unmuted autoplay blocked by browser policy, fallback to muted
          videoRef.current.muted = true;
          videoRef.current
            .play()
            .then(() => {
              setIsPlaying(true);
              window.dispatchEvent(
                new CustomEvent("hero-video-state", { detail: { isPlaying: true } })
              );
            })
            .catch((err) => console.log("Video playback failed:", err));
        });
    }
  };

  // Framer Motion reveal variants (triggered once loader is finished)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 2.2, // starts after loader slides up
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  return (
    <>
      {/* Loader Overlay */}
      <div
        id="loader"
        ref={loaderRef}
        style={{
          backgroundColor: "#111111",
          zIndex: 100002,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: loaderDone ? "none" : "auto",
          visibility: loaderDone ? "hidden" : "visible",
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-center justify-center text-center px-4"
        >
          {/* Logo Sketch Avatar */}
          <img
            src="/avatar-logo.jpg"
            alt="Logo"
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border border-white/10 mb-6 object-cover shadow-lg"
          />

          {/* Language Text Animating */}
          <div className="h-10 flex items-center justify-center overflow-hidden">
            <motion.div
              key={currentText}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="text-[#F5F1EA] text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-widest uppercase"
              style={{ fontFamily: "'Neue Montreal', 'Inter', sans-serif" }}
            >
              {currentText}
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Hero Section Container */}
      <section
        id="hero-section"
        ref={sectionRef}
        className="relative w-full h-screen min-h-[600px] overflow-hidden select-none transition-colors duration-300"
        style={{
          backgroundColor: "var(--color-bg)",
          color: "var(--color-text)",
        }}
      >
        {/* Background Video */}
        <div
          ref={videoContainerRef}
          onClick={() => {
            if (isPlaying) togglePlay();
          }}
          className={`absolute inset-0 w-full h-full z-0 overflow-hidden bg-black ${
            isPlaying ? "cursor-pointer" : ""
          }`}
        >
          <video
            ref={videoRef}
            src="/hero-bg-video.mp4"
            loop={false}
            playsInline
            preload="auto"
            onEnded={() => {
              setIsPlaying(false);
              if (videoRef.current) {
                videoRef.current.currentTime = 0;
              }
              window.dispatchEvent(
                new CustomEvent("hero-video-state", { detail: { isPlaying: false } })
              );
            }}
            className="w-full h-full object-cover object-center"
          />
          {/* Subtle cinematic gradient overlay to ground the video - fades out while playing for 100% clarity */}
          <div
            className={`absolute inset-0 pointer-events-none bg-gradient-to-t from-black/50 via-transparent to-black/20 transition-opacity duration-500 ${
              isPlaying ? "opacity-0" : "opacity-100"
            }`}
          />
        </div>

        {/* Content Card Overlay */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={loaderDone ? (isPlaying ? "hidden" : "visible") : "hidden"}
          className={`absolute bottom-4 left-4 right-4 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 sm:left-10 lg:left-20 z-10 max-w-[490px] flex flex-col items-start text-left bg-white/95 dark:bg-[#0c0d12]/95 p-4 sm:p-7 rounded-2xl sm:rounded-3xl border border-black/10 dark:border-white/10 backdrop-blur-md shadow-2xl transition-all duration-500 ${
            isPlaying
              ? "opacity-0 translate-y-8 pointer-events-none scale-95"
              : "opacity-100 translate-y-0 pointer-events-auto scale-100"
          }`}
        >
          {/* Card Top Row: Eyebrow + Play Video Button */}
          <div className="w-full flex items-center justify-between gap-3 mb-1.5 sm:mb-2">
            <motion.span
              variants={itemVariants}
              className="text-[10px] sm:text-xs font-semibold tracking-[0.22em] text-fg-muted uppercase"
              style={{ fontFamily: "'Neue Montreal', 'Inter', sans-serif" }}
            >
              HELLO, I&apos;M SANTHOSH S
            </motion.span>

            {/* Play Video Button docked in the top-right of the card */}
            <motion.button
              variants={itemVariants}
              onClick={(e) => {
                e.stopPropagation();
                togglePlay();
              }}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-fg text-bg hover:opacity-85 active:scale-95 transition-all text-[10px] sm:text-[11px] font-bold tracking-wider uppercase shadow-sm cursor-pointer"
              style={{ fontFamily: "'Neue Montreal', 'Inter', sans-serif" }}
              title="Play Video"
              aria-label="Play Video"
            >
              <svg viewBox="0 0 24 24" className="w-3 h-3 fill-current translate-x-[0.5px]">
                <path d="M8 5v14l11-7z" />
              </svg>
              <span>Play Video</span>
            </motion.button>
          </div>
          
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-1.5 mb-2.5 sm:mb-5"
          >
            <div className="w-10 sm:w-12 h-[1.5px] bg-fg/20" />
            <div className="w-1.5 h-1.5 rounded-full bg-accent" />
          </motion.div>
          
          <motion.h1
            variants={itemVariants}
            className="text-2xl sm:text-4xl lg:text-[3rem] font-black uppercase leading-[1.08] sm:leading-[1.05] tracking-tight text-fg mb-2 sm:mb-3"
            style={{ fontFamily: "'AeonikBold', 'Neue Montreal', sans-serif" }}
          >
            DATA ANALYST <br />
            &amp; BUSINESS <br />
            <span className="text-fg-muted font-bold">ANALYST</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-xs sm:text-sm text-fg-muted leading-relaxed mb-3.5 sm:mb-5 max-w-[42ch]"
            style={{ fontFamily: "'Neue Montreal', 'Inter', sans-serif" }}
          >
            {profile.tagline}
          </motion.p>

          {/* Quick Skill Tags */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-1.5 sm:gap-2 mb-3.5 sm:mb-5"
          >
            {["SQL", "Power BI", "Excel", "Python", "Business Analysis"].map((skill) => (
              <span
                key={skill}
                className="text-[10px] sm:text-[11px] font-semibold px-2.5 py-1 rounded-full bg-fg/5 border border-fg/15 text-fg hover:bg-fg/10 transition-colors"
              >
                {skill}
              </span>
            ))}
          </motion.div>

          {/* View Work & Download CV Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center gap-3 sm:gap-4"
          >
            <a
              href="#projects-section"
              onClick={handleScrollToWork}
              className="px-5 py-2.5 sm:px-6 sm:py-3 bg-fg text-bg hover:opacity-90 rounded-full flex items-center gap-2 text-xs font-semibold tracking-wide transition-all duration-200 active:scale-95 shadow-sm"
              style={{ fontFamily: "'Neue Montreal', 'Inter', sans-serif" }}
            >
              <span>View Projects</span>
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-none stroke-current" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="7" y1="17" x2="17" y2="7"/>
                <polyline points="7 7 17 7 17 17"/>
              </svg>
            </a>

            <a
              href={profile.resume}
              target="_blank"
              rel="noopener noreferrer"
              download="Santhosh_S_Resume.pdf"
              className="text-xs font-semibold text-fg hover:text-accent flex items-center gap-1.5 pb-0.5 border-b border-fg/30 hover:border-accent transition-all"
              style={{ fontFamily: "'Neue Montreal', 'Inter', sans-serif" }}
            >
              <span>Download CV</span>
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-none stroke-current" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"/>
                <polyline points="19 12 12 19 5 12"/>
              </svg>
            </a>
          </motion.div>

          {/* Social Links on Bottom-Left */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center gap-3.5 sm:gap-4 mt-3.5 sm:mt-5 text-fg/70"
          >
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" title="LinkedIn" aria-label="LinkedIn" className="hover:text-accent transition-colors">
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </a>
            {profile.github && (
              <a href={profile.github} target="_blank" rel="noopener noreferrer" title="GitHub" aria-label="GitHub" className="hover:text-accent transition-colors">
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              </a>
            )}
            <a href={`mailto:${profile.email}`} title="Email" aria-label="Email" className="hover:text-accent transition-colors">
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </a>
            <a href={profile.whatsapp} target="_blank" rel="noopener noreferrer" title="WhatsApp" aria-label="WhatsApp" className="hover:text-accent transition-colors">
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
            </a>
            <a href={`tel:${profile.phone}`} title="Call" aria-label="Call" className="hover:text-accent transition-colors">
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
            </a>
          </motion.div>
        </motion.div>

        {/* Floating Pause Button - Only visible while video is actively playing */}
        {isPlaying && (
          <motion.button
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => {
              e.stopPropagation();
              togglePlay();
            }}
            className="fixed bottom-6 right-6 z-30 flex items-center gap-2 sm:gap-2.5 bg-white/95 dark:bg-[#0c0d12]/95 border border-black/15 dark:border-white/15 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-fg hover:bg-fg hover:text-bg transition-all active:scale-95 shadow-2xl backdrop-blur-md cursor-pointer"
            style={{ fontFamily: "'Neue Montreal', 'Inter', sans-serif" }}
            title="Pause Video"
            aria-label="Pause Video"
          >
            <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-fg/10 flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-current">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
            </span>
            <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.16em] uppercase pr-1">
              Pause Video
            </span>
          </motion.button>
        )}
      </section>
    </>
  );
};

export default HeroSection;
