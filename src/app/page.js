'use client'

import React, { useState } from 'react'; 

export default function HomePage() {
  // Modal logic for the Arrow Section
  const steps = [
    { id: 1, content: "Step 1: Choose the right engine part." },
    { id: 2, content: "Step 2: Install the part correctly." },
    { id: 3, content: "Step 3: Test the performance after installation." },
    { id: 4, content: "Step 4: Enjoy your upgraded ride!" },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const handleStepClick = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalContent("");
  };

  return (
    <div>
      {/* First Section: Hero Section with Image */}
      <section style={styles.heroSection}>
        <div style={styles.heroTextContainer}>
          <h1 style={styles.heroText}>Welcome to Performance Parts</h1>
          <p style={styles.heroSubtitle}>Upgrade Your Ride with the Best Performance Parts</p>
          <button style={styles.findOutButton} onClick={() => window.location.href = '/modYourCar'}>Find Out</button>
        </div>
      </section>

      {/* Second Section: Our Catalogue */}
      <section style={styles.catalogueSection}>
        <h2 style={styles.catalogueTitle}>Our Catalogue</h2>
        <div style={styles.buttonContainer}>
          <button style={styles.catalogueButtonEngine}>Engine</button>
          <button style={styles.catalogueButtonSuspension}>Suspension</button>
          <button style={styles.catalogueButtonAero}>Aerodynamics</button>
        </div>
      </section>

      {/* Arrow Section */}
      <section style={styles.arrowSection}>
        <div style={styles.arrowContainer}>
          <div style={styles.arrow}></div>
          {steps.map((step) => (
            <div
              key={step.id}
              style={{ ...styles.step, top: `${(step.id - 1) * 25}%` }}
              onClick={() => handleStepClick(step.content)}
            >
              <span style={styles.stepNumber}>{step.id}</span>
            </div>
          ))}
        </div>

        {/* Modal Popup */}
        {isModalOpen && (
          <div style={styles.modalOverlay}>
            <div style={styles.modal}>
              <h2>Step Details</h2>
              <p>{modalContent}</p>
              <button onClick={handleCloseModal} style={styles.closeButton}>Close</button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

const styles = {
  // First Section: Hero Section with Background Image
  heroSection: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    textAlign: 'left',
    backgroundImage: 'url("/images/homePage.jpg")', // Your image path here
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: '#fff',
    height: '100vh', // Takes the full height of the screen
    padding: '2rem',
  },
  heroTextContainer: {
    marginTop: '2rem', // To push the text from the very top
    paddingLeft: '2rem',
    textAlign: 'left',
  },
  heroText: {
    fontSize: '3rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
  },
  heroSubtitle: {
    fontSize: '1.5rem',
    marginBottom: '1rem',
  },
  findOutButton: {
    backgroundColor: '#6482ad',
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

  // Second Section: Catalogue
  catalogueSection: {
    padding: '4rem 2rem',
    backgroundColor: '#F5eded', // Light background color for this section
    color: '#6482ad',
    textAlign: 'center',
    borderTop: '10px solid #6482ad', // Red line above the catalogue section
    borderBottom: '10px solid #6482ad', // Red line below the catalogue section
  },
  catalogueTitle: {
    fontSize: '3rem',
    fontWeight: 'bold',
    marginBottom: '2rem',
    textTransform: 'uppercase',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between', // To spread out buttons across the entire width
    gap: '1rem', // Space between buttons
    width: '100%', // Make the container take up full width
  },

  catalogueButtonEngine: {
    backgroundColor: '#e74c3c', // Fallback color in case image fails
    color: '#e2dad6',
    fontSize: '1.5rem',
    padding: '2rem 0', // Vertical padding for a large button
    border: '5px solid #6482ad', // Red border around the button
    borderRadius: '12px',
    cursor: 'pointer',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    transition: 'background-color 0.3s, border-color 0.3s', // Add transition for border color
    display: 'flex', // Use flexbox to align text at the bottom
    justifyContent: 'center', // Center the text horizontally
    alignItems: 'flex-end', // Align the text at the bottom
    height: '375px', // Increased height for a taller button
    width: '33.33%', // Each button will take one third of the page width
    textAlign: 'center', // Center the text horizontally
    position: 'relative', // Make the button container position relative to align the text box properly
    backgroundImage: 'url("/images/engine.jpg")', // Background image for Engine button (you can replace the path)
    backgroundSize: 'cover', // Ensure the image covers the whole button
    backgroundPosition: 'center', // Center the background image
    backgroundRepeat: 'no-repeat', // Prevent image repetition
    boxSizing: 'border-box', // Ensure padding doesn't cause overflow
  },

  catalogueButtonSuspension: {
    backgroundColor: '#e74c3c', // Fallback color in case image fails
    color: '#e2dad6',
    fontSize: '1.5rem',
    padding: '2rem 0', // Vertical padding for a large button
    border: '5px solid #6482ad', // Red border around the button
    borderRadius: '12px',
    cursor: 'pointer',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    transition: 'background-color 0.3s, border-color 0.3s', // Add transition for border color
    display: 'flex', // Use flexbox to align text at the bottom
    justifyContent: 'center', // Center the text horizontally
    alignItems: 'flex-end', // Align the text at the bottom
    height: '375px', // Increased height for a taller button
    width: '33.33%', // Each button will take one third of the page width
    textAlign: 'center', // Center the text horizontally
    position: 'relative', // Make the button container position relative to align the text box properly
    backgroundImage: 'url("/images/suspension.jpg")', // Background image for Suspension button (you can replace the path)
    backgroundSize: 'cover', // Ensure the image covers the whole button
    backgroundPosition: 'center', // Center the background image
    backgroundRepeat: 'no-repeat', // Prevent image repetition
    boxSizing: 'border-box', // Ensure padding doesn't cause overflow
  },

  catalogueButtonAero: {
    backgroundColor: '#e74c3c', // Fallback color in case image fails
    color: '#e2dad6',
    fontSize: '1.5rem',
    padding: '2rem 0', // Vertical padding for a large button
    border: '5px solid #6482ad', // Red border around the button
    borderRadius: '12px',
    cursor: 'pointer',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    transition: 'background-color 0.3s, border-color 0.3s', // Add transition for border color
    display: 'flex', // Use flexbox to align text at the bottom
    justifyContent: 'center', // Center the text horizontally
    alignItems: 'flex-end', // Align the text at the bottom
    height: '375px', // Increased height for a taller button
    width: '33.33%', // Each button will take one third of the page width
    textAlign: 'center', // Center the text horizontally
    position: 'relative', // Make the button container position relative to align the text box properly
    backgroundImage: 'url("/images/aerodynamics.webp")', // Background image for Aero button (you can replace the path)
    backgroundSize: 'cover', // Ensure the image covers the whole button
    backgroundPosition: 'center', // Center the background image
    backgroundRepeat: 'no-repeat', // Prevent image repetition
    boxSizing: 'border-box', // Ensure padding doesn't cause overflow
  },

  // Arrow Section
  arrowSection: {
    position: 'relative',
    padding: '4rem 2rem',
    backgroundColor: '#f8f8f8',
    textAlign: 'center',
  },
  arrowContainer: {
    position: 'relative',
    width: '100px',
    margin: '0 auto',
    height: '500px',
  },
  arrow: {
    width: '100px',
    height: '100px',
    backgroundColor: '#e74c3c',
    clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
    position: 'absolute',
    top: '0',
    left: '0',
    margin: '0 auto',
  },
  step: {
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    cursor: 'pointer',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#e74c3c',
    backgroundColor: '#fff',
    borderRadius: '50%',
    padding: '10px',
    width: '40px',
    height: '40px',
    textAlign: 'center',
    lineHeight: '40px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    zIndex: 2,
  },
  stepNumber: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },

  // Modal
  modalOverlay: {
    position: 'fixed',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  modal: {
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '8px',
    width: '50%',
    maxWidth: '600px',
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: '#e74c3c',
    color: '#4c585b',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
    marginTop: '20px',
  }
};

