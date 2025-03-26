require("dotenv").config();
const {
  ScanCommand,
  GetCommand,
  PutCommand,
  QueryCommand,
} = require("@aws-sdk/lib-dynamodb");
const db = require("../db/db");
const { v4: uuidv4 } = require("uuid");
const { getProducts } = require("../../controllers/productController");

const TABLE_NAME = process.env.DB_TABLE_PRODUCTS;

/**
 * Skapa en ny produkt och koppla den till en användare.
 */
const createProduct = async (userID, category, description) => {
  console.log(`Skapar produkt för användare ${userID}`);

  const newProduct = {
    productID: uuidv4(),
    userID: userID,
    category: category,
    description: description,
    createdAt: new Date().toISOString(),
  };

  const putParams = {
    TableName: TABLE_NAME,
    Item: newProduct,
  };

  try {
    await db.send(new PutCommand(putParams));
    console.log(`Produkt ${newProduct.productID} skapad.`);
    return newProduct;
  } catch (err) {
    console.error("Fel vid skapande av produkt:", err);
    throw new Error("Kunde inte skapa produkt");
  }
};

/**
 * Hämta alla produkter.
 */
const getAllProducts = async () => {
  console.log("Hämtar alla produkter");

  const scanParams = {
    TableName: TABLE_NAME,
  };

  try {
    const result = await db.send(new ScanCommand(scanParams));
    console.log(`Alla produkter hämtade:`, result.Items);
    return result.Items;
  } catch (err) {
    console.error("Fel vid hämtning av alla produkter:", err);
    throw new Error("Kunde inte hämta alla produkter");
  }
};

/**
 * Hämta alla produkter kopplade till en användare via userID.
 */
const getProductsByUser = async (userID) => {
  console.log(`Hämtar produkter för användare ${userID}`);

  const queryParams = {
    TableName: TABLE_NAME,
    IndexName: "userID-index", // Din GSI för att kunna söka på userID
    KeyConditionExpression: "userID = :userID",
    ExpressionAttributeValues: {
      ":userID": userID,
    },
  };

  try {
    const result = await db.send(new QueryCommand(queryParams));
    console.log(`Produkter hämtade för userID ${userID}:`, result.Items);
    return result.Items;
  } catch (err) {
    console.error("Fel vid hämtning av produkter:", err);
    throw new Error("Kunde inte hämta produkter");
  }
};

module.exports = { createProduct, getProductsByUser, getAllProducts };
