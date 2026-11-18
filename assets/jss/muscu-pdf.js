// ══ LK PERFORMANCE – génération du PDF (design A4) ══
// Nécessite jsPDF (assets/jss/jspdf.umd.min.js), chargé avant ce fichier.
(function () {
  'use strict';

  var C = {
    navy: [17, 24, 32], white: [255, 255, 255], cyan: [0, 212, 255], violet: [8, 145, 178],
    text: [30, 41, 59], muted: [100, 116, 139], line: [226, 232, 240], zebra: [248, 250, 252],
    upper: [8, 145, 178], upperTint: [224, 247, 252], upperTx: [56, 205, 235],
    lower: [49, 90, 125], lowerTint: [225, 233, 241 ],lowerTx: [35, 85, 120], 
    amber: [146, 64, 14], amberTint: [254, 243, 199], amberLine: [245, 158, 11],
    green: [4, 120, 87], greenTint: [209, 250, 229],
    grey: [71, 85, 105], greyTint: [226, 232, 240]
  };

  // [texte, couleur du texte, couleur du fond]
  var PILL = {
    reco:    ['RECOMMANDÉ', C.upper, C.upperTint],
    closest: ['LE PLUS PROCHE', C.lower, C.lowerTint],
    optimal: ['OPTIMAL', C.green, C.greenTint],
    option:  ['OPTION', C.upper, C.upperTint],
    alt:     ['ALTERNATIVE', C.grey, C.greyTint],
    warn:    ['DÉCONSEILLÉ', C.amber, C.amberTint],
    advice:  ['CONSEIL', C.amber, C.amberTint]
  };

  // jsPDF (polices standard) ne gère que le Latin-1 : on remplace les caractères hors jeu
  function clean(t) {
    return String(t == null ? '' : t)
      .replace(/[   ]/g, ' ')
      .replace(/[‘’]/g, "'")
      .replace(/[“”]/g, '"')
      .replace(/[–—]/g, '-')
      .replace(/…/g, '...')
      .replace(/→/g, '->')
      .replace(/≈/g, '~')
      .replace(/[^\x00-\xFF]/g, '');
  }

  function mix(a, b, t) {
    return [Math.round(a[0] + (b[0] - a[0]) * t), Math.round(a[1] + (b[1] - a[1]) * t), Math.round(a[2] + (b[2] - a[2]) * t)];
  }

  function slug(t) {
    return clean(t).normalize('NFD').replace(/[̀-ͯ]/g, '')
      .replace(/[^A-Za-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 60);
  }

  function build(d) {
    var JS = window.jspdf && window.jspdf.jsPDF;
    if (!JS) throw new Error('jsPDF non chargé');

    var doc = new JS({ unit: 'mm', format: 'a4', compress: true });
    var W = 210, H = 297, M = 15, CW = W - 2 * M, BOTTOM = H - 18;
    var y = 0;
    var zoneCol = { upper: [C.upper, C.upperTint, C.upperTx], lower: [C.lower, C.lowerTint, C.lowerTx] };
    /* ── outils ── */
    function fill(c) { doc.setFillColor(c[0], c[1], c[2]); }
    function draw(c) { doc.setDrawColor(c[0], c[1], c[2]); }
    function ink(c) { doc.setTextColor(c[0], c[1], c[2]); }
    function font(style, size) { doc.setFont('helvetica', style); doc.setFontSize(size); }
    function lh(size) { return size * 0.3528 * 1.3; }
    function wrap(text, w, style, size) { font(style, size); return doc.splitTextToSize(clean(text), w); }
    // Écrit des lignes à partir du haut yTop, renvoie le bas
    function paint(lines, x, yTop, size, style, col) {
      font(style, size); ink(col);
      var yy = yTop + size * 0.3528 * 0.85;
      lines.forEach(function (ln) { doc.text(ln, x, yy); yy += lh(size); });
      return yTop + lines.length * lh(size);
    }
    function gradientBar(x, yy, w, h) {
      var n = 70;
      for (var i = 0; i < n; i++) {
        fill(mix(C.violet, C.cyan, i / (n - 1)));
        doc.rect(x + i * w / n, yy, w / n + 0.3, h, 'F');
      }
    }
    function logo(x, yy, size) {
      font('bold', size); ink(C.white);
      doc.text('LK', x, yy);
      var w = doc.getTextWidth('LK');
      ink(C.cyan); doc.text('.', x + w, yy);
    }
    function ensure(h) { if (y + h > BOTTOM) newPage(); }

    /* ── en-têtes ── */
    function firstHeader() {
      fill(C.navy); doc.rect(0, 0, W, 46, 'F');
      gradientBar(0, 46, W, 1.4);
      logo(M, 18, 22);
      font('normal', 7.5); ink([148, 163, 184]);
      doc.setCharSpace(1.6); doc.text('PERFORMANCE', M, 23.5); doc.setCharSpace(0);
      var now = new Date();
      var dstr = ('0' + now.getDate()).slice(-2) + '/' + ('0' + (now.getMonth() + 1)).slice(-2) + '/' + now.getFullYear();
      doc.text('Généré le ' + dstr, W - M, 18, { align: 'right' });
      font('bold', 16); ink(C.white);
      doc.text('Mon programme de musculation', M, 33);
      var prof = (d.gender === 'femme' ? 'Femme' : 'Homme') + '  |  ' + d.total + ' séance' + (d.total > 1 ? 's' : '') + ' par semaine  |  ' +
        (d.unknown ? 'Répartition : non précisée' : d.upper + ' haut du corps / ' + d.lower + ' bas du corps');
      font('normal', 8.5); ink(C.cyan);
      doc.text(clean(prof), M, 40);
      y = 57;
    }
    function slimHeader() {
      fill(C.navy); doc.rect(0, 0, W, 13, 'F');
      gradientBar(0, 13, W, 0.8);
      logo(M, 9, 11);
      font('normal', 7.5); ink([148, 163, 184]);
      var t = wrap(d.title, 120, 'normal', 7.5)[0] || '';
      doc.text(t, W - M, 8.3, { align: 'right' });
      y = 23;
    }
    function newPage() { doc.addPage(); slimHeader(); }

    /* ── composants ── */
    function pill(x, yy, label, tc, bg) {
      font('bold', 6.5);
      var w = doc.getTextWidth(clean(label)) + 6;
      fill(bg); doc.roundedRect(x, yy, w, 5.2, 2.6, 2.6, 'F');
      ink(tc); doc.text(clean(label), x + 3, yy + 3.65);
      return w;
    }

    function noteBox(text, tint, bar, tcol, bold) {
      var lines = wrap(text, CW - 9, bold ? 'bold' : 'normal', 8);
      var h = lines.length * lh(8) + 5;
      ensure(h + 3);
      fill(tint); doc.roundedRect(M, y, CW, h, 1.6, 1.6, 'F');
      fill(bar); doc.rect(M, y + 1, 1.3, h - 2, 'F');
      paint(lines, M + 5, y + 2.5, 8, bold ? 'bold' : 'normal', tcol);
      y += h + 3;
    }

    function weekChips() {
      var wk = d.week || d.seq, n = wk.length, gap = 2.2;
      var cw = (CW - gap * (n - 1)) / n;
      var items = wk.map(function (s) {
        return s.rest ? ['Repos'] : wrap(s.label, cw - 5, 'bold', 6.8);
      });
      var maxL = Math.max.apply(null, items.map(function (l) { return l.length; }));
      var ch = 5.2 + maxL * lh(6.8) + 3.4;
      ensure(ch + 12);
      font('bold', 7); ink(C.muted);
      doc.text('TA SEMAINE TYPE (7 JOURS)', M, y + 2.5);
      y += 6;
      var num = 0;
      wk.forEach(function (s, i) {
        var x = M + i * (cw + gap);
        if (s.rest) {
          draw(C.muted); doc.setLineWidth(0.3); doc.setLineDashPattern([1.4, 1.4], 0);
          doc.roundedRect(x, y, cw, ch, 1.8, 1.8, 'S'); doc.setLineDashPattern([], 0);
          font('bold', 5.4); ink(C.muted); doc.text('JOUR ' + (i + 1), x + 2.5, y + 4);
          paint(items[i], x + 2.5, y + 5.4, 6.8, 'bold', C.muted);
        } else {
          num++;
          var zc = zoneCol[s.zone];
          fill(zc[1]); doc.roundedRect(x, y, cw, ch, 1.8, 1.8, 'F');
          fill(zc[0]); doc.rect(x, y + 1.2, 1, ch - 2.4, 'F');
          font('bold', 5.4); ink(C.muted); doc.text('JOUR ' + (i + 1), x + 3, y + 4);
          paint(items[i], x + 3, y + 5.4, 6.8, 'bold', zc[0]);
        }
      });
      y += ch + 8;
    }

    /* ── séance (tableau d'exercices) ── */
    var X0 = M, X1 = M + 88, X2 = M + 118, X3 = M + 144;
    function layoutRows(s) {
      return s.ex.map(function (e) {
        var nameL = wrap(e.n, X1 - X0 - 5, 'bold', 8.5);
        var tipL = e.tip ? wrap(e.tip, X1 - X0 - 5, 'italic', 7) : [];
        var setsL = wrap(e.s, X2 - X1 - 3, 'normal', 8);
        var repsL = wrap(e.r, X3 - X2 - 3, 'normal', 8);
        var restL = wrap(e.rest, M + CW - X3 - 2, 'normal', 8);
        var left = nameL.length * lh(8.5) + tipL.length * lh(7) + (tipL.length ? 0.6 : 0);
        var right = Math.max(setsL.length, repsL.length, restL.length) * lh(8);
        return { nameL: nameL, tipL: tipL, setsL: setsL, repsL: repsL, restL: restL, h: Math.max(left, right) + 4.6 };
      });
    }

    function sessionBlock(s) {
      var zc = zoneCol[s.zone];
      var rows = layoutRows(s);
      var muscL = wrap(s.muscles, CW, 'italic', 8);
      var introL = s.intro ? wrap(s.intro, CW - 9, 'normal', 7.5) : [];
      var remL = s.remarks ? s.remarks.map(function (r) { return wrap(r, CW - 14, 'normal', 7.5); }) : [];

      var h = 11 + 2 + muscL.length * lh(8) + 2;
      if (introL.length) h += introL.length * lh(7.5) + 5 + 2;
      h += 7;
      rows.forEach(function (r) { h += r.h; });
      if (remL.length) {
        h += 4 + 6;
        remL.forEach(function (l) { h += l.length * lh(7.5) + 1.2; });
      }
      h += 10;
      ensure(h);

      // bandeau
      fill(zc[0]); doc.roundedRect(M, y, CW, 11, 2, 2, 'F');
      font('bold', 10.5); ink(C.white);
      doc.text(clean(s.title), M + 4.5, y + 7.1);
      font('normal', 7.5);
      var meta = '~' + s.minutes + ' min  |  ' + s.freq + 'x par semaine  |  ' + s.ex.length + ' exercices';
      doc.text(clean(meta), M + CW - 4.5, y + 7, { align: 'right' });
      y += 13;

      y = paint(muscL, M, y, 8, 'italic', C.muted) + 2;

      if (introL.length) {
        var ih = introL.length * lh(7.5) + 5;
        fill(zc[1]); doc.roundedRect(M, y, CW, ih, 1.5, 1.5, 'F');
        paint(introL, M + 4.5, y + 2.5, 7.5, 'normal', zc[0]);
        y += ih + 2;
      }

      // en-tête du tableau
      fill(zc[1]); doc.rect(M, y, CW, 7, 'F');
      font('bold', 6.5); ink(zc[0]);
      doc.text('EXERCICE', X0 + 2.5, y + 4.6);
      doc.text('SÉRIES', X1, y + 4.6);
      doc.text('REPS', X2, y + 4.6);
      doc.text('REPOS', X3, y + 4.6);
      y += 7;

      rows.forEach(function (r, i) {
        if (i % 2 === 1) { fill(C.zebra); doc.rect(M, y, CW, r.h, 'F'); }
        var ty = y + 2.3;
        var bottom = paint(r.nameL, X0 + 2.5, ty, 8.5, 'bold', C.text);
        if (r.tipL.length) paint(r.tipL, X0 + 2.5, bottom + 0.6, 7, 'italic', C.muted);
        paint(r.setsL, X1, ty, 8, 'normal', C.text);
        paint(r.repsL, X2, ty, 8, 'bold', zc[0]);
        paint(r.restL, X3, ty, 8, 'normal', C.text);
        draw(C.line); doc.setLineWidth(0.2); doc.line(M, y + r.h, M + CW, y + r.h);
        y += r.h;
      });

      if (remL.length) {
        y += 4;
        var rh = 6;
        remL.forEach(function (l) { rh += l.length * lh(7.5) + 1.2; });
        rh += 1;
        fill(C.upperTint); doc.roundedRect(M, y, CW, rh, 1.5, 1.5, 'F');
        font('bold', 6.5); ink(C.upper); doc.text('REMARQUES', M + 4.5, y + 4.3);
        var ry = y + 6.5;
        remL.forEach(function (l) {
          fill(C.upper); doc.circle(M + 5.5, ry + 1.5, 0.55, 'F');
          ry = paint(l, M + 8.5, ry, 7.5, 'normal', C.text) + 1.2;
        });
        y += rh;
      }
      if (s.derived) {
        y += 2.5;
        y = paint(['Mêmes exercices que les séances Push / Pull, regroupés autrement.'], M, y, 7, 'italic', C.muted);
      }
      y += 8;
    }

    /* ── repères de lecture ── */
    function legendBlock() {
      var items = d.legend;
      var laid = items.map(function (l) { return { t: l.t, lines: wrap(l.x, CW - 12, 'normal', 8) }; });
      var h = 11;
      laid.forEach(function (l) { h += lh(8.5) + l.lines.length * lh(8) + 2.6; });
      h += 3;
      ensure(h);
      fill(C.navy); doc.roundedRect(M, y, CW, 9, 2, 2, 'F');
      font('bold', 9); ink(C.white);
      doc.text('COMMENT SUIVRE CE PROGRAMME', M + 4.5, y + 6);
      y += 9;
      fill(C.zebra); doc.rect(M, y, CW, h - 9, 'F');
      var yy = y + 3;
      laid.forEach(function (l) {
        fill(C.navy); doc.circle(M + 5, yy + 1.9, 0.8, 'F');
        yy = paint([l.t], M + 8.5, yy, 8.5, 'bold', C.text);
        yy = paint(l.lines, M + 8.5, yy, 8, 'normal', C.muted) + 2.6;
      });
      y += h - 9 + 4;
    }

    function tipsBlock() {
      var tl = (d.tips || []).map(function (t) { return wrap(t, CW - 14, 'normal', 8); });
      if (!tl.length) return;
      var h = 11;
      tl.forEach(function (l) { h += l.length * lh(8) + 2.4; });
      h += 2;
      ensure(h);
      fill(C.cyan); doc.roundedRect(M, y, CW, 9, 2, 2, 'F');
      font('bold', 9); ink(C.navy);
      doc.text('CONSEILS POUR UN DÉBUTANT', M + 4.5, y + 6);
      y += 9;
      fill(C.upperTint); doc.rect(M, y, CW, h - 9, 'F');
      var yy = y + 3.2;
      tl.forEach(function (l) {
        fill(C.upper); doc.circle(M + 6, yy + 1.7, 0.8, 'F');
        yy = paint(l, M + 9, yy, 8, 'normal', C.text) + 2.4;
      });
      y += h - 9 + 4;
    }

    /* ══ MISE EN PAGE ══ */
    firstHeader();

    // pastilles (statut + priorité)
    var px = M;
    var pi = PILL[d.badge];
    if (pi) px += pill(px, y, pi[0], pi[1], pi[2]) + 2.5;
    if (d.rank) pill(px, y, 'PRIORITÉ N°' + d.rank, C.upper, C.upperTint);
    y += 8;

    // titre + description
    var titleL = wrap(d.title, CW, 'bold', 16);
    y = paint(titleL, M, y, 16, 'bold', C.navy) + 2;
    y = paint(wrap(d.desc, CW, 'normal', 9), M, y, 9, 'normal', C.muted) + 4;

    if (d.rankNote) noteBox(d.rankNote, C.upperTint, C.upper, C.text, false);
    if (d.note) noteBox(d.note, C.greyTint, C.grey, C.text, false);
    if (d.warnNote) noteBox(d.warnNote, C.amberTint, C.amberLine, C.amber, false);

    weekChips();
    d.sessions.forEach(sessionBlock);
    legendBlock();
    tipsBlock();

    // pieds de page
    var n = doc.getNumberOfPages();
    for (var i = 1; i <= n; i++) {
      doc.setPage(i);
      draw(C.line); doc.setLineWidth(0.25); doc.line(M, H - 13, W - M, H - 13);
      font('normal', 7); ink(C.muted);
      doc.text('LK Performance  |  Ton programme personnalisé', M, H - 8.5);
      doc.text('Page ' + i + ' / ' + n, W - M, H - 8.5, { align: 'right' });
    }
    return doc;
  }

  function download(d) {
    var doc = build(d);
    var name = 'LK-Performance_' + (d.gender === 'femme' ? 'Femme' : 'Homme') + '_' + slug(d.title) + '.pdf';
    doc.save(name);
    return name;
  }

  window.MuscuPDF = { build: build, download: download };
})();