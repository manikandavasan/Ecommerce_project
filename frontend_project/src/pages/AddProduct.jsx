import { useState } from "react";
import axios from "axios";

export default function AddProduct() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("stock", stock);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("image", file);

    try {
      await axios.post(
        "http://127.0.0.1:8000/add-product/",
        formData
      );
      alert("Product Added ✅");
    } catch (err) {
      console.error(err);
      alert("Error ❌");
    }
  };

  return (
    <div>
      <h2>Add Product</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Product Name"
          onChange={(e) => setName(e.target.value)}
        />

        <br /><br />

        <input
          type="text"
          placeholder="Description"
          onChange={(e) => setDescription(e.target.value)}
        />

        <br /><br />

        <input
          type="number"
          placeholder="Stock"
          onChange={(e) => setStock(e.target.value)}
        />

        <br /><br />

        <input
          type="number"
          placeholder="Price"
          onChange={(e) => setPrice(e.target.value)}
        />

        <br /><br />

        <input
          type="number"
          placeholder="Category ID"
          onChange={(e) => setCategory(e.target.value)}
        />

        <br /><br />

        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <br /><br />

        <button type="submit">Submit</button>

      </form>
    </div>
  );
}