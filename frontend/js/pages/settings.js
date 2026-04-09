(() => {
  "use strict";

  function renderSettingsPage() {
    const root = document.getElementById("page-settings");
    if (!root) return;

    root.innerHTML = `
      <style>
        .st-shell { display: grid; gap: 20px; }

        .st-hero {
          padding: 24px;
          border-radius: 24px;
          background: linear-gradient(135deg, rgba(17,24,39,.95), rgba(124,58,237,.7));
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
          box-shadow: var(--shadow-2);
        }
        .st-hero__title { font-size: 26px; font-weight: 900; margin: 0 0 6px; }
        .st-hero__sub { opacity: .88; font-size: 14px; line-height: 1.5; }

        .st-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }

        .st-card {
          background: var(--card);
          border: 1px solid var(--line);
          border-radius: 24px;
          padding: 22px;
          box-shadow: var(--shadow);
        }
        .st-card__title { font-size: 18px; font-weight: 900; margin: 0 0 18px; }

        .st-form { display: grid; gap: 14px; }
        .st-label { font-size: 13px; font-weight: 700; color: var(--muted); margin-bottom: 5px; }
        .st-input {
          width: 100%;
          border: 1px solid var(--line);
          background: var(--card-2);
          color: var(--text);
          border-radius: 12px;
          padding: 12px 14px;
          font-size: 15px;
          outline: none;
          transition: .2s;
          font-family: inherit;
        }
        .st-input:focus {
          border-color: var(--primary2);
          box-shadow: 0 0 0 3px rgba(167,139,250,.14);
        }
        .st-select {
          width: 100%;
          border: 1px solid var(--line);
          background: var(--card-2);
          color: var(--text);
          border-radius: 12px;
          padding: 12px 14px;
          font-size: 15px;
          outline: none;
          cursor: pointer;
          font-family: inherit;
        }
        .st-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }

        .st-btn {
          border: none;
          border-radius: 14px;
          padding: 13px;
          font-weight: 800;
          font-size: 15px;
          color: #fff;
          background: linear-gradient(135deg, var(--primary), var(--green));
          cursor: pointer;
          transition: .2s;
          width: 100%;
        }
        .st-btn:hover { transform: translateY(-1px); }
        .st-btn--danger {
          background: #fff1f2;
          color: #be123c;
          border: 1px solid #fecdd3;
        }
        .st-btn--ghost {
          background: var(--card-2);
          color: var(--text);
          border: 1px solid var(--line);
        }

        .st-summary { display: grid; gap: 10px; }
        .st-pill {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 14px;
          border-radius: 14px;
          background: var(--card-2);
          border: 1px solid var(--line);
          font-size: 14px;
        }
        .st-pill__label { color: var(--muted); font-weight: 700; }
        .st-pill__val { font-weight: 900; }

        .st-divider { height: 1px; background: var(--line); margin: 4px 0; }

        @media (max-width: 700px) {
          .st-grid { grid-template-columns: 1fr; }
          .st-row { grid-template-columns: 1fr; }
        }
      </style>

      <div class="st-shell">

        <div class="st-hero">
          <div>
            <h2 class="st-hero__title">Settings</h2>
            <p class="st-hero__sub">Update your profile, goals, and app preferences. Saved directly to MongoDB.</p>
          </div>
        </div>

        <div class="st-grid">
          <div class="st-card">
            <div class="st-card__title">Profile</div>
            <div class="st-form" id="stProfileForm">
              <div>
                <div class="st-label">Full Name</div>
                <input class="st-input" id="stName" type="text" placeholder="Your name" />
              </div>
              <div>
                <div class="st-label">Fitness Goal</div>
                <select class="st-select" id="stGoal">
                  <option value="strength">Strength</option>
                  <option value="fat loss">Fat Loss</option>
                  <option value="muscle gain">Muscle Gain</option>
                  <option value="fitness">General Fitness</option>
                </select>
              </div>
              <div>
                <div class="st-label">Activity Level</div>
                <select class="st-select" id="stActivity">
                  <option value="sedentary">Sedentary</option>
                  <option value="light">Lightly Active</option>
                  <option value="moderate">Moderately Active</option>
                  <option value="very">Very Active</option>
                  <option value="extreme">Extremely Active</option>
                </select>
              </div>
              <div class="st-row">
                <div>
                  <div class="st-label">Height (cm)</div>
                  <input class="st-input" id="stHeight" type="number" placeholder="e.g. 175" />
                </div>
                <div>
                  <div class="st-label">Weight (kg)</div>
                  <input class="st-input" id="stWeight" type="number" placeholder="e.g. 75" />
                </div>
              </div>
              <div class="st-row">
                <div>
                  <div class="st-label">Age</div>
                  <input class="st-input" id="stAge" type="number" placeholder="e.g. 25" />
                </div>
                <div>
                  <div class="st-label">Gender</div>
                  <select class="st-select" id="stGender">
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
              </div>
              <button class="st-btn" id="stSaveProfile">Save Profile</button>
            </div>
          </div>

          <div class="st-card">
            <div class="st-card__title">Account Summary</div>
            <div class="st-summary" id="stSummary">
              <div class="st-pill"><span class="st-pill__label">Name</span><span class="st-pill__val" id="sumName">Loading...</span></div>
              <div class="st-pill"><span class="st-pill__label">Goal</span><span class="st-pill__val" id="sumGoal">--</span></div>
              <div class="st-pill"><span class="st-pill__label">Height</span><span class="st-pill__val" id="sumHeight">--</span></div>
              <div class="st-pill"><span class="st-pill__label">Weight</span><span class="st-pill__val" id="sumWeight">--</span></div>
              <div class="st-pill"><span class="st-pill__label">Age</span><span class="st-pill__val" id="sumAge">--</span></div>
              <div class="st-pill"><span class="st-pill__label">Activity</span><span class="st-pill__val" id="sumActivity">--</span></div>
              <div class="st-pill"><span class="st-pill__label">Workouts Logged</span><span class="st-pill__val" id="sumSessions">--</span></div>
            </div>

            <div class="st-divider" style="margin-top:16px"></div>

            <div style="margin-top:16px;display:grid;gap:10px">
              <button class="st-btn st-btn--ghost" id="stThemeBtn">Toggle Theme (Light / Dark)</button>
              <button class="st-btn st-btn--danger" id="stLogoutBtn">Logout</button>
            </div>
          </div>
        </div>

      </div>
    `;

    loadSettingsData(root);
    bindSettingsEvents(root);
  }

  async function loadSettingsData(root) {
    try {
      const state = await window.authApi.loadState();
      const profile = state.profile || {};
      const sessions = state.sessions || [];

      // fill form
      root.querySelector("#stName").value = profile.name || "";
      root.querySelector("#stGoal").value = profile.goal || "strength";
      root.querySelector("#stActivity").value = profile.activityLevel || "moderate";
      root.querySelector("#stHeight").value = profile.height || "";
      root.querySelector("#stWeight").value = profile.weight || "";
      root.querySelector("#stAge").value = profile.age || "";
      root.querySelector("#stGender").value = profile.gender || "male";

      // fill summary
      root.querySelector("#sumName").textContent = profile.name || "Not set";
      root.querySelector("#sumGoal").textContent = profile.goal || "Not set";
      root.querySelector("#sumHeight").textContent = profile.height ? profile.height + " cm" : "Not set";
      root.querySelector("#sumWeight").textContent = profile.weight ? profile.weight + " kg" : "Not set";
      root.querySelector("#sumAge").textContent = profile.age ? profile.age + " years" : "Not set";
      root.querySelector("#sumActivity").textContent = profile.activityLevel || "Not set";
      root.querySelector("#sumSessions").textContent = sessions.length;

    } catch (err) {
      console.error("Settings load error:", err);
    }
  }

  function bindSettingsEvents(root) {

    // save profile
    root.querySelector("#stSaveProfile").addEventListener("click", async () => {
      const btn = root.querySelector("#stSaveProfile");
      btn.textContent = "Saving...";
      btn.disabled = true;

      try {
        const state = await window.authApi.loadState();
        state.profile = state.profile || {};
        state.profile.name = root.querySelector("#stName").value.trim() || "User";
        state.profile.goal = root.querySelector("#stGoal").value;
        state.profile.activityLevel = root.querySelector("#stActivity").value;
        state.profile.height = parseFloat(root.querySelector("#stHeight").value) || 0;
        state.profile.weight = parseFloat(root.querySelector("#stWeight").value) || 0;
        state.profile.age = parseInt(root.querySelector("#stAge").value) || 0;
        state.profile.gender = root.querySelector("#stGender").value;
        await window.authApi.saveState(state);

        btn.textContent = "Saved!";
        btn.style.background = "linear-gradient(135deg,#059669,#10b981)";
        loadSettingsData(root);
      } catch (err) {
        btn.textContent = "Error. Try again.";
        btn.disabled = false;
      }
    });

    // theme toggle
    root.querySelector("#stThemeBtn").addEventListener("click", () => {
      const isDark = document.body.classList.toggle("theme-dark");
      localStorage.setItem("luxgym_theme", isDark ? "dark" : "light");
    });

    // logout
    root.querySelector("#stLogoutBtn").addEventListener("click", () => {
      window.authApi.logout();
      location.reload();
    });
  }

  window.LuxPagesSettings = { renderSettingsPage };
})();