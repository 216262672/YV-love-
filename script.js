// --- Soft Romantic Instrumental (Web Audio, copyright-safe) ---
let audioCtx, osc1, osc2, gain;

function startMusic() {
  audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  gain = audioCtx.createGain();
  gain.gain.value = 0.05;
  gain.connect(audioCtx.destination);

  osc1 = audioCtx.createOscillator();
  osc2 = audioCtx.createOscillator();

  osc1.type = "sine";
  osc2.type = "triangle";

  osc1.frequency.value = 220; // A3
  osc2.frequency.value = 330; // E4

  osc1.connect(gain);
  osc2.connect(gain);

  osc1.start();
  osc2.start();

  // gentle breathing effect
  setInterval(() => {
    gain.gain.setTargetAtTime(0.03 + Math.random()*0.03, audioCtx.currentTime, 1);
  }, 1200);
}

// --- Scene control ---
function openGift() {
  startMusic();
  document.getElementById("scene1").classList.remove("active");
  document.getElementById("scene2").classList.add("active");

  startTyping();
  startHearts();

  setTimeout(() => {
    document.getElementById("scene2").classList.remove("active");
    document.getElementById("scene3").classList.add("active");
  }, 9000);
}

// --- Typing text ---
const messages = [
  "Yeh gift mehenga nahi hai…",
  "Par soch dil se nikli hai 💗",
  "Main dramatic promises mein believe nahi karta…",
  "Bas jo feel hota hai, usse honestly jeeta hoon 🌸"
];

let i = 0, j = 0;

function startTyping() {
  const el = document.getElementById("typeText");

  function type() {
    if (j < messages[i].length) {
      el.innerHTML += messages[i][j++];
      setTimeout(type, 70);
    } else {
      setTimeout(() => {
        el.innerHTML = "";
        j = 0;
        i++;
        if (i < messages.length) type();
      }, 1200);
    }
  }
  type();
}

// --- Hearts ---
function startHearts() {
  setInterval(() => {
    const h = document.createElement("div");
    h.className = "heart";
    h.innerHTML = "❤️";
    h.style.left = Math.random() * 100 + "vw";
    document.body.appendChild(h);
    setTimeout(() => h.remove(), 4500);
  }, 320);
}

function sweet() {
  alert("Bas honesty… bina pressure 😊💖");
}
