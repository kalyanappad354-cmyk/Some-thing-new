const PARTNER_NAME = "My Love";

const MESSAGES = [
  { heart: "🌸", text: "You make my world softer." },
  { heart: "✨", text: "You are my happiest thought." },
  { heart: "💫", text: "Every moment with you matters." },
  { heart: "🏠", text: "You are my home." },
  { heart: "♥", text: "I love you deeply and endlessly." }
];

let currentCard = 0;

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("partner-name").textContent = PARTNER_NAME;
  buildCards();
  buildDots();
});

// Soft Click Sound
const clickSound = document.getElementById("softClick");

function playSoftClick() {
  if (!clickSound) return;
  clickSound.currentTime = 0;
  clickSound.volume = 0.4;
  clickSound.play();
}

// Build Cards
function buildCards() {
  const stage = document.getElementById("card-stage");
  MESSAGES.forEach((msg, i) => {
    const card = document.createElement("div");
    card.className = "message-card" + (i === 0 ? " card-visible" : "");
    card.id = `card-${i}`;
    card.innerHTML = `
      <p class="card-num">${i + 1} / ${MESSAGES.length}</p>
      <span class="card-heart">${msg.heart}</span>
      <p class="card-quote">"${msg.text}"</p>
    `;
    stage.appendChild(card);
  });
}

function buildDots() {
  const container = document.getElementById("progress-dots");
  MESSAGES.forEach((_, i) => {
    const dot = document.createElement("div");
    dot.className = "dot" + (i === 0 ? " active" : "");
    dot.id = `dot-${i}`;
    container.appendChild(dot);
  });
}

function updateDots(index) {
  document.querySelectorAll(".dot").forEach((d, i) => {
    d.classList.toggle("active", i === index);
  });
}

// Flow
function startJourney() {
  switchScreen("screen-opening", "screen-cards");
}

function nextCard() {
  document.getElementById(`card-${currentCard}`).classList.remove("card-visible");
  currentCard++;

  if (currentCard < MESSAGES.length) {
    document.getElementById(`card-${currentCard}`).classList.add("card-visible");
    updateDots(currentCard);
  } else {
    showReveal();
  }
}

function showReveal() {
  switchScreen("screen-cards", "screen-reveal");

  const nameEl = document.getElementById("partner-name");
  nameEl.style.opacity = "0";
  nameEl.style.transform = "translateY(20px)";

  setTimeout(() => {
    nameEl.style.transition = "all 1s ease";
    nameEl.style.opacity = "1";
    nameEl.style.transform = "translateY(0)";
  }, 400);
}

function showFinal() {
  switchScreen("screen-reveal", "screen-final");
}

function playAgain() {
  currentCard = 0;
  document.querySelectorAll(".message-card").forEach((c, i) => {
    c.className = "message-card" + (i === 0 ? " card-visible" : "");
  });
  updateDots(0);
  switchScreen("screen-final", "screen-opening");
}

function switchScreen(hideId, showId) {
  document.getElementById(hideId).classList.remove("active");
  document.getElementById(showId).classList.add("active");
}

function sayBack() {
  document.getElementById("say-back-modal").style.display = "flex";
}

function closeModal(e) {
  if (e.target.id === "say-back-modal") closeSayBack();
}

function closeSayBack() {
  document.getElementById("say-back-modal").style.display = "none";
}
