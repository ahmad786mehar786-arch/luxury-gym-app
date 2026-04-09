(() => {
  "use strict";

  function escapeHtml(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function card(title, value, note) {
    return `
      <div class="card dashboardCard">
        <div class="dashboardCard__label">${escapeHtml(title)}</div>
        <div class="dashboardCard__value">${escapeHtml(value)}</div>
        <div class="dashboardCard__note">${escapeHtml(note)}</div>
      </div>
    `;
  }

  function actionButton(label, page) {
    return `
      <button class="btn dashboardActionBtn" type="button" data-nav-page="${escapeHtml(page)}">
        ${escapeHtml(label)}
      </button>
    `;
  }

  function attachDashboardActions(root) {
    root.querySelectorAll("[data-nav-page]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const page = btn.dataset.navPage;
        const navBtn = document.querySelector(`.navBtn[data-page="${page}"]`);
        if (navBtn) navBtn.click();
      });
    });
  }

  function renderDashboardSkeleton(root) {
    root.innerHTML = `
      <style>
        @keyframes shimmer {
          0% { background-position: -600px 0; }
          100% { background-position: 600px 0; }
        }
        .skeleton {
          background: linear-gradient(90deg, var(--line) 25%, var(--card-2) 50%, var(--line) 75%);
          background-size: 600px 100%;
          animation: shimmer 1.4s infinite;
          border-radius: 12px;
        }
      </style>
      <div class="dashboardShell">
        <div class="card" style="padding:22px">
          <div class="skeleton" style="height:18px;width:180px;margin-bottom:14px"></div>
          <div class="skeleton" style="height:28px;width:280px;margin-bottom:10px"></div>
          <div class="skeleton" style="height:14px;width:420px"></div>
        </div>
        <div class="dashboardGrid" style="display:grid;grid-template-columns:repeat(4,1fr);gap:18px">
          ${[1,2,3,4].map(() => `
            <div class="card" style="padding:22px">
              <div class="skeleton" style="height:12px;width:80px;margin-bottom:12px"></div>
              <div class="skeleton" style="height:32px;width:100px;margin-bottom:10px"></div>
              <div class="skeleton" style="height:12px;width:120px"></div>
            </div>
          `).join("")}
        </div>
      </div>
    `;
  }

  async function renderDashboardPage() {
    const root = document.getElementById("dashboardMount");
    if (!root) return;

    renderDashboardSkeleton(root);

    let profile = {};

    try {
      const dashboard = await window.authApi.loadDashboard();
      profile = dashboard.profile || {};
    } catch (error) {
      console.error("Dashboard load error:", error);
      root.innerHTML = `
        <div class="card" style="padding:24px;text-align:center;color:var(--muted)">
          Could not load dashboard data. Check your connection and try again.
          <br><br>
          <button class="btn" onclick="window.LuxDashboardPage.renderDashboardPage()">Retry</button>
        </div>
      `;
      return;
    }

    const name = profile.name || window.authApi?.getUser?.()?.name || "User";

    root.innerHTML = `
      <style>
        .dashboardShell { display:grid; gap:18px; }
        .dashboardIntro {
          display:flex; align-items:flex-start; justify-content:space-between;
          gap:16px; flex-wrap:wrap; padding:22px; border-radius:24px;
          background:var(--card); border:1px solid var(--line); box-shadow:var(--shadow);
        }
        .dashboardIntro__eyebrow {
          font-size:12px; font-weight:800; letter-spacing:.12em;
          text-transform:uppercase; color:var(--muted); margin-bottom:8px;
        }
        .dashboardIntro__title { font-size:28px; font-weight:900; line-height:1.15; margin:0; }
        .dashboardIntro__sub { margin-top:8px; color:var(--muted); line-height:1.6; max-width:720px; }
        .dashboardStatus {
          display:inline-flex; align-items:center; gap:8px; padding:10px 14px;
          border-radius:999px; font-weight:800; background:var(--card-2);
          border:1px solid var(--line); white-space:nowrap;
        }
        .dashboardGrid { display:grid; grid-template-columns:repeat(4, minmax(0, 1fr)); gap:18px; }
        .dashboardCard { padding:22px; border-radius:22px; }
        .dashboardCard__label {
          font-size:13px; font-weight:800; color:var(--muted); margin-bottom:10px;
          text-transform:uppercase; letter-spacing:.08em;
        }
        .dashboardCard__value { font-size:30px; font-weight:900; line-height:1.1; }
        .dashboardCard__note { margin-top:8px; color:var(--muted); line-height:1.5; font-size:14px; }
        .dashboardSplit { display:grid; grid-template-columns:1.3fr .9fr; gap:18px; }
        .dashboardBlock__title { margin:0 0 14px; font-size:18px; font-weight:900; }
        .dashboardMiniList { display:grid; gap:12px; }
        .dashboardMiniItem {
          display:flex; align-items:center; justify-content:space-between;
          gap:12px; padding:14px; border-radius:16px;
          background:var(--card-2); border:1px solid var(--line);
        }
        .dashboardMiniItem__label { font-weight:800; }
        .dashboardMiniItem__value { color:var(--muted); font-weight:700; text-align:right; }
        .dashboardActionGrid { display:grid; gap:12px; }
        .dashboardActionBtn { width:100%; justify-content:center; }
        @media (max-width: 1100px) {
          .dashboardGrid { grid-template-columns:repeat(2, minmax(0, 1fr)); }
          .dashboardSplit { grid-template-columns:1fr; }
        }
        @media (max-width: 700px) {
          .dashboardGrid { grid-template-columns:1fr; }
          .dashboardIntro__title { font-size:24px; }
        }
      </style>

      <div class="dashboardShell">
        <div class="dashboardIntro">
          <div>
            <div class="dashboardIntro__eyebrow">Dashboard Overview</div>
            <h3 class="dashboardIntro__title">Welcome back, ${escapeHtml(name)}</h3>
            <div class="dashboardIntro__sub">
              Your real stats from MongoDB. Go to Settings to update your profile.
            </div>
          </div>
          <div class="dashboardStatus">Live Data</div>
        </div>

        <div class="dashboardGrid">
          ${card("Fitness Goal",     profile.goal          || "Not set", "Your main training goal")}
          ${card("Current Weight",   profile.currentWeight || "Not set", "Latest saved body weight")}
          ${card("Target Weight",    profile.targetWeight  || "Not set", "Your target body goal")}
          ${card("Activity Level",   profile.activityLevel || "Not set", "Current training level")}
        </div>

        <div class="dashboardSplit">
          <div class="card">
            <h3 class="dashboardBlock__title">Today Overview</h3>
            <div class="dashboardMiniList">
              <div class="dashboardMiniItem">
                <div class="dashboardMiniItem__label">Water Target</div>
                <div class="dashboardMiniItem__value">${escapeHtml(profile.waterTarget)}</div>
              </div>
              <div class="dashboardMiniItem">
                <div class="dashboardMiniItem__label">Protein Target</div>
                <div class="dashboardMiniItem__value">${escapeHtml(profile.proteinTarget)}</div>
              </div>
              <div class="dashboardMiniItem">
                <div class="dashboardMiniItem__label">Calories Target</div>
                <div class="dashboardMiniItem__value">${escapeHtml(profile.calorieTarget)}</div>
              </div>
              <div class="dashboardMiniItem">
                <div class="dashboardMiniItem__label">Workout Status</div>
                <div class="dashboardMiniItem__value">${escapeHtml(profile.todayWorkout)}</div>
              </div>
            </div>
          </div>

          <div class="card">
            <h3 class="dashboardBlock__title">Quick Actions</h3>
            <div class="dashboardActionGrid">
              ${actionButton("Open Workouts",  "workouts")}
              ${actionButton("Open Nutrition", "nutrition")}
              ${actionButton("Open Progress",  "progress")}
              ${actionButton("Open Settings",  "settings")}
            </div>
          </div>
        </div>
      </div>
    `;

    attachDashboardActions(root);
  }

  window.LuxDashboardPage = { renderDashboardPage };
})();