import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useProducts from "../store/productStore";

const ProductForm = () => {
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const { addProduct, error, successMessage } = useProducts();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!category || !description) return alert("Fyll i alla fält!");

    await addProduct(category, description);

    setTimeout(() => {
      // Efter fördröjningen, navigera till /home
      navigate("/home");
    }, 2000); // Fördröjning på 2 sekunder (2000 ms)

    // Rensa formuläret efter lyckad inmatning
    setCategory("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit} className="product-form">
      <h2>Lägg till en produkt</h2>
      <label>Kategori:</label>
      <input
        type="text"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Ange kategori"
      />
      <label>Beskrivning:</label>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Beskriv din produkt"
      />
      <button type="submit">Lägg till produkt</button>
      {error && <p className="error">{error}</p>}
      {successMessage && <p className="success">{successMessage}</p>}{" "}
      {/* Visa successmeddelande */}
    </form>
  );
};

export default ProductForm;
