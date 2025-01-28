"use client";

import Link from "next/link";

export default function Footer() {
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
            style={styles.socialLink}
          >
            Instagram
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            style={styles.socialLink}
          >
            Facebook
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            style={styles.socialLink}
          >
            Twitter
          </a>
          <Link href="/contacts" style={styles.contactLink}>
            Contact Us
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
    transition: "color 0.3s ease",
  },
  contactLink: {
    color: "#9CA3AF", // Consistent muted gray for links
    textDecoration: "none",
    fontSize: "1.5rem",
    transition: "color 0.3s ease",
  },
  copyText: {
    fontSize: "1rem",
    color: "#6B7280", // Subtle muted text for copyright
    marginTop: "1rem",
  },
};
