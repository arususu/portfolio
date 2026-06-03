/**
 * main.js — ポートフォリオ UI ロジック
 * データは js/projects.js の PROJECTS / AWARDS を使用
 */

document.addEventListener('DOMContentLoaded', () => {
  renderProjects(PROJECTS);
  renderAwards(AWARDS);
  setupFilters();
  setupModal();
  setupNavScroll();
  setupFadeIn();
});

/* =============================================
   Helpers
   ============================================= */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const esc = str => str.replace(/[&<>"']/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c]));

const ROLE_LABEL = { lead: '主担当', member: '参加', support: 'サポート' };

/* =============================================
   Project Cards
   ============================================= */
function renderProjects(projects) {
  const grid = $('#projects-grid');
  if (!grid) return;

  grid.innerHTML = projects.map(p => projectCardHTML(p)).join('');

  // Bind click events
  $$('.project-card', grid).forEach(card => {
    card.addEventListener('click', () => {
      const id = card.dataset.id;
      const project = PROJECTS.find(p => p.id === id);
      if (project) openModal(project);
    });
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    });
  });
}

function projectCardHTML(p) {
  const techTags = p.technologies.slice(0, 5)
    .map(t => `<span>${esc(t)}</span>`)
    .join('');
  const extra = p.technologies.length > 5 ? `<span>+${p.technologies.length - 5}</span>` : '';

  const awardsHTML = p.awards.length
    ? `<span class="project-footer-award">🏆 ${esc(p.awards[0])}</span>`
    : `<span></span>`;

  return `
    <article
      class="project-card fade-in"
      data-id="${esc(p.id)}"
      data-involvement="${esc(p.involvement)}"
      style="--card-accent: ${esc(p.color)};"
      role="listitem"
      tabindex="0"
      aria-label="${esc(p.title)} — ${esc(ROLE_LABEL[p.involvement])}"
    >
      <div class="project-card-header">
        <span class="role-badge ${esc(p.involvement)}">${ROLE_LABEL[p.involvement]}</span>
        <span class="project-event">${esc(p.event)}</span>
      </div>
      <div>
        <h3 class="project-title">${esc(p.title)}</h3>
        <p class="project-subtitle">${esc(p.subtitle)}</p>
      </div>
      <p class="project-desc">${esc(p.description)}</p>
      <div class="project-tech">${techTags}${extra}</div>
      <div class="project-footer">
        ${awardsHTML}
        <span class="detail-link">詳細を見る →</span>
      </div>
    </article>
  `;
}

/* =============================================
   Awards
   ============================================= */
function renderAwards(awards) {
  const list = $('#awards-list');
  if (!list) return;

  list.innerHTML = awards.map(a => `
    <div class="award-item fade-in">
      <div class="award-dot"></div>
      <div class="award-body">
        <div class="award-name">${esc(a.name)} — <span style="color:var(--text)">${esc(a.detail)}</span></div>
        ${a.note ? `<div class="award-detail">${esc(a.note)}</div>` : ''}
        <div class="award-year">${esc(a.year)}</div>
      </div>
    </div>
  `).join('');
}

/* =============================================
   Filter
   ============================================= */
function setupFilters() {
  const buttons = $$('.filter-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      const cards = $$('.project-card');
      cards.forEach(card => {
        const match = filter === 'all' || card.dataset.involvement === filter;
        card.classList.toggle('hidden', !match);
      });
    });
  });
}

/* =============================================
   Modal
   ============================================= */
let scrollY = 0;

function openModal(project) {
  const overlay = $('#modal-overlay');
  const content = $('#modal-content');
  if (!overlay || !content) return;

  content.innerHTML = modalContentHTML(project);

  overlay.setAttribute('aria-hidden', 'false');
  overlay.classList.add('open');

  scrollY = window.scrollY;
  document.body.style.overflow = 'hidden';

  // Focus close button for accessibility
  setTimeout(() => $('#modal-close')?.focus(), 50);
}

function closeModal() {
  const overlay = $('#modal-overlay');
  if (!overlay) return;

  overlay.classList.remove('open');
  overlay.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  window.scrollTo(0, scrollY);
}

function setupModal() {
  const overlay = $('#modal-overlay');
  const closeBtn = $('#modal-close');

  closeBtn?.addEventListener('click', closeModal);

  overlay?.addEventListener('click', e => {
    if (e.target === overlay) closeModal();
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
  });
}

function modalContentHTML(p) {
  const highlightsHTML = p.highlights
    .map(h => `<div class="highlight-item">${esc(h)}</div>`)
    .join('');

  const techHTML = p.technologies
    .map(t => `<span>${esc(t)}</span>`)
    .join('');

  const awardsHTML = p.awards.length
    ? `<div class="modal-section-label">受賞・実績</div>
       <div class="modal-awards">
         ${p.awards.map(a => `<div class="modal-award-item">${esc(a)}</div>`).join('')}
       </div>`
    : '';

  return `
    <div class="modal-header">
      <span class="role-badge ${esc(p.involvement)}">${ROLE_LABEL[p.involvement]}</span>
    </div>
    <h2 class="modal-title" id="modal-title">${esc(p.title)}</h2>
    <p class="modal-subtitle">${esc(p.subtitle)}</p>

    <div class="modal-meta">
      <span class="modal-meta-item">📅 ${esc(p.period)}</span>
      <span class="modal-meta-item">👤 ${esc(p.role)}</span>
      <span class="modal-meta-item">🏫 ${esc(p.team)}</span>
      <span class="modal-meta-item">🎯 ${esc(p.event)}</span>
    </div>

    <div class="modal-section-label">概要</div>
    <p class="modal-desc">${esc(p.description)}</p>

    <div class="modal-section-label">担当ハイライト</div>
    <div class="modal-highlights">${highlightsHTML}</div>

    <div class="modal-section-label">使用技術</div>
    <div class="modal-tech-tags">${techHTML}</div>

    ${awardsHTML}
  `;
}

/* =============================================
   Navbar scroll effect
   ============================================= */
function setupNavScroll() {
  const navbar = $('#navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    navbar.style.background = window.scrollY > 20
      ? 'rgba(10,15,30,0.95)'
      : 'rgba(10,15,30,0.85)';
  }, { passive: true });
}

/* =============================================
   Fade-in on scroll (Intersection Observer)
   ============================================= */
function setupFadeIn() {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  // Observe existing elements and re-observe after project/award rendering
  const observe = () => $$('.fade-in').forEach(el => observer.observe(el));
  observe();

  // Slight delay to catch dynamically rendered cards
  setTimeout(observe, 100);
}
