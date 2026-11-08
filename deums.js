// ══ DEUMS (page autonome) – code d'accès, cases à cocher, signature ══
(function () {
  var CODE = '25022005';

  var gate = document.getElementById('deumsGate');
  var gateBox = document.getElementById('deumsGateBox');
  var gateInput = document.getElementById('deumsCode');
  var gateError = document.getElementById('deumsGateError');
  var app = document.getElementById('deumsApp');

  // La fenêtre du code est ouverte dès l'arrivée sur la page
  document.body.style.overflow = 'hidden';
  gateInput.focus();

  // ── Code d'accès ──
  window.submitDeumsCode = function () {
    // accepte 25/02/2005, 25-02-2005, 25022005...
    var typed = gateInput.value.replace(/\D/g, '');
    if (typed === CODE) {
      gate.classList.remove('open');
      document.body.style.overflow = '';
      app.style.display = 'block';
      resizeCanvas();
    } else {
      gateError.textContent = 'Code incorrect.';
      gateBox.classList.remove('deums-shake');
      void gateBox.offsetWidth;
      gateBox.classList.add('deums-shake');
      gateInput.select();
    }
  };

  gateInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') submitDeumsCode();
  });

  // ── Cases à cocher ──
  var checks = Array.prototype.slice.call(document.querySelectorAll('#page-deums .deums-rule input'));
  var progress = document.getElementById('deumsCount');
  var signBtn = document.getElementById('deumsSignBtn');
  var status = document.getElementById('deumsSignStatus');

  var canvas = document.getElementById('deumsCanvas');
  var ctx = canvas.getContext('2d');
  var hint = document.getElementById('deumsHint');
  var hasSignature = false;
  var drawing = false;

  function updateState() {
    var done = checks.filter(function (c) { return c.checked; }).length;
    progress.textContent = done + ' / ' + checks.length;
    var allChecked = done === checks.length;
    signBtn.disabled = !(allChecked && hasSignature);
    if (!allChecked) status.textContent = 'Il faut cocher toutes les règles.';
    else if (!hasSignature) status.textContent = 'Il ne reste plus qu\'à signer.';
    else status.textContent = 'Tout est prêt ✓';
  }
  checks.forEach(function (c) { c.addEventListener('change', updateState); });

  // ── Signature (canvas) ──
  function resizeCanvas() {
    var ratio = window.devicePixelRatio || 1;
    var rect = canvas.getBoundingClientRect();
    if (!rect.width) return; // contenu encore caché
    var saved = hasSignature ? canvas.toDataURL() : null;
    canvas.width = rect.width * ratio;
    canvas.height = rect.height * ratio;
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    ctx.lineWidth = 2.4;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = '#00d4ff';
    if (saved) {
      var img = new Image();
      img.onload = function () { ctx.drawImage(img, 0, 0, rect.width, rect.height); };
      img.src = saved;
    }
  }
  window.addEventListener('resize', resizeCanvas);

  function pos(e) {
    var r = canvas.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  }
  canvas.addEventListener('pointerdown', function (e) {
    drawing = true;
    canvas.setPointerCapture(e.pointerId);
    var p = pos(e);
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
    ctx.lineTo(p.x + 0.01, p.y + 0.01);
    ctx.stroke();
    hint.style.display = 'none';
    hasSignature = true;
    updateState();
  });
  canvas.addEventListener('pointermove', function (e) {
    if (!drawing) return;
    var p = pos(e);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
  });
  function stop() { drawing = false; }
  canvas.addEventListener('pointerup', stop);
  canvas.addEventListener('pointercancel', stop);

  window.clearDeumsSignature = function () {
    var r = canvas.getBoundingClientRect();
    ctx.clearRect(0, 0, r.width, r.height);
    hasSignature = false;
    hint.style.display = 'flex';
    updateState();
  };

  // ── Signer le contrat ──
  window.signDeums = function () {
    if (signBtn.disabled) return;
    document.getElementById('deumsSuccessImg').src = canvas.toDataURL('image/png');
    document.getElementById('deumsSuccessDate').textContent =
      'Signé le ' + new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
    document.getElementById('deumsForm').style.display = 'none';
    document.getElementById('deumsSuccess').classList.add('show');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    try { launchCelebration(); } catch (err) { console.error('Celebration error:', err); }
  };

  // ── Tout cocher ──
  window.checkAllDeums = function () {
    checks.forEach(function (c) { c.checked = true; });
    updateState();
  };

  // ── Confettis + ballons ──
  function launchCelebration() {
    // Ballons
    var emojis = ['🎈', '🎈', '🎈', '❤️', '💖', '🎉'];
    for (var b = 0; b < 16; b++) {
      (function () {
        var el = document.createElement('div');
        el.className = 'deums-balloon';
        el.textContent = emojis[(Math.random() * emojis.length) | 0];
        el.style.left = (Math.random() * 94) + 'vw';
        var dur = 5 + Math.random() * 4;
        var delay = Math.random() * 1.8;
        el.style.animationDuration = dur + 's';
        el.style.animationDelay = delay + 's';
        document.body.appendChild(el);
        setTimeout(function () { el.remove(); }, (dur + delay) * 1000 + 200);
      })();
    }

    // Confettis
    var c = document.createElement('canvas');
    c.className = 'deums-confetti';
    document.body.appendChild(c);
    var cx = c.getContext('2d');
    var W, H;
    function size() { W = c.width = window.innerWidth; H = c.height = window.innerHeight; }
    size();

    var colors = ['#ff5a8c', '#00d4ff', '#7c3aed', '#10b981', '#ffd166', '#ffffff'];
    var parts = [];
    var up = -Math.PI / 2;

    function burst(x, y, n, angle, spread, power) {
      for (var i = 0; i < n; i++) {
        var a = angle + (Math.random() - 0.5) * spread;
        var v = power * (0.5 + Math.random() * 0.7);
        parts.push({
          x: x, y: y,
          vx: Math.cos(a) * v, vy: Math.sin(a) * v,
          w: 6 + Math.random() * 6, h: 4 + Math.random() * 5,
          rot: Math.random() * 6.28, vr: (Math.random() - 0.5) * 0.4,
          color: colors[(Math.random() * colors.length) | 0],
          life: 0, max: 160 + Math.random() * 120
        });
      }
    }

    burst(W * 0.5, H * 0.65, 150, up, Math.PI * 1.1, 17);
    setTimeout(function () {
      burst(0, H, 100, up + 0.55, 0.8, 24);
      burst(W, H, 100, up - 0.55, 0.8, 24);
    }, 400);
    setTimeout(function () { burst(W * 0.5, H * 0.45, 130, up, Math.PI * 2, 14); }, 1000);

    var start = Date.now();
    function frame() {
      cx.clearRect(0, 0, W, H);
      for (var i = parts.length - 1; i >= 0; i--) {
        var p = parts[i];
        p.vy += 0.35;
        p.vx *= 0.99;
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vr;
        p.life++;
        if (p.life > p.max || p.y > H + 30) { parts.splice(i, 1); continue; }
        cx.save();
        cx.globalAlpha = Math.max(0, 1 - p.life / p.max);
        cx.translate(p.x, p.y);
        cx.rotate(p.rot);
        cx.fillStyle = p.color;
        cx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        cx.restore();
      }
      if (parts.length || Date.now() - start < 1600) requestAnimationFrame(frame);
      else c.remove();
    }
    frame();
  }

  updateState();
})();