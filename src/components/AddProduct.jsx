import { useState, useRef, useId } from "react";
import { useNavigate } from "react-router-dom";
import { API, CATEGORIES, MAX_PRICE, PLACEHOLDER } from "../constants";

function AddProduct() {
  const navigate = useNavigate();
  const formId = useId();
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    price: "",
    category: "Fiction",
    description: "",
  });

  const [image, setImage] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  
  const handleImageChange = (e) => {
    const file = e.target.files[0];

if (file) {
      setImage(file);
    }
  };

  const validateForm = () => {
    if (!formData.title.trim()) {
      setError("Book title is required");
      return false;
    }

    if (!formData.author.trim()) {
      setError("Author name is required");
      return false;
    }

    if (
      !formData.price ||
       Number(formData.price) <= 0 ||
        Number(formData.price) > MAX_PRICE
      ) {
      setError("Please enter a valid price");
      return false;
    }

    setError("");
    return true;
  };


 const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const newProduct = {
      ...formData,
      price: Number(formData.price),
      image: image ? URL.createObjectURL(image) : PLACEHOLDER,
    };

    try {
      const response = await fetch(`${API}/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      if (!response.ok) {
        throw new Error("Failed to add product");
      }

      navigate("/products");
    } catch (err) {
      setError(err.message);
    }
  };


 return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Add New Product</h1>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
        <div>
          <label htmlFor={`${formId}-title`}>Book Title</label>
    <input
      id={`${formId}-title`}
      name="title"
      required
      value={formData.title}
      onChange={handleChange}
      className="border p-2 w-full rounded"
    />
  </div>

  <div>
    <label htmlFor={`${formId}-author`}>Author</label>
    <input
      id={`${formId}-author`}
      name="author"
      required
      value={formData.author}
      onChange={handleChange}
      className="border p-2 w-full rounded"
    />
  </div>

  <div>
    <label htmlFor={`${formId}-price`}>Price</label>
    <input
      id={`${formId}-price`}
      name="price"
      type="number"
      min="1"
      max={MAX_PRICE}
      required
      value={formData.price}
      onChange={handleChange}
      className="border p-2 w-full rounded"
    />
  </div>

  <div>
    <label htmlFor={`${formId}-category`}>Category</label>
    <select
      id={`${formId}-category`}
      name="category"
      value={formData.category}
      onChange={handleChange}
      className="border p-2 w-full rounded"
    >
      {CATEGORIES.map((category) => (
        <option key={category} value={category}>
          {category}
        </option>
      ))}
    </select>
  </div>

  <div>
    <label htmlFor={`${formId}-description`}>Description</label>
    <textarea
      id={`${formId}-description`}
      name="description"
      value={formData.description}
      onChange={handleChange}
      className="border p-2 w-full rounded"
    />
  </div>

  <div>
    <label htmlFor={`${formId}-image`}>Book Image (optional)</label>
    <input
      ref={fileInputRef}
      id={`${formId}-image`}
      type="file"
      accept="image/*"
      onChange={handleImageChange}
    />
  </div>

  {error && <p className="text-red-600">{error}</p>}

  <button
    type="submit"
    className="bg-clay text-white px-5 py-2 rounded"
  >
    Add Product
  </button>
</form>
          
    </div>
  ); 
}


export default AddProduct;
