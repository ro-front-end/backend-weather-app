// Server imports
const express = require("express");
require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");

const server = express();

// Middleware
server.use(express.json());
server.use(cors());

// Database
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.info("Connected to MONGODB");
  })
  .catch((error) => {
    console.error("Error connecting to MONGODB:", error.message);
  });

// routes import
const weatherRoutes = require("./routes/weatherRoutes");
server.use("/api", weatherRoutes);
// Server port
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.info(`Connected to Port: ${PORT}`);
});
