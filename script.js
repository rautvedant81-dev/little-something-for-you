/**
 * A Little Something for You 💌
 * Enhanced Interactive & Animated Experience
 */

// -------------------------------------------------------------
// 1. STATE & SCREEN NAVIGATION (8-STEP JOURNEY)
// -------------------------------------------------------------
const screens = ["welcome", "first-time", "feelings", "confession", "proposal", "response"];
const stepMap = {
  welcome: "welcome",
  "first-time": "first-time",
  feelings: "feelings",
  confession: "confession",
  proposal: "proposal",
  response: "proposal",
  // Aliases for compatibility
  story: "first-time",
  question: "proposal"
};

let currentScreenId = "welcome";
let lastAnswerChosen = "yes";

function updateStepNavigation(activeId) {
  const stepDots = document.querySelectorAll(".step-dot");
  const stepTarget = stepMap[activeId] || "welcome";
  const stepOrder = ["welcome", "first-time", "feelings", "confession", "proposal"];
  const activeIndex = stepOrder.indexOf(stepTarget);

  stepDots.forEach((dot, index) => {
    dot.classList.remove("active", "completed");
    if (index === activeIndex) {
      dot.classList.add("active");
    } else if (index < activeIndex) {
      dot.classList.add("completed");
    }
  });
}

function showScreen(id) {
  // Alias routing
  if (id === "story") id = "first-time";
  if (id === "question") id = "proposal";

  currentScreenId = id;

  screens.forEach((screenId) => {
    const el = document.getElementById(screenId);
    if (!el) return;
    if (screenId === id) {
      el.classList.add("active");
    } else {
      el.classList.remove("active");
    }
  });

  updateStepNavigation(id);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Allow clicking completed or active step dots in the top navigation
document.querySelectorAll(".step-dot").forEach((dot) => {
  dot.addEventListener("click", () => {
    const target = dot.getAttribute("data-step");
    if (target) {
      showScreen(target);
      playSoftTap();
    }
  });
});

// Brand link returns to beginning
const brandLogo = document.getElementById("brandLogo");
if (brandLogo) {
  brandLogo.addEventListener("click", (e) => {
    e.preventDefault();
    resetEnvelope();
    showScreen("welcome");
  });
}

// -------------------------------------------------------------
// 2. INTERACTIVE 3D ENVELOPE OPENING
// -------------------------------------------------------------
const envelopeWrap = document.getElementById("envelopeWrap");
const envelope = document.getElementById("envelope");
const openNoteBtn = document.getElementById("openNote");
let isEnvelopeOpening = false;

function triggerOpenEnvelope() {
  if (isEnvelopeOpening) return;
  isEnvelopeOpening = true;

  // Sound chime
  playOpenChime();

  // Burst particles around the envelope
  if (envelopeWrap) {
    const rect = envelopeWrap.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    spawnBurst(centerX, centerY, 35, ["#f7a8be", "#ffd4e0", "#faecea", "#f7d5a3"]);
  }

  // Envelope 3D fold animation
  if (envelope) {
    envelope.classList.add("opening");
  }

  // Navigate after animation plays
  setTimeout(() => {
    showScreen("first-time");
    setTimeout(() => {
      if (envelope) {
        envelope.classList.remove("opening");
        envelope.classList.add("open");
      }
      isEnvelopeOpening = false;
    }, 400);
  }, 950);
}

function resetEnvelope() {
  if (envelope) {
    envelope.classList.remove("opening", "open");
  }
  isEnvelopeOpening = false;
}

if (envelopeWrap) {
  envelopeWrap.addEventListener("click", triggerOpenEnvelope);
  envelopeWrap.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      triggerOpenEnvelope();
    }
  });
}

if (openNoteBtn) {
  openNoteBtn.addEventListener("click", triggerOpenEnvelope);
}

// Navigation between chapters
const toFeelingsBtn = document.getElementById("toFeelings");
if (toFeelingsBtn) {
  toFeelingsBtn.addEventListener("click", () => {
    playSoftTap();
    showScreen("feelings");
  });
}

const toConfessionBtn = document.getElementById("toConfession");
if (toConfessionBtn) {
  toConfessionBtn.addEventListener("click", () => {
    playSoftTap();
    showScreen("confession");
  });
}

const toProposalBtn = document.getElementById("toProposal") || document.getElementById("toQuestion");
if (toProposalBtn) {
  toProposalBtn.addEventListener("click", () => {
    playSoftTap();
    showScreen("proposal");
  });
}

const restartButton = document.getElementById("restartButton");
if (restartButton) {
  restartButton.addEventListener("click", () => {
    playSoftTap();
    resetEnvelope();
    showScreen("welcome");
  });
}

// -------------------------------------------------------------
// 3. 3D CARD PARALLAX TILT EFFECT (CONFESSION CARD)
// -------------------------------------------------------------
const confessionCard = document.getElementById("confessionCard");
if (confessionCard) {
  confessionCard.addEventListener("mousemove", (e) => {
    const rect = confessionCard.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -7;
    const rotateY = ((x - centerX) / centerX) * 7;

    confessionCard.style.transform = `perspective(900px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;
  });

  confessionCard.addEventListener("mouseleave", () => {
    confessionCard.style.transform = `perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  });
}

// -------------------------------------------------------------
// 4. BACKGROUND MUSIC & SYNTHESIZER FALLBACK
// -------------------------------------------------------------
const musicToggle = document.getElementById("musicToggle");
const musicLabel = document.getElementById("musicLabel");

const backgroundMusic = new Audio("music.mp3");
backgroundMusic.loop = true;
backgroundMusic.volume = 0.35;

let isMusicPlaying = false;
let synthAudioContext = null;
let synthInterval = null;

// Ambient harmonic synth fallback in case local audio fails
function startAmbientSynth() {
  if (synthAudioContext) return;
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    synthAudioContext = new AudioCtx();

    const chords = [
      [261.63, 329.63, 392.00, 523.25], // C major
      [220.00, 261.63, 329.63, 440.00], // A minor
      [174.61, 220.00, 261.63, 349.23], // F major
      [196.00, 246.94, 293.66, 392.00]  // G major
    ];
    let chordIndex = 0;

    function playChord() {
      if (!isMusicPlaying || !synthAudioContext) return;
      const notes = chords[chordIndex];
      chordIndex = (chordIndex + 1) % chords.length;

      notes.forEach((freq, idx) => {
        setTimeout(() => {
          if (!isMusicPlaying || !synthAudioContext) return;
          const osc = synthAudioContext.createOscillator();
          const gain = synthAudioContext.createGain();
          osc.type = "sine";
          osc.frequency.setValueAtTime(freq, synthAudioContext.currentTime);

          gain.gain.setValueAtTime(0.001, synthAudioContext.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.035, synthAudioContext.currentTime + 1.2);
          gain.gain.exponentialRampToValueAtTime(0.0001, synthAudioContext.currentTime + 4.5);

          osc.connect(gain);
          gain.connect(synthAudioContext.destination);
          osc.start();
          osc.stop(synthAudioContext.currentTime + 4.6);
        }, idx * 220);
      });
    }

    playChord();
    synthInterval = setInterval(playChord, 4800);
  } catch (err) {
    console.error("Ambient synth error:", err);
  }
}

function stopAmbientSynth() {
  if (synthInterval) {
    clearInterval(synthInterval);
    synthInterval = null;
  }
  if (synthAudioContext && synthAudioContext.state !== "closed") {
    try {
      synthAudioContext.close();
    } catch (e) {}
    synthAudioContext = null;
  }
}

async function toggleMusic() {
  if (!isMusicPlaying) {
    try {
      await backgroundMusic.play();
      isMusicPlaying = true;
      if (musicLabel) musicLabel.textContent = "Music is on";
      if (musicToggle) musicToggle.setAttribute("aria-pressed", "true");
    } catch (error) {
      console.warn("Audio file autoplay prevented or missing, starting ambient harmonic synth:", error);
      startAmbientSynth();
      isMusicPlaying = true;
      if (musicLabel) musicLabel.textContent = "Music is on";
      if (musicToggle) musicToggle.setAttribute("aria-pressed", "true");
    }
  } else {
    backgroundMusic.pause();
    stopAmbientSynth();
    isMusicPlaying = false;
    if (musicLabel) musicLabel.textContent = "Turn music on";
    if (musicToggle) musicToggle.setAttribute("aria-pressed", "false");
  }
}

if (musicToggle) {
  musicToggle.addEventListener("click", toggleMusic);
}

backgroundMusic.addEventListener("error", () => {
  console.log("music2.mp3 not playable directly, fallback synth active.");
});

// -------------------------------------------------------------
// 5. HARMONIC SOUND CHIMES (WEB AUDIO API)
// -------------------------------------------------------------
let sfxAudioContext = null;

function getSfxContext() {
  if (!sfxAudioContext) {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (AudioCtx) sfxAudioContext = new AudioCtx();
  }
  if (sfxAudioContext && sfxAudioContext.state === "suspended") {
    sfxAudioContext.resume();
  }
  return sfxAudioContext;
}

function playNote(freq, startTime, duration, maxGain = 0.08) {
  try {
    const ctx = getSfxContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, startTime);

    gain.gain.setValueAtTime(0.001, startTime);
    gain.gain.exponentialRampToValueAtTime(maxGain, startTime + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(startTime);
    osc.stop(startTime + duration + 0.05);
  } catch (e) {}
}

function playOpenChime() {
  const ctx = getSfxContext();
  if (!ctx) return;
  const now = ctx.currentTime;
  playNote(523.25, now, 0.7, 0.07);        // C5
  playNote(659.25, now + 0.12, 0.7, 0.08); // E5
  playNote(783.99, now + 0.24, 0.9, 0.09); // G5
  playNote(1046.5, now + 0.38, 1.2, 0.1);  // C6
}

function playCelebrationChime() {
  const ctx = getSfxContext();
  if (!ctx) return;
  const now = ctx.currentTime;
  const notes = [523.25, 659.25, 783.99, 987.77, 1046.5, 1318.51];
  notes.forEach((freq, idx) => {
    playNote(freq, now + idx * 0.1, 1.2 - idx * 0.1, 0.08);
  });
}

function playSoftTap() {
  const ctx = getSfxContext();
  if (!ctx) return;
  playNote(880, ctx.currentTime, 0.15, 0.03);
}

// -------------------------------------------------------------
// 6. QUESTION RESPONSES & CELEBRATION
// -------------------------------------------------------------
function showResponse(symbol, eyebrow, title, copy, answerType) {
  lastAnswerChosen = answerType;

  const symbolEl = document.getElementById("responseSymbol");
  const eyebrowEl = document.getElementById("responseEyebrow");
  const titleEl = document.getElementById("responseTitle");
  const copyEl = document.getElementById("responseCopy");

  if (symbolEl) symbolEl.textContent = symbol;
  if (eyebrowEl) eyebrowEl.textContent = eyebrow;
  if (titleEl) titleEl.innerHTML = title;
  if (copyEl) copyEl.textContent = copy;

  showScreen("response");
}

// YES Button
const yesButton = document.getElementById("yesButton");
if (yesButton) {
  yesButton.addEventListener("click", () => {
    playCelebrationChime();

    // Trigger full screen confetti celebration!
    const rect = yesButton.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    triggerCelebrationConfetti(x, y);

    showResponse(
      "♡",
      "THAT MAKES ME SMILE",
      "Let's see<br><em>where it goes.</em>",
      "Thank you for giving this a chance. I'd love to start by getting to know you, one conversation at a time — and we'll keep it private until it's permanent. ♡",
      "yes"
    );
  });
}

// TAKE TIME Button
const timeButton = document.getElementById("timeButton");
if (timeButton) {
  timeButton.addEventListener("click", () => {
    playSoftTap();
    showResponse(
      "✧",
      "TAKE ALL THE TIME YOU NEED",
      "No rush.<br><em>Really.</em>",
      "Take all the time you need. You don't owe me an immediate answer, and there's no pressure at all.",
      "time"
    );
  });
}

// NO Button
const noButton = document.getElementById("noButton");
if (noButton) {
  noButton.addEventListener("click", () => {
    playSoftTap();
    showResponse(
      "♡",
      "THANK YOU FOR BEING HONEST",
      "I understand.<br><em>Truly.</em>",
      "Thank you for reading my note and being honest with me. I deeply respect how you feel, and I wish you the very best.",
      "no"
    );
  });
}

// Copy / Share Response Button
const copyResponseBtn = document.getElementById("copyResponseBtn");
const toast = document.getElementById("toast");

function showToast(msg) {
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 3200);
}

if (copyResponseBtn) {
  copyResponseBtn.addEventListener("click", async () => {
    playSoftTap();
    let textToShare = "";
    if (lastAnswerChosen === "yes") {
      textToShare = "I read your little note... and yes, let's see where things go! (And let's keep it private until it's permanent ♡)";
    } else if (lastAnswerChosen === "time") {
      textToShare = "Thank you for your sweet note. I'd like a little time to think. (Let's keep it private until it's permanent ✧)";
    } else {
      textToShare = "Thank you for your sweet note and for being honest with me. ♡";
    }

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(textToShare);
        showToast("Answer copied to clipboard! Send it to them 💌");
      } else {
        showToast("Here is your answer: \"" + textToShare + "\"");
      }
    } catch (e) {
      showToast("Here is your answer: \"" + textToShare + "\"");
    }
  });
}

// -------------------------------------------------------------
// 7. BACKGROUND TWINKLING STARS
// -------------------------------------------------------------
function createTwinklingStars() {
  const container = document.getElementById("stars");
  if (!container) return;
  container.innerHTML = "";

  const starCount = 42;
  const starChars = ["✦", "✧", "·", "•", "⋆"];

  for (let i = 0; i < starCount; i++) {
    const star = document.createElement("span");
    star.className = "star";
    star.textContent = starChars[i % starChars.length];

    star.style.left = `${(Math.random() * 100).toFixed(2)}%`;
    star.style.top = `${(Math.random() * 100).toFixed(2)}%`;
    star.style.fontSize = `${(7 + Math.random() * 12).toFixed(1)}px`;
    star.style.animationDelay = `${(Math.random() * 5).toFixed(2)}s`;
    star.style.animationDuration = `${(2.8 + Math.random() * 4).toFixed(2)}s`;

    container.appendChild(star);
  }
}

createTwinklingStars();

// -------------------------------------------------------------
// 8. HIGH-PERFORMANCE INTERACTIVE CANVAS (PETALS, BOKEH, TRAIL, CONFETTI)
// -------------------------------------------------------------
const canvas = document.getElementById("fxCanvas");
const ctx = canvas ? canvas.getContext("2d") : null;

let width = (canvas.width = window.innerWidth);
let height = (canvas.height = window.innerHeight);

window.addEventListener("resize", () => {
  if (!canvas) return;
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
});

// Particles Collections
const petals = [];
const bokehList = [];
const sparkles = [];
const confetti = [];

// Initialize Rose Petals
const petalColors = [
  "rgba(247, 168, 190, 0.7)",
  "rgba(255, 196, 214, 0.65)",
  "rgba(224, 114, 146, 0.6)",
  "rgba(250, 214, 222, 0.75)"
];

for (let i = 0; i < 24; i++) {
  petals.push({
    x: Math.random() * width,
    y: Math.random() * height,
    size: 9 + Math.random() * 11,
    speedY: 0.6 + Math.random() * 0.9,
    speedX: (Math.random() - 0.5) * 0.8,
    angle: Math.random() * Math.PI * 2,
    angleSpeed: (Math.random() - 0.5) * 0.02,
    flutter: Math.random() * Math.PI * 2,
    flutterSpeed: 0.02 + Math.random() * 0.02,
    color: petalColors[i % petalColors.length]
  });
}

// Initialize Glowing Bokeh Orbs
for (let i = 0; i < 28; i++) {
  bokehList.push({
    x: Math.random() * width,
    y: Math.random() * height,
    radius: 2 + Math.random() * 6,
    speedY: -0.2 - Math.random() * 0.35,
    speedX: (Math.random() - 0.5) * 0.25,
    opacity: 0.2 + Math.random() * 0.45,
    pulseSpeed: 0.01 + Math.random() * 0.02,
    pulseAngle: Math.random() * Math.PI * 2,
    color: i % 3 === 0 ? "247, 213, 163" : "247, 168, 190"
  });
}

// Helper: Draw realistic curved petal
function drawPetal(p) {
  ctx.save();
  ctx.translate(p.x, p.y);
  ctx.rotate(p.angle);
  const scaleX = Math.cos(p.flutter);
  ctx.scale(scaleX, 1);

  ctx.fillStyle = p.color;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.bezierCurveTo(-p.size / 2, -p.size / 2, -p.size, p.size / 2, 0, p.size);
  ctx.bezierCurveTo(p.size, p.size / 2, p.size / 2, -p.size / 2, 0, 0);
  ctx.fill();

  ctx.restore();
}

// Helper: Draw delicate heart
function drawHeart(x, y, size, color, alpha = 1) {
  ctx.save();
  ctx.translate(x, y);
  ctx.globalAlpha = Math.max(0, alpha);
  ctx.fillStyle = color;
  ctx.beginPath();
  const topCurveHeight = size * 0.3;
  ctx.moveTo(0, topCurveHeight);
  ctx.bezierCurveTo(0, 0, -size / 2, 0, -size / 2, topCurveHeight);
  ctx.bezierCurveTo(-size / 2, (size + topCurveHeight) / 2, 0, size, 0, size);
  ctx.bezierCurveTo(0, size, size / 2, (size + topCurveHeight) / 2, size / 2, topCurveHeight);
  ctx.bezierCurveTo(size / 2, 0, 0, 0, 0, topCurveHeight);
  ctx.fill();
  ctx.restore();
}

// Particle burst helper
function spawnBurst(x, y, count = 20, colors = ["#f7a8be", "#faecea", "#f7d5a3"]) {
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 1.5 + Math.random() * 4.5;
    sparkles.push({
      x: x,
      y: y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      size: 4 + Math.random() * 7,
      color: colors[i % colors.length],
      alpha: 1,
      decay: 0.015 + Math.random() * 0.02,
      isHeart: Math.random() > 0.4
    });
  }
}

// Celebration Confetti for "Yes"
function triggerCelebrationConfetti(originX, originY) {
  const count = 160;
  const colors = ["#f7a8be", "#ff547d", "#faecea", "#f7d5a3", "#ffd4e0", "#ffffff"];

  for (let i = 0; i < count; i++) {
    const angle = -Math.PI / 2 + (Math.random() - 0.5) * 1.8;
    const speed = 4 + Math.random() * 9.5;
    confetti.push({
      x: originX || width / 2,
      y: originY || height * 0.6,
      vx: Math.cos(angle) * speed + (Math.random() - 0.5) * 3,
      vy: Math.sin(angle) * speed,
      gravity: 0.14 + Math.random() * 0.1,
      drag: 0.98,
      size: 6 + Math.random() * 8,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: 1,
      decay: 0.005 + Math.random() * 0.008,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.15,
      isHeart: Math.random() > 0.45,
      w: 8 + Math.random() * 6,
      h: 4 + Math.random() * 4
    });
  }
}

// Interactive Cursor & Touch Sparkle Trail
let lastPointerTime = 0;
function handlePointerSparkle(x, y) {
  const now = performance.now();
  if (now - lastPointerTime < 24) return; // throttle
  lastPointerTime = now;

  for (let i = 0; i < 2; i++) {
    sparkles.push({
      x: x + (Math.random() - 0.5) * 12,
      y: y + (Math.random() - 0.5) * 12,
      vx: (Math.random() - 0.5) * 1.2,
      vy: -0.5 - Math.random() * 1.2,
      size: 3 + Math.random() * 5,
      color: Math.random() > 0.5 ? "#f7a8be" : "#f7d5a3",
      alpha: 0.9,
      decay: 0.025 + Math.random() * 0.02,
      isHeart: Math.random() > 0.6
    });
  }
}

window.addEventListener("mousemove", (e) => {
  handlePointerSparkle(e.clientX, e.clientY);
});

window.addEventListener("touchmove", (e) => {
  if (e.touches && e.touches[0]) {
    handlePointerSparkle(e.touches[0].clientX, e.touches[0].clientY);
  }
}, { passive: true });

// Click anywhere creates a gentle blooming ripple
window.addEventListener("click", (e) => {
  // Ignore clicks on buttons to keep button effects distinct
  if (e.target.closest("button") || e.target.closest(".envelope-wrap")) return;
  spawnBurst(e.clientX, e.clientY, 8, ["#f7a8be", "#ffd4e0", "#faecea"]);
});

// Main Animation Loop
function animateParticles() {
  if (!ctx) return;
  ctx.clearRect(0, 0, width, height);

  // 1. Draw Bokeh
  for (let i = 0; i < bokehList.length; i++) {
    const b = bokehList[i];
    b.y += b.speedY;
    b.x += b.speedX;
    b.pulseAngle += b.pulseSpeed;

    if (b.y < -20) {
      b.y = height + 20;
      b.x = Math.random() * width;
    }
    if (b.x < -20) b.x = width + 20;
    if (b.x > width + 20) b.x = -20;

    const currentAlpha = Math.max(0.05, b.opacity * (0.6 + 0.4 * Math.sin(b.pulseAngle)));

    ctx.save();
    const grad = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.radius);
    grad.addColorStop(0, `rgba(${b.color}, ${currentAlpha})`);
    grad.addColorStop(1, `rgba(${b.color}, 0)`);
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(b.x, b.y, b.radius * 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  // 2. Draw Falling Rose Petals
  for (let i = 0; i < petals.length; i++) {
    const p = petals[i];
    p.y += p.speedY;
    p.x += p.speedX + Math.sin(p.flutter) * 0.45;
    p.angle += p.angleSpeed;
    p.flutter += p.flutterSpeed;

    if (p.y > height + 30) {
      p.y = -30;
      p.x = Math.random() * width;
    }
    if (p.x < -30) p.x = width + 30;
    if (p.x > width + 30) p.x = -30;

    drawPetal(p);
  }

  // 3. Draw Sparkles & Trail
  for (let i = sparkles.length - 1; i >= 0; i--) {
    const s = sparkles[i];
    s.x += s.vx;
    s.y += s.vy;
    s.alpha -= s.decay;

    if (s.alpha <= 0) {
      sparkles.splice(i, 1);
      continue;
    }

    if (s.isHeart) {
      drawHeart(s.x, s.y, s.size, s.color, s.alpha);
    } else {
      ctx.save();
      ctx.globalAlpha = Math.max(0, s.alpha);
      ctx.fillStyle = s.color;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.size / 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  // 4. Draw Celebration Confetti
  for (let i = confetti.length - 1; i >= 0; i--) {
    const c = confetti[i];
    c.vx *= c.drag;
    c.vy *= c.drag;
    c.vy += c.gravity;
    c.x += c.vx;
    c.y += c.vy;
    c.rotation += c.rotSpeed;
    c.alpha -= c.decay;

    if (c.alpha <= 0 || c.y > height + 50) {
      confetti.splice(i, 1);
      continue;
    }

    ctx.save();
    ctx.translate(c.x, c.y);
    ctx.rotate(c.rotation);
    ctx.globalAlpha = Math.max(0, c.alpha);

    if (c.isHeart) {
      drawHeart(0, 0, c.size * 1.2, c.color, c.alpha);
    } else {
      ctx.fillStyle = c.color;
      ctx.fillRect(-c.w / 2, -c.h / 2, c.w, c.h);
    }
    ctx.restore();
  }

  requestAnimationFrame(animateParticles);
}

// Start particle render loop
if (canvas && ctx) {
  requestAnimationFrame(animateParticles);
}
