'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '../../lib/CartContext';

export default function Success() {
  const { clearCart } = useCart();
  const [redirecting, setRedirecting] = useState(false);
  const [showButton, setShowButton] = useState(false);

  const router = useRouter();

  useEffect(() => {
    // Clear cart safely
    clearCart();

    // Set timeout for redirect message and button
    const timeout = setTimeout(() => {
      setRedirecting(true);
      setShowButton(true);
    }, 2000);

    return () => clearTimeout(timeout);
  }, [clearCart]);

  const handleRedirect = () => {
    router.push('/');
  };

  return (
    <div style={styles.page}>
      <div style={styles.overlay}>
        <div style={styles.card}>
          <div style={styles.iconWrapper}>
            <div style={styles.checkmark}>✔</div>
          </div>
          <h1 style={styles.heading}>Плащането е успешно! ✅</h1>
          <p style={styles.text}>Благодарим ви за вашата поръчка.</p>
          {redirecting && (
            <p style={styles.redirectText}>Ще бъдете пренасочени скоро...</p>
          )}
          {showButton && (
            <button style={styles.button} onClick={handleRedirect}>
              Обратно към началната страница
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    backgroundImage: 'url(/images/success-bg.jpg)', // Add your image to public/images/
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Montserrat, sans-serif',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: '4rem 2rem',
    borderRadius: '15px',
    maxWidth: '600px',
    width: '90%',
    color: 'white',
    textAlign: 'center',
    boxShadow: '0 10px 25px rgba(0,0,0,0.4)',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  iconWrapper: {
    backgroundColor: '#28a745',
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '1.5rem',
    animation: 'pop 0.6s ease',
  },
  checkmark: {
    fontSize: '2.5rem',
    color: 'white',
  },
  heading: {
    fontSize: '2rem',
    marginBottom: '0.5rem',
    fontWeight: '700',
  },
  text: {
    fontSize: '1.2rem',
    color: '#ccc',
    marginBottom: '1rem',
  },
  redirectText: {
    fontSize: '1rem',
    color: '#aaa',
    marginBottom: '1.5rem',
  },
  button: {
    padding: '12px 24px',
    fontSize: '1.1rem',
    backgroundColor: '#1e88e5',
    border: 'none',
    borderRadius: '8px',
    color: '#fff',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
};

// You can add keyframe animations globally in your styles/globals.css:
/*
@keyframes pop {
  0% {
    transform: scale(0.5);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
*/
