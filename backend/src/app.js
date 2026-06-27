const express = require("express");
const cors = require("cors");

const exploreRoutes = require("./routes/exploreRoutes");
const generateRoutes = require("./routes/generateRoutes");
const cookbookRoutes = require("./routes/cookbookRoutes");

const app = express();

const allowedOrigins = [
  "http://localhost:3000",
  "https://your-project-name.vercel.app",
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);


app.use(express.json());

app.use("/api/explore", exploreRoutes);

app.use("/api/generate", generateRoutes);

app.use("/api/cookbook", cookbookRoutes);

module.exports = app;