"use client";

import Link from "next/link";
import { useState } from "react";

export default function Footer() {
  const [hoveredLink, setHoveredLink] = useState(null);

  const handleHover = (link) => setHoveredLink(link);
  const handleHoverOut = () => setHoveredLink(null);

  return (
    <footer style={styles.footer}>
      <div style={styles.leftSection}>
        <Link href="/" style={styles.brandLink}>
          PerformanceParts
        </Link>
      </div>
      <div style={styles.rightSection}>
        <div style={styles.socialAndContact}>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            style={
              hoveredLink === "instagram"
                ? { ...styles.socialLink, ...styles.hoveredLink }
                : styles.socialLink
            }
            onMouseEnter={() => handleHover("instagram")}
            onMouseLeave={handleHoverOut}
          >
            Instagram
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            style={
              hoveredLink === "facebook"
                ? { ...styles.socialLink, ...styles.hoveredLink }
                : styles.socialLink
            }
            onMouseEnter={() => handleHover("facebook")}
            onMouseLeave={handleHoverOut}
          >
            Facebook
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            style={
              hoveredLink === "twitter"
                ? { ...styles.socialLink, ...styles.hoveredLink }
                : styles.socialLink
            }
            onMouseEnter={() => handleHover("twitter")}
            onMouseLeave={handleHoverOut}
          >
            Twitter
          </a>
          <Link
            href="/contacts"
            style={
              hoveredLink === "contacts"
                ? { ...styles.contactLink, ...styles.hoveredLink }
                : styles.contactLink
            }
            onMouseEnter={() => handleHover("contacts")}
            onMouseLeave={handleHoverOut}
          >
            Контакти
          </Link>
        </div>
        <p style={styles.copyText}>
          © {new Date().getFullYear()} Performance Parts. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    backgroundColor: "#1F2937", // Dark gray background
    color: "#E5E7EB", // Lighter gray text
    padding: "3rem 2rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    fontFamily: "Roboto, Arial, Helvetica, sans-serif",
  },
  leftSection: {
    flex: 1,
    display: "flex",
    alignItems: "flex-end",
  },
  rightSection: {
    flex: 0.1,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "1rem",
  },
  brandLink: {
    color: "#F9FAFB", // Bright white for branding
    textDecoration: "none",
    transition: "color 0.3s ease",
    fontSize: "3rem",
    fontWeight: "bold",
  },
  socialAndContact: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  socialLink: {
    color: "#9CA3AF", // Muted gray for social links
    textDecoration: "none",
    fontSize: "1.5rem",
    transition: "color 0.3s ease, transform 0.3s ease, padding 0.4s ease", // Added padding transition
    padding: "10px 20px", // Default padding
  },
  contactLink: {
    color: "#9CA3AF", // Consistent muted gray for links
    textDecoration: "none",
    fontSize: "1.5rem",
    transition: "color 0.3s ease, transform 0.3s ease, padding 0.4s ease", // Added padding transition
    padding: "10px 20px", // Default padding
  },
  copyText: {
    fontSize: "1rem",
    color: "#6B7280", // Subtle muted text for copyright
    marginTop: "1rem",
  },
  hoveredLink: {
    color: "#80CBC4", // Brighter color when hovered
    backgroundColor: "#50688C", // Background color when hovered
    padding: "12px 24px", // Increased padding for hover
    borderRadius: "5px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.15)",
    transform: "scale(1.02)", // Subtle scaling for smoother effect
  },
};
