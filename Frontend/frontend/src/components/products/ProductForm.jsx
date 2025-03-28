<<<<<<< HEAD
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProductManagement = () => {
  const [activeTab, setActiveTab] = useState('view');
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isEditing, setIsEditing] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(null);
  const navigate = useNavigate();

  // Form state
=======
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function ProductForm() {
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");

>>>>>>> f1fb34269917a62217874b5e6c998fcc5f82daae
  const [product, setProduct] = useState({
    name: "",
    description: "",
    imageUrl: "",
    specifications: [{ key: "", value: "" }],
    category: { id: "" }
  });
  const [uploadedFiles, setUploadedFiles] = useState([]);

<<<<<<< HEAD
  // Load categories and products
  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:8080/categories");
      setCategories(res.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:8080/products");
      setProducts(res.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Filter products by category
  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category?.id.toString() === selectedCategory.toString());

  // Load product data for editing
  const loadProductForEdit = async (productId) => {
    try {
      const res = await axios.get(`http://localhost:8080/products/${productId}`);
      const productData = res.data;
      
      setProduct({
        name: productData.name,
        description: productData.description,
        imageUrl: productData.imageUrl,
        specifications: productData.specifications.length > 0 
          ? productData.specifications 
          : [{ key: "", value: "" }],
        category: { id: productData.category?.id || "" }
      });

      setCurrentProductId(productId);
      setIsEditing(true);
      setActiveTab('add');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error("Error loading product for edit:", error);
      alert("Failed to load product data");
    }
  };

  // Form handlers
=======
  useEffect(() => {
    fetch("http://localhost:8080/categories")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((err) => {
        console.error("Failed to load categories", err);
      });
  }, []);

>>>>>>> f1fb34269917a62217874b5e6c998fcc5f82daae
  const handleChange = (field, value) => {
    setProduct((prev) => ({ ...prev, [field]: value }));
  };

  const handleSpecChange = (index, field, value) => {
    const specs = [...product.specifications];
    specs[index][field] = value;
    setProduct((prev) => ({ ...prev, specifications: specs }));
  };

  const addSpec = () => {
    setProduct((prev) => ({
      ...prev,
      specifications: [...prev.specifications, { key: "", value: "" }],
    }));
  };

  const removeSpec = (index) => {
    const specs = [...product.specifications];
    specs.splice(index, 1);
    setProduct((prev) => ({ ...prev, specifications: specs }));
  };

  // Reset form
  const resetForm = () => {
    setProduct({
      name: "",
      description: "",
      imageUrl: "",
      specifications: [{ key: "", value: "" }],
      category: { id: "" }
    });
    setUploadedFiles([]);
    setIsEditing(false);
    setCurrentProductId(null);
  };

  // Image upload handlers
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    processFiles(files);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    processFiles(files);
  };

  const processFiles = (files) => {
    const MAX_IMAGES = 6;
    if (uploadedFiles.length + files.length > MAX_IMAGES) {
      alert(`Maximum ${MAX_IMAGES} images allowed`);
      return;
    }

    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    const newFiles = files.filter(file => validTypes.includes(file.type));
    setUploadedFiles([...uploadedFiles, ...newFiles]);
  };

  const removeImage = (index) => {
    const newFiles = [...uploadedFiles];
    newFiles.splice(index, 1);
    setUploadedFiles(newFiles);
  };

  // Product submission
  const handleSubmit = async (e) => {
    e.preventDefault();
<<<<<<< HEAD
    const MIN_IMAGES = 1;
    if (uploadedFiles.length < MIN_IMAGES && !product.imageUrl) {
      alert(`Please upload at least ${MIN_IMAGES} image or provide an image URL`);
      return;
    }

    const cleanedSpecs = product.specifications.filter(
      (spec) => spec.key.trim() && spec.value.trim()
    );
    const payload = { ...product, specifications: cleanedSpecs };

    try {
      // Here you would typically upload the files and get URLs
      // For demo, we'll just use the first image URL if files are uploaded
      if (uploadedFiles.length > 0) {
        payload.imageUrl = URL.createObjectURL(uploadedFiles[0]);
=======
    try {
      const payload = {
        ...product,
        category: {
          id: Number(categoryId), // ✅ Backend expects an object with id
        },
      };

      const response = await fetch("http://localhost:8080/admin/products", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert("✅ Product saved successfully!");
        setProduct({
          name: "",
          description: "",
          imageUrl: "",
          specifications: [{ key: "", value: "" }],
        });
        setCategoryId("");
      } else {
        alert("❌ Failed to save product");
>>>>>>> f1fb34269917a62217874b5e6c998fcc5f82daae
      }

      if (isEditing && currentProductId) {
        // Update existing product
        await axios.put(
          `http://localhost:8080/admin/products/${currentProductId}`, 
          payload, 
          { withCredentials: true }
        );
        alert("✅ Product updated!");
      } else {
        // Create new product
        await axios.post(
          "http://localhost:8080/admin/products", 
          payload, 
          { withCredentials: true }
        );
        alert("✅ Product created!");
      }

      // Refresh data and reset form
      fetchProducts();
      resetForm();
      setActiveTab('view');
    } catch (error) {
      console.error("Error saving product:", error);
      alert("Failed to save product");
    }
  };

  // Product actions
  const handleProductAction = (action, productId) => {
    switch(action) {
      case 'edit':
        loadProductForEdit(productId);
        break;
      case 'preview':
        navigate(`/products/${productId}`);
        break;
      case 'delete':
        if (confirm('Are you sure you want to delete this product?')) {
          axios.delete(
            `http://localhost:8080/admin/products/${productId}`, 
            { withCredentials: true }
          )
            .then(() => {
              setProducts(products.filter(p => p.id !== productId));
              alert('Product deleted successfully');
            })
            .catch(console.error);
        }
        break;
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Product Management</h1>

<<<<<<< HEAD
      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          className={`py-2 px-4 font-medium ${activeTab === 'add' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500'}`}
          onClick={() => {
            resetForm();
            setActiveTab('add');
          }}
        >
          {isEditing ? 'Edit Product' : 'Add New Product'}
        </button>
        <button
          className={`py-2 px-4 font-medium ${activeTab === 'view' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('view')}
        >
          View Products
        </button>
      </div>
=======
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="category">Category</Label>
          <select
            id="category"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="w-full border rounded px-3 py-2 mt-1"
            required
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <Label>Title</Label>
          <Input
            value={product.name}
            onChange={(e) => handleChange("name", e.target.value)}
            placeholder="Product name"
            required
          />
        </div>
>>>>>>> f1fb34269917a62217874b5e6c998fcc5f82daae

      {/* Add/Edit Product Form */}
      {activeTab === 'add' && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-2">Category</h2>
              <select
                value={product.category.id}
                onChange={(e) => setProduct(prev => ({
                  ...prev,
                  category: { id: e.target.value }
                }))}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              >
                <option value="">-- Select Category --</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
<<<<<<< HEAD

            <div>
              <h2 className="text-lg font-semibold mb-2">Title</h2>
              <input
                type="text"
                value={product.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="Product name"
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-2">Description</h2>
              <textarea
                value={product.description}
                onChange={(e) => handleChange("description", e.target.value)}
                placeholder="Enter product description"
                className="w-full p-2 border border-gray-300 rounded-md h-32"
                required
              />
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-2">Images</h2>
              <div 
                className="border-2 border-dashed border-gray-300 p-6 rounded-md cursor-pointer hover:border-green-500 hover:bg-gray-50 transition-colors relative min-h-[150px]"
                onClick={() => document.getElementById('fileInput').click()}
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
              >
                <input 
                  type="file" 
                  id="fileInput" 
                  className="hidden" 
                  accept="image/jpeg, image/png, image/webp"
                  multiple
                  onChange={handleFileChange}
                />
                {uploadedFiles.length === 0 && !product.imageUrl ? (
                  <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                    Click to select images or drag and drop here
                  </div>
                ) : (
                  <div className="text-center mb-4">
                    <p className="text-gray-500">
                      {uploadedFiles.length > 0 
                        ? `Uploaded images (${uploadedFiles.length}/6)` 
                        : 'Using existing image URL'}
                    </p>
                  </div>
                )}
                <div className="flex flex-wrap gap-4">
                  {/* Show existing image if editing */}
                  {product.imageUrl && uploadedFiles.length === 0 && (
                    <div className="relative w-24 h-24 border rounded-md overflow-hidden">
                      <img 
                        src={product.imageUrl} 
                        alt="Product preview"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white text-xs p-1 truncate">
                        Current Image
                      </div>
                    </div>
                  )}
                  {/* Show uploaded files */}
                  {uploadedFiles.map((file, index) => (
                    <div key={index} className="relative w-24 h-24 border rounded-md overflow-hidden group">
                      <img 
                        src={URL.createObjectURL(file)} 
                        alt={file.name}
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeImage(index);
                        }}
                      >
                        ×
                      </button>
                      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white text-xs p-1 truncate">
                        {file.name}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-2">Upload 1-6 product images (JPG, PNG, or WEBP format)</p>
              
              <div className="mt-4">
                <h3 className="text-md font-semibold mb-2">Or provide image URL</h3>
                <input
                  type="url"
                  value={product.imageUrl}
                  onChange={(e) => handleChange("imageUrl", e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-2">Specifications</h2>
              <div className="space-y-2">
                {product.specifications.map((spec, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Key (e.g. RAM)"
                      value={spec.key}
                      onChange={(e) => handleSpecChange(index, "key", e.target.value)}
                      className="flex-1 p-2 border border-gray-300 rounded-md"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Value (e.g. 16GB)"
                      value={spec.value}
                      onChange={(e) => handleSpecChange(index, "value", e.target.value)}
                      className="flex-1 p-2 border border-gray-300 rounded-md"
                      required
                    />
                    {index > 0 && (
                      <button
                        type="button"
                        className="px-3 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                        onClick={() => removeSpec(index)}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <button
                type="button"
                className="mt-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                onClick={addSpec}
              >
                + Add Spec
              </button>
            </div>

            <div className="pt-4 border-t border-gray-200 flex justify-between">
              <button
                type="button"
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                onClick={() => {
                  resetForm();
                  setActiveTab('view');
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                {isEditing ? 'Update Product' : 'Save Product'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* View Products */}
      {activeTab === 'view' && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Filter by Category</h2>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full md:w-64 p-2 border border-gray-300 rounded-md"
            >
              <option value="all">All Categories</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id.toString()}>{cat.name}</option>
              ))}
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-green-800 text-white">
                <tr>
                  <th className="py-3 px-4 text-left">ID</th>
                  <th className="py-3 px-4 text-left">Name</th>
                  <th className="py-3 px-4 text-left">Description</th>
                  <th className="py-3 px-4 text-left">Specs</th>
                  <th className="py-3 px-4 text-left w-48">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((prod) => (
                    <ProductRow 
                      key={prod.id} 
                      product={prod} 
                      onAction={handleProductAction} 
                    />
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="py-4 text-center text-gray-500">
                      No products found in this category
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

// Product Row Component
const ProductRow = ({ product, onAction }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <tr className="border-b border-gray-200 hover:bg-gray-50">
        <td className="py-3 px-4 font-mono text-gray-600">{product.id}</td>
        <td className="py-3 px-4">{product.name}</td>
        <td className="py-3 px-4 max-w-xs truncate">{product.description}</td>
        <td className="py-3 px-4">
          {product.specifications.slice(0, 2).map((spec, i) => (
            <div key={i} className="text-sm">
              • {spec.key}: {spec.value}
            </div>
          ))}
        </td>
        <td className="py-3 px-4">
          <div className="flex gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAction('edit', product.id);
              }}
              className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
              title="Edit"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAction('preview', product.id);
              }}
              className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors"
              title="Preview"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAction('delete', product.id);
              }}
              className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
              title="Delete"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleExpand();
              }}
              className={`p-2 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition-colors ${expanded ? 'transform rotate-180' : ''}`}
              title={expanded ? "Collapse" : "Expand"}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </td>
      </tr>
      {expanded && (
        <tr className="bg-gray-50">
          <td colSpan="5" className="p-4">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-2">
              <h3 className="font-semibold text-lg mb-2 border-b pb-2">Full Description</h3>
              <p className="whitespace-pre-line">{product.description}</p>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-2 px-4 border">Specification</th>
                    <th className="py-2 px-4 border">Value</th>
                  </tr>
                </thead>
                <tbody>
                  {product.specifications.map((spec, i) => (
                    <tr key={i}>
                      <td className="py-2 px-4 border">{spec.key}</td>
                      <td className="py-2 px-4 border">{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </td>
        </tr>
      )}
    </>
  );
};

export default ProductManagement;
=======
          ))}
          <Button
            type="button"
            variant="outline"
            onClick={addSpec}
            className="flex flex-col gap-2"
          >
            + Add Spec
          </Button>
        </div>

        <Button
          type="submit"
          className="bg-[#03613a] text-white hover:bg-[#024a2b]"
        >
          Save Product
        </Button>
      </form>
    </div>
  );
}
>>>>>>> f1fb34269917a62217874b5e6c998fcc5f82daae
