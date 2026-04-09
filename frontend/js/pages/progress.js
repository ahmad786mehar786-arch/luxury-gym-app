(() => {
  "use strict";

  function renderProgressPage() {
    const root = document.getElementById("page-progress");
    if (!root) return;

    root.innerHTML = `
      <style>
        .pg-shell { display: grid; gap: 20px; }

        .pg-hero {
          padding: 24px;
          border-radius: 24px;
          background: linear-gradient(135deg, rgba(124,58,237,.9), rgba(239,68,68,.7));
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
          box-shadow: var(--shadow-2);
        }
        .pg-hero__title { font-size: 26px; font-weight: 900; margin: 0 0 6px; }
        .pg-hero__sub { opacity: .88; font-size: 14px; line-height: 1.5; }
        .pg-hero__badge {
          background: rgba(255,255,255,.2);
          border: 1px solid rgba(255,255,255,.3);
          border-radius: 999px;
          padding: 10px 18px;
          font-weight: 800;
          font-size: 14px;
          white-space: nowrap;
        }

        .pg-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }
        .pg-stat {
          background: var(--card);
          border: 1px solid var(--line);
          border-radius: 20px;
          padding: 20px;
          box-shadow: var(--shadow);
          text-align: center;
        }
        .pg-stat__val { font-size: 28px; font-weight: 900; line-height: 1.1; }
        .pg-stat__label { font-size: 13px; color: var(--muted); margin-top: 6px; font-weight: 700; }

        .pg-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }

        .pg-card {
          background: var(--card);
          border: 1px solid var(--line);
          border-radius: 24px;
          padding: 22px;
          box-shadow: var(--shadow);
        }
        .pg-card__title { font-size: 18px; font-weight: 900; margin: 0 0 16px; }

        .pg-form { display: grid; gap: 12px; }
        .pg-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .pg-label { font-size: 13px; font-weight: 700; color: var(--muted); margin-bottom: 5px; }
        .pg-input {
          width: 100%;
          border: 1px solid var(--line);
          background: var(--card-2);
          color: var(--text);
          border-radius: 12px;
          padding: 12px 14px;
          font-size: 14px;
          outline: none;
          transition: .2s;
          font-family: inherit;
        }
        .pg-input:focus {
          border-color: var(--primary2);
          box-shadow: 0 0 0 3px rgba(167,139,250,.14);
        }
        .pg-btn {
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
        .pg-btn:hover { transform: translateY(-1px); }

        .pg-records { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
        .pg-record {
          padding: 16px;
          border-radius: 16px;
          background: var(--card-2);
          border: 1px solid var(--line);
          text-align: center;
        }
        .pg-record__val { font-size: 24px; font-weight: 900; color: var(--primary); }
        .pg-record__label { font-size: 13px; color: var(--muted); margin-top: 4px; font-weight: 700; }

        .pg-chart {
          display: flex;
          align-items: flex-end;
          gap: 8px;
          height: 140px;
          padding: 0 4px;
        }
        .pg-bar-wrap {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          height: 100%;
          justify-content: flex-end;
        }
        .pg-bar {
          width: 100%;
          border-radius: 8px 8px 4px 4px;
          background: linear-gradient(180deg, var(--primary), var(--primary2));
          transition: height .5s ease;
          min-height: 4px;
        }
        .pg-bar-label { font-size: 11px; color: var(--muted); font-weight: 700; }

        .pg-history { display: grid; gap: 10px; max-height: 320px; overflow-y: auto; }
        .pg-entry {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding: 14px;
          border-radius: 14px;
          background: var(--card-2);
          border: 1px solid var(--line);
          flex-wrap: wrap;
        }
        .pg-entry__weight { font-size: 18px; font-weight: 900; }
        .pg-entry__meta { font-size: 13px; color: var(--muted); margin-top: 3px; }
        .pg-entry__date { font-size: 12px; color: var(--muted); }
        .pg-del {
          border: none;
          background: #fff1f2;
          color: #be123c;
          border-radius: 10px;
          padding: 7px 12px;
          font-size: 12px;
          font-weight: 800;
          cursor: pointer;
          transition: .2s;
          flex-shrink: 0;
        }
        .pg-del:hover { background: #fecdd3; }

        .pg-empty { text-align: center; padding: 30px; color: var(--muted); font-size: 14px; }

        .pg-notes {
          width: 100%;
          border: 1px solid var(--line);
          background: var(--card-2);
          color: var(--text);
          border-radius: 12px;
          padding: 14px;
          font-size: 14px;
          outline: none;
          transition: .2s;
          font-family: inherit;
          resize: vertical;
          min-height: 100px;
        }
        .pg-notes:focus {
          border-color: var(--primary2);
          box-shadow: 0 0 0 3px rgba(167,139,250,.14);
        }

        @media (max-width: 900px) {
          .pg-stats { grid-template-columns: 1fr 1fr; }
          .pg-grid { grid-template-columns: 1fr; }
          .pg-records { grid-template-columns: 1fr 1fr 1fr; }
        }
        @media (max-width: 600px) {
          .pg-stats { grid-template-columns: 1fr 1fr; }
          .pg-row { grid-template-columns: 1fr; }
          .pg-records { grid-template-columns: 1fr; }
        }
      </style>

      <div class="pg-shell">
        <div class="pg-hero">
          <div>
            <h2 class="pg-hero__title">Progress Tracker</h2>
            <p class="pg-hero__sub">Log your weight, measurements, personal records and notes. All saved to MongoDB.</p>
          </div>
          <div class="pg-hero__badge">Real Data</div>
        </div>

        <div class="pg-stats" id="pgStats">
          <div class="pg-stat">
            <div class="pg-stat__val" id="pgTotalEntries">--</div>
            <div class="pg-stat__label">Total Entries</div>
          </div>
          <div class="pg-stat">
            <div class="pg-stat__val" id="pgLatestWeight" style="color:var(--primary)">--</div>
            <div class="pg-stat__label">Latest Weight</div>
          </div>
          <div class="pg-stat">
            <div class="pg-stat__val" id="pgChange">--</div>
            <div class="pg-stat__label">Total Change</div>
          </div>
          <div class="pg-stat">
            <div class="pg-stat__val" id="pgSessions">--</div>
            <div class="pg-stat__label">Workouts Logged</div>
          </div>
        </div>

        <div class="pg-grid">
          <div class="pg-card">
            <div class="pg-card__title">Add Entry</div>
            <div class="pg-form" id="pgEntryForm">
              <div class="pg-row">
                <div>
                  <div class="pg-label">Weight (kg)</div>
                  <input class="pg-input" id="pgWeight" type="number" step="0.1" placeholder="e.g. 75.5" />
                </div>
                <div>
                  <div class="pg-label">Height (cm)</div>
                  <input class="pg-input" id="pgHeight" type="number" placeholder="e.g. 175" />
                </div>
              </div>
              <div class="pg-row">
                <div>
                  <div class="pg-label">Waist (cm)</div>
                  <input class="pg-input" id="pgWaist" type="number" step="0.1" placeholder="Optional" />
                </div>
                <div>
                  <div class="pg-label">Chest (cm)</div>
                  <input class="pg-input" id="pgChest" type="number" step="0.1" placeholder="Optional" />
                </div>
              </div>
              <div class="pg-row">
                <div>
                  <div class="pg-label">Arms (cm)</div>
                  <input class="pg-input" id="pgArms" type="number" step="0.1" placeholder="Optional" />
                </div>
                <div>
                  <div class="pg-label">Legs (cm)</div>
                  <input class="pg-input" id="pgLegs" type="number" step="0.1" placeholder="Optional" />
                </div>
              </div>
              <button class="pg-btn" id="pgAddBtn">Save Entry</button>
            </div>
          </div>

          <div class="pg-card">
            <div class="pg-card__title">Personal Records</div>
            <div class="pg-records" style="margin-bottom:16px" id="pgRecordDisplay">
              <div class="pg-record"><div class="pg-record__val" id="prBench">--</div><div class="pg-record__label">Bench (kg)</div></div>
              <div class="pg-record"><div class="pg-record__val" id="prSquat">--</div><div class="pg-record__label">Squat (kg)</div></div>
              <div class="pg-record"><div class="pg-record__val" id="prDeadlift">--</div><div class="pg-record__label">Deadlift (kg)</div></div>
            </div>
            <div class="pg-form">
              <div class="pg-row">
                <div>
                  <div class="pg-label">Bench (kg)</div>
                  <input class="pg-input" id="pgBench" type="number" step="0.5" placeholder="e.g. 100" />
                </div>
                <div>
                  <div class="pg-label">Squat (kg)</div>
                  <input class="pg-input" id="pgSquat" type="number" step="0.5" placeholder="e.g. 120" />
                </div>
              </div>
              <div>
                <div class="pg-label">Deadlift (kg)</div>
                <input class="pg-input" id="pgDeadlift" type="number" step="0.5" placeholder="e.g. 140" />
              </div>
              <button class="pg-btn" id="pgRecordBtn">Save Records</button>
            </div>
          </div>
        </div>

        <div class="pg-grid">
          <div class="pg-card">
            <div class="pg-card__title">Weight Chart</div>
            <div class="pg-chart" id="pgChart">
              <div class="pg-empty">No entries yet. Add your first entry above.</div>
            </div>
          </div>

          <div class="pg-card">
            <div class="pg-card__title">Progress Notes</div>
            <div class="pg-form">
              <textarea class="pg-notes" id="pgNotes" placeholder="Write your weekly notes, how you feel, strength changes, diet changes..."></textarea>
              <button class="pg-btn" id="pgNotesBtn">Save Notes</button>
            </div>
          </div>
        </div>

        <div class="pg-card">
          <div class="pg-card__title">History</div>
          <div class="pg-history" id="pgHistory">
            <div class="pg-empty">No entries yet.</div>
          </div>
        </div>
      </div>
    `;

    loadProgressData(root);
    bindProgressEvents(root);
  }

  async function loadProgressData(root) {
    try {
      const state = await window.authApi.loadState();
      const entries = state.progress?.entries || [];
      const records = state.progress?.records || {};
      const notes = state.progress?.notes || "";
      const sessions = state.sessions || [];

      // stats
      root.querySelector("#pgTotalEntries").textContent = entries.length;
      root.querySelector("#pgSessions").textContent = sessions.length;

      if (entries.length > 0) {
        const latest = entries[entries.length - 1];
        const first = entries[0];
        const change = (parseFloat(latest.weight) - parseFloat(first.weight)).toFixed(1);
        root.querySelector("#pgLatestWeight").textContent = latest.weight + " kg";
        root.querySelector("#pgChange").textContent = (change >= 0 ? "+" : "") + change + " kg";
        root.querySelector("#pgChange").style.color = change > 0 ? "#059669" : change < 0 ? "#dc2626" : "var(--text)";
      } else {
        root.querySelector("#pgLatestWeight").textContent = "No data";
        root.querySelector("#pgChange").textContent = "No data";
      }

      // records
      root.querySelector("#prBench").textContent = records.bench ? records.bench + " kg" : "--";
      root.querySelector("#prSquat").textContent = records.squat ? records.squat + " kg" : "--";
      root.querySelector("#prDeadlift").textContent = records.deadlift ? records.deadlift + " kg" : "--";

      // notes
      root.querySelector("#pgNotes").value = notes;

      // chart
      renderChart(root, entries);

      // history
      renderHistory(root, entries);

    } catch (err) {
      console.error("Progress load error:", err);
    }
  }

  function renderChart(root, entries) {
    const chartEl = root.querySelector("#pgChart");
    if (!chartEl) return;
    if (entries.length === 0) {
      chartEl.innerHTML = `<div class="pg-empty">No entries yet. Add your first entry above.</div>`;
      return;
    }
    const last8 = entries.slice(-8);
    const weights = last8.map(e => parseFloat(e.weight) || 0);
    const max = Math.max(...weights, 1);
    chartEl.innerHTML = last8.map(e => {
      const w = parseFloat(e.weight) || 0;
      const h = Math.max(10, Math.round((w / max) * 120));
      const date = new Date(e.date).toLocaleDateString("en-GB", { day: "numeric", month: "short" });
      return `
        <div class="pg-bar-wrap">
          <div class="pg-bar-label">${w}kg</div>
          <div class="pg-bar" style="height:${h}px"></div>
          <div class="pg-bar-label">${date}</div>
        </div>
      `;
    }).join("");
  }

  function renderHistory(root, entries) {
    const histEl = root.querySelector("#pgHistory");
    if (!histEl) return;
    if (entries.length === 0) {
      histEl.innerHTML = `<div class="pg-empty">No entries yet.</div>`;
      return;
    }
    histEl.innerHTML = [...entries].reverse().map((e, i) => {
      const actualIdx = entries.length - 1 - i;
      const date = new Date(e.date).toLocaleString();
      const bmi = e.height ? (parseFloat(e.weight) / ((parseFloat(e.height) / 100) ** 2)).toFixed(1) : "--";
      return `
        <div class="pg-entry">
          <div>
            <div class="pg-entry__weight">${e.weight} kg ${e.height ? "· BMI " + bmi : ""}</div>
            <div class="pg-entry__meta">
              ${e.waist ? "Waist: " + e.waist + "cm" : ""}
              ${e.chest ? " · Chest: " + e.chest + "cm" : ""}
              ${e.arms ? " · Arms: " + e.arms + "cm" : ""}
              ${e.legs ? " · Legs: " + e.legs + "cm" : ""}
            </div>
            <div class="pg-entry__date">${date}</div>
          </div>
          <button class="pg-del" data-del-idx="${actualIdx}">Remove</button>
        </div>
      `;
    }).join("");
  }

  function bindProgressEvents(root) {

    // add entry
    root.querySelector("#pgAddBtn").addEventListener("click", async () => {
      const weight = root.querySelector("#pgWeight").value;
      if (!weight) { alert("Please enter your weight."); return; }

      const btn = root.querySelector("#pgAddBtn");
      btn.textContent = "Saving...";
      btn.disabled = true;

      try {
        const state = await window.authApi.loadState();
        state.progress = state.progress || {};
        state.progress.entries = state.progress.entries || [];
        state.progress.entries.push({
          weight: parseFloat(weight),
          height: parseFloat(root.querySelector("#pgHeight").value) || 0,
          waist: parseFloat(root.querySelector("#pgWaist").value) || 0,
          chest: parseFloat(root.querySelector("#pgChest").value) || 0,
          arms: parseFloat(root.querySelector("#pgArms").value) || 0,
          legs: parseFloat(root.querySelector("#pgLegs").value) || 0,
          date: new Date().toISOString()
        });
        await window.authApi.saveState(state);

        root.querySelector("#pgWeight").value = "";
        root.querySelector("#pgWaist").value = "";
        root.querySelector("#pgChest").value = "";
        root.querySelector("#pgArms").value = "";
        root.querySelector("#pgLegs").value = "";
        btn.textContent = "Saved!";
        btn.style.background = "linear-gradient(135deg,#059669,#10b981)";
        loadProgressData(root);
      } catch (err) {
        btn.textContent = "Error. Try again.";
        btn.disabled = false;
      }
    });

    // save records
    root.querySelector("#pgRecordBtn").addEventListener("click", async () => {
      const btn = root.querySelector("#pgRecordBtn");
      btn.textContent = "Saving...";
      btn.disabled = true;
      try {
        const state = await window.authApi.loadState();
        state.progress = state.progress || {};
        state.progress.records = {
          bench: parseFloat(root.querySelector("#pgBench").value) || 0,
          squat: parseFloat(root.querySelector("#pgSquat").value) || 0,
          deadlift: parseFloat(root.querySelector("#pgDeadlift").value) || 0,
        };
        await window.authApi.saveState(state);
        btn.textContent = "Saved!";
        btn.style.background = "linear-gradient(135deg,#059669,#10b981)";
        loadProgressData(root);
      } catch (err) {
        btn.textContent = "Error. Try again.";
        btn.disabled = false;
      }
    });

    // save notes
    root.querySelector("#pgNotesBtn").addEventListener("click", async () => {
      const btn = root.querySelector("#pgNotesBtn");
      btn.textContent = "Saving...";
      btn.disabled = true;
      try {
        const state = await window.authApi.loadState();
        state.progress = state.progress || {};
        state.progress.notes = root.querySelector("#pgNotes").value;
        await window.authApi.saveState(state);
        btn.textContent = "Saved!";
        btn.style.background = "linear-gradient(135deg,#059669,#10b981)";
      } catch (err) {
        btn.textContent = "Error. Try again.";
        btn.disabled = false;
      }
    });

    // delete entry
    root.addEventListener("click", async (e) => {
      const btn = e.target.closest(".pg-del");
      if (!btn) return;
      const idx = parseInt(btn.dataset.delIdx);
      try {
        const state = await window.authApi.loadState();
        state.progress = state.progress || {};
        state.progress.entries = state.progress.entries || [];
        state.progress.entries.splice(idx, 1);
        await window.authApi.saveState(state);
        loadProgressData(root);
      } catch (err) {
        alert("Could not delete entry.");
      }
    });
  }

  window.LuxPagesProgress = { renderProgressPage };
})();