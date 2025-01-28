'use client';

import React from 'react';

export default function HomePage() {
  return (
    <div style={styles.pageContainer}>
      {/* Hero Section */}
      <section style={styles.heroSection}>
        <div style={styles.heroTextContainer}>
          <h1 style={styles.heroText}>Добре дошли в Performance Parts</h1>
          <p style={styles.heroSubtitle}>Вашето място за най-добрият силов тунинг на вашия автомобил!</p>
          <button style={styles.findOutButton} onClick={() => window.location.href = '/modYourCar'}>Научете повече!</button>
        </div>
      </section>

      {/* Catalogue Section */}
      <section style={styles.catalogueSection}>
        <h2 style={styles.catalogueTitle}>Нашият каталог</h2>
        <div style={styles.buttonContainer}>
          <button style={styles.catalogueButton}>
            <div style={styles.textWrapper}>Посети каталога!</div>
          </button>
        </div>
      </section>
    </div>
  );
}

const styles = {
  pageContainer: {
    fontFamily: 'Poppins, sans-serif',
    backgroundColor: '#121212',
    color: '#e0e0e0',
    padding: '2rem',
  },
  heroSection: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundImage: 'url("/images/homePage.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: '#fff',
    height: '100vh',
    position: 'relative',
    padding: '2rem',
    borderRadius: '25px'
  },

  heroTextContainer: {
    position: 'absolute',
    marginTop: '5px',
    marginLeft: '10px',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: '1.5rem',
    borderRadius: '10px',
  },

  heroText: {
    fontSize: '3rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
    color: '#fff',
  },

  heroSubtitle: {
    fontSize: '1.5rem',
    marginBottom: '1rem',
  },

  findOutButton: {
    backgroundColor: '#3C5173',
    color: '#E2dad6',
    padding: '1rem 2rem',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    transition: 'background-color 0.3s',
    fontSize: '1.2rem',
    marginTop: '1rem',
  },

  catalogueSection: {
    padding: '4rem 2rem',
    backgroundColor: '#1e1e1e',
    textAlign: 'center',
    marginTop: '20px',
    borderRadius: '25px'
  },

  catalogueTitle: {
    fontSize: '3rem',
    fontWeight: 'bold',
    marginBottom: '2rem',
  },

  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
  },

  catalogueButton: {
    background: 'url("/images/engine.jpg") center/cover no-repeat',
    color: '#e2dad6',
    fontSize: '1.5rem',
    padding: '2rem',
    border: '2px solid #3C5173',
    borderRadius: '10px',
    cursor: 'pointer',
    width: '30%',
    height: '500px',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Create the dimmed and blurred background around the text inside each button
  textWrapper: {
    position: 'relative',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',  // Dimmed effect
    padding: '1rem 2rem',
    borderRadius: '10px',
    backdropFilter: 'blur(5px)',  // Blur effect around the text
    fontWeight: 'bold',
    fontSize: '1.5rem',
    color: '#fff',
  },
};


