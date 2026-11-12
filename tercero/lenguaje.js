/* LENGUAJE · 3.º básico · Evaluación 26 nov 2026
   Temario: comprensión de leyenda, artículo informativo y texto dramático · ortografía literal B y V · sustantivo individual y colectivo.
   Los tres textos son ORIGINALES, escritos para esta app (11 nov 2026). Dato del artículo: el copihue fue declarado flor nacional de Chile en 1977. */
(function () {
  const { mcq, tf, match, order, fill, sort } = Q;
  const TX = {
    leyenda: { titulo: 'La leyenda de la neblina del valle', tipo: 'Leyenda', html: `<p class="nota">Esta leyenda fue escrita para la app, imitando la forma en que se cuentan las leyendas.</p>
<p>Cuentan los abuelos del valle que, hace muchísimo tiempo, cuando todavía no existían los caminos, vivía junto al río una niña llamada Ayelén. Cada mañana subía al cerro a buscar agua de una vertiente para su familia.</p>
<p>Un invierno no llovió y el río se secó. Los animales tenían sed y las plantas se ponían amarillas. Entonces Ayelén subió al cerro más alto y le pidió ayuda al espíritu de la montaña.</p>
<p>—Te daré agua —respondió una voz que sonaba como el viento—, pero cada mañana deberás compartirla con todo el valle.</p>
<p>Ayelén aceptó. Desde ese día, cada amanecer, una nube suave baja del cerro y cubre el valle, dejando gotitas de rocío sobre las hojas, los techos y el pasto.</p>
<p>Por eso, dicen, la neblina de las mañanas es el regalo que el espíritu de la montaña le hizo a Ayelén. Y cada vez que alguien comparte su agua, la neblina vuelve a bajar.</p>` },
    articulo: { titulo: 'El copihue, la flor nacional de Chile', tipo: 'Artículo informativo', html: `<h4>El copihue, la flor nacional de Chile</h4>
<p><i>El copihue es una planta nativa de Chile. Desde 1977 es la flor nacional de nuestro país.</i></p>
<figure class="dibujo">${SVG.copihue()}<figcaption>El copihue</figcaption></figure>
<h5>¿Cómo es?</h5><p>Es una enredadera: su tallo delgado se enrolla en los árboles para subir hacia la luz. Sus flores tienen forma de campana y suelen ser rojas, aunque también las hay rosadas y blancas.</p>
<h5>¿Dónde vive?</h5><p>Crece en los bosques húmedos y sombríos del centro y sur de Chile.</p>
<h5>¿Quién lo visita?</h5><p>Los picaflores lo visitan para beber el néctar de sus flores y, al hacerlo, llevan el polen de una flor a otra.</p>
<div class="pie"><span class="emo">🌺</span><small>Imagen: el copihue tiene flores con forma de campana.</small></div>
<h5>Para terminar</h5><p>El copihue crece lentamente. Por eso, si lo encuentras en el bosque, obsérvalo y fotografíalo, pero no lo arranques.</p>` },
    drama: { titulo: 'El cuaderno perdido', tipo: 'Texto dramático', html: `<p class="per"><b>Personajes:</b> SOFÍA · TOMÁS · PROFESORA ELENA</p>
<p class="aco">(Una sala de clases durante el recreo. Hay mesas, mochilas y una pizarra.)</p>
<p><b>SOFÍA:</b> <span class="aco">(buscando debajo de las mesas)</span> ¡No está! Mi cuaderno de ciencias desapareció.</p>
<p><b>TOMÁS:</b> <span class="aco">(acercándose)</span> ¿Lo dejaste en tu mochila?</p>
<p><b>SOFÍA:</b> Ya la revisé tres veces. ¡Y mañana tengo que entregar la tarea de las plantas!</p>
<p><b>TOMÁS:</b> <span class="aco">(pensativo)</span> Espera… esta mañana vi un cuaderno verde en la biblioteca.</p>
<p><b>SOFÍA:</b> <span class="aco">(sonriendo)</span> ¡Debe ser el mío! Tiene un copihue dibujado en la tapa.</p>
<p><b>PROFESORA ELENA:</b> <span class="aco">(entrando con un cuaderno verde en la mano)</span> ¿Alguien perdió esto? Lo encontré junto a los libros.</p>
<p><b>SOFÍA:</b> ¡Gracias, profesora! Y gracias a ti también, Tomás.</p>
<p><b>TOMÁS:</b> Para eso están los amigos.</p>
<p class="aco">(Los tres ríen mientras suena el timbre.)</p>` }
  };
  MATERIAS.push({
    id: 'lenguaje', nombre: 'Lenguaje y Comunicación', corto: 'Lenguaje', emoji: '📖', color: '#FFC4D6', fecha: '2026-11-26', textos: TX,
    temas: [
      { id: 'leyenda', oa: 'Comprensión · texto literario', titulo: 'La leyenda',
        aprende: [{ t: '¿Qué es una leyenda?', txt: 'Una <b>leyenda</b> es un relato <b>tradicional</b> que se ha contado de <b>generación en generación</b>, primero de forma oral. Mezcla elementos <b>reales</b> (lugares, personas, costumbres) con elementos <b>fantásticos</b> (espíritus, animales que hablan, hechos mágicos). Muchas leyendas <b>explican el origen</b> de algo: un lugar, una planta o un fenómeno de la naturaleza. Suelen empezar con frases como "Cuentan que…".' }],
        items: [
          mcq('¿Qué explica la leyenda que leíste?', ['El origen de la neblina de las mañanas', 'Cómo se construyó un camino', 'Por qué los perros ladran', 'Cómo se hace el pan'], 0, 'La leyenda explica que la neblina es el regalo del espíritu de la montaña.', { texto: 'leyenda' }),
          mcq('¿Cuál es el elemento fantástico de la leyenda?', ['El espíritu de la montaña que habla', 'El río', 'El invierno', 'Los animales con sed'], 0, 'Un espíritu que habla no existe en la realidad: es un elemento fantástico.', { texto: 'leyenda' }),
          mcq('¿Por qué subió Ayelén al cerro más alto?', ['Para pedir ayuda porque no había agua', 'Para jugar con sus amigos', 'Para buscar flores', 'Para ver la nieve'], 0, 'El río se había secado y pidió ayuda al espíritu de la montaña.', { texto: 'leyenda' }),
          order('Ordena los hechos de la leyenda.', ['El río se secó por falta de lluvia', 'Ayelén pidió ayuda al espíritu de la montaña', 'El espíritu le pidió compartir el agua', 'Cada mañana la neblina cubre el valle'], 'Primero la sequía, luego el pedido, la condición y al final la neblina.', { texto: 'leyenda' }),
          sort('¿Es una característica de la leyenda?', ['Sí', 'No'], [['Se transmite de generación en generación', 0], ['Mezcla lo real con lo fantástico', 0], ['Explica el origen de algo', 0], ['Tiene subtítulos y datos científicos', 1], ['Se escribe con nombres de personajes y diálogos para actuar', 1]], 'La leyenda es tradicional, mezcla lo real y lo fantástico y explica un origen.'),
          tf('Las leyendas se contaban oralmente, de padres a hijos, antes de escribirse.', true, 'Por eso decimos que se transmiten de generación en generación.', { ev: true }),
          mcq('La frase "Cuentan los abuelos del valle que…" muestra que la leyenda…', ['se ha transmitido de generación en generación', 'es un artículo científico', 'es una obra de teatro', 'es una noticia de hoy'], 0, 'Las leyendas pasan de los mayores a los más jóvenes.', { texto: 'leyenda', ev: true }),
          mcq('¿Qué debe hacer la gente para que la neblina vuelva a bajar, según la leyenda?', ['Compartir su agua', 'Cortar árboles', 'Gritar al cerro', 'Cerrar el río'], 0, 'La leyenda dice que la neblina baja cada vez que alguien comparte su agua.', { texto: 'leyenda', ev: true })
        ] },
      { id: 'articulo', oa: 'Comprensión · texto no literario', titulo: 'El artículo informativo',
        aprende: [{ t: '¿Qué es un artículo informativo?', txt: 'Un <b>artículo informativo</b> es un texto <b>no literario</b> que entrega <b>información real</b> sobre un tema. Su propósito es <b>informar</b>. Tiene <b>título</b>, una <b>introducción</b> que presenta el tema, un <b>desarrollo</b> ordenado con <b>subtítulos</b>, un <b>cierre</b> y, muchas veces, <b>imágenes con su pie de imagen</b>. No tiene personajes inventados.' }],
        items: [
          mcq('¿Cuál es el propósito del artículo "El copihue, la flor nacional de Chile"?', ['Informar sobre el copihue', 'Contar una historia inventada', 'Hacer reír', 'Vender copihues'], 0, 'Un artículo informativo entrega información real sobre un tema.', { texto: 'articulo' }),
          mcq('Según el artículo, ¿dónde crece el copihue?', ['En bosques húmedos del centro y sur de Chile', 'En el desierto de Atacama', 'En el mar', 'Solo en macetas'], 0, 'El texto dice que crece en bosques húmedos y sombríos del centro y sur.', { texto: 'articulo' }),
          mcq('¿Para qué sirven los subtítulos como "¿Cómo es?" y "¿Dónde vive?"?', ['Para ordenar la información por temas', 'Para que el texto rime', 'Para mostrar quién habla', 'Para contar un final feliz'], 0, 'Los subtítulos ordenan la información del artículo.', { texto: 'articulo' }),
          tf('Según el artículo, el copihue fue declarado flor nacional en 1977.', true, 'La introducción dice: "Desde 1977 es la flor nacional".', { texto: 'articulo' }),
          match('Une cada parte del artículo con lo que hace.', [['Título', 'Dice el tema'], ['Introducción', 'Presenta el tema'], ['Subtítulos', 'Ordenan la información'], ['Pie de imagen', 'Explica la imagen']], 'Cada parte del artículo ayuda a entender la información.', { ev: true }),
          mcq('¿Qué hacen los picaflores al visitar el copihue?', ['Beben néctar y llevan polen de una flor a otra', 'Se comen las hojas', 'Construyen nidos en las raíces', 'Arrancan la planta'], 0, 'El texto dice que beben néctar y, al hacerlo, llevan el polen.', { texto: 'articulo', ev: true }),
          mcq('¿Qué consejo da el artículo al final?', ['No arrancar el copihue del bosque', 'Regarlo con agua de mar', 'Plantarlo en el desierto', 'Pintar sus flores'], 0, 'Al final recomienda observarlo y fotografiarlo, pero no arrancarlo.', { texto: 'articulo', ev: true })
        ] },
      { id: 'drama', oa: 'Comprensión · texto literario', titulo: 'El texto dramático',
        aprende: [{ t: '¿Qué es un texto dramático?', txt: 'Un <b>texto dramático</b> está escrito para ser <b>representado</b> por actores, como una obra de teatro. Tiene <b>personajes</b>; la historia se cuenta con <b>diálogos</b> (antes de lo que dice cada uno aparece su <b>nombre</b>); y tiene <b>acotaciones</b>, que van <b>entre paréntesis</b> e indican cómo se mueven, qué sienten o dónde están los personajes. Se puede dividir en <b>escenas</b> o actos.' }],
        items: [
          mcq('¿Qué son las acotaciones del texto dramático?', ['Indicaciones entre paréntesis sobre lo que hacen o sienten los personajes', 'Los títulos del texto', 'Las rimas de un poema', 'Los datos científicos'], 0, 'Las acotaciones van entre paréntesis e indican acciones, gestos o lugares.', { texto: 'drama' }),
          mcq('En el texto, "(buscando debajo de las mesas)" es…', ['una acotación', 'un diálogo', 'un personaje', 'un título'], 0, 'Está entre paréntesis y dice lo que hace Sofía: es una acotación.', { texto: 'drama' }),
          mcq('¿Dónde ocurre la escena?', ['En una sala de clases durante el recreo', 'En una plaza', 'En la casa de Tomás', 'En un bosque'], 0, 'La primera acotación lo indica: una sala de clases durante el recreo.', { texto: 'drama' }),
          mcq('¿Cuál es el problema de Sofía?', ['Perdió su cuaderno de ciencias', 'No tiene amigos', 'Se le olvidó el almuerzo', 'No sabe leer'], 0, 'Sofía no encuentra su cuaderno y tiene que entregar una tarea.', { texto: 'drama' }),
          sort('¿Es parte de un texto dramático?', ['Sí', 'No'], [['Personajes', 0], ['Diálogos', 0], ['Acotaciones', 0], ['Pie de imagen con datos', 1], ['Frase "Cuentan los abuelos que…"', 1]], 'El texto dramático tiene personajes, diálogos y acotaciones.', { ev: true }),
          mcq('¿Para qué se escribe un texto dramático?', ['Para ser representado por actores', 'Para informar con datos', 'Para explicar el origen de algo', 'Para hacer una lista de compras'], 0, 'El texto dramático se escribe para representarse.', { ev: true }),
          mcq('¿Cómo ayudó Tomás a Sofía?', ['Recordó haber visto un cuaderno verde en la biblioteca', 'Le prestó su cuaderno', 'Hizo la tarea por ella', 'Llamó a su mamá'], 0, 'Tomás recordó que vio un cuaderno verde en la biblioteca.', { texto: 'drama', ev: true })
        ] },
      { id: 'tipos', oa: 'Comprensión', titulo: 'Diferenciar los tipos de texto',
        aprende: [{ t: 'Tres tipos de texto', txt: '📜 <b>Leyenda</b>: relato tradicional, mezcla lo real y lo fantástico, explica un origen.<br>📰 <b>Artículo informativo</b>: entrega información real, con título, subtítulos e imágenes.<br>🎭 <b>Texto dramático</b>: personajes, diálogos y acotaciones; se escribe para actuarlo.' }],
        items: [
          match('Une cada tipo de texto con su característica.', [['Leyenda', 'Explica el origen de algo con elementos fantásticos'], ['Artículo informativo', 'Entrega información real con subtítulos'], ['Texto dramático', 'Tiene diálogos y acotaciones para actuarlo']], 'Cada tipo de texto tiene un propósito distinto.'),
          mcq('"Hace mucho tiempo, un cóndor gigante formó los cerros con sus alas…". ¿Qué tipo de texto parece?', ['Una leyenda', 'Un artículo informativo', 'Una receta', 'Una noticia'], 0, 'Explica el origen de los cerros con un elemento fantástico: es una leyenda.'),
          mcq('"El huemul es un ciervo que vive en la cordillera del sur de Chile." ¿De qué tipo de texto parece?', ['Un artículo informativo', 'Una leyenda', 'Un texto dramático', 'Un poema'], 0, 'Entrega un dato real: es propio de un artículo informativo.'),
          mcq('"JUAN: (enojado) ¡Devuélveme la pelota!" ¿De qué tipo de texto es?', ['Texto dramático', 'Leyenda', 'Artículo informativo', 'Carta'], 0, 'Tiene el nombre del personaje, diálogo y una acotación.', { ev: true })
        ] },
      { id: 'uso-b', oa: 'Ortografía literal', titulo: 'Uso de la B',
        aprende: [{ t: 'Cuándo se escribe con B', txt: '✏️ Después de <b>m</b>: <b>mb</b> (hombre, cambio, tambor).<br>✏️ Antes de <b>l</b> y <b>r</b>: <b>bl</b>, <b>br</b> (blusa, hablar, libro, brazo).<br>✏️ Palabras que empiezan con <b>bu-, bur-, bus-</b> (bufanda, burbuja, buscar).<br>✏️ Terminaciones <b>-aba</b> de los verbos que indican pasado (jugaba, cantaba, saltábamos).' }],
        items: [
          fill('Completa: som___rero', ['b', 'v'], 0, 'Después de m se escribe b: sombrero.'),
          fill('Completa: ha___lar', ['b', 'v'], 0, 'Antes de l se escribe b: hablar.'),
          fill('Completa: ___uscar', ['b', 'v'], 0, 'Las palabras que empiezan con bus- se escriben con b: buscar.'),
          fill('Completa: Ayer yo juga___a en el patio.', ['b', 'v'], 0, 'Los verbos en pasado terminados en -aba se escriben con b: jugaba.'),
          mcq('Elige la palabra escrita correctamente.', ['tambor', 'tamvor', 'tanbor', 'tambbor'], 0, 'Después de m va b: tambor.'),
          fill('Completa: ___rillante', ['b', 'v'], 0, 'Antes de r se escribe b: brillante.', { ev: true }),
          fill('Completa: Los niños canta___an en el acto.', ['b', 'v'], 0, 'Terminación -aban de un verbo en pasado: cantaban.', { ev: true })
        ] },
      { id: 'uso-v', oa: 'Ortografía literal', titulo: 'Uso de la V',
        aprende: [{ t: 'Cuándo se escribe con V', txt: '✏️ Después de <b>n</b>: <b>nv</b> (invierno, enviar, invitar).<br>✏️ Palabras terminadas en <b>-avo, -ava, -evo, -eva, -ivo, -iva</b> (octavo, nuevo, nueva, activo).<br>✏️ Formas del verbo <b>ir</b>: voy, vas, va, vamos, van.<br>💡 Truco: <b>mb</b> con b; <b>nv</b> con v.' }],
        items: [
          fill('Completa: in___ierno', ['v', 'b'], 0, 'Después de n se escribe v: invierno.'),
          fill('Completa: en___iar una carta', ['v', 'b'], 0, 'Después de n va v: enviar.'),
          fill('Completa: Mi mochila es nue___a.', ['v', 'b'], 0, 'Las palabras terminadas en -eva se escriben con v: nueva.'),
          fill('Completa: Yo ___oy al colegio.', ['v', 'b'], 0, 'Las formas del verbo ir se escriben con v: voy.'),
          mcq('¿Qué palabra está bien escrita?', ['invitar', 'inbitar', 'imvitar', 'imbitar'], 0, 'Después de n va v: invitar.'),
          fill('Completa: Es un niño muy acti___o.', ['v', 'b'], 0, 'Las palabras terminadas en -ivo se escriben con v: activo.', { ev: true }),
          sort('¿Con B o con V?', ['B', 'V'], [['hom_ro', 0], ['in_itación', 1], ['_urbuja', 0], ['octa_o', 1], ['_amos al parque', 1], ['li_ro', 0]], 'hombro, burbuja y libro con b; invitación, octavo y vamos con v.', { ev: true })
        ] },
      { id: 'individual', oa: 'Gramática', titulo: 'Sustantivo individual',
        aprende: [{ t: 'Sustantivo individual', txt: 'Un <b>sustantivo individual</b> nombra a <b>un solo</b> ser u objeto. Por ejemplo: <b>abeja</b>, <b>pez</b>, <b>oveja</b>, <b>árbol</b>, <b>isla</b>, <b>estrella</b>, <b>músico</b>, <b>perro</b>. Si hay muchos, usamos el plural: abejas, peces, ovejas.', img: '<div class="emo">🐝 · 🐟 · 🐑 · 🌳 · ⭐</div>' }],
        items: [
          mcq('¿Cuál es un sustantivo individual?', ['abeja', 'enjambre', 'cardumen', 'rebaño'], 0, '"Abeja" nombra a un solo ser.'),
          tf('"Pez" es un sustantivo individual.', true, 'Pez nombra a un solo animal.'),
          fill('Un sustantivo individual nombra a ___ ser u objeto.', ['un solo', 'un grupo de', 'ningún'], 0, 'El individual nombra a uno solo.'),
          mcq('¿Cuál de estas palabras es individual?', ['estrella', 'constelación', 'orquesta', 'archipiélago'], 0, '"Estrella" nombra una sola; "constelación" es un conjunto.', { ev: true })
        ] },
      { id: 'colectivo', oa: 'Gramática', titulo: 'Sustantivo colectivo',
        aprende: [{ t: 'Sustantivo colectivo', txt: 'Un <b>sustantivo colectivo</b> está en <b>singular</b>, pero nombra a un <b>conjunto</b> de seres u objetos de la misma clase. <b>enjambre</b> = abejas · <b>cardumen</b> = peces · <b>rebaño</b> = ovejas · <b>bandada</b> = aves · <b>jauría</b> = perros · <b>arboleda</b> = árboles · <b>archipiélago</b> = islas · <b>constelación</b> = estrellas · <b>orquesta</b> = músicos · <b>flota</b> = barcos.<br>💡 No es lo mismo que el plural: "ovejas" es plural; "rebaño" es una palabra en singular que significa muchas ovejas juntas.', img: '<div class="emo">🐝🐝🐝 enjambre · 🐟🐟🐟 cardumen · 🐑🐑🐑 rebaño</div>' }],
        items: [
          match('Une cada individual con su colectivo.', [['Abeja', 'Enjambre'], ['Pez', 'Cardumen'], ['Oveja', 'Rebaño'], ['Isla', 'Archipiélago']], 'enjambre de abejas, cardumen de peces, rebaño de ovejas, archipiélago de islas.'),
          mcq('Un conjunto de aves que vuelan juntas es una…', ['bandada', 'jauría', 'flota', 'arboleda'], 0, 'Bandada es el colectivo de aves.'),
          sort('¿Individual o colectivo?', ['Individual', 'Colectivo'], [['músico', 0], ['orquesta', 1], ['árbol', 0], ['arboleda', 1], ['perro', 0], ['jauría', 1]], 'Músico, árbol y perro son individuales; orquesta, arboleda y jauría son colectivos.'),
          tf('"Ovejas" es un sustantivo colectivo.', false, '"Ovejas" es el plural de oveja. El colectivo es "rebaño".'),
          fill('Chiloé es parte de un ___, un conjunto de islas.', ['archipiélago', 'cardumen', 'enjambre'], 0, 'Un conjunto de islas es un archipiélago.', { ev: true }),
          match('Une cada colectivo con lo que reúne.', [['Constelación', 'Estrellas'], ['Flota', 'Barcos'], ['Jauría', 'Perros']], 'Cada colectivo nombra un grupo de seres u objetos.', { ev: true }),
          mcq('¿Cuál es la diferencia entre "peces" y "cardumen"?', ['"Peces" es plural; "cardumen" es un colectivo en singular', 'Son exactamente iguales', '"Cardumen" es un solo pez', '"Peces" es un colectivo'], 0, 'El plural agrega -s o -es; el colectivo es otra palabra, en singular.', { ev: true })
        ] }
    ],
    explora: [
      { id: 'exp-leyenda', titulo: 'Lee la leyenda', tipo: 'texto', texto: 'leyenda' },
      { id: 'exp-articulo', titulo: 'Lee el artículo informativo', tipo: 'texto', texto: 'articulo' },
      { id: 'exp-drama', titulo: 'Lee el texto dramático', tipo: 'texto', texto: 'drama' }
    ],
    juego: { tipo: 'rapido', lluvia: true, titulo: 'Lluvia de palabras: ¿B o V?',
      como: 'Las palabras caen desde arriba como gotas de lluvia. A cada palabra le falta una letra: la B o la V. Toca la letra que falta antes de que la palabra llegue al suelo. Si la palabra cae, no pasa nada: Chispa te muestra cómo se escribe y sigues con la próxima.',
      ejemplo: { html: '<div class="palabra chica">tam_or</div><p class="txt">➜ Tocas <b>B</b>: se escribe <b>tam<u>b</u>or</b>. Después de la M siempre va B.</p>', voz: 'Por ejemplo, cae la palabra tam, or, y le falta una letra. Tocas la be, porque se escribe tambor: después de la eme siempre va be.' },
      grupos: ['B', 'V'], items: [['hom_re', 0], ['in_ierno', 1], ['ha_lar', 0], ['nue_o', 1], ['_uscar', 0], ['_oy', 1], ['juga_a', 0], ['en_iar', 1], ['tam_or', 0], ['acti_o', 1], ['_urbuja', 0], ['octa_o', 1], ['_rillo', 0], ['in_itar', 1], ['cam_io', 0], ['_amos', 1]], ayuda: { 'hom_re': 'hombre', 'in_ierno': 'invierno', 'ha_lar': 'hablar', 'nue_o': 'nuevo', '_uscar': 'buscar', '_oy': 'voy', 'juga_a': 'jugaba', 'en_iar': 'enviar', 'tam_or': 'tambor', 'acti_o': 'activo', '_urbuja': 'burbuja', 'octa_o': 'octavo', '_rillo': 'brillo', 'in_itar': 'invitar', 'cam_io': 'cambio', '_amos': 'vamos' } }
  });
})();
