import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function ProductList() {
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:8080/categories").then((res) => setCategories(res.data));
  }, []);

  useEffect(() => {
    if (selectedCategoryId) {
      axios.get(`http://localhost:8080/products/category/${selectedCategoryId}`)
        .then((res) => setProducts(res.data));
    } else {
      setProducts([]);
    }
  }, [selectedCategoryId]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    await axios.delete(`http://localhost:8080/admin/products/${id}`);
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-semibold">📦 Product Listing by Category</h2>

      <select
        className="border rounded px-3 py-2"
        value={selectedCategoryId}
        onChange={(e) => setSelectedCategoryId(e.target.value)}
      >
        <option value="">-- Select a Category --</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>{cat.name}</option>
        ))}
      </select>

      <table className="w-full text-sm border border-gray-300">
        <thead className="bg-[#03613a] text-white">
          <tr>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Description</th>
            <th className="p-2 border">Specifications (top 3)</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id} className="border-b hover:bg-gray-100">
              <td className="p-2 border">{p.name}</td>
              <td className="p-2 border">{p.description}</td>
              <td className="p-2 border">
                <ul>
                  {p.specifications.slice(0, 3).map((spec, i) => (
                    <li key={i}>{spec.key}: {spec.value}</li>
                  ))}
                  {p.specifications.length > 3 && <li>...more</li>}
                </ul>
              </td>
              <td className="p-2 border space-x-2">
                <Button size="sm" onClick={() => navigate(`/admin/products/${p.id}/edit`)}>Edit</Button>
                <Button size="sm" variant="destructive" onClick={() => handleDelete(p.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
