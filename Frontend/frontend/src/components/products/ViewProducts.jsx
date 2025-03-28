import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ViewProducts() {
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // Fetch categories & products on mount
  useEffect(() => {
    axios.get("http://localhost:8080/categories").then((res) => setCategories(res.data));
    axios.get("http://localhost:8080/products").then((res) => {
      setAllProducts(res.data);
      setProducts(res.data);
    });
  }, []);

  // Filter by category
  useEffect(() => {
    if (selectedCategoryId) {
      const filtered = allProducts.filter(p => p.category?.id?.toString() === selectedCategoryId);
      setProducts(filtered);
    } else {
      setProducts(allProducts);
    }
  }, [selectedCategoryId, allProducts]);

  // Delete product handler
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await axios.delete(`http://localhost:8080/admin/products/${id}`, { withCredentials: true });
      setAllProducts((prev) => prev.filter((p) => p.id !== id));
      alert("✅ Product deleted");
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow space-y-4">
      <h2 className="text-xl font-bold text-[#03613a]">📦 View Products</h2>

      {/* Category Filter */}
      <select
        value={selectedCategoryId}
        onChange={(e) => setSelectedCategoryId(e.target.value)}
        className="border rounded px-3 py-2 w-64"
      >
        <option value="">All Categories</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>{cat.name}</option>
        ))}
      </select>

      {/* Products Table */}
      {products.length > 0 ? (
        <table className="w-full text-sm border border-gray-300 mt-4">
          <thead className="bg-[#03613a] text-white">
            <tr>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Description</th>
              <th className="p-2 border">Specifications (limited)</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-b hover:bg-gray-100">
                <td className="p-2 border">{p.name}</td>
                <td className="p-2 border truncate">{p.description}</td>
                <td className="p-2 border">
                  <ul className="list-disc pl-4">
                    {p.specifications.slice(0, 3).map((spec, i) => (
                      <li key={i}>{spec.key}: {spec.value}</li>
                    ))}
                    {p.specifications.length > 3 && (
                      <li className="text-xs text-gray-500">+ {p.specifications.length - 3} more</li>
                    )}
                  </ul>
                </td>
                <td className="p-2 border space-x-2">
                  <button
                    className="bg-yellow-400 hover:bg-yellow-500 text-white px-2 py-1 rounded"
                    onClick={() => navigate(`/admin/products/${p.id}/edit`)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                    onClick={() => handleDelete(p.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-500">No products found.</p>
      )}
    </div>
  );
}
