import AddProduct from "../../components/addProduct";
import ProductList from "../../components/productList";

const AdminPage = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Admin Panel</h1>
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Add New Product</h2>
        <AddProduct />
      </div>
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Manage Products</h2>
        <ProductList />
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "900px",
    margin: "2rem auto",
    padding: "1.5rem",
    backgroundColor: "#f8f9fa",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    fontFamily: "'Montserrat', sans-serif",
  },
  title: {
    fontSize: "2.5rem",
    fontWeight: "700",
    color: "#333",
    textAlign: "center",
    marginBottom: "2rem",
  },
  section: {
    marginBottom: "3rem",
    padding: "1rem",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  sectionTitle: {
    fontSize: "1.8rem",
    fontWeight: "600",
    color: "#007bff",
    borderBottom: "2px solid #007bff",
    paddingBottom: "0.5rem",
    marginBottom: "1.5rem",
  },
};

export default AdminPage;
