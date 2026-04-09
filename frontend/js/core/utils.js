/* =========================================================
   frontend/js/core/utils.js
   Luxury Gym - shared helper functions
   Safe first split from old app.js
   ========================================================= */

(() => {
  "use strict";

  const LuxUtils = {
    $,
    $$,
    clamp,
    sleep,
    nowISO,
    todayKey,
    weekKey,
    escapeHtml,
    debounce,
    seededIndex,
    formatNumber,
    isObject,
    deepClone
  };

  function $(selector, root = document) {
    return root.querySelector(selector);
  }

  function $$(selector, root = document) {
    return Array.from(root.querySelectorAll(selector));
  }

  function clamp(value, min, max) {
    const num = Number(value);
    if (Number.isNaN(num)) return min;
    return Math.max(min, Math.min(max, num));
  }

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  function nowISO() {
    return new Date().toISOString();
  }

  function todayKey() {
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  }

  function weekKey() {
    const d = new Date();
    const utcDate = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    const dayNum = utcDate.getUTCDay() || 7;

    utcDate.setUTCDate(utcDate.getUTCDate() + 4 - dayNum);

    const yearStart = new Date(Date.UTC(utcDate.getUTCFullYear(), 0, 1));
    const weekNo = Math.ceil((((utcDate - yearStart) / 86400000) + 1) / 7);

    return `${utcDate.getUTCFullYear()}-W${String(weekNo).padStart(2, "0")}`;
  }

  function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>"']/g, (char) => {
      const map = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
      };
      return map[char] || char;
    });
  }

  function debounce(fn, wait = 200) {
    let timer = null;

    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn(...args);
      }, wait);
    };
  }

  function seededIndex(seedString, length) {
    const size = Math.max(1, Number(length) || 1);

    let hash = 2166136261;

    for (let i = 0; i < seedString.length; i += 1) {
      hash ^= seedString.charCodeAt(i);
      hash = Math.imul(hash, 16777619);
    }

    return Math.abs(hash) % size;
  }

  function formatNumber(value, fallback = "0") {
    const num = Number(value);
    if (Number.isNaN(num)) return fallback;
    return num.toLocaleString();
  }

  function isObject(value) {
    return value !== null && typeof value === "object" && !Array.isArray(value);
  }

  function deepClone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  window.LuxUtils = LuxUtils;
})();