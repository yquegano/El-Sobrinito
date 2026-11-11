/* Ilustraciones propias (SVG) · Repaso 3.º básico · El Sobrinito · 11 nov 2026
   Todas se dibujan aquí: no hay imágenes externas. */
(function () {
  const S = {};
  const T = '#2E2435';
  const svg = (w, h, inner, label) => `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="${label || ''}" class="ilus" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;
  const txt = (x, y, s, size = 14, anchor = 'middle', weight = 700, fill = T) => `<text x="${x}" y="${y}" font-size="${size}" font-weight="${weight}" text-anchor="${anchor}" fill="${fill}" font-family="Baloo 2, system-ui, sans-serif">${s}</text>`;

  /* ---------- CIENCIAS ---------- */
  // Planta con partes tocables: data-part = raiz | tallo | hojas | flor
  S.planta = (labels = false) => svg(300, 300, `
    <rect x="0" y="190" width="300" height="110" fill="#C9A27A"/>
    <rect x="0" y="186" width="300" height="8" fill="#8B6B4A"/>
    <g data-part="raiz" class="tap"><path d="M150 190 C150 220 130 240 110 262 M150 200 C155 230 175 245 195 268 M150 205 L150 280 M140 230 C125 236 112 236 100 230 M160 236 C176 240 188 238 200 232" stroke="#7A5230" stroke-width="7" fill="none" stroke-linecap="round"/><rect x="90" y="190" width="120" height="100" fill="transparent"/></g>
    <g data-part="tallo" class="tap"><rect x="143" y="70" width="14" height="122" rx="6" fill="#4C9A3A" stroke="${T}" stroke-width="3"/></g>
    <g data-part="hojas" class="tap"><path d="M150 140 C110 110 70 120 58 140 C80 160 120 160 150 140 Z" fill="#6CC04A" stroke="${T}" stroke-width="3"/><path d="M150 110 C190 80 230 90 242 110 C220 130 180 130 150 110 Z" fill="#6CC04A" stroke="${T}" stroke-width="3"/></g>
    <g data-part="flor" class="tap"><circle cx="150" cy="44" r="13" fill="#FFE08A" stroke="${T}" stroke-width="3"/>${[0, 60, 120, 180, 240, 300].map(a => `<ellipse cx="${150 + 24 * Math.cos(a * Math.PI / 180)}" cy="${44 + 24 * Math.sin(a * Math.PI / 180)}" rx="12" ry="8" transform="rotate(${a} ${150 + 24 * Math.cos(a * Math.PI / 180)} ${44 + 24 * Math.sin(a * Math.PI / 180)})" fill="#FFC4D6" stroke="${T}" stroke-width="2.5"/>`).join('')}<circle cx="150" cy="44" r="12" fill="#FFE08A" stroke="${T}" stroke-width="3"/></g>
    ${labels ? txt(40, 128, 'Hoja', 15) + txt(262, 98, 'Hoja', 15) + txt(205, 40, 'Flor', 15) + txt(185, 175, 'Tallo', 15) + txt(240, 260, 'Raíz', 15) : ''}
  `, 'Planta con raíz, tallo, hojas y flor');

  // Partes de la flor: petalos | estambres | pistilo
  S.flor = () => svg(300, 230, `
    <g data-part="petalos" class="tap"><path d="M60 150 C40 80 90 40 130 120 Z M240 150 C260 80 210 40 170 120 Z" fill="#FFC4D6" stroke="${T}" stroke-width="3"/><path d="M70 160 C110 200 190 200 230 160 Z" fill="#FFC4D6" stroke="${T}" stroke-width="3"/></g>
    <g data-part="estambres" class="tap">${[110, 125, 175, 190].map((x, i) => `<line x1="150" y1="150" x2="${x}" y2="${85 + (i % 2) * 10}" stroke="#8B6B4A" stroke-width="3"/><ellipse cx="${x}" cy="${80 + (i % 2) * 10}" rx="9" ry="6" fill="#FFB300" stroke="${T}" stroke-width="2"/>`).join('')}</g>
    <g data-part="pistilo" class="tap"><path d="M140 150 C135 120 145 100 150 70 C155 100 165 120 160 150 Z" fill="#A5DD8A" stroke="${T}" stroke-width="3"/><circle cx="150" cy="66" r="8" fill="#C2E89A" stroke="${T}" stroke-width="2.5"/></g>
    <rect x="145" y="160" width="10" height="70" fill="#4C9A3A"/>
    ${txt(40, 205, 'pétalo', 13, 'start')}${txt(222, 72, 'estambre', 13, 'start')}${txt(150, 30, 'pistilo', 13)}
  `, 'Flor con pétalos, estambres y pistilo');

  // Ciclo de vida (emoji con flechas)
  S.ciclo = () => {
    const st = [['🌰', 'Semilla'], ['🌱', 'Germinación'], ['🌿', 'Crecimiento'], ['🌸', 'Flor'], ['🍎', 'Fruto con semillas']];
    const pos = [[150, 40], [255, 115], [215, 230], [85, 230], [45, 115]];
    return svg(300, 285, st.map((s, i) => `<g><circle cx="${pos[i][0]}" cy="${pos[i][1]}" r="30" fill="#FFFCF5" stroke="${T}" stroke-width="3"/><text x="${pos[i][0]}" y="${pos[i][1] + 11}" font-size="30" text-anchor="middle">${s[0]}</text>${txt(pos[i][0], pos[i][1] + 48, s[1], 12)}</g>`).join('') +
      pos.map((p, i) => { const q = pos[(i + 1) % 5]; const mx = (p[0] + q[0]) / 2, my = (p[1] + q[1]) / 2; return `<text x="${mx}" y="${my + 6}" font-size="20" text-anchor="middle">➜</text>`; }).join(''), 'Ciclo de vida de una planta con flor');
  };

  /* ---------- HISTORIA ---------- */
  // Mapa simplificado (no a escala). data-part = grecia | italia | mediterraneo | egeo
  S.mapa = () => svg(320, 230, `
    <rect width="320" height="230" fill="#A9DCF2"/>
    <path d="M0 0 H320 V40 C260 50 230 30 200 45 C170 60 150 40 120 50 C90 60 60 40 0 55 Z" fill="#E8D9B0" stroke="${T}" stroke-width="2"/>
    <g data-part="italia" class="tap"><path d="M95 52 C100 75 110 95 125 115 C135 130 150 140 160 160 C165 168 158 175 150 170 C138 160 128 150 118 140 C105 125 95 110 88 90 C84 75 86 60 95 52 Z" fill="#FFCBA4" stroke="${T}" stroke-width="3"/><ellipse cx="135" cy="190" rx="16" ry="9" fill="#FFCBA4" stroke="${T}" stroke-width="2"/></g>
    <g data-part="grecia" class="tap"><path d="M200 52 C205 70 200 90 210 110 C215 125 205 135 215 150 C225 160 240 150 235 135 C232 120 245 110 240 95 C236 80 225 70 230 52 Z" fill="#C9B6F0" stroke="${T}" stroke-width="3"/>${[[255, 120], [265, 145], [250, 165], [270, 100]].map(p => `<circle cx="${p[0]}" cy="${p[1]}" r="5" fill="#C9B6F0" stroke="${T}" stroke-width="2"/>`).join('')}<ellipse cx="240" cy="190" rx="22" ry="6" fill="#C9B6F0" stroke="${T}" stroke-width="2"/></g>
    <g data-part="egeo" class="tap"><rect x="243" y="85" width="40" height="70" fill="transparent"/>${txt(270, 82, 'Mar Egeo', 11)}</g>
    <g data-part="mediterraneo" class="tap"><rect x="20" y="175" width="280" height="50" fill="transparent"/>${txt(170, 218, 'Mar Mediterráneo', 15)}</g>
    ${txt(70, 125, 'Roma', 13)}<circle cx="112" cy="110" r="5" fill="#C0392B"/>
    ${txt(205, 175, 'Atenas', 12)}<circle cx="228" cy="140" r="5" fill="#C0392B"/>
    ${txt(300, 222, 'no a escala', 10, 'end', 600, '#5b5163')}
  `, 'Mapa simplificado del Mediterráneo con Grecia e Italia');

  S.templo = () => svg(300, 200, `
    <polygon points="30,60 150,15 270,60" fill="#FFFCF5" stroke="${T}" stroke-width="3"/>
    <rect x="30" y="60" width="240" height="14" fill="#FFFCF5" stroke="${T}" stroke-width="3"/>
    ${[45, 85, 125, 165, 205, 245].map(x => `<rect x="${x}" y="74" width="14" height="96" fill="#FFFCF5" stroke="${T}" stroke-width="3"/>`).join('')}
    <rect x="20" y="170" width="260" height="16" fill="#FFFCF5" stroke="${T}" stroke-width="3"/>
    ${txt(150, 198, 'Templo griego con columnas', 12)}`, 'Templo griego con columnas');

  S.acueducto = () => svg(300, 200, `
    <rect x="10" y="40" width="280" height="22" fill="#FFCBA4" stroke="${T}" stroke-width="3"/>
    <path d="M14 51 H286" stroke="#4FA3D1" stroke-width="5"/>
    ${[10, 80, 150, 220].map(x => `<path d="M${x} 62 V170 H${x + 18} V110 A26 26 0 0 1 ${x + 70 - 18} 110 V170 H${x + 70} V62 Z" fill="#FFCBA4" stroke="${T}" stroke-width="3"/>`).join('')}
    ${txt(150, 30, '💧 el agua corre por arriba', 12)}${txt(150, 192, 'Acueducto romano', 12)}`, 'Acueducto romano con arcos');

  S.coliseo = () => svg(300, 180, `
    <ellipse cx="150" cy="120" rx="130" ry="40" fill="#E8D9B0" stroke="${T}" stroke-width="3"/>
    <path d="M20 120 V60 A130 40 0 0 1 280 60 V120" fill="#FFCBA4" stroke="${T}" stroke-width="3"/>
    ${[40, 70, 100, 130, 160, 190, 220, 250].map(x => `<path d="M${x} 112 V88 A9 9 0 0 1 ${x + 18} 88 V112" fill="#FFFCF5" stroke="${T}" stroke-width="2"/><path d="M${x} 78 V62 A9 9 0 0 1 ${x + 18} 62 V78" fill="#FFFCF5" stroke="${T}" stroke-width="2"/>`).join('')}
    ${txt(150, 172, 'Coliseo (anfiteatro romano)', 12)}`, 'Coliseo romano');

  S.casaGriega = () => svg(300, 220, `
    <rect x="30" y="20" width="240" height="180" fill="#FFCBA4" stroke="${T}" stroke-width="4"/>
    <rect x="105" y="70" width="90" height="80" fill="#C2E89A" stroke="${T}" stroke-width="3"/>${txt(150, 115, 'Patio', 15)}
    <line x1="30" y1="70" x2="105" y2="70" stroke="${T}" stroke-width="3"/><line x1="195" y1="70" x2="270" y2="70" stroke="${T}" stroke-width="3"/>
    <line x1="30" y1="150" x2="105" y2="150" stroke="${T}" stroke-width="3"/><line x1="195" y1="150" x2="270" y2="150" stroke="${T}" stroke-width="3"/>
    <line x1="105" y1="20" x2="105" y2="70" stroke="${T}" stroke-width="3"/><line x1="195" y1="20" x2="195" y2="70" stroke="${T}" stroke-width="3"/>
    <line x1="105" y1="150" x2="105" y2="200" stroke="${T}" stroke-width="3"/><line x1="195" y1="150" x2="195" y2="200" stroke="${T}" stroke-width="3"/>
    ${txt(67, 50, 'Andrón', 12)}${txt(232, 50, 'Gineceo', 12)}${txt(67, 115, 'Cocina', 12)}${txt(232, 115, 'Dormitorio', 12)}${txt(150, 50, 'Bodega', 12)}${txt(150, 180, 'Entrada', 12)}
    <rect x="135" y="196" width="30" height="8" fill="#FFFCF5" stroke="${T}" stroke-width="2"/>`, 'Plano de una casa griega con patio central');

  /* ---------- MATEMÁTICA ---------- */
  S.reloj = (h, m, opts = {}) => {
    const ah = ((h % 12) + m / 60) * 30 - 90, am = m * 6 - 90, r = Math.PI / 180;
    const nums = [...Array(12)].map((_, i) => { const n = i + 1, a = n * 30 - 90; return txt(100 + 72 * Math.cos(a * r), 100 + 72 * Math.sin(a * r) + 6, n, 17, 'middle', 800); }).join('');
    const ticks = [...Array(60)].map((_, i) => { const a = i * 6 * r, l = i % 5 ? 4 : 9; return `<line x1="${100 + (88 - l) * Math.cos(a)}" y1="${100 + (88 - l) * Math.sin(a)}" x2="${100 + 88 * Math.cos(a)}" y2="${100 + 88 * Math.sin(a)}" stroke="${T}" stroke-width="${i % 5 ? 1.5 : 3}"/>`; }).join('');
    return svg(200, 200, `<circle cx="100" cy="100" r="94" fill="#FFFCF5" stroke="${T}" stroke-width="5"/>${ticks}${nums}
      <line x1="100" y1="100" x2="${100 + 48 * Math.cos(ah * r)}" y2="${100 + 48 * Math.sin(ah * r)}" stroke="${T}" stroke-width="8" stroke-linecap="round"/>
      <line x1="100" y1="100" x2="${100 + 74 * Math.cos(am * r)}" y2="${100 + 74 * Math.sin(am * r)}" stroke="#C0392B" stroke-width="5" stroke-linecap="round"/>
      <circle cx="100" cy="100" r="6" fill="${T}"/>`, opts.label || 'Reloj análogo');
  };

  // Fracción: shape 'circulo' | 'barra'; shaded = cantidad pintada; parts clickable if interactive
  S.fraccion = (n, d, shape = 'barra', interactive = false) => {
    if (shape === 'circulo') {
      const parts = [...Array(d)].map((_, i) => {
        if (d === 1) return `<circle cx="80" cy="80" r="70" data-i="${i}" class="${interactive ? 'tap ' : ''}fr${i < n ? ' on' : ''}" fill="${i < n ? '#FFB300' : '#FFFCF5'}" stroke="${T}" stroke-width="3"/>`;
        const a0 = (i / d) * 2 * Math.PI - Math.PI / 2, a1 = ((i + 1) / d) * 2 * Math.PI - Math.PI / 2;
        const p = `M80 80 L${80 + 70 * Math.cos(a0)} ${80 + 70 * Math.sin(a0)} A70 70 0 ${a1 - a0 > Math.PI ? 1 : 0} 1 ${80 + 70 * Math.cos(a1)} ${80 + 70 * Math.sin(a1)} Z`;
        return `<path d="${p}" data-i="${i}" class="${interactive ? 'tap ' : ''}fr${i < n ? ' on' : ''}" fill="${i < n ? '#FFB300' : '#FFFCF5'}" stroke="${T}" stroke-width="3"/>`;
      }).join('');
      return svg(160, 160, parts, `Círculo dividido en ${d} partes iguales, ${n} pintadas`);
    }
    const w = 240 / d;
    return svg(260, 80, [...Array(d)].map((_, i) => `<rect x="${10 + i * w}" y="10" width="${w}" height="60" data-i="${i}" class="${interactive ? 'tap ' : ''}fr${i < n ? ' on' : ''}" fill="${i < n ? '#FFB300' : '#FFFCF5'}" stroke="${T}" stroke-width="3"/>`).join(''), `Barra dividida en ${d} partes iguales, ${n} pintadas`);
  };

  S.angulo = (deg, label = true) => {
    const r = Math.PI / 180, L = 110, x0 = 30, y0 = 130;
    const x2 = x0 + L * Math.cos(-deg * r), y2 = y0 + L * Math.sin(-deg * r);
    const ax = x0 + 30 * Math.cos(-deg * r), ay = y0 + 30 * Math.sin(-deg * r);
    const arc = deg === 90 ? `<path d="M${x0 + 22} ${y0} V${y0 - 22} H${x0}" fill="none" stroke="#C0392B" stroke-width="3"/>` : `<path d="M${x0 + 30} ${y0} A30 30 0 0 0 ${ax} ${ay}" fill="none" stroke="#C0392B" stroke-width="3"/>`;
    return svg(180, 150, `<line x1="${x0}" y1="${y0}" x2="${x0 + L}" y2="${y0}" stroke="${T}" stroke-width="5" stroke-linecap="round"/><line x1="${x0}" y1="${y0}" x2="${x2}" y2="${y2}" stroke="${T}" stroke-width="5" stroke-linecap="round"/>${arc}<circle cx="${x0}" cy="${y0}" r="5" fill="${T}"/>${label ? txt(150, 145, deg + '°', 14) : ''}`, label ? `Ángulo de ${deg} grados` : 'Ángulo');
  };

  // Figura en cuadrícula para perímetro: cells = lista de [col,fila]
  S.cuadricula = (cells, cols = 8, rows = 6, unit = 'cm') => {
    const c = 26, set = new Set(cells.map(p => p.join(',')));
    let g = '';
    for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) g += `<rect x="${10 + x * c}" y="${10 + y * c}" width="${c}" height="${c}" fill="${set.has(x + ',' + y) ? '#C2E89A' : '#FFFCF5'}" stroke="#C9C1D3" stroke-width="1"/>`;
    let edges = '';
    cells.forEach(([x, y]) => {
      const X = 10 + x * c, Y = 10 + y * c;
      if (!set.has(x + ',' + (y - 1))) edges += `<line x1="${X}" y1="${Y}" x2="${X + c}" y2="${Y}"/>`;
      if (!set.has(x + ',' + (y + 1))) edges += `<line x1="${X}" y1="${Y + c}" x2="${X + c}" y2="${Y + c}"/>`;
      if (!set.has((x - 1) + ',' + y)) edges += `<line x1="${X}" y1="${Y}" x2="${X}" y2="${Y + c}"/>`;
      if (!set.has((x + 1) + ',' + y)) edges += `<line x1="${X + c}" y1="${Y}" x2="${X + c}" y2="${Y + c}"/>`;
    });
    return svg(20 + cols * c, 40 + rows * c, g + `<g stroke="${T}" stroke-width="4" stroke-linecap="round">${edges}</g>` + txt(10, 32 + rows * c, `Cada lado de un cuadrito mide 1 ${unit}`, 12, 'start', 600), 'Figura sobre una cuadrícula');
  };
  // Perímetro de una figura de cuadritos (cuenta lados exteriores)
  S.perimetroCeldas = (cells) => { const set = new Set(cells.map(p => p.join(','))); let p = 0; cells.forEach(([x, y]) => { [[0, -1], [0, 1], [-1, 0], [1, 0]].forEach(([dx, dy]) => { if (!set.has((x + dx) + ',' + (y + dy))) p++; }); }); return p; };

  S.rectangulo = (a, b, unit = 'cm') => svg(260, 170, `<rect x="40" y="25" width="180" height="105" fill="#C2E89A" stroke="${T}" stroke-width="4"/>${txt(130, 18, a + ' ' + unit, 15)}${txt(130, 152, a + ' ' + unit, 15)}${txt(30, 82, b + ' ' + unit, 15, 'end')}${txt(230, 82, b + ' ' + unit, 15, 'start')}`, `Rectángulo de ${a} por ${b} ${unit}`);
  S.poligono = (lados, unit = 'cm') => { // triángulo o figura irregular con medidas
    const n = lados.length, cx = 130, cy = 85, R = 62;
    const pts = lados.map((_, i) => [cx + R * Math.cos(2 * Math.PI * i / n - Math.PI / 2), cy + R * Math.sin(2 * Math.PI * i / n - Math.PI / 2)]);
    const labels = lados.map((l, i) => { const p = pts[i], q = pts[(i + 1) % n]; const mx = (p[0] + q[0]) / 2, my = (p[1] + q[1]) / 2; const dx = mx - cx, dy = my - cy, d = Math.hypot(dx, dy) || 1, off = 24; return txt(mx + dx / d * off, my + dy / d * off + 5, l + ' ' + unit, 13); }).join('');
    return svg(260, 175, `<polygon points="${pts.map(p => p.join(',')).join(' ')}" fill="#FFE08A" stroke="${T}" stroke-width="4"/>${labels}`, `Figura de ${n} lados`);
  };

  S.arreglo = (filas, cols, emoji = '🍎') => `<div class="arreglo" style="grid-template-columns:repeat(${cols},auto)" role="img" aria-label="${filas} filas de ${cols}">${(emoji + ' ').repeat(filas * cols).trim().split(' ').map(e => `<span>${e}</span>`).join('')}</div>`;
  S.grupos = (g, n, emoji = '🍪') => `<div class="grupos" role="img" aria-label="${g} grupos de ${n}">${[...Array(g)].map(() => `<span class="gr">${emoji.repeat(n)}</span>`).join('')}</div>`;

  S.pictograma = (datos, simbolo, vale, titulo) => `<figure class="picto"><figcaption>${titulo}</figcaption><table>${datos.map(([k, v]) => `<tr><th>${k}</th><td>${simbolo.repeat(Math.floor(v / vale))}${v % vale ? '<span class="medio">' + simbolo + '</span>' : ''}</td></tr>`).join('')}</table><p class="clave">Clave: ${simbolo} = ${vale}${datos.some(d => d[1] % vale) ? ` · medio ${simbolo} = ${vale / 2}` : ''}</p></figure>`;

  S.barras = (datos, titulo, paso = 1, eje = 'Cantidad') => {
    const max = Math.ceil(Math.max(...datos.map(d => d[1])) / paso) * paso, H = 150, W = 300, bw = Math.min(46, (W - 60) / datos.length - 12);
    let g = '';
    for (let v = 0; v <= max; v += paso) { const y = 170 - v / max * H; g += `<line x1="40" y1="${y}" x2="${W}" y2="${y}" stroke="#E2DCEA" stroke-width="1"/>` + txt(34, y + 4, v, 11, 'end', 600); }
    datos.forEach(([k, v], i) => { const x = 50 + i * ((W - 50) / datos.length) + 4, h = v / max * H; g += `<rect x="${x}" y="${170 - h}" width="${bw}" height="${h}" fill="${['#A9DCF2', '#FFC4D6', '#C2E89A', '#FFE08A', '#C9B6F0', '#FFCBA4'][i % 6]}" stroke="${T}" stroke-width="2.5"/>` + txt(x + bw / 2, 188, k, 11, 'middle', 700); });
    return `<figure class="graf"><figcaption>${titulo}</figcaption>${svg(310, 200, `<line x1="40" y1="20" x2="40" y2="170" stroke="${T}" stroke-width="2.5"/><line x1="40" y1="170" x2="${W}" y2="170" stroke="${T}" stroke-width="2.5"/>${g}`, titulo)}<p class="clave">Eje vertical: ${eje}</p></figure>`;
  };

  S.calendario = (anio, mes, marcados = {}) => {
    const nombres = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    const d1 = new Date(anio, mes, 1), dias = new Date(anio, mes + 1, 0).getDate(), inicio = (d1.getDay() + 6) % 7; // lunes = 0
    let celdas = '<tr>' + ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá', 'Do'].map(d => `<th>${d}</th>`).join('') + '</tr><tr>';
    for (let i = 0; i < inicio; i++) celdas += '<td></td>';
    for (let d = 1; d <= dias; d++) { const col = (inicio + d - 1) % 7; celdas += `<td class="${marcados[d] ? 'mk' : ''}" title="${marcados[d] || ''}">${d}${marcados[d] ? `<small>${marcados[d]}</small>` : ''}</td>`; if (col === 6 && d < dias) celdas += '</tr><tr>'; }
    return `<figure class="cal"><figcaption>${nombres[mes]} ${anio}</figcaption><table>${celdas}</tr></table></figure>`;
  };

  S.linea = (eventos, titulo) => { // eventos: [[año o etiqueta, texto]]
    const n = eventos.length, W = 320;
    return `<figure class="linea"><figcaption>${titulo}</figcaption>${svg(W, 120, `<line x1="15" y1="50" x2="${W - 15}" y2="50" stroke="${T}" stroke-width="4"/><polygon points="${W - 15},43 ${W - 3},50 ${W - 15},57" fill="${T}"/>` + eventos.map(([a, t], i) => { const x = 30 + i * ((W - 70) / Math.max(1, n - 1)); return `<circle cx="${x}" cy="50" r="7" fill="#FFB300" stroke="${T}" stroke-width="2.5"/>${txt(x, 32, a, 13, 'middle', 800)}${txt(x, 76, t.split('|')[0], 11, 'middle', 600)}${t.split('|')[1] ? txt(x, 91, t.split('|')[1], 11, 'middle', 600) : ''}`; }).join(''), titulo)}</figure>`;
  };

  window.SVG = S;
})();
