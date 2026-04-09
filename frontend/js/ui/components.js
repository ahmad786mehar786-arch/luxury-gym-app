(() => {
  "use strict";

  const { escapeHtml, formatNumber } = window.LuxUtils;

  function statCard({ label, value, note = "", icon = "•" }) {
    return `
      <article class="card statCard">
        <div class="row" style="justify-content:space-between;align-items:flex-start;">
          <div>
            <div class="muted s">${escapeHtml(label)}</div>
            <div class="kpi" style="font-size:28px;font-weight:900;margin-top:6px;">
              ${escapeHtml(String(value))}
            </div>
            ${note ? `<div class="muted s" style="margin-top:6px;">${escapeHtml(note)}</div>` : ""}
          </div>
          <div class="chip">${escapeHtml(icon)}</div>
        </div>
      </article>
    `;
  }

  function pageCard(title, bodyHtml, actionsHtml = "") {
    return `
      <section class="card pageCard">
        <div class="row" style="justify-content:space-between;align-items:center;margin-bottom:14px;">
          <h3 style="margin:0;">${escapeHtml(title)}</h3>
          ${actionsHtml}
        </div>
        ${bodyHtml}
      </section>
    `;
  }

  function emptyState(title, text) {
    return `
      <div class="card">
        <h3 style="margin-top:0;">${escapeHtml(title)}</h3>
        <p class="muted" style="margin-bottom:0;">${escapeHtml(text)}</p>
      </div>
    `;
  }

  function mealItem(meal, index) {
    return `
      <div class="card mealItem" data-meal-index="${index}">
        <div class="row" style="justify-content:space-between;gap:10px;align-items:flex-start;">
          <div>
            <div style="font-weight:800;">${escapeHtml(meal.name || "Meal")}</div>
            <div class="muted s" style="margin-top:4px;">
              ${escapeHtml(String(meal.calories || 0))} kcal •
              P ${escapeHtml(String(meal.protein || 0))}g •
              C ${escapeHtml(String(meal.carbs || 0))}g •
              F ${escapeHtml(String(meal.fat || 0))}g
            </div>
          </div>
          <button class="btn btn--ghost" type="button" data-remove-meal="${index}">Remove</button>
        </div>
      </div>
    `;
  }

  function chatBubble(role, text) {
    const user = role === "user";
    return `
      <div class="msg ${user ? "msg--user" : ""}">
        <div>${escapeHtml(text)}</div>
        <div class="msg__meta">${user ? "You" : "AI Coach"}</div>
      </div>
    `;
  }

  function progressBar(value) {
    const safeValue = Math.max(0, Math.min(Number(value) || 0, 100));
    return `
      <div style="height:10px;background:rgba(255,255,255,0.08);border-radius:999px;overflow:hidden;">
        <div style="height:100%;width:${safeValue}%;background:linear-gradient(90deg,var(--y2),var(--g1));border-radius:999px;"></div>
      </div>
    `;
  }

  function number(value) {
    return formatNumber ? formatNumber(value) : String(value);
  }

  window.LuxComponents = {
    statCard,
    pageCard,
    emptyState,
    mealItem,
    chatBubble,
    progressBar,
    number
  };
})();