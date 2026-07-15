// ============================================================
// floating hearts background
// ============================================================
const heartsBg = document.getElementById('heartsBg');
const HEART_EMOJIS = ['💗', '💕', '💖', '💘'];

function spawnHeart() {
  const heart = document.createElement('span');
  heart.className = 'heart';
  heart.textContent = HEART_EMOJIS[Math.floor(Math.random() * HEART_EMOJIS.length)];
  heart.style.left = Math.random() * 100 + 'vw';
  heart.style.fontSize = 14 + Math.random() * 18 + 'px';
  heart.style.setProperty('--drift', (Math.random() * 80 - 40) + 'px');
  const duration = 7 + Math.random() * 6;
  heart.style.animationDuration = duration + 's';
  heartsBg.appendChild(heart);
  setTimeout(() => heart.remove(), duration * 1000 + 200);
}

for (let i = 0; i < 6; i++) setTimeout(spawnHeart, i * 500);
setInterval(spawnHeart, 900);

// ============================================================
// question screen: dodging "no" + growing/unlocking "yes"
// ============================================================
const btnNo = document.getElementById('btnNo');
const btnYes = document.getElementById('btnYes');
const yesLabel = document.getElementById('yesLabel');
const hint = document.getElementById('hint');
const progress = document.getElementById('progress');
const screenQuestion = document.getElementById('screenQuestion');
const screenEnding = document.getElementById('screenEnding');

const REQUIRED_DODGES = 3;
let dodgeCount = 0;

const teasingHints = [
  'psst… coba klik salah satu tombol di bawah 👇',
  'eh, kok "no"-nya lari ya? 😆',
  'coba lagi deh, dikit lagi nih~',
  'nah sekarang "yes"-nya udah bisa dipencet 😉',
];

function moveNoButton() {
  // make sure it's positioned fixed so it can roam the whole viewport
  if (!btnNo.classList.contains('dodging')) {
    const rect = btnNo.getBoundingClientRect();
    btnNo.style.width = rect.width + 'px';
    btnNo.style.left = rect.left + 'px';
    btnNo.style.top = rect.top + 'px';
    btnNo.classList.add('dodging');
  }

  const rect = btnNo.getBoundingClientRect();
  const margin = 16;
  const maxX = window.innerWidth - rect.width - margin;
  const maxY = window.innerHeight - rect.height - margin;

  const newX = Math.max(margin, Math.random() * maxX);
  const newY = Math.max(margin, Math.random() * maxY);

  btnNo.style.left = newX + 'px';
  btnNo.style.top = newY + 'px';
}

function registerDodge() {
  if (dodgeCount >= REQUIRED_DODGES) {
    moveNoButton();
    return;
  }
  dodgeCount++;
  moveNoButton();

  const scale = 1 + dodgeCount * 0.18;
  btnYes.style.setProperty('--yes-scale', Math.min(scale, 1.6));

  progress.textContent = `digodain: ${dodgeCount}/${REQUIRED_DODGES}`;
  hint.textContent = teasingHints[Math.min(dodgeCount, teasingHints.length - 1)];

  if (dodgeCount >= REQUIRED_DODGES) {
    unlockYes();
  }
}

function unlockYes() {
  btnYes.disabled = false;
  btnYes.classList.add('unlocked');
  yesLabel.textContent = 'yes 😍';
  hint.textContent = teasingHints[teasingHints.length - 1];
  progress.textContent = 'sekarang boleh dipencet~ 💕';
}

// mouse hover dodges it before a click can land
btnNo.addEventListener('pointerenter', (e) => {
  if (e.pointerType === 'mouse') registerDodge();
});

// touch / click fallback (mobile taps, or if a click somehow lands)
btnNo.addEventListener('click', (e) => {
  e.preventDefault();
  registerDodge();
});
btnNo.addEventListener('touchstart', (e) => {
  e.preventDefault();
  registerDodge();
}, { passive: false });

window.addEventListener('resize', () => {
  if (btnNo.classList.contains('dodging')) moveNoButton();
});

btnYes.addEventListener('click', () => {
  if (btnYes.disabled) return;
  goToEnding();
});

// ============================================================
// transition to ending screen
// ============================================================
function goToEnding() {
  screenQuestion.style.transition = 'opacity .35s ease';
  screenQuestion.style.opacity = '0';
  setTimeout(() => {
    screenQuestion.hidden = true;
    screenEnding.hidden = false;
    startConfetti();
  }, 350);
}

// ============================================================
// confetti burst on ending screen
// ============================================================
function startConfetti() {
  const canvas = document.getElementById('confetti');
  const ctx = canvas.getContext('2d');
  const colors = ['#ff6fa5', '#e5417f', '#b185db', '#ffd166', '#8de7c7'];

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const particles = [];
  const count = 140;
  for (let i = 0; i < count; i++) {
    particles.push({
      x: canvas.width / 2 + (Math.random() - 0.5) * 60,
      y: canvas.height / 2,
      vx: (Math.random() - 0.5) * 14,
      vy: -Math.random() * 14 - 4,
      size: 5 + Math.random() * 6,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      spin: (Math.random() - 0.5) * 12,
      shape: Math.random() > 0.5 ? 'rect' : 'circle',
      life: 0,
    });
  }

  const gravity = 0.35;
  const maxLife = 130;
  let frame = 0;

  function tick() {
    frame++;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let alive = false;
    for (const p of particles) {
      if (p.life > maxLife) continue;
      alive = true;
      p.vy += gravity;
      p.x += p.vx;
      p.y += p.vy;
      p.rotation += p.spin;
      p.life++;

      const opacity = Math.max(0, 1 - p.life / maxLife);
      ctx.save();
      ctx.globalAlpha = opacity;
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.fillStyle = p.color;
      if (p.shape === 'rect') {
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
      } else {
        ctx.beginPath();
        ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }

    if (alive && frame < maxLife + 20) {
      requestAnimationFrame(tick);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  requestAnimationFrame(tick);
}
