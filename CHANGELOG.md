# El Sobrinito — Registro de cambios

Cada cambio deja una copia con fecha en `versiones/` y su detalle en Notion (Registro de versiones de apps).

## 2026-11-11 (23:30) · Repaso 3.º básico v1.2 — secciones arriba (pedido de Jotha) · PUBLICADA
- Al entrar a una asignatura, **todas las secciones aparecen arriba, una al lado de la otra**, como botones compactos (Aprende, Escucha, Explora, Practica, Juega, Tablas en Matemática, Comprueba y Repasa errores). Si hay errores pendientes, «Repasa errores» muestra un globo rojo con la cantidad. Debajo sigue la ruta de aprendizaje.
- Pruebas: 160 de 160.
- Respaldos: antes = `versiones/2026-11-11_v1.1_Repaso-3basico_perfil-unico.zip`; después = `versiones/2026-11-11_v1.2_Repaso-3basico_secciones-arriba.zip`.

## 2026-11-11 (noche) · Repaso 3.º básico v1.1 — perfil único, ruta de aprendizaje, juegos explicados y tablas (pedidos de Jotha) · PUBLICADA
- **Perfil único:** cada app es para un niño o niña (como El Sobrinito). Se quitó la pantalla de los 5 animales: la app abre directo en las asignaturas. El botón ⚙️ de arriba abre el panel para el adulto. Si había avance de la v1.0, se conserva el perfil que estaba en uso.
- **🗺️ Ruta de aprendizaje** al entrar a cada asignatura: 6 pasos en orden (Aprende o escucha cada tema, Explora, Practica, Juega, Comprueba lo aprendido, Repasa tus errores), con ✅ en lo hecho, «👉 Te toca» en el paso siguiente y el próximo tema sugerido (por ejemplo, Ciencias: «sigue con Lo que necesitan las plantas»). Se puede escuchar. Los temas aparecen numerados en el orden de la ruta.
- **Juegos con explicación y ejemplo**, leídos en voz alta al abrirlos: memorice (ejemplo: Abeja + Poliniza las flores), ¿Griego o romano? (ejemplo: Acueducto → Roma), Lluvia de palabras (ejemplo: tam_or → tambor, después de M va B) y Carrera de tablas (ejemplo: 3 × 4 = 12).
- **Memorice de las plantas con dibujos** en las 12 cartas: copihue, abeja, diente de león y una planta con la raíz, el tallo o las hojas destacadas. Dibujos nuevos también en Aprende (copihue, abeja polinizando, diente de león) y en el artículo del copihue de Lenguaje.
- **Lluvia de palabras de verdad:** la palabra cae y hay 10 segundos para elegir B o V. Si llega al suelo aparece «¡Se cayó!» con la palabra bien escrita.
- **Matemática:** la carrera de tablas permite elegir la tabla (del 1 al 10 o todas) y hay una sección nueva **✖️ Tablas de multiplicar** con las 10 tablas completas, un truco por tabla, lectura en voz alta, modo «esconder resultados» para autoevaluarse y botón para correr con esa tabla.
- Los controles de voz (Pausa, Repetir, Parar) ahora van dentro del encabezado y ya no tapan botones. La voz lee «+», «−» e «=» como «más», «menos» y «es igual a».
- Protocolo actualizado a perfil único (cada estudiante en su propio equipo o navegador). Voz: se mantiene la del equipo. Queda para más adelante una voz distinta por app o asignatura, o que la familia la elija.
- Pruebas: 156 de 156 comprobaciones automáticas aprobadas (`tercero/pruebas/resultado_2026-11-11.txt`).
- Respaldos: antes = `versiones/2026-11-11_v1.0_Repaso-3basico.zip`; después = `versiones/2026-11-11_v1.1_Repaso-3basico_perfil-unico.zip`. Para volver atrás: descomprimir la v1.0 sobre `tercero/`.

## 2026-11-11 · Nueva app: Repaso 3.º básico (`tercero/`) — v1.0, rama `tercero-basico` (sin publicar)
- **Qué es:** repaso para las pruebas de 3.º básico del Colegio Monte Verde: Ciencias Naturales (lun 23 nov), Historia (mar 24), Lenguaje (jue 26) y Matemática (vie 27). 51 temas, 281 ejercicios fijos + 7 generadores de ejercicios al azar en Matemática.
- **Siete secciones por asignatura:** Aprende (explicación con dibujo), Escucha (lectura en voz alta con Pausa / Seguir / Repetir / Parar), Explora (dibujos que se tocan, reloj, fracciones, arreglos y perímetro manipulables), Practica (con explicación después de cada respuesta), Juega (memorice, «¿Griego o romano?», «¿B o V?», carrera de tablas), Comprueba lo aprendido (todas las unidades, 16–30 preguntas, 4–7 formatos, puntaje, %, contenidos dominados y para reforzar; se aclara que no es nota del colegio) y Repasa tus errores.
- **10 tipos de actividad:** alternativas, verdadero/falso, completar, unir, ordenar, clasificar, tocar en el dibujo, teclado numérico, mover las manecillas del reloj y pintar fracciones.
- **Perfiles sin datos personales:** 5 animales (Estudiante 1 a 5). El avance se guarda solo en el equipo. Panel para el adulto con avance por asignatura, detalle por tema, lectura automática y reinicio con confirmación en pantalla.
- **Sin internet:** service worker propio (`tercero/sw.js`) y tipografías dentro de la app (`tercero/fonts/`, Baloo 2 OFL y Chewy Apache 2.0): ya no depende de Google Fonts. Dibujos hechos en SVG/CSS, sin imágenes externas. Ícono propio (`tercero/icons/`).
- **Protocolo de prueba piloto** (`tercero/protocolo.html`): sesiones sugeridas, reglas para el observador, criterios de aprobación, hoja de observación y registro de fallas para imprimir, lista de contenidos generada desde la app y fuentes.
- **Pruebas** (`tercero/pruebas/`): 131 comprobaciones automáticas en Chromium a 390 px: los 50 contenidos del temario con Aprende + Práctica + Evaluación, datos sin errores (300 ejercicios generados por tema), todas las prácticas y evaluaciones respondidas por la interfaz (bien y mal), repaso de errores, juegos, panel adulto, voz, sin desborde horizontal, sin errores de consola y apertura sin internet. Solucionario para el adulto en `solucionario_2026-11-11.md`.
- Respaldo: `versiones/2026-11-11_v1.0_Repaso-3basico.zip` (app completa).

## 2026-11-10 · Correcciones aprobadas por Jotha (Chispa Aprende v4.2, Dictado v2.2, Sumas v1.2)
- **Chispa Aprende — pista del modo «mira el dibujo»:** decía que *piña* empieza con la ñ y que *taxi* empieza con la x. Ahora la voz dice «Empieza con la letra…» solo cuando es verdad; si no, dice «Tiene la letra eñe» / «Tiene la letra equis». Comprobado con las 56 palabras: solo piña y taxi cambian.
- **Chispa Aprende — sílabas que suenan igual:** en «encuentra la sílaba», el Desafío de Rex y «arma la palabra» ya no aparecen juntas sílabas que se escuchan igual (ba/va, ce/se/ze/xe, ya/lla, ca/ka, que/ke, ge/je, ha/a, yi/hi). Probado en 1.500 rondas: 0 pares repetidos.
- **Dictado de Chispa:** el nivel que viene marcado ahora es **1–10** (antes 1–20). El Desafío Final ya no repite números hasta haber pasado por todos los del nivel y nunca pone el mismo número dos veces seguidas (probado 1.000 veces).
- **Sumas con Rex:** en ⚙️ «Para quien acompaña» se agrega el aviso: herramienta de aprendizaje, no reemplaza la educación formal, jugar acompañado de un adulto.
- Respaldos: antes = `versiones/2026-11-09_v4.1_Chispa-Aprende_app.html`, `versiones/2026-11-09_v2.1_Dictado-de-Chispa_voz-ingles-y-app.html`, `versiones/2026-11-09_v1.1_Sumas-con-Rex_app.html`. Después = `versiones/2026-11-10_v4.2_Chispa-Aprende_pistas-y-silabas.html`, `versiones/2026-11-10_v2.2_Dictado-de-Chispa_nivel-y-desafio.html`, `versiones/2026-11-10_v1.2_Sumas-con-Rex_aviso.html`.
- Para volver atrás: copiar el archivo «antes» sobre el archivo publicado.

## 2026-11-09 (tarde) · Voz en inglés grabada + los 3 juegos como app
- **Voz en inglés de Chispa grabada:** 77 audios en `audio/en/` (números del 0 al 50 y todas las frases en inglés del Dictado: "Find the number…", "Draw the number…", "Great job!", etc.). Voz "af_heart" del modelo abierto Kokoro-82M (licencia Apache 2.0, uso comercial permitido). Ahora el inglés suena igual en cualquier celular o computador, aunque el equipo no tenga voz en inglés. Si un audio no carga, se usa la voz del equipo.
- **Acceso directo / app:** cada juego tiene su propio ícono y se puede dejar en la pantalla de inicio con el botón **📲** (arriba, al lado de ⚙️): Dictado de Chispa (123, amarillo), Chispa Aprende (Aa, menta) y Sumas con Rex (1+2, rosado). Archivos nuevos: `manifest-dictado.webmanifest`, `manifest-silabas.webmanifest`, `manifest-sumas.webmanifest`, `icons/`, `app.js` (botón e instrucciones para Android, iPhone y computador) y `sw.js` (los 3 juegos, íconos y audios quedan guardados para jugar sin internet).
- Barra de arriba más compacta en celulares chicos.
- Respaldos: `versiones/2026-11-09_v2.1_Dictado-de-Chispa_voz-ingles-y-app.html`, `versiones/2026-11-09_v4.1_Chispa-Aprende_app.html` y `versiones/2026-11-09_v1.1_Sumas-con-Rex_app.html`. Sumas antes del cambio = `versiones/2026-11-07_v1_Sumas-con-Rex.html`.

## 2026-11-09 · El Dictado de Chispa v2 (`index.html`)
- **Inglés de verdad:** Chispa busca la mejor voz de cada idioma (prefiere las naturales). Antes, si el equipo no tenía voz en inglés, leía la frase en inglés con voz española y decía el número en español ("siete"). Ahora los números se dicen en palabras (*seven*, *siete*) y, si falta la voz en inglés, aparece un aviso para el adulto con la frase que debe leer en voz alta.
- **Más claro para los niños:** primero la frase ("Busca el número…") y después el número, más lento. Voz en inglés menos lenta (ya no se arrastra). Botón **❓** con instrucciones habladas por Chispa en cada modo.
- **Para papás y acompañantes:** bienvenida la primera vez (con botón 🔊 para escucharla), sección "📖 Cómo se juega" en ⚙️, estado de las voces del equipo y cómo instalar una voz en Windows, Android o iPhone. Aviso: herramienta de aprendizaje, no reemplaza la educación formal; se recomienda jugar con un adulto.
- **Ajuste nuevo:** "🌿 Juego calmado sin interrupciones" (reemplaza "Sorpresas y desafíos"; se quita "Ideal para niños TEA").
- Respaldos: antes `versiones/2026-06-08_v1.3_Dictado-de-Chispa_PUBLICADA-antes-del-9nov.html`, después `versiones/2026-11-09_v2_Dictado-de-Chispa.html`.

## 2026-11-09 · Chispa Aprende v4 (`silabas.html`)
- Abecedario: **N de naranja** 🍊 (antes nube), **CH de chancho** 🐷 y **LL de llave** 🔑 (nuevas), **W de waffle** 🧇 (antes wifi), **X de xilófono** (dibujo propio; antes taxi).
- CH y LL se pueden elegir en ⚙️ y aparecen en sílabas (cha… llu), en el Desafío de Rex (chancho, leche, llave, pollo) y en el desafío imagen → palabra (chancho, chocolate, llave, lluvia). Rex: "nube" → "nudo" 🪢 y "wifi" → "waffle".
- La voz dice el nombre de la letra: "che", "elle", "doble ve", "equis". Mejor voz en español.
- Ajuste nuevo: "🌿 Juego calmado sin interrupciones" (se quita "Ideal para niños TEA"). Ajustes "para papás y acompañantes" con el aviso de herramienta de aprendizaje.
- Respaldos: antes `versiones/2026-07-16_v3_Chispa-Aprende_PUBLICADA-antes-del-9nov.html`, después `versiones/2026-11-09_v4_Chispa-Aprende.html`.

## 2026-11-07 · Sumas con Rex v1 (`sumas.html`) — NUEVO
- Juego nuevo de sumas para kínder y primero básico, parte de **El Sobrinito Aprende**.
- 3 modos: 🍎 **Contar** (dibujos que se tocan y cuentan en voz alta), 🔢 **Números** (suma escrita con pista de puntos) y 🦖 **Desafío de Rex** (10 sumas seguidas, medalla 🥇🥈🥉 y mejor puntaje guardado).
- 3 niveles: hasta 5, hasta 10 y hasta 20 (los grupos se ordenan de a 5 para contar más fácil).
- Personajes: Chispa 🤖 pregunta, da la pista (cuenta en voz alta) y celebra; Blanca 🐶 corrige con cariño; Rex 🦖 dirige el desafío.
- Panel para acompañantes ⚙️: sumas resueltas, % a la primera, mejor desafío, las sumas que más cuestan, voz on/off, voz lenta, modo calmado (sin animaciones) e incluir el cero.
- El avance se guarda en el mismo dispositivo. Fondo plano, sin degradados.
- Respaldo: `versiones/2026-11-07_v1_Sumas-con-Rex.html`.
- `index.html` (Dictado de Chispa) y `silabas.html` (Chispa Aprende v3) **no se tocaron**.

## 2026-07-16 · Chispa Aprende v3 (`silabas.html`)
- Presentación del abecedario, consonantes seleccionables y desafío imagen → palabra (63 ejercicios). Commit `ab63920`.

## 2026-06-08 · El Dictado de Chispa (`index.html`)
- Versión publicada del dictado de números (idéntica a `2026-06-08_v1.3` del computador).
