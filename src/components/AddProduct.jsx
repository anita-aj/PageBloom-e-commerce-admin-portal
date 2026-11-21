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
  const handleImagechange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImage(file);
    }
  };
  return <h1>Add Product</h1>;
}

export default AddProduct;
