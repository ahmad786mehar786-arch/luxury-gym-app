(() => {
  "use strict";

  // Only token and user name are stored in localStorage (small, safe session data).
  // All real app data (workouts, nutrition, progress, settings) is fetched from MongoDB via API.

  const API_BASE = "http://127.0.0.1:5050/api";

  const KEYS = {
    TOKEN: "luxgym_token",
    USER: "luxgym_user",
  };

  function getToken() {
    return localStorage.getItem(KEYS.TOKEN) || "";
  }

  function setToken(token) {
    if (!token) localStorage.removeItem(KEYS.TOKEN);
    else localStorage.setItem(KEYS.TOKEN, token);
  }

  function getUser() {
    try {
      return JSON.parse(localStorage.getItem(KEYS.USER) || "null");
    } catch {
      return null;
    }
  }

  function setUser(user) {
    if (!user) localStorage.removeItem(KEYS.USER);
    else localStorage.setItem(KEYS.USER, JSON.stringify(user));
  }

  async function apiFetch(path, options = {}) {
    const token = getToken();

    const response = await fetch(`${API_BASE}${path}`, {
      method: options.method || "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(options.headers || {}),
      },
      body: options.body || undefined,
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(data.error || "Request failed");
    }

    return data;
  }

  // ── Auth ────────────────────────────────────────────────────────────────────

  async function register({ name, email, password }) {
    const data = await apiFetch("/auth/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
    });
    setToken(data.token);
    setUser(data.user);
    return data;
  }

  async function login({ email, password }) {
    const data = await apiFetch("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    setToken(data.token);
    setUser(data.user);
    return data;
  }

  async function me() {
    const data = await apiFetch("/auth/me");
    setUser(data.user);
    return data.user;
  }

  function logout() {
    setToken("");
    setUser(null);
  }

  // ── State (MongoDB) ─────────────────────────────────────────────────────────
  // Use these instead of localStorage for all gym data.

  async function loadState() {
    const data = await apiFetch("/state");
    return data.state || {};
  }

  async function saveState(state) {
    await apiFetch("/state", {
      method: "POST",
      body: JSON.stringify({ state }),
    });
  }

  // ── Dashboard ───────────────────────────────────────────────────────────────

  async function loadDashboard() {
    const data = await apiFetch("/dashboard");
    return data.dashboard || {};
  }

  // ── Public API ──────────────────────────────────────────────────────────────

  window.authApi = {
    apiFetch,
    register,
    login,
    me,
    logout,
    getUser,
    getToken,
    loadState,
    saveState,
    loadDashboard,
  };
})();