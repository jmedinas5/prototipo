// =========================================================
// MediCare360 — navegación del prototipo (5 pantallas)
// =========================================================

const TOTAL_STEPS = 5;
const screens = document.querySelectorAll(".screen");
const stepItems = document.querySelectorAll("#steps li");
const pulseFill = document.getElementById("pulseFill");

// Longitud total aproximada del trazo del pulso (ver stroke-dasharray en CSS)
const PULSE_LENGTH = 900;

function goToStep(stepNumber) {
  // Mostrar la pantalla activa
  screens.forEach((screen) => {
    screen.classList.toggle("active", screen.id === `screen-${stepNumber}`);
  });

  // Actualizar indicadores de paso (activo / completado)
  stepItems.forEach((item) => {
    const n = Number(item.dataset.step);
    item.classList.toggle("active", n === stepNumber);
    item.classList.toggle("done", n < stepNumber);
  });

  // Rellenar la línea de pulso proporcional al avance
  const progress = stepNumber / TOTAL_STEPS;
  const offset = PULSE_LENGTH - PULSE_LENGTH * progress;
  pulseFill.style.strokeDashoffset = offset;
}

// Botones "Continuar" / "Volver" con atributo data-next
document.querySelectorAll("[data-next]").forEach((btn) => {
  btn.addEventListener("click", () => {
    if (btn.disabled) return;
    goToStep(Number(btn.dataset.next));
  });
});

// =========================================================
// Pantalla 3 — Asistente de pre-triaje (chatbot)
// =========================================================
const askBotBtn = document.getElementById("askBot");
const botSuggestion = document.getElementById("botSuggestion");
const slotList = document.getElementById("slotList");
const toConfirmBtn = document.getElementById("toConfirm");

askBotBtn.addEventListener("click", () => {
  botSuggestion.classList.add("show");
  slotList.classList.add("show");
});

// Selección de horario: habilita continuar y guarda datos para el resumen
document.querySelectorAll(".slot").forEach((slot) => {
  slot.addEventListener("click", () => {
    document.querySelectorAll(".slot").forEach((s) => s.classList.remove("selected"));
    slot.classList.add("selected");
    toConfirmBtn.disabled = false;

    const day = slot.dataset.day;
    const hour = slot.dataset.hour;

    document.getElementById("sumDay").textContent = day;
    document.getElementById("sumHour").textContent = hour;
    document.getElementById("finalDay").textContent = day;
    document.getElementById("finalHour").textContent = hour;
  });
});

// Estado inicial
goToStep(1);