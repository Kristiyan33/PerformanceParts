'use client'; // To use React hooks

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { auth } from '../lib/firebase'; // Import Firebase auth object
import { onAuthStateChanged, signOut } from 'firebase/auth'; // Import Firebase functions for auth
import { useCart } from '../lib/CartContext'; // Import the CartContext
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);
  const { cart } = useCart();
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);
  const router = useRouter();
  
  // State for checking if the user is admin
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        // Check if the user is admin by their email
        if (user.email && user.email.includes('admin@')) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      } else {
        setUser(null);
        setIsAdmin(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setDropdownOpen(false);
    } catch (err) {
      console.error('Error signing out: ', err);
    }
  };

  const handleHover = (link) => setHoveredLink(link);

  return (
    <nav style={styles.navbar}>
      <div style={styles.logoContainer}>
        <Link href="/" style={styles.logoLink}>
          <img src="/images/site logo.png" alt="Logo" style={styles.logo} />
        </Link>
        <Link href="/" style={styles.performanceText}>
          Performance Parts
        </Link>
      </div>

      <div style={styles.navLinks}>
        <Link
          href="/modYourCar"
          style={hoveredLink === 'how-to-mod-your-car' ? { ...styles.navLink, ...styles.hoveredLink } : styles.navLink}
          onMouseEnter={() => handleHover('how-to-mod-your-car')}
          onMouseLeave={() => setHoveredLink(null)}
        >
          Тунинговай колата си!
        </Link>
        <Link
          href="/shop"
          style={hoveredLink === 'shop' ? { ...styles.navLink, ...styles.hoveredLink } : styles.navLink}
          onMouseEnter={() => handleHover('shop')}
          onMouseLeave={() => setHoveredLink(null)}
        >
          Магазин
        </Link>
        <Link
          href="/contacts"
          style={hoveredLink === 'contacts' ? { ...styles.navLink, ...styles.hoveredLink } : styles.navLink}
          onMouseEnter={() => handleHover('contacts')}
          onMouseLeave={() => setHoveredLink(null)}
        >
          Контакти
        </Link>

        {user ? (
          <div style={styles.iconsContainer}>
            {isAdmin ? (
              <button
                onClick={() => router.push('/admin')} // Redirect to admin page
                style={hoveredLink === 'admin' ? { ...styles.navLink, ...styles.hoveredLink } : styles.navLink}
                onMouseEnter={() => handleHover('admin')}
          onMouseLeave={() => setHoveredLink(null)}
              >
                Админ панел
              </button>
            ) : (
              <div style={styles.cartButton}>
                <Link href="/cart" style={styles.cartLink}>
                  <img src="/images/cart icon.png" alt="Cart" style={styles.cartIcon} />
                  {cartItemCount > 0 && <span style={styles.cartBadge}>{cartItemCount}</span>}
                </Link>
              </div>
            )}

            <div
              style={styles.profileButton}
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <img src="/images/user icon.png" alt="Profile" style={styles.profileIcon} />
              <div
                style={{
                  ...styles.dropdownMenu,
                  opacity: dropdownOpen ? 1 : 0,
                  transform: dropdownOpen ? 'translateY(0)' : 'translateY(-10px)',
                  pointerEvents: dropdownOpen ? 'auto' : 'none',
                }}
              >
                <Link href="/account" style={styles.dropdownLink}>
                  Профил
                </Link>
                <button onClick={handleSignOut} style={styles.dropdownLink}>
                  Излез
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
            <Link
              href="/login"
              style={hoveredLink === 'login' ? { ...styles.navLink, ...styles.hoveredLink } : styles.navLink}
              onMouseEnter={() => handleHover('login')}
              onMouseLeave={() => setHoveredLink(null)}
            >
              Влез!
            </Link>
            <Link
              href="/register"
              style={hoveredLink === 'register' ? { ...styles.navLink, ...styles.hoveredLink } : styles.navLink}
              onMouseEnter={() => handleHover('register')}
              onMouseLeave={() => setHoveredLink(null)}
            >
              Регистрирай се!
            </Link>
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
    backgroundColor: '#3C5173',
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
    height: '80px',
    width: 'auto',
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
    gap: '2rem',
    alignItems: 'center',
  },
  navLink: {
    color: '#E2DAD6',
    textDecoration: 'none',
    fontSize: '1.6rem',
    transition: 'color 0.3s ease, background-color 0.3s ease',
    cursor: 'pointer',
    padding: '10px 20px',
    borderRadius: '5px',
  },
  hoveredLink: {
    color: '#80CBC4',
    backgroundColor: '#50688C',
    padding: '12px 22px',
    borderRadius: '8px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.15)',
  },
  iconsContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '2.5rem',
  },
  cartButton: {
    position: 'relative',
  },
  cartLink: {
    textDecoration: 'none',
  },
  cartIcon: {
    width: '60px',
    height: '60px',
  },
  cartBadge: {
    position: 'absolute',
    top: '-10px',
    right: '-10px',
    backgroundColor: '#1F2937',
    color: '#FFF',
    fontSize: '1rem',
    fontWeight: 'bold',
    borderRadius: '20px',
    padding: '4px 8px',
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
    top: '100%',
    right: '0',
    backgroundColor: '#1F2937',
    borderRadius: '8px',
    boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
    zIndex: 1,
    width: '200px',
    transition: 'opacity 0.3s ease, transform 0.3s ease',
  },
  dropdownLink: {
    display: 'block',
    padding: '15px 20px',
    color: '#fff',
    textDecoration: 'none',
    fontSize: '1.4rem',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    borderBottom: '1px solid #3C5173',
  },
  adminButton: {
    color: '#E2DAD6',
    textDecoration: 'none',
    fontSize: '1.6rem',
    transition: 'color 0.3s ease, background-color 0.3s ease',
    cursor: 'pointer',
    padding: '10px 20px',
    borderRadius: '5px',
    backgroundColor: 'transparent',
  },
};
