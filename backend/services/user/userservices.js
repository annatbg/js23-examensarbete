require("dotenv").config();
const { GetCommand, PutCommand } = require("@aws-sdk/lib-dynamodb");
const db = require("../db/db");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const TABLE_NAME = process.env.DB_TABLE_USERS;
const jwt = require("jsonwebtoken");

const userExists = async (email) => {
  console.log("TABLE_NAME:", TABLE_NAME);

  const getParams = {
    TableName: TABLE_NAME,
    Key: { email },
  };

  try {
    const existingUser = await db.send(new GetCommand(getParams));
    console.log("Existing user response:", existingUser);
    console.log(`User ${email} exists:`, existingUser.Item);
    return existingUser.Item;
  } catch (err) {
    console.error("Error checking if user exists:", err);
    throw new Error("Error checking if user exists");
  }
};

const createUser = async (email, password, firstName, lastName) => {
  console.log("TABLE_NAME:", TABLE_NAME);

  console.log(`Creating new user with email: ${email}`);
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log(`Password hashed for user ${email}`);

  const newUser = {
    userId: uuidv4(),
    email,
    password: hashedPassword,
    firstName,
    lastName,
    role: "customer",
  };

  const putParams = {
    TableName: TABLE_NAME,
    Item: newUser,
  };

  try {
    await db.send(new PutCommand(putParams));
    console.log(`User ${email} successfully created.`);
  } catch (err) {
    console.error("Error creating user:", err);
    throw new Error("Error creating user");
  }
};

const loginUser = async (email, password) => {
  console.log("Försöker logga in med email:", email);

  // Hämta användaren från databasen
  const existingUser = await userExists(email);
  console.log("userinfo", existingUser);

  if (!existingUser) {
    console.log("Användare hittades inte:", email);
    throw new Error("User not found");
  }

  // Logga den hämtade användardatan
  console.log("Användardata hittad:", existingUser);

  // Jämför det hashade lösenordet
  const isPasswordValid = await bcrypt.compare(password, existingUser.password);

  console.log("Lösenordet matchar:", isPasswordValid);

  if (!isPasswordValid) {
    console.log("Felaktigt lösenord för användare:", email);
    throw new Error("Invalid credentials");
  }

  // Skapa en JWT-token
  const token = jwt.sign(
    { userId: existingUser.userId, email: existingUser.email },
    process.env.JWT_SECRET,
    { expiresIn: "1h" } // Giltighetstid kan anpassas
  );

  console.log(`User ${email} successfully logged in. JWT-token skapad.`);

  // Returnera token till frontend
  return { existingUser, token };
};

module.exports = { userExists, createUser, loginUser };
