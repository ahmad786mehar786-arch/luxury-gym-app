(() => {
  "use strict";

  function renderAppShell() {
    const root = document.getElementById("appShell");
    if (!root) return;

    root.innerHTML = `
      <div class="overlay" id="overlay" aria-hidden="true"></div>

      <div class="app">
        <aside class="sidebar" id="sidebar">
          <div class="brand">
            <div class="brand__logo">LG</div>
            <div>
              <div class="brand__name">Luxury Gym</div>
              <div class="brand__tag">Premium fitness SaaS</div>
            </div>
          </div>

          <div class="bismillah" style="margin-bottom:8px;">
            <div class="bismillah__arabic" style="font-size:16px;">بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ</div>
            <div class="bismillah__sub">Build strength with discipline and consistency.</div>
          </div>

          <nav class="nav" id="mainNav">
            <button class="nav__item is-active" data-nav-page="dashboard" type="button">
              <span>🏠</span> Dashboard
            </button>
            <button class="nav__item" data-nav-page="workouts" type="button">
              <span>🏋️</span> Workouts
            </button>
            <button class="nav__item" data-nav-page="nutrition" type="button">
              <span>🥗</span> Nutrition
            </button>
            <button class="nav__item" data-nav-page="ai" type="button">
              <span>🤖</span> AI Coach
            </button>
            <button class="nav__item" data-nav-page="progress" type="button">
              <span>📈</span> Progress
            </button>
            <button class="nav__item" data-nav-page="settings" type="button">
              <span>⚙️</span> Settings
            </button>
          </nav>

          <div class="sidebar__foot">
            <div class="smallPill">Active Member</div>
            <div class="muted s">Logged in as</div>
            <div id="userLabel" style="font-weight:900;font-size:16px;">User</div>

            <div class="miniGrid">
              <div class="miniStat">
                <div class="muted s">Plan</div>
                <div class="k" style="font-size:16px;">Premium</div>
              </div>
              <div class="miniStat">
                <div class="muted s">Status</div>
                <div class="k" style="font-size:16px;">Online</div>
              </div>
            </div>

            <button class="btn btn--ghost" type="button" id="btnLogout">Logout</button>
          </div>
        </aside>

        <main class="main">
          <header class="topbar">
            <div class="topbar__l">
              <button class="iconBtn" type="button" id="btnMenu" title="Open menu">☰</button>

              <div class="topbar__titles">
                <div class="topbar__title" id="pageTitle">Dashboard</div>
                <div class="topbar__sub" id="pageSub">Your premium fitness control center</div>
              </div>
            </div>

            <div class="topbar__r">
              <div class="statPill">
                <div class="muted s">XP</div>
                <div class="k" id="topXp">0</div>
              </div>

              <div class="statPill">
                <div class="muted s">Streak</div>
                <div class="k" id="topStreak">0 days</div>
              </div>

              <button class="iconBtn" type="button" id="themeToggle" title="Dark mode">🌙</button>
            </div>
          </header>

          <div class="pages" id="pagesRoot">
            <section class="page is-visible" data-page="dashboard" id="page-dashboard"></section>
            <section class="page" data-page="workouts" id="page-workouts"></section>
            <section class="page" data-page="nutrition" id="page-nutrition"></section>
            <section class="page" data-page="ai" id="page-ai"></section>
            <section class="page" data-page="progress" id="page-progress"></section>
            <section class="page" data-page="settings" id="page-settings"></section>
          </div>
        </main>
      </div>
    `;
  }

  window.LuxLayout = {
    renderAppShell
  };
})();