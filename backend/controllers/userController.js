const {
  createUser,
  userExists,
  loginUser,
} = require("../services/user/userservices");

const registerUser = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  console.log("Incoming request body:", req.body);

  console.log("Received signup request with email:", email);

  try {
    const existingUser = await userExists(email);
    if (existingUser) {
      console.log(`User ${email} already exists.`);
      return res.status(400).json({ message: "User already exists" });
    }

    if (!email || !password || !firstName || !lastName) {
      console.log("Missing required fields in signup request.");
      return res.status(400).json({ message: "Missing required fields" });
    }

    await createUser(email, password, firstName, lastName);

    console.log(`User ${email} created successfully.`);
    return res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.error("Error in signup:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Anropa loginUser för att verifiera användaren och få JWT-token
    const token = await loginUser(email, password);

    // Skicka tillbaka token ÄNDRA TILL USER OBJEKT
    res.status(200).json({ token });
  } catch (err) {
    console.error("Error during login:", err);
    res.status(400).json({ error: err.message });
  }
};

module.exports = { registerUser, login };
