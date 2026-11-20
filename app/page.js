"use client";
import { Suspense, useRef, useEffect } from "react";
import FeaturedVideo from "@/components/Featured/FeaturedVideo";
import Header from "@/components/Featured/Header";
import Skiggle from "@/components/Featured/Skiggle";
import SubHeader, { AboutBio } from "@/components/Featured/SubHeader";
import Navbar from "@/components/Navbar/Navbar";
import HeroSection from "@/components/HeroSection/HeroSection";
import SmoothScroll from "@/components/SmoothScroll";
import GradualBlur from "@/components/GradualBlur/GradualBlur";
import HorizontalScroll from "@/components/HorizontalScroll/HorizontalScroll";
import Projects from "@/components/Projects/Projects";
import Contact from "@/components/Contact/Contact";
import SiteFooter from "@/components/SiteFooter/SiteFooter";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Home() {
  const ref = useRef(null);
  const blurRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    console.clear();
    console.log(
      "%cPORTFOLIO OF SANTHOSH S | DATA ANALYST & BUSINESS ANALYST",
      "background: #D9E6FF; color: #0f172a; font-size: 16px; font-weight: 800; padding: 10px 16px; border-radius: 10px; letter-spacing: 2px;"
    );
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const blur = blurRef.current;
    const footer = document.getElementById("main-footer");
    if (!blur || !footer) return;

    // The GradualBlur effect should be visible across the whole site, but
    // disabled while either the hero section or the footer is on screen.
    const setVisible = (visible) =>
      gsap.to(blur, { autoAlpha: visible ? 1 : 0, duration: 0.3 });

    const updateBlurState = () => {
      const hero = document.getElementById("hero-section");
      const heroBottom = hero ? hero.getBoundingClientRect().bottom : 0;
      const pastHero = heroBottom <= 100;
      const footerInView = footer ? footer.getBoundingClientRect().top < window.innerHeight : false;
      const shouldBeVisible = pastHero && !footerInView;
      setVisible(shouldBeVisible);
    };

    updateBlurState();
    window.addEventListener("scroll", updateBlurState, { passive: true });

    const triggerHero = ScrollTrigger.create({
      trigger: "#hero-section",
      start: "bottom bottom",
      onEnter: updateBlurState,
      onLeaveBack: updateBlurState,
    });

    const triggerFooter = ScrollTrigger.create({
      trigger: footer,
      start: "top bottom",
      end: "bottom top",
      onEnter: updateBlurState,
      onEnterBack: updateBlurState,
      onLeave: updateBlurState,
      onLeaveBack: updateBlurState,
    });

    return () => {
      window.removeEventListener("scroll", updateBlurState);
      triggerHero.kill();
      triggerFooter.kill();
    };
  }, []);

  return (
    <SmoothScroll>
      <Suspense
        fallback={
          <div className="w-screen bg-black h-screen text-white text-4xl md:text-7xl lg:text-9xl flex items-center justify-center">
            Loading...
          </div>
        }
      >
        <div className="bg-bg text-fg h-auto w-full max-w-full overflow-x-hidden">
          <Navbar />

          <HeroSection />
          {/* </div> */}
          <div
            id="about"
            className="h-auto relative mt-12 sm:mt-16 md:mt-[10rem] px-4 sm:px-8 md:px-12 lg:px-20 pb-16 sm:pb-24 z-10 flex flex-col gap-8 md:gap-12"
            ref={ref}
          >
            <Skiggle />
            <Header />

            <div className="w-full flex flex-col md:flex-row gap-12 lg:gap-16 items-start relative z-10">
              {/* Left Column: Portrait Image */}
              <div className="w-full md:w-[42%] lg:w-[38%] flex-shrink-0 flex justify-center md:justify-start">
                <FeaturedVideo refForward={ref} />
              </div>

              {/* Right Column: Copy & Bio */}
              <div className="w-full md:flex-grow">
                <AboutBio />
              </div>
            </div>

            {/* Full-width Centered Range: Core Analytical Expertise through Technical Skills */}
            <div className="w-full relative z-10 mt-6 md:mt-12">
              <SubHeader />
            </div>
          </div>

          <Projects />

          <HorizontalScroll />
          <Contact />
          <SiteFooter />

          {/* GradualBlur — hidden when footer is in view */}
          <div
            ref={blurRef}
            aria-hidden="true"
            style={{
              position: "fixed",
              inset: 0,
              pointerEvents: "none",
              zIndex: 99999,
              opacity: 0,
              visibility: "hidden",
            }}
          >
            <GradualBlur
              target="parent"
              position="bottom"
              height="6rem"
              strength={2}
              divCount={6}
              curve="bezier"
              exponential={false}
              opacity={0.9}
              zIndex={1}
            />
          </div>
          {/* <FeaturedWork />
        <Connection className="" />
        <div className="mt-80 w-full h-screen relative">
          <Experience className="w-full h-full rounded-3xl" />
        </div> */}
          {/* <div className="bg-brblue flex items-center justify-center w-full h-screen font-extrabold text-9xl"> this is the footer  </div> */}
          {/* <div className="relative">
          <div className="absolute text-9xl font-bold text-center w-full h-full top-80">
            HIRE       ME
          </div>
          <Footer />
          <div className="absolute text-3xl font-bold text-center w-full h-full top-[40rem]">
            made by mtarif
          </div>
        </div> */}
        </div>
      </Suspense>
    </SmoothScroll>
  );
}
