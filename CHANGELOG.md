# El Sobrinito — Registro de cambios

Cada cambio deja una copia con fecha en `versiones/` y su detalle en Notion (Registro de versiones de apps).

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
