/* Motor · Repaso 3.º básico · El Sobrinito · 11 nov 2026
   Pantallas: perfiles → asignaturas → 7 secciones (Aprende, Escucha, Explora, Practica, Juega, Comprueba, Repasa).
   Avance guardado solo en este equipo (localStorage). Sin cuentas, sin datos personales, sin internet después de la primera carga. */
(function () {
  'use strict';
  const $ = s => document.querySelector(s);
  const app = () => $('#app');
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const mezclar = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const KEY = 'tercero_repaso_v1';
  const ANIMALES = ['🦊', '🐼', '🐸', '🦉', '🐢'];

  /* ---------- Datos: asignar ids ---------- */
  MATERIAS.forEach(m => m.temas.forEach(t => t.items.forEach((it, i) => { it.id = `${m.id}.${t.id}.${i}`; it.tema = t.id; it.materia = m.id; })));
  const M = id => MATERIAS.find(m => m.id === id);
  const T = (m, id) => m.temas.find(t => t.id === id);
  const itemPorId = id => { const [mi, ti, ii] = id.split('.'); const t = T(M(mi), ti); return t && t.items[+ii]; };

  /* ---------- Almacenamiento ---------- */
  let DB = { actual: null, auto: false, perfiles: {} };
  try { DB = Object.assign(DB, JSON.parse(localStorage.getItem(KEY) || '{}')); } catch (e) { }
  const guardar = () => { try { localStorage.setItem(KEY, JSON.stringify(DB)); } catch (e) { } };
  const nuevoPerfil = n => ({ n, items: {}, temas: {}, vistos: {}, errores: {}, evals: {}, juegos: {} });
  const P = () => DB.perfiles[DB.actual];
  function registrar(it, ok) {
    const p = P(); if (!p) return;
    const k = it.tema && `${it.materia}.${it.tema}`;
    if (it.id && !it.gen) { const r = p.items[it.id] || { ok: 0, ko: 0 }; ok ? r.ok++ : r.ko++; p.items[it.id] = r; }
    if (k) { const t = p.temas[k] || { ok: 0, ko: 0 }; ok ? t.ok++ : t.ko++; p.temas[k] = t; }
    const e = p.errores[it.materia] || [];
    const key = it.gen ? 'gen:' + it.materia + '.' + it.tema : it.id;
    if (!ok && !e.includes(key)) e.push(key);
    if (ok) { const i = e.indexOf(key); if (i > -1) e.splice(i, 1); }
    p.errores[it.materia] = e; guardar();
  }
  const dominio = (m, t) => { const r = (P() && P().temas[`${m.id}.${t.id}`]) || { ok: 0, ko: 0 }; const n = r.ok + r.ko; return n ? r.ok / n : null; };
  const avanceMateria = m => { const p = P(); if (!p) return 0; const vistos = m.temas.filter(t => p.vistos[`${m.id}.${t.id}`]).length; const prac = m.temas.filter(t => (p.temas[`${m.id}.${t.id}`] || {}).ok > 0).length; return Math.round(100 * (vistos + prac) / (2 * m.temas.length)); };

  /* ---------- Voz (lectura en voz alta del navegador) ---------- */
  const VOZ = { cola: [], i: 0, activo: false, pausado: false, voz: null, ultimo: '' };
  function elegirVoz() { if (!('speechSynthesis' in window)) return; const vs = speechSynthesis.getVoices(); const es = vs.filter(v => /^es/i.test(v.lang)); const rank = v => (/es-cl/i.test(v.lang) ? 6 : /es-(419|mx|us|ar|co)/i.test(v.lang) ? 4 : 2) + (/google|natural|online|neural|paulina|monica|enhanced/i.test(v.name) ? 2 : 0); VOZ.voz = es.sort((a, b) => rank(b) - rank(a))[0] || null; }
  if ('speechSynthesis' in window) { elegirVoz(); speechSynthesis.onvoiceschanged = elegirVoz; }
  const NOMBRESFR = { '1/2': 'un medio', '1/3': 'un tercio', '2/3': 'dos tercios', '3/3': 'tres tercios', '1/4': 'un cuarto', '2/4': 'dos cuartos', '3/4': 'tres cuartos', '4/4': 'cuatro cuartos', '2/2': 'dos medios', '4/3': 'cuatro tercios', '3/2': 'tres medios', '4/1': 'cuatro enteros', '2/1': 'dos enteros' };
  function paraVoz(html) {
    const d = document.createElement('div'); d.innerHTML = String(html).replace(/<br\s*\/?>/gi, '. ').replace(/<\/(p|li|h\d|div)>/gi, '. ');
    let s = d.textContent || '';
    s = s.replace(/\b(\d)\/(\d)\b/g, m => NOMBRESFR[m] || m.replace('/', ' de '));
    s = s.replace(/(\d+)\s*×\s*(\d+)/g, '$1 por $2').replace(/×/g, ' por ').replace(/(\d+)°/g, '$1 grados').replace(/(\d+) cm\b/g, '$1 centímetros').replace(/(\d+) m\b/g, '$1 metros');
    s = s.replace(/\b(\d{1,2}):00\b/g, '$1 en punto').replace(/\b(\d{1,2}):(\d{2})\b/g, (m, h, mi) => `${h} y ${+mi}`);
    s = s.replace(/_{2,}|_/g, ' blanco ').replace(/☐/g, ' cuadro ').replace(/[>]/g, ' mayor que ').replace(/[<]/g, ' menor que ');
    s = s.replace(/\p{Extended_Pictographic}|️|‍|[➜→⬆️]/gu, ' ').replace(/\s+/g, ' ').replace(/(\.\s*)+/g, '. ').trim();
    return s;
  }
  function frases(s) { return s.split(/(?<=[.!?¿¡:])\s+/).map(x => x.trim()).filter(x => x.length > 1); }
  function hablar(html, alTerminar) {
    if (!('speechSynthesis' in window)) { aviso('Este navegador no puede leer en voz alta. Prueba con Chrome o Safari.'); return; }
    if (!speechSynthesis.getVoices().length && performance.now() > 3000) aviso('Este equipo no tiene voces instaladas para leer en voz alta. En Android: Ajustes › Accesibilidad › Salida de texto a voz.');
    detener(); VOZ.ultimo = html; VOZ.cola = frases(paraVoz(html)); VOZ.i = 0; VOZ.activo = true; VOZ.pausado = false; VOZ.fin = alTerminar || null; barraVoz(true); siguienteFrase();
  }
  function siguienteFrase() {
    if (!VOZ.activo || VOZ.pausado) return;
    if (VOZ.i >= VOZ.cola.length) { VOZ.activo = false; barraVoz(false); const f = VOZ.fin; VOZ.fin = null; if (f) f(); return; }
    const u = new SpeechSynthesisUtterance(VOZ.cola[VOZ.i]);
    if (VOZ.voz) { u.voice = VOZ.voz; u.lang = VOZ.voz.lang; } else u.lang = 'es-CL';
    u.rate = 0.95; u.onend = () => { if (VOZ.pausado || !VOZ.activo) return; VOZ.i++; siguienteFrase(); }; u.onerror = u.onend;
    speechSynthesis.speak(u);
  }
  function pausar() { if (!VOZ.activo) return; VOZ.pausado = true; speechSynthesis.cancel(); barraVoz(true); }
  function continuar() { if (!VOZ.activo) return; VOZ.pausado = false; barraVoz(true); siguienteFrase(); }
  function detener() { VOZ.activo = false; VOZ.pausado = false; VOZ.fin = null; try { speechSynthesis.cancel(); } catch (e) { } barraVoz(false); }
  function barraVoz(on) { const b = $('#voz'); if (!b) return; b.hidden = !on; const p = $('#vozPausa'); if (p) p.textContent = VOZ.pausado ? '▶️ Seguir' : '⏸️ Pausa'; }
  window.addEventListener('DOMContentLoaded', () => {
    $('#vozPausa').onclick = () => VOZ.pausado ? continuar() : pausar();
    $('#vozRep').onclick = () => hablar(VOZ.ultimo, VOZ.fin);
    $('#vozStop').onclick = detener;
  });
  const btnVoz = html => { const b = document.createElement('button'); b.type = 'button'; b.className = 'bvoz'; b.textContent = '🔊 Escuchar'; b.onclick = () => hablar(html); return b; };
  function aviso(t) { const a = $('#aviso'); a.textContent = t; a.hidden = false; clearTimeout(aviso.t); aviso.t = setTimeout(() => a.hidden = true, 3500); }

  /* ---------- Utilidades de pantalla ---------- */
  function pantalla(titulo, volver, color) {
    detener(); window.scrollTo(0, 0);
    const el = app(); el.innerHTML = '';
    const h = document.createElement('header'); h.className = 'top'; h.style.background = color || '';
    h.innerHTML = `${volver ? '<button type="button" class="back" aria-label="Volver">⬅</button>' : '<span></span>'}<h1>${titulo}</h1><button type="button" class="perfil" aria-label="Cambiar de estudiante">${DB.actual ? ANIMALES[DB.actual - 1] : '👤'}</button>`;
    el.appendChild(h);
    if (volver) h.querySelector('.back').onclick = volver;
    h.querySelector('.perfil').onclick = renderPerfiles;
    const main = document.createElement('main'); el.appendChild(main); return main;
  }
  const div = (cls, html) => { const d = document.createElement('div'); if (cls) d.className = cls; if (html != null) d.innerHTML = html; return d; };
  const boton = (txt, cls, fn) => { const b = document.createElement('button'); b.type = 'button'; b.className = cls || 'btn'; b.innerHTML = txt; b.onclick = fn; return b; };
  const diasPara = f => { const hoy = new Date(); hoy.setHours(0, 0, 0, 0); const [y, mo, d] = f.split('-').map(Number); return Math.round((new Date(y, mo - 1, d) - hoy) / 864e5); };
  const fechaTxt = f => { const [y, mo, d] = f.split('-').map(Number); const dt = new Date(y, mo - 1, d); return dt.toLocaleDateString('es-CL', { weekday: 'long', day: 'numeric', month: 'long' }); };

  /* ---------- Perfiles ---------- */
  function renderPerfiles() {
    const main = pantalla('¿Quién va a estudiar?', DB.actual ? renderInicio : null, '#A8E6D4');
    main.appendChild(div('intro', 'Elige tu animal. Tu avance se guarda solo en este equipo. No necesitas cuenta ni escribir tu nombre.'));
    const g = div('perfiles');
    [1, 2, 3, 4, 5].forEach(n => {
      const p = DB.perfiles[n];
      g.appendChild(boton(`<span class="ani">${ANIMALES[n - 1]}</span><b>Estudiante ${n}</b><small>${p ? 'Avance: ' + MATERIAS.map(m => avanceMateria0(p, m)).reduce((a, b) => a + b, 0) / MATERIAS.length + ' %' : 'Nuevo'}</small>`, 'pf' + (DB.actual === n ? ' on' : ''), () => { if (!DB.perfiles[n]) DB.perfiles[n] = nuevoPerfil(n); DB.actual = n; guardar(); renderInicio(); }));
    });
    main.appendChild(g);
    main.appendChild(boton('👩‍🏫 Panel para el adulto', 'btn suave', renderAdulto));
  }
  const avanceMateria0 = (p, m) => { const v = m.temas.filter(t => p.vistos[`${m.id}.${t.id}`]).length, pr = m.temas.filter(t => (p.temas[`${m.id}.${t.id}`] || {}).ok > 0).length; return Math.round(100 * (v + pr) / (2 * m.temas.length)); };

  /* ---------- Inicio ---------- */
  function renderInicio() {
    if (!DB.actual) return renderPerfiles();
    const main = pantalla('Repaso 3.º básico', null, '#FFE08A');
    main.appendChild(div('chispa', `<span class="robot">🤖</span><p><b>¡Hola, ${ANIMALES[DB.actual - 1]} Estudiante ${DB.actual}!</b> Soy Chispa. Vamos a repasar para las pruebas de noviembre. Elige una asignatura.</p>`));
    const g = div('materias');
    MATERIAS.forEach(m => {
      const d = diasPara(m.fecha), av = avanceMateria(m);
      const b = boton(`<span class="me">${m.emoji}</span><b>${m.corto}</b><small>Prueba: ${fechaTxt(m.fecha)}${d >= 0 ? ` · ${d === 0 ? '¡hoy!' : d === 1 ? 'falta 1 día' : 'faltan ' + d + ' días'}` : ''}</small><span class="barra"><i style="width:${av}%"></i></span><small>Avance ${av} %</small>`, 'mat', () => renderMateria(m.id));
      b.style.background = m.color; g.appendChild(b);
    });
    main.appendChild(g);
    main.appendChild(div('pie', 'Material de práctica creado para repasar. Los resultados no son notas del colegio.'));
  }

  /* ---------- Asignatura: 7 secciones ---------- */
  function renderMateria(mid) {
    const m = M(mid); const main = pantalla(`${m.emoji} ${m.corto}`, renderInicio, m.color);
    const err = (P().errores[m.id] || []).length;
    const sec = [
      ['📘', 'Aprende', 'Explicaciones con dibujos, una a la vez', () => elegirTema(m, 'aprende')],
      ['🎧', 'Escucha', 'Chispa te lee cada tema en voz alta', () => elegirTema(m, 'escucha')],
      ['🔍', 'Explora', 'Toca, mueve y descubre', () => renderExplora(m)],
      ['✏️', 'Practica', 'Ejercicios con ayuda al responder', () => elegirTema(m, 'practica')],
      ['🎮', 'Juega', m.juego.titulo, () => renderJuego(m)],
      ['🏆', 'Comprueba lo aprendido', 'Evaluación de práctica con todos los contenidos', () => iniciarEval(m)],
      ['🔁', 'Repasa tus errores', err ? `Tienes ${err} para repasar` : 'Aquí aparecerá lo que necesites reforzar', () => iniciarRepaso(m)]
    ];
    const g = div('secciones');
    sec.forEach(([e, t, s, f]) => g.appendChild(boton(`<span class="se">${e}</span><b>${t}</b><small>${s}</small>`, 'sec', f)));
    main.appendChild(g);
    const evs = (P().evals[m.id] || []);
    if (evs.length) { const u = evs[evs.length - 1]; main.appendChild(div('nota', `Último "Comprueba lo aprendido": ${u.ok} de ${u.total} (${Math.round(100 * u.ok / u.total)} %) · ${new Date(u.fecha).toLocaleDateString('es-CL')}`)); }
  }

  function elegirTema(m, modo) {
    const nombres = { aprende: '📘 Aprende', escucha: '🎧 Escucha', practica: '✏️ Practica' };
    const main = pantalla(nombres[modo] + ' · ' + m.corto, () => renderMateria(m.id), m.color);
    main.appendChild(div('intro', modo === 'practica' ? 'Elige un tema. El punto de color muestra cómo te ha ido: 🟢 bien · 🟡 a medias · 🔴 a reforzar · ⚪ sin practicar.' : 'Elige un tema.'));
    const g = div('temas');
    if (modo === 'practica') g.appendChild(boton('<b>🎲 Mezcla de todos los temas</b>', 'tema todo', () => practicar(m, null)));
    m.temas.forEach(t => {
      const d = dominio(m, t), pt = d == null ? '⚪' : d >= .8 ? '🟢' : d >= .5 ? '🟡' : '🔴';
      const visto = P().vistos[`${m.id}.${t.id}`] ? ' ✓' : '';
      g.appendChild(boton(`${modo === 'practica' ? pt + ' ' : ''}<b>${t.titulo}</b>${modo !== 'practica' ? visto : ''}<small>${t.oa}</small>`, 'tema', () => modo === 'aprende' ? aprende(m, t, 0) : modo === 'escucha' ? escucha(m, t) : practicar(m, t)));
    });
    main.appendChild(g);
  }

  /* ---------- Aprende ---------- */
  function aprende(m, t, i) {
    const main = pantalla('📘 ' + t.titulo, () => elegirTema(m, 'aprende'), m.color);
    const c = t.aprende[i];
    const card = div('card aprende');
    card.innerHTML = `<p class="paso">Explicación ${i + 1} de ${t.aprende.length}</p><h2>${c.t}</h2>${c.img ? `<div class="img">${c.img}</div>` : ''}<p class="txt">${c.txt}</p>`;
    card.appendChild(btnVoz(c.t + '. ' + c.txt));
    main.appendChild(card);
    if (DB.auto) hablar(c.t + '. ' + c.txt);
    const nav = div('nav');
    if (i > 0) nav.appendChild(boton('⬅ Anterior', 'btn suave', () => aprende(m, t, i - 1)));
    if (i < t.aprende.length - 1) nav.appendChild(boton('Siguiente ➡', 'btn', () => aprende(m, t, i + 1)));
    else { P().vistos[`${m.id}.${t.id}`] = 1; guardar(); nav.appendChild(boton('✏️ Practicar este tema', 'btn', () => practicar(m, t))); }
    main.appendChild(nav);
  }

  /* ---------- Escucha: lección en audio ---------- */
  function escucha(m, t) {
    const main = pantalla('🎧 ' + t.titulo, () => elegirTema(m, 'escucha'), m.color);
    const todo = t.aprende.map(c => `<h3>${c.t}</h3><p>${c.txt}</p>`).join('');
    const card = div('card aprende', `<p class="paso">Chispa te lee el tema completo. Puedes pausar, seguir o repetir con los botones de abajo.</p>${todo}`);
    main.appendChild(card);
    main.appendChild(boton('▶️ Escuchar el tema', 'btn grande', () => hablar(t.aprende.map(c => c.t + '. ' + c.txt).join(' '), () => { P().vistos[`${m.id}.${t.id}`] = 1; guardar(); })));
    main.appendChild(boton('✏️ Practicar este tema', 'btn suave', () => practicar(m, t)));
  }

  /* ---------- Explora ---------- */
  function renderExplora(m) {
    const main = pantalla('🔍 Explora · ' + m.corto, () => renderMateria(m.id), m.color);
    const g = div('temas');
    m.explora.forEach(x => g.appendChild(boton(`<b>${x.titulo}</b>`, 'tema', () => lab(m, x))));
    main.appendChild(g);
  }
  function lab(m, x) {
    const main = pantalla('🔍 ' + x.titulo, () => renderExplora(m), m.color);
    const card = div('card');
    main.appendChild(card);
    if (x.tipo === 'partes') {
      card.innerHTML = `<p class="paso">Toca cada parte del dibujo.</p><div class="img grande">${x.svg()}</div><div class="info" aria-live="polite">👆 Toca una parte</div>`;
      card.querySelectorAll('[data-part]').forEach(g => { g.addEventListener('click', () => { card.querySelectorAll('[data-part]').forEach(z => z.classList.remove('sel')); g.classList.add('sel'); const t = x.info[g.dataset.part]; if (t) { card.querySelector('.info').innerHTML = t; hablar(t); } }); });
    } else if (x.tipo === 'pasos') {
      let i = 0; const pinta = () => { card.innerHTML = `<p class="paso">Paso ${i + 1} de ${x.pasos.length}</p><div class="emo gigante">${x.pasos[i][0]}</div><p class="txt">${x.pasos[i][1]}</p>`; const nav = div('nav'); if (i > 0) nav.appendChild(boton('⬅', 'btn suave', () => { i--; pinta(); })); if (i < x.pasos.length - 1) nav.appendChild(boton('Siguiente ➡', 'btn', () => { i++; pinta(); })); card.appendChild(btnVoz(x.pasos[i][1])); card.appendChild(nav); if (DB.auto) hablar(x.pasos[i][1]); }; pinta();
    } else if (x.tipo === 'html') { card.innerHTML = x.html(); card.appendChild(btnVoz(card.innerHTML)); }
    else if (x.tipo === 'texto') { const tx = m.textos[x.texto]; card.innerHTML = `<p class="paso">${tx.tipo}</p><h2>${tx.titulo}</h2><div class="lectura">${tx.html}</div>`; card.appendChild(btnVoz(tx.titulo + '. ' + tx.html)); }
    else if (x.tipo === 'reloj') {
      let h = 3, mi = 0; const pinta = () => { card.innerHTML = `<div class="img">${SVG.reloj(h, mi)}</div><p class="dig">${h}:${String(mi).padStart(2, '0')}</p><p class="txt">${horaEnPalabras(h, mi)}</p>`; const r = div('fila'); r.append(boton('− 1 hora', 'btn suave', () => { h = h === 1 ? 12 : h - 1; pinta(); }), boton('+ 1 hora', 'btn suave', () => { h = h === 12 ? 1 : h + 1; pinta(); }), boton('− 5 min', 'btn suave', () => { mi = (mi + 55) % 60; pinta(); }), boton('+ 5 min', 'btn suave', () => { mi = (mi + 5) % 60; pinta(); })); card.appendChild(r); card.appendChild(btnVoz(horaEnPalabras(h, mi))); }; pinta();
    } else if (x.tipo === 'fracciones') {
      let d = 4, forma = 'circulo', on = new Set();
      const pinta = () => { const n = on.size; card.innerHTML = `<p class="paso">Elige en cuántas partes dividir y toca las partes para pintarlas.</p><div class="img grande">${svgFrac(n, d, forma, on)}</div><p class="dig">${n}/${d}</p><p class="txt">${nombreFr(n, d)}</p>`; card.querySelectorAll('.fr').forEach(p => p.addEventListener('click', () => { const k = +p.dataset.i; on.has(k) ? on.delete(k) : on.add(k); pinta(); })); const r = div('fila'); [2, 3, 4].forEach(k => r.appendChild(boton(`${k} partes`, 'btn suave' + (k === d ? ' on' : ''), () => { d = k; on = new Set(); pinta(); }))); r.appendChild(boton(forma === 'circulo' ? '▭ Barra' : '◯ Círculo', 'btn suave', () => { forma = forma === 'circulo' ? 'barra' : 'circulo'; pinta(); })); card.appendChild(r); card.appendChild(btnVoz(`${nombreFr(n, d)}. El entero está dividido en ${d} partes iguales y hay ${n} pintadas.`)); }; pinta();
    } else if (x.tipo === 'arreglos') {
      let f = 3, c = 4; const pinta = () => { card.innerHTML = `<div class="img">${SVG.arreglo(f, c, '🍎')}</div><p class="dig">${f} × ${c} = ${f * c}</p><p class="txt">${f} filas de ${c}: ${Array(f).fill(c).join(' + ')} = ${f * c}</p>`; const r = div('fila'); r.append(boton('− fila', 'btn suave', () => { f = Math.max(1, f - 1); pinta(); }), boton('+ fila', 'btn suave', () => { f = Math.min(10, f + 1); pinta(); }), boton('− columna', 'btn suave', () => { c = Math.max(1, c - 1); pinta(); }), boton('+ columna', 'btn suave', () => { c = Math.min(10, c + 1); pinta(); })); card.appendChild(r); card.appendChild(btnVoz(`${f} por ${c} es igual a ${f * c}`)); }; pinta();
    } else if (x.tipo === 'perimetro') {
      let a = 6, b = 3; const pinta = () => { card.innerHTML = `<div class="img">${SVG.rectangulo(a, b)}</div><p class="dig">${a} + ${b} + ${a} + ${b} = ${2 * (a + b)} cm</p><p class="txt">El perímetro es la suma de todos los lados.</p>`; const r = div('fila'); r.append(boton('− largo', 'btn suave', () => { a = Math.max(1, a - 1); pinta(); }), boton('+ largo', 'btn suave', () => { a = Math.min(15, a + 1); pinta(); }), boton('− ancho', 'btn suave', () => { b = Math.max(1, b - 1); pinta(); }), boton('+ ancho', 'btn suave', () => { b = Math.min(15, b + 1); pinta(); })); card.appendChild(r); card.appendChild(btnVoz(`El perímetro es ${a} más ${b} más ${a} más ${b}, igual a ${2 * (a + b)} centímetros.`)); }; pinta();
    }
  }
  function horaEnPalabras(h, m) { const sig = h === 12 ? 1 : h + 1; if (m === 0) return `Son las ${h} en punto.`; if (m === 30) return `Son las ${h} y media.`; if (m === 15) return `Son las ${h} y cuarto.`; if (m === 45) return `Son las ${h}:45, o sea, las ${sig} menos cuarto.`; return `Son las ${h} y ${m} minutos.`; }
  const nombreFr = (n, d) => { const den = { 2: ['medio', 'medios'], 3: ['tercio', 'tercios'], 4: ['cuarto', 'cuartos'] }[d]; const nums = ['cero', 'un', 'dos', 'tres', 'cuatro']; if (n === 0) return 'Nada pintado (0)'; if (n === d) return `${nums[n]} ${den[1]}: ¡el entero completo!`; return `${nums[n]} ${n === 1 ? den[0] : den[1]}`.replace(/^un/, 'Un').replace(/^dos/, 'Dos').replace(/^tres/, 'Tres'); };
  function svgFrac(n, d, forma, on) { let s = SVG.fraccion(0, d, forma, true); on.forEach(i => { s = s.replace(new RegExp(`data-i="${i}" class="tap fr" fill="#FFFCF5"`), `data-i="${i}" class="tap fr on" fill="#FFB300"`); }); return s; }

  /* ---------- Cuestionario (Practica, Comprueba, Repasa) ---------- */
  function practicar(m, t) {
    let lista;
    if (t) { lista = mezclar(t.items.filter(i => !i.ev)); if (t.gen) lista.push(Object.assign(t.gen(), { gen: 1, tema: t.id, materia: m.id }), Object.assign(t.gen(), { gen: 1, tema: t.id, materia: m.id })); }
    else lista = mezclar(m.temas.flatMap(x => x.items.filter(i => !i.ev))).slice(0, 10);
    cuestionario(m, lista, 'practica', t ? t.titulo : 'Mezcla', () => t ? elegirTema(m, 'practica') : renderMateria(m.id));
  }
  function iniciarEval(m) {
    const main = pantalla('🏆 Comprueba lo aprendido', () => renderMateria(m.id), m.color);
    const lista = m.temas.flatMap(t => t.items.filter(i => i.ev));
    main.appendChild(div('card', `<h2>Evaluación de práctica de ${m.corto}</h2><p class="txt">Son <b>${lista.length} preguntas</b> sobre <b>todos los contenidos</b> de la prueba (${m.temas.length} temas). No hay tiempo límite. Al final verás tu puntaje y qué temas reforzar.</p><p class="nota">Es una práctica: no es una nota del colegio.</p>`));
    main.appendChild(boton('▶️ Comenzar', 'btn grande', () => cuestionario(m, lista, 'eval', 'Comprueba lo aprendido', () => renderMateria(m.id))));
  }
  function iniciarRepaso(m) {
    const e = (P().errores[m.id] || []).slice(0, 12);
    if (!e.length) { const main = pantalla('🔁 Repasa tus errores', () => renderMateria(m.id), m.color); main.appendChild(div('card', '<h2>¡Nada pendiente! 🎉</h2><p class="txt">Cuando te equivoques en Practica o en Comprueba lo aprendido, esas preguntas aparecerán aquí para repasarlas.</p>')); return; }
    const lista = [];
    e.forEach(k => {
      if (k.startsWith('gen:')) { const [mi, ti] = k.slice(4).split('.'); const t = T(M(mi), ti); if (t && t.gen) lista.push(Object.assign(t.gen(), { gen: 1, tema: ti, materia: mi, repasoKey: k })); }
      else { const it = itemPorId(k); if (it) { lista.push(it); const t = T(m, it.tema); const otro = mezclar(t.items.filter(x => x !== it && !x.ev && !e.includes(x.id)))[0] || (t.gen && Object.assign(t.gen(), { gen: 1, tema: t.id, materia: m.id })); if (otro && !lista.includes(otro)) lista.push(otro); } }
    });
    cuestionario(m, lista, 'repaso', 'Repasa tus errores', () => renderMateria(m.id));
  }

  function cuestionario(m, lista, modo, titulo, salir) {
    let i = 0, buenas = 0; const res = [];
    const sig = () => {
      if (i >= lista.length) return resultado();
      const it = lista[i]; if (window.__TERCERO) window.__TERCERO.actual = it;
      const main = pantalla((modo === 'eval' ? '🏆 ' : modo === 'repaso' ? '🔁 ' : '✏️ ') + titulo, salir, m.color);
      main.appendChild(div('progreso', `<span>Pregunta ${i + 1} de ${lista.length}</span><span class="barra"><i style="width:${100 * i / lista.length}%"></i></span>`));
      const card = div('card q'); main.appendChild(card);
      if (it.texto) { const tx = m.textos[it.texto]; const d = document.createElement('details'); d.className = 'lectura'; d.open = i === 0 || lista[i - 1].texto !== it.texto; d.innerHTML = `<summary>📄 ${tx.tipo}: «${tx.titulo}» (tócalo para leer)</summary>${tx.html}`; d.appendChild(btnVoz(tx.titulo + '. ' + tx.html)); card.appendChild(d); }
      card.appendChild(div('enunciado', esc(it.q).replace(/_{2,}/g, '<span class="hueco">____</span>')));
      if (it.img) card.appendChild(div('img', it.img));
      const zona = div('resp'); card.appendChild(zona);
      const vb = btnVoz(it.q + (it.opts && it.type === 'mcq' ? '. Opciones: ' + it.opts.join('. ') : '')); card.insertBefore(vb, card.querySelector('.enunciado').nextSibling);
      if (DB.auto) hablar(it.q);
      const terminar = (ok, detalle) => {
        registrar(it, ok); res.push({ it, ok }); if (ok) buenas++;
        zona.querySelectorAll('button, input').forEach(b => b.disabled = true);
        const fb = div('fb ' + (ok ? 'ok' : 'ko'), `<b>${ok ? ['¡Muy bien! 🎉', '¡Correcto! ⭐', '¡Excelente! 🌟'][Math.floor(Math.random() * 3)] : 'Casi… ¡sigue intentando! 💪'}</b>${detalle ? `<p>${detalle}</p>` : ''}<p>${it.exp}</p>`);
        fb.appendChild(btnVoz((ok ? 'Muy bien. ' : 'Casi. ') + (detalle ? detalle + '. ' : '') + it.exp));
        fb.appendChild(boton(i < lista.length - 1 ? 'Siguiente ➡' : 'Ver resultado 🏁', 'btn', () => { i++; sig(); }));
        card.appendChild(fb); fb.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      };
      TIPOS[it.type](it, zona, terminar);
    };
    const resultado = () => {
      const main = pantalla('🏁 Resultado', salir, m.color);
      const pct = Math.round(100 * buenas / lista.length);
      const porTema = {}; res.forEach(r => { const k = r.it.tema; porTema[k] = porTema[k] || [0, 0]; porTema[k][1]++; if (r.ok) porTema[k][0]++; });
      const dom = Object.entries(porTema).filter(([, v]) => v[0] === v[1]).map(([k]) => T(m, k).titulo);
      const ref = Object.entries(porTema).filter(([, v]) => v[0] < v[1]).map(([k]) => T(m, k).titulo);
      if (modo === 'eval') { const p = P(); p.evals[m.id] = (p.evals[m.id] || []).concat([{ fecha: Date.now(), ok: buenas, total: lista.length, porTema }]); guardar(); }
      const card = div('card resultado', `<div class="puntaje">${buenas} / ${lista.length}</div><p class="pct">${pct} % de respuestas correctas</p>
        <p class="txt">${pct >= 85 ? '¡Excelente trabajo! 🌟' : pct >= 60 ? '¡Vas muy bien! Repasa lo que falta. 💪' : '¡Buen esfuerzo! Repasemos juntos los temas marcados. 🤖'}</p>
        ${dom.length ? `<h3>✅ Contenidos dominados</h3><ul>${dom.map(x => `<li>${x}</li>`).join('')}</ul>` : ''}
        ${ref.length ? `<h3>🔁 Contenidos para reforzar</h3><ul>${ref.map(x => `<li>${x}</li>`).join('')}</ul>` : ''}
        ${modo === 'eval' ? '<p class="nota">Esta es una evaluación de práctica. No es una nota oficial del colegio.</p>' : ''}`);
      card.appendChild(btnVoz(`Lograste ${buenas} de ${lista.length}. ${ref.length ? 'Para reforzar: ' + ref.join(', ') : 'Dominaste todos los contenidos.'}`));
      main.appendChild(card);
      const nav = div('nav');
      if (ref.length) nav.appendChild(boton('🔁 Repasar mis errores', 'btn', () => iniciarRepaso(m)));
      nav.appendChild(boton('🏠 Volver', 'btn suave', salir));
      main.appendChild(nav);
    };
    sig();
  }

  /* ---------- Tipos de actividad ---------- */
  const TIPOS = {
    mcq(it, z, fin) {
      const orden = mezclar(it.opts.map((o, k) => k)); const g = div('opciones');
      orden.forEach(k => g.appendChild(boton(esc(it.opts[k]), 'op', e => { const ok = k === it.a; e.currentTarget.classList.add(ok ? 'bien' : 'mal'); if (!ok) g.children[orden.indexOf(it.a)].classList.add('bien'); fin(ok, ok ? '' : `La respuesta correcta es: <b>${esc(it.opts[it.a])}</b>.`); })));
      z.appendChild(g);
    },
    fill(it, z, fin) { TIPOS.mcq(it, z, fin); },
    tf(it, z, fin) {
      const g = div('opciones dos');
      [[true, '✅ Verdadero'], [false, '❌ Falso']].forEach(([v, t]) => g.appendChild(boton(t, 'op', e => { const ok = v === it.a; e.currentTarget.classList.add(ok ? 'bien' : 'mal'); fin(ok, ok ? '' : `Era <b>${it.a ? 'Verdadero' : 'Falso'}</b>.`); })));
      z.appendChild(g);
    },
    match(it, z, fin) {
      const izq = it.pairs.map((p, k) => [p[0], k]), der = mezclar(it.pairs.map((p, k) => [p[1], k]));
      const unido = {}; let sel = null;
      z.appendChild(div('ayuda', 'Toca un elemento de la izquierda y luego su pareja de la derecha.'));
      const w = div('match'), a = div('col'), b = div('col'); w.append(a, b); z.appendChild(w);
      const colores = ['#A9DCF2', '#FFC4D6', '#C2E89A', '#FFE08A', '#C9B6F0', '#FFCBA4'];
      const pintar = () => { a.querySelectorAll('button').forEach(x => { const k = +x.dataset.k; x.style.background = unido[k] != null ? colores[k % 6] : ''; x.classList.toggle('sel', sel === k); }); b.querySelectorAll('button').forEach(x => { const k = +x.dataset.k; const de = Object.keys(unido).find(q => unido[q] === k); x.style.background = de != null ? colores[de % 6] : ''; }); };
      izq.forEach(([t, k]) => { const x = boton(esc(t), 'op'); x.dataset.k = k; x.onclick = () => { sel = k; pintar(); }; a.appendChild(x); });
      der.forEach(([t, k]) => { const x = boton(esc(t), 'op'); x.dataset.k = k; x.onclick = () => { if (sel == null) return aviso('Primero toca un elemento de la izquierda.'); Object.keys(unido).forEach(q => { if (unido[q] === k) delete unido[q]; }); unido[sel] = k; sel = null; pintar(); }; b.appendChild(x); });
      z.appendChild(boton('Comprobar ✔️', 'btn', () => { if (Object.keys(unido).length < it.pairs.length) return aviso('Une todas las parejas antes de comprobar.'); const ok = it.pairs.every((p, k) => unido[k] === k); fin(ok, ok ? '' : 'Parejas correctas: ' + it.pairs.map(p => `<b>${esc(p[0])}</b> → ${esc(p[1])}`).join(' · ')); }));
    },
    order(it, z, fin) {
      const sol = it.items; let disp = mezclar(sol.map((t, k) => k)); if (disp.every((v, k) => v === k) && sol.length > 1) disp = disp.reverse(); const elegido = [];
      z.appendChild(div('ayuda', 'Toca los elementos en el orden correcto. Si te equivocas, toca "Borrar".'));
      const fila = div('orden'), banco = div('banco'); z.append(fila, banco);
      const pintar = () => { fila.innerHTML = elegido.map((k, n) => `<span class="ch">${n + 1}. ${esc(sol[k])}</span>`).join('') || '<span class="vacio">Aquí aparecerá tu orden</span>'; banco.innerHTML = ''; disp.forEach(k => { if (!elegido.includes(k)) banco.appendChild(boton(esc(sol[k]), 'op', () => { elegido.push(k); pintar(); })); }); };
      pintar();
      const r = div('fila'); r.append(boton('Borrar ↩', 'btn suave', () => { elegido.length = 0; pintar(); }), boton('Comprobar ✔️', 'btn', () => { if (elegido.length < sol.length) return aviso('Ordena todos los elementos.'); const ok = elegido.every((v, k) => v === k); fin(ok, ok ? '' : 'Orden correcto: ' + sol.map((s, n) => `${n + 1}. ${esc(s)}`).join(' → ')); })); z.appendChild(r);
    },
    sort(it, z, fin) {
      const asign = {}; let sel = null;
      z.appendChild(div('ayuda', 'Toca una palabra y después el grupo donde va.'));
      const banco = div('banco'), grupos = div('grupos-sort'); z.append(banco, grupos);
      const pintar = () => {
        banco.innerHTML = ''; it.items.forEach(([t], k) => { if (asign[k] == null) { const x = boton(esc(t), 'op' + (sel === k ? ' sel' : ''), () => { sel = k; pintar(); }); banco.appendChild(x); } });
        if (!banco.children.length) banco.innerHTML = '<span class="vacio">¡Listo! Revisa y comprueba.</span>';
        grupos.innerHTML = ''; it.groups.forEach((g, gi) => { const c = div('caja'); const tit = boton(`<b>${esc(g)}</b>`, 'caja-t', () => { if (sel == null) return aviso('Primero toca una palabra.'); asign[sel] = gi; sel = null; pintar(); }); c.appendChild(tit); it.items.forEach(([t], k) => { if (asign[k] === gi) c.appendChild(boton(esc(t) + ' ✖', 'chip', () => { delete asign[k]; pintar(); })); }); grupos.appendChild(c); });
      };
      pintar();
      z.appendChild(boton('Comprobar ✔️', 'btn', () => { if (Object.keys(asign).length < it.items.length) return aviso('Clasifica todas las palabras.'); const malos = it.items.filter(([t, g], k) => asign[k] !== g); fin(!malos.length, malos.length ? 'Revisa: ' + malos.map(([t, g]) => `<b>${esc(t)}</b> va en «${esc(it.groups[g])}»`).join(' · ') : ''); }));
    },
    spot(it, z, fin) {
      const w = div('img grande', it.svg); z.appendChild(div('ayuda', 'Toca la parte correcta del dibujo.')); z.appendChild(w);
      w.querySelectorAll('[data-part]').forEach(g => g.addEventListener('click', () => { if (z.dataset.listo) return; z.dataset.listo = 1; const ok = g.dataset.part === it.a; g.classList.add(ok ? 'bien' : 'mal'); const c = w.querySelector(`[data-part="${it.a}"]`); if (c) c.classList.add('bien'); fin(ok, ok ? '' : 'La parte correcta quedó marcada en verde.'); }));
    },
    num(it, z, fin) {
      const inp = document.createElement('input'); inp.type = 'text'; inp.inputMode = 'numeric'; inp.pattern = '[0-9]*'; inp.autocomplete = 'off'; inp.className = 'numin'; inp.setAttribute('aria-label', 'Tu respuesta');
      const pad = div('pad'); [1, 2, 3, 4, 5, 6, 7, 8, 9, '⌫', 0, '✔️'].forEach(k => pad.appendChild(boton(String(k), k === '✔️' ? 'k ok' : 'k', () => { if (k === '⌫') inp.value = inp.value.slice(0, -1); else if (k === '✔️') comprobar(); else if (inp.value.length < 4) inp.value += k; })));
      const comprobar = () => { const v = parseInt(inp.value, 10); if (isNaN(v)) return aviso('Escribe un número.'); const ok = v === it.a; fin(ok, ok ? '' : `La respuesta correcta es <b>${it.a}</b>.`); };
      inp.addEventListener('keydown', e => { if (e.key === 'Enter') comprobar(); });
      inp.readOnly = matchMedia('(pointer:coarse)').matches; // en celular se usa el teclado de la app
      z.append(inp, pad);
    },
    clock(it, z, fin) {
      let h = 12, m = 0; const w = div('img'), dig = div('dig');
      const pinta = () => { w.innerHTML = SVG.reloj(h, m); dig.textContent = `${h}:${String(m).padStart(2, '0')}`; };
      const r = div('fila'); r.append(boton('− 1 hora', 'btn suave', () => { h = h === 1 ? 12 : h - 1; pinta(); }), boton('+ 1 hora', 'btn suave', () => { h = h === 12 ? 1 : h + 1; pinta(); }), boton('− 5 min', 'btn suave', () => { m = (m + 55) % 60; pinta(); }), boton('+ 5 min', 'btn suave', () => { m = (m + 5) % 60; pinta(); }));
      z.append(w, dig, r, boton('Comprobar ✔️', 'btn', () => { const ok = h === it.h && m === it.m; fin(ok, ok ? '' : `Debía marcar <b>${it.h}:${String(it.m).padStart(2, '0')}</b>.`); })); pinta();
    },
    shade(it, z, fin) {
      const on = new Set(), w = div('img grande'), forma = it.shape || 'barra';
      const pinta = () => { w.innerHTML = svgFrac(on.size, it.d, forma, on); w.querySelectorAll('.fr').forEach(p => p.addEventListener('click', () => { const k = +p.dataset.i; on.has(k) ? on.delete(k) : on.add(k); pinta(); })); };
      z.append(div('ayuda', 'Toca las partes para pintarlas o despintarlas.'), w, boton('Comprobar ✔️', 'btn', () => { const ok = on.size === it.n; fin(ok, ok ? '' : `Había que pintar <b>${it.n}</b> de las ${it.d} partes. Pintaste ${on.size}.`); })); pinta();
    }
  };

  /* ---------- Juegos ---------- */
  function renderJuego(m) {
    const j = m.juego; const main = pantalla('🎮 ' + j.titulo, () => renderMateria(m.id), m.color);
    const card = div('card juego'); main.appendChild(card);
    const record = v => { const p = P(); const k = m.id; p.juegos[k] = Math.max(p.juegos[k] || 0, v); guardar(); return p.juegos[k]; };
    if (j.tipo === 'memorice') {
      const cartas = mezclar(j.pares.flatMap(([a, b], k) => [[a, k], [b, k]])); let abiertas = [], hechas = 0, intentos = 0;
      card.innerHTML = '<p class="paso">Encuentra las parejas: cada parte o concepto con lo que hace o significa.</p>';
      const g = div('memo'); card.appendChild(g); const st = div('nota', 'Intentos: 0'); card.appendChild(st);
      cartas.forEach(([t, k], n) => { const c = boton('❓', 'carta', () => { if (c.classList.contains('vista') || abiertas.length === 2) return; c.textContent = t; c.classList.add('vista'); abiertas.push([c, k]); if (abiertas.length === 2) { intentos++; st.textContent = 'Intentos: ' + intentos; const [[c1, k1], [c2, k2]] = abiertas; if (k1 === k2) { c1.classList.add('par'); c2.classList.add('par'); abiertas = []; hechas++; if (hechas === j.pares.length) { const best = record(Math.max(1, 100 - intentos * 3)); card.appendChild(div('fb ok', `<b>¡Lo lograste en ${intentos} intentos! 🎉</b><p>Tu mejor puntaje: ${best}</p>`)); card.appendChild(boton('Jugar otra vez', 'btn', () => renderJuego(m))); } } else setTimeout(() => { c1.textContent = '❓'; c2.textContent = '❓'; c1.classList.remove('vista'); c2.classList.remove('vista'); abiertas = []; }, 1100); } }); g.appendChild(c); });
    } else if (j.tipo === 'rapido') {
      const ronda = mezclar(j.items).slice(0, 12); let i = 0, pts = 0, racha = 0;
      const sig = () => {
        if (i >= ronda.length) { const best = record(pts); card.innerHTML = `<div class="puntaje">${pts} / ${ronda.length}</div><p class="txt">¡Terminaste! Tu mejor puntaje: ${best}</p>`; card.appendChild(boton('Jugar otra vez', 'btn', () => renderJuego(m))); return; }
        const [t, g] = ronda[i]; card.innerHTML = `<p class="paso">${i + 1} de ${ronda.length} · ⭐ ${pts} · 🔥 racha ${racha}</p><div class="palabra">${esc(t)}</div>`;
        const r = div('opciones dos'); j.grupos.forEach((gr, gi) => r.appendChild(boton(gr, 'op', () => { const ok = gi === g; if (ok) { pts++; racha++; } else racha = 0; const extra = j.ayuda && j.ayuda[t] ? ` Se escribe <b>${j.ayuda[t]}</b>.` : ''; r.querySelectorAll('button').forEach(b => b.disabled = true); card.appendChild(div('fb ' + (ok ? 'ok' : 'ko'), `<b>${ok ? '¡Bien!' : 'Era ' + esc(j.grupos[g])}</b>${extra}`)); setTimeout(() => { i++; sig(); }, ok ? 800 : 1800); })));
        card.appendChild(r);
      }; sig();
    } else if (j.tipo === 'tablas') {
      let pts = 0, t0 = 0, timer = null, a, b, inp;
      card.innerHTML = '<p class="txt">Resuelve todas las multiplicaciones que puedas en 60 segundos. Si te equivocas, no pasa nada: aparece la respuesta y sigues.</p>';
      card.appendChild(boton('▶️ ¡Partir!', 'btn grande', () => { pts = 0; t0 = Date.now(); nueva(); timer = setInterval(tick, 250); }));
      const nueva = () => { a = 2 + Math.floor(Math.random() * 9); b = 2 + Math.floor(Math.random() * 9); card.innerHTML = `<p class="paso" id="tt">⏱ 60 · ⭐ ${pts}</p><div class="palabra">${a} × ${b} = ?</div>`; inp = document.createElement('input'); inp.className = 'numin'; inp.readOnly = true; const pad = div('pad'); [1, 2, 3, 4, 5, 6, 7, 8, 9, '⌫', 0, '✔️'].forEach(k => pad.appendChild(boton(String(k), k === '✔️' ? 'k ok' : 'k', () => { if (k === '⌫') inp.value = inp.value.slice(0, -1); else if (k === '✔️') ok(); else if (inp.value.length < 3) inp.value += k; }))); card.append(inp, pad); tick(); };
      const ok = () => { const v = +inp.value; if (v === a * b) { pts++; nueva(); } else { aviso(`${a} × ${b} = ${a * b}`); nueva(); } };
      const tick = () => { const s = 60 - Math.floor((Date.now() - t0) / 1000); const tt = $('#tt'); if (tt) tt.textContent = `⏱ ${Math.max(0, s)} · ⭐ ${pts}`; if (s <= 0) { clearInterval(timer); const best = record(pts); card.innerHTML = `<div class="puntaje">${pts}</div><p class="txt">multiplicaciones correctas en 60 segundos. Tu mejor marca: ${best}</p>`; card.appendChild(boton('Jugar otra vez', 'btn', () => renderJuego(m))); } };
    }
  }

  /* ---------- Panel del adulto ---------- */
  function renderAdulto() {
    const main = pantalla('👩‍🏫 Panel para el adulto', DB.actual ? renderInicio : renderPerfiles, '#A8E6D4');
    main.appendChild(div('intro', 'Avance de cada perfil en este equipo. Los datos no salen de este dispositivo. "Comprueba" muestra el último resultado de la evaluación de práctica.'));
    const tb = document.createElement('table'); tb.className = 'adulto';
    tb.innerHTML = `<tr><th>Perfil</th>${MATERIAS.map(m => `<th>${m.emoji} ${m.corto}</th>`).join('')}</tr>` + [1, 2, 3, 4, 5].map(n => { const p = DB.perfiles[n]; return `<tr><th>${ANIMALES[n - 1]} ${n}</th>${MATERIAS.map(m => { if (!p) return '<td>—</td>'; const ev = (p.evals[m.id] || []).slice(-1)[0]; return `<td>Avance ${avanceMateria0(p, m)} %<br><small>Comprueba: ${ev ? ev.ok + '/' + ev.total : '—'}<br>Errores por repasar: ${(p.errores[m.id] || []).length}</small></td>`; }).join('')}</tr>`; }).join('');
    const wrap = div('tablawrap'); wrap.appendChild(tb); main.appendChild(wrap);
    if (DB.actual && P()) {
      const p = P(); const det = div('card');
      det.innerHTML = `<h3>Detalle del perfil ${ANIMALES[DB.actual - 1]} ${DB.actual}</h3>` + MATERIAS.map(m => `<h4>${m.emoji} ${m.corto}</h4><ul class="det">${m.temas.map(t => { const r = p.temas[`${m.id}.${t.id}`] || { ok: 0, ko: 0 }; return `<li>${p.vistos[`${m.id}.${t.id}`] ? '📘' : '·'} ${t.titulo}: <b>${r.ok}</b> ✔ / <b>${r.ko}</b> ✖</li>`; }).join('')}</ul>`).join('');
      main.appendChild(det);
    }
    const ajustes = div('card');
    ajustes.innerHTML = `<h3>Ajustes</h3><label class="sw"><input type="checkbox" id="auto" ${DB.auto ? 'checked' : ''}> Leer en voz alta automáticamente cada explicación y pregunta</label><p class="nota">Voz detectada: ${VOZ.voz ? esc(VOZ.voz.name + ' (' + VOZ.voz.lang + ')') : 'ninguna en español; se usará la voz por defecto del equipo'}.</p>`;
    main.appendChild(ajustes);
    ajustes.querySelector('#auto').onchange = e => { DB.auto = e.target.checked; guardar(); };
    main.appendChild(div('card', `<h3>Prueba piloto y fuentes</h3><p class="txt">El protocolo explica cómo organizar las sesiones, qué observar y trae la hoja de observación para imprimir (sin datos personales). También lista todos los contenidos de la app y las fuentes curriculares usadas.</p><a class="btn" href="protocolo.html" style="text-decoration:none;text-align:center">📋 Abrir protocolo y hoja de observación</a><p class="nota">Fuentes: Bases Curriculares y recursos de 3.º básico de curriculumnacional.cl (Mineduc) y objetivos de aprendizaje del Plan Sumo Primero. Las lecturas y los dibujos son originales de esta app.</p>`));
    const borrar = div('card');
    borrar.innerHTML = '<h3>Reiniciar progreso</h3><p class="txt">Borra el avance de un perfil (no se puede deshacer).</p>';
    const fila = div('fila');
    [1, 2, 3, 4, 5].forEach(n => fila.appendChild(boton(`${ANIMALES[n - 1]} ${n}`, 'btn suave', () => {
      const conf = div('fb ko', `<b>¿Borrar todo el avance del perfil ${ANIMALES[n - 1]} ${n}?</b>`);
      conf.append(boton('Sí, borrar', 'btn', () => { delete DB.perfiles[n]; if (DB.actual === n) DB.actual = null; guardar(); renderAdulto(); }), boton('Cancelar', 'btn suave', () => conf.remove()));
      borrar.appendChild(conf);
    })));
    borrar.appendChild(fila); main.appendChild(borrar);
  }

  /* ---------- Inicio ---------- */
  window.addEventListener('DOMContentLoaded', () => { DB.actual && DB.perfiles[DB.actual] ? renderInicio() : renderPerfiles(); });
  window.__TERCERO = { MATERIAS, TIPOS, paraVoz, itemPorId };
})();
