const mongoose = require("mongoose");

async function connectDB() {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    throw new Error("MONGODB_URI is missing in .env");
  }

  await mongoose.connect(mongoUri, {
    dbName: "luxgym_db",
  });

  console.log("✅ MongoDB connected");
}

module.exports = { connectDB };