import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function ProductForm() {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    imageUrl: "",
    specifications: [{ key: "", value: "" }],
  });

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/admin/products", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });

      if (response.ok) {
        alert("✅ Product saved successfully!");
        setProduct({
          name: "",
          description: "",
          imageUrl: "",
          specifications: [{ key: "", value: "" }],
        });
      } else {
        alert("❌ Failed to save product");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("❌ Error occurred");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-xl space-y-6">
      <h2 className="text-xl font-bold text-[#03613a]">Add New Product</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col gap-2">
          <Label>Title</Label>
          <Input
            value={product.name}
            onChange={(e) => handleChange("name", e.target.value)}
            placeholder="Product name"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label>Description</Label>
          <Textarea
            value={product.description}
            onChange={(e) => handleChange("description", e.target.value)}
            placeholder="Enter product description"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label>Image URL</Label>
          <Input
            value={product.imageUrl}
            onChange={(e) => handleChange("imageUrl", e.target.value)}
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label>Specifications</Label>
          {product.specifications.map((spec, index) => (
            <div key={index} className="flex gap-2">
              <Input
                placeholder="Key (e.g. RAM)"
                value={spec.key}
                onChange={(e) => handleSpecChange(index, "key", e.target.value)}
              />
              <Input
                placeholder="Value (e.g. 16GB)"
                value={spec.value}
                onChange={(e) =>
                  handleSpecChange(index, "value", e.target.value)
                }
              />
              {index > 0 && (
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => removeSpec(index)}
                >
                  Remove
                </Button>
              )}
            </div>
          ))}
          <Button type="button" variant="outline" onClick={addSpec} className="flex flex-col gap-2">
            + Add Spec
          </Button>
        </div>

        <Button type="submit" className="bg-[#03613a] text-white hover:bg-[#024a2b]">
          Save Product
        </Button>
      </form>
    </div>
  );
}