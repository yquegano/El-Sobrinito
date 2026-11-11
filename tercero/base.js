/* Tipos de actividad · Repaso 3.º básico · 11 nov 2026
   mcq: selección múltiple · tf: verdadero o falso · match: relacionar · order: ordenar secuencia
   fill: completar · sort: clasificar en grupos · spot: identificar en una imagen · num: resolver problema (número)
   clock: poner la hora en el reloj · shade: pintar una fracción
   x.img = ilustración (HTML) · x.ev = true → solo aparece en "Comprueba lo aprendido" (no se ve antes en Practica) */
window.Q = {
  mcq: (q, opts, a, exp, x = {}) => ({ type: 'mcq', q, opts, a, exp, ...x }),
  tf: (q, a, exp, x = {}) => ({ type: 'tf', q, a, exp, ...x }),
  match: (q, pairs, exp, x = {}) => ({ type: 'match', q, pairs, exp, ...x }),
  order: (q, items, exp, x = {}) => ({ type: 'order', q, items, exp, ...x }),
  fill: (q, opts, a, exp, x = {}) => ({ type: 'fill', q, opts, a, exp, ...x }),
  sort: (q, groups, items, exp, x = {}) => ({ type: 'sort', q, groups, items, exp, ...x }),
  spot: (q, svg, a, exp, x = {}) => ({ type: 'spot', q, svg, a, exp, ...x }),
  num: (q, a, exp, x = {}) => ({ type: 'num', q, a, exp, ...x }),
  clock: (q, h, m, exp, x = {}) => ({ type: 'clock', q, h, m, exp, ...x }),
  shade: (q, n, d, exp, x = {}) => ({ type: 'shade', q, n, d, exp, ...x })
};
window.MATERIAS = [];
