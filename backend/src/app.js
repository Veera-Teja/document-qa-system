const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const documentRoutes = require("./routes/documentRoutes");
const { notFoundHandler, errorHandler } = require("./middleware/errorMiddleware");

dotenv.config();

const app = express();
const clientUrl = process.env.CLIENT_URL;
const allowedOrigins = [
  clientUrl,
  "http://localhost:5173",
  "http://localhost:5174"
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error(`Origin not allowed: ${origin}`));
    }
  })
);
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.status(200).json({ success: true, message: "Server is healthy" });
});

app.use("/api", documentRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
