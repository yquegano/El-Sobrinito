/* MATEMÁTICA · 3.º básico · Evaluación 27 nov 2026
   OA oficiales 3.º básico: OA8 tablas hasta 10 · OA11 fracciones 1/4, 1/3, 1/2, 2/3, 3/4 y comparar con igual denominador
   OA18 ángulos con referentes de 45° y 90° · OA19 líneas de tiempo y calendarios · OA20 horas, medias horas, cuartos y minutos
   OA21 perímetro · OA25 pictogramas y gráficos de barra con escala.
   Los ejercicios con "gen" crean preguntas nuevas cada vez (para practicar y repasar sin repetir). */
(function () {
  const { mcq, tf, match, order, fill, sort, num, clock, shade } = Q;
  const R = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
  const mezclar = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const opcionesNum = (correcta, cerca = 3) => { const s = new Set([correcta]); let k = 0; while (s.size < 4 && k++ < 50) { const v = correcta + R(-cerca, cerca); if (v > 0) s.add(v); } const arr = mezclar([...s]); return { opts: arr.map(String), a: arr.indexOf(correcta) }; };
  const DIAS = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
  const dia = d => DIAS[new Date(2026, 10, d).getDay()];
  const CAL = () => SVG.calendario(2026, 10, { 23: 'Ciencias', 24: 'Historia', 26: 'Lenguaje', 27: 'Matem.' });
  const HORA = (h, m) => `${h}:${String(m).padStart(2, '0')}`;
  const L = SVG.linea([['2018', 'Nace|Martina'], ['2021', 'Entra al|jardín'], ['2023', 'Entra a|1.º básico'], ['2025', 'Aprende a andar|en bicicleta']], 'La vida de Martina');
  const LSHAPE = [[1, 1], [2, 1], [3, 1], [1, 2], [1, 3], [2, 3]], TSHAPE = [[1, 1], [2, 1], [3, 1], [4, 1], [2, 2], [3, 2]];
  const P1 = () => SVG.pictograma([['🍎 Manzana', 6], ['🍌 Plátano', 8], ['🍇 Uva', 4], ['🍓 Frutilla', 10]], '⭐', 2, 'Fruta favorita del 3.º básico');
  const P2 = () => SVG.pictograma([['Ana', 6], ['Luis', 3], ['Rosa', 5], ['Iván', 8]], '📘', 2, 'Libros leídos en noviembre');
  const B1 = () => SVG.barras([['Lun', 4], ['Mar', 7], ['Mié', 5], ['Jue', 9], ['Vie', 3]], 'Botellas recicladas por el curso', 1, 'Botellas');
  const B2 = () => SVG.barras([['Perro', 12], ['Gato', 8], ['Pez', 4], ['Conejo', 6]], 'Mascota favorita', 2, 'Niños y niñas');

  MATERIAS.push({
    id: 'matematica', nombre: 'Matemática', corto: 'Matemática', emoji: '🔢', color: '#FFE08A', fecha: '2026-11-27',
    temas: [
      { id: 'perimetro', oa: 'OA21', titulo: 'Perímetro',
        aprende: [{ t: '¿Qué es el perímetro?', txt: 'El <b>perímetro</b> es la medida del <b>borde</b> de una figura: lo que mide su contorno. Se calcula <b>sumando la medida de todos sus lados</b>. Si un rectángulo mide 6 cm de largo y 3 cm de ancho: 6 + 3 + 6 + 3 = <b>18 cm</b>. En una cuadrícula, cuenta los lados de los cuadritos que forman el borde.', img: SVG.rectangulo(6, 3) }],
        items: [
          num('¿Cuál es el perímetro de este rectángulo? (en cm)', 16, '5 + 3 + 5 + 3 = 16 cm.', { img: SVG.rectangulo(5, 3) }),
          num('Cuenta los lados del borde. ¿Cuál es el perímetro de la figura verde? (en cm)', SVG.perimetroCeldas(LSHAPE), `Al contar todos los lados del borde se obtienen ${SVG.perimetroCeldas(LSHAPE)} cm.`, { img: SVG.cuadricula(LSHAPE) }),
          num('¿Cuál es el perímetro de este triángulo? (en cm)', 15, '4 + 5 + 6 = 15 cm.', { img: SVG.poligono([4, 5, 6]) }),
          mcq('Un cuadrado tiene lados de 4 cm. ¿Cuál es su perímetro?', ['16 cm', '8 cm', '4 cm', '12 cm'], 0, 'El cuadrado tiene 4 lados iguales: 4 + 4 + 4 + 4 = 16 cm.'),
          tf('El perímetro de un cuadrado de 3 cm por lado es 9 cm.', false, 'Son 4 lados: 3 + 3 + 3 + 3 = 12 cm.'),
          num('Un jardín rectangular mide 8 m de largo y 5 m de ancho. ¿Cuántos metros de reja se necesitan para rodearlo?', 26, '8 + 5 + 8 + 5 = 26 m.', { ev: true }),
          num('¿Cuál es el perímetro de la figura verde? (en cm)', SVG.perimetroCeldas(TSHAPE), `Contando los lados del borde: ${SVG.perimetroCeldas(TSHAPE)} cm.`, { img: SVG.cuadricula(TSHAPE), ev: true })
        ],
        gen: () => { const a = R(3, 9), b = R(2, 7); return num(`Un rectángulo mide ${a} cm de largo y ${b} cm de ancho. ¿Cuál es su perímetro? (en cm)`, 2 * (a + b), `${a} + ${b} + ${a} + ${b} = ${2 * (a + b)} cm.`, { img: SVG.rectangulo(a, b) }); } },
      { id: 'multiplicacion', oa: 'OA8', titulo: 'Multiplicar: grupos iguales',
        aprende: [{ t: 'Multiplicar es sumar grupos iguales', txt: 'Si tienes <b>3 grupos de 4</b> galletas, puedes sumar 4 + 4 + 4 = 12, o <b>multiplicar</b>: 3 × 4 = 12. El primer número dice <b>cuántos grupos</b> hay y el segundo, <b>cuántos hay en cada grupo</b>. También puedes ordenar los objetos en filas y columnas (un <b>arreglo</b>).', img: SVG.grupos(3, 4) }],
        items: [
          num('¿Cuántas galletas hay en total?', 12, '3 grupos de 4: 3 × 4 = 12.', { img: SVG.grupos(3, 4) }),
          mcq('¿Qué multiplicación es igual a 5 + 5 + 5?', ['3 × 5', '5 × 5', '3 + 5', '15 × 3'], 0, 'Se suma 3 veces el 5: 3 × 5 = 15.'),
          num('¿Cuántas manzanas hay en este arreglo?', 24, '4 filas de 6: 4 × 6 = 24.', { img: SVG.arreglo(4, 6) }),
          tf('4 × 3 es lo mismo que 3 + 3 + 3 + 3.', true, '4 grupos de 3: 3 + 3 + 3 + 3 = 12 = 4 × 3.'),
          match('Une cada suma con su multiplicación.', [['2 + 2 + 2', '3 × 2'], ['6 + 6', '2 × 6'], ['4 + 4 + 4 + 4 + 4', '5 × 4']], 'Cuenta cuántas veces se repite el número.'),
          num('¿Cuántas estrellas hay en este arreglo?', 21, '3 filas de 7: 3 × 7 = 21.', { img: SVG.arreglo(3, 7, '⭐'), ev: true }),
          mcq('¿Qué imagen representa 2 × 5?', ['2 grupos de 5', '5 grupos de 5', '2 grupos de 2', '1 grupo de 7'], 0, '2 × 5 son 2 grupos con 5 en cada uno.', { ev: true })
        ],
        gen: () => { const g = R(2, 5), n = R(2, 6); return num('¿Cuántos hay en total?', g * n, `${g} grupos de ${n}: ${g} × ${n} = ${g * n}.`, { img: SVG.grupos(g, n, ['🍪', '🍓', '⚽', '🌸'][R(0, 3)]) }); } },
      { id: 'tablas', oa: 'OA8', titulo: 'Tablas de multiplicar',
        aprende: [{ t: 'Las tablas de multiplicar', txt: 'Las tablas te ayudan a calcular rápido. Trucos: la tabla del <b>2</b> es el doble; la del <b>5</b> termina en 0 o en 5; la del <b>10</b> agrega un cero; la del <b>9</b>: las cifras del resultado suman 9 (9 × 3 = 27 → 2 + 7 = 9). Recuerda que el orden no cambia el resultado: <b>3 × 7 = 7 × 3</b>.', img: '<div class="tabla">' + [...Array(10)].map((_, i) => `<span>7 × ${i + 1} = ${7 * (i + 1)}</span>`).join('') + '</div>' }],
        items: [
          num('6 × 7 =', 42, '6 × 7 = 42.'), num('8 × 4 =', 32, '8 × 4 = 32.'), num('9 × 5 =', 45, '9 × 5 = 45.'),
          order('Ordena la tabla del 5 de menor a mayor.', ['5', '10', '15', '20', '25', '30'], 'La tabla del 5 avanza de 5 en 5.'),
          fill('3 × 8 = ___', ['24', '21', '27'], 0, '3 × 8 = 24.'),
          tf('7 × 6 da el mismo resultado que 6 × 7.', true, 'El orden de los factores no cambia el producto: los dos son 42.'),
          num('8 × 7 =', 56, '8 × 7 = 56.', { ev: true }), num('9 × 6 =', 54, '9 × 6 = 54.', { ev: true })
        ],
        gen: () => { const a = R(2, 10), b = R(2, 10); return num(`${a} × ${b} =`, a * b, `${a} × ${b} = ${a * b}.`); } },
      { id: 'problemas-mult', oa: 'OA8', titulo: 'Problemas de multiplicación',
        aprende: [{ t: 'Resolver problemas paso a paso', txt: '1️⃣ Lee el problema dos veces. 2️⃣ Busca cuántos <b>grupos</b> hay y cuántos hay <b>en cada grupo</b>. 3️⃣ Multiplica. 4️⃣ Responde con una frase. Ejemplo: "Hay 4 cajas con 6 huevos cada una". Grupos: 4. En cada grupo: 6. 4 × 6 = 24. <b>Hay 24 huevos.</b>', img: SVG.grupos(4, 6, '🥚') }],
        items: [
          num('En una caja hay 6 huevos. ¿Cuántos huevos hay en 4 cajas?', 24, '4 cajas de 6: 4 × 6 = 24 huevos.'),
          num('Cada bicicleta tiene 2 ruedas. ¿Cuántas ruedas tienen 9 bicicletas?', 18, '9 × 2 = 18 ruedas.'),
          num('Un pack trae 8 jugos. ¿Cuántos jugos hay en 5 packs?', 40, '5 × 8 = 40 jugos.'),
          mcq('Hay 3 floreros con 7 flores cada uno. ¿Qué operación resuelve el problema?', ['3 × 7', '3 + 7', '7 − 3', '7 × 7'], 0, 'Son 3 grupos de 7: 3 × 7 = 21.'),
          num('Una semana tiene 7 días. ¿Cuántos días hay en 3 semanas?', 21, '3 × 7 = 21 días.', { ev: true }),
          num('En la sala hay 5 filas con 6 mesas cada una. ¿Cuántas mesas hay?', 30, '5 × 6 = 30 mesas.', { ev: true })
        ],
        gen: () => { const c = [['bolsas', 'dulces'], ['cajas', 'lápices'], ['mesas', 'niños'], ['platos', 'galletas']][R(0, 3)], g = R(2, 9), n = R(2, 9); return num(`Hay ${g} ${c[0]} con ${n} ${c[1]} cada una. ¿Cuántos ${c[1]} hay en total?`, g * n, `${g} × ${n} = ${g * n} ${c[1]}.`); } },
      { id: 'linea-tiempo', oa: 'OA19', titulo: 'Línea de tiempo',
        aprende: [{ t: 'La línea de tiempo', txt: 'Una <b>línea de tiempo</b> ordena hechos desde el <b>más antiguo</b> (a la izquierda) hasta el <b>más reciente</b> (a la derecha). Sirve para saber qué pasó primero y cuánto tiempo pasó entre dos hechos: para eso <b>restamos los años</b>.', img: L }],
        items: [
          mcq('¿Qué le pasó a Martina en 2023?', ['Entró a 1.º básico', 'Nació', 'Entró al jardín', 'Aprendió a andar en bicicleta'], 0, 'En 2023 aparece "Entra a 1.º básico".', { img: L }),
          num('¿Cuántos años pasaron desde que Martina nació hasta que entró a 1.º básico?', 5, '2023 − 2018 = 5 años.', { img: L }),
          mcq('¿Qué pasó primero?', ['Entró al jardín', 'Aprendió a andar en bicicleta', 'Entró a 1.º básico', 'Pasaron al mismo tiempo'], 0, 'Lo que está más a la izquierda ocurrió primero: 2021, entró al jardín.', { img: L }),
          order('Ordena estos meses como aparecerían en una línea de tiempo del año.', ['Marzo: entrada a clases', 'Mayo: día del alumno', 'Septiembre: fiestas patrias', 'Diciembre: vacaciones'], 'Marzo, mayo, septiembre y diciembre: en el orden de los meses.'),
          num('¿Cuántos años pasaron entre que Martina entró al jardín y aprendió a andar en bicicleta?', 4, '2025 − 2021 = 4 años.', { img: L, ev: true }),
          tf('En una línea de tiempo, los hechos más antiguos se ubican a la izquierda.', true, 'Se ordena de izquierda (antiguo) a derecha (reciente).', { ev: true })
        ] },
      { id: 'calendario', oa: 'OA19', titulo: 'Lectura de calendario',
        aprende: [{ t: 'El calendario', txt: 'Un año tiene <b>12 meses</b>. Una semana tiene <b>7 días</b>. Los meses tienen 30 o 31 días, salvo <b>febrero</b>, que tiene 28 (o 29 en los años bisiestos). En el calendario, cada fila es una semana. Aquí están las fechas de tus pruebas de noviembre de 2026.', img: CAL() }],
        items: [
          mcq('Mira el calendario. ¿Qué día de la semana es la prueba de Ciencias, el 23 de noviembre?', ['Lunes', 'Martes', 'Viernes', 'Domingo'], ['lunes', 'martes', 'viernes', 'domingo'].indexOf(dia(23)), `El 23 de noviembre de 2026 es ${dia(23)}.`, { img: CAL() }),
          num('La prueba de Ciencias es el día 23 y la de Matemática el día 27. ¿Cuántos días DESPUÉS de Ciencias es la de Matemática?', 4, 'Del 23 al 27 avanzamos 4 días: 24, 25, 26 y 27. También: 27 − 23 = 4.', { img: CAL() }),
          mcq('¿Cuántos días tiene noviembre?', ['30', '31', '28', '29'], 0, 'Noviembre tiene 30 días.', { img: CAL() }),
          order('Ordena estos meses del año.', ['Enero', 'Abril', 'Julio', 'Noviembre'], 'Enero (1), abril (4), julio (7) y noviembre (11).'),
          num('¿Cuántos meses tiene un año?', 12, 'Un año tiene 12 meses.'),
          mcq('¿Qué día de la semana es la prueba de Lenguaje, el 26 de noviembre?', ['Jueves', 'Miércoles', 'Sábado', 'Lunes'], ['jueves', 'miércoles', 'sábado', 'lunes'].indexOf(dia(26)), `El 26 de noviembre de 2026 es ${dia(26)}.`, { img: CAL(), ev: true }),
          mcq('¿Qué mes viene después de noviembre?', ['Diciembre', 'Octubre', 'Enero', 'Septiembre'], 0, 'Después de noviembre viene diciembre.', { ev: true })
        ] },
      { id: 'hora', oa: 'OA20', titulo: 'Lectura de la hora',
        aprende: [{ t: 'Leer el reloj', txt: 'La <b>manecilla corta</b> marca la <b>hora</b>. La <b>manecilla larga</b> (roja) marca los <b>minutos</b>. Si la larga está en el <b>12</b>: es la hora <b>en punto</b> (3:00). En el <b>6</b>: <b>y media</b> (3:30). En el <b>3</b>: <b>y cuarto</b> (3:15). En el <b>9</b>: <b>menos cuarto</b> de la hora siguiente (3:45 = cuatro menos cuarto).', img: SVG.reloj(3, 30) }],
        items: [
          mcq('¿Qué hora marca el reloj?', ['3:00', '12:15', '3:30', '12:03'], 0, 'La manecilla corta en el 3 y la larga en el 12: son las 3 en punto.', { img: SVG.reloj(3, 0) }),
          mcq('¿Qué hora marca el reloj?', ['7:30 (siete y media)', '6:30', '7:00', '6:07'], 0, 'La larga en el 6 indica "y media"; la corta pasó el 7: son las 7:30.', { img: SVG.reloj(7, 30) }),
          mcq('¿Qué hora marca el reloj?', ['9:15 (nueve y cuarto)', '3:45', '9:03', '9:45'], 0, 'La larga en el 3 indica 15 minutos: 9:15, nueve y cuarto.', { img: SVG.reloj(9, 15) }),
          mcq('¿Qué hora marca el reloj?', ['4:45 (cinco menos cuarto)', '9:20', '4:09', '5:45'], 0, 'La larga en el 9 son 45 minutos; la corta está casi en el 5: 4:45, cinco menos cuarto.', { img: SVG.reloj(4, 45) }),
          clock('Mueve las manecillas: pon el reloj a las 10:30.', 10, 30, 'A las 10:30 la larga está en el 6 y la corta entre el 10 y el 11.'),
          match('Une cada hora digital con cómo se dice.', [['8:00', 'Ocho en punto'], ['8:30', 'Ocho y media'], ['8:15', 'Ocho y cuarto'], ['8:45', 'Nueve menos cuarto']], 'En punto, y media, y cuarto, menos cuarto.'),
          mcq('¿Qué hora marca el reloj?', ['2:15', '3:10', '2:03', '12:10'], 0, 'La larga en el 3 (15 minutos) y la corta pasó el 2: 2:15.', { img: SVG.reloj(2, 15), ev: true }),
          clock('Pon el reloj a las 6:00.', 6, 0, 'En punto: la larga en el 12 y la corta en el 6.', { ev: true })
        ],
        gen: () => { const h = R(1, 12), m = [0, 15, 30, 45][R(0, 3)]; return clock(`Pon el reloj a las ${HORA(h, m)}.`, h, m, `A las ${HORA(h, m)} la manecilla larga marca ${m} minutos.`); } },
      { id: 'minutos', oa: 'OA20', titulo: 'Los minutos',
        aprende: [{ t: 'Contar los minutos', txt: 'Una <b>hora</b> tiene <b>60 minutos</b>. Media hora son <b>30 minutos</b> y un cuarto de hora, <b>15 minutos</b>. En el reloj, cada número que recorre la manecilla larga son <b>5 minutos</b>: en el 1 son 5, en el 2 son 10, en el 4 son 20… Cuenta de 5 en 5.', img: SVG.reloj(6, 20) }],
        items: [
          mcq('¿Qué hora marca el reloj?', ['6:20', '4:30', '6:04', '5:20'], 0, 'La larga en el 4: 4 × 5 = 20 minutos. La corta pasó el 6: 6:20.', { img: SVG.reloj(6, 20) }),
          mcq('¿Qué hora marca el reloj?', ['11:05', '1:55', '11:01', '12:05'], 0, 'La larga en el 1 son 5 minutos: 11:05.', { img: SVG.reloj(11, 5) }),
          num('¿Cuántos minutos tiene una hora?', 60, 'Una hora tiene 60 minutos.'),
          num('¿Cuántos minutos son media hora?', 30, 'Media hora son 30 minutos.'),
          num('¿Cuántos minutos son un cuarto de hora?', 15, 'Un cuarto de hora son 15 minutos.'),
          num('La clase empieza a las 8:00 y termina a las 8:45. ¿Cuántos minutos dura?', 45, 'De 8:00 a 8:45 pasan 45 minutos.', { ev: true }),
          clock('Pon el reloj a las 3:40.', 3, 40, 'A las 3:40 la larga está en el 8 (8 × 5 = 40).', { ev: true })
        ],
        gen: () => { const h = R(1, 12), m = R(1, 11) * 5; return mcq('¿Qué hora marca el reloj?', ...(() => { const ok = HORA(h, m), s = new Set([ok]); while (s.size < 4) s.add(HORA(R(1, 12), R(0, 11) * 5)); const arr = mezclar([...s]); return [arr, arr.indexOf(ok)]; })(), `La larga marca ${m} minutos y la corta está después del ${h}: ${HORA(h, m)}.`, { img: SVG.reloj(h, m) }); } },
      { id: 'angulos', oa: 'OA18', titulo: 'Ángulos de 90° y 45°',
        aprende: [{ t: 'Ángulos', txt: 'Un <b>ángulo</b> se forma cuando dos líneas se juntan en un punto. El ángulo de <b>90°</b> se llama <b>ángulo recto</b>: es como la esquina de una hoja o de una puerta. El ángulo de <b>45°</b> es la <b>mitad</b> de un ángulo recto. Usamos estos dos ángulos como referencia para estimar otros: ¿es más abierto o más cerrado?', img: SVG.angulo(90) + SVG.angulo(45) }],
        items: [
          mcq('¿Cuánto mide este ángulo?', ['90°', '45°', '10°', '180°'], 0, 'Es un ángulo recto, como la esquina de una hoja: 90°.', { img: SVG.angulo(90, false) }),
          mcq('¿Cuánto mide aproximadamente este ángulo?', ['45°', '90°', '120°', '180°'], 0, 'Es la mitad de un ángulo recto: 45°.', { img: SVG.angulo(45, false) }),
          mcq('¿Dónde encuentras un ángulo recto (90°)?', ['En la esquina de un libro', 'En el borde de una pelota', 'En una moneda', 'En un huevo'], 0, 'Las esquinas de un libro forman ángulos rectos.'),
          tf('Un ángulo de 45° es la mitad de un ángulo de 90°.', true, '90 dividido en 2 es 45.'),
          mcq('Este ángulo es…', ['Más abierto que 90°', 'Igual a 45°', 'Más cerrado que 45°', 'Igual a 90°'], 0, 'Se abre más que la esquina de una hoja: es mayor que 90°.', { img: SVG.angulo(120, false) }),
          mcq('¿Cómo se llama el ángulo de 90°?', ['Ángulo recto', 'Ángulo redondo', 'Ángulo chico', 'Ángulo de media vuelta'], 0, 'El ángulo de 90° es el ángulo recto.', { ev: true }),
          mcq('Este ángulo mide…', ['entre 45° y 90°', 'menos de 45°', 'exactamente 90°', 'más de 90°'], 0, 'Es más abierto que 45° pero más cerrado que un ángulo recto.', { img: SVG.angulo(65, false), ev: true })
        ] },
      { id: 'frac-lectura', oa: 'OA11', titulo: 'Fracciones: lectura',
        aprende: [{ t: 'Cómo se lee una fracción', txt: 'Una <b>fracción</b> representa <b>partes iguales</b> de un entero. En <b>3/4</b>, el número de abajo (<b>denominador</b>) dice en cuántas partes iguales se dividió el entero: 4. El de arriba (<b>numerador</b>) dice cuántas partes se toman: 3.<br>Se leen así: <b>1/2</b> un medio · <b>1/3</b> un tercio · <b>1/4</b> un cuarto · <b>2/3</b> dos tercios · <b>3/4</b> tres cuartos.', img: SVG.fraccion(3, 4, 'circulo') }],
        items: [
          match('Une cada fracción con cómo se lee.', [['1/2', 'Un medio'], ['1/3', 'Un tercio'], ['1/4', 'Un cuarto'], ['3/4', 'Tres cuartos']], 'Medios, tercios y cuartos.'),
          mcq('¿Cómo se lee 2/3?', ['Dos tercios', 'Dos medios', 'Tres medios', 'Dos cuartos'], 0, '2/3 se lee dos tercios.'),
          mcq('En la fracción 3/4, ¿qué indica el 4?', ['En cuántas partes iguales se dividió el entero', 'Cuántas partes se pintaron', 'Cuántos enteros hay', 'Nada'], 0, 'El denominador (abajo) dice en cuántas partes iguales se dividió.'),
          fill('"Un medio" se escribe ___', ['1/2', '2/1', '1/3'], 0, 'Un medio es 1/2.'),
          mcq('En 2/3, ¿qué indica el 2?', ['Cuántas partes se toman', 'En cuántas partes se dividió', 'El tamaño de la pizza', 'La hora'], 0, 'El numerador (arriba) dice cuántas partes se toman.', { ev: true }),
          match('Une cada nombre con su fracción.', [['Dos tercios', '2/3'], ['Un cuarto', '1/4'], ['Un medio', '1/2']], 'Así se escriben.', { ev: true })
        ] },
      { id: 'frac-graficas', oa: 'OA11', titulo: 'Fracciones: representaciones',
        aprende: [{ t: 'Fracciones en dibujos', txt: 'Para representar una fracción, divide la figura en <b>partes iguales</b> (el denominador) y <b>pinta</b> las partes que indica el numerador. Por ejemplo, <b>2/3</b>: 3 partes iguales, 2 pintadas. ¡Ojo! Las partes deben ser del mismo tamaño.', img: SVG.fraccion(2, 3, 'barra') }],
        items: [
          mcq('¿Qué fracción está pintada?', ['1/4', '1/3', '3/4', '1/2'], 0, '4 partes iguales y 1 pintada: 1/4.', { img: SVG.fraccion(1, 4, 'circulo') }),
          mcq('¿Qué fracción está pintada?', ['2/3', '1/3', '2/4', '3/2'], 0, '3 partes iguales y 2 pintadas: 2/3.', { img: SVG.fraccion(2, 3, 'barra') }),
          shade('Pinta 3/4 de la barra.', 3, 4, '3/4: de 4 partes iguales, pinta 3.', { shape: 'barra' }),
          shade('Pinta 1/2 del círculo.', 1, 2, 'Un medio: de 2 partes iguales, pinta 1.', { shape: 'circulo' }),
          mcq('¿Qué fracción NO está pintada?', ['1/3', '2/3', '1/2', '3/3'], 0, 'Hay 3 partes y 2 están pintadas: queda 1/3 sin pintar.', { img: SVG.fraccion(2, 3, 'circulo') }),
          shade('Pinta 1/3 del círculo.', 1, 3, 'Un tercio: de 3 partes iguales, pinta 1.', { shape: 'circulo', ev: true }),
          mcq('¿Qué fracción está pintada?', ['3/4', '1/4', '4/3', '3/3'], 0, '4 partes iguales y 3 pintadas: 3/4.', { img: SVG.fraccion(3, 4, 'barra'), ev: true })
        ],
        gen: () => { const d = [2, 3, 4][R(0, 2)], n = R(1, d - 1); return shade(`Pinta ${n}/${d}.`, n, d, `De ${d} partes iguales, pinta ${n}.`, { shape: ['barra', 'circulo'][R(0, 1)] }); } },
      { id: 'frac-ordenar', oa: 'OA11', titulo: 'Fracciones: ordenar y comparar',
        aprende: [{ t: 'Comparar fracciones', txt: 'Si dos fracciones tienen el <b>mismo denominador</b> (el entero dividido en las mismas partes), es <b>mayor la que tiene más partes</b>: <b>3/4 &gt; 1/4</b>. Si las dos fracciones toman 1 parte, como 1/2 y 1/4 de la misma pizza, es mayor <b>1/2</b>: al dividir en menos partes, cada parte es más grande.', img: SVG.fraccion(1, 4, 'barra') + SVG.fraccion(3, 4, 'barra') }],
        items: [
          mcq('¿Cuál fracción es mayor?', ['3/4', '1/4', 'Son iguales', 'No se puede saber'], 0, 'Mismo denominador: 3 partes es más que 1 parte.', { img: SVG.fraccion(3, 4, 'barra') + SVG.fraccion(1, 4, 'barra') }),
          order('Ordena estos cuartos de MENOR a MAYOR.', ['1/4', '2/4', '3/4'], 'Con igual denominador, ordena por el numerador: 1, 2, 3.'),
          mcq('¿Cuál es mayor: 1/3 o 2/3?', ['2/3', '1/3', 'Son iguales', 'Ninguna'], 0, 'Mismo denominador: 2 partes es más que 1.'),
          mcq('De la misma pizza, ¿qué trozo es más grande?', ['1/2', '1/4', 'Son iguales', 'Depende del sabor'], 0, 'Al dividir en 2 partes, cada parte es más grande que al dividir en 4.', { img: SVG.fraccion(1, 2, 'circulo') + SVG.fraccion(1, 4, 'circulo') }),
          order('Ordena estos tercios de MENOR a MAYOR.', ['1/3', '2/3', '3/3'], 'Con igual denominador, ordena por el numerador. 3/3 es el entero completo.', { ev: true }),
          mcq('¿Qué símbolo va en el cuadro? 2/4 ☐ 1/4', ['>', '<', '='], 0, '2/4 es mayor que 1/4: 2/4 > 1/4.', { ev: true })
        ] },
      { id: 'frac-problemas', oa: 'OA11', titulo: 'Problemas con fracciones',
        aprende: [{ t: 'Fracciones en la vida diaria', txt: 'Usamos fracciones al repartir en <b>partes iguales</b>: una pizza, un chocolate, una hora. Pregúntate: ¿en cuántas partes iguales se dividió el entero? (denominador) ¿Cuántas partes se toman? (numerador).', img: '<div class="emo">🍕 · 🍫 · 🕒</div>' }],
        items: [
          mcq('Una pizza se cortó en 4 partes iguales y Tomás comió 1. ¿Qué fracción comió?', ['1/4', '1/3', '4/1', '3/4'], 0, '1 parte de 4 iguales: 1/4.', { img: SVG.fraccion(1, 4, 'circulo') }),
          mcq('De esa misma pizza, ¿qué fracción quedó?', ['3/4', '1/4', '2/4', '4/4'], 0, 'Quedaron 3 de las 4 partes: 3/4.'),
          mcq('Un chocolate tiene 3 partes iguales y Sofía comió 2. ¿Qué fracción comió?', ['2/3', '1/3', '3/2', '2/4'], 0, '2 partes de 3: 2/3.'),
          mcq('Martina y su hermano se reparten un queque en 2 partes iguales. ¿Qué fracción le toca a cada uno?', ['1/2', '1/4', '2/2', '1/3'], 0, 'Cada uno recibe 1 de 2 partes: 1/2.'),
          mcq('Pedro pintó 1/4 de una muralla y Ana pintó 3/4 de otra muralla igual. ¿Quién pintó más?', ['Ana', 'Pedro', 'Pintaron lo mismo', 'Nadie'], 0, 'Mismo denominador: 3/4 es más que 1/4.', { ev: true }),
          mcq('Una torta se cortó en 3 partes iguales y se comieron 1. ¿Qué fracción queda?', ['2/3', '1/3', '3/3', '1/2'], 0, 'Quedan 2 de 3 partes: 2/3.', { ev: true })
        ] },
      { id: 'pictogramas', oa: 'OA25', titulo: 'Pictogramas',
        aprende: [{ t: 'Leer un pictograma', txt: 'Un <b>pictograma</b> muestra datos con <b>dibujos</b>. Lo más importante es la <b>clave</b>: dice cuánto vale cada dibujo. Si ⭐ = 2, entonces ⭐⭐⭐ = 6. Medio dibujo vale la mitad.', img: P1() }],
        items: [
          num('Según el pictograma, ¿cuántos niños prefieren el plátano?', 8, '4 estrellas × 2 = 8.', { img: P1() }),
          mcq('¿Cuál es la fruta favorita del curso?', ['Frutilla', 'Plátano', 'Manzana', 'Uva'], 0, 'La frutilla tiene más estrellas: 10 votos.', { img: P1() }),
          num('¿Cuántos niños más prefieren frutilla que uva?', 6, 'Frutilla 10, uva 4: 10 − 4 = 6.', { img: P1() }),
          mcq('¿Cuánto vale cada ⭐ en este pictograma?', ['2', '1', '5', '10'], 0, 'La clave dice: ⭐ = 2.', { img: P1() }),
          num('¿Cuántos niños votaron en total?', 28, '6 + 8 + 4 + 10 = 28.', { img: P1(), ev: true }),
          num('¿Cuántos libros leyó Luis? (mira la clave)', 3, 'Luis tiene 1 libro y medio: 2 + 1 = 3.', { img: P2(), ev: true })
        ] },
      { id: 'barras', oa: 'OA25', titulo: 'Gráficos de barra',
        aprende: [{ t: 'Leer un gráfico de barras', txt: 'En un <b>gráfico de barras</b>, cada barra muestra una cantidad. Para leerla, sigue el <b>borde superior</b> de la barra hasta el <b>eje vertical</b> y mira el número. Revisa de cuánto en cuánto avanza la escala: de 1 en 1, de 2 en 2…', img: B1() }],
        items: [
          num('¿Cuántas botellas reciclaron el jueves?', 9, 'La barra del jueves llega a 9.', { img: B1() }),
          mcq('¿Qué día reciclaron menos botellas?', ['Viernes', 'Lunes', 'Martes', 'Jueves'], 0, 'La barra más baja es la del viernes: 3.', { img: B1() }),
          num('¿Cuántas botellas más reciclaron el jueves que el lunes?', 5, 'Jueves 9, lunes 4: 9 − 4 = 5.', { img: B1() }),
          num('¿Cuántas botellas reciclaron en total en la semana?', 28, '4 + 7 + 5 + 9 + 3 = 28.', { img: B1() }),
          num('Mira la escala (avanza de 2 en 2). ¿Cuántos niños eligieron el gato?', 8, 'La barra del gato llega a 8.', { img: B2(), ev: true }),
          mcq('¿Cuál es la mascota favorita?', ['Perro', 'Gato', 'Pez', 'Conejo'], 0, 'La barra más alta es la del perro: 12.', { img: B2(), ev: true })
        ] }
    ],
    explora: [
      { id: 'exp-reloj', titulo: 'Reloj para practicar', tipo: 'reloj' },
      { id: 'exp-fracciones', titulo: 'Construye fracciones', tipo: 'fracciones' },
      { id: 'exp-arreglos', titulo: 'Arma multiplicaciones', tipo: 'arreglos' },
      { id: 'exp-perimetro', titulo: 'Calcula perímetros', tipo: 'perimetro' }
    ],
    juego: { tipo: 'tablas', titulo: 'Carrera de tablas (60 segundos)',
      como: 'Primero elige qué tabla quieres practicar, o todas mezcladas. Tienes 60 segundos. Aparece una multiplicación: escribe el resultado con los números de abajo y toca ✔️. Cada respuesta correcta suma una estrella. Si te equivocas, Chispa te muestra el resultado y sigues.',
      ejemplo: { html: '<div class="palabra chica">3 × 4 = ?</div><p class="txt">➜ Escribes <b>12</b> y tocas ✔️. ¡Ganas una ⭐!</p>', voz: 'Por ejemplo, aparece 3 por 4. Escribes 12 y tocas el botón verde. ¡Ganas una estrella!' } }
  });
})();
