'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AddProduct from "../../components/addProduct";
import ProductList from "../../components/productList";

const AdminPage = () => {
  const [isAdmin, setIsAdmin] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const adminStatus = JSON.parse(localStorage.getItem("isAdmin"));
    if (!adminStatus) {
      setIsAdmin(false);
    } else {
      setIsAdmin(true);
    }
  }, []);

  if (isAdmin === null) return <div>Loading...</div>;

  if (!isAdmin) {
    return (
      <div style={styles.overlay}>
        <div style={styles.modal}>
          <h2 style={styles.modalTitle}>Нямате достъп до тази страница</h2>
          <p style={styles.modalText}>Само администратори могат да влизат тук.</p>
          <button style={styles.button} onClick={() => router.push("/")}>
            Назад
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.wrapper}>
      <h1 style={styles.title}>Admin Panel</h1>
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Добавяне на нов продукт</h2>
        <AddProduct />
      </div>
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Управление на продукти</h2>
        <ProductList />
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    backgroundColor: '#2c2c2c',  // Dark background for the whole page
    color: '#fff',
    fontFamily: 'Roboto, sans-serif',
    minHeight: '100vh',
    padding: '2rem',
  },
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backdropFilter: "blur(8px)",
  },
  modal: {
    backgroundColor: "#2c2c2c",  // Dark background for modal
    padding: "2rem",
    borderRadius: "10px",
    textAlign: "center",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
  },
  modalTitle: {
    fontSize: "1.8rem",
    fontWeight: "bold",
    marginBottom: "1rem",
    color: "#f5eded", // Light color for text
  },
  modalText: {
    fontSize: "1.2rem",
    marginBottom: "1.5rem",
    color: "#bbb",  // Lighter color for modal text
  },
  button: {
    padding: "0.8rem 1.5rem",
    fontSize: "1rem",
    color: "#fff",
    backgroundColor: "#3C5173",  // Matching button color
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  title: {
    fontSize: "2.5rem",
    fontWeight: "700",
    color: "#3C5173",  // Title color matching the main page
    textAlign: "center",
    marginBottom: "2rem",
  },
  section: {
    marginBottom: "3rem",
    padding: "1.5rem",
    backgroundColor: "#3C5173",  // Lighter background for sections
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  sectionTitle: {
    fontSize: "2rem",
    fontWeight: "600",
    color: "#fff",
    marginBottom: "1.5rem",
    borderBottom: "2px solid #fff",  // White border for section title
    paddingBottom: "0.5rem",
  },
  input: {
    padding: '0.8rem',
    fontSize: '1rem',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#1F2937',
    color: '#fff',
    marginBottom: '1rem',
  },
  textarea: {
    padding: '0.8rem',
    fontSize: '1rem',
    border: 'none',
    borderRadius: '4px',
    height: '6rem',
    backgroundColor: '#1F2937',
    color: '#fff',
    marginBottom: '1rem',
  },
};


export default AdminPage;
