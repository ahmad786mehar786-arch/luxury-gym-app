const router = require("express").Router();
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

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

router.get("/state", authRequired, async (req, res) => {
  try {
    const userStateDoc = await UserState.findOne({ userId: req.user.userId }).lean();

    const state = userStateDoc?.state || {
      profile: { name: "", goal: "", currentWeight: "", targetWeight: "", activityLevel: "" },
      xp: 0,
      streak: { days: 0 },
      sessions: [],
      mealsByDay: {},
      weeklyMinutesByWeek: {},
    };

    return res.json({ ok: true, state });
  } catch (error) {
    console.error("STATE GET ERROR:", error);
    return res.status(500).json({ ok: false, error: "Failed to load state" });
  }
});

router.post("/state", authRequired, async (req, res) => {
  try {
    const { state } = req.body;
    if (!state) return res.status(400).json({ ok: false, error: "No state provided" });

    await UserState.findOneAndUpdate(
      { userId: req.user.userId },
      { userId: req.user.userId, state },
      { upsert: true, new: true }
    );

    return res.json({ ok: true });
  } catch (error) {
    console.error("STATE POST ERROR:", error);
    return res.status(500).json({ ok: false, error: "Failed to save state" });
  }
});

module.exports = router;