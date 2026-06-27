const express = require("express");
const cors = require("cors");

const exploreRoutes = require("./routes/exploreRoutes");
const generateRoutes = require("./routes/generateRoutes");
const cookbookRoutes = require("./routes/cookbookRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/explore", exploreRoutes);

app.use("/api/generate", generateRoutes);

app.use("/api/cookbook", cookbookRoutes);

module.exports = app;