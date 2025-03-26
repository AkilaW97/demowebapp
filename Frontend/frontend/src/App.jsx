import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import DashboardHome from "./components/dashboard/DashboardHome";
import AdminLayout from "./components/layout/AdminLayout";
import ProductForm from "./components/products/ProductForm";

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
        <Route
          path="/admin/products"
          element={
            <AdminLayout>
              <ProductForm />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/users"
          element={
            <AdminLayout>
              <div>👥 Users Page</div>
            </AdminLayout>
          }
        />
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