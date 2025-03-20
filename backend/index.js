import express from "express";
require("dotenv").config();
console.log(
  "Loaded ENV variables:",
  process.env.DB_TABLE_USERS,
  process.env.AWS_REGION
);

dotenv.config();
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from backend!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
