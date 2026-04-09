const router = require("express").Router();
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const User =
  mongoose.models.User ||
  mongoose.model(
    "User",
    new mongoose.Schema(
      {
        name: { type: String, trim: true, default: "User" },
        email: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
        passwordHash: { type: String, required: true },
      },
      { timestamps: true }
    )
  );

const UserState =
  mongoose.models.UserState ||
  mongoose.model(
    "UserState",
    new mongoose.Schema(
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true, index: true },
        state: { type: Object, required: true },
      },
      { timestamps: true }
    )
  );

function authRequired(req, res, next) {
  try {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";
    if (!token) return res.status(401).json({ ok: false, error: "No token provided" });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ ok: false, error: "Invalid token" });
  }
}

router.get("/dashboard", authRequired, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).lean();
    const userStateDoc = await UserState.findOne({ userId: req.user.userId }).lean();
    const profile = userStateDoc?.state?.profile || {};

    return res.json({
      ok: true,
      dashboard: {
        profile: {
          name: user?.name || "User",
          goal: profile.goal || "Not set",
          currentWeight: profile.currentWeight || "Not set",
          targetWeight: profile.targetWeight || "Not set",
          activityLevel: profile.activityLevel || "Not set",
          waterTarget: profile.waterTarget || "2.5L",
          proteinTarget: profile.proteinTarget || "150g",
          calorieTarget: profile.calorieTarget || "2200 kcal",
          todayWorkout: profile.todayWorkout || "Not logged yet",
        },
      },
    });
  } catch (error) {
    console.error("DASHBOARD ERROR:", error);
    return res.status(500).json({ ok: false, error: "Failed to load dashboard" });
  }
});

module.exports = router;