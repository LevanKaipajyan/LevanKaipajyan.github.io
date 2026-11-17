// ══ LK PERFORMANCE – questionnaire + propositions de programmes ══
(function () {
  'use strict';

  /* ───────────────────────── EXERCICES ─────────────────────────
     X(nom, séries, répétitions, conseil) */
  // Repos : 3 minutes entre chaque série, pour tous les exercices
  var REST_LABEL = '3 min', REST_SEC = 180;
  function X(n, s, r, tip) {
    return { n: n, s: s, r: r, rest: REST_LABEL, sec: REST_SEC, tip: tip || '' };
  }

  // ── Homme (tes séances) ──
  var M = {
    butterfly: X('Papillon (Butterfly / Pec Fly)', '1 chauffe + 3', '8', 'Isolation pour préparer les pectoraux avant le travail de force. Amplitude complète, retour contrôlé.'),
    bench:     X('Développé couché machine ou haltères, ou incliné à la Smith Machine', '1 chauffe + 3', '8', 'Omoplates serrées, descente contrôlée.'),
    benchUp:   X('Développé incliné à la Smith Machine ou développé couché machine / haltères', '1 chauffe + 3', '8', 'Omoplates serrées, descente contrôlée.'),
    dips:      X('Dips (lestés si possible)', '3 à 4', '8', 'Ajoute du lest dès que les 8 répétitions sont maîtrisées.'),
    triExt:    X('Extension triceps poulie derrière la tête', '3', '8', 'Coudes fixes et serrés, étirement complet du triceps.'),
    dipsOrTri: X('Dips ou Extension triceps poulie derrière la tête', '3', '8', 'Choisis l’un des deux selon ton niveau.'),
    military:  X('Développé militaire machine ou haltères', '1 chauffe + 3', '8', 'Abdos serrés, sans cambrer le bas du dos.'),
    lateral:   X('Élévations latérales à la poulie ou haltères', '3', '10-15', 'Charge modérée, mouvement contrôlé, sans élan.'),
    pullup:    X('Tractions lestées ou tirage vertical', '1 chauffe + 3', '8', 'Tire avec les coudes, poitrine vers la barre.'),
    row:       X('Rowing (tirage horizontal, machine ou banc)', '1 chauffe + 3', '8', 'Dos gainé, serre les omoplates en fin de mouvement.'),
    rearDelt:  X('Arrière d’épaules au Pec Fly', '3', '10-15', 'Mouvement lent, sans élan.'),
    curl:      X('Curl biceps à la poulie ou unilatéral', '1 chauffe + 3', '8', 'Coudes près du corps, descente contrôlée.'),
    hammer:    X('Curl marteau', '1 chauffe + 3', '8', 'Prise neutre, sans balancer le buste.'),
    squat:     X('Squat', '1 à 2 chauffe + 3', '8', 'Dos neutre, genoux dans l’axe des pieds, descente contrôlée.'),
    rdl:       X('RDL (Romanian Deadlift) ou Leg Curl', '1 chauffe + 3', '8', 'RDL : dos neutre, bassin vers l’arrière. Leg Curl : retour contrôlé.'),
    legExt:    X('Leg Extension', '1 chauffe + 3', '8', 'Courte pause en contraction.'),
    adduct:    X('Adducteurs à la machine', '3', '10-12', 'Mouvement lent et contrôlé, sans à-coups.'),
    calves:    X('Mollets (exercice au choix)', '3', '10-15', 'Amplitude complète, pause en haut et en bas.'),
    crunch:    X('Crunch abdominaux', '3', '12-20', 'Expire à la contraction, sans tirer sur la nuque.'),
    faBack:    X('Curl avant-bras (arrière)', '3', '10-15', 'Charge modérée, amplitude complète.'),
    faFront:   X('Curl avant-bras (avant)', '3', '10-15', 'Charge modérée, amplitude complète.'),
    wrist:     X('Curl poignet à la poulie', '3', '10-15', 'Charge modérée, amplitude complète.')
  };

  // ── Femme (variantes proposées : accent fessiers, fourchettes 8-12) ──
  var F = {
    hipThrust: X('Hip thrust (barre ou machine)', '1 chauffe + 3', '8-12', 'Menton rentré, pause d’une seconde en haut en serrant les fessiers.'),
    squat:     X('Squat ou presse à cuisses', '1 à 2 chauffe + 3', '8-12', 'Descente contrôlée, genoux dans l’axe des pieds.'),
    rdl:       X('RDL (Romanian Deadlift) haltères ou barre', '1 chauffe + 3', '8-12', 'Dos neutre, bassin vers l’arrière, étirement des ischio-jambiers.'),
    abduct:    X('Abduction à la machine', '3', '12-20', 'Mouvement lent, sans élan.'),
    calves:    X('Mollets (exercice au choix)', '3', '10-15', 'Amplitude complète, pause en haut et en bas.'),
    crunch:    X('Crunch abdominaux', '3', '12-20', 'Expire à la contraction, sans tirer sur la nuque.'),
    butterfly: X('Papillon (Pec Fly)', '3', '10-12', 'Isolation pour préparer les pectoraux avant le travail de force.'),
    benchInc:  X('Développé incliné haltères ou Smith Machine', '1 chauffe + 3', '8-12', 'Omoplates serrées, descente contrôlée.'),
    military:  X('Développé militaire machine ou haltères', '1 chauffe + 3', '8-12', 'Abdos serrés, sans cambrer le bas du dos.'),
    lateral:   X('Élévations latérales à la poulie ou haltères', '3', '12-15', 'Charge modérée, mouvement contrôlé, sans élan.'),
    triExt:    X('Extension triceps poulie derrière la tête', '3', '10-12', 'Coudes fixes et serrés, étirement complet.'),
    triPush:   X('Pushdown triceps à la corde', '3', '10-15', 'Coudes fixes le long du corps.'),
    pulldown:  X('Tirage vertical ou tractions assistées', '1 chauffe + 3', '8-12', 'Tire avec les coudes, poitrine vers la barre.'),
    row:       X('Rowing (tirage horizontal, machine ou banc)', '1 chauffe + 3', '8-12', 'Dos gainé, serre les omoplates en fin de mouvement.'),
    rearDelt:  X('Arrière d’épaules au Pec Fly', '3', '12-15', 'Mouvement lent, sans élan.'),
    curl:      X('Curl biceps à la poulie ou haltères', '3', '10-12', 'Coudes près du corps, descente contrôlée.'),
    hammer:    X('Curl marteau', '3', '10-12', 'Prise neutre, sans balancer le buste.')
  };

  // ── Exercices communs aux séances Pecs/Biceps/Triceps, Dos/Épaules, Push et Pull ──
  // (les mêmes exercices, simplement regroupés autrement ; seule la fourchette de reps change selon le genre)
  function blocks(w) {
    var H = w ? '8-12' : '8', I = '10-12';
    return {
      pecFly:   X('Butterfly unilatéral', '1 chauffe + 3', H, 'Isolation pour préparer les pectoraux avant le travail de force. Amplitude complète, retour contrôlé.'),
      bench:    X('Développé couché (machine ou haltères)', '1 chauffe + 3', H, 'Omoplates serrées, descente contrôlée.'),
      pecCable: X('Poulie basse unilatérale (pectoraux)', '3', I, 'Du bas vers le haut, contraction en fin de mouvement.'),
      hammer:   X('Curl marteau', '3', H, 'Prise neutre, sans balancer le buste.'),
      curlBar:  X('Curl barre ou curl poulie prise inversée', '3', H, 'Coudes près du corps, descente contrôlée.'),
      curlBack: X('Curl poulie unilatéral, bras derrière le dos', '3', I, 'Bras en arrière pour étirer le biceps, mouvement lent.'),
      triOver:  X('Extension haltère derrière la tête ou barre au front', '3', H, 'Coudes fixes et serrés, étirement complet du triceps.'),
      triCable: X('Extension triceps à la poulie (corde ou barre)', '3', I, 'Coudes fixes le long du corps.'),
      pull:     X(w ? 'Traction assistée ou tirage vertical à la machine' : 'Traction ou tirage vertical à la machine', '1 chauffe + 3', H, 'Tire avec les coudes, poitrine vers la barre.'),
      pullUni:  X('Tirage vertical unilatéral', '3', H, 'Contraction du dos en fin de mouvement, sans élan.'),
      rowWide:  X('Tirage horizontal prise large', '3', H, 'Dos gainé, serre les omoplates en fin de mouvement.'),
      trap:     X('Trapèzes (shrugs)', '3', I, 'Hausse les épaules verticalement, pause en haut.'),
      press:    X('Développé militaire', '1 chauffe + 3', H, 'Abdos serrés, sans cambrer le bas du dos.'),
      lateral:  X('Élévations latérales (haltères, poulie ou machine)', '3', '10-15', 'Charge modérée, mouvement contrôlé, sans élan.'),
      rearFly:  X('Butterfly inversé', '3', '10-15', 'Mouvement lent, sans élan.')
    };
  }
  var BM = blocks(false), BF = blocks(true);
  function pecs(b)    { return [b.pecFly, b.bench, b.pecCable]; }
  function biceps(b)  { return [b.hammer, b.curlBar, b.curlBack]; }
  function triceps(b) { return [b.triOver, b.triCable]; }
  function dos(b)     { return [b.pull, b.pullUni, b.rowWide, b.trap]; }
  function epaules(b) { return [b.press, b.lateral, b.rearFly]; }

  /* ───────────────────────── SÉANCES ───────────────────────── */
  function S(label, title, zone, muscles, ex, extra) {
    var o = { label: label, title: title, zone: zone, muscles: muscles, ex: ex };
    if (extra) Object.keys(extra).forEach(function (k) { o[k] = extra[k]; });
    return o;
  }

  var REMARKS_PUSH_M = [
    'Pas besoin de faire deux développés couchés différents : cela ajoute de la fatigue inutilement.',
    'Commencer par l’isolation des pectoraux permet de bien les préparer avant le travail de force.',
    'Commencer par l’isolation des pectoraux permet de bien les préparer avant le travail de force.'
  ];
  var REMARKS_PUSH_F = REMARKS_PUSH_M;

  var LOWER_M = [M.squat, M.rdl, M.legExt, M.adduct, M.calves, M.crunch, M.faBack, M.faFront, M.wrist];
  var LEGS_M = [
    M.legExt,
    X('Squat ou presse à cuisses', '1 à 2 chauffe + 3', '8', 'Dos neutre, genoux dans l’axe des pieds, descente contrôlée.'),
    M.rdl, M.adduct, M.calves, M.crunch, M.faFront, M.faBack, M.wrist
  ];
  var REMARKS_LEGS_M = [
    'Il est conseillé de travailler aussi les fessiers : ajouter un exercice pour les fessiers, comme le hip thrust, n’est donc pas à bannir.'
  ];
  var LOWER_F = [F.hipThrust,F.squat, F.rdl, X('Adduction à la machine', '1 chauffe + 3 lourdes', '8', 'Séries lourdes, mouvement contrôlé.'), F.abduct, F.calves, F.crunch];

  var LEGS_F = [
    X('Hip thrust', '1 chauffe + 3', '8', 'Dernière série : 8 pulses (petits mouvements en haut) puis 8 répétitions avec arrêt (pause d’une seconde en haut). Menton rentré, fessiers serrés.'),
    X('Squat à la barre, presse à cuisses ou hack squat', '1 chauffe + 3', '8', 'Descente contrôlée, genoux dans l’axe des pieds.'),
    X('RDL (Romanian Deadlift) ou Leg Curl', '3', '8', 'RDL : dos neutre, bassin vers l’arrière. Leg Curl : retour contrôlé.'),
    X('Adduction à la machine', '1 chauffe + 3 lourdes', '8', 'Séries lourdes, mouvement contrôlé.'),
    X('Abduction à la machine', '1 chauffe + 3 lourdes', '8', 'Séries lourdes, mouvement contrôlé.'),
    X('Leg Extension', '3', '12', 'Courte pause en contraction.'),
    X('Mollets à la Smith Machine', '3', '10-15', 'Amplitude complète, pause en haut et en bas.'),
    F.crunch
  ];
  var INTRO_F_LEGS = 'Programme Legs adapté aux femmes : priorité aux fessiers et aux adducteurs / abducteurs, avec des séries lourdes à 8 répétitions.';

  var INTRO_F_LOWER = 'Version adaptée pour les femmes : accent sur les fessiers, avec des fourchettes de répétitions un peu plus larges (8 à 12).';
  var INTRO_F_UPPER = 'Version adaptée : fourchettes de 8 à 12 répétitions sur les mouvements principaux, tractions assistées possibles.';

  var SESS = {
    homme: {
      upper: S('Upper', 'UPPER – Haut du corps', 'upper', 'Pectoraux · Dos · Épaules · Biceps · Triceps',
        [M.butterfly, M.benchUp, M.pullup, M.row, M.military, M.lateral, M.dipsOrTri, M.curl]),
      lower: S('Lower', 'LOWER – Bas du corps', 'lower', 'Quadriceps · Ischio-jambiers · Adducteurs · Mollets · Abdominaux · Avant-bras', LOWER_M, { remarks: REMARKS_LEGS_M }),
      push:  S('Push', 'PUSH – Pectoraux, triceps, épaules', 'upper', 'Pectoraux · Triceps · Épaules',
        pecs(BM).concat(triceps(BM), epaules(BM)), { remarks: REMARKS_PUSH_M }),
      pull:  S('Pull', 'PULL – Dos, biceps', 'upper', 'Dos · Biceps',
        dos(BM).concat(biceps(BM))),
      legs:  S('Legs', 'LEGS – Jambes, abdominaux, avant-bras', 'lower', 'Jambes · Adducteurs · Abdominaux · Avant-bras', LEGS_M, { remarks: REMARKS_LEGS_M }),
      pbt:   S('Pecs · Biceps · Triceps', 'PECS – BICEPS – TRICEPS', 'upper', 'Pectoraux · Biceps · Triceps',
        pecs(BM).concat(biceps(BM), triceps(BM)), { derived: true }),
      dea:   S('Dos · Épaules', 'DOS – ÉPAULES', 'upper', 'Dos · Épaules',
        dos(BM).concat(epaules(BM)), { derived: true })
    },
    femme: {
      upper: S('Upper', 'UPPER – Haut du corps', 'upper', 'Pectoraux · Dos · Épaules · Biceps · Triceps',
        [F.butterfly, F.benchInc, F.pulldown, F.row, F.military, F.lateral, F.triExt, F.curl], { intro: INTRO_F_UPPER }),
      lower: S('Lower', 'LOWER – Bas du corps (fessiers & jambes)', 'lower', 'Quadriceps · Fessiers · Ischio-jambiers · Adducteurs · Mollets · Abdominaux',
        LOWER_F, { intro: INTRO_F_LOWER }),
      push:  S('Push', 'PUSH – Pectoraux, triceps, épaules', 'upper', 'Pectoraux · Triceps · Épaules',
        pecs(BF).concat(triceps(BF), epaules(BF)), { remarks: REMARKS_PUSH_F, intro: INTRO_F_UPPER }),
      pull:  S('Pull', 'PULL – Dos, biceps', 'upper', 'Dos · Biceps',
        dos(BF).concat(biceps(BF)), { intro: INTRO_F_UPPER }),
      legs:  S('Legs', 'LEGS – Fessiers & jambes', 'lower', 'Fessiers · Cuisses · Adducteurs · Abducteurs · Mollets · Abdominaux',
        LEGS_F, { intro: INTRO_F_LEGS }),
      pbt:   S('Pecs · Biceps · Triceps', 'PECS – BICEPS – TRICEPS', 'upper', 'Pectoraux · Biceps · Triceps',
        pecs(BF).concat(biceps(BF), triceps(BF)), { derived: true, intro: INTRO_F_UPPER }),
      dea:   S('Dos · Épaules', 'DOS – ÉPAULES', 'upper', 'Dos · Épaules',
        dos(BF).concat(epaules(BF)), { derived: true, intro: INTRO_F_UPPER })
    }
  };

  /* Durée estimée : chauffe ≈ 75 s, série de travail ≈ 45 s d'effort + repos indiqué */
  function parseSets(str) {
    var m = str.match(/(\d+)(?:\s*à\s*(\d+))?\s*chauffe\s*\+\s*(\d+)/);
    if (m) return { warm: m[2] ? parseInt(m[2], 10) : parseInt(m[1], 10), work: parseInt(m[3], 10) };
    m = str.match(/^(\d+)(?:\s*à\s*(\d+))?$/);
    if (m) return { warm: 0, work: m[2] ? parseInt(m[2], 10) : parseInt(m[1], 10) };
    return { warm: 0, work: 3 };
  }
  function estimateMinutes(ex) {
    var sec = 0;
    ex.forEach(function (e) {
      var p = parseSets(e.s);
      sec += p.warm * 75 + p.work * (45 + e.sec);
    });
    return Math.max(10, Math.round(sec / 60 / 5) * 5);
  }

  /* Repères de lecture (affichés à l'écran et dans le PDF) */
  var LEGEND = [
    { t: 'Chauffe', x: 'Une série de chauffe est une série plus légère (environ 50 à 60 % de ta charge de travail) pour préparer le muscle et les articulations. Elle ne se fait pas à l’échec.' },
    { t: 'Série de travail', x: 'Ce sont tes vraies séries : essaie d’atteindre l’échec à 8 répétitions. Si tu n’atteins pas l’échec à 8 répétitions (tu pourrais en faire plus), monte le poids.' },
    { t: 'Repos entre les séries', x: 'Respecte 3 min de repos entre chaque série.' },
    { t: 'Progression', x: 'Quand tu réalises toutes tes séries en haut de la fourchette de répétitions avec une bonne technique, augmente légèrement la charge à la séance suivante.' },
    { t: 'À savoir', x: 'Ces repères sont des recommandations générales. En cas de douleur ou de doute, demande conseil à un coach ou à un professionnel de santé.' }
  ];

  /* Conseils pour un débutant */
  var TIPS = [
    'Chaque muscle est à travailler 2 fois par semaine pour une prise de muscle optimale.',
    'Haut du corps : les muscles du haut du corps ont besoin de 48 h de repos dans l’idéal.',
    'Jambes : les jambes ont besoin de 48 à 72 h de repos entre deux séances : 2 à 3 fois par semaine au maximum, 2 fois étant le plus recommandé.'
  ];

  /* ───────────────────────── LOGIQUE : propositions ───────────────────────── */
  function countZones(seq) {
    var u = 0, l = 0;
    seq.forEach(function (k) {
      if (k === 'rest') return;
      if (SESS.homme[k].zone === 'upper') u++; else l++;
    });
    return { u: u, l: l };
  }

  /* Semaine type sur 7 jours : place des séances et des jours de repos (idéal de récupération) */
  var R = 'rest';
  var WEEKS = {
    uu:      ['upper', R, R, 'upper', R, R, R],
    ll:      ['lower', R, R, 'lower', R, R, R],
    ulmin:   ['upper', R, R, 'lower', R, R, R],
    ulu:     ['upper', R, 'lower', R, 'upper', R, R],
    lul:     ['lower', R, 'upper', R, 'lower', R, R],
    ulul:    ['upper', R, 'lower', R, 'upper', R, 'lower'],
    splitA:  ['pbt', 'dea', R, 'pbt', 'dea', R, R],
    splitB:  ['push', 'pull', R, 'push', 'pull', R, R],
    ulPP:    ['upper', 'lower', R, 'push', 'pull', 'legs', R],
    ulAB:    ['upper', 'lower', R, 'pbt', 'dea', 'legs', R],
    ppl5:    ['push', 'pull', 'legs', R, 'push', 'pull', R],
    ppl6:    ['push', 'pull', 'legs', R, 'push', 'pull', 'legs'],
    reduce5: ['upper', 'lower', R, 'push', 'pull', 'legs', R]
  };

  function P(id, title, desc, seq, extra) {
    var c = countZones(seq);
    var p = { id: id, title: title, desc: desc, seq: seq, week: WEEKS[id] || seq, u: c.u, l: c.l, note: '', badge: 'alt', prio: 1, ranked: false, dist: 0 };
    if (extra) Object.keys(extra).forEach(function (k) { p[k] = extra[k]; });
    return p;
  }

  function candidates(total, lower, unknown) {
    switch (total) {
      case 1:
      case 2:
        return [
          P('uu', 'Upper / Upper',
            'Tu ne travailles que le haut du corps, mais 2 fois dans la semaine : c’est le minimum pour chaque muscle, et l’option la plus efficace quand on ne peut pas faire plus.',
            ['upper', 'upper']),
          P('ll', 'Lower / Lower',
            'Tu ne travailles que le bas du corps, mais 2 fois dans la semaine : c’est le minimum pour chaque muscle, et l’option la plus efficace quand on ne peut pas faire plus.',
            ['lower', 'lower']),
          P('ulmin', 'Upper / Lower (minimum)',
            'Haut et bas du corps, mais une seule fois chacun. Chaque muscle n’est stimulé qu’une fois par semaine : ça reste possible, mais c’est peu.',
            ['upper', 'lower'], { avoid: true })
        ];
      case 3:
        return [
          P('ulu', 'Upper / Lower / Upper',
            'Haut, bas, haut : le haut du corps est travaillé 2 fois, le bas 1 fois. Choisis cette version si tu veux prioriser le haut du corps.',
            ['upper', 'lower', 'upper']),
          P('lul', 'Lower / Upper / Lower',
            'Bas, haut, bas : le bas du corps est travaillé 2 fois, le haut 1 fois. Choisis cette version si tu veux prioriser les jambes.',
            ['lower', 'upper', 'lower'])
        ];
      case 4:
        var list = [
          P('ulul', 'Upper / Lower / Upper / Lower',
            'Chaque zone est travaillée 2 fois par semaine : chaque groupe musculaire est stimulé deux fois et la fatigue est mieux répartie.',
            ['upper', 'lower', 'upper', 'lower'])
        ];
        if (lower === 0 || unknown) {
          list.push(
            P('splitA', 'Haut du corps ×4 – Pecs·Biceps·Triceps / Dos·Épaules',
              '4 séances de haut du corps séparées en 2 types de séances différentes, chacune répétée 2 fois.',
              ['pbt', 'dea', 'pbt', 'dea']),
            P('splitB', 'Haut du corps ×4 – Push (Pecs·Triceps·Épaules) / Pull (Dos·Biceps)',
              '4 séances de haut du corps séparées en 2 types de séances différentes (une version Push, une version Pull), chacune répétée 2 fois.',
              ['push', 'pull', 'push', 'pull'])
          );
        }
        return list;
      case 5:
        // Classés par ordre d'importance (priorité 1 = le meilleur choix)
        return [
          P('ulPP', 'Upper / Lower / Push / Pull / Legs',
            'Le programme le plus complet : une séance Upper, une séance Lower, puis le haut du corps séparé en Push et Pull, et une séance Legs. Les jambes sont travaillées 2 fois dans la semaine.',
            ['upper', 'lower', 'push', 'pull', 'legs'],
            { prio: 1, rankNote: 'Priorité n°1 : le plus complet, avec les jambes travaillées 2 fois par semaine.' }),
          P('ulAB', 'Upper / Lower / Pecs·Biceps·Triceps / Dos·Épaules / Legs',
            'Même principe, avec un autre découpage du haut du corps : Pecs·Biceps·Triceps d’un côté, Dos·Épaules de l’autre. Les jambes sont travaillées 2 fois.',
            ['upper', 'lower', 'pbt', 'dea', 'legs'],
            { prio: 2, rankNote: 'Priorité n°2 : même structure que le n°1, avec un découpage différent du haut du corps.' }),
          P('ppl5', 'PPL – 5 séances',
            'Push / Pull / Legs / Repos / Push / Pull : le haut du corps passe 2 fois, mais les jambes une seule fois sur le cycle.',
            ['push', 'pull', 'legs', 'rest', 'push', 'pull'],
            { prio: 3, rankNote: 'Priorité n°3 : moins optimal, les jambes ne sont travaillées qu’une seule fois.',
              warnNote: 'Les jambes ne sont travaillées qu’une seule fois par semaine : c’est moins optimal que les deux programmes ci-dessus.' })
        ];
      case 6:
        return [
          P('ppl6', 'PPL ×2 – 6 séances',
            'Push / Pull / Legs / Push / Pull / Legs : chaque groupe musculaire est travaillé 2 fois par semaine.',
            ['push', 'pull', 'legs', 'push', 'pull', 'legs'])
        ];
    }
    return [];
  }

  var GROUP_ORDER = { reco: 0, closest: 0, optimal: 1, option: 1, alt: 2, warn: 3, advice: 4 };

  function buildProposals(total, upper, lower, unknown) {
    var list = candidates(total, lower, unknown);

    // Classement par priorité : seulement si les programmes n'ont pas tous la même importance
    var prios = {};
    list.forEach(function (p) { prios[p.prio] = true; });
    var ranked = Object.keys(prios).length > 1;
    list.forEach(function (p) { p.ranked = ranked; });

    if (unknown) {
      // « Je ne sais pas » : on montre toutes les alternatives possibles
      list = list.filter(function (p) { return p.id !== 'ulmin'; });
      list.forEach(function (p) { p.badge = 'option'; p.dist = 0; });

    } else if (total <= 2) {
      // Règle : 1–2 séances = insuffisant, sauf une seule zone faite 2 fois.
      if (!(total === 2 && upper === 1 && lower === 1)) {
        list = list.filter(function (p) { return p.id !== 'ulmin'; });
      }
      list.forEach(function (p) {
        p.dist = 0;
        if (p.id === 'ulmin') p.badge = 'warn';
        else if (upper === lower) p.badge = 'optimal';
        else if ((p.id === 'uu') === (upper > lower)) p.badge = 'reco';
        else p.badge = 'alt';
        if (p.badge === 'reco' && total === 1) {
          p.note = 'Tu avais choisi 1 séance : passe à 2 séances sur cette même zone pour atteindre le minimum.';
        }
      });

    } else {
      list.forEach(function (p) { p.dist = Math.abs(p.u - upper) + Math.abs(p.l - lower); });
      var best = Math.min.apply(null, list.map(function (p) { return p.dist; }));
      list.forEach(function (p) {
        if (p.dist === best) p.badge = best === 0 ? 'reco' : 'closest';
        else p.badge = 'alt';
        if (p.dist > 0) {
          p.note = 'Ce programme ne correspond pas exactement à ta répartition (' + upper + ' haut / ' + lower +
            ' bas) : il propose ' + p.u + ' séance' + (p.u > 1 ? 's' : '') + ' haut du corps et ' + p.l + ' séance' + (p.l > 1 ? 's' : '') + ' bas du corps.';
        }
      });
    }

    // 6 séances : conseil de passer à 5 pour mieux récupérer
    if (total === 6) {
      list.push(P('reduce5', 'Upper / Lower + PPL – 5 séances',
        'Avec 6 séances, les temps de repos sont courts. Si tu réduis à 5 séances, c’est plus optimal pour la récupération, et tu pourras aborder un programme d’entraînement très intéressant : le Upper / Lower + PPL.',
        ['upper', 'lower', 'push', 'pull', 'legs'], { badge: 'advice', avoid: true, dist: 99 }));
    }

    list.forEach(function (p, i) { p._i = i; });
    list.sort(function (a, b) {
      return (GROUP_ORDER[a.badge] - GROUP_ORDER[b.badge]) || (a.dist - b.dist) || (a.prio - b.prio) || (a._i - b._i);
    });
    return list;
  }

  /* ───────────────────────── RENDU ───────────────────────── */
  var BADGES = {
    reco: 'Recommandé',
    closest: 'Le plus proche',
    optimal: 'Optimal',
    option: 'Option',
    alt: 'Alternative',
    warn: 'Déconseillé',
    advice: 'Conseil'
  };

  function groupInfo(badge, ranked) {
    switch (badge) {
      case 'reco':    return { key: 'top', icon: '⭐', title: 'Recommandé pour toi' };
      case 'closest': return { key: 'top', icon: '🎯', title: 'Le programme qui s’en rapproche le plus' };
      case 'optimal': return { key: 'optimal', icon: '✅', title: 'Options optimales' };
      case 'option':  return { key: 'option', icon: '📋', title: ranked ? 'Toutes les alternatives, classées par priorité' : 'Toutes les alternatives possibles' };
      case 'warn':    return { key: 'warn', icon: '⚠️', title: 'Possible, mais déconseillé' };
      case 'advice':  return { key: 'advice', icon: '💡', title: 'Notre conseil' };
      default:        return { key: 'alt', icon: '↔️', title: 'Autres alternatives' };
    }
  }

  function plural(n, word) { return n + ' ' + word + (n > 1 ? 's' : ''); }
  function sessionOf(key) { return SESS[state.gender][key]; }

  function renderGroups(list) {
    var out = [], idx = {};
    list.forEach(function (p) {
      var g = groupInfo(p.badge, p.ranked);
      if (idx[g.key] === undefined) { idx[g.key] = out.length; out.push({ g: g, items: [] }); }
      out[idx[g.key]].items.push(p);
    });
    return out.map(function (o) {
      return '<div class="group group-' + o.g.key + '">' +
        '<div class="group-head"><span class="group-icon">' + o.g.icon + '</span>' +
        '<div class="group-title">' + o.g.title + '</div><span class="group-line"></span></div>' +
        '<div class="group-cards">' + o.items.map(renderProposal).join('') + '</div></div>';
    }).join('');
  }

  function renderWeek(seq) {
    var n = 0;
    return '<div class="week">' + seq.map(function (k) {
      if (k === 'rest') {
        return '<div class="day rest"><span class="day-n">Jour off</span><span class="day-name">Repos</span></div>';
      }
      n++;
      var s = sessionOf(k);
      return '<div class="day zone-' + s.zone + '"><span class="day-n">Séance ' + n +
        '</span><span class="day-name">' + s.label + '</span></div>';
    }).join('') + '</div>';
  }

  function renderWeekPlan(week) {
    var n = 0;
    return '<div class="week-plan-grid">' + week.map(function (k, i) {
      if (k === 'rest') {
        return '<div class="wd rest"><span class="wd-day">Jour ' + (i + 1) + '</span><span class="wd-name">Repos</span></div>';
      }
      n++;
      var s = sessionOf(k);
      return '<div class="wd zone-' + s.zone + '"><span class="wd-day">Jour ' + (i + 1) + '</span>' +
        '<span class="wd-name">' + s.label + '</span><span class="wd-n">Séance ' + n + '</span></div>';
    }).join('') + '</div>';
  }

  function renderSession(key) {
    var s = sessionOf(key);
    var rows = s.ex.map(function (e) {
      return '<tr><td><span class="ex-name">' + e.n + '</span>' +
        (e.tip ? '<span class="ex-tip">' + e.tip + '</span>' : '') +
        '</td><td>' + e.s + '</td><td>' + e.r + '</td><td>' + e.rest + '</td></tr>';
    }).join('');
    var remarks = '';
    if (s.remarks) {
      remarks = '<div class="remarks"><div class="remarks-title">Remarques</div><ul>' +
        s.remarks.map(function (r) { return '<li>' + r + '</li>'; }).join('') + '</ul></div>';
    }
    var intro = s.intro ? '<p class="session-intro">' + s.intro + '</p>' : '';
    var derived = s.derived
      ? '<p class="derived-note">Mêmes exercices que les séances Push / Pull, regroupés autrement.</p>' : '';
    return '<details class="session"><summary><span>' + s.title +
      '<span class="zone">' + s.muscles + '</span></span>' +
      '<span class="meta">≈ ' + estimateMinutes(s.ex) + ' min · ' + plural(s.ex.length, 'exercice') + '</span>' +
      '<span class="chev">▾</span></summary>' +
      '<div class="session-body">' + intro +
      '<table class="ex-table"><thead><tr><th>Exercice</th><th>Séries</th><th>Reps</th><th>Repos</th></tr></thead><tbody>' +
      rows + '</tbody></table>' + remarks + derived + '</div></details>';
  }

  function renderProposal(p) {
    var sessionCount = p.seq.filter(function (k) { return k !== 'rest'; }).length;
    var seen = {}, unique = [];
    p.seq.forEach(function (k) { if (k !== 'rest' && !seen[k]) { seen[k] = true; unique.push(k); } });
    var cls = 'proposal' + ((p.badge === 'reco' || p.badge === 'closest') ? ' reco' : '') +
      (p.avoid ? ' avoid' : '') + (p.badge === 'advice' ? ' advice' : '');
    return '<article class="' + cls + '">' +
      '<div class="proposal-top"><span class="badges"><span class="badge ' + p.badge + '">' + BADGES[p.badge] + '</span>' +
      (p.ranked ? '<span class="rank rank-' + p.prio + '">Priorité n°' + p.prio + '</span>' : '') + '</span>' +
      '<span class="proposal-count">' + plural(sessionCount, 'séance') + ' / semaine · ' +
      p.u + ' haut · ' + p.l + ' bas</span></div>' +
      '<h3>' + p.title + '</h3>' +
      '<p class="proposal-desc">' + p.desc + '</p>' +
      (p.rankNote ? '<p class="rank-note">' + p.rankNote + '</p>' : '') +
      (p.note ? '<div class="proposal-note">' + p.note + '</div>' : '') +
      (p.warnNote ? '<div class="proposal-warn">⚠️ ' + p.warnNote + '</div>' : '') +
      renderWeek(p.seq) +
      '<div class="sessions">' + unique.map(renderSession).join('') + '</div>' +
      '<div class="week-plan" hidden><div class="week-plan-title">Ta semaine type</div>' +
      renderWeekPlan(p.week) +
      '<p class="week-plan-hint">Garde cet ordre et ces jours de repos : tu peux décaler toute la semaine (le « Jour 1 » peut tomber n’importe quel jour), mais respecte l’enchaînement pour bien récupérer.</p></div>' +
      '<div class="choose-row"><button type="button" class="btn-primary btn-sm choose-btn" data-choose="' + p.id + '">Voir la semaine type</button></div>' +
      '<div class="pdf-row"><button type="button" class="btn-ghost btn-sm pdf-btn" data-pdf="' + p.id + '">📄 Télécharger ce programme (PDF)</button></div>' +
      '</article>';
  }

  function renderBanner(total, upper, lower, unknown) {
    var html = '';

    if (total <= 2) {
      var single = !unknown && total === 2 && (upper === 2 || lower === 2);
      if (single) {
        html += '<div class="banner ok"><div class="banner-title">✅ Parfait pour 2 séances</div>' +
          '<p>En ne travaillant qu’une seule zone, tu la stimules <strong>2 fois par semaine</strong> : c’est le minimum pour progresser, et la version optimale avec un ' +
          (upper === 2 ? '<strong>Upper / Upper</strong>' : '<strong>Lower / Lower</strong>') + '.</p></div>';
      } else {
        html += '<div class="banner warn"><div class="banner-title">⚠️ 1 à 2 séances : c’est insuffisant</div>' +
          '<p>Avec ' + (total === 1 ? 'une seule séance' : (unknown ? '2 séances réparties entre le haut et le bas du corps' : 'une séance haut et une séance bas')) +
          ', on ne peut pas travailler chaque muscle <strong>2 fois par semaine</strong>, alors que c’est le minimum. ' +
          'Il vaut mieux choisir <strong>une seule zone</strong> (haut du corps <em>ou</em> bas du corps) et la faire 2 fois, ' +
          'avec un <strong>Upper / Upper</strong> ou un <strong>Lower / Lower</strong> pour que ce soit optimal.</p></div>';
      }
    }

    if (!unknown && lower >= 4) {
      html += '<div class="banner warn"><div class="banner-title">⚠️ Rien d’optimal sous cette forme</div>' +
        '<p>Avec <strong>' + lower + ' séances bas du corps</strong>, aucun programme ne peut être optimal. ' +
        'Les jambes ont besoin de <strong>48 à 72 h de repos</strong> entre deux séances : on ne peut donc les travailler que ' +
        '<strong>2 à 3 fois par semaine</strong> (<strong>2 fois</strong> est le plus recommandé). ' +
        'Voici le programme qui s’en rapproche le plus.</p></div>';
    } else if (!unknown && lower === 3) {
      html += '<div class="banner info"><div class="banner-title">3 séances bas du corps : possible, mais…</div>' +
        '<p>Les jambes ont besoin de <strong>48 à 72 h de repos</strong> entre deux séances. Les travailler 3 fois par semaine est possible, ' +
        'mais <strong>2 fois par semaine</strong> reste le plus recommandé.</p></div>';
    }

    if (total === 3 && (unknown || lower !== 3)) {
      html += '<div class="banner info"><div class="banner-title">3 séances : une zone sera travaillée une seule fois</div>' +
        '<p>Avec 3 séances, une zone est travaillée 2 fois et l’autre 1 fois. Choisis celle que tu veux prioriser.</p></div>';
    }
    return html;
  }

  /* ───────────────────────── ÉTAT + NAVIGATION ───────────────────────── */
  var state = { gender: null, total: null, upper: null, props: [] };
  var currentStep = 1;

  function $(id) { return document.getElementById(id); }

  function goTo(n) {
    currentStep = n;
    for (var i = 1; i <= 4; i++) {
      $('step-' + i).classList.toggle('active', i === n);
    }
    document.querySelectorAll('.stepper-dots li').forEach(function (li) {
      var d = parseInt(li.getAttribute('data-dot'), 10);
      li.classList.toggle('done', d < n);
      li.classList.toggle('current', d === n);
    });
    $('stepFill').style.width = ((n - 1) / 3 * 100) + '%';
    $('restartBtn').hidden = (n === 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function buildTotalGrid() {
    var html = '';
    for (var i = 1; i <= 6; i++) {
      html += '<button type="button" class="choice compact" data-total="' + i + '">' +
        '<span class="choice-num">' + i + '</span><span class="choice-sub">séance' + (i > 1 ? 's' : '') + '</span></button>';
    }
    $('totalGrid').innerHTML = html;
  }

  function buildUpperGrid() {
    var html = '';
    for (var i = 0; i <= state.total; i++) {
      html += '<button type="button" class="choice compact' + (state.upper === i ? ' selected' : '') +
        '" data-upper="' + i + '"><span class="choice-num">' + i + '</span><span class="choice-sub">haut</span></button>';
    }
    html += '<button type="button" class="choice compact unknown' + (state.upper === 'unknown' ? ' selected' : '') +
      '" data-upper="unknown"><span class="choice-icon">🤷</span><span class="choice-title">Je ne sais pas</span>' +
      '<span class="choice-sub">Voir toutes les alternatives</span></button>';
    $('upperGrid').innerHTML = html;
  }

  function updateSplit() {
    var has = state.upper !== null;
    var unknown = state.upper === 'unknown';
    $('upperVal').textContent = !has ? '–' : (unknown ? '?' : state.upper);
    $('lowerVal').textContent = !has ? '–' : (unknown ? '?' : (state.total - state.upper));
    $('seeProgramBtn').disabled = !has;
  }

  function showResult() {
    var unknown = state.upper === 'unknown';
    var total = state.total;
    var upper = unknown ? null : state.upper;
    var lower = unknown ? null : total - upper;
    var who = state.gender === 'femme' ? 'Femme' : 'Homme';

    $('recap').innerHTML =
      '<span class="recap-chip"><strong>' + who + '</strong></span>' +
      '<span class="recap-chip"><strong>' + plural(total, 'séance') + '</strong> / semaine</span>' +
      (unknown
        ? '<span class="recap-chip"><strong>Répartition :</strong> je ne sais pas</span>'
        : '<span class="recap-chip upper"><strong>' + upper + '</strong> haut du corps</span>' +
          '<span class="recap-chip lower"><strong>' + lower + '</strong> bas du corps</span>');

    $('banner').innerHTML = renderBanner(total, upper, lower, unknown);

    state.props = buildProposals(total, upper, lower, unknown);
    $('resultTitle').textContent = 'Tes programmes';
    $('proposals').innerHTML = renderGroups(state.props);
    goTo(4);
  }

  /* ───────────────────────── EXPORT PDF ───────────────────────── */
  function exportData(p) {
    var g = state.gender, idx = {}, sessions = [];
    var unknown = state.upper === 'unknown';
    p.seq.forEach(function (k) {
      if (k === 'rest') return;
      if (idx[k] === undefined) {
        var s = SESS[g][k];
        idx[k] = sessions.length;
        sessions.push({
          key: k, label: s.label, title: s.title, zone: s.zone, muscles: s.muscles, ex: s.ex,
          remarks: s.remarks || null, intro: s.intro || '', derived: !!s.derived,
          freq: 0, minutes: estimateMinutes(s.ex)
        });
      }
      sessions[idx[k]].freq++;
    });
    return {
      id: p.id, title: p.title, desc: p.desc, note: p.note, warnNote: p.warnNote || '', rankNote: p.rankNote || '',
      badge: p.badge, rank: p.ranked ? p.prio : 0, u: p.u, l: p.l,
      seq: p.seq.map(function (k) {
        return k === 'rest' ? { rest: true } : { label: SESS[g][k].label, zone: SESS[g][k].zone };
      }),
      week: p.week.map(function (k) {
        return k === 'rest' ? { rest: true } : { label: SESS[g][k].label, zone: SESS[g][k].zone };
      }),
      sessions: sessions,
      hasLegs: sessions.some(function (s) { return s.zone === 'lower'; }),
      legend: LEGEND,
      tips: TIPS,
      gender: g, total: state.total,
      upper: unknown ? null : state.upper,
      lower: unknown ? null : state.total - state.upper,
      unknown: unknown
    };
  }

  function downloadPdf(id) {
    var p = state.props.filter(function (x) { return x.id === id; })[0];
    if (!p) return;
    if (!window.MuscuPDF || !window.jspdf) {
      alert('Le module PDF n’est pas chargé. Vérifie que les fichiers assets/jss/jspdf.umd.min.js et assets/jss/muscu-pdf.js sont bien présents.');
      return;
    }
    try {
      window.MuscuPDF.download(exportData(p));
    } catch (err) {
      console.error(err);
      alert('Impossible de générer le PDF. Ouvre la console (F12) pour voir le détail.');
    }
  }

  /* ───────────────────────── ÉVÉNEMENTS ───────────────────────── */
  document.addEventListener('click', function (e) {
    var t = e.target.closest('button');
    if (!t) return;

    if (t.hasAttribute('data-gender')) {
      state.gender = t.getAttribute('data-gender');
      goTo(2);
    } else if (t.hasAttribute('data-total')) {
      state.total = parseInt(t.getAttribute('data-total'), 10);
      state.upper = null;
      buildUpperGrid();
      updateSplit();
      $('splitHelp').textContent = 'Sur tes ' + state.total + ' séance' + (state.total > 1 ? 's' : '') +
        ', combien veux-tu consacrer au haut du corps ? Le reste ira au bas du corps. Tu hésites ? Choisis « Je ne sais pas » pour voir toutes les alternatives.';
      goTo(3);
    } else if (t.hasAttribute('data-upper')) {
      var v = t.getAttribute('data-upper');
      state.upper = (v === 'unknown') ? 'unknown' : parseInt(v, 10);
      buildUpperGrid();
      updateSplit();
    } else if (t.hasAttribute('data-choose')) {
      var art = t.closest('.proposal');
      var panel = art.querySelector('.week-plan');
      var opening = panel.hidden;
      document.querySelectorAll('.proposal.chosen').forEach(function (a) {
        a.classList.remove('chosen');
        a.querySelector('.week-plan').hidden = true;
        a.querySelector('.choose-btn').textContent = 'Voir la semaine type';
      });
      if (opening) {
        art.classList.add('chosen');
        panel.hidden = false;
        t.textContent = 'Masquer la semaine type';
        panel.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    } else if (t.hasAttribute('data-pdf')) {
      downloadPdf(t.getAttribute('data-pdf'));
    } else if (t.hasAttribute('data-back')) {
      goTo(parseInt(t.getAttribute('data-back'), 10));
    } else if (t.id === 'seeProgramBtn') {
      if (state.upper !== null) showResult();
    } else if (t.id === 'restartBtn') {
      state = { gender: null, total: null, upper: null, props: [] };
      goTo(1);
    }
  });

  // Repères de lecture
  $('legendBody').innerHTML = LEGEND.map(function (l) {
    return '<div class="legend-item"><strong>' + l.t + '</strong><span>' + l.x + '</span></div>';
  }).join('') +
    '<div class="legend-tips"><div class="legend-tips-title">💡 Conseils pour un débutant</div><ul>' +
    TIPS.map(function (t) { return '<li>' + t + '</li>'; }).join('') + '</ul></div>';

  buildTotalGrid();
  goTo(1);
})();