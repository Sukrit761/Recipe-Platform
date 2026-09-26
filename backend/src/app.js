const express = require("express");
const cors = require("cors");

const exploreRoutes = require("./routes/exploreRoutes");
const generateRoutes = require("./routes/generateRoutes");
const cookbookRoutes = require("./routes/cookbookRoutes");

const app = express();

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  "https://recipe-platform-flame.vercel.app",
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.options("*", cors());

app.use(express.json());

app.use("/api/explore", exploreRoutes);
app.use("/api/generate", generateRoutes);
app.use("/api/cookbook", cookbookRoutes);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Recipe Platform Backend is running",
  });
});

module.exports = app;