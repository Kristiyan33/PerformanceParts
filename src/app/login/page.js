'use client';

import { useState, useEffect } from 'react';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const isAdmin = user.email.includes('admin@');
        localStorage.setItem('isAdmin', JSON.stringify(isAdmin)); // Store role
        router.push('/');
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('Потребител влезе:', user);

      const isAdmin = user.email.includes('admin@');
      localStorage.setItem('isAdmin', JSON.stringify(isAdmin)); // Store role

      setSuccess(true);
      router.push('/'); // Redirect to home for everyone
    } catch (err) {
      setError('Грешен имейл или парола. Опитайте отново.');
    }
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.dimmedOverlay}></div>
      <div style={styles.formContainer}>
        <h1 style={styles.title}>Вход в Профила</h1>
        <form onSubmit={handleLogin} style={styles.form}>
          <input
            type="email"
            placeholder="Имейл"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Парола"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
          <button type="submit" style={styles.button}>Вход</button>
        </form>
        {error && <p style={styles.error}>{error}</p>}
        {success && <p style={styles.success}>Успешен вход!</p>}
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
    backgroundImage: 'url("images/login & register background.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  dimmedOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1,
  },
  formContainer: {
    padding: '2rem 3rem',
    borderRadius: '16px',
    width: '100%',
    maxWidth: '400px',
    textAlign: 'center',
    zIndex: 2,
    backdropFilter: 'blur(10px)',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '1.5rem',
    color: '#e2dad6',
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
    border: '1px solid #555',
    borderRadius: '4px',
    width: '100%',
    boxSizing: 'border-box',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    color: '#fff',
  },
  button: {
    padding: '1rem',
    fontSize: '1.1rem',
    backgroundColor: '#6482ad',
    color: '#e2dad6',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'background-color 0.3s',
  },
  error: {
    color: '#e74c3c',
    fontSize: '1rem',
    marginTop: '1rem',
  },
  success: {
    color: '#2ecc71',
    fontSize: '1rem',
    marginTop: '1rem',
  },
};
