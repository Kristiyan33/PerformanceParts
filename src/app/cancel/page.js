export default function CancelPage() {
  return (
    <div style={styles.container}>
      <h1>Payment Canceled</h1>
      <p>Your payment was not completed. You can try again.</p>
      <a href="/" style={styles.link}>Go back to Home</a>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    padding: "2rem",
    fontFamily: "Arial, sans-serif",
  },
  link: {
    display: "inline-block",
    marginTop: "1rem",
    padding: "0.8rem 1.5rem",
    backgroundColor: "#007bff",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "4px",
  },
};

  