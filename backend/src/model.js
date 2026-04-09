const mongoose = require("mongoose");

/** USER */
const UserSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, default: "User" },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    passwordHash: { type: String, required: true },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

/** USER STATE (1 document per user) */
const UserStateSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true, index: true },
    state: { type: Object, required: true },
  },
  { timestamps: true }
);

const UserState = mongoose.model("UserState", UserStateSchema);

module.exports = { User, UserState };