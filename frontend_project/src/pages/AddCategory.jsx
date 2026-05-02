import { useState } from "react";
import API from "../api/axios.js";

export default function AddCategory() {
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (loading) return; // 🔥 prevent multiple calls

  setLoading(true);

  const formData = new FormData();
  formData.append("name", name);
  formData.append("image", file);

  try {
    await API.post("add-category/", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });

    alert("Category Added ✅");
  } catch (err) {
    console.error(err);
    alert("Error ❌");
  } finally {
    setLoading(false);
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

        <button type="submit" disabled={!file || !name}>
  Submit
</button>
      </form>
    </div>
  );
}