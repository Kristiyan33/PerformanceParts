'use client'; // Необходимо за използване на React hooks

import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../lib/firebase'; // Импортирайте Firebase auth обекта
import { useRouter } from 'next/navigation'; // За пренасочване след вход

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const router = useRouter(); // Hook за пренасочване след успешен вход

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('Потребител влезе:', userCredential.user);
      setSuccess(true);
      // Пренасочване към началната страница след успешен вход
      router.push('/');
    } catch (err) {
      setError(err.message);
      setSuccess(false);
    }
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.dimmedOverlay}></div> {/* Затъмнен слой */}
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
          <button type="submit" style={styles.button}>
            Вход
          </button>
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
    backgroundImage: 'url("images/login & register background.jpg")', // Път до фоновото изображение
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative', // Позволява наслояване
    overflow: 'hidden',
  },
  dimmedOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Полупрозрачно черно за затъмняване
    zIndex: 1, // Поставя слоя под формата
  },
  formContainer: {
    padding: '2rem 3rem',
    borderRadius: '16px',
    width: '100%',
    maxWidth: '400px',
    textAlign: 'center',
    zIndex: 2, // Поставя формата над затъмнения слой
    backdropFilter: 'blur(10px)', // Добавя замъгляване
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // Леко прозрачен ефект
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Леко засенчване за стил
  },
  title: {
    fontSize: '2rem',
    marginBottom: '1.5rem',
    color: '#e2dad6', // Светъл текст за контраст
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
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Полупрозрачен тъмен фон
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

