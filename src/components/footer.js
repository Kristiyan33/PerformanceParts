'use client';

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
        <div style={styles.linksRow}>
          <Link
            href="/modYourCar"
            style={
              hoveredLink === "modYourCar"
                ? { ...styles.link, ...styles.hoveredLink }
                : styles.link
            }
            onMouseEnter={() => handleHover("modYourCar")}
            onMouseLeave={handleHoverOut}
          >
            Тунинговай колата си!
          </Link>
          <Link
            href="/shop"
            style={
              hoveredLink === "shop"
                ? { ...styles.link, ...styles.hoveredLink }
                : styles.link
            }
            onMouseEnter={() => handleHover("shop")}
            onMouseLeave={handleHoverOut}
          >
            Магазин
          </Link>
          <Link
            href="/contacts"
            style={
              hoveredLink === "contacts"
                ? { ...styles.link, ...styles.hoveredLink }
                : styles.link
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
    backgroundColor: "#1F2937",
    color: "#E5E7EB",
    padding: "3rem 2rem",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "2rem",
    fontFamily: "Roboto, Arial, Helvetica, sans-serif",
  },
  leftSection: {
    flex: 1,
    display: "flex",
    alignItems: "center",
  },
  rightSection: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    gap: "1rem",
  },
  brandLink: {
    color: "#F9FAFB",
    textDecoration: "none",
    fontSize: "2.5rem",
    fontWeight: "bold",
    transition: "color 0.3s ease",
  },
  linksRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: "1rem",
    justifyContent: "flex-end",
  },
  link: {
    color: "#9CA3AF",
    textDecoration: "none",
    fontSize: "1.2rem",
    padding: "10px 16px",
    transition: "all 0.3s ease",
    borderRadius: "4px",
  },
  hoveredLink: {
    color: "#80CBC4",
    backgroundColor: "#374151",
    transform: "scale(1.05)",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
  },
  copyText: {
    fontSize: "0.9rem",
    color: "#6B7280",
  },

  // Media Query for responsiveness
  "@media (max-width: 768px)": {
    footer: {
      flexDirection: "column",
      alignItems: "center",
    },
    leftSection: {
      flex: "none",
      marginBottom: "1rem",
    },
    brandLink: {
      fontSize: "2rem", // Slightly smaller font for mobile
    },
    rightSection: {
      alignItems: "center", // Center the content for smaller screens
      marginTop: "1rem",
    },
    linksRow: {
      justifyContent: "center", // Center links in mobile view
    },
    link: {
      fontSize: "1rem", // Slightly smaller font for mobile
      padding: "8px 12px", // Less padding on mobile
    },
    copyText: {
      fontSize: "0.8rem", // Smaller text for mobile
    },
  },
};
