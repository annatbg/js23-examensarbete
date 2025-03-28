import { create } from "zustand";
import axios from "axios";
import useUser from "./userStore"; // För att hämta token

const API_URL = import.meta.env.VITE_API_URL; // Hämta API-URL från .env

const useProducts = create((set, get) => ({
  products: [],
  error: null,

  fetchProducts: async () => {
    try {
      const res = await axios.get(`${API_URL}/products`);
      set({ products: res.data.products });
    } catch (error) {
      set({
        error: error.response ? error.response.data.message : error.message,
      });
    }
  },

  addProduct: async (category, description) => {
    const { token } = useUser.getState().token; // Extrahera token korrekt
    console.log("Token:", token); // Logga token

    try {
      const res = await axios.post(
        `${API_URL}/addproduct`,
        { category, description },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Skickar den rätta token
          },
        }
      );
      console.log("Response:", res); // Logga hela responsen

      if (res.status !== 200 && res.status !== 201)
        throw new Error("Misslyckades att lägga till produkt");

      const newProduct = res.data; // axios ger data direkt
      set((state) => ({
        products: [...state.products, newProduct],
        successMessage: "Produkt skapad!",
      }));
    } catch (error) {
      console.error("Error adding product:", error); // Logga felet
      set({ error: error.message });
    }
  },
}));

export default useProducts;
