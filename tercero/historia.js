/* HISTORIA, GEOGRAFÍA Y CIENCIAS SOCIALES · 3.º básico · Evaluación 24 nov 2026
   Contenidos del temario: Unidad 2 Los griegos · Unidad 3 Los romanos · Unidad 4 Derechos y deberes de niños y niñas.
   Base curricular: vida cotidiana y legado de griegos y romanos de la Antigüedad; derechos de los niños (Convención sobre los Derechos del Niño, ONU 1989, ratificada por Chile en 1990).
   Explicaciones simplificadas para niños de 8-9 años; se marcan las diferencias entre Grecia y Roma. */
(function () {
  const { mcq, tf, match, order, fill, sort, spot } = Q;
  const piramide = (niveles, titulo) => `<figure class="piramide"><figcaption>${titulo}</figcaption>${niveles.map((n, i) => `<div class="niv" style="width:${40 + i * 60 / Math.max(1, niveles.length - 1)}%"><b>${n[0]}</b><span>${n[1]}</span></div>`).join('')}</figure>`;
  const PG = () => piramide([['Ciudadanos', 'hombres nacidos en Atenas; votaban y gobernaban'], ['Metecos', 'extranjeros libres: comerciantes y artesanos; no votaban'], ['Esclavos', 'no eran libres ni tenían derechos']], 'Sociedad de Atenas (Grecia)');
  const PR = () => piramide([['Patricios', 'familias ricas y antiguas; gobernaban'], ['Plebeyos', 'la mayoría: campesinos, artesanos y comerciantes'], ['Esclavos', 'no eran libres; muchos eran prisioneros de guerra']], 'Sociedad romana');
  MATERIAS.push({
    id: 'historia', nombre: 'Historia, Geografía y Ciencias Sociales', corto: 'Historia', emoji: '🏛️', color: '#C9B6F0', fecha: '2026-11-24',
    temas: [
      { id: 'grecia-ubicacion', oa: 'Unidad 2', titulo: 'Dónde vivían los griegos',
        aprende: [{ t: 'La Antigua Grecia', txt: 'Los griegos vivieron hace muchísimo tiempo en el <b>sur de Europa</b>, en la <b>península de los Balcanes</b> y en muchas <b>islas del mar Egeo</b>. Su tierra tenía muchas <b>montañas</b> y poco suelo para cultivar, y estaba rodeada por el <b>mar</b>. Por eso muchos griegos fueron <b>navegantes y comerciantes</b>.', img: SVG.mapa() }],
        items: [
          spot('En el mapa, toca la zona donde vivían los GRIEGOS.', SVG.mapa(), 'grecia', 'Grecia está al este de la península itálica, junto al mar Egeo y con muchas islas.'),
          mcq('¿Cómo era el territorio de la Antigua Grecia?', ['Con muchas montañas, islas y rodeado de mar', 'Un gran desierto sin agua', 'Una selva tropical', 'Una llanura cubierta de hielo'], 0, 'Grecia era montañosa, con muchas islas y rodeada por el mar.'),
          tf('Como estaban rodeados de mar, muchos griegos fueron navegantes y comerciantes.', true, 'El mar era su camino para comerciar con otros pueblos.'),
          mcq('¿Junto a qué mar estaban muchas ciudades y islas griegas?', ['Mar Egeo', 'Océano Pacífico', 'Mar Caribe', 'Mar Báltico'], 0, 'Las islas y costas griegas rodeaban el mar Egeo, que es parte del Mediterráneo.', { ev: true })
        ] },
      { id: 'polis', oa: 'Unidad 2', titulo: 'La polis',
        aprende: [{ t: 'La polis: una ciudad-estado', txt: 'Las montañas separaban a los griegos, por eso formaron muchas <b>polis</b>. Una polis era una <b>ciudad-estado</b>: una ciudad con su campo alrededor, que tenía su <b>propio gobierno, leyes y ejército</b>. Las más conocidas fueron <b>Atenas</b> y <b>Esparta</b>. En la parte alta estaba la <b>acrópolis</b>, con los templos, y en el centro el <b>ágora</b>, la plaza donde se comerciaba y conversaba.', img: SVG.templo() }],
        items: [
          mcq('¿Qué era una polis?', ['Una ciudad-estado con su propio gobierno, leyes y ejército', 'Un barco griego', 'Un tipo de comida', 'Un templo romano'], 0, 'La polis era una ciudad-estado independiente.'),
          match('Une cada lugar de la polis con lo que era.', [['Acrópolis', 'Parte alta con templos'], ['Ágora', 'Plaza para comerciar y reunirse']], 'La acrópolis estaba en lo alto; el ágora era la plaza central.'),
          mcq('¿Cuáles fueron dos polis griegas muy conocidas?', ['Atenas y Esparta', 'Santiago y Valparaíso', 'Roma y Pompeya', 'Lima y Cusco'], 0, 'Atenas y Esparta fueron dos polis importantes y muy distintas.'),
          tf('Todas las polis griegas tenían el mismo gobierno y las mismas leyes.', false, 'Cada polis tenía su propio gobierno y sus propias leyes.'),
          fill('La plaza central de la polis, donde se comerciaba, se llamaba ___.', ['ágora', 'foro', 'coliseo'], 0, 'En Grecia era el ágora. (El foro era la plaza de los romanos.)', { ev: true })
        ] },
      { id: 'piramide-griega', oa: 'Unidad 2', titulo: 'La pirámide social griega',
        aprende: [{ t: 'Cómo se organizaba la sociedad en Atenas', txt: 'Arriba estaban los <b>ciudadanos</b>: hombres nacidos en Atenas, que votaban y participaban en el gobierno. Al medio, los <b>metecos</b>: extranjeros libres que trabajaban como comerciantes y artesanos, pero no podían votar. Abajo, los <b>esclavos</b>, que no eran libres. Las mujeres no participaban en el gobierno.', img: PG() }],
        items: [
          order('Ordena la pirámide social de Atenas, de arriba hacia abajo.', ['Ciudadanos', 'Metecos', 'Esclavos'], 'Arriba los ciudadanos, al medio los metecos y abajo los esclavos.'),
          mcq('¿Quiénes eran los metecos?', ['Extranjeros libres que vivían en Atenas', 'Los reyes de Roma', 'Los niños de Esparta', 'Los dioses griegos'], 0, 'Los metecos eran extranjeros libres: trabajaban, pero no votaban.'),
          tf('En Atenas, los esclavos podían votar en las asambleas.', false, 'Solo los ciudadanos votaban. Los esclavos no tenían derechos.'),
          mcq('¿Quiénes participaban en el gobierno de Atenas?', ['Los ciudadanos', 'Los esclavos', 'Los metecos', 'Todas las personas'], 0, 'Solo los ciudadanos (hombres nacidos en Atenas) participaban en el gobierno.', { ev: true }),
          match('Une cada grupo con su descripción.', [['Ciudadanos', 'Votaban y gobernaban'], ['Metecos', 'Extranjeros comerciantes y artesanos'], ['Esclavos', 'No eran libres']], 'Cada grupo tenía derechos distintos.')
        ] },
      { id: 'vestimenta', oa: 'Unidad 2', titulo: 'La vestimenta griega',
        aprende: [{ t: 'Cómo se vestían los griegos', txt: 'Hombres y mujeres usaban el <b>quitón</b>, una túnica de lino o lana. Las mujeres también usaban el <b>peplo</b>, un vestido largo sujeto con broches en los hombros. Encima se ponían un manto llamado <b>himatión</b>. En los pies usaban <b>sandalias</b> de cuero o andaban descalzos.', img: '<div class="emo">👘 quitón · 🧥 himatión · 🩴 sandalias</div>' }],
        items: [
          mcq('¿Cómo se llamaba la túnica que usaban hombres y mujeres griegos?', ['Quitón', 'Poncho', 'Toga', 'Kimono'], 0, 'El quitón era la túnica griega. (La toga era romana.)'),
          match('Une cada prenda griega con su descripción.', [['Quitón', 'Túnica de lino o lana'], ['Peplo', 'Vestido de mujer sujeto con broches'], ['Himatión', 'Manto que se ponía encima']], 'Quitón, peplo e himatión eran prendas griegas.'),
          tf('Los griegos usaban sandalias de cuero.', true, 'Las sandalias eran el calzado habitual.'),
          fill('El manto que los griegos usaban encima de la túnica se llamaba ___.', ['himatión', 'toga', 'chaleco'], 0, 'El himatión era el manto griego.', { ev: true })
        ] },
      { id: 'vivienda', oa: 'Unidad 2', titulo: 'La vivienda griega',
        aprende: [{ t: 'Las casas griegas', txt: 'Las casas se construían con <b>adobe</b> sobre una base de piedra. Tenían pocas ventanas hacia la calle y un <b>patio interior</b> en el centro, que daba luz y aire. Alrededor del patio estaban las habitaciones: la cocina, los dormitorios, el <b>andrón</b> (donde los hombres recibían visitas) y el <b>gineceo</b> (la parte de las mujeres).', img: SVG.casaGriega() }],
        items: [
          spot('En el plano, toca el PATIO de la casa griega.', SVG.casaGriega().replace('<rect x="105" y="70" width="90" height="80"', '<rect data-part="patio" class="tap" x="105" y="70" width="90" height="80"'), 'patio', 'El patio estaba al centro y daba luz y aire a las habitaciones.'),
          mcq('¿Qué tenían las casas griegas al centro?', ['Un patio interior', 'Una piscina', 'Un garaje', 'Un ascensor'], 0, 'Las habitaciones rodeaban un patio interior.'),
          tf('Las casas griegas tenían muchas ventanas grandes hacia la calle.', false, 'Tenían pocas ventanas hacia la calle; la luz entraba por el patio.'),
          match('Une cada parte de la casa con su uso.', [['Andrón', 'Los hombres recibían visitas'], ['Gineceo', 'Parte de las mujeres'], ['Patio', 'Daba luz y aire']], 'La casa griega se organizaba alrededor del patio.', { ev: true })
        ] },
      { id: 'familia', oa: 'Unidad 2', titulo: 'La familia griega',
        aprende: [{ t: 'La familia en Grecia', txt: 'El <b>padre</b> era el jefe de la familia. La <b>madre</b> dirigía la casa y cuidaba a los hijos. En Atenas, los <b>niños</b> iban a la escuela desde los 7 años, acompañados por un esclavo llamado <b>pedagogo</b>, y aprendían a leer, escribir, música y deporte. Las <b>niñas</b> aprendían en casa las tareas del hogar. En <b>Esparta</b>, los niños se entrenaban desde pequeños para ser soldados.', img: '<div class="emo">👨‍👩‍👦 · 📜 escuela · 🛡️ Esparta</div>' }],
        items: [
          mcq('En Atenas, ¿quién era el jefe de la familia?', ['El padre', 'El hijo menor', 'El pedagogo', 'El vecino'], 0, 'En la familia griega, el padre era el jefe.'),
          tf('En Atenas, las niñas iban a la escuela igual que los niños.', false, 'Los niños iban a la escuela; las niñas aprendían en casa las tareas del hogar.'),
          mcq('¿Para qué se educaba a los niños en Esparta?', ['Para ser soldados', 'Para ser actores', 'Para ser comerciantes', 'Para ser pescadores'], 0, 'Esparta era una polis guerrera: sus niños se entrenaban como soldados.'),
          fill('El esclavo que acompañaba a los niños a la escuela se llamaba ___.', ['pedagogo', 'patricio', 'meteco'], 0, 'El pedagogo acompañaba a los niños. Hoy esa palabra se usa para quienes enseñan.', { ev: true })
        ] },
      { id: 'legado-griego', oa: 'Unidad 2', titulo: 'Legados de Grecia',
        aprende: [{ t: 'Lo que heredamos de los griegos', txt: 'Muchas cosas que usamos hoy vienen de los griegos: la <b>democracia</b> (gobierno en que deciden los ciudadanos, nacida en Atenas), los <b>Juegos Olímpicos</b> (que comenzaron en Olimpia), el <b>teatro</b>, la <b>filosofía</b>, la palabra <b>alfabeto</b> (de sus letras alfa y beta) y los edificios con <b>columnas</b>.', img: SVG.templo() }],
        items: [
          sort('¿Es un legado griego?', ['Legado griego', 'No es legado griego'], [['Juegos Olímpicos', 0], ['Democracia', 0], ['Teatro', 0], ['Teléfono celular', 1], ['Edificios con columnas', 0], ['Internet', 1]], 'Los Juegos Olímpicos, la democracia, el teatro y las columnas son legados griegos.'),
          mcq('¿En qué polis nació la democracia?', ['Atenas', 'Esparta', 'Roma', 'Santiago'], 0, 'La democracia nació en Atenas.'),
          tf('Los Juegos Olímpicos comenzaron en la Antigua Grecia.', true, 'Comenzaron en Olimpia, en Grecia.'),
          mcq('La palabra "alfabeto" viene de…', ['las dos primeras letras griegas: alfa y beta', 'un emperador romano', 'un río de Chile', 'un juego de pelota'], 0, 'Alfa y beta son las primeras letras del alfabeto griego.', { ev: true })
        ] },
      { id: 'roma-ubicacion', oa: 'Unidad 3', titulo: 'Dónde vivían los romanos',
        aprende: [{ t: 'La ubicación de Roma', txt: 'La ciudad de <b>Roma</b> nació junto al <b>río Tíber</b>, en la <b>península itálica</b>, que tiene forma de <b>bota</b>. Está en el <b>centro del mar Mediterráneo</b>. Con el tiempo, los romanos conquistaron todas las tierras alrededor de ese mar, al que llamaron <b>"Mare Nostrum"</b>: nuestro mar.', img: SVG.mapa() }],
        items: [
          spot('En el mapa, toca la península donde estaba ROMA.', SVG.mapa(), 'italia', 'Roma estaba en la península itálica, que tiene forma de bota.'),
          mcq('¿Qué forma tiene la península itálica?', ['De bota', 'De círculo', 'De estrella', 'De corazón'], 0, 'La península itálica tiene forma de bota.'),
          mcq('¿Junto a qué río nació la ciudad de Roma?', ['Río Tíber', 'Río Mapocho', 'Río Nilo', 'Río Amazonas'], 0, 'Roma nació a orillas del río Tíber.', { ev: true }),
          fill('Los romanos llamaron al mar Mediterráneo "Mare ___", que significa "nuestro mar".', ['Nostrum', 'Grande', 'Azul'], 0, 'Mare Nostrum significa "nuestro mar".')
        ] },
      { id: 'construcciones', oa: 'Unidad 3', titulo: 'Las construcciones romanas',
        aprende: [{ t: 'Grandes constructores', txt: 'Los romanos fueron grandes ingenieros. Construyeron <b>acueductos</b> para llevar agua a las ciudades, <b>calzadas</b> (caminos de piedra) que unían todo su territorio, <b>puentes</b>, <b>termas</b> (baños públicos), el <b>foro</b> (plaza central) y anfiteatros como el <b>Coliseo</b>, donde había espectáculos. Usaban mucho el <b>arco</b> y un material parecido al cemento.', img: SVG.acueducto() + SVG.coliseo() }],
        items: [
          match('Une cada construcción romana con su uso.', [['Acueducto', 'Llevar agua a la ciudad'], ['Calzada', 'Camino de piedra'], ['Terma', 'Baño público'], ['Coliseo', 'Espectáculos']], 'Cada construcción romana tenía un uso práctico.'),
          mcq('Observa la imagen. ¿Qué construcción romana es?', ['Un acueducto', 'Una pirámide', 'Un templo griego', 'Un rascacielos'], 0, 'Es un acueducto: el agua corría por la parte de arriba.', { img: SVG.acueducto() }),
          tf('Los romanos usaban mucho el arco en sus construcciones.', true, 'El arco permitía construir puentes y acueductos firmes.'),
          mcq('¿Para qué servían las calzadas romanas?', ['Para unir las ciudades con caminos firmes', 'Para guardar trigo', 'Para hacer obras de teatro', 'Para bañarse'], 0, 'Las calzadas eran caminos de piedra que unían el territorio romano.', { ev: true }),
          mcq('¿Qué construcción es la de la imagen?', ['El Coliseo, un anfiteatro', 'Un acueducto', 'Una casa griega', 'Un puente'], 0, 'El Coliseo era un anfiteatro donde se realizaban espectáculos.', { img: SVG.coliseo(), ev: true })
        ] },
      { id: 'piramide-romana', oa: 'Unidad 3', titulo: 'La pirámide social romana',
        aprende: [{ t: 'Cómo se organizaba la sociedad romana', txt: 'Arriba estaban los <b>patricios</b>: familias ricas y antiguas que gobernaban. Al medio, los <b>plebeyos</b>: la mayoría de la población, campesinos, artesanos y comerciantes. Abajo, los <b>esclavos</b>, que no eran libres; muchos eran prisioneros de guerra. En la época del Imperio, el <b>emperador</b> estaba por sobre todos.', img: PR() }],
        items: [
          order('Ordena la pirámide social romana, de arriba hacia abajo.', ['Patricios', 'Plebeyos', 'Esclavos'], 'Arriba los patricios, al medio los plebeyos y abajo los esclavos.'),
          mcq('¿Quiénes eran los plebeyos?', ['La mayoría de la población: campesinos, artesanos y comerciantes', 'Los dueños de todo Roma', 'Los dioses romanos', 'Los soldados griegos'], 0, 'Los plebeyos eran la mayoría del pueblo romano.'),
          tf('Los patricios eran familias ricas que gobernaban Roma.', true, 'Los patricios ocupaban la parte alta de la sociedad.'),
          match('Une cada grupo romano con su descripción.', [['Patricios', 'Familias ricas que gobernaban'], ['Plebeyos', 'Campesinos, artesanos y comerciantes'], ['Esclavos', 'Muchos eran prisioneros de guerra']], 'Cada grupo tenía un lugar distinto en la sociedad.', { ev: true })
        ] },
      { id: 'grecia-roma', oa: 'Unidades 2 y 3', titulo: 'Grecia y Roma no son iguales',
        aprende: [{ t: 'Diferencias entre griegos y romanos', txt: '🏛️ <b>Grecia</b>: muchas <b>polis</b> independientes (Atenas, Esparta); sociedad de ciudadanos, metecos y esclavos; vestían <b>quitón</b>; plaza: <b>ágora</b>; nos dejaron la democracia, los Juegos Olímpicos y el teatro.<br>🛡️ <b>Roma</b>: una ciudad que formó un gran <b>imperio</b>; sociedad de patricios, plebeyos y esclavos; los ciudadanos vestían <b>toga</b>; plaza: <b>foro</b>; nos dejaron el latín (de donde viene el español), el derecho, los números romanos, acueductos y calzadas.', img: '<div class="cmp"><div>🏛️ <b>GRECIA</b><br>polis · ágora · quitón<br>ciudadanos · metecos</div><div>🛡️ <b>ROMA</b><br>imperio · foro · toga<br>patricios · plebeyos</div></div>' }],
        items: [
          sort('¿Es de Grecia o de Roma?', ['Grecia', 'Roma'], [['Polis', 0], ['Ágora', 0], ['Metecos', 0], ['Acueductos', 1], ['Patricios y plebeyos', 1], ['Toga', 1], ['Juegos Olímpicos', 0], ['Idioma latín', 1]], 'Polis, ágora, metecos y Juegos Olímpicos son griegos. Acueductos, patricios, toga y latín son romanos.'),
          tf('Griegos y romanos tenían exactamente las mismas costumbres.', false, 'Eran pueblos distintos, con costumbres, vestimenta y organización diferentes.'),
          mcq('El idioma español viene principalmente del latín, que hablaban…', ['los romanos', 'los griegos', 'los espartanos', 'los metecos'], 0, 'El latín era el idioma de los romanos.'),
          mcq('¿Qué plaza es romana?', ['El foro', 'El ágora', 'La acrópolis', 'El gineceo'], 0, 'El foro era la plaza de los romanos; el ágora, la de los griegos.', { ev: true }),
          sort('¿Grupo social de Grecia o de Roma?', ['Grecia (Atenas)', 'Roma'], [['Metecos', 0], ['Ciudadanos atenienses', 0], ['Patricios', 1], ['Plebeyos', 1]], 'Metecos y ciudadanos atenienses eran de Atenas; patricios y plebeyos, de Roma.', { ev: true })
        ] },
      { id: 'derechos', oa: 'Unidad 4', titulo: 'Derechos de niñas y niños',
        aprende: [{ t: 'Tus derechos', txt: 'Los <b>derechos</b> son lo que todos los niños y niñas deben tener para crecer bien, sin importar dónde vivan. Están en la <b>Convención sobre los Derechos del Niño</b>, que Chile firmó. Por ejemplo: derecho a la <b>educación</b>, a la <b>salud</b>, a <b>jugar</b> y descansar, a tener un <b>nombre y nacionalidad</b>, a vivir en <b>familia</b>, a ser <b>protegidos</b> del maltrato y a <b>opinar</b> y ser escuchados.', img: '<div class="emo">📚 🩺 ⚽ 🪪 👨‍👩‍👧 🛡️ 🗣️</div>' }],
        items: [
          sort('¿Es un derecho de los niños?', ['Es un derecho', 'No es un derecho'], [['Ir a la escuela', 0], ['Jugar', 0], ['Recibir atención de salud', 0], ['Tener un nombre', 0], ['Tener un celular nuevo', 1], ['Comer dulces todos los días', 1]], 'Educación, juego, salud y nombre son derechos. Un celular o dulces son deseos, no derechos.'),
          mcq('¿Cuál es un derecho de todos los niños y niñas?', ['Recibir educación', 'Tener una consola de videojuegos', 'No hacer nunca tareas', 'Comprar lo que quieran'], 0, 'La educación es un derecho de todos los niños.'),
          tf('Los derechos son solo para algunos niños.', false, 'Los derechos son para todos los niños y niñas, sin excepción.'),
          mcq('¿Qué documento reúne los derechos de los niños?', ['La Convención sobre los Derechos del Niño', 'El libro de cocina', 'El diario del colegio', 'La lista del supermercado'], 0, 'La Convención sobre los Derechos del Niño reúne estos derechos.', { ev: true }),
          match('Une cada situación con el derecho que se cumple.', [['Martina va al consultorio cuando está enferma', 'Derecho a la salud'], ['Diego juega en la plaza después de clases', 'Derecho a jugar'], ['Amanda tiene su carnet con su nombre', 'Derecho a un nombre y nacionalidad']], 'Cada situación muestra un derecho que se cumple.', { ev: true })
        ] },
      { id: 'deberes', oa: 'Unidad 4', titulo: 'Deberes de niñas y niños',
        aprende: [{ t: 'Tus deberes', txt: 'Los <b>deberes</b> son nuestras responsabilidades, las cosas que nos toca hacer para convivir bien. Por ejemplo: <b>respetar</b> a los demás, <b>cumplir las normas</b> de la casa y del colegio, <b>estudiar</b> y hacer las tareas, <b>cuidar</b> los materiales y los espacios comunes, <b>ayudar en casa</b> y cuidar el medio ambiente.', img: '<div class="emo">🤝 📏 📖 🧹 🌎</div>' }],
        items: [
          sort('¿Es un derecho o un deber?', ['Derecho', 'Deber'], [['Recibir educación', 0], ['Hacer las tareas', 1], ['Jugar', 0], ['Respetar a los compañeros', 1], ['Ser protegido del maltrato', 0], ['Cuidar los materiales de la sala', 1]], 'Los derechos se reciben; los deberes son responsabilidades que cumplimos.'),
          mcq('¿Cuál es un deber de un estudiante?', ['Cumplir las normas del colegio', 'Romper los libros', 'Gritar en clases', 'Llegar tarde siempre'], 0, 'Cumplir las normas es un deber de cada estudiante.'),
          tf('Ayudar en las tareas de la casa es un deber.', true, 'Ayudar en casa es una responsabilidad que todos podemos cumplir.'),
          mcq('Si tengo derecho a la educación, ¿qué deber lo acompaña?', ['Estudiar y respetar a mis profesores y compañeros', 'No ir nunca a clases', 'Rayar las mesas', 'Faltar sin avisar'], 0, 'Junto al derecho a la educación está el deber de estudiar y respetar.', { ev: true })
        ] },
      { id: 'convivencia', oa: 'Unidad 4', titulo: 'Buena convivencia',
        aprende: [{ t: 'Convivir bien', txt: 'La <b>buena convivencia</b> es vivir en armonía con los demás. Se logra cuando <b>respetamos los turnos</b>, <b>escuchamos</b> a los otros, <b>resolvemos los conflictos conversando</b>, <b>pedimos disculpas</b> si nos equivocamos, <b>incluimos</b> a todos en el juego y <b>no nos burlamos</b> de nadie.', img: '<div class="emo">🙋 👂 💬 🙏 🤗</div>' }],
        items: [
          sort('¿Ayuda o no ayuda a la buena convivencia?', ['Ayuda', 'No ayuda'], [['Esperar mi turno', 0], ['Burlarme de un compañero', 1], ['Pedir disculpas', 0], ['Dejar a alguien fuera del juego a propósito', 1], ['Conversar para resolver un problema', 0], ['Empujar en la fila', 1]], 'Respetar, conversar y pedir disculpas ayuda a convivir bien.'),
          mcq('Dos compañeros quieren la misma pelota en el recreo. ¿Qué es lo mejor?', ['Conversar y turnarse', 'Pelear', 'Romper la pelota', 'Acusarse a gritos'], 0, 'Conversar y turnarse resuelve el conflicto sin dañar a nadie.'),
          tf('Burlarse de un compañero ayuda a la buena convivencia.', false, 'Las burlas dañan a las personas y a la convivencia.'),
          mcq('Sin querer, botaste el estuche de una compañera. ¿Qué haces?', ['Pido disculpas y la ayudo a recogerlo', 'Me río', 'Me voy corriendo', 'Le digo que fue su culpa'], 0, 'Pedir disculpas y ayudar es parte de la buena convivencia.', { ev: true })
        ] }
    ],
    explora: [
      { id: 'exp-mapa', titulo: 'Explora el mapa', tipo: 'partes', svg: () => SVG.mapa(), info: { grecia: 'Grecia: península de los Balcanes e islas del mar Egeo. Muchas montañas y polis independientes.', italia: 'Península itálica: tiene forma de bota. Allí, junto al río Tíber, nació Roma.', egeo: 'Mar Egeo: rodeado de islas griegas. Los griegos navegaban y comerciaban por él.', mediterraneo: 'Mar Mediterráneo: los romanos dominaron sus costas y lo llamaron "Mare Nostrum".' } },
      { id: 'exp-piramides', titulo: 'Compara las pirámides sociales', tipo: 'html', html: () => PG() + PR() + '<p class="nota">Las dos sociedades tenían esclavos, pero sus otros grupos eran distintos: en Atenas, ciudadanos y metecos; en Roma, patricios y plebeyos.</p>' },
      { id: 'exp-construcciones', titulo: 'Construcciones griegas y romanas', tipo: 'html', html: () => '<h3>Grecia</h3>' + SVG.templo() + SVG.casaGriega() + '<h3>Roma</h3>' + SVG.acueducto() + SVG.coliseo() }
    ],
    juego: { tipo: 'rapido', titulo: '¿Griego o romano?',
      como: 'Aparece una palabra. Piensa si es de los antiguos griegos o de los romanos y toca el botón correcto. Son 12 palabras: ¡intenta acertarlas todas!',
      ejemplo: { html: '<div class="palabra chica">Acueducto</div><p class="txt">➜ Tocas <b>🛡️ Roma</b>, porque los romanos construyeron acueductos para llevar agua a sus ciudades.</p>', voz: 'Por ejemplo, si aparece la palabra acueducto, tocas Roma, porque los romanos construyeron acueductos para llevar agua a sus ciudades.' },
      grupos: ['🏛️ Grecia', '🛡️ Roma'], items: [['Polis', 0], ['Ágora', 0], ['Quitón', 0], ['Metecos', 0], ['Democracia de Atenas', 0], ['Juegos Olímpicos', 0], ['Esparta', 0], ['Acrópolis', 0], ['Acueducto', 1], ['Calzadas', 1], ['Coliseo', 1], ['Patricios', 1], ['Plebeyos', 1], ['Toga', 1], ['Río Tíber', 1], ['Latín', 1], ['Foro', 1], ['Termas', 1]] }
  });
})();
