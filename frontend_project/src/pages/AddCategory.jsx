import { useState } from "react";
import API from "../api/axios.js";

export default function AddCategory() {
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();  // 🔥 IMPORTANT

    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", file);

    try {
      await API.post('add-category/',formData);
      alert("Category Added ✅");
    } catch (err) {
      console.error(err);
      alert("Error ❌");
    }
  };

  return (
    <div>
      <h2>Add Category</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter category name"
          value={name}
          onChange={(e) => setName(e.target.value)}
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