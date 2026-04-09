const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const authRoutes      = require("./auth.routes");
const dashboardRoutes = require("./dashboard.routes");
const stateRoutes     = require("./state.routes");

const app = express();

const allowedOrigins = [
  "http://localhost:8000",
  "http://127.0.0.1:8000",
  "http://localhost:5500",
  "http://127.0.0.1:5500",
];

app.use(
  cors({
    origin(origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true,
  })
);

app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ ok: true, message: "API working" });
});

app.use("/api/auth", authRoutes);
app.use("/api", dashboardRoutes);
app.use("/api", stateRoutes);

app.use((req, res) => {
  res.status(404).json({ ok: false, error: "Not Found" });
});

module.exports = app;