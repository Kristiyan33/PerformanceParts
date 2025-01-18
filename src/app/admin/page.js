
import AddProduct from "../../components/addProduct";
import ProductList from "../../components/productList";

const AdminPage = () => {
  return (
    <div>
      <h1>Admin Panel</h1>
      <AddProduct />
      <ProductList />
    </div>
  );
};

export default AdminPage;
