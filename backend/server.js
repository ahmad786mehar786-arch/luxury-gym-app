require("dotenv").config();
const app = require("./src/app");
const { connectDB } = require("./src/db");

const PORT = process.env.PORT || 5050;

async function startServer() {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`✅ Luxury Gym API running: http://127.0.0.1:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error.message);
    process.exit(1);
  }
}

startServer();