import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import DashboardHome from "./components/dashboard/DashboardHome";
import AdminLayout from "./components/layout/AdminLayout";
import ProductForm from "./components/products/ProductForm";
import ProductList from "./components/products/ProductList";
import ViewProducts from "./components/products/ViewProducts";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        
        <Route
          path="/dashboard"
          element={
            <AdminLayout>
              <DashboardHome />
            </AdminLayout>
          }
        />

        {/* ✅ Add Product */}
        <Route
          path="/admin/products"
          element={
            <AdminLayout>
              <ProductForm />
            </AdminLayout>
          }
        />

        {/* ✅ Edit Product */}
        <Route
          path="/admin/products/:id/edit"
          element={
            <AdminLayout>
              <ProductForm />
            </AdminLayout>
          }
        />

        {/* ✅ View Products */}
        <Route
          path="/admin/view-products"
          element={
            <AdminLayout>
              <ViewProducts />
            </AdminLayout>
          }
        />

        {/* ✅ Users */}
        <Route
          path="/admin/users"
          element={
            <AdminLayout>
              <div>👥 Users Page</div>
            </AdminLayout>
          }
        />

        {/* ✅ Settings */}
        <Route
          path="/admin/settings"
          element={
            <AdminLayout>
              <div>⚙️ Settings Page</div>
            </AdminLayout>
          }
        />

      </Routes>
    </Router>
  );
}

export default App;