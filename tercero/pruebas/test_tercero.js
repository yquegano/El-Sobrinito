// Uso: servir la carpeta tercero/ (python3 -m http.server 8765) y ejecutar: node pruebas/test_tercero.js
// Prueba completa · Repaso 3.º básico
const { chromium } = require('playwright');
const fs = require('fs');
const URL = process.env.URL || 'http://localhost:8765/index.html';
const OUT = process.env.OUT || __dirname + '/test_out';
fs.mkdirSync(OUT, { recursive: true });
const log = [];
const fallo = [];
const ok = (cond, msg) => { (cond ? log : fallo).push((cond ? '✔ ' : '✖ ') + msg); };

// Lista de contenidos obligatorios del documento (materia, tema, palabras que deben aparecer en el tema)
const REQ = [
  ['ciencias', 'necesidades', ['agua', 'luz', 'aire'], 'OA1 Necesidades de las plantas'],
  ['ciencias', 'raiz', ['raiz'], 'OA1 Raíz'],
  ['ciencias', 'tallo', ['tallo'], 'OA1 Tallo'],
  ['ciencias', 'hojas', ['hoja'], 'OA1 Hojas'],
  ['ciencias', 'relacion', ['raiz', 'tallo', 'hoja'], 'OA1 Relación estructuras-necesidades'],
  ['ciencias', 'nativas', ['chile', 'nativa', 'autoctona'], 'OA2 Plantas de Chile, nativas y autóctonas'],
  ['ciencias', 'cultivos', ['cultivo', 'zona'], 'OA2 Cultivos por zona'],
  ['ciencias', 'ciclo', ['semilla', 'germina', 'fruto'], 'OA3 Ciclo de vida'],
  ['ciencias', 'polinizacion', ['polen', 'poliniza'], 'OA3 Polinización'],
  ['ciencias', 'dispersion', ['dispers', 'viento', 'animal'], 'OA3 Dispersión de semillas'],
  ['ciencias', 'alimentacion', ['aliment'], 'OA4 Alimentación'],
  ['ciencias', 'ambiente', ['oxigeno'], 'OA4 Oxígeno y medio ambiente'],
  ['ciencias', 'productos', ['medicinal', 'ornament', 'madera'], 'OA4 Productos derivados, ornamento, uso medicinal'],
  ['ciencias', 'cuidado', ['cuid'], 'OA4 Medidas de cuidado'],
  ['historia', 'grecia-ubicacion', ['grecia', 'mar'], 'Griegos: ubicación (mapa)'],
  ['historia', 'polis', ['polis'], 'Griegos: polis'],
  ['historia', 'piramide-griega', ['ciudadano', 'meteco', 'esclavo'], 'Griegos: pirámide social'],
  ['historia', 'vestimenta', ['quiton'], 'Griegos: vestimenta'],
  ['historia', 'vivienda', ['patio'], 'Griegos: vivienda'],
  ['historia', 'familia', ['familia'], 'Griegos: familia'],
  ['historia', 'legado-griego', ['democracia', 'olimpic'], 'Griegos: legados'],
  ['historia', 'roma-ubicacion', ['italica', 'roma'], 'Romanos: ubicación geográfica'],
  ['historia', 'construcciones', ['acueducto', 'coliseo'], 'Romanos: construcciones'],
  ['historia', 'piramide-romana', ['patricio', 'plebeyo', 'esclavo'], 'Romanos: pirámide social'],
  ['historia', 'grecia-roma', ['griego', 'romano'], 'Griegos y romanos no son lo mismo'],
  ['historia', 'derechos', ['derecho'], 'Derechos (ejemplos)'],
  ['historia', 'deberes', ['deber'], 'Deberes (ejemplos)'],
  ['historia', 'convivencia', ['convivencia'], 'Buena convivencia'],
  ['lenguaje', 'leyenda', ['leyenda'], 'Comprensión: leyenda'],
  ['lenguaje', 'articulo', ['articulo', 'informa'], 'Comprensión: artículo informativo'],
  ['lenguaje', 'drama', ['acotacion', 'personaje'], 'Comprensión: texto dramático'],
  ['lenguaje', 'uso-b', [' b'], 'Ortografía: uso de B'],
  ['lenguaje', 'uso-v', [' v'], 'Ortografía: uso de V'],
  ['lenguaje', 'individual', ['individual'], 'Sustantivo individual'],
  ['lenguaje', 'colectivo', ['colectivo'], 'Sustantivo colectivo'],
  ['matematica', 'perimetro', ['perimetro'], 'Perímetro'],
  ['matematica', 'multiplicacion', ['×'], 'Multiplicaciones'],
  ['matematica', 'tablas', ['×'], 'Tablas'],
  ['matematica', 'problemas-mult', ['cada'], 'Problemas de multiplicación'],
  ['matematica', 'linea-tiempo', ['linea de tiempo'], 'Línea de tiempo'],
  ['matematica', 'calendario', ['calendario'], 'Calendario'],
  ['matematica', 'hora', ['hora'], 'Hora'],
  ['matematica', 'minutos', ['minuto'], 'Minutos'],
  ['matematica', 'angulos', ['90', '45'], 'Ángulos de 90° y 45°'],
  ['matematica', 'frac-lectura', ['cuarto', 'tercio', 'medio'], 'Fracciones: lectura'],
  ['matematica', 'frac-graficas', ['pinta'], 'Fracciones: representaciones'],
  ['matematica', 'frac-ordenar', ['mayor'], 'Fracciones: ordenar'],
  ['matematica', 'frac-problemas', ['pizza', 'torta', 'chocolate'], 'Fracciones: problemas', 'any'],
  ['matematica', 'pictogramas', ['pictograma'], 'Pictogramas'],
  ['matematica', 'barras', ['barra'], 'Gráficos de barra'],
];

(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1, hasTouch: false });
  await ctx.addInitScript(() => { // voz simulada: cada frase dura 1,5 s hasta que se cancela
    const timers = new Set(); let cur = null;
    const fake = { speaking: false, getVoices: () => [{ name: 'Prueba es-CL', lang: 'es-CL' }], speak(u) { cur = u; fake.speaking = true; const t = setTimeout(() => { timers.delete(t); fake.speaking = false; u.onend && u.onend(); }, 1500); timers.add(t); }, cancel() { timers.forEach(clearTimeout); timers.clear(); fake.speaking = false; if (cur && cur.onerror) { const c = cur; cur = null; setTimeout(() => c.onerror({ error: 'interrupted' }), 0); } }, onvoiceschanged: null };
    Object.defineProperty(window, 'speechSynthesis', { value: fake, configurable: true });
    window.SpeechSynthesisUtterance = function (t) { this.text = t; };
  });
  const page = await ctx.newPage();
  const errores = [];
  page.on('pageerror', e => errores.push('pageerror: ' + e.message));
  page.on('console', m => { if (m.type() === 'error' && !/fonts\.g/.test(m.text()) && !/Failed to load resource/.test(m.text())) errores.push('console: ' + m.text()); });
  page.on('requestfailed', r => { if (!/fonts\.g/.test(r.url())) errores.push('requestfailed: ' + r.url()); });
  await page.goto(URL);
  await page.waitForSelector('.materias');
  ok(!(await page.$('.perfiles, .pf')), 'Perfil único: la app abre directo en las asignaturas, sin elegir perfil');
  await page.screenshot({ path: OUT + '/01_inicio.png', fullPage: true });
  await page.evaluate(() => document.fonts.ready);
  ok(await page.evaluate(() => document.fonts.check('20px Chewy') && document.fonts.check('700 16px "Baloo 2"')), 'Tipografías propias cargadas desde la app (sin Google Fonts)');
  ok(!(await page.isVisible('#voz')), 'Barra de voz oculta mientras no se lee nada');

  // ---------- 1. Validación estática de datos ----------
  const est = await page.evaluate((REQ) => {
    const norm = s => String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
    const strip = h => { const d = document.createElement('div'); d.innerHTML = h; return d.textContent; };
    const out = { probl: [], req: [], resumen: {} };
    const M = window.MATERIAS;
    const checkItem = (it, where) => {
      const P = m => out.probl.push(where + ': ' + m);
      if (!it.q || !it.exp) P('sin enunciado o explicación');
      switch (it.type) {
        case 'mcq': case 'fill':
          if (!Array.isArray(it.opts) || it.opts.length < 2) P('opciones');
          else { if (!(it.a >= 0 && it.a < it.opts.length)) P('a fuera de rango'); if (new Set(it.opts.map(String)).size !== it.opts.length) P('opciones repetidas'); }
          if (it.type === 'fill' && !/_{2,}/.test(it.q)) P('fill sin ___'); break;
        case 'tf': if (typeof it.a !== 'boolean') P('tf a no booleano'); break;
        case 'match': if (!it.pairs || it.pairs.length < 2) P('pares'); else if (new Set(it.pairs.map(p => p[1])).size !== it.pairs.length || new Set(it.pairs.map(p => p[0])).size !== it.pairs.length) P('pares repetidos'); break;
        case 'order': if (!it.items || it.items.length < 2 || new Set(it.items).size !== it.items.length) P('order items'); break;
        case 'sort': if (!it.groups || it.groups.length < 2 || !it.items || it.items.some(([t, g]) => !(g >= 0 && g < it.groups.length)) || new Set(it.items.map(x => x[0])).size !== it.items.length) P('sort'); if (it.groups && it.items && it.groups.some((g, gi) => !it.items.some(x => x[1] === gi))) P('sort: grupo vacío'); break;
        case 'spot': if (!it.svg || !it.svg.includes(`data-part="${it.a}"`)) P('spot sin parte ' + it.a); break;
        case 'num': if (typeof it.a !== 'number' || !Number.isInteger(it.a) || it.a < 0 || it.a > 9999) P('num a inválido ' + it.a); break;
        case 'clock': if (!(it.h >= 1 && it.h <= 12) || it.m % 5 || it.m < 0 || it.m > 55) P('clock'); break;
        case 'shade': if (!(it.n >= 1 && it.n <= it.d && it.d >= 2 && it.d <= 8)) P('shade'); break;
        default: P('tipo desconocido ' + it.type);
      }
      if (it.texto && !(M.find(m => m.id === it.materia).textos || {})[it.texto]) P('texto inexistente ' + it.texto);
    };
    M.forEach(m => {
      const r = { temas: m.temas.length, items: 0, ev: 0, tiposEv: {}, gen: 0 };
      const qs = new Map();
      m.temas.forEach(t => {
        if (!t.aprende || !t.aprende.length) out.probl.push(`${m.id}.${t.id}: sin Aprende`);
        const prac = t.items.filter(i => !i.ev), ev = t.items.filter(i => i.ev);
        if (prac.length < 2 && !t.gen) out.probl.push(`${m.id}.${t.id}: menos de 2 ejercicios de práctica`);
        if (!ev.length) out.probl.push(`${m.id}.${t.id}: sin pregunta de evaluación`);
        t.items.forEach((it, i) => { checkItem(it, `${m.id}.${t.id}.${i}`); const k = norm(it.q) + (it.img || '') + (it.svg || ''); if (qs.has(k)) out.probl.push(`${m.id}: pregunta repetida «${it.q}» en ${qs.get(k)} y ${t.id}`); qs.set(k, t.id); r.items++; if (it.ev) { r.ev++; r.tiposEv[it.type] = (r.tiposEv[it.type] || 0) + 1; } });
        if (t.gen) { r.gen++; for (let k = 0; k < 300; k++) { const g = t.gen(); g.materia = m.id; checkItem(g, `${m.id}.${t.id}.gen`); } }
        (t.aprende || []).forEach((c, ci) => { if (c.img && /<img|(href|src)="https?:/.test(c.img)) out.probl.push(`${m.id}.${t.id}.aprende${ci}: imagen externa`); });
      });
      out.resumen[m.id] = r;
    });
    REQ.forEach(([mid, tid, kws, nombre, modo]) => {
      const m = M.find(x => x.id === mid); const t = m && m.temas.find(x => x.id === tid);
      if (!t) { out.req.push([nombre, false, 'tema no existe']); return; }
      const txtApr = norm(t.aprende.map(c => c.t + ' ' + strip(c.txt)).join(' '));
      const txtItems = norm(t.items.map(i => [i.q, ...(i.opts || []), ...(i.pairs || []).flat(), ...(i.items || []).flat(), i.exp].join(' ')).join(' ') + (t.gen ? ' ' + t.gen().q + ' ' + t.gen().exp : ''));
      const textos = norm(t.items.filter(i => i.texto).map(i => strip(m.textos[i.texto].html) + m.textos[i.texto].tipo).join(' '));
      const all = txtApr + ' ' + txtItems + ' ' + textos;
      const faltan = kws.filter(k => !all.includes(norm(k)));
      const okKw = modo === 'any' ? faltan.length < kws.length : faltan.length === 0;
      const prac = t.items.filter(i => !i.ev).length + (t.gen ? 1 : 0), ev = t.items.filter(i => i.ev).length;
      out.req.push([nombre, okKw && t.aprende.length > 0 && prac > 0 && ev > 0, `Aprende ${t.aprende.length} · Práctica ${prac}${t.gen ? '+generador' : ''} · Evaluación ${ev}${faltan.length ? ' · faltan palabras: ' + faltan.join(',') : ''}`]);
    });
    return out;
  }, REQ);
  est.probl.forEach(p => ok(false, 'Datos: ' + p));
  ok(est.probl.length === 0, `Validación de datos: ${est.probl.length} problemas`);
  est.req.forEach(([n, b, d]) => ok(b, `Contenido «${n}»: ${d}`));
  Object.entries(est.resumen).forEach(([k, r]) => { ok(Object.keys(r.tiposEv).length >= 4, `${k}: evaluación con ${r.ev} preguntas y ${Object.keys(r.tiposEv).length} formatos (${Object.entries(r.tiposEv).map(([a, b]) => a + ':' + b).join(', ')}) · ${r.items} ítems en total · ${r.gen} generadores`); });
  fs.writeFileSync(OUT + '/cobertura.json', JSON.stringify(est, null, 1));

  // ---------- helpers de interacción ----------
  const clickTxt = async (sel, txt) => { const loc = page.locator(sel, { hasText: txt }).first(); await loc.click(); };
  const clickExact = async (sel, txt) => {
    const done = await page.evaluate(([sel, txt]) => { const el = [...document.querySelectorAll(sel)].find(b => b.textContent.trim() === txt.trim() && !b.disabled); if (el) { el.click(); return true; } return false; }, [sel, txt]);
    if (!done) throw new Error(`No encontré «${txt}» en ${sel}`);
  };
  const decode = s => s; // los textos se comparan con textContent
  const vistosTipo = new Set();
  async function responder(correcto = true) {
    const it = await page.evaluate(() => { const a = window.__TERCERO.actual; return JSON.parse(JSON.stringify(a)); });
    const t = it.type;
    if (!vistosTipo.has(t)) { vistosTipo.add(t); await page.screenshot({ path: OUT + `/tipo_${t}.png`, fullPage: true }); }
    if (t === 'mcq' || t === 'fill') { const target = correcto ? it.opts[it.a] : it.opts[(it.a + 1) % it.opts.length]; await clickExact('.resp .opciones .op', String(target)); }
    else if (t === 'tf') { await clickExact('.resp .op', (correcto ? it.a : !it.a) ? '✅ Verdadero' : '❌ Falso'); }
    else if (t === 'match') { for (let k = 0; k < it.pairs.length; k++) { const kk = correcto ? k : (k + 1) % it.pairs.length; await page.click(`.match .col:first-child button[data-k="${k}"]`); await page.click(`.match .col:last-child button[data-k="${kk}"]`); } await clickExact('.resp .btn', 'Comprobar ✔️'); }
    else if (t === 'order') { const seq = correcto ? it.items : it.items.slice().reverse(); for (const s of seq) await clickExact('.banco .op', s); await clickExact('.resp .btn', 'Comprobar ✔️'); }
    else if (t === 'sort') { for (const [txt, g] of it.items) { await clickExact('.banco .op', txt); const gi = correcto ? g : (g + 1) % it.groups.length; await page.locator('.caja-t').nth(gi).click(); } await clickExact('.resp .btn', 'Comprobar ✔️'); }
    else if (t === 'spot') { await page.evaluate(([a, c]) => { const parts = [...document.querySelectorAll('.resp [data-part]')]; const el = c ? parts.find(p => p.dataset.part === a) : parts.find(p => p.dataset.part !== a); el.dispatchEvent(new MouseEvent('click', { bubbles: true })); }, [it.a, correcto]); }
    else if (t === 'num') { const v = String(correcto ? it.a : it.a + 1); for (const d of v) await clickExact('.pad .k', d); await clickExact('.pad .k', '✔️'); }
    else if (t === 'clock') { const h = correcto ? it.h : (it.h % 12) + 1; for (let k = 0; k < h % 12; k++) await clickExact('.resp .btn', '+ 1 hora'); for (let k = 0; k < it.m / 5; k++) await clickExact('.resp .btn', '+ 5 min'); await clickExact('.resp .btn', 'Comprobar ✔️'); }
    else if (t === 'shade') { const n = correcto ? it.n : (it.n === 1 ? 2 : it.n - 1); for (let k = 0; k < n; k++) await page.evaluate(k => { document.querySelectorAll('.resp .fr')[k].dispatchEvent(new MouseEvent('click', { bubbles: true })); }, k); await clickExact('.resp .btn', 'Comprobar ✔️'); }
    await page.waitForSelector('.fb');
    const fbOk = await page.evaluate(() => document.querySelector('.fb').classList.contains('ok'));
    if (fbOk !== correcto) fallo.push(`✖ Respuesta ${correcto ? 'correcta' : 'incorrecta'} mal evaluada: ${it.type} «${it.q}»`);
    return it;
  }
  async function siguiente() { await page.evaluate(() => { const b = [...document.querySelectorAll('.fb .btn')].pop(); b.click(); }); }
  async function recorrer(fnCorrecto) {
    let n = 0, total = 0;
    while (await page.$('.card.q')) { const it = await responder(fnCorrecto(n)); n++; total++; await siguiente(); if (n > 200) break; }
    return total;
  }
  const overflow = async (nombre) => { const w = await page.evaluate(() => [document.documentElement.scrollWidth, document.documentElement.clientWidth]); if (w[0] > w[1] + 1) fallo.push(`✖ Desborde horizontal en ${nombre}: ${w[0]} > ${w[1]}`); };
  const ir = async (mid) => { await page.evaluate(() => { const b = document.querySelector('.top .back'); }); };

  // ---------- 2. Perfil ----------
  ok((await page.$$('.mat')).length === 4, 'Inicio muestra 4 asignaturas');
  ok(/Prueba: lunes, 23 de noviembre/.test(await page.textContent('.materias')), 'Inicio muestra la fecha de Ciencias (lunes 23 de noviembre)');
  await page.screenshot({ path: OUT + '/02_inicio.png', fullPage: true }); await overflow('inicio');

  const mats = ['ciencias', 'historia', 'lenguaje', 'matematica'];
  const nombresMat = { ciencias: 'Ciencias', historia: 'Historia', lenguaje: 'Lenguaje', matematica: 'Matemática' };
  const abrirMateria = async (mid) => { await page.evaluate(() => { document.querySelector('.top .perfil') }); await page.goto(URL); await page.waitForSelector('.materias'); await clickTxt('.mat', nombresMat[mid]); await page.waitForSelector('.secciones'); };

  for (const mid of mats) {
    // ---------- 3. Aprende: todas las explicaciones ----------
    await abrirMateria(mid);
    ok((await page.$$('.sec')).length === (mid === 'matematica' ? 8 : 7), `${mid}: ${mid === 'matematica' ? '8 secciones (con Tablas de multiplicar)' : '7 secciones'}`);
    const pos = await page.evaluate(() => { const a = document.querySelector('.secciones').getBoundingClientRect(), b = document.querySelector('.ruta').getBoundingClientRect(), s = [...document.querySelectorAll('.sec')].map(x => x.getBoundingClientRect().top); return { arriba: a.top < b.top, filas: new Set(s.map(Math.round)).size }; });
    ok(pos.arriba && pos.filas <= 2, `${mid}: todas las secciones arriba, una al lado de la otra (${pos.filas} filas), y la ruta debajo`);
    const ruta0 = await page.evaluate(() => ({ n: document.querySelectorAll('.ruta .paso-r').length, ahora: (document.querySelector('.ruta .ahora') || {}).textContent || '' }));
    ok(ruta0.n === 6 && /Te toca/.test(ruta0.ahora), `${mid}: ruta de aprendizaje con 6 pasos; ahora → «${ruta0.ahora.replace(/\s+/g, ' ').trim()}»`);
    if (mid === mats[0]) await page.screenshot({ path: OUT + `/03_secciones_${mid}.png`, fullPage: true });
    await clickTxt('.sec', 'Aprende');
    const nTemas = (await page.$$('.tema')).length;
    let pantallas = 0;
    for (let ti = 0; ti < nTemas; ti++) {
      await page.locator('.tema').nth(ti).click();
      while (true) {
        pantallas++;
        const rotas = await page.evaluate(() => [...document.querySelectorAll('img')].filter(i => !i.complete || !i.naturalWidth).length);
        if (rotas) fallo.push(`✖ ${mid}: imagen rota en Aprende`);
        await overflow(`${mid} aprende tema ${ti}`);
        if (ti === 0 && pantallas === 1) await page.screenshot({ path: OUT + `/04_aprende_${mid}.png`, fullPage: true });
        const sig = await page.$('.nav .btn:not(.suave)');
        const txt = sig ? await sig.textContent() : '';
        if (/Siguiente/.test(txt)) await sig.click(); else break;
      }
      await page.click('.top .back');
    }
    ok(pantallas > 0, `${mid}: Aprende recorrido (${nTemas} temas, ${pantallas} explicaciones)`);
    await page.click('.top .back');

    // ---------- 4. Escucha ----------
    await clickTxt('.sec', 'Escucha'); await page.locator('.tema').first().click();
    await clickTxt('.btn', 'Escuchar el tema');
    const vozVisible = await page.evaluate(() => !document.getElementById('voz').hidden);
    ok(vozVisible, `${mid}: Escucha muestra controles Pausa / Repetir / Parar`);
    await page.click('#vozPausa'); ok((await page.textContent('#vozPausa')).includes('Seguir'), `${mid}: botón Pausa cambia a Seguir`);
    await page.click('#vozPausa'); await page.click('#vozRep'); await page.click('#vozStop');
    ok(await page.evaluate(() => document.getElementById('voz').hidden), `${mid}: Parar oculta la barra de voz`);
    await page.click('.top .back'); await page.click('.top .back');

    // ---------- 5. Explora ----------
    await clickTxt('.sec', 'Explora');
    const nLab = (await page.$$('.tema')).length;
    for (let li = 0; li < nLab; li++) {
      await page.locator('.tema').nth(li).click();
      const parts = await page.$$('.card [data-part]');
      for (const p of parts) await p.evaluate(el => el.dispatchEvent(new MouseEvent('click', { bubbles: true })));
      if (parts.length) { const info = await page.textContent('.info'); ok(!/Toca una parte/.test(info), `${mid}: Explora lab ${li} responde al tocar (${parts.length} partes)`); }
      const btns = await page.$$('.card .fila .btn');
      for (let k = 0; k < Math.min(btns.length, 4); k++) { await page.locator('.card .fila .btn').nth(k).click(); }
      const frs = await page.$$('.card .fr'); if (frs.length) { await frs[0].evaluate(el => el.dispatchEvent(new MouseEvent('click', { bubbles: true }))); ok(/1\/\d/.test(await page.textContent('.card .dig')), `${mid}: fracciones interactivas pintan partes`); }
      while (await page.$('.card .nav .btn:not(.suave)')) { const t = await page.textContent('.card .nav .btn:not(.suave)'); if (!/Siguiente/.test(t)) break; await page.click('.card .nav .btn:not(.suave)'); }
      await overflow(`${mid} explora ${li}`);
      if (li === 0) await page.screenshot({ path: OUT + `/05_explora_${mid}.png`, fullPage: true });
      await page.click('.top .back');
    }
    ok(nLab >= 3, `${mid}: Explora con ${nLab} laboratorios`);
    await page.click('.top .back');

    // ---------- 6. Practica: todos los temas, todo correcto ----------
    await clickTxt('.sec', 'Practica');
    const nT = (await page.$$('.tema:not(.todo)')).length; let nPrac = 0;
    for (let ti = 0; ti < nT; ti++) {
      await page.locator('.tema:not(.todo)').nth(ti).click();
      if (ti === 0) await page.screenshot({ path: OUT + `/06_practica_${mid}.png`, fullPage: true });
      nPrac += await recorrer(() => true);
      await overflow(`${mid} practica ${ti}`);
      await page.waitForSelector('.resultado'); await clickExact('.nav .btn', '🏠 Volver');
    }
    ok(nPrac > 0, `${mid}: Practica completa ${nPrac} ejercicios (${nT} temas) evaluados correctamente`);
    await page.locator('.tema.todo').click(); const nMix = await recorrer(() => true); ok(nMix === 10, `${mid}: Mezcla de todos los temas da 10 ejercicios`); await clickExact('.nav .btn', '🏠 Volver');

    // ---------- 7. Comprueba: todo correcto ----------
    await clickTxt('.sec', 'Comprueba');
    await clickTxt('.btn', 'Comenzar');
    const nEv = await recorrer(() => true);
    await page.waitForSelector('.resultado');
    const punt = await page.textContent('.puntaje');
    ok(punt.replace(/\s/g, '') === `${nEv}/${nEv}` && (await page.textContent('.pct')).includes('100 %'), `${mid}: Comprueba lo aprendido 100 % (${punt.trim()})`);
    ok((await page.textContent('.resultado')).includes('Contenidos dominados'), `${mid}: resultado lista contenidos dominados`);
    ok(/no es una nota oficial/i.test(await page.textContent('.resultado')), `${mid}: resultado aclara que no es nota oficial`);
    await page.screenshot({ path: OUT + `/07_resultado_${mid}.png`, fullPage: true });
    await clickExact('.nav .btn', '🏠 Volver');

    // ---------- 8. Comprueba con errores + Repasa ----------
    await clickTxt('.sec', 'Comprueba'); await clickTxt('.btn', 'Comenzar');
    await recorrer(n => n % 3 !== 0);
    const res = await page.textContent('.resultado');
    ok(res.includes('Contenidos para reforzar'), `${mid}: con errores, el resultado lista contenidos para reforzar`);
    await page.screenshot({ path: OUT + `/08_resultado_errores_${mid}.png`, fullPage: true });
    await clickExact('.nav .btn', '🔁 Repasar mis errores');
    const nRep = await recorrer(() => true);
    ok(nRep > 0, `${mid}: Repasa tus errores ofrece ${nRep} ejercicios`);
    await clickExact('.nav .btn', '🏠 Volver');
    const errTit = await page.getAttribute('.sec[title^="Repasa tus errores"]', 'title');
    ok(!(await page.$('.sec .badge')), `${mid}: tras repasar → «${errTit}» (sin errores pendientes)`);

    // ---------- 9. Juego: explicación con ejemplo (leída en voz alta) y juego ----------
    await clickTxt('.sec', 'Juega');
    await page.waitForSelector('.juego .ejemplo');
    const intro = await page.textContent('.juego');
    ok(/¿Cómo se juega\?/.test(intro) && /Ejemplo/.test(intro), `${mid}: el juego parte con «¿Cómo se juega?» y un ejemplo`);
    ok(await page.isVisible('#voz'), `${mid}: la explicación del juego se lee en voz alta sola`);
    await page.screenshot({ path: OUT + `/09a_juego_intro_${mid}.png`, fullPage: true });
    const tipo = await page.evaluate(mid => window.MATERIAS.find(m => m.id === mid).juego.tipo, mid);
    if (tipo === 'tablas') await clickExact('.tablas-sel .btn', 'del 7');
    await clickTxt('.btn', '¡A jugar!');
    if (tipo === 'memorice') {
      const ks = await page.evaluate(() => [...document.querySelectorAll('.carta[data-k]')].map(c => +c.dataset.k));
      for (const k of [...new Set(ks)]) { const idx = ks.map((v, i) => v === k ? i : -1).filter(i => i >= 0); for (const i of idx) await page.locator('.memo .carta').nth(i).click(); await page.waitForTimeout(60); }
      ok(!!(await page.$('.juego .fb.ok')), `${mid}: memorice se completa y muestra puntaje`);
      const dib = await page.evaluate(() => ({ svg: document.querySelectorAll('.memo .carta svg').length, copihue: !!document.querySelector('.memo svg[aria-label^="Copihue"]'), abeja: !!document.querySelector('.memo svg[aria-label="Abeja"]') }));
      ok(dib.svg >= 6 && dib.copihue && dib.abeja, `${mid}: las cartas del memorice tienen dibujos (${dib.svg}), entre ellos el copihue y la abeja`);
    } else if (tipo === 'rapido') {
      const J = await page.evaluate(mid => window.MATERIAS.find(m => m.id === mid).juego, mid);
      let cayo = false;
      for (let k = 0; k < 12; k++) {
        const sel = J.lluvia ? '.gota' : '.palabra';
        await page.waitForSelector(sel);
        if (J.lluvia && k === 0) { await page.waitForTimeout(10600); cayo = /Se cayó/.test(await page.textContent('.juego')); await page.waitForTimeout(2400); continue; }
        const w = (await page.textContent(sel)).trim(); const it = J.items.find(x => x[0] === w);
        await clickExact('.juego .op', J.grupos[it[1]]); await page.waitForTimeout(950);
      }
      const esperado = J.lluvia ? '11/12' : '12/12';
      ok((await page.textContent('.puntaje')).replace(/\s/g, '') === esperado, `${mid}: juego rápido ${esperado} al responder bien${J.lluvia ? ' (dejando caer 1 palabra)' : ''}`);
      if (J.lluvia) ok(cayo, `${mid}: en la lluvia, si la palabra llega al suelo aparece «¡Se cayó!» con la palabra bien escrita`);
    } else if (tipo === 'tablas') {
      const as = [];
      for (let k = 0; k < 5; k++) { const t = await page.textContent('.palabra'); const [a, b] = t.match(/\d+/g).map(Number); as.push(a); for (const d of String(a * b)) await clickExact('.pad .k', d); await clickExact('.pad .k', '✔️'); }
      ok((await page.textContent('#tt')).includes('⭐ 5') && as.every(a => a === 7) && /Tabla del 7/.test(await page.textContent('#tt')), `${mid}: carrera con la tabla elegida (del 7): 5 de 5, todas del 7`);
    }
    await page.screenshot({ path: OUT + `/09_juego_${mid}.png`, fullPage: true });
    await overflow(`${mid} juego`);
    if (mid === 'matematica') {
      await page.click('.top .back'); await clickTxt('.sec', 'Tablas');
      const t2 = await page.textContent('.tabla-mult');
      ok((await page.$$('.tabla-lista li')).length === 10 && /2 × 10 =\s*20/.test(t2), 'Tablas de multiplicar: muestra la tabla completa (2 × 1 … 2 × 10)');
      await clickExact('.tablas-sel .btn', 'del 9');
      const t9 = await page.textContent('.tabla-mult');
      ok(/9 × 4 =\s*36/.test(t9) && /suman 9/.test(t9), 'Tablas: la del 9 con su truco');
      await page.screenshot({ path: OUT + '/12_tablas.png', fullPage: true }); await overflow('tablas');
      await clickTxt('.btn', 'Esconder resultados');
      ok((await page.$$('.res.oculto')).length === 10, 'Tablas: se pueden esconder los resultados para autoevaluarse');
      await page.locator('.res.oculto').first().click(); ok((await page.textContent('.res')).trim() === '9', 'Tablas: tocar «?» muestra el resultado');
      await clickTxt('.btn', 'Carrera con esta tabla'); await page.waitForSelector('.tablas-sel .btn.on');
      ok((await page.textContent('.tablas-sel .btn.on')).trim() === 'del 9', 'Tablas: «Carrera con esta tabla» llega con la tabla ya elegida');
    }
    await abrirMateria(mid);
    const rutaF = await page.evaluate(() => ({ hechos: document.querySelectorAll('.ruta .paso-r.hecho').length, completa: /Ruta completa/.test(document.querySelector('.ruta').textContent) }));
    ok(rutaF.hechos === 6 && rutaF.completa, `${mid}: después de recorrer todo, la ruta muestra los 6 pasos con ✅ y «¡Ruta completa!»`);
    if (mid === 'ciencias') await page.screenshot({ path: OUT + '/03b_ruta_completa_ciencias.png', fullPage: true });
  }

  // ---------- 10. Panel adulto, reinicio y migración ----------
  await page.goto(URL); await page.waitForSelector('.materias');
  await page.click('.top .perfil'); await page.waitForSelector('table.adulto');
  const tabla = await page.textContent('table.adulto');
  ok(/\d+ %/.test(tabla) && /\d+\/\d+ \(\d+ %\)/.test(tabla), 'Panel adulto (botón ⚙️) muestra avance y último Comprueba de cada asignatura');
  await page.screenshot({ path: OUT + '/10_panel_adulto.png', fullPage: true }); await overflow('panel adulto');
  await clickTxt('.btn', 'Borrar el avance'); await clickExact('.fb .btn', 'Sí, borrar');
  const borrado = await page.evaluate(() => { const d = JSON.parse(localStorage.getItem('tercero_repaso_v1')); return !!d.perfil && Object.keys(d.perfil.evals).length === 0 && !d.perfiles; });
  ok(borrado, 'Reiniciar borra todo el avance (con confirmación en pantalla)');
  ok(await page.evaluate(() => !/nombre|rut|correo|email/i.test(localStorage.getItem('tercero_repaso_v1'))), 'localStorage sin datos personales');
  await page.evaluate(() => localStorage.setItem('tercero_repaso_v1', JSON.stringify({ actual: 3, auto: false, perfiles: { 3: { n: 3, items: {}, temas: {}, vistos: {}, errores: {}, evals: { ciencias: [{ fecha: Date.now(), ok: 5, total: 16, porTema: {} }] }, juegos: {} } } })));
  await page.goto(URL); await page.waitForSelector('.materias'); await page.click('.top .perfil'); await page.waitForSelector('table.adulto');
  ok(/5\/16/.test(await page.textContent('table.adulto')), 'Datos de la versión 1.0 (5 perfiles) se conservan al pasar a perfil único');

  // ---------- 11. Voz: texto que se lee ----------
  const voz = await page.evaluate(() => [window.__TERCERO.paraVoz('Pinta <b>3/4</b> de la barra: 4 × 5 = 20. Ángulo de 90°. Son las 3:15. Lado de 6 cm.'), window.__TERCERO.paraVoz('El ca___allo 🐴 corre.')]);
  ok(/tres cuartos/.test(voz[0]) && /4 por 5/.test(voz[0]) && /90 grados/.test(voz[0]) && /3 y 15/.test(voz[0]) && /6 centímetros/.test(voz[0]), 'Lectura en voz alta adapta fracciones, ×, grados, horas y cm: «' + voz[0] + '»');
  ok(/blanco/.test(voz[1]) && !/🐴/.test(voz[1]), 'Lectura en voz alta dice «blanco» en el espacio y omite emojis');

  // ---------- 12. Sin internet ----------
  const sw = await page.evaluate(async () => { if (!('serviceWorker' in navigator)) return 'sin SW'; const r = await navigator.serviceWorker.ready; return r.active ? 'activo' : 'no activo'; });
  ok(sw === 'activo', 'Service worker activo: ' + sw);
  await page.reload(); await page.waitForTimeout(800);
  await ctx.setOffline(true);
  await page.reload(); await page.waitForSelector('.materias', { timeout: 8000 }).catch(() => {});
  ok(!!(await page.$('.materias')), 'La app abre sin internet (modo avión)');
  await ctx.setOffline(false);

  // ---------- 13. Escritorio ----------
  await page.setViewportSize({ width: 1280, height: 900 }); await page.goto(URL); await page.waitForSelector('.materias');
  await page.screenshot({ path: OUT + '/11_escritorio.png' });

  ok(errores.length === 0, 'Errores de consola/página: ' + (errores.length ? errores.join(' | ') : 'ninguno'));
  await browser.close();
  const rep = [...fallo, ...log].join('\n');
  fs.writeFileSync(OUT + '/resultado.txt', rep);
  console.log(rep);
  console.log(`\nTOTAL: ${log.length} correctas, ${fallo.length} fallas`);
})().catch(e => { console.error('ERROR', e); console.log([...fallo, ...log].join('\n')); process.exit(1); });
