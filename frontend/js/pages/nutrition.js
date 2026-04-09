(() => {
  "use strict";

  function renderNutritionPage() {
    const root = document.getElementById("page-nutrition");
    if (!root) return;

    root.innerHTML = `
      <style>
        .nut-shell { display: grid; gap: 20px; }

        .nut-hero {
          padding: 24px;
          border-radius: 24px;
          background: linear-gradient(135deg, rgba(16,185,129,.9), rgba(124,58,237,.8));
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
          box-shadow: var(--shadow-2);
        }
        .nut-hero__title { font-size: 26px; font-weight: 900; margin: 0 0 6px; }
        .nut-hero__sub { opacity: .88; font-size: 14px; line-height: 1.5; }
        .nut-hero__badge {
          background: rgba(255,255,255,.2);
          border: 1px solid rgba(255,255,255,.3);
          border-radius: 999px;
          padding: 10px 18px;
          font-weight: 800;
          font-size: 14px;
          white-space: nowrap;
        }

        .nut-tabs {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
        }
        .nut-tab {
          border: 1px solid var(--line);
          background: var(--card);
          border-radius: 16px;
          padding: 14px;
          font-weight: 800;
          font-size: 14px;
          cursor: pointer;
          transition: .2s ease;
          color: var(--text);
          text-align: center;
        }
        .nut-tab:hover { transform: translateY(-2px); box-shadow: var(--shadow); }
        .nut-tab.active {
          background: linear-gradient(135deg, rgba(124,58,237,.12), rgba(16,185,129,.1));
          border-color: var(--primary);
          color: var(--primary);
        }

        .nut-panel { display: none; }
        .nut-panel.active { display: block; }

        .nut-card {
          background: var(--card);
          border: 1px solid var(--line);
          border-radius: 24px;
          padding: 24px;
          box-shadow: var(--shadow);
        }
        .nut-card__title {
          font-size: 18px;
          font-weight: 900;
          margin: 0 0 18px;
        }

        .nut-form {
          display: grid;
          gap: 14px;
        }
        .nut-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }
        .nut-field {
          display: grid;
          gap: 6px;
        }
        .nut-label {
          font-size: 13px;
          font-weight: 700;
          color: var(--muted);
        }
        .nut-input {
          width: 100%;
          border: 1px solid var(--line);
          background: var(--card-2);
          color: var(--text);
          border-radius: 12px;
          padding: 12px 14px;
          font-size: 15px;
          outline: none;
          transition: .2s ease;
          font-family: inherit;
        }
        .nut-input:focus {
          border-color: var(--primary2);
          box-shadow: 0 0 0 3px rgba(167,139,250,.14);
        }
        .nut-select {
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

        .nut-btn {
          border: none;
          border-radius: 14px;
          padding: 14px;
          font-weight: 800;
          font-size: 15px;
          color: #fff;
          background: linear-gradient(135deg, var(--primary), var(--green));
          box-shadow: 0 8px 20px rgba(124,58,237,.2);
          cursor: pointer;
          transition: .2s ease;
          width: 100%;
        }
        .nut-btn:hover { transform: translateY(-1px); }

        .nut-result {
          margin-top: 18px;
          padding: 20px;
          border-radius: 18px;
          background: var(--card-2);
          border: 1px solid var(--line);
          display: none;
        }
        .nut-result.show { display: block; }
        .nut-result__title {
          font-size: 13px;
          font-weight: 700;
          color: var(--muted);
          text-transform: uppercase;
          letter-spacing: .08em;
          margin-bottom: 14px;
        }

        .nut-bmi-display {
          display: flex;
          align-items: center;
          gap: 20px;
          flex-wrap: wrap;
        }
        .nut-bmi-circle {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          display: grid;
          place-items: center;
          flex-shrink: 0;
          border: 4px solid;
        }
        .nut-bmi-number {
          font-size: 28px;
          font-weight: 900;
          line-height: 1;
        }
        .nut-bmi-unit { font-size: 12px; color: var(--muted); margin-top: 2px; }

        .nut-bmi-scale {
          flex: 1;
          min-width: 200px;
        }
        .nut-bmi-label {
          font-size: 20px;
          font-weight: 900;
          margin-bottom: 8px;
        }
        .nut-bmi-desc {
          font-size: 14px;
          color: var(--muted);
          line-height: 1.55;
        }

        .nut-scale-bar {
          margin-top: 14px;
          height: 8px;
          border-radius: 999px;
          background: linear-gradient(90deg, #3b82f6 0%, #10b981 25%, #f59e0b 55%, #ef4444 80%, #dc2626 100%);
          position: relative;
        }
        .nut-scale-marker {
          position: absolute;
          top: -4px;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #fff;
          border: 3px solid var(--text);
          transform: translateX(-50%);
          transition: left .5s ease;
        }
        .nut-scale-labels {
          display: flex;
          justify-content: space-between;
          margin-top: 6px;
          font-size: 11px;
          color: var(--muted);
        }

        .nut-macros {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
          margin-top: 4px;
        }
        .nut-macro {
          padding: 14px;
          border-radius: 16px;
          background: var(--card);
          border: 1px solid var(--line);
          text-align: center;
        }
        .nut-macro__val {
          font-size: 22px;
          font-weight: 900;
          line-height: 1.1;
        }
        .nut-macro__label {
          font-size: 12px;
          color: var(--muted);
          margin-top: 4px;
          font-weight: 700;
        }

        .nut-meal-form {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 10px;
          margin-bottom: 16px;
        }
        .nut-meal-input {
          width: 100%;
          border: 1px solid var(--line);
          background: var(--card-2);
          color: var(--text);
          border-radius: 12px;
          padding: 12px 14px;
          font-size: 14px;
          outline: none;
          transition: .2s ease;
          font-family: inherit;
        }
        .nut-meal-input:focus {
          border-color: var(--primary2);
          box-shadow: 0 0 0 3px rgba(167,139,250,.14);
        }

        .nut-meal-list { display: grid; gap: 10px; }
        .nut-meal-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding: 14px 16px;
          border-radius: 16px;
          background: var(--card-2);
          border: 1px solid var(--line);
          flex-wrap: wrap;
        }
        .nut-meal-item__name { font-weight: 800; font-size: 15px; }
        .nut-meal-item__macros { font-size: 13px; color: var(--muted); margin-top: 2px; }
        .nut-meal-item__cal {
          font-size: 18px;
          font-weight: 900;
          color: var(--primary);
          white-space: nowrap;
        }
        .nut-meal-del {
          border: none;
          background: #fff1f2;
          color: #be123c;
          border-radius: 10px;
          padding: 8px 12px;
          font-size: 13px;
          font-weight: 800;
          cursor: pointer;
          transition: .2s;
          flex-shrink: 0;
        }
        .nut-meal-del:hover { background: #fecdd3; }

        .nut-totals {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
          padding: 16px;
          background: var(--card-2);
          border-radius: 16px;
          border: 1px solid var(--line);
          margin-bottom: 16px;
        }
        .nut-total { text-align: center; }
        .nut-total__val { font-size: 22px; font-weight: 900; }
        .nut-total__label { font-size: 12px; color: var(--muted); font-weight: 700; margin-top: 3px; }

        .nut-empty {
          text-align: center;
          padding: 30px;
          color: var(--muted);
          font-size: 14px;
        }

        @media (max-width: 700px) {
          .nut-tabs { grid-template-columns: 1fr; }
          .nut-row { grid-template-columns: 1fr; }
          .nut-macros { grid-template-columns: 1fr 1fr; }
          .nut-meal-form { grid-template-columns: 1fr 1fr; }
          .nut-totals { grid-template-columns: 1fr 1fr; }
        }
      </style>

      <div class="nut-shell">

        <div class="nut-hero">
          <div>
            <h2 class="nut-hero__title">Nutrition Center</h2>
            <p class="nut-hero__sub">BMI calculator, calorie planner, and daily meal tracker all in one place.</p>
          </div>
          <div class="nut-hero__badge">3 Tools</div>
        </div>

        <div class="nut-tabs">
          <button class="nut-tab active" data-tab="bmi">BMI Calculator</button>
          <button class="nut-tab" data-tab="calories">Calorie Calculator</button>
          <button class="nut-tab" data-tab="meals">Meal Tracker</button>
        </div>

        <!-- BMI PANEL -->
        <div class="nut-panel active" id="nut-panel-bmi">
          <div class="nut-card">
            <div class="nut-card__title">BMI Calculator</div>
            <div class="nut-form">
              <div class="nut-row">
                <div class="nut-field">
                  <div class="nut-label">Height (cm)</div>
                  <input class="nut-input" id="bmiHeight" type="number" placeholder="e.g. 175" min="100" max="250" />
                </div>
                <div class="nut-field">
                  <div class="nut-label">Weight (kg)</div>
                  <input class="nut-input" id="bmiWeight" type="number" placeholder="e.g. 70" min="30" max="300" />
                </div>
              </div>
              <button class="nut-btn" id="bmiCalcBtn">Calculate BMI</button>
            </div>

            <div class="nut-result" id="bmiResult">
              <div class="nut-result__title">Your Result</div>
              <div class="nut-bmi-display">
                <div class="nut-bmi-circle" id="bmiCircle">
                  <div>
                    <div class="nut-bmi-number" id="bmiNumber">--</div>
                    <div class="nut-bmi-unit">BMI</div>
                  </div>
                </div>
                <div class="nut-bmi-scale">
                  <div class="nut-bmi-label" id="bmiLabel">--</div>
                  <div class="nut-bmi-desc" id="bmiDesc">--</div>
                  <div class="nut-scale-bar">
                    <div class="nut-scale-marker" id="bmiMarker" style="left:0%"></div>
                  </div>
                  <div class="nut-scale-labels">
                    <span>Underweight</span>
                    <span>Normal</span>
                    <span>Overweight</span>
                    <span>Obese</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- CALORIE PANEL -->
        <div class="nut-panel" id="nut-panel-calories">
          <div class="nut-card">
            <div class="nut-card__title">Calorie & Macro Calculator</div>
            <div class="nut-form">
              <div class="nut-row">
                <div class="nut-field">
                  <div class="nut-label">Age</div>
                  <input class="nut-input" id="calAge" type="number" placeholder="e.g. 25" min="10" max="100" />
                </div>
                <div class="nut-field">
                  <div class="nut-label">Gender</div>
                  <select class="nut-select" id="calGender">
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
              </div>
              <div class="nut-row">
                <div class="nut-field">
                  <div class="nut-label">Height (cm)</div>
                  <input class="nut-input" id="calHeight" type="number" placeholder="e.g. 175" />
                </div>
                <div class="nut-field">
                  <div class="nut-label">Weight (kg)</div>
                  <input class="nut-input" id="calWeight" type="number" placeholder="e.g. 70" />
                </div>
              </div>
              <div class="nut-field">
                <div class="nut-label">Activity Level</div>
                <select class="nut-select" id="calActivity">
                  <option value="1.2">Sedentary (desk job, no exercise)</option>
                  <option value="1.375">Lightly Active (1-3 days/week)</option>
                  <option value="1.55" selected>Moderately Active (3-5 days/week)</option>
                  <option value="1.725">Very Active (6-7 days/week)</option>
                  <option value="1.9">Extremely Active (athlete, 2x/day)</option>
                </select>
              </div>
              <div class="nut-field">
                <div class="nut-label">Goal</div>
                <select class="nut-select" id="calGoal">
                  <option value="cut">Lose Weight (Cut)</option>
                  <option value="maintain" selected>Maintain Weight</option>
                  <option value="bulk">Gain Muscle (Bulk)</option>
                </select>
              </div>
              <button class="nut-btn" id="calCalcBtn">Calculate Calories & Macros</button>
            </div>

            <div class="nut-result" id="calResult">
              <div class="nut-result__title">Daily Targets</div>
              <div class="nut-macros">
                <div class="nut-macro">
                  <div class="nut-macro__val" id="calCalories" style="color:var(--primary)">--</div>
                  <div class="nut-macro__label">Calories</div>
                </div>
                <div class="nut-macro">
                  <div class="nut-macro__val" id="calProtein" style="color:#0891b2">--g</div>
                  <div class="nut-macro__label">Protein</div>
                </div>
                <div class="nut-macro">
                  <div class="nut-macro__val" id="calCarbs" style="color:#059669">--g</div>
                  <div class="nut-macro__label">Carbs</div>
                </div>
                <div class="nut-macro">
                  <div class="nut-macro__val" id="calFat" style="color:#d97706">--g</div>
                  <div class="nut-macro__label">Fat</div>
                </div>
              </div>
              <div style="margin-top:14px;padding:14px;border-radius:14px;background:var(--card);border:1px solid var(--line)">
                <div style="font-size:13px;color:var(--muted);line-height:1.6" id="calTip">--</div>
              </div>
            </div>
          </div>
        </div>

        <!-- MEALS PANEL -->
        <div class="nut-panel" id="nut-panel-meals">
          <div class="nut-card">
            <div class="nut-card__title">Today's Meals</div>

            <div id="nutTotals" class="nut-totals">
              <div class="nut-total">
                <div class="nut-total__val" id="totalCal" style="color:var(--primary)">0</div>
                <div class="nut-total__label">Calories</div>
              </div>
              <div class="nut-total">
                <div class="nut-total__val" id="totalPro" style="color:#0891b2">0g</div>
                <div class="nut-total__label">Protein</div>
              </div>
              <div class="nut-total">
                <div class="nut-total__val" id="totalCarb" style="color:#059669">0g</div>
                <div class="nut-total__label">Carbs</div>
              </div>
              <div class="nut-total">
                <div class="nut-total__val" id="totalFat" style="color:#d97706">0g</div>
                <div class="nut-total__label">Fat</div>
              </div>
            </div>

            <div class="nut-meal-form">
              <input class="nut-meal-input" id="mealName" placeholder="Meal name" />
              <input class="nut-meal-input" id="mealCal" type="number" placeholder="Calories" />
              <input class="nut-meal-input" id="mealPro" type="number" placeholder="Protein (g)" />
              <input class="nut-meal-input" id="mealCarb" type="number" placeholder="Carbs (g)" />
              <input class="nut-meal-input" id="mealFat" type="number" placeholder="Fat (g)" />
              <button class="nut-btn" id="mealAddBtn" style="grid-column:1/-1">Add Meal</button>
            </div>

            <div class="nut-meal-list" id="mealList">
              <div class="nut-empty">No meals added today. Add your first meal above.</div>
            </div>
          </div>
        </div>

      </div>
    `;

    bindNutritionEvents(root);
    loadMeals(root);
  }

  function bindNutritionEvents(root) {

    // tabs
    root.querySelectorAll(".nut-tab").forEach(tab => {
      tab.addEventListener("click", () => {
        root.querySelectorAll(".nut-tab").forEach(t => t.classList.remove("active"));
        root.querySelectorAll(".nut-panel").forEach(p => p.classList.remove("active"));
        tab.classList.add("active");
        root.querySelector(`#nut-panel-${tab.dataset.tab}`).classList.add("active");
      });
    });

    // BMI calc
    root.querySelector("#bmiCalcBtn").addEventListener("click", () => {
      const h = parseFloat(root.querySelector("#bmiHeight").value);
      const w = parseFloat(root.querySelector("#bmiWeight").value);
      if (!h || !w || h < 100 || w < 30) {
        alert("Please enter a valid height and weight.");
        return;
      }
      const bmi = w / ((h / 100) ** 2);
      const bmiRounded = Math.round(bmi * 10) / 10;

      let label, desc, color, markerPos;
      if (bmi < 18.5) {
        label = "Underweight"; desc = "You are below the healthy weight range. Consider increasing calorie intake with nutrient-dense foods."; color = "#3b82f6"; markerPos = (bmi / 18.5) * 20;
      } else if (bmi < 25) {
        label = "Normal Weight"; desc = "Great! You are in the healthy weight range. Keep maintaining your current diet and exercise habits."; color = "#10b981"; markerPos = 20 + ((bmi - 18.5) / 6.5) * 30;
      } else if (bmi < 30) {
        label = "Overweight"; desc = "You are slightly above the healthy range. A balanced diet and regular exercise can help you reach a healthy weight."; color = "#f59e0b"; markerPos = 50 + ((bmi - 25) / 5) * 25;
      } else {
        label = "Obese"; desc = "You are above the healthy range. Consult a healthcare professional for a personalised plan to reach a healthy weight."; color = "#ef4444"; markerPos = Math.min(75 + ((bmi - 30) / 10) * 25, 95);
      }

      const resultEl = root.querySelector("#bmiResult");
      resultEl.classList.add("show");
      root.querySelector("#bmiNumber").textContent = bmiRounded;
      root.querySelector("#bmiLabel").textContent = label;
      root.querySelector("#bmiLabel").style.color = color;
      root.querySelector("#bmiDesc").textContent = desc;
      root.querySelector("#bmiCircle").style.borderColor = color;
      root.querySelector("#bmiMarker").style.left = markerPos + "%";
    });

    // Calorie calc
    root.querySelector("#calCalcBtn").addEventListener("click", () => {
      const age = parseFloat(root.querySelector("#calAge").value);
      const gender = root.querySelector("#calGender").value;
      const height = parseFloat(root.querySelector("#calHeight").value);
      const weight = parseFloat(root.querySelector("#calWeight").value);
      const activity = parseFloat(root.querySelector("#calActivity").value);
      const goal = root.querySelector("#calGoal").value;

      if (!age || !height || !weight) {
        alert("Please fill in all fields.");
        return;
      }

      // Mifflin-St Jeor formula
      let bmr;
      if (gender === "male") {
        bmr = 10 * weight + 6.25 * height - 5 * age + 5;
      } else {
        bmr = 10 * weight + 6.25 * height - 5 * age - 161;
      }

      let tdee = Math.round(bmr * activity);
      let goalCalories = tdee;
      let tip = "";

      if (goal === "cut") {
        goalCalories = tdee - 500;
        tip = `To lose ~0.5kg per week, eat ${goalCalories} calories/day. Focus on high protein foods to preserve muscle while cutting.`;
      } else if (goal === "bulk") {
        goalCalories = tdee + 300;
        tip = `To gain lean muscle, eat ${goalCalories} calories/day. Prioritise protein and complex carbs around your workouts.`;
      } else {
        tip = `To maintain your current weight, eat ${goalCalories} calories/day. Keep a balanced mix of protein, carbs, and healthy fats.`;
      }

      const protein = Math.round(weight * 2.2);
      const fat = Math.round((goalCalories * 0.25) / 9);
      const carbs = Math.round((goalCalories - protein * 4 - fat * 9) / 4);

      const resultEl = root.querySelector("#calResult");
      resultEl.classList.add("show");
      root.querySelector("#calCalories").textContent = goalCalories;
      root.querySelector("#calProtein").textContent = protein + "g";
      root.querySelector("#calCarbs").textContent = carbs + "g";
      root.querySelector("#calFat").textContent = fat + "g";
      root.querySelector("#calTip").textContent = tip;
    });

    // Add meal
    root.querySelector("#mealAddBtn").addEventListener("click", async () => {
      const name = root.querySelector("#mealName").value.trim();
      const cal = parseInt(root.querySelector("#mealCal").value) || 0;
      const pro = parseInt(root.querySelector("#mealPro").value) || 0;
      const carb = parseInt(root.querySelector("#mealCarb").value) || 0;
      const fat = parseInt(root.querySelector("#mealFat").value) || 0;

      if (!name || !cal) {
        alert("Please enter at least a meal name and calories.");
        return;
      }

      try {
        const state = await window.authApi.loadState();
        const today = new Date().toISOString().split("T")[0];
        state.mealsByDay = state.mealsByDay || {};
        state.mealsByDay[today] = state.mealsByDay[today] || [];
        state.mealsByDay[today].push({ name, cal, pro, carb, fat });
        await window.authApi.saveState(state);

        root.querySelector("#mealName").value = "";
        root.querySelector("#mealCal").value = "";
        root.querySelector("#mealPro").value = "";
        root.querySelector("#mealCarb").value = "";
        root.querySelector("#mealFat").value = "";

        loadMeals(root);
      } catch (err) {
        alert("Could not save meal. Check your connection.");
      }
    });

    // Delete meal
    root.addEventListener("click", async (e) => {
      const btn = e.target.closest(".nut-meal-del");
      if (!btn) return;
      const idx = parseInt(btn.dataset.idx);
      try {
        const state = await window.authApi.loadState();
        const today = new Date().toISOString().split("T")[0];
        state.mealsByDay = state.mealsByDay || {};
        state.mealsByDay[today] = state.mealsByDay[today] || [];
        state.mealsByDay[today].splice(idx, 1);
        await window.authApi.saveState(state);
        loadMeals(root);
      } catch (err) {
        alert("Could not delete meal.");
      }
    });
  }

  async function loadMeals(root) {
    try {
      const state = await window.authApi.loadState();
      const today = new Date().toISOString().split("T")[0];
      const meals = state.mealsByDay?.[today] || [];

      const totalCal  = meals.reduce((s, m) => s + (m.cal  || 0), 0);
      const totalPro  = meals.reduce((s, m) => s + (m.pro  || 0), 0);
      const totalCarb = meals.reduce((s, m) => s + (m.carb || 0), 0);
      const totalFat  = meals.reduce((s, m) => s + (m.fat  || 0), 0);

      const totalCalEl = root.querySelector("#totalCal");
      if (totalCalEl) {
        root.querySelector("#totalCal").textContent = totalCal;
        root.querySelector("#totalPro").textContent = totalPro + "g";
        root.querySelector("#totalCarb").textContent = totalCarb + "g";
        root.querySelector("#totalFat").textContent = totalFat + "g";
      }

      const listEl = root.querySelector("#mealList");
      if (!listEl) return;

      if (meals.length === 0) {
        listEl.innerHTML = `<div class="nut-empty">No meals added today. Add your first meal above.</div>`;
        return;
      }

      listEl.innerHTML = meals.map((m, i) => `
        <div class="nut-meal-item">
          <div>
            <div class="nut-meal-item__name">${m.name}</div>
            <div class="nut-meal-item__macros">P: ${m.pro || 0}g &bull; C: ${m.carb || 0}g &bull; F: ${m.fat || 0}g</div>
          </div>
          <div class="nut-meal-item__cal">${m.cal} kcal</div>
          <button class="nut-meal-del" data-idx="${i}">Remove</button>
        </div>
      `).join("");
    } catch (err) {
      console.error("Could not load meals:", err);
    }
  }

  window.LuxPagesNutrition = { renderNutritionPage };
})();