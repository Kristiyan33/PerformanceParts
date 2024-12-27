'use client'; // This is necessary to use React hooks

import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../lib/firebase'; // Import your Firebase auth object
import { useRouter } from 'next/navigation'; // To handle redirection after login

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const router = useRouter(); // Hook to redirect user after successful login

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('User logged in:', userCredential.user);
      setSuccess(true);
      // Redirect to homepage after successful login
      router.push('/');
    } catch (err) {
      setError(err.message);
      setSuccess(false);
    }
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.dimmedOverlay}></div> {/* Dimmed overlay */}
      <div style={styles.formContainer}>
        <h1 style={styles.title}>Log in to your account</h1>
        <form onSubmit={handleLogin} style={styles.form}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
          <button type="submit" style={styles.button}>
            Login
          </button>
        </form>
        {error && <p style={styles.error}>{error}</p>}
        {success && <p style={styles.success}>Login successful!</p>}
      </div>
    </div>
  );
}

const styles = {
  pageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundImage: 'url("images/Home page 1.jpg")', // Replace with your image path
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative', // Allows overlay layering
    overflow: 'hidden',
  },
  dimmedOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black for dimming
    zIndex: 1, // Places overlay below form container
  },
  formContainer: {
    backgroundColor: '#7fa1c3', // Dark card style
    padding: '2rem 3rem',
    borderRadius: '16px', // Increased for more rounded edges
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    width: '100%',
    maxWidth: '400px',
    textAlign: 'center',
    zIndex: 2, // Places form above the overlay
  },
  title: {
    fontSize: '2rem',
    marginBottom: '1.5rem',
    color: '#e2dad6', // Light text for dark background
    fontWeight: 'bold',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  input: {
    padding: '1rem',
    fontSize: '1rem',
    border: '1px solid #555', // Subtle border for inputs
    borderRadius: '4px',
    width: '100%',
    boxSizing: 'border-box',
    backgroundColor: '#3b3e44', // Match dark theme
    color: '#fff', // Light text for input
  },
  button: {
    padding: '1rem',
    fontSize: '1.1rem',
    backgroundColor: '#6482ad', // Accent color for buttons
    color: '#e2dad6',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'background-color 0.3s',
  },
  buttonHover: {
    backgroundColor: '#c0392b', // Darker red on hover
  },
  error: {
    color: '#e74c3c', // Match the error color with the site's palette
    fontSize: '1rem',
    marginTop: '1rem',
  },
  success: {
    color: '#2ecc71', // Bright green for success
    fontSize: '1rem',
    marginTop: '1rem',
  },
};

