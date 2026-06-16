/* ───────── CURSOR ───────── */
const cursor = document.querySelector('.cursor');
const trail = document.querySelector('.cursor-trail');
let mouseX = 0, mouseY = 0, trailX = 0, trailY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  cursor.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%,-50%)`;
});

function animateTrail() {
  trailX += (mouseX - trailX) * 0.12;
  trailY += (mouseY - trailY) * 0.12;
  trail.style.transform = `translate(${trailX}px, ${trailY}px) translate(-50%,-50%)`;
  requestAnimationFrame(animateTrail);
}
animateTrail();


/* ───────── PAGE NAVIGATION (FIXED SYSTEM) ───────── */
function showPage(id) {
  document.querySelectorAll('.page, .hero').forEach(el => {
    el.classList.add('hidden');
    el.classList.remove('active');
  });

  const page = document.getElementById(id);
  if (page) {
    page.classList.remove('hidden');
    page.classList.add('active');
  }
}


/* ───────── NAV BUTTONS ───────── */
function openLogin() {
  document.getElementById('home').classList.add('hidden');
  showPage('login');
}

function backToHome() {
  document.getElementById('login').classList.add('hidden');
  document.getElementById('home').classList.remove('hidden');
}


/* ───────── LOGIN ───────── */
function login() {
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  const msg = document.getElementById('message');

  if (!email || !password) {
    msg.textContent = "⚠ Please fill in all fields.";
    return;
  }

  msg.textContent = "";

  document.getElementById('login').classList.add('hidden');
  showPage('dashboard');
  initDashboard();
}


/* ───────── LOGOUT ───────── */
function logout() {
  document.getElementById('dashboard').classList.add('hidden');
  document.getElementById('home').classList.remove('hidden');

  document.getElementById('email').value = "";
  document.getElementById('password').value = "";
}


/* ───────── SCROLL TO SECTION ───────── */
function scrollTo(id) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}


/* ───────── DASHBOARD INIT ───────── */
function initDashboard() {
  initReveal();
  initCounters();
  initNav();
  initTilt();
}


/* ───────── REVEAL ANIMATION ───────── */
function initReveal() {
  const els = document.querySelectorAll('.reveal');

  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  els.forEach(el => io.observe(el));
}


/* ───────── COUNTERS ───────── */
function initCounters() {
  document.querySelectorAll('.stat-num').forEach(el => {
    const target = +el.dataset.target;
    let count = 0;

    const step = Math.ceil(target / 30);

    const timer = setInterval(() => {
      count += step;
      if (count >= target) {
        count = target;
        clearInterval(timer);
      }
      el.textContent = count + "+";
    }, 40);
  });
}


/* ───────── NAV SHADOW ───────── */
function initNav() {
  const nav = document.getElementById('nav');
  if (!nav) return;

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  });
}


/* ───────── TILT EFFECT ───────── */
function initTilt() {
  document.querySelectorAll('[data-tilt]').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();

      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;

      const tiltX = (y - 0.5) * 10;
      const tiltY = (x - 0.5) * -10;

      card.style.transform =
        `perspective(600px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;

      card.style.setProperty('--mx', `${x * 100}%`);
      card.style.setProperty('--my', `${y * 100}%`);
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = "";
    });
  });
}


/* ───────── MOBILE MENU ───────── */
function toggleMenu() {
  document.getElementById('mobileMenu').classList.toggle('hidden');
}


/* ───────── INIT FIRST SCREEN ───────── */
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('home').classList.remove('hidden');
});