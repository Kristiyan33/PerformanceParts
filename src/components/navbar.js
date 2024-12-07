'use client'; // To use React hooks

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { auth } from '../lib/firebase'; // Import Firebase auth object
import { onAuthStateChanged, signOut } from 'firebase/auth'; // Import Firebase functions for auth

export default function Navbar() {
  const [user, setUser] = useState(null); // State to store user data

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
    } catch (err) {
      console.error("Error signing out: ", err);
    }
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.logoContainer}>
        {/* Replace '/images/logo.png' with the path to your logo */}
        <img src="/images/a3.png" alt="Performance Parts Logo" style={styles.logo} />
      </div>
      <div style={styles.navLinks}>
        {user ? (
          // If user is logged in, show the "Account" and "Sign Out" buttons
          <>
            <Link href="/account" style={styles.navLink}>Account</Link>
            <button onClick={handleSignOut} style={styles.navLink}>Sign Out</button>
          </>
        ) : (
          // If user is not logged in, show "Login" and "Register" buttons
          <>
            <Link href="/login" style={styles.navLink}>Login</Link>
            <Link href="/register" style={styles.navLink}>Register</Link>
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
  },
  logo: {
    height: '50px', // Adjust size of the logo (height)
    width: 'auto', // Keep the logo aspect ratio intact
    backgroundColor: 'transparent',
  },
  navLinks: {
    display: 'flex',
    gap: '1rem',
  },
  navLink: {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '1rem',
    transition: 'color 0.2s',
    cursor: 'pointer',
  },
};
