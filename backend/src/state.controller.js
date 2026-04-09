const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User, UserState } = require("./model");

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret_change_me";

function signToken(user) {
  return jwt.sign({ uid: String(user._id) }, JWT_SECRET, { expiresIn: "30d" });
}

function getAuthUserId(req) {
  const h = req.headers.authorization || "";
  const parts = h.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") return null;
  try {
    const decoded = jwt.verify(parts[1], JWT_SECRET);
    return decoded?.uid || null;
  } catch {
    return null;
  }
}

function requireAuth(req, res) {
  const uid = getAuthUserId(req);
  if (!uid) {
    res.status(401).json({ ok: false, error: "Unauthorized" });
    return null;
  }
  return uid;
}

/** Default state */
function defaultState(name = "User") {
  return {
    profile: { name, goal: "strength", height: 0, weight: 0 },
    checklist: [
      { id: "water", text: "Drink 2L water", done: false },
      { id: "protein", text: "Hit protein target", done: false },
      { id: "steps", text: "8K+ steps / light cardio", done: false },
      { id: "stretch", text: "5 min stretch", done: false },
    ],
    xp: 0,
    streak: { lastDay: "", days: 0 },
    sessions: [],
    currentSession: null,
    mealsByDay: {},
    weeklyMinutesByWeek: {},
    plan: null,
    chat: [],
    ui: {
      volume: 0.8,
      muted: false,
      sfx: true,
      waterReminders: true,
      focusMode: false,
      hadithIndex: 0,
      motivationIndex: 0,
    },
  };
}

/* -----------------------
   AUTH
----------------------- */
async function register(req, res) {
  const name = String(req.body?.name || "").trim() || "User";
  const email = String(req.body?.email || "").trim().toLowerCase();
  const password = String(req.body?.password || "");

  if (!email || !email.includes("@")) return res.status(400).json({ ok: false, error: "Valid email required" });
  if (password.length < 6) return res.status(400).json({ ok: false, error: "Password must be 6+ chars" });

  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ ok: false, error: "Email already registered" });

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, passwordHash });

  // create default state doc for this user
  await UserState.create({ userId: user._id, state: defaultState(name) });

  const token = signToken(user);
  return res.json({ ok: true, token, user: { id: String(user._id), name: user.name, email: user.email } });
}

async function login(req, res) {
  const email = String(req.body?.email || "").trim().toLowerCase();
  const password = String(req.body?.password || "");

  if (!email || !password) return res.status(400).json({ ok: false, error: "Email and password required" });

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ ok: false, error: "Invalid credentials" });

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(400).json({ ok: false, error: "Invalid credentials" });

  // ensure state exists
  let st = await UserState.findOne({ userId: user._id });
  if (!st) st = await UserState.create({ userId: user._id, state: defaultState(user.name) });

  const token = signToken(user);
  return res.json({ ok: true, token, user: { id: String(user._id), name: user.name, email: user.email } });
}

async function me(req, res) {
  const uid = requireAuth(req, res);
  if (!uid) return;

  const user = await User.findById(uid).select("name email");
  if (!user) return res.status(401).json({ ok: false, error: "Unauthorized" });

  return res.json({ ok: true, user: { id: String(user._id), name: user.name, email: user.email } });
}

/* -----------------------
   STATE (AUTH REQUIRED)
----------------------- */
async function getState(req, res) {
  const uid = requireAuth(req, res);
  if (!uid) return;

  let doc = await UserState.findOne({ userId: uid });
  if (!doc) {
    const user = await User.findById(uid).select("name");
    doc = await UserState.create({ userId: uid, state: defaultState(user?.name || "User") });
  }
  return res.json({ ok: true, state: doc.state, updatedAt: doc.updatedAt });
}

async function putState(req, res) {
  const uid = requireAuth(req, res);
  if (!uid) return;

  const incoming = req.body?.state;
  if (!incoming || typeof incoming !== "object") {
    return res.status(400).json({ ok: false, error: "Body must be { state: {...} }" });
  }

  const doc = await UserState.findOneAndUpdate(
    { userId: uid },
    { $set: { state: incoming } },
    { new: true, upsert: true }
  );

  return res.json({ ok: true, state: doc.state, updatedAt: doc.updatedAt });
}

async function patchState(req, res) {
  const uid = requireAuth(req, res);
  if (!uid) return;

  const partial = req.body?.patch;
  if (!partial || typeof partial !== "object") {
    return res.status(400).json({ ok: false, error: "Body must be { patch: {...} }" });
  }

  const setObj = {};
  for (const k of Object.keys(partial)) setObj[`state.${k}`] = partial[k];

  const doc = await UserState.findOneAndUpdate(
    { userId: uid },
    { $set: setObj },
    { new: true, upsert: true }
  );

  return res.json({ ok: true, state: doc.state, updatedAt: doc.updatedAt });
}

async function resetState(req, res) {
  const uid = requireAuth(req, res);
  if (!uid) return;

  const user = await User.findById(uid).select("name");
  const fresh = defaultState(user?.name || "User");

  const doc = await UserState.findOneAndUpdate(
    { userId: uid },
    { $set: { state: fresh } },
    { new: true, upsert: true }
  );

  return res.json({ ok: true, state: doc.state, updatedAt: doc.updatedAt });
}

module.exports = {
  // auth
  register,
  login,
  me,
  // state
  getState,
  putState,
  patchState,
  resetState,
};