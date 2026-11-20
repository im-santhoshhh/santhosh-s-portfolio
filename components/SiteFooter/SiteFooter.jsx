"use client";

import React from "react";

const Icon = ({ children }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {children}
  </svg>
);

const InstagramIcon = () => (
  <Icon>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </Icon>
);

const TikTokIcon = () => (
  <Icon>
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </Icon>
);

const YoutubeIcon = () => (
  <Icon>
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
    <path d="m10 15 5-3-5-3z" />
  </Icon>
);

const LinkedinIcon = () => (
  <Icon>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </Icon>
);

const GithubIcon = () => (
  <Icon>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </Icon>
);

import profile from "@/data/profile";

const SiteFooter = () => {
  return (
    <footer id="main-footer">
      <div className="footer-top">
        <div className="footer-brand">
          <h1 className="f-logo">SANTHOSH S</h1>
          <p className="f-desc">
            {profile.title} <br />
            {profile.tagline}
          </p>
          <div className="flex items-center gap-4 mt-4 text-fg/80">
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-fg transition-colors"
              title="LinkedIn"
            >
              <LinkedinIcon />
            </a>
            {profile.github && (
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-fg transition-colors"
                title="GitHub"
              >
                <GithubIcon />
              </a>
            )}
            <a
              href={`mailto:${profile.email}`}
              className="hover:text-fg transition-colors"
              title="Email"
            >
              <Icon>
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </Icon>
            </a>
          </div>
        </div>
        <div className="footer-links">
          <div className="f-col">
            <h3>ANALYTICS PROJECTS</h3>
            {profile.projects.slice(0, 4).map((p) => (
              <a key={p.name} href="#projects-section">{p.name}</a>
            ))}
          </div>
          <div className="f-col">
            <h3>CONNECT &amp; RESUME</h3>
            <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn Profile</a>
            <a href={profile.resume} download="Santhosh_S_Resume.pdf">Download Resume (PDF)</a>
            <a href="#contact-section">Contact / Inquiries</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Santhosh S. All rights reserved.</p>
        <p>Data Analyst | SQL | Excel | Power BI | Python</p>
      </div>
    </footer>
  );
};

export default SiteFooter;
