require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

// Route imports
const userRoutes = require("./routes/user");
const contactRoutes = require("./routes/contact");

const app = express();

// Middleware

// Parse incoming requests with JSON payloads
app.use(express.json());

// Log requests to console
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Routes
app.use("/api/users", userRoutes);
app.use("/api/contacts", contactRoutes);

/**
 * Attempt to connect to database located in provided MongoDB URI
 * in .env file.
 *
 * Only starts listening for requests once database connection is
 * successfully established.
 */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Listening on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error(err);
  });
