'use client'; // To use React hooks

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { auth } from '../lib/firebase'; // Import Firebase auth object
import { onAuthStateChanged, signOut } from 'firebase/auth'; // Import Firebase functions for auth

export default function Navbar() {
  const [user, setUser] = useState(null); // State to store user data
  const [dropdownOpen, setDropdownOpen] = useState(false); // State to handle dropdown menu

  // Monitor authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user); // If logged in, set user data
      } else {
        setUser(null); // If not logged in, set user to null
      }
    });

    return () => unsubscribe(); // Cleanup the listener when the component unmounts
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth); // Sign out the user
      setDropdownOpen(false); // Close the dropdown after signing out
    } catch (err) {
      console.error("Error signing out: ", err);
    }
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.logoContainer}>
        {/* Logo on the right side, links to home page */}
        <Link href="/" style={styles.logoLink}>
          <img src="/images/a3.png" alt="Logo" style={styles.logo} />
        </Link>
      </div>
      <div style={styles.navLinks}>
        {/* Links visible when not logged in */}
        {!user ? (
          <>
            <Link href="/about-us" style={styles.navLink}>About Us</Link>
            <Link href="/shop" style={styles.navLink}>Shop</Link>
            <Link href="/contacts" style={styles.navLink}>Contacts</Link>
            <Link href="/login" style={styles.navLink}>Login</Link>
            <Link href="/register" style={styles.navLink}>Register</Link>
          </>
        ) : (
          // Dropdown when user is logged in
          <>
            <Link href="/about-us" style={styles.navLink}>About Us</Link>
            <Link href="/shop" style={styles.navLink}>Shop</Link>
            <Link href="/contacts" style={styles.navLink}>Contacts</Link>

            <div style={styles.profileButton} onClick={() => setDropdownOpen(!dropdownOpen)}>
              {/* Profile Icon as button */}
              <img src="/images/user.png" alt="Profile" style={styles.profileIcon} />
            </div>
            {dropdownOpen && (
              <div style={styles.dropdownMenu}>
                <Link href="/account" style={styles.dropdownLink}>Account</Link>
                <Link href="/cart" style={styles.dropdownLink}>Shopping Cart</Link>
                <button onClick={handleSignOut} style={styles.dropdownLink}>Log Out</button>
              </div>
            )}
          </>
        )}
      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    backgroundColor: '#ff0000', // Red background for navbar
    color: '#fff',
  },
  logoContainer: {
    flex: 1,
    textAlign: 'right', // Align logo to the right
  },
  logoLink: {
    textDecoration: 'none',
  },
  logo: {
    height: '50px',
    width: 'auto',
    backgroundColor: 'transparent',
  },
  navLinks: {
    display: 'flex',
    gap: '1rem',
    alignItems: 'center',
  },
  navLink: {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '1rem',
    transition: 'color 0.2s',
    cursor: 'pointer',
  },
  profileButton: {
    position: 'relative',
    cursor: 'pointer',
  },
  profileIcon: {
    width: '40px', // Adjust size of the profile icon
    height: '40px',
    borderRadius: '50%',
  },
  dropdownMenu: {
    position: 'absolute',
    top: '40px', // Position the dropdown menu below the profile icon
    right: '0',
    backgroundColor: '#ff0000',
    borderRadius: '4px',
    boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.1)',
    zIndex: 1,
    display: 'block',
  },
  dropdownLink: {
    display: 'block',
    padding: '10px 20px',
    color: '#fff',
    textDecoration: 'none',
    fontSize: '1rem',
    cursor: 'pointer',
  },
};
