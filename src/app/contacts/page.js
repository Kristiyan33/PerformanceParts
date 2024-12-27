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
      console.log('Form submitted:', { name, email, message });
      setSuccess(true);
      setError('');
      setName('');
      setEmail('');
      setMessage('');
    } else {
      setSuccess(false);
      setError('Please fill in all fields.');
    }
  };

  return (
    <div style={styles.pageContainer}>
      {/* Left Section */}
      <div style={styles.leftSection}>
        <h1 style={styles.title}>About Us</h1>
        <p style={styles.aboutText}>
          Welcome to our website! We are a team of passionate individuals committed to delivering the best service possible.
          Our goal is to make a positive impact on the community through innovation, dedication, and collaboration.
        </p>
      </div>

      {/* Right Section */}
      <div style={styles.rightSection}>
        <h1 style={styles.title}>Contact Us</h1>
        <p style={styles.contactInfo}>
          <strong>Email:</strong> contact@ourwebsite.com
        </p>
        <p style={styles.socialMediaTitle}>Follow Us:</p>
        <ul style={styles.socialMediaLinks}>
          <li><a href="https://facebook.com" style={styles.link}>Facebook</a></li>
          <li><a href="https://twitter.com" style={styles.link}>Twitter</a></li>
          <li><a href="https://instagram.com" style={styles.link}>Instagram</a></li>
        </ul>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
          />
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />
          <textarea
            placeholder="Your Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={styles.textarea}
          />
          <button type="submit" style={styles.button}>Send</button>
        </form>
        {success && <p style={styles.successMessage}>Message sent successfully!</p>}
        {error && <p style={styles.errorMessage}>{error}</p>}
      </div>
    </div>
  );
}

const styles = {
  pageContainer: {
    display: 'flex',
    height: '100vh', // Full height of the viewport
    backgroundImage: 'url("images/Home page 1.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    gap: '2rem',
    padding: '2rem',
  },
  leftSection: {
    flex: 1,
    backgroundColor: 'rgba(60, 80, 100, 0.85)',
    borderRadius: '16px',
    padding: '2rem',
    color: '#e2dad6',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%', // Ensures the section fills vertical space
  },
  rightSection: {
    flex: 1,
    backgroundColor: 'rgba(60, 80, 100, 0.85)',
    borderRadius: '16px',
    padding: '2rem',
    color: '#e2dad6',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: '100%', // Ensures the section fills vertical space
  },
  title: {
    fontSize: '2rem',
    marginBottom: '1rem',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  aboutText: {
    fontSize: '1.2rem',
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
    color: '#add8e6',
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
    border: '1px solid #ccc',
    borderRadius: '4px',
    backgroundColor: '#3b3e44',
    color: '#fff',
  },
  textarea: {
    padding: '0.8rem',
    fontSize: '1rem',
    border: '1px solid #ccc',
    borderRadius: '4px',
    height: '6rem',
    backgroundColor: '#3b3e44',
    color: '#fff',
  },
  button: {
    padding: '1rem',
    fontSize: '1rem',
    backgroundColor: '#6482ad',
    color: '#e2dad6',
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
