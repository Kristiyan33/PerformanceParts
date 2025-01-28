'use client';

export default function CheckoutPage() {
  return (
    <div style={styles.pageContainer}>
      <h1 style={styles.title}>Checkout</h1>
      <form style={styles.form}>
        <div style={styles.formGroup}>
          <label htmlFor="name" style={styles.label}>Name:</label>
          <input id="name" type="text" style={styles.input} />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="address" style={styles.label}>Address:</label>
          <textarea id="address" style={styles.input}></textarea>
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="card" style={styles.label}>Card Details:</label>
          <input id="card" type="text" style={styles.input} />
        </div>
        <button type="submit" style={styles.submitButton}>
          Confirm and Pay
        </button>
      </form>
    </div>
  );
}

// Styles
const styles = {
  pageContainer: {
    padding: '2rem',
    fontFamily: 'Montserrat, sans-serif',
  },
  title: {
    fontSize: '2.5rem',
    textAlign: 'center',
    marginBottom: '2rem',
  },
  form: {
    maxWidth: '500px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    fontSize: '1rem',
    marginBottom: '0.5rem',
  },
  input: {
    padding: '0.8rem',
    fontSize: '1rem',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  submitButton: {
    padding: '1rem',
    fontSize: '1rem',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};
