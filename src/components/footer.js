'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.socialLinks}>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={styles.socialLink}>
          Instagram
        </a>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={styles.socialLink}>
          Facebook
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={styles.socialLink}>
          Twitter
        </a>
      </div>
      <div style={styles.contactLink}>
        <Link href="/contacts" style={styles.navLink}>
          Contact Us
        </Link>
      </div>
      <p style={styles.copyText}>© {new Date().getFullYear()} Performance Parts. All rights reserved.</p>
    </footer>
  );
}

const styles = {
  footer: {
    backgroundColor: '#920717',
    color: '#fff',
    padding: '1.5rem 2rem',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1rem',
  },
  socialLinks: {
    display: 'flex',
    gap: '1rem',
  },
  socialLink: {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '1rem',
    transition: 'color 0.2s',
  },
  navLink: {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '1rem',
    transition: 'color 0.2s',
  },
  contactLink: {
    marginTop: '1rem',
  },
  copyText: {
    fontSize: '0.875rem',
    color: '#ccc',
    marginTop: '1rem',
  },
};
