/* =========================================================
   frontend/js/core/state.js
   Luxury Gym - central app state wrapper
   Uses existing storage.js
   ========================================================= */

(() => {
  "use strict";

  if (!window.getState || !window.setState) {
    console.error("storage.js must load before state.js");
    return;
  }

  const { clamp } = window.LuxUtils || {};

  let state = window.getState();

  function getAppState() {
    return state;
  }

  function setAppState(nextState) {
    state = window.setState(nextState);
    return state;
  }

  function saveAppState() {
    state = window.setState(state);
    return state;
  }

  function refreshAppState() {
    state = window.getState();
    return state;
  }

  function ensureDefaults() {
    state = state || {};

    state.profile = state.profile || {
      name: "Ahmad",
      goal: "strength",
      height: 0,
      weight: 0
    };

    state.xp = Number(state.xp || 0);

    state.streak = state.streak || {
      lastDay: "",
      days: 0
    };

    state.ui = state.ui || {};
    state.ui.volume = typeof state.ui.volume === "number"
      ? (clamp ? clamp(state.ui.volume, 0, 1) : Math.max(0, Math.min(state.ui.volume, 1)))
      : 0.8;

    state.ui.muted = !!state.ui.muted;
    state.ui.sfx = typeof state.ui.sfx === "boolean" ? state.ui.sfx : true;
    state.ui.waterReminders = typeof state.ui.waterReminders === "boolean"
      ? state.ui.waterReminders
      : true;
    state.ui.focusMode = !!state.ui.focusMode;
    state.ui.hadithIndex = Number.isFinite(state.ui.hadithIndex) ? state.ui.hadithIndex : 0;
    state.ui.motivationIndex = Number.isFinite(state.ui.motivationIndex) ? state.ui.motivationIndex : 0;

    if (!Array.isArray(state.checklist) || state.checklist.length === 0) {
      state.checklist = [
        { id: "water", text: "Drink 2L water", done: false },
        { id: "warmup", text: "5 min warmup", done: false },
        { id: "protein", text: "Protein with each meal", done: false },
        { id: "walk", text: "20 min walk", done: false }
      ];
    }

    if (!Array.isArray(state.sessions)) {
      state.sessions = [];
    }

    if (!state.currentSession || typeof state.currentSession !== "object") {
      state.currentSession = null;
    }

    if (!state.mealsByDay || typeof state.mealsByDay !== "object") {
      state.mealsByDay = {};
    }

    if (!state.weeklyMinutesByWeek || typeof state.weeklyMinutesByWeek !== "object") {
      state.weeklyMinutesByWeek = {};
    }

    if (!Array.isArray(state.chat)) {
      state.chat = [];
    }

    saveAppState();
    return state;
  }

  window.addEventListener("storage:changed", () => {
    refreshAppState();
  });

  window.LuxState = {
    getAppState,
    setAppState,
    saveAppState,
    refreshAppState,
    ensureDefaults
  };
})();