/* CIENCIAS NATURALES · 3.º básico · Evaluación 23 nov 2026
   OA oficiales (Bases Curriculares): OA1 necesidades de las plantas y su relación con raíz, tallo y hojas · OA2 plantas de nuestro país, vegetales autóctonos y cultivos
   OA3 cambios en el ciclo de vida de plantas con flor, polinización y dispersión · OA4 importancia de las plantas y medidas de cuidado.
   Los textos de "aprende" son explicaciones didácticas creadas para la app. */
(function () {
  const { mcq, tf, match, order, fill, sort, spot } = Q;
  const P = () => SVG.planta(false), PL = () => SVG.planta(true);
  MATERIAS.push({
    id: 'ciencias', nombre: 'Ciencias Naturales', corto: 'Ciencias', emoji: '🌱', color: '#C2E89A', fecha: '2026-11-23',
    temas: [
      { id: 'necesidades', oa: 'OA1', titulo: 'Lo que necesitan las plantas',
        aprende: [
          { t: 'Las plantas también tienen necesidades', txt: 'Para vivir y crecer, una planta necesita <b>agua</b>, <b>luz</b>, <b>aire</b> y <b>sales minerales</b> del suelo. También necesita una <b>temperatura adecuada</b>: ni mucho frío ni mucho calor.', img: '<div class="emo">💧 ☀️ 🌬️ 🟤 🌡️</div>' },
          { t: 'Un experimento para comprobarlo', txt: 'Si dejamos una planta sin agua, sus hojas se ponen lacias y se marchita. Si la dejamos en un lugar oscuro, crece débil y sus hojas se ponen amarillas. Así comprobamos que el agua y la luz son necesarias.', img: '<div class="emo">🌿 ➜ 🥀</div>' }
        ],
        items: [
          mcq('¿Cuál de estas NO es una necesidad de las plantas?', ['Agua', 'Luz', 'Música', 'Aire'], 2, 'Las plantas necesitan agua, luz, aire, sales minerales y una temperatura adecuada. La música no es una necesidad.'),
          tf('Una planta guardada en un lugar oscuro por muchos días crece fuerte y verde.', false, 'Sin luz, la planta crece débil y sus hojas se ponen amarillas, porque necesita luz para fabricar su alimento.'),
          fill('Las plantas toman del suelo el agua y las ___ que necesitan.', ['sales minerales', 'piedras', 'galletas'], 0, 'Del suelo, la planta obtiene agua y sales minerales (nutrientes).'),
          mcq('Sofía olvidó regar su planta durante dos semanas. ¿Qué le pasó probablemente?', ['Se marchitó', 'Le salieron más flores', 'Creció el doble', 'Se puso más verde'], 0, 'Sin agua, la planta se marchita: sus hojas se secan y quedan lacias.'),
          sort('Clasifica: ¿la planta lo necesita para vivir?', ['La necesita', 'No la necesita'], [['Agua', 0], ['Luz', 0], ['Aire', 0], ['Juguetes', 1], ['Sales minerales', 0], ['Televisión', 1]], 'Las plantas necesitan agua, luz, aire y sales minerales.'),
          tf('Las plantas necesitan una temperatura adecuada: si hace demasiado frío o demasiado calor pueden morir.', true, 'La temperatura adecuada también es una necesidad de las plantas.', { ev: true })
        ] },
      { id: 'raiz', oa: 'OA1', titulo: 'La raíz',
        aprende: [{ t: 'La raíz', txt: 'La <b>raíz</b> está bajo la tierra. Tiene dos funciones: <b>fija</b> la planta al suelo para que no se caiga y <b>absorbe</b> el agua y las sales minerales. Algunas raíces guardan alimento, como la zanahoria y la betarraga.', img: PL() }],
        items: [
          spot('Toca la RAÍZ de la planta.', P(), 'raiz', 'La raíz está bajo la tierra: fija la planta y absorbe agua y sales minerales.'),
          mcq('¿Qué hace la raíz?', ['Fabrica el alimento con la luz', 'Fija la planta al suelo y absorbe agua y sales minerales', 'Produce las semillas', 'Atrae a las abejas'], 1, 'La raíz fija la planta y absorbe agua y sales minerales del suelo.'),
          tf('La zanahoria que comemos es la raíz de la planta.', true, 'La zanahoria es una raíz que guarda alimento.'),
          mcq('Si una planta tuviera la raíz muy dañada, ¿qué le costaría hacer?', ['Absorber agua del suelo', 'Recibir luz', 'Tener hojas verdes por un año', 'Hacer fotos'], 0, 'Sin una raíz sana, la planta no puede absorber bien el agua y las sales minerales.', { ev: true }),
          fill('La raíz ___ la planta al suelo.', ['fija', 'pinta', 'enfría'], 0, 'La raíz sujeta o fija la planta al suelo.')
        ] },
      { id: 'tallo', oa: 'OA1', titulo: 'El tallo',
        aprende: [{ t: 'El tallo', txt: 'El <b>tallo</b> <b>sostiene</b> las hojas, las flores y los frutos. Además, <b>transporta</b> el agua y las sales minerales desde la raíz hasta las hojas, como si fuera un camino o una cañería. El tronco de un árbol es su tallo.', img: PL() }],
        items: [
          spot('Toca el TALLO de la planta.', P(), 'tallo', 'El tallo une la raíz con las hojas y sostiene la planta.'),
          mcq('¿Qué función cumple el tallo?', ['Absorbe agua del suelo', 'Sostiene la planta y transporta el agua y las sales minerales', 'Produce el polen', 'Fija la planta al suelo'], 1, 'El tallo sostiene la planta y transporta agua y sales minerales hacia las hojas.'),
          tf('El tronco de un árbol es su tallo.', true, 'El tronco es el tallo de los árboles: es grueso y duro.'),
          mcq('Ponemos un clavel blanco en un vaso con agua y colorante azul. Al día siguiente sus pétalos se ven azulados. ¿Qué parte llevó el agua hacia arriba?', ['El tallo', 'Los pétalos', 'El vaso', 'La semilla'], 0, 'El tallo transporta el agua desde abajo hasta las hojas y las flores. Por eso el colorante subió.', { ev: true }),
          fill('El tallo funciona como un ___ por donde sube el agua.', ['camino', 'techo', 'espejo'], 0, 'El agua sube por el tallo, como por un camino o una cañería.')
        ] },
      { id: 'hojas', oa: 'OA1', titulo: 'Las hojas',
        aprende: [{ t: 'Las hojas', txt: 'En las <b>hojas</b> la planta <b>fabrica su alimento</b> usando la <b>luz del sol</b>, el agua y el aire. Al hacerlo, las hojas <b>liberan oxígeno</b>, el gas que respiramos. Por las hojas también entra y sale el aire.', img: PL() }],
        items: [
          spot('Toca las HOJAS de la planta.', P(), 'hojas', 'Las hojas son verdes y fabrican el alimento de la planta con la luz.'),
          mcq('¿Dónde fabrica su alimento la planta?', ['En la raíz', 'En las hojas', 'En la tierra', 'En la maceta'], 1, 'La planta fabrica su alimento en las hojas, usando luz, agua y aire.'),
          tf('Al fabricar su alimento, las hojas liberan oxígeno al aire.', true, 'Las plantas liberan oxígeno, que los seres vivos respiramos.'),
          mcq('¿Qué necesitan las hojas para fabricar el alimento?', ['Luz del sol, agua y aire', 'Solo tierra', 'Oscuridad', 'Música'], 0, 'Las hojas usan la luz del sol, el agua y el aire para fabricar el alimento.', { ev: true }),
          fill('Las hojas captan la ___ del sol.', ['luz', 'lluvia', 'sombra'], 0, 'Las hojas captan la luz del sol para fabricar alimento.')
        ] },
      { id: 'relacion', oa: 'OA1', titulo: 'Estructuras y necesidades',
        aprende: [{ t: 'Cada parte ayuda a cubrir una necesidad', txt: 'La <b>raíz</b> cubre la necesidad de <b>agua y sales minerales</b>. El <b>tallo</b> lleva esa agua hacia arriba. Las <b>hojas</b> aprovechan la <b>luz</b> y el <b>aire</b> para fabricar el alimento. Todas trabajan en equipo.', img: '<div class="emo">🟤 raíz → 💧 &nbsp; | &nbsp; 🌿 tallo → ⬆️ &nbsp; | &nbsp; 🍃 hojas → ☀️🌬️</div>' }],
        items: [
          match('Une cada parte con la necesidad que ayuda a cubrir.', [['Raíz', 'Absorbe agua y sales minerales'], ['Tallo', 'Lleva el agua hacia las hojas'], ['Hojas', 'Usan la luz para fabricar alimento']], 'Raíz: agua y sales. Tallo: transporte. Hojas: luz y alimento.'),
          mcq('¿Qué parte de la planta se relaciona con la necesidad de LUZ?', ['Las hojas', 'La raíz', 'Las semillas', 'La tierra'], 0, 'Las hojas captan la luz del sol.'),
          mcq('Una planta de interior se inclina hacia la ventana. ¿Por qué?', ['Busca la luz', 'Busca el ruido', 'Quiere salir a pasear', 'Tiene frío'], 0, 'Las plantas crecen hacia la luz porque la necesitan para fabricar su alimento.'),
          match('Une cada parte con su función.', [['Raíz', 'Fijar la planta al suelo'], ['Tallo', 'Sostener las hojas y las flores'], ['Hojas', 'Liberar oxígeno']], 'Raíz fija, tallo sostiene, hojas liberan oxígeno al fabricar alimento.', { ev: true })
        ] },
      { id: 'nativas', oa: 'OA2', titulo: 'Plantas de Chile: nativas y autóctonas',
        aprende: [
          { t: 'Plantas nativas o autóctonas', txt: 'Una planta <b>nativa</b> o <b>autóctona</b> (las dos palabras significan lo mismo) es la que crece <b>de forma natural</b> en un lugar, sin que nadie la haya traído. Si solo existe en Chile, se llama <b>endémica</b>. Una planta <b>introducida</b> fue traída desde otro país, como el trigo o el eucalipto.', img: '<figure class="dibujo">' + SVG.copihue() + '<figcaption>Copihue, flor nacional de Chile</figcaption></figure><div class="emo">🌲 araucaria · 🌳 quillay · 🌵 quisco</div>' },
          { t: 'Algunas plantas nativas de Chile', txt: '<b>Copihue</b>: flor nacional de Chile, una enredadera de los bosques del centro y sur del país. <b>Araucaria</b> o pehuén: árbol del sur cuyas semillas son los piñones. <b>Quillay</b>: árbol de la zona central; su corteza se usaba como jabón. <b>Boldo</b>: árbol cuyas hojas se usan en infusión. <b>Canelo</b>: árbol sagrado del pueblo mapuche. <b>Quisco</b>: cactus del norte y centro. <b>Tamarugo</b>: árbol de la pampa del norte.' }
        ],
        items: [
          mcq('¿Cuál es la flor nacional de Chile?', ['El copihue', 'La rosa', 'El girasol', 'El tulipán'], 0, 'El copihue es la flor nacional de Chile. Es una planta nativa.'),
          sort('Clasifica cada planta.', ['Nativa de Chile', 'Introducida'], [['Copihue', 0], ['Araucaria', 0], ['Quillay', 0], ['Trigo', 1], ['Eucalipto', 1], ['Boldo', 0]], 'Copihue, araucaria, quillay y boldo son nativas. El trigo y el eucalipto fueron traídos desde otros lugares.'),
          tf('"Nativa" y "autóctona" significan lo mismo: una planta que crece naturalmente en un lugar sin que la hayan traído.', true, 'Las dos palabras se usan para las plantas originarias de un lugar.'),
          mcq('¿Cómo se llaman las semillas de la araucaria?', ['Piñones', 'Porotos', 'Nueces', 'Almendras'], 0, 'Las semillas de la araucaria son los piñones, alimento tradicional del pueblo pehuenche.'),
          match('Une cada planta nativa con lo que la caracteriza.', [['Canelo', 'Árbol sagrado mapuche'], ['Quisco', 'Cactus del norte y centro'], ['Tamarugo', 'Árbol de la pampa del norte']], 'Cada planta nativa tiene algo especial.', { ev: true }),
          mcq('Una planta que fue traída desde otro país es…', ['introducida', 'nativa', 'autóctona', 'endémica'], 0, 'Las plantas traídas desde otros lugares se llaman introducidas.', { ev: true })
        ] },
      { id: 'cultivos', oa: 'OA2', titulo: 'Cultivos según las zonas de Chile',
        aprende: [{ t: 'Cultivos: plantas que sembramos', txt: 'Un <b>cultivo</b> es una planta que las personas <b>siembran y cuidan</b> para obtener alimentos u otros productos. Puede ser nativa (como la papa de Chiloé) o introducida (como el trigo). Chile tiene distintos climas, por eso se cultivan cosas diferentes:<br>🏜️ <b>Norte</b>: aceitunas del valle de Azapa, limón de Pica, uva pisquera y papayas en la región de Coquimbo.<br>🍇 <b>Centro</b>: uva, paltas, duraznos, cerezas, tomates y maíz.<br>🌧️ <b>Sur</b>: trigo, papas, avena, raps y remolacha.' }],
        items: [
          mcq('¿Qué es un cultivo?', ['Una planta que las personas siembran y cuidan para obtener productos', 'Una planta que nadie conoce', 'Una planta que solo vive en el mar', 'Una flor de plástico'], 0, 'Un cultivo es sembrado y cuidado por las personas.'),
          sort('¿En qué zona de Chile se cultiva principalmente?', ['Norte', 'Centro', 'Sur'], [['Aceitunas de Azapa', 0], ['Limón de Pica', 0], ['Paltas', 1], ['Cerezas', 1], ['Trigo', 2], ['Papas de Chiloé', 2]], 'Norte: aceitunas y limón de Pica. Centro: paltas y cerezas. Sur: trigo y papas.'),
          tf('La papa es un cultivo que también es nativo del sur de Chile, como la papa de Chiloé.', true, 'En Chiloé se cultivan muchas variedades de papas nativas.'),
          mcq('¿En qué zona se cultiva la uva pisquera, en valles como el de Elqui?', ['Norte', 'Sur', 'Antártica', 'Isla de Pascua'], 0, 'La uva pisquera se cultiva en el norte chico, en la región de Coquimbo.', { ev: true }),
          mcq('¿Por qué en el sur se cultivan cosas distintas que en el norte?', ['Porque el clima es distinto', 'Porque las semillas son de otro color', 'Porque en el sur no hay suelo', 'Porque en el norte llueve todos los días'], 0, 'Cada zona tiene un clima distinto: el norte es seco y el sur es lluvioso y más frío.')
        ] },
      { id: 'ciclo', oa: 'OA3', titulo: 'Ciclo de vida de las plantas',
        aprende: [{ t: 'El ciclo de vida de una planta con flor', txt: '1. Todo empieza con una <b>semilla</b>. 2. Con agua y temperatura adecuada, la semilla <b>germina</b>: sale una pequeña raíz y un brote. 3. La planta <b>crece</b>. 4. La planta adulta forma <b>flores</b>. 5. Después de la polinización, la flor se transforma en <b>fruto</b>, que guarda nuevas <b>semillas</b>. Y el ciclo vuelve a empezar.', img: SVG.ciclo() }],
        items: [
          order('Ordena el ciclo de vida de la planta.', ['Semilla', 'Germinación', 'Crecimiento', 'Formación de la flor', 'Formación del fruto con semillas'], 'Semilla → germina → crece → florece → forma fruto con semillas.'),
          mcq('¿Cómo se llama el momento en que la semilla se abre y sale un brote?', ['Germinación', 'Polinización', 'Cosecha', 'Dispersión'], 0, 'Cuando la semilla se abre y aparece el brote, decimos que germina.'),
          tf('Los frutos guardan las semillas de la planta.', true, 'Dentro del fruto están las semillas que darán nuevas plantas.'),
          mcq('¿Qué parte de la planta se transforma en fruto?', ['La flor', 'La raíz', 'El tallo', 'La hoja'], 0, 'Después de la polinización, la flor se transforma en fruto.', { ev: true }),
          order('Ordena desde lo primero a lo último.', ['🌰 Semilla', '🌱 Brote', '🌿 Planta joven', '🌸 Planta con flor'], 'La semilla germina, crece y llega a florecer.', { ev: true })
        ] },
      { id: 'polinizacion', oa: 'OA3', titulo: 'La polinización',
        aprende: [{ t: 'La polinización', txt: 'Las flores tienen <b>estambres</b>, que producen un polvito llamado <b>polen</b>, y un <b>pistilo</b> en el centro. La <b>polinización</b> es el paso del polen hasta el pistilo. Lo llevan los <b>insectos</b> como las abejas, las <b>aves</b> como el picaflor, o el <b>viento</b>. Sin polinización no se forman frutos ni semillas.', img: SVG.polinizacion() + SVG.flor() }],
        items: [
          mcq('¿Qué es la polinización?', ['El paso del polen hasta el pistilo de una flor', 'Regar la planta', 'Cortar las flores', 'Cuando la semilla cae al suelo'], 0, 'Polinizar es llevar el polen hasta el pistilo.'),
          spot('Toca los ESTAMBRES, donde se produce el polen.', SVG.flor(), 'estambres', 'Los estambres producen el polen.'),
          match('Une cada polinizador con su tipo.', [['Abeja', 'Insecto'], ['Picaflor', 'Ave'], ['Viento', 'Fenómeno de la naturaleza']], 'Las abejas son insectos, el picaflor es un ave y el viento también transporta polen.'),
          tf('Si no hubiera abejas, muchas plantas no podrían formar frutos.', true, 'Las abejas polinizan muchas flores. Sin polinización no se forman frutos.'),
          spot('Toca el PISTILO, donde debe llegar el polen.', SVG.flor(), 'pistilo', 'El pistilo está en el centro de la flor. Allí llega el polen.', { ev: true }),
          mcq('¿Qué se forma después de la polinización?', ['El fruto con semillas', 'Más raíces', 'Un tallo nuevo', 'Tierra'], 0, 'Después de la polinización, la flor forma el fruto con semillas.')
        ] },
      { id: 'dispersion', oa: 'OA3', titulo: 'Dispersión de las semillas',
        aprende: [{ t: 'Las semillas viajan', txt: 'La <b>dispersión</b> es cuando las semillas se alejan de la planta para crecer en otro lugar. Viajan con el <b>viento</b> (como el diente de león, que tiene pelitos que vuelan), con los <b>animales</b> (que comen frutos o llevan semillas pegadas en su pelaje), con el <b>agua</b> (como el coco, que flota) o por la <b>misma planta</b> (vainas que se abren de golpe).', img: '<figure class="dibujo">' + SVG.dienteLeon() + '<figcaption>Diente de león: el viento se lleva sus semillas</figcaption></figure><div class="emo">🐦 animales · 🌊 coco · 💥 vainas</div>' }],
        items: [
          mcq('¿Para qué sirve la dispersión de las semillas?', ['Para que las semillas lleguen a otros lugares donde puedan crecer', 'Para que la planta se seque', 'Para pintar las flores', 'Para que la raíz crezca'], 0, 'Al alejarse, las semillas encuentran espacio, luz y agua para crecer.'),
          match('Une cada semilla con la forma en que viaja.', [['Diente de león', 'Viento'], ['Coco', 'Agua'], ['Semilla pegada al pelaje de un perro', 'Animales']], 'El diente de león vuela, el coco flota y otras semillas se pegan a los animales.'),
          tf('Un pájaro que come un fruto y deja las semillas en otro lugar ayuda a dispersarlas.', true, 'Los animales que comen frutos dispersan las semillas.'),
          mcq('Las semillas del diente de león tienen pelitos muy livianos. ¿Cómo se dispersan?', ['Por el viento', 'Por el agua', 'Se quedan pegadas a la planta', 'Por la lluvia de piedras'], 0, 'Los pelitos les permiten volar con el viento.', { ev: true }),
          sort('¿Cómo viaja cada semilla?', ['Viento', 'Animales'], [['Diente de león', 0], ['Semilla con alas de un árbol', 0], ['Fruto que come un zorzal', 1], ['Cadillo pegado al pelaje', 1]], 'Las semillas livianas o con alas viajan con el viento. Otras viajan en animales.')
        ] },
      { id: 'alimentacion', oa: 'OA4', titulo: 'Plantas: alimento y oxígeno',
        aprende: [{ t: 'Las plantas nos alimentan y nos dan oxígeno', txt: 'Comemos muchas partes de las plantas: <b>raíces</b> (zanahoria), <b>tallos</b> (apio), <b>hojas</b> (lechuga), <b>flores</b> (coliflor), <b>frutos</b> (manzana, tomate) y <b>semillas</b> (porotos, arroz). Los animales herbívoros también se alimentan de plantas. Además, al fabricar su alimento, las plantas <b>liberan oxígeno</b>, el gas que necesitamos para respirar.', img: '<div class="emo">🥕 🥬 🥦 🍎 🫘 🌬️</div>' }],
        items: [
          match('Une cada alimento con la parte de la planta que es.', [['Zanahoria', 'Raíz'], ['Lechuga', 'Hoja'], ['Manzana', 'Fruto'], ['Porotos', 'Semilla']], 'Zanahoria: raíz. Lechuga: hoja. Manzana: fruto. Porotos: semillas.'),
          mcq('¿Qué gas liberan las plantas y necesitamos para respirar?', ['Oxígeno', 'Humo', 'Vapor de la tetera', 'Gas de la cocina'], 0, 'Las plantas liberan oxígeno al fabricar su alimento.'),
          tf('Si no existieran las plantas, los animales herbívoros no tendrían alimento.', true, 'Los herbívoros se alimentan de plantas.'),
          mcq('La coliflor que comemos es…', ['una flor', 'una raíz', 'una semilla', 'un tallo subterráneo'], 0, 'La parte que comemos de la coliflor son sus flores.', { ev: true })
        ] },
      { id: 'productos', oa: 'OA4', titulo: 'Productos, adorno y uso medicinal',
        aprende: [{ t: 'Muchas cosas vienen de las plantas', txt: '<b>Productos derivados</b>: la <b>madera</b> de los árboles (muebles, lápices), el <b>papel</b>, la ropa de <b>algodón</b>, el aceite de oliva.<br><b>Ornamentación</b>: usamos plantas para adornar jardines, plazas y casas.<br><b>Uso medicinal</b>: algunas plantas se usan como remedio tradicional, como el <b>boldo</b> o la <b>manzanilla</b> en infusión. Las plantas medicinales siempre se usan con un adulto.', img: '<div class="emo">🪵 📄 👕 🫒 🌷 🍵</div>' }],
        items: [
          sort('¿Para qué se usa?', ['Producto derivado', 'Adorno', 'Uso medicinal'], [['Papel', 0], ['Mesa de madera', 0], ['Rosas en una plaza', 1], ['Planta en el living', 1], ['Infusión de manzanilla', 2], ['Infusión de boldo', 2]], 'Papel y madera son productos; las rosas y plantas de interior adornan; la manzanilla y el boldo son de uso medicinal tradicional.'),
          mcq('¿De qué planta se obtiene la tela de algodón?', ['De la planta de algodón', 'Del cactus', 'De la papa', 'Del copihue'], 0, 'El algodón es una planta: con sus fibras se hacen telas.'),
          tf('El papel de nuestros cuadernos se fabrica con madera de árboles.', true, 'El papel se fabrica principalmente con madera.'),
          mcq('Ornamentación significa usar las plantas para…', ['adornar', 'cocinar', 'construir casas', 'hacer remedios'], 0, 'Ornamentar es adornar: jardines, plazas y casas.', { ev: true }),
          tf('Las plantas medicinales las puede usar un niño solo, sin preguntar a un adulto.', false, 'Las plantas medicinales siempre se usan con la ayuda de un adulto.')
        ] },
      { id: 'ambiente', oa: 'OA4', titulo: 'Importancia para el medio ambiente',
        aprende: [{ t: 'Las plantas cuidan el planeta', txt: 'Las plantas son el <b>hogar y refugio</b> de muchos animales, como pájaros e insectos. Sus raíces <b>sujetan el suelo</b> y evitan que la lluvia se lo lleve. Los árboles dan <b>sombra</b> y frescura, y todas liberan <b>oxígeno</b>.', img: '<div class="emo">🐦🌳🐞 · 🟤 suelo firme · ⛱️ sombra</div>' }],
        items: [
          mcq('¿Cómo ayudan las raíces de los árboles al medio ambiente?', ['Sujetan el suelo para que la lluvia no se lo lleve', 'Ensucian el agua', 'Calientan el aire', 'Asustan a los animales'], 0, 'Las raíces sujetan el suelo y evitan que se erosione.'),
          tf('Muchos animales viven y se refugian en los árboles.', true, 'Los árboles son hogar de pájaros, insectos y otros animales.'),
          mcq('¿Qué pasaría en un cerro si se cortan todos sus árboles?', ['La lluvia arrastraría más fácilmente el suelo', 'Habría más animales', 'Habría más sombra', 'Nada cambiaría'], 0, 'Sin raíces que sujeten el suelo, la lluvia se lo lleva.', { ev: true }),
          match('Une cada beneficio con su ejemplo.', [['Refugio', 'Un nido en un árbol'], ['Sombra', 'Descansar bajo un árbol en verano'], ['Aire', 'Las plantas liberan oxígeno']], 'Las plantas dan refugio, sombra y oxígeno.')
        ] },
      { id: 'cuidado', oa: 'OA4', titulo: 'Cómo cuidar las plantas',
        aprende: [{ t: 'Medidas para cuidar las plantas', txt: '✅ Regar las plantas sin exceso. ✅ No arrancar flores ni plantas silvestres. ✅ No botar basura en plazas, cerros ni bosques. ✅ No hacer fogatas en lugares no permitidos: pueden causar incendios. ✅ Plantar árboles y cuidar las áreas verdes. ✅ No dañar los troncos.', img: '<div class="emo">🚿🌱 · 🚯 · 🚫🔥 · 🌳➕</div>' }],
        items: [
          sort('¿Cuida o daña a las plantas?', ['Las cuida', 'Las daña'], [['Regar sin exceso', 0], ['Plantar un árbol', 0], ['Botar basura en el cerro', 1], ['Arrancar copihues del bosque', 1], ['Hacer una fogata en el bosque', 1], ['No pisar los jardines', 0]], 'Cuidamos las plantas cuando las regamos, plantamos árboles y no las dañamos.'),
          mcq('¿Cuál es una medida concreta para cuidar las plantas de tu plaza?', ['No botar basura y no pisar los jardines', 'Escribir en los troncos', 'Arrancar las flores', 'Regarlas con bebida'], 0, 'No botar basura y no pisar los jardines son medidas de cuidado.'),
          tf('Regar una planta con muchísima agua todos los días siempre es bueno.', false, 'El exceso de agua también daña a las plantas: se deben regar sin exceso.'),
          mcq('¿Por qué no se deben hacer fogatas en el bosque?', ['Pueden causar incendios', 'Porque hace frío', 'Porque las plantas se ríen', 'Porque no hay leña'], 0, 'Una fogata puede provocar un incendio que destruye bosques y animales.', { ev: true })
        ] }
    ],
    explora: [
      { id: 'exp-planta', titulo: 'Explora la planta', tipo: 'partes', svg: () => SVG.planta(true), info: { raiz: 'Raíz: fija la planta al suelo y absorbe agua y sales minerales.', tallo: 'Tallo: sostiene la planta y transporta el agua y las sales minerales.', hojas: 'Hojas: fabrican el alimento con la luz del sol y liberan oxígeno.', flor: 'Flor: allí ocurre la polinización y se forman el fruto y las semillas.' } },
      { id: 'exp-flor', titulo: 'Explora la flor', tipo: 'partes', svg: () => SVG.flor(), info: { petalos: 'Pétalos: sus colores atraen a insectos y aves.', estambres: 'Estambres: producen el polen.', pistilo: 'Pistilo: recibe el polen. Después se forma el fruto con semillas.' } },
      { id: 'exp-ciclo', titulo: 'Paso a paso: ciclo de vida', tipo: 'pasos', pasos: [['🌰', 'Semilla: guarda una plantita y alimento.'], ['🌱', 'Germinación: con agua, la semilla se abre y sale un brote.'], ['🌿', 'Crecimiento: aparecen tallo y hojas.'], ['🌸', 'Floración: la planta adulta forma flores.'], ['🐝', 'Polinización: el polen llega al pistilo.'], ['🍎', 'Fruto: la flor se transforma en fruto con semillas.'], ['🌬️', 'Dispersión: las semillas viajan y el ciclo vuelve a empezar.']] }
    ],
    juego: {
      tipo: 'memorice', titulo: 'Memorice de las plantas',
      como: 'Todas las cartas están tapadas. Toca dos cartas para darlas vuelta. Si van juntas, por ejemplo una parte de la planta y lo que hace, ¡encontraste una pareja! y se quedan a la vista. Si no van juntas, se vuelven a tapar: fíjate bien dónde estaba cada una para recordarla.',
      ejemplo: { html: '<div class="ej-cartas"><span class="carta vista par">' + SVG.abeja() + '<b>Abeja</b></span><span class="mas">+</span><span class="carta vista par"><span class="cimg">🌼</span><b>Poliniza las flores</b></span></div><p class="txt">¡Pareja! La abeja va con «Poliniza las flores», porque lleva el polen de una flor a otra.</p>',
        voz: 'Por ejemplo: la carta de la abeja va con la carta que dice poliniza las flores, porque la abeja lleva el polen de una flor a otra. ¡Esa es una pareja!' },
      pares: [
        [{ t: 'Raíz', img: SVG.miniPlanta('raiz') }, { t: 'Absorbe el agua del suelo', img: '💧' }],
        [{ t: 'Hojas', img: SVG.miniPlanta('hojas') }, { t: 'Fabrican el alimento con la luz', img: '☀️' }],
        [{ t: 'Tallo', img: SVG.miniPlanta('tallo') }, { t: 'Lleva el agua hacia arriba', img: '⬆️' }],
        [{ t: 'Copihue', img: SVG.copihue() }, { t: 'Flor nacional de Chile', img: '⭐' }],
        [{ t: 'Abeja', img: SVG.abeja() }, { t: 'Poliniza las flores', img: '🌼' }],
        [{ t: 'Diente de león', img: SVG.dienteLeon() }, { t: 'Su semilla viaja con el viento', img: '🌬️' }]
      ]
    }
  });
})();
