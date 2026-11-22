import { useState, useRef, useId } from "react";
import { useNavigate } from "react-router-dom";
import { API, CATEGORIES, PLACEHOLDER } from "../constants";

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

    if (!formData.price || Number(formData.price) <= 0) {
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

  return <h1>Add Product</h1>;
}


export default AddProduct;
