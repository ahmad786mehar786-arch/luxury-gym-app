(() => {
  "use strict";

  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => Array.from(document.querySelectorAll(selector));

  const authGate = $("#authGate");
  const appShell = $("#appShell");
  const showLoginBtn = $("#showLoginBtn");
  const showSignupBtn = $("#showSignupBtn");
  const loginForm = $("#loginForm");
  const signupForm = $("#signupForm");
  const authMsg = $("#authMsg");
  const authMsg2 = $("#authMsg2");
  const userLabel = $("#userLabel");
  const btnLogout = $("#btnLogout");
  const sideThemeBtn = $("#themeToggle");
  const topThemeBtn = $("#themeToggleTop");

  function setMsg(el, text, isError = false) {
    if (!el) return;
    el.textContent = text;
    el.style.color = isError ? "#dc2626" : "#6b7280";
  }

  function syncThemeButtons() {
    const isDark = document.body.classList.contains("theme-dark");
    if (sideThemeBtn) sideThemeBtn.textContent = isDark ? "Theme: Dark" : "Theme: Light";
    if (topThemeBtn) topThemeBtn.textContent = isDark ? "Switch to Light" : "Switch to Dark";
  }

  function applyTheme(theme) {
    const finalTheme = theme === "dark" ? "dark" : "light";
    if (finalTheme === "dark") document.body.classList.add("theme-dark");
    else document.body.classList.remove("theme-dark");
    localStorage.setItem("luxgym_theme", finalTheme);
    syncThemeButtons();
  }

  function toggleTheme() {
    const isDark = document.body.classList.contains("theme-dark");
    applyTheme(isDark ? "light" : "dark");
  }

  function initTheme() {
    const savedTheme = localStorage.getItem("luxgym_theme") || "light";
    applyTheme(savedTheme);
  }

  function showLogin() {
    if (loginForm) loginForm.classList.remove("hidden");
    if (signupForm) signupForm.classList.add("hidden");
    if (showLoginBtn) showLoginBtn.classList.add("active");
    if (showSignupBtn) showSignupBtn.classList.remove("active");
    setMsg(authMsg, "");
    setMsg(authMsg2, "");
  }

  function showSignup() {
    if (signupForm) signupForm.classList.remove("hidden");
    if (loginForm) loginForm.classList.add("hidden");
    if (showSignupBtn) showSignupBtn.classList.add("active");
    if (showLoginBtn) showLoginBtn.classList.remove("active");
    setMsg(authMsg, "");
    setMsg(authMsg2, "");
  }

 function renderPage(targetPage) {
  if (targetPage === "dashboard" && window.LuxDashboardPage?.renderDashboardPage) {
    window.LuxDashboardPage.renderDashboardPage();
  }
  if (targetPage === "workouts" && window.LuxPagesWorkouts?.renderWorkoutsPage) {
    window.LuxPagesWorkouts.renderWorkoutsPage();
  }
  if (targetPage === "nutrition" && window.LuxPagesNutrition?.renderNutritionPage) {
    window.LuxPagesNutrition.renderNutritionPage();
  }
  if (targetPage === "progress" && window.LuxPagesProgress?.renderProgressPage) {
    window.LuxPagesProgress.renderProgressPage();
  }
  if (targetPage === "settings" && window.LuxPagesSettings?.renderSettingsPage) {
    window.LuxPagesSettings.renderSettingsPage();
  }
}

  function showApp(user) {
    if (authGate) authGate.classList.add("hidden");
    if (appShell) appShell.classList.remove("hidden");
    if (userLabel) userLabel.textContent = user?.name || "User";
    renderPage("dashboard");
  }

  function showAuth() {
    if (authGate) authGate.classList.remove("hidden");
    if (appShell) appShell.classList.add("hidden");
  }

  async function boot() {
    initTheme();
    const token = window.authApi?.getToken?.();
    if (!token) { showAuth(); return; }
    try {
      const user = await window.authApi.me();
      showApp(user);
    } catch (error) {
      window.authApi.logout();
      showAuth();
    }
  }

  if (showLoginBtn) showLoginBtn.addEventListener("click", showLogin);
  if (showSignupBtn) showSignupBtn.addEventListener("click", showSignup);
  if (sideThemeBtn) sideThemeBtn.addEventListener("click", toggleTheme);
  if (topThemeBtn) topThemeBtn.addEventListener("click", toggleTheme);

  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = $("#loginEmail")?.value.trim() || "";
      const password = $("#loginPass")?.value || "";
      setMsg(authMsg, "Logging in...");
      try {
        const result = await window.authApi.login({ email, password });
        setMsg(authMsg, "Login successful");
        showApp(result.user);
      } catch (error) {
        setMsg(authMsg, error.message || "Login failed", true);
      }
    });
  }

  if (signupForm) {
    signupForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const name = $("#signupName")?.value.trim() || "";
      const email = $("#signupEmail")?.value.trim() || "";
      const password = $("#signupPass")?.value || "";
      setMsg(authMsg2, "Creating account...");
      try {
        const result = await window.authApi.register({ name, email, password });
        setMsg(authMsg2, "Account created successfully");
        showApp(result.user);
      } catch (error) {
        setMsg(authMsg2, error.message || "Registration failed", true);
      }
    });
  }

  if (btnLogout) {
    btnLogout.addEventListener("click", () => {
      window.authApi.logout();
      showAuth();
      showLogin();
    });
  }

  $$(".navBtn").forEach((btn) => {
    btn.addEventListener("click", () => {
      $$(".navBtn").forEach((item) => item.classList.remove("active"));
      btn.classList.add("active");

      const targetPage = btn.dataset.page;
      $$(".page").forEach((page) => page.classList.remove("active"));

      const activePage = document.getElementById(`page-${targetPage}`);
      if (activePage) activePage.classList.add("active");

      const pageTitle = $("#pageTitle");
      if (pageTitle) pageTitle.textContent = btn.textContent.trim();

      renderPage(targetPage);
    });
  });

  boot();
})();