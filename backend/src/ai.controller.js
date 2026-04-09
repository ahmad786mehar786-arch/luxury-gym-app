// For now we keep your offline AI logic server-side.
// Later you can connect OpenAI etc.

function isMedicalOrDangerous(q) {
  const s = (q || "").toLowerCase();
  const bad = ["steroid","tren","anavar","suicide","self harm","kill","overdose","starve","drug dosage"];
  const med = ["chest pain","heart","diabetes","blood pressure","injury","fracture","pregnant","medicine"];
  return bad.some(w => s.includes(w)) || med.some(w => s.includes(w));
}

function aiReply(message, profile = {}) {
  const q = (message || "").trim().toLowerCase();
  const name = profile?.name || "friend";

  if (!q) return `Tell me your goal, ${name}: strength, muscle gain, or fat loss?`;
  if (isMedicalOrDangerous(q)) {
    return "I can’t help with that safely. If it’s medical/injury/risky, talk to a doctor/trainer. I can help with safe general workouts, nutrition, sleep, and recovery.";
  }

  if (q.includes("chest")) return "Chest plan:\n1) Bench Press 4×6-10\n2) Incline DB Press 3×8-12\n3) Cable Fly 3×12-15\n4) Push Ups 2×AMRAP\nRest 60–120s • full range • control the negative.";
  if (q.includes("back")) return "Back plan:\n1) Lat Pulldown 4×8-12\n2) Barbell Row 4×6-10\n3) Seated Row 3×10-12\n4) Deadlift (technique) 3×5\nNeutral spine • squeeze lats.";
  if (q.includes("bicep") || q.includes("curl")) return "Biceps:\n1) Barbell Curl 4×8-12\n2) Preacher Curl 3×10-12\n3) Hammer Curl 3×10-12\nSlow negative (3 sec).";
  if (q.includes("fat") || q.includes("lose weight")) return "Fat loss = calorie deficit + steps + strength.\n• 3–4 strength days/week\n• 8–10k steps/day\n• Protein 1.6–2.2g/kg\n• Sleep 7–9 hours.";
  if (q.includes("home")) return "Home workout:\n• Push-ups 4×AMRAP\n• Squats 4×15\n• Lunges 3×12/leg\n• Plank 3×45s\n3–4 days/week.";
  if (q.includes("sleep")) return "Sleep:\n1) No caffeine after 4PM\n2) Walk daily\n3) Dark/cool room\n4) No phone 30 min before bed\n5) Same schedule.";

  return `Got it, ${name}. Tell me:\n1) Goal (strength/muscle/fat loss)\n2) Days/week\n3) Equipment (gym/home)\nAnd I’ll build a plan.`;
}

async function askAI(req, res) {
  const { message, profile } = req.body || {};
  const reply = aiReply(message, profile);
  return res.json({ ok: true, reply });
}

module.exports = { askAI };