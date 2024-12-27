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
    backgroundColor: "#6482AD",
    color: "#fff",
    padding: "3rem 2rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    fontFamily: "Roboto, Arial, Helvetica, sans-serif", // Use Roboto font globally
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
    color: "#E2DAD6",
    textDecoration: "none",
    transition: "color 0.2s",
    fontSize: "3rem",
    fontWeight: "bold",
    fontFamily: "Roboto, Arial, Helvetica, sans-serif", // Apply Roboto to the brand link
  },
  socialAndContact: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  socialLink: {
    color: "#E2DAD6",
    textDecoration: "none",
    fontSize: "1.5rem",
    transition: "color 0.2s",
    fontFamily: "Roboto, Arial, Helvetica, sans-serif", // Apply Roboto to social links
  },
  contactLink: {
    color: "#E2DAD6",
    textDecoration: "none",
    fontSize: "1.5rem",
    transition: "color 0.2s",
    fontFamily: "Roboto, Arial, Helvetica, sans-serif", // Apply Roboto to contact link
  },
  copyText: {
    fontSize: "1rem",
    color: "#F5EDED",
    marginTop: "1rem",
    fontFamily: "Roboto, Arial, Helvetica, sans-serif", // Apply Roboto to the copyright text
  },
};
