'use client'; // To use React hooks

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { auth } from '../lib/firebase'; // Import Firebase auth object
import { onAuthStateChanged, signOut } from 'firebase/auth'; // Import Firebase functions for auth

export default function Navbar() {
  const [user, setUser] = useState(null); // State to store user data
  const [dropdownOpen, setDropdownOpen] = useState(false); // State to handle dropdown menu
  const [hoveredLink, setHoveredLink] = useState(null); // Track hovered link for hover effect

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

  // Function to handle mouse hover event
  const handleHover = (link) => {
    setHoveredLink(link);
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.logoContainer}>
        {/* Logo on the right side, links to home page */}
        <Link href="/" style={styles.logoLink}>
          <img src="/images/logo.png" alt="Logo" style={styles.logo} />
        </Link>
        {/* "Performance Parts" text next to the logo */}
        <Link href="/" style={styles.performanceText}>
          Performance Parts
        </Link>
      </div>
      <div style={styles.navLinks}>
        {/* Links visible when not logged in */}
        {!user ? (
          <>
            <Link
              href="/modYourCar"
              style={hoveredLink === 'how-to-mod-your-car' ? { ...styles.navLink, ...styles.hoveredLink } : styles.navLink}
              onMouseEnter={() => handleHover('how-to-mod-your-car')}
              onMouseLeave={() => setHoveredLink(null)}
            >
               Mod Your Car
            </Link>
            <Link
              href="/shop"
              style={hoveredLink === 'shop' ? { ...styles.navLink, ...styles.hoveredLink } : styles.navLink}
              onMouseEnter={() => handleHover('shop')}
              onMouseLeave={() => setHoveredLink(null)}
            >
              Shop
            </Link>
            <Link
              href="/contact-us"
              style={hoveredLink === 'contact-us' ? { ...styles.navLink, ...styles.hoveredLink } : styles.navLink}
              onMouseEnter={() => handleHover('contact-us')}
              onMouseLeave={() => setHoveredLink(null)}
            >
              Contact Us
            </Link>
            <Link
              href="/login"
              style={hoveredLink === 'login' ? { ...styles.navLink, ...styles.hoveredLink } : styles.navLink}
              onMouseEnter={() => handleHover('login')}
              onMouseLeave={() => setHoveredLink(null)}
            >
              Login
            </Link>
            <Link
              href="/register"
              style={hoveredLink === 'register' ? { ...styles.navLink, ...styles.hoveredLink } : styles.navLink}
              onMouseEnter={() => handleHover('register')}
              onMouseLeave={() => setHoveredLink(null)}
            >
              Register
            </Link>
          </>
        ) : (
          // Dropdown when user is logged in
          <>
            <Link
              href="/modYourCar"
              style={hoveredLink === 'how-to-mod-your-car' ? { ...styles.navLink, ...styles.hoveredLink } : styles.navLink}
              onMouseEnter={() => handleHover('how-to-mod-your-car')}
              onMouseLeave={() => setHoveredLink(null)}
            >
              Mod Your Car
            </Link>
            <Link
              href="/shop"
              style={hoveredLink === 'shop' ? { ...styles.navLink, ...styles.hoveredLink } : styles.navLink}
              onMouseEnter={() => handleHover('shop')}
              onMouseLeave={() => setHoveredLink(null)}
            >
              Shop
            </Link>
            <Link
              href="/contacts"
              style={hoveredLink === 'contact-us' ? { ...styles.navLink, ...styles.hoveredLink } : styles.navLink}
              onMouseEnter={() => handleHover('contact-us')}
              onMouseLeave={() => setHoveredLink(null)}
            >
              Contact Us
            </Link>

            <div style={styles.profileButton} onClick={() => setDropdownOpen(!dropdownOpen)}>
              {/* Profile Icon as button */}
              <img src="/images/accountIcon.png" alt="Profile" style={styles.profileIcon} />
            </div>
            {dropdownOpen && (
              <div style={styles.dropdownMenu}>
                <Link
                  href="/account"
                  style={hoveredLink === 'account' ? { ...styles.dropdownLink, ...styles.hoveredLink } : styles.dropdownLink}
                  onMouseEnter={() => handleHover('account')}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  Account
                </Link>
                <Link
                  href="/cart"
                  style={hoveredLink === 'cart' ? { ...styles.dropdownLink, ...styles.hoveredLink } : styles.dropdownLink}
                  onMouseEnter={() => handleHover('cart')}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  Shopping Cart
                </Link>
                <button
                  onClick={handleSignOut}
                  style={hoveredLink === 'logout' ? { ...styles.dropdownLink, ...styles.hoveredLink } : styles.dropdownLink}
                  onMouseEnter={() => handleHover('logout')}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  Log Out
                </button>
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
    padding: '1rem 1rem', // Increased padding to make navbar taller (2x vertical)
    backgroundColor: '#6482AD', // Match footer color
    color: '#fff',
    fontFamily: 'Roboto, Arial, Helvetica, sans-serif', // Use Roboto font globally
  },
  logoContainer: {
    flex: 1,
    textAlign: 'right', // Align logo and text to the right
    display: 'flex', // Add flexbox to align logo and text side by side
    alignItems: 'center', // Center align vertically
  },
  logoLink: {
    textDecoration: 'none',
  },
  logo: {
    height: '100px',
    width: 'auto',
    backgroundColor: 'transparent',
  },
  performanceText: {
    marginLeft: '10px', // Space between logo and text
    fontSize: '2rem',
    color: '#E2DAD6', // Light text color like footer
    textDecoration: 'none',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'color 0.2s',
  },
  navLinks: {
    display: 'flex',
    gap: '1.5rem', // Increased space between buttons
    alignItems: 'center',
  },
  navLink: {
    color: '#E2DAD6', // Light text color like footer
    textDecoration: 'none',
    fontSize: '2rem',
    transition: 'color 0.2s, background-color 0.3s ease', // Added transition for hover effect
    cursor: 'pointer',
    padding: '8px 20px', // Regular padding
  },
  hoveredLink: {
    color: '#B0B0B0', // Darker color on hover
    backgroundColor: '#45678D', // Darker background color on hover
    padding: '12px 24px', // Larger padding on hover for more space around text
    borderRadius: '10px', // Add rounded corners to the hover effect box
  },
  profileButton: {
    position: 'relative',
    cursor: 'pointer',
  },
  profileIcon: {
    width: '60px', // Adjust size of the profile icon
    height: '60px',
    borderRadius: '50%',
  },
  dropdownMenu: {
    position: 'absolute',
    top: '120px', // Adjust dropdown to drop below the account icon
    right: '0',
    backgroundColor: '#7e99a3', // Match footer color
    borderRadius: '8px', // Make the dropdown have rounded edges
    boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.1)',
    zIndex: 1,
    display: 'block',
    width: '250px', // Increased width of dropdown
  },
  dropdownLink: {
    display: 'block',
    padding: '20px 30px',
    color: '#fff',
    textDecoration: 'none',
    fontSize: '1.5rem',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    borderBottom: '3px solid #E2DAD6', // Add a line between buttons
    borderRadius: '8px', // Add rounded corners to each link
  },
  dropdownLinkLast: {
    borderBottom: '3px solid #E2DAD6', // Remove bottom border from last item
  },
  dropdownLinkHovered: {
    backgroundColor: '#45678D', // Darker background color on hover
  },
};

