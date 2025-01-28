'use client'; // To use React hooks

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { auth } from '../lib/firebase'; // Import Firebase auth object
import { onAuthStateChanged, signOut } from 'firebase/auth'; // Import Firebase functions for auth
import { useCart } from '../lib/CartContext'; // Import the CartContext

export default function Navbar() {
  const [user, setUser] = useState(null); // State to store user data
  const [dropdownOpen, setDropdownOpen] = useState(false); // State to handle dropdown menu
  const [hoveredLink, setHoveredLink] = useState(null); // Track hovered link for hover effect

  // Access cart state and actions from CartContext
  const { cart } = useCart();

  // Calculate the total number of items in the cart dynamically
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

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
      console.error('Error signing out: ', err);
    }
  };

  const handleHover = (link) => {
    setHoveredLink(link);
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.logoContainer}>
        <Link href="/" style={styles.logoLink}>
          <img src="/images/logo.png" alt="Logo" style={styles.logo} />
        </Link>
        <Link href="/" style={styles.performanceText}>
          Performance Parts
        </Link>
      </div>
      <div style={styles.navLinks}>
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
            <div style={styles.iconsContainer}>
              {/* Cart Button */}
              <div style={styles.cartButton}>
                <Link href="/cart" style={styles.cartLink}>
                  <img src="/images/cart.png" alt="Cart" style={styles.cartIcon} />
                  {cartItemCount > 0 && (
                    <span style={styles.cartBadge}>{cartItemCount}</span>
                  )}
                </Link>
              </div>
              {/* Profile Icon */}
              <div style={styles.profileButton} onClick={() => setDropdownOpen(!dropdownOpen)}>
                <img src="/images/accountIcon.png" alt="Profile" style={styles.profileIcon} />
              </div>
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
    padding: '1rem 2rem',
    backgroundColor: '#3C5173', // Darker shade for a sleek look
    color: '#fff',
    fontFamily: 'Roboto, Arial, Helvetica, sans-serif',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
  },
  logoContainer: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
  },
  logoLink: {
    textDecoration: 'none',
  },
  logo: {
    height: '80px', // Reduced size for better proportion
    width: 'auto',
    backgroundColor: 'transparent',
  },
  performanceText: {
    marginLeft: '12px',
    fontSize: '1.8rem',
    color: '#E2DAD6',
    textDecoration: 'none',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'color 0.3s',
  },
  navLinks: {
    display: 'flex',
    gap: '2rem', // Increased spacing for better balance
    alignItems: 'center',
  },
  navLink: {
    color: '#E2DAD6',
    textDecoration: 'none',
    fontSize: '1.6rem', // Slightly smaller for better scaling
    transition: 'color 0.3s ease, background-color 0.3s ease',
    cursor: 'pointer',
    padding: '10px 20px',
    borderRadius: '5px',
  },
  hoveredLink: {
    color: '#FFFFFF',
    backgroundColor: '#50688C', // Softer hover effect
    padding: '12px 22px',
    borderRadius: '8px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.15)',
  },
  iconsContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem', // Larger gap for breathing room
  },
  cartButton: {
    position: 'relative',
    cursor: 'pointer',
  },
  cartLink: {
    textDecoration: 'none',
  },
  cartIcon: {
    width: '50px', // Adjusted size for harmony
    height: '50px',
  },
  cartBadge: {
    position: 'absolute',
    top: '-15px',
    right: '-15px',
    backgroundColor: "#1F2937", // Dark gray background
    color: '#FFF',
    fontSize: '1rem',
    fontWeight: 'bold',
    borderRadius: '20px',
    padding: '4px 8px',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
  },
  profileButton: {
    position: 'relative',
    cursor: 'pointer',
  },
  profileIcon: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    transition: 'transform 0.3s ease',
  },
  dropdownMenu: {
    position: 'absolute',
    top: '70px',
    right: '0',
    backgroundColor: '#4A657A', // Subtle contrast to the navbar
    borderRadius: '8px',
    boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
    zIndex: 1,
    display: 'block',
    width: '200px',
  },
  dropdownLink: {
    display: 'block',
    padding: '15px 20px',
    color: '#fff',
    textDecoration: 'none',
    fontSize: '1.4rem',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    borderBottom: '1px solid #7E99A3',
    borderRadius: '5px',
  },
};
