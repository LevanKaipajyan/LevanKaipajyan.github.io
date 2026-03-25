let currentLang = 'fr';

function setLang(lang) {
  currentLang = lang;
  document.querySelectorAll('.lang-btn').forEach((b, i) => {
    b.classList.toggle('active', (lang === 'fr' && i === 0) || (lang === 'en' && i === 1));
  });
  document.querySelectorAll('[data-fr]').forEach(el => {
    const txt = el.getAttribute('data-' + lang);
    if (txt) el.innerHTML = txt;
  });
  // Update placeholders
  document.querySelectorAll('[data-placeholder-' + lang + ']').forEach(el => {
    el.placeholder = el.getAttribute('data-placeholder-' + lang);
  });
  document.documentElement.lang = lang;
}

function showPage(pageId, btn) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const pg = document.getElementById('page-' + pageId);
  if (pg) pg.classList.add('active');
  document.querySelectorAll('[data-nav]').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('[data-nav="' + pageId + '"]').forEach(b => b.classList.add('active'));
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleMobileMenu() {
  document.getElementById('mobileNav').classList.toggle('open');
}

function closeMobile() {
  document.getElementById('mobileNav').classList.remove('open');
}

window.addEventListener('scroll', () => {
  const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
  document.getElementById('scrollLine').style.width = Math.min(scrolled, 100) + '%';
});


// Init
setLang('fr');

