"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

const FeaturedVideo = ({ refForward, ...props }) => {
  const containerRef = useRef(null);

  // Measure scroll progress as the portrait card passes through the viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
    layoutEffect: false,
  });

  // Smooth continuous parallax zoom: subtle scale from 1.0 to 1.08 as user scrolls past
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.04, 1.08]);

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[3/4] md:aspect-[856/1024] overflow-hidden rounded-3xl shadow-lg border border-fg/10 z-30 bg-fg/[0.03]"
      {...props}
    >
      <motion.div style={{ scale }} className="w-full h-full relative">
        <Image
          src="/santhosh-portrait.jpg"
          alt="Santhosh S - Data Analyst & Business Analyst"
          fill
          priority
          sizes="(max-width: 768px) 80vw, 40vw"
          className="object-cover"
        />
      </motion.div>
    </div>
  );
};

export default FeaturedVideo;
