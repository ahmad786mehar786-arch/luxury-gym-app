(() => {
  "use strict";

  const API_BASE = "http://127.0.0.1:5050/api";

  function getStateSafe() {
    if (window.LuxState?.getAppState) return window.LuxState.getAppState();
    if (window.getState) return window.getState();
    return {
      profile: { name: "Ahmad", goal: "strength" },
      chat: []
    };
  }

  function setStateSafe(next) {
    if (window.LuxState?.setAppState) return window.LuxState.setAppState(next);
    if (window.setState) return window.setState(next);
  }

  async function askAI(message, profile) {
    const token = typeof window.getToken === "function" ? window.getToken() : "";
    const headers = { "Content-Type": "application/json" };
    if (token) headers.Authorization = `Bearer ${token}`;

    const res = await fetch(`${API_BASE}/ai`, {
      method: "POST",
      headers,
      body: JSON.stringify({ message, profile })
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data?.error || "AI request failed");
    return data?.reply || "No reply from AI.";
  }

  function renderMessage(item) {
    const who = item.role === "user" ? "You" : "AI Coach";
    const cls = item.role === "user" ? "msg msg--user" : "msg";
    return `
      <div class="${cls}">
        <div>${String(item.text || "").replace(/\n/g, "<br>")}</div>
        <div class="msg__meta">${who}</div>
      </div>
    `;
  }

  function renderAIPage() {
    const root = document.getElementById("page-ai");
    if (!root) return;

    const state = getStateSafe();
    const chat = Array.isArray(state.chat) ? state.chat : [];

    root.innerHTML = `
      <div class="card">
        <div class="card__head">
          <div>
            <div class="card__title">AI Coach</div>
            <div class="muted">Ask about workouts, fat loss, sleep, and nutrition.</div>
          </div>
        </div>

        <div class="aiChips">
          <button class="aiChip" type="button" data-ai-fill="Build me a chest workout">Chest</button>
          <button class="aiChip" type="button" data-ai-fill="Build me a back workout">Back</button>
          <button class="aiChip" type="button" data-ai-fill="How can I lose fat?">Fat Loss</button>
          <button class="aiChip" type="button" data-ai-fill="Give me a home workout">Home</button>
          <button class="aiChip" type="button" data-ai-fill="How can I improve sleep?">Sleep</button>
        </div>

        <div id="aiChatBox" class="chat">
          ${chat.length ? chat.map(renderMessage).join("") : `<div class="muted">No messages yet.</div>`}
        </div>

        <form id="aiForm" class="chatForm">
          <input id="aiInput" class="input" type="text" placeholder="Ask AI coach..." required />
          <button class="btn btn--gold" type="submit">Send</button>
        </form>
      </div>
    `;

    const box = document.getElementById("aiChatBox");
    if (box) box.scrollTop = box.scrollHeight;
  }

  function bindAIPage() {
    const root = document.getElementById("page-ai");
    if (!root) return;

    root.addEventListener("click", (event) => {
      const chip = event.target.closest("[data-ai-fill]");
      if (!chip) return;

      const input = document.getElementById("aiInput");
      if (input) input.value = chip.dataset.aiFill || "";
    });

    root.addEventListener("submit", async (event) => {
      const form = event.target.closest("#aiForm");
      if (!form) return;

      event.preventDefault();

      const input = document.getElementById("aiInput");
      const message = String(input?.value || "").trim();
      if (!message) return;

      const state = getStateSafe();
      state.chat = Array.isArray(state.chat) ? state.chat : [];
      state.chat.push({ role: "user", text: message });
      setStateSafe(state);
      renderAIPage();

      if (input) input.value = "";

      try {
        const reply = await askAI(message, state.profile || {});
        const nextState = getStateSafe();
        nextState.chat = Array.isArray(nextState.chat) ? nextState.chat : [];
        nextState.chat.push({ role: "assistant", text: reply });
        setStateSafe(nextState);
        renderAIPage();
      } catch (error) {
        const nextState = getStateSafe();
        nextState.chat = Array.isArray(nextState.chat) ? nextState.chat : [];
        nextState.chat.push({
          role: "assistant",
          text: error?.message || "AI request failed."
        });
        setStateSafe(nextState);
        renderAIPage();
      }
    });
  }

  window.LuxPagesAI = {
    renderAIPage,
    bindAIPage
  };
})();