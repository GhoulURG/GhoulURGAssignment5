import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/recipes", (req, res) => {
  res.json([{ id: 1, name: "Spaghetti Bolognese" }]);
});

const PORT = process.env.PORT || 5000;

// Only start server if not in test environment
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
}

export default app;
