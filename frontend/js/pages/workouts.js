(() => {
  "use strict";

  const WORKOUTS = [
    {
      id: "chest",
      name: "Chest & Triceps",
      emoji: "💪",
      color: "#7c3aed",
      day: "Day 1",
      exercises: [
        { name: "Bench Press", sets: "4 x 8-10", muscle: "Chest", tip: "Keep shoulder blades retracted, drive feet into floor" },
        { name: "Incline Dumbbell Press", sets: "3 x 10-12", muscle: "Upper Chest", tip: "30-45 degree angle, control the negative" },
        { name: "Cable Flyes", sets: "3 x 12-15", muscle: "Chest", tip: "Slight bend in elbows, squeeze at the top" },
        { name: "Tricep Pushdown", sets: "3 x 12-15", muscle: "Triceps", tip: "Keep elbows tucked, full extension at bottom" },
        { name: "Overhead Tricep Extension", sets: "3 x 10-12", muscle: "Triceps", tip: "Keep upper arms still, only forearms move" },
        { name: "Diamond Push-ups", sets: "3 x failure", muscle: "Triceps", tip: "Hands close together, elbows track back" },
      ]
    },
    {
      id: "back",
      name: "Back & Biceps",
      emoji: "🏋️",
      color: "#0891b2",
      day: "Day 2",
      exercises: [
        { name: "Deadlift", sets: "4 x 5-6", muscle: "Full Back", tip: "Neutral spine, bar stays close to body" },
        { name: "Pull-ups", sets: "4 x failure", muscle: "Lats", tip: "Full hang at bottom, chin over bar at top" },
        { name: "Barbell Row", sets: "4 x 8-10", muscle: "Mid Back", tip: "Hinge at hips, pull to lower chest" },
        { name: "Lat Pulldown", sets: "3 x 10-12", muscle: "Lats", tip: "Lean back slightly, pull to upper chest" },
        { name: "Barbell Curl", sets: "4 x 10-12", muscle: "Biceps", tip: "Keep elbows fixed, full range of motion" },
        { name: "Hammer Curl", sets: "3 x 12", muscle: "Biceps & Forearms", tip: "Neutral grip, controlled movement" },
      ]
    },
    {
      id: "legs",
      name: "Leg Day",
      emoji: "🦵",
      color: "#059669",
      day: "Day 3",
      exercises: [
        { name: "Squat", sets: "5 x 5", muscle: "Quads & Glutes", tip: "Knees track over toes, depth below parallel" },
        { name: "Romanian Deadlift", sets: "4 x 10", muscle: "Hamstrings", tip: "Hinge at hips, slight knee bend, feel the stretch" },
        { name: "Leg Press", sets: "4 x 12-15", muscle: "Quads", tip: "Feet shoulder width, do not lock knees" },
        { name: "Leg Curl", sets: "3 x 12-15", muscle: "Hamstrings", tip: "Full range, squeeze at the top" },
        { name: "Calf Raise", sets: "4 x 20", muscle: "Calves", tip: "Full stretch at bottom, pause at top" },
        { name: "Walking Lunges", sets: "3 x 20 steps", muscle: "Quads & Glutes", tip: "Long stride, knee barely touches floor" },
      ]
    },
    {
      id: "shoulders",
      name: "Shoulders & Abs",
      emoji: "🎯",
      color: "#dc2626",
      day: "Day 4",
      exercises: [
        { name: "Overhead Press", sets: "4 x 8-10", muscle: "Shoulders", tip: "Bar path straight up, core tight" },
        { name: "Lateral Raise", sets: "4 x 15", muscle: "Side Delts", tip: "Slight forward lean, lead with elbows" },
        { name: "Face Pull", sets: "3 x 15-20", muscle: "Rear Delts", tip: "Pull to forehead level, externally rotate" },
        { name: "Arnold Press", sets: "3 x 12", muscle: "Full Shoulder", tip: "Rotate palms as you press, full range" },
        { name: "Plank", sets: "3 x 60 sec", muscle: "Core", tip: "Straight line head to heels, breathe steadily" },
        { name: "Cable Crunch", sets: "3 x 15-20", muscle: "Abs", tip: "Round the spine, crunch with abs not hip flexors" },
      ]
    },
    {
      id: "cardio",
      name: "Cardio & Core",
      emoji: "🏃",
      color: "#d97706",
      day: "Day 5",
      exercises: [
        { name: "Treadmill Run", sets: "20-30 min", muscle: "Cardio", tip: "Maintain conversational pace for fat burn" },
        { name: "Jump Rope", sets: "5 x 3 min", muscle: "Cardio", tip: "Stay on balls of feet, relaxed shoulders" },
        { name: "Burpees", sets: "4 x 10", muscle: "Full Body", tip: "Explosive jump, soft landing, chest to floor" },
        { name: "Mountain Climbers", sets: "3 x 30 sec", muscle: "Core & Cardio", tip: "Hips level, drive knees fast" },
        { name: "Hanging Knee Raise", sets: "3 x 15", muscle: "Lower Abs", tip: "Control the swing, squeeze at top" },
        { name: "Russian Twist", sets: "3 x 20", muscle: "Obliques", tip: "Lean back 45 degrees, rotate fully each side" },
      ]
    },
    {
      id: "rest",
      name: "Active Recovery",
      emoji: "🧘",
      color: "#7c3aed",
      day: "Day 6-7",
      exercises: [
        { name: "Foam Rolling", sets: "10 min", muscle: "Full Body", tip: "Slow rolls, pause on tight spots for 30 sec" },
        { name: "Hip Flexor Stretch", sets: "3 x 30 sec", muscle: "Hip Flexors", tip: "Deep lunge, push hips forward gently" },
        { name: "Hamstring Stretch", sets: "3 x 30 sec", muscle: "Hamstrings", tip: "Hinge forward, soft knees, breathe into stretch" },
        { name: "Chest Opener", sets: "3 x 30 sec", muscle: "Chest & Shoulders", tip: "Hands clasped behind back, open chest to ceiling" },
        { name: "Child's Pose", sets: "2 x 60 sec", muscle: "Back & Hips", tip: "Arms extended, breathe deeply, sink into floor" },
        { name: "Walking", sets: "20-30 min", muscle: "Active Recovery", tip: "Easy pace, fresh air, mental reset" },
      ]
    }
  ];

  let activeWorkout = null;
  let activeExercise = null;

  function renderWorkoutsPage() {
    const root = document.getElementById("page-workouts");
    if (!root) return;

    root.innerHTML = `
      <style>
        .wk-shell { display: grid; gap: 20px; }

        .wk-hero {
          padding: 24px;
          border-radius: 24px;
          background: linear-gradient(135deg, rgba(124,58,237,.9), rgba(16,185,129,.8));
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
          box-shadow: var(--shadow-2);
        }
        .wk-hero__title { font-size: 26px; font-weight: 900; margin: 0 0 6px; }
        .wk-hero__sub { opacity: .88; font-size: 14px; line-height: 1.5; max-width: 500px; }
        .wk-hero__badge {
          background: rgba(255,255,255,.2);
          border: 1px solid rgba(255,255,255,.3);
          border-radius: 999px;
          padding: 10px 18px;
          font-weight: 800;
          font-size: 14px;
          white-space: nowrap;
        }

        .wk-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }

        .wk-card {
          border-radius: 20px;
          border: 1px solid var(--line);
          background: var(--card);
          box-shadow: var(--shadow);
          cursor: pointer;
          transition: .2s ease;
          overflow: hidden;
        }
        .wk-card:hover { transform: translateY(-3px); box-shadow: var(--shadow-2); }
        .wk-card.active { border-color: var(--primary); box-shadow: 0 0 0 3px rgba(124,58,237,.15); }

        .wk-card__top {
          padding: 18px 18px 14px;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .wk-card__icon {
          width: 46px;
          height: 46px;
          border-radius: 14px;
          display: grid;
          place-items: center;
          font-size: 22px;
          flex-shrink: 0;
        }
        .wk-card__name { font-weight: 900; font-size: 15px; line-height: 1.2; }
        .wk-card__day { font-size: 12px; color: var(--muted); margin-top: 3px; }
        .wk-card__count {
          margin: 0 18px 16px;
          font-size: 13px;
          color: var(--muted);
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .wk-card__bar {
          height: 3px;
          background: var(--line);
          margin: 0 18px 18px;
          border-radius: 999px;
          overflow: hidden;
        }
        .wk-card__bar-fill {
          height: 100%;
          border-radius: 999px;
          width: 0%;
          transition: width .6s ease;
        }

        .wk-detail {
          border-radius: 24px;
          border: 1px solid var(--line);
          background: var(--card);
          box-shadow: var(--shadow);
          overflow: hidden;
        }
        .wk-detail__header {
          padding: 22px 24px 18px;
          display: flex;
          align-items: center;
          gap: 16px;
          border-bottom: 1px solid var(--line);
          flex-wrap: wrap;
        }
        .wk-detail__icon {
          width: 52px;
          height: 52px;
          border-radius: 16px;
          display: grid;
          place-items: center;
          font-size: 26px;
          flex-shrink: 0;
        }
        .wk-detail__title { font-size: 22px; font-weight: 900; margin: 0 0 4px; }
        .wk-detail__sub { color: var(--muted); font-size: 14px; }
        .wk-detail__close {
          margin-left: auto;
          border: none;
          background: var(--card-2);
          border: 1px solid var(--line);
          border-radius: 12px;
          padding: 10px 16px;
          font-weight: 800;
          cursor: pointer;
          color: var(--text);
          transition: .2s;
        }
        .wk-detail__close:hover { background: var(--line); }

        .wk-exercise-list { padding: 16px; display: grid; gap: 10px; }

        .wk-ex {
          border-radius: 16px;
          border: 1px solid var(--line);
          background: var(--card-2);
          padding: 16px;
          cursor: pointer;
          transition: .2s ease;
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 10px;
          align-items: start;
        }
        .wk-ex:hover { border-color: var(--primary2); background: var(--card); }
        .wk-ex.open { border-color: var(--primary); background: var(--card); }
        .wk-ex__name { font-weight: 800; font-size: 15px; }
        .wk-ex__meta { font-size: 13px; color: var(--muted); margin-top: 4px; }
        .wk-ex__sets {
          background: var(--card);
          border: 1px solid var(--line);
          border-radius: 10px;
          padding: 6px 10px;
          font-size: 12px;
          font-weight: 800;
          color: var(--primary);
          white-space: nowrap;
        }
        .wk-ex__tip {
          grid-column: 1 / -1;
          font-size: 13px;
          color: var(--muted);
          line-height: 1.55;
          margin-top: 8px;
          padding-top: 10px;
          border-top: 1px solid var(--line);
          display: none;
        }
        .wk-ex.open .wk-ex__tip { display: block; }

        .wk-anim {
          margin: 16px;
          border-radius: 18px;
          border: 1px solid var(--line);
          background: var(--card-2);
          padding: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 14px;
        }
        .wk-anim__title { font-weight: 800; font-size: 14px; color: var(--muted); }

        .wk-figure {
          position: relative;
          width: 120px;
          height: 160px;
        }

        @keyframes wk-press-down {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(12px); }
        }
        @keyframes wk-curl-arm {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(-50deg); }
        }
        @keyframes wk-squat-body {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(18px); }
        }
        @keyframes wk-run-leg1 {
          0%, 100% { transform: rotate(-20deg); }
          50% { transform: rotate(30deg); }
        }
        @keyframes wk-run-leg2 {
          0%, 100% { transform: rotate(30deg); }
          50% { transform: rotate(-20deg); }
        }
        @keyframes wk-run-arm1 {
          0%, 100% { transform: rotate(20deg); }
          50% { transform: rotate(-20deg); }
        }
        @keyframes wk-run-arm2 {
          0%, 100% { transform: rotate(-20deg); }
          50% { transform: rotate(20deg); }
        }
        @keyframes wk-breathe {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.06); }
        }

        .wk-log-btn {
          margin: 0 16px 16px;
          width: calc(100% - 32px);
          border: none;
          border-radius: 14px;
          padding: 14px;
          font-weight: 800;
          font-size: 15px;
          color: #fff;
          background: linear-gradient(135deg, var(--primary), var(--green));
          box-shadow: 0 8px 20px rgba(124,58,237,.2);
          cursor: pointer;
          transition: .2s ease;
        }
        .wk-log-btn:hover { transform: translateY(-1px); }

        @media (max-width: 900px) { .wk-grid { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 600px) { .wk-grid { grid-template-columns: 1fr; } }
      </style>

      <div class="wk-shell">

        <div class="wk-hero">
          <div>
            <h2 class="wk-hero__title">Workout Library</h2>
            <p class="wk-hero__sub">6-day training split. Click any workout to see exercises, tips, and animated guides.</p>
          </div>
          <div class="wk-hero__badge">6 Day Split</div>
        </div>

        <div class="wk-grid" id="wkGrid">
          ${WORKOUTS.map(w => `
            <div class="wk-card" data-wk-id="${w.id}">
              <div class="wk-card__top">
                <div class="wk-card__icon" style="background:${w.color}22">${w.emoji}</div>
                <div>
                  <div class="wk-card__name">${w.name}</div>
                  <div class="wk-card__day">${w.day} &bull; ${w.exercises.length} exercises</div>
                </div>
              </div>
              <div class="wk-card__count">${w.exercises.map(e => e.muscle).slice(0,3).join(" · ")}</div>
              <div class="wk-card__bar">
                <div class="wk-card__bar-fill" style="background:${w.color};width:0%" data-bar="${w.id}"></div>
              </div>
            </div>
          `).join("")}
        </div>

        <div id="wkDetail" style="display:none"></div>

      </div>
    `;

    // animate bars on load
    setTimeout(() => {
      WORKOUTS.forEach((w, i) => {
        const bar = root.querySelector(`[data-bar="${w.id}"]`);
        if (bar) bar.style.width = (40 + i * 10) + "%";
      });
    }, 200);

    bindWorkoutEvents(root);
  }

  function getAnimationSVG(exerciseName) {
    const name = exerciseName.toLowerCase();

    // Running / cardio
    if (name.includes("run") || name.includes("treadmill") || name.includes("cardio")) {
      return `
        <svg width="120" height="160" viewBox="0 0 120 160" fill="none">
          <circle cx="60" cy="22" r="12" fill="#7c3aed" opacity=".9"/>
          <g style="transform-origin:60px 40px;animation:wk-press-down 0.7s ease-in-out infinite">
            <rect x="52" y="34" width="16" height="30" rx="8" fill="#7c3aed" opacity=".8"/>
            <rect x="36" y="40" width="12" height="22" rx="6" fill="#a78bfa" style="transform-origin:48px 40px;animation:wk-run-arm1 0.7s ease-in-out infinite"/>
            <rect x="72" y="40" width="12" height="22" rx="6" fill="#a78bfa" style="transform-origin:72px 40px;animation:wk-run-arm2 0.7s ease-in-out infinite"/>
            <rect x="53" y="64" width="10" height="28" rx="5" fill="#7c3aed" style="transform-origin:58px 64px;animation:wk-run-leg1 0.7s ease-in-out infinite"/>
            <rect x="57" y="64" width="10" height="28" rx="5" fill="#5b21b6" style="transform-origin:62px 64px;animation:wk-run-leg2 0.7s ease-in-out infinite"/>
          </g>
        </svg>`;
    }

    // Curl / biceps
    if (name.includes("curl") || name.includes("bicep")) {
      return `
        <svg width="120" height="160" viewBox="0 0 120 160" fill="none">
          <circle cx="60" cy="22" r="12" fill="#0891b2" opacity=".9"/>
          <rect x="52" y="34" width="16" height="34" rx="8" fill="#0891b2" opacity=".8"/>
          <g style="transform-origin:52px 68px;animation:wk-curl-arm 1s ease-in-out infinite">
            <rect x="36" y="62" width="16" height="28" rx="8" fill="#06b6d4"/>
            <rect x="28" y="86" width="22" height="8" rx="4" fill="#164e63"/>
          </g>
          <g style="transform-origin:68px 68px;animation:wk-curl-arm 1s ease-in-out infinite .5s">
            <rect x="68" y="62" width="16" height="28" rx="8" fill="#06b6d4"/>
            <rect x="70" y="86" width="22" height="8" rx="4" fill="#164e63"/>
          </g>
          <rect x="50" y="68" width="20" height="50" rx="10" fill="#0891b2" opacity=".7"/>
        </svg>`;
    }

    // Squat / legs
    if (name.includes("squat") || name.includes("leg") || name.includes("lunge")) {
      return `
        <svg width="120" height="160" viewBox="0 0 120 160" fill="none">
          <circle cx="60" cy="20" r="12" fill="#059669" opacity=".9"/>
          <g style="transform-origin:60px 70px;animation:wk-squat-body 1.2s ease-in-out infinite">
            <rect x="52" y="32" width="16" height="30" rx="8" fill="#059669" opacity=".85"/>
            <rect x="34" y="36" width="12" height="24" rx="6" fill="#34d399" opacity=".8"/>
            <rect x="74" y="36" width="12" height="24" rx="6" fill="#34d399" opacity=".8"/>
            <rect x="52" y="62" width="10" height="30" rx="5" fill="#047857"/>
            <rect x="58" y="62" width="10" height="30" rx="5" fill="#065f46"/>
            <rect x="46" y="88" width="14" height="10" rx="5" fill="#059669"/>
            <rect x="60" y="88" width="14" height="10" rx="5" fill="#059669"/>
          </g>
        </svg>`;
    }

    // Meditation / stretch / recovery
    if (name.includes("stretch") || name.includes("yoga") || name.includes("foam") || name.includes("child") || name.includes("walk") || name.includes("pose")) {
      return `
        <svg width="120" height="160" viewBox="0 0 120 160" fill="none">
          <circle cx="60" cy="28" r="14" fill="#7c3aed" opacity=".9" style="animation:wk-breathe 3s ease-in-out infinite"/>
          <ellipse cx="60" cy="80" rx="22" ry="28" fill="#a78bfa" opacity=".6" style="animation:wk-breathe 3s ease-in-out infinite"/>
          <rect x="30" y="70" width="18" height="10" rx="5" fill="#7c3aed" opacity=".7" style="transform-origin:48px 75px;animation:wk-run-arm1 3s ease-in-out infinite"/>
          <rect x="72" y="70" width="18" height="10" rx="5" fill="#7c3aed" opacity=".7" style="transform-origin:72px 75px;animation:wk-run-arm2 3s ease-in-out infinite"/>
        </svg>`;
    }

    // Default — bench press / push
    return `
      <svg width="120" height="160" viewBox="0 0 120 160" fill="none">
        <circle cx="60" cy="22" r="12" fill="#7c3aed" opacity=".9"/>
        <g style="transform-origin:60px 50px;animation:wk-press-down 1s ease-in-out infinite">
          <rect x="52" y="34" width="16" height="28" rx="8" fill="#7c3aed" opacity=".85"/>
          <rect x="28" y="44" width="24" height="10" rx="5" fill="#a78bfa"/>
          <rect x="68" y="44" width="24" height="10" rx="5" fill="#a78bfa"/>
          <rect x="20" y="40" width="10" height="18" rx="5" fill="#4c1d95"/>
          <rect x="90" y="40" width="10" height="18" rx="5" fill="#4c1d95"/>
        </g>
        <rect x="52" y="62" width="16" height="34" rx="8" fill="#6d28d9" opacity=".7"/>
        <rect x="46" y="94" width="12" height="24" rx="6" fill="#7c3aed"/>
        <rect x="62" y="94" width="12" height="24" rx="6" fill="#7c3aed"/>
      </svg>`;
  }

  function renderDetail(workout, root) {
    const detailEl = root.querySelector("#wkDetail");
    if (!detailEl) return;

    detailEl.style.display = "block";
    detailEl.innerHTML = `
      <div class="wk-detail">
        <div class="wk-detail__header">
          <div class="wk-detail__icon" style="background:${workout.color}22;font-size:26px">${workout.emoji}</div>
          <div>
            <div class="wk-detail__title">${workout.name}</div>
            <div class="wk-detail__sub">${workout.day} &bull; ${workout.exercises.length} exercises &bull; ~60 min</div>
          </div>
          <button class="wk-detail__close" id="wkClose">Close</button>
        </div>

        <div class="wk-anim" id="wkAnim">
          <div class="wk-anim__title">TAP AN EXERCISE TO SEE ANIMATION</div>
          ${getAnimationSVG(workout.exercises[0].name)}
          <div style="font-size:13px;color:var(--muted);text-align:center">${workout.exercises[0].name}</div>
        </div>

        <div class="wk-exercise-list">
          ${workout.exercises.map((ex, i) => `
            <div class="wk-ex" data-ex-idx="${i}">
              <div>
                <div class="wk-ex__name">${ex.name}</div>
                <div class="wk-ex__meta">${ex.muscle}</div>
                <div class="wk-ex__tip">${ex.tip}</div>
              </div>
              <div class="wk-ex__sets">${ex.sets}</div>
            </div>
          `).join("")}
        </div>

        <button class="wk-log-btn" id="wkLogBtn">Log This Workout + 10 XP</button>
      </div>
    `;

    detailEl.scrollIntoView({ behavior: "smooth", block: "start" });

    // close button
    detailEl.querySelector("#wkClose").addEventListener("click", () => {
      detailEl.style.display = "none";
      detailEl.innerHTML = "";
      activeWorkout = null;
      root.querySelectorAll(".wk-card").forEach(c => c.classList.remove("active"));
    });

    // exercise tap — show animation and tip
    detailEl.querySelectorAll(".wk-ex").forEach((el, i) => {
      el.addEventListener("click", () => {
        detailEl.querySelectorAll(".wk-ex").forEach(e => e.classList.remove("open"));
        el.classList.toggle("open");

        const ex = workout.exercises[i];
        const animEl = detailEl.querySelector("#wkAnim");
        if (animEl) {
          animEl.innerHTML = `
            <div class="wk-anim__title">${ex.name.toUpperCase()}</div>
            ${getAnimationSVG(ex.name)}
            <div style="font-size:13px;color:var(--muted);text-align:center;max-width:220px">${ex.tip}</div>
          `;
        }
      });
    });

    // log workout
    detailEl.querySelector("#wkLogBtn").addEventListener("click", async () => {
      const btn = detailEl.querySelector("#wkLogBtn");
      btn.textContent = "Saving...";
      btn.disabled = true;

      try {
        const state = await window.authApi.loadState();
        const sessions = Array.isArray(state.sessions) ? state.sessions : [];
        sessions.push({
          name: workout.name,
          day: workout.day,
          exercises: workout.exercises.length,
          createdAt: new Date().toISOString()
        });
        state.sessions = sessions;
        state.xp = Number(state.xp || 0) + 10;
        await window.authApi.saveState(state);
        btn.textContent = "Workout Logged!";
        btn.style.background = "linear-gradient(135deg,#059669,#10b981)";
      } catch (err) {
        btn.textContent = "Could not save. Try again.";
        btn.disabled = false;
      }
    });
  }

  function bindWorkoutEvents(root) {
    root.querySelector("#wkGrid").addEventListener("click", (e) => {
      const card = e.target.closest(".wk-card");
      if (!card) return;

      const id = card.dataset.wkId;
      const workout = WORKOUTS.find(w => w.id === id);
      if (!workout) return;

      root.querySelectorAll(".wk-card").forEach(c => c.classList.remove("active"));
      card.classList.add("active");
      activeWorkout = id;
      renderDetail(workout, root);
    });
  }

  window.LuxPagesWorkouts = { renderWorkoutsPage };
})();