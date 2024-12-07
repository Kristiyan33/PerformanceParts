// src/app/page.js
export default function HomePage() {
  return (
    <div>
      {/* First Section: Hero Section with Image */}
      <section style={styles.heroSection}>
        <h1 style={styles.heroText}>Welcome to Performance Parts</h1>
        <p style={styles.heroSubtitle}>Upgrade Your Ride with the Best Performance Parts</p>
      </section>

      {/* Second Section: Our Catalogue */}
      <section style={styles.catalogueSection}>
        <h2 style={styles.catalogueTitle}>Our Catalogue</h2>
        <div style={styles.buttonContainer}>
          <button style={styles.catalogueButtonEngine}>Engine</button>
          <button style={styles.catalogueButtonSuspension}>Suspension</button>
          <button style={styles.catalogueButtonAero}>Aero</button>
        </div>
      </section>
    </div>
  );
}

const styles = {
  // First Section: Hero Section with Background Image
  heroSection: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    backgroundImage: 'url("/images/wp8235666.jpg")', // Your image path here
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: '#fff',
    height: '100vh', // Takes the full height of the screen
    padding: '2rem',
  },
  heroText: {
    fontSize: '3rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
  },
  heroSubtitle: {
    fontSize: '1.5rem',
    marginBottom: '2rem',
  },

  // Second Section: Catalogue
  catalogueSection: {
    padding: '4rem 2rem',
    backgroundColor: '#f8f8f8', // Light background color for this section
    color: '#333',
    textAlign: 'center',
  },
  catalogueTitle: {
    fontSize: '2.5rem',
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

  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between', // To spread out buttons across the entire width
    gap: '1rem', // Space between buttons
    width: '100%', // Make the container take up full width
  },

  catalogueButtonEngine: {
    backgroundColor: '#e74c3c', // Fallback color in case image fails
    color: '#fff',
    fontSize: '1.5rem',
    padding: '2rem 0', // Vertical padding for a large button
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    transition: 'background-color 0.3s',
    display: 'flex', // Use flexbox to align text at the bottom
    justifyContent: 'center', // Center the text horizontally
    alignItems: 'flex-end', // Align the text at the bottom
    height: '200px', // Set a fixed height for the button
    width: '33.33%', // Each button will take one third of the page width
    textAlign: 'center', // Center the text horizontally
    position: 'relative', // Make the button container position relative to align the text box properly
    backgroundImage: 'url("/images/engine.jpg")', // Background image for Engine button (you can replace the path)
    backgroundSize: 'cover', // Ensure the image covers the whole button
    backgroundPosition: 'center', // Center the background image
    backgroundRepeat: 'no-repeat', // Prevent image repetition
  },

  catalogueButtonSuspension: {
    backgroundColor: '#e74c3c', // Fallback color in case image fails
    color: '#fff',
    fontSize: '1.5rem',
    padding: '2rem 0', // Vertical padding for a large button
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    transition: 'background-color 0.3s',
    display: 'flex', // Use flexbox to align text at the bottom
    justifyContent: 'center', // Center the text horizontally
    alignItems: 'flex-end', // Align the text at the bottom
    height: '200px', // Set a fixed height for the button
    width: '33.33%', // Each button will take one third of the page width
    textAlign: 'center', // Center the text horizontally
    position: 'relative', // Make the button container position relative to align the text box properly
    backgroundImage: 'url("/images/suspension.jpg")', // Background image for Engine button (you can replace the path)
    backgroundSize: 'cover', // Ensure the image covers the whole button
    backgroundPosition: 'center', // Center the background image
    backgroundRepeat: 'no-repeat', // Prevent image repetition
  },

  catalogueButtonAero: {
    backgroundColor: '#e74c3c', // Fallback color in case image fails
    color: '#fff',
    fontSize: '1.5rem',
    padding: '2rem 0', // Vertical padding for a large button
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    transition: 'background-color 0.3s',
    display: 'flex', // Use flexbox to align text at the bottom
    justifyContent: 'center', // Center the text horizontally
    alignItems: 'flex-end', // Align the text at the bottom
    height: '200px', // Set a fixed height for the button
    width: '33.33%', // Each button will take one third of the page width
    textAlign: 'center', // Center the text horizontally
    position: 'relative', // Make the button container position relative to align the text box properly
    backgroundImage: 'url("/images/aero.jpg")', // Background image for Engine button (you can replace the path)
    backgroundSize: 'cover', // Ensure the image covers the whole button
    backgroundPosition: 'center', // Center the background image
    backgroundRepeat: 'no-repeat', // Prevent image repetition
  },

  buttonText: {
    position: 'absolute',
    bottom: '10px', // Keep the text at the bottom with some margin
    width: '100%',
    textAlign: 'center', // Ensure the text is horizontally centered
  }
};
