'use client';

import { useState } from 'react';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && email && message) {
      console.log('Формулярът е изпратен:', { name, email, message });
      setSuccess(true);
      setError('');
      setName('');
      setEmail('');
      setMessage('');
    } else {
      setSuccess(false);
      setError('Моля, попълнете всички полета.');
    }
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.overlay}></div>
      <div style={styles.contentContainer}>
        <div style={styles.leftSection}>
          <h1 style={styles.title}>Тунинг на автомобили</h1>
          <p style={styles.aboutText}>
            Светът на автомобилите и тунинга е като безкрайно морско пътешествие! Всеки автомобил може да бъде трансформиран в нещо уникално – от супер бързи спортни коли до стилни и агресивни машини. Тунингът не е просто за подобряване на производителността, а за създаване на индивидуален стил и израз на личността. От спортни ауспуси до боядисване на каросерията в неонови цветове – няма ограничение за въображението!
          </p>
        </div>
        <div style={styles.rightSection}>
          <h1 style={styles.title}>Свържете се с нас</h1>
          <p style={styles.contactInfo}><strong>Имейл:</strong> performance-parts@gmail.com</p>
          <form onSubmit={handleSubmit} style={styles.form}>
            <input
              type="text"
              placeholder="Вашето име"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={styles.input}
            />
            <input
              type="email"
              placeholder="Вашият имейл"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
            />
            <textarea
              placeholder="Вашето съобщение"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              style={styles.textarea}
            />
            <button type="submit" style={styles.button}>Изпрати</button>
          </form>
          {success && <p style={styles.successMessage}>Съобщението е изпратено успешно!</p>}
          {error && <p style={styles.errorMessage}>{error}</p>}
        </div>
      </div>
    </div>
  );
}

const styles = {
  pageContainer: {
    position: 'relative',
    minHeight: '100vh',
    backgroundImage: 'url("images/contacts page background.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    fontFamily: 'Roboto, sans-serif',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backdropFilter: 'blur(12px)',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  contentContainer: {
    position: 'relative',
    display: 'flex',
    gap: '2rem',
    padding: '3rem',
    justifyContent: 'center',
    alignItems: 'stretch',
    height: '100%',
    zIndex: 1,
  },
  leftSection: {
    flex: 1,
    background: 'rgba(255, 255, 255, 0.15)',
    borderRadius: '16px',
    padding: '2rem',
    color: '#ffffff',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
  },
  rightSection: {
    flex: 1,
    background: 'rgba(255, 255, 255, 0.15)',
    borderRadius: '16px',
    padding: '2rem',
    color: '#ffffff',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
  },
  title: {
    fontSize: '2.2rem',
    marginBottom: '1rem',
    fontWeight: 'bold',
    textAlign: 'center',
    textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
  },
  aboutText: {
    fontSize: '1.4rem',
    textAlign: 'center',
    lineHeight: '1.8',
    color: '#e0e0e0',
  },
  contactInfo: {
    fontSize: '1.1rem',
    marginBottom: '1rem',
    textAlign: 'center',
  },
  socialMediaTitle: {
    fontSize: '1.2rem',
    marginBottom: '0.5rem',
    textAlign: 'center',
  },
  socialMediaLinks: {
    listStyleType: 'none',
    padding: 0,
    marginBottom: '1.5rem',
    display: 'flex',
    gap: '1rem',
  },
  link: {
    textDecoration: 'none',
    color: '#fff',
    fontSize: '1rem',
    transition: 'color 0.3s ease',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    width: '100%',
    maxWidth: '400px',
  },
  input: {
    padding: '0.9rem',
    fontSize: '1rem',
    border: 'none',
    borderRadius: '8px',
    backgroundColor: 'rgba(31, 41, 55, 0.8)',
    color: '#fff',
    outline: 'none',
    transition: 'box-shadow 0.3s ease',
  },
  textarea: {
    padding: '0.9rem',
    fontSize: '1rem',
    border: 'none',
    borderRadius: '8px',
    height: '6rem',
    backgroundColor: 'rgba(31, 41, 55, 0.8)',
    color: '#fff',
    resize: 'vertical',
    outline: 'none',
    transition: 'box-shadow 0.3s ease',
  },
  button: {
    padding: '1rem',
    fontSize: '1rem',
    background: 'linear-gradient(to right, #3C5173, #657fa7)',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'opacity 0.3s ease',
  },
  successMessage: {
    color: '#2ecc71',
    fontSize: '1rem',
    marginTop: '1rem',
    textAlign: 'center',
  },
  errorMessage: {
    color: '#e74c3c',
    fontSize: '1rem',
    marginTop: '1rem',
    textAlign: 'center',
  },
};
