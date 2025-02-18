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
          <p style={styles.contactInfo}><strong>Имейл:</strong> contact@ourwebsite.com</p>
          <p style={styles.socialMediaTitle}>Последвайте ни:</p>
          <ul style={styles.socialMediaLinks}>
            <li><a href="https://facebook.com" style={styles.link}>Facebook</a></li>
            <li><a href="https://twitter.com" style={styles.link}>Twitter</a></li>
            <li><a href="https://instagram.com" style={styles.link}>Instagram</a></li>
          </ul>
          <form onSubmit={handleSubmit} style={styles.form}>
            <input type="text" placeholder="Вашето име" value={name} onChange={(e) => setName(e.target.value)} style={styles.input} />
            <input type="email" placeholder="Вашият имейл" value={email} onChange={(e) => setEmail(e.target.value)} style={styles.input} />
            <textarea placeholder="Вашето съобщение" value={message} onChange={(e) => setMessage(e.target.value)} style={styles.textarea} />
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
    height: '100vh',
    backgroundImage: 'url("images/contacts page background.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backdropFilter: 'blur(10px)',
  },
  contentContainer: {
    position: 'relative',
    display: 'flex',
    gap: '2rem',
    padding: '2rem',
    justifyContent: 'center',
    alignItems: 'stretch', // Align sections vertically
    height: '100%',
  },
  leftSection: {
    flex: 1,  // Take equal space with the right section
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: '16px',
    padding: '2rem',
    color: '#1F2937',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start', // Align content to the top
    alignItems: 'center',
  },
  rightSection: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: '16px',
    padding: '2rem',
    color: '#1F2937',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '1rem',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  aboutText: {
    fontSize: '1.5rem',
    textAlign: 'center',
    lineHeight: '1.8',
  },
  contactInfo: {
    fontSize: '1.2rem',
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
    textAlign: 'center',
  },
  link: {
    textDecoration: 'none',
    color: '#1F2937',
    fontSize: '1rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    width: '100%',
    maxWidth: '400px',
  },
  input: {
    padding: '0.8rem',
    fontSize: '1rem',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#1F2937',
    color: '#fff',
  },
  textarea: {
    padding: '0.8rem',
    fontSize: '1rem',
    border: 'none',
    borderRadius: '4px',
    height: '6rem',
    backgroundColor: '#1F2937',
    color: '#fff',
  },
  button: {
    padding: '1rem',
    fontSize: '1rem',
    backgroundColor: '#3C5173',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  successMessage: {
    color: '#2ecc71',
    fontSize: '1rem',
    marginTop: '1rem',
  },
  errorMessage: {
    color: '#e74c3c',
    fontSize: '1rem',
    marginTop: '1rem',
  },
};
