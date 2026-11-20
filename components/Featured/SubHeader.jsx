"use client";

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import profile from '@/data/profile';

/**
 * Top bio and availability section that sits alongside the portrait photo
 */
export const AboutBio = () => {
  return (
    <div className="w-full flex flex-col items-start text-left px-0 md:px-0">
      {/* Bio text with improved typography hierarchy */}
      <div className="w-full flex flex-col gap-4 sm:gap-5 md:gap-6 text-left">
        {/* Main introduction paragraph: 22-24px on desktop, 1.5-1.6 line-height, 17-19px on mobile */}
        <p className="text-[17px] sm:text-[19px] md:text-[21px] lg:text-[23px] xl:text-[24px] leading-[1.55] text-fg/95 font-normal tracking-[-0.01em]">
          I&apos;m <span className="font-bold text-fg">{profile.name}</span>, a passionate{' '}
          <span className="font-semibold text-fg">{profile.title}</span> aspirant with a Master of Computer Applications (MCA) degree and hands-on expertise in{' '}
          <span className="font-semibold text-fg">SQL, Excel, Power BI, and Python</span>.
        </p>

        {/* Secondary paragraph 1: 17-19px on desktop, 1.7 line-height, 15-17px on mobile */}
        <p className="text-[15px] sm:text-[16px] md:text-[17px] lg:text-[18px] xl:text-[18.5px] leading-[1.65] text-fg-muted font-normal">
          I enjoy exploring complex datasets, identifying trends, and translating raw data into clear, interactive visual stories and actionable business recommendations that support data-driven decision-making.
        </p>

        {/* Secondary paragraph 2: 17-19px on desktop, 1.7 line-height, 15-17px on mobile */}
        <p className="text-[15px] sm:text-[16px] md:text-[17px] lg:text-[18px] xl:text-[18.5px] leading-[1.65] text-fg-muted font-normal">
          Through academic and personal projects, I have developed strong abilities in data cleaning, exploratory data analysis, dashboard architecture, and reporting — continuously strengthening my analytical and problem-solving skills to understand stakeholder requirements and communicate insights effectively.
        </p>
      </div>

      {/* Target Roles & Location / Career Information Card */}
      <div className="w-full mt-6 sm:mt-8 md:mt-10 p-5 sm:p-7 min-h-[120px] lg:min-h-[135px] rounded-2xl sm:rounded-3xl bg-fg/[0.04] border border-fg/10 grid grid-cols-1 md:grid-cols-[280px_1fr] lg:grid-cols-[320px_1fr] items-center gap-4 sm:gap-6 md:gap-8 lg:gap-10 shadow-sm hover:border-fg/20 transition-all duration-200">
        {/* Left Column: Availability Status & Location */}
        <div className="flex flex-col justify-center gap-3 md:gap-4 shrink-0">
          <div className="flex items-start gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0 mt-1.5" />
            <span className="text-[15px] sm:text-[16px] uppercase tracking-wider font-bold text-fg leading-[1.45]">
              ACTIVELY SEEKING ENTRY / FRESHER ROLES:
            </span>
          </div>
          <div className="text-[15px] sm:text-[16px] text-fg-muted font-medium flex items-center gap-2 pl-5 leading-[1.5]">
            <span>📍</span>
            <span>{profile.location}</span>
          </div>
        </div>

        {/* Right Column: Target Job Roles */}
        <div className="flex items-center">
          <p className="text-[15px] sm:text-[16px] text-fg-muted font-normal leading-[1.55]">
            {profile.targetRoles.join(" • ")}
          </p>
        </div>
      </div>
    </div>
  );
};

/**
 * Reusable centered section header with consistent typography and divider lines
 */
const CenteredSectionHeader = ({ title }) => (
  <div className="w-full flex flex-col items-center justify-center text-center mb-8 md:mb-12">
    <div className="flex items-center justify-center gap-4 w-full">
      <div className="hidden sm:block h-[1px] flex-grow max-w-[100px] bg-fg/15" />
      <h3 className="text-xs sm:text-sm md:text-base font-bold tracking-[0.28em] text-fg uppercase text-center px-2">
        {title}
      </h3>
      <div className="hidden sm:block h-[1px] flex-grow max-w-[100px] bg-fg/15" />
    </div>
  </div>
);

/**
 * Smooth Animated Counter for Technical Skills
 * Counts from 0 up to target percentage using requestAnimationFrame and easeOut curve,
 * triggered once with a staggered delay and respecting prefers-reduced-motion.
 */
const AnimatedPercentageCounter = ({ target, isVisible, delay = 0, isReducedMotion }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    if (isReducedMotion) {
      setCount(target);
      return;
    }

    let startTimestamp = null;
    let animationFrameId;
    const duration = 1600; // ms matching the 1.6s progress bar animation

    const timer = setTimeout(() => {
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const elapsed = timestamp - startTimestamp;
        const progress = Math.min(elapsed / duration, 1);

        // Smooth cubic-bezier ease-out curve matching [0.22, 1, 0.36, 1]
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.min(Math.round(eased * target), target);

        setCount(current);

        if (progress < 1) {
          animationFrameId = requestAnimationFrame(step);
        } else {
          setCount(target);
        }
      };

      animationFrameId = requestAnimationFrame(step);
    }, delay);

    return () => {
      clearTimeout(timer);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible, target, delay, isReducedMotion]);

  return <span>{count}%</span>;
};

// Staggered Child Variant for Technical Skill Cards (Fade-in, translateY(30px), subtle scale)
const technicalCardVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.96,
  },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.65,
      delay: index * 0.13, // 130ms staggered delay between cards (120-150ms)
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

/**
 * Full-width, centered layout range from "Core Analytical Expertise"
 * through "Technical Skills".
 */
const SubHeader = () => {
  // Normalize technical skills with configured target percentage levels
  const rawTech = profile.technicalSkills || profile.coreSkills.slice(0, 8);
  const technicalSkills = rawTech.map((item) => {
    if (typeof item === 'object' && item !== null) {
      return { name: item.name, level: item.level || 75 };
    }
    const defaultLevels = {
      "SQL": 75,
      "Microsoft Excel": 85,
      "Power BI": 80,
      "Python": 70,
      "Data Cleaning": 80,
      "Exploratory Data Analysis": 70,
      "Data Visualization": 75,
      "Dashboard Development": 75,
    };
    return { name: item, level: defaultLevels[item] || 75 };
  });

  // Technical Skills Intersection Observer state (triggers only once)
  const technicalSkillsRef = useRef(null);
  const [hasTechAnimated, setHasTechAnimated] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Respect prefers-reduced-motion accessibility setting
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      setIsReducedMotion(true);
      setHasTechAnimated(true);
      return;
    }

    // Check if section is already visible on mount
    const checkIfVisible = () => {
      if (!technicalSkillsRef.current) return false;
      const rect = technicalSkillsRef.current.getBoundingClientRect();
      return rect.top < window.innerHeight && rect.bottom > 0;
    };

    if (checkIfVisible()) {
      const timer = setTimeout(() => setHasTechAnimated(true), 150);
      return () => clearTimeout(timer);
    }

    // Trigger animation when the technical skill section first enters the viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasTechAnimated(true);
          // Animate only once when the section first becomes visible; do not repeatedly restart
          observer.disconnect();
        }
      },
      {
        threshold: 0.05,
        rootMargin: "0px 0px 50px 0px",
      }
    );

    if (technicalSkillsRef.current) {
      observer.observe(technicalSkillsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="w-full flex flex-col gap-16 md:gap-24">
      {/* 1. Core Analytical Expertise */}
      <section className="w-full flex flex-col items-center">
        <CenteredSectionHeader title="CORE ANALYTICAL EXPERTISE" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 w-full">
          {profile.expertise.map((item) => (
            <article
              key={item.title}
              className="p-6 md:p-7 rounded-2xl bg-fg/[0.03] border border-fg/10 hover:border-fg/25 hover:bg-fg/[0.05] transition-all flex flex-col justify-start text-left"
            >
              <h4 className="text-base sm:text-lg font-bold text-fg leading-snug">
                {item.title}
              </h4>
              <p className="text-xs sm:text-sm text-fg-muted leading-relaxed mt-2.5">
                {item.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* 2. Academic Background */}
      <section className="w-full flex flex-col items-center">
        <CenteredSectionHeader title="ACADEMIC BACKGROUND" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 w-full">
          {profile.education.map((edu, index) => (
            <div
              key={index}
              className="p-6 md:p-7 rounded-2xl bg-fg/[0.03] border border-fg/10 hover:border-fg/25 hover:bg-fg/[0.05] transition-all flex flex-col gap-2.5 text-left"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold tracking-wider text-fg-muted uppercase">
                  {edu.duration}
                </span>
                {edu.cgpa && (
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-fg text-bg">
                    CGPA: {edu.cgpa}
                  </span>
                )}
              </div>
              <h4 className="text-base sm:text-lg font-bold text-fg leading-snug">
                {edu.degree}
              </h4>
              <p className="text-xs sm:text-sm text-fg-muted">
                {edu.institution}
              </p>
              {edu.completion && (
                <span className="text-[11px] text-fg-muted/80">
                  Expected completion: {edu.completion}
                </span>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 3. Certifications & Virtual Experience */}
      {profile.certifications && (
        <section className="w-full flex flex-col items-center">
          <CenteredSectionHeader title="CERTIFICATIONS & VIRTUAL EXPERIENCE" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 w-full">
            {profile.certifications.map((cert, index) => {
              const isClickable = Boolean(cert.pdf);
              const CardWrapper = isClickable ? 'a' : 'div';
              const cardProps = isClickable
                ? {
                    href: cert.pdf,
                    target: '_blank',
                    rel: 'noopener noreferrer',
                    title: `View ${cert.title} Certificate (PDF)`,
                    'aria-label': `View ${cert.title} Certificate (PDF)`,
                  }
                : {};

              return (
                <CardWrapper
                  key={index}
                  {...cardProps}
                  className={`group relative p-5 md:p-6 rounded-2xl bg-fg/[0.03] border border-fg/10 transition-all flex flex-col justify-between gap-3 text-left ${
                    isClickable
                      ? 'cursor-pointer hover:border-fg/35 hover:bg-fg/[0.07] hover:-translate-y-1 hover:shadow-md'
                      : 'hover:border-fg/25 hover:bg-fg/[0.05]'
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h4 className={`text-sm sm:text-base font-bold text-fg leading-snug ${isClickable ? 'group-hover:text-brblue transition-colors' : ''}`}>
                        {cert.title}
                      </h4>
                      {isClickable && (
                        <span className="text-fg-muted/60 group-hover:text-brblue group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-xs font-bold" aria-hidden="true">
                          ↗
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-fg-muted mt-1.5 leading-relaxed">
                      {cert.issuer}
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[11px] font-semibold text-fg/60">
                      {cert.year || cert.date}
                    </span>
                    {isClickable && (
                      <span className="text-[11px] font-semibold text-fg/80 group-hover:text-brblue group-hover:underline flex items-center gap-1 transition-colors">
                        View Certificate ↗
                      </span>
                    )}
                  </div>
                </CardWrapper>
              );
            })}
          </div>
        </section>
      )}

      {/* 4. Technical Skills with Scroll-Triggered Reveal, Animated Progress Bars & Percentage Counters */}
      <section ref={technicalSkillsRef} className="w-full flex flex-col items-center">
        <CenteredSectionHeader title="TECHNICAL SKILLS" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 lg:gap-6 w-full">
          {technicalSkills.map((skill, index) => {
            const staggerDelayMs = index * 130;
            return (
              <motion.div
                key={skill.name}
                custom={index}
                initial="hidden"
                animate={hasTechAnimated ? "visible" : "hidden"}
                variants={technicalCardVariants}
                whileHover={
                  !isReducedMotion
                    ? {
                        y: -4,
                        transition: { duration: 0.25, ease: "easeOut" },
                      }
                    : {}
                }
                className="group relative p-5 sm:p-6 rounded-[20px] bg-white dark:bg-white/[0.04] border border-[#e2e8f0] dark:border-white/10 shadow-[0_2px_8px_rgba(0,0,0,0.03)] dark:shadow-none hover:border-blue-500/40 dark:hover:border-blue-400/40 hover:shadow-[0_12px_24px_-4px_rgba(37,99,235,0.12),0_4px_12px_rgba(0,0,0,0.04)] dark:hover:shadow-[0_12px_24px_-4px_rgba(0,0,0,0.4)] transition-[border-color,box-shadow,background-color] duration-300 flex flex-col justify-between gap-4 cursor-default overflow-hidden"
              >
                {/* Skill Name & Animated Percentage Counter */}
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[15px] sm:text-[16px] font-bold text-[#0f172a] dark:text-white tracking-tight">
                    {skill.name}
                  </span>
                  <span className="text-[14px] sm:text-[15px] font-bold text-[#0f172a] dark:text-white tabular-nums tracking-normal">
                    <AnimatedPercentageCounter
                      target={skill.level}
                      isVisible={hasTechAnimated}
                      delay={staggerDelayMs}
                      isReducedMotion={isReducedMotion}
                    />
                  </span>
                </div>

                {/* Progress Bar Track with Rounded Ends */}
                <div className="w-full h-[6px] sm:h-[7px] rounded-full bg-[#f1f5f9] dark:bg-white/10 overflow-hidden relative">
                  <motion.div
                    className="skill-bar-fill h-full rounded-full bg-gradient-to-r from-[#0022eb] via-[#1d4ed8] to-[#38bdf8] group-hover:brightness-110 group-hover:shadow-[0_0_12px_rgba(37,99,235,0.45)] transition-[filter,box-shadow] duration-300 relative overflow-hidden"
                    initial={{ width: "0%" }}
                    animate={hasTechAnimated ? { width: `${skill.level}%` } : { width: "0%" }}
                    transition={
                      isReducedMotion
                        ? { duration: 0 }
                        : {
                            duration: 1.6,
                            delay: index * 0.13,
                            ease: [0.22, 1, 0.36, 1],
                          }
                    }
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default SubHeader;
