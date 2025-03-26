const {
  createProduct,
  getAllProducts,
} = require("../services/product/productServices");

const createNewProduct = async (req, res) => {
  const { userId } = req.user;
  const { category, description } = req.body;
  console.log("Incoming request body:", req.body);

  // Kontrollera om alla nödvändiga fält är med i förfrågan
  if (!category || !description) {
    console.log("Missing required fields in product creation request.");
    return res.status(400).json({ message: "Missing required fields" });
  }
  try {
    const newProduct = await createProduct(userId, category, description);
    return res.status(201).json(newProduct); // Skicka tillbaka den skapade produkten
  } catch (err) {
    console.error("Error creating product:", err);
    return res
      .status(500)
      .json({ message: "Internal server error FROM CONTROLLER" });
  }
};

const getProducts = async (req, res) => {
  try {
    // Här hämtar vi alla produkter (det är ingen kontroll på userId, för alla kan se dem)
    const products = await getAllProducts(); // En ny funktion för att hämta alla produkter
    console.log("Found all products:", products);

    return res.status(200).json({ products });
  } catch (err) {
    console.error("Error fetching products:", err);
    return res
      .status(500)
      .json({ message: "Internal server error FROM CONTROLLER" });
  }
};

module.exports = { createNewProduct, getProducts };
