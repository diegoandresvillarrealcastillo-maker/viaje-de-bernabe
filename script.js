/* ═══════════════════════════════════════════════════════════════
   EL VIAJE DE BERNABÉ — script.js
   Juego educativo cristiano | HTML5 Canvas + Vanilla JS
   ═══════════════════════════════════════════════════════════════ */

'use strict';

/* ══════════════════════════════════════════
   1. BASE DE DATOS BÍBLICA
══════════════════════════════════════════ */

/** @type {QuestionRecord[]} */
const BIBLE_QUESTIONS = [
  // A. BERNABÉ
  { id:  1, q: '¿Cuál era el nombre original de Bernabé antes de que los apóstoles le dieran ese sobrenombre?', opts: ['Simón', 'José', 'Andrés', 'Tomás'], a: 1, ref: 'Hechos 4:36' },
  { id:  2, q: '¿Qué significa el nombre "Bernabé" dado por los apóstoles?', opts: ['Hijo de la ley', 'Hijo de consolación', 'Siervo del Señor', 'Amigo de Dios'], a: 1, ref: 'Hechos 4:36' },
  { id:  3, q: '¿De qué isla era originario Bernabé?', opts: ['Malta', 'Patmos', 'Chipre', 'Creta'], a: 2, ref: 'Hechos 4:36' },
  { id:  4, q: '¿A qué tribu de Israel pertenecía Bernabé?', opts: ['Judá', 'Benjamín', 'Leví', 'Dan'], a: 2, ref: 'Hechos 4:36' },
  { id:  5, q: '¿Qué hizo Bernabé para beneficiar a la iglesia primitiva de Jerusalén?', opts: ['Tradujo las Escrituras', 'Vendió una heredad y entregó el dinero', 'Construyó la primera iglesia', 'Escribió cartas a las iglesias'], a: 1, ref: 'Hechos 4:37' },
  { id:  6, q: '¿A quién presentó Bernabé ante los apóstoles cuando todos le temían?', opts: ['A Cornelio', 'A Silas', 'A Pablo (Saulo)', 'A Timoteo'], a: 2, ref: 'Hechos 9:27' },
  { id:  7, q: '¿Qué apóstol mandó a Bernabé a Antioquía para supervisar la nueva iglesia?', opts: ['Pedro', 'Juan', 'La iglesia de Jerusalén', 'Pablo'], a: 2, ref: 'Hechos 11:22' },
  { id:  8, q: '¿A qué ciudad fue Bernabé a buscar a Pablo (Saulo) para traerlo a Antioquía?', opts: ['Damasco', 'Tarso', 'Éfeso', 'Corinto'], a: 1, ref: 'Hechos 11:25' },
  { id:  9, q: '¿Qué cargo o función ejercía Bernabé en la iglesia de Antioquía según Hechos 13:1?', opts: ['Diácono', 'Profeta y maestro', 'Anciano', 'Evangelista'], a: 1, ref: 'Hechos 13:1' },
  { id: 10, q: '¿Con quién tuvo Bernabé un "desacuerdo agudo" que causó su separación de Pablo?', opts: ['Silas', 'Marcos (Juan Marcos)', 'Timoteo', 'Lucas'], a: 1, ref: 'Hechos 15:36-39' },

  // B. PABLO Y BERNABÉ – PRIMER VIAJE MISIONERO
  { id: 11, q: '¿Cómo los separó el Espíritu Santo para el primer viaje misionero?', opts: ['Una visión nocturna', 'A través del ayuno y la oración de la iglesia', 'Una carta de los apóstoles', 'Un ángel'], a: 1, ref: 'Hechos 13:2-3' },
  { id: 12, q: '¿Cuál fue la primera ciudad que visitaron Pablo y Bernabé en su primer viaje?', opts: ['Antioquía de Pisidia', 'Salamina en Chipre', 'Listra', 'Derbe'], a: 1, ref: 'Hechos 13:5' },
  { id: 13, q: '¿Qué era Elimas (Barjesús), a quien Pablo reprendió en Chipre?', opts: ['Un sacerdote judío', 'Un hechicero y falso profeta', 'Un gobernador romano', 'Un discípulo tibio'], a: 1, ref: 'Hechos 13:6-8' },
  { id: 14, q: '¿Quién era el procónsul romano que creyó en Chipre tras ver el milagro?', opts: ['Sergio Paulo', 'Félix', 'Porcio Festo', 'Agripa'], a: 0, ref: 'Hechos 13:7-12' },
  { id: 15, q: '¿En qué ciudad de Asia Menor la gente quiso ofrecer sacrificios a Pablo y Bernabé creyendo que eran dioses?', opts: ['Iconio', 'Antioquía', 'Listra', 'Perge'], a: 2, ref: 'Hechos 14:8-13' },
  { id: 16, q: '¿Con qué dios griego identificaron a Bernabé los habitantes de Listra?', opts: ['Hermes', 'Júpiter (Zeus)', 'Apolo', 'Neptuno'], a: 1, ref: 'Hechos 14:12' },
  { id: 17, q: '¿Con qué dios identificaron a Pablo en Listra?', opts: ['Zeus', 'Júpiter', 'Mercurio (Hermes)', 'Marte'], a: 2, ref: 'Hechos 14:12' },
  { id: 18, q: '¿Qué ciudad fue la última etapa del primer viaje misionero antes de regresar?', opts: ['Listra', 'Derbe', 'Perge', 'Iconio'], a: 1, ref: 'Hechos 14:20-21' },
  { id: 19, q: '¿Qué hicieron Pablo y Bernabé al regresar por las mismas ciudades que habían evangelizado?', opts: ['Bautizaron nuevos creyentes', 'Consolidaron a los discípulos y nombraron ancianos', 'Escribieron cartas', 'Recogieron ofrendas únicamente'], a: 1, ref: 'Hechos 14:21-23' },
  { id: 20, q: '¿Dónde informaron Pablo y Bernabé a la iglesia de los resultados de su primer viaje misionero?', opts: ['Jerusalén', 'Roma', 'Antioquía de Siria', 'Corinto'], a: 2, ref: 'Hechos 14:26-27' },

  // C. IGLESIA PRIMITIVA – HECHOS
  { id: 21, q: '¿Cuántos se añadieron a la iglesia el día de Pentecostés tras el sermón de Pedro?', opts: ['120', '300', '3000', '5000'], a: 2, ref: 'Hechos 2:41' },
  { id: 22, q: '¿En qué ciudad fueron llamados "cristianos" por primera vez los creyentes?', opts: ['Jerusalén', 'Roma', 'Corinto', 'Antioquía'], a: 3, ref: 'Hechos 11:26' },
  { id: 23, q: '¿Cuántos días después de la ascensión de Jesús llegó el Espíritu Santo en Pentecostés?', opts: ['3 días', '40 días', '50 días', '7 días'], a: 2, ref: 'Hechos 2:1' },
  { id: 24, q: '¿Quién fue el primer mártir cristiano registrado en Hechos?', opts: ['Santiago', 'Pedro', 'Esteban', 'Felipe'], a: 2, ref: 'Hechos 7:59-60' },
  { id: 25, q: '¿Qué conversión sorprendente narrada en Hechos 9 cambió el curso del cristianismo?', opts: ['La de Cornelio', 'La del eunuco etíope', 'La de Saulo de Tarso', 'La de Lidia'], a: 2, ref: 'Hechos 9:1-19' },
  { id: 26, q: '¿Qué concilio o reunión resolvió el debate sobre la circuncisión de los gentiles?', opts: ['El Concilio de Nicea', 'El Concilio de Jerusalén', 'El Sínodo de Antioquía', 'La reunión de Chipre'], a: 1, ref: 'Hechos 15' },
  { id: 27, q: '¿Quién bautizó al eunuco etíope según Hechos 8?', opts: ['Pedro', 'Pablo', 'Felipe', 'Bernabé'], a: 2, ref: 'Hechos 8:38' },
  { id: 28, q: '¿Qué profetisa mencionada en Hechos 21 tenía cuatro hijas que profetizaban?', opts: ['Ana', 'Priscila', 'Las hijas de Felipe', 'Lidia'], a: 2, ref: 'Hechos 21:8-9' },

  // D. VALORES CRISTIANOS
  { id: 29, q: '¿Cuál es la cualidad que resaltó Lucas de Bernabé en Hechos 11:24?', opts: ['Hombre sabio y elocuente', 'Hombre bueno, lleno del Espíritu Santo y de fe', 'Hombre de gran riqueza', 'Hombre de gran disciplina'], a: 1, ref: 'Hechos 11:24' },
  { id: 30, q: '¿Qué acto de generosidad extrema realizaron algunos creyentes en la iglesia primitiva según Hechos 4:34-35?', opts: ['Oraban en el templo cada día', 'Vendían propiedades y distribuían entre los necesitados', 'Ayunaban tres veces a la semana', 'Enviaban ofrendas a Roma'], a: 1, ref: 'Hechos 4:34-35' },
  { id: 31, q: '¿Qué enseñó Jesús sobre el servicio según el principio aplicado por Bernabé?', opts: ['"El que quiera ser el primero, que sea el último"', '"Ama a tu prójimo como a ti mismo"', '"El mayor entre vosotros sea vuestro servidor"', '"Dad al César lo que es del César"'], a: 2, ref: 'Mateo 23:11' },
  { id: 32, q: '¿Qué versículo resume el corazón misionero de Pablo y Bernabé al volver a predicar?', opts: ['"Predicad el evangelio a toda criatura"', '"Forzosos me son estos; pues, ¡ay de mí si no anunciare el evangelio!"', '"Id por todo el mundo"', '"Haced discípulos a todas las naciones"'], a: 1, ref: '1 Corintios 9:16' },
  { id: 33, q: '¿Qué relación tenía Marcos con Bernabé, razón por la que Bernabé quería llevarlo en el segundo viaje?', opts: ['Era su discípulo espiritual', 'Era su sobrino', 'Era su esclavo liberado', 'Era su compañero de estudio'], a: 1, ref: 'Colosenses 4:10' },
  { id: 34, q: 'Según Hechos 14:22, ¿qué enseñaron Pablo y Bernabé a los discípulos sobre el camino al reino de Dios?', opts: ['"La oración es la llave del cielo"', '"Es necesario que a través de muchas tribulaciones entremos en el reino de Dios"', '"El ayuno abre las puertas del reino"', '"La generosidad nos lleva al reino"'], a: 1, ref: 'Hechos 14:22' },
  { id: 35, q: '¿Cuántas iglesias aproximadamente establecieron Pablo y Bernabé durante su primer viaje misionero?', opts: ['2', '4', 'Al menos 4 en Asia Menor más las de Chipre', '10'], a: 2, ref: 'Hechos 13-14' },
];

/* ══════════════════════════════════════════
   2. DATOS DE CIUDADES / NIVELES
══════════════════════════════════════════ */
const CITIES = [
  {
    name: 'Jerusalén',
    emoji: '🏛',
    verse: '"Y la multitud de los que habían creído era de un corazón y un alma." – Hechos 4:32',
    teaching: 'En Jerusalén nació la iglesia primitiva. Bernabé fue uno de los primeros en demostrar generosidad radical al entregar todo a la comunidad de fe.',
    achievement: { icon: '🕊', name: 'Peregrino de Jerusalén', desc: 'Completaste el primer nivel del viaje.' }
  },
  {
    name: 'Antioquía',
    emoji: '⚓',
    verse: '"Y los discípulos fueron llamados cristianos por primera vez en Antioquía." – Hechos 11:26',
    teaching: 'Antioquía se convirtió en el centro de la misión gentil. Fue aquí donde el Espíritu Santo llamó a Pablo y Bernabé para su primer gran viaje.',
    achievement: { icon: '✝', name: 'Embajador de Antioquía', desc: '¡Alcanzaste la ciudad de los primeros "cristianos"!' }
  },
  {
    name: 'Chipre',
    emoji: '🌿',
    verse: '"Y estando ellos ministrando al Señor y ayunando, dijo el Espíritu Santo: Apartadme a Bernabé y a Saulo." – Hechos 13:2',
    teaching: 'Chipre fue la primera escala del viaje misionero y tierra natal de Bernabé. El procónsul Sergio Paulo creyó al ver la mano de Dios.',
    achievement: { icon: '⚡', name: 'Misionero de Chipre', desc: 'Recorriste la isla natal de Bernabé.' }
  },
  {
    name: 'Perge',
    emoji: '🌄',
    verse: '"Y el Señor les dijo: Id, porque instrumento escogido me es éste, para llevar mi nombre." – Hechos 9:15',
    teaching: 'En Perge comenzó el tramo en tierra firme de Asia Menor. La perseverancia fue clave cuando Juan Marcos los abandonó aquí.',
    achievement: { icon: '🦁', name: 'Valiente de Perge', desc: 'Seguiste adelante a pesar de los obstáculos.' }
  },
  {
    name: 'Iconio',
    emoji: '🔥',
    verse: '"Permaneced firmes en la fe, y que es necesario que a través de muchas tribulaciones entremos en el reino." – Hechos 14:22',
    teaching: 'En Iconio un gran número de judíos y griegos creyó. Pero la oposición creció y Pablo y Bernabé tuvieron que huir, sin abandonar su misión.',
    achievement: { icon: '🛡', name: 'Guardián de Iconio', desc: 'La fe no tiene fronteras ni adversidades que la detengan.' }
  },
  {
    name: 'Listra',
    emoji: '⚕',
    verse: '"Y en Listra había un hombre sentado, imposibilitado de los pies... este oyó hablar a Pablo, el cual, fijando en él los ojos..." – Hechos 14:8-9',
    teaching: 'En Listra Pablo sanó a un cojo de nacimiento. La gente los tomó por dioses, pero ellos redirigieron toda la gloria al Dios vivo y verdadero.',
    achievement: { icon: '🌟', name: 'Sanador de Listra', desc: 'Solo Dios merece toda la gloria.' }
  },
  {
    name: 'Derbe',
    emoji: '🏆',
    verse: '"Y después de anunciar el evangelio a aquella ciudad y de hacer muchos discípulos, volvieron a Listra, a Iconio y a Antioquía." – Hechos 14:21',
    teaching: 'Derbe fue el punto final del viaje. Desde allí Pablo y Bernabé regresaron consolidando cada iglesia, nombrando ancianos y encomendándolos a Dios.',
    achievement: { icon: '👑', name: 'Completador del Viaje', desc: '¡Has completado todos los niveles del viaje de Bernabé!' }
  },
];

/* ══════════════════════════════════════════
   3. LABERINTOS (uno por ciudad)
   0 = pasillo  1 = pared  S = inicio  E = meta
   Q = casilla de pregunta
══════════════════════════════════════════ */
// Codificación: 0=libre, 1=pared, 2=inicio, 3=meta, 4=pregunta
const MAZES = [
  // Jerusalén (nivel 0) – 13×11
  [
    [1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,2,0,0,0,1,0,0,0,0,0,0,1],
    [1,1,1,0,1,1,0,1,1,0,1,0,1],
    [1,0,4,0,0,0,0,1,0,0,1,0,1],
    [1,0,1,1,1,1,0,1,0,1,1,0,1],
    [1,0,0,0,4,0,0,0,0,0,0,0,1],
    [1,1,1,0,1,1,1,1,0,1,1,0,1],
    [1,0,0,0,0,0,4,1,0,0,0,0,1],
    [1,0,1,1,1,0,1,1,1,1,1,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,3,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1],
  ],
  // Antioquía (nivel 1) – 15×11
  [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,2,0,0,1,0,0,0,0,0,1,0,0,0,1],
    [1,0,1,0,1,0,1,1,1,0,1,0,1,0,1],
    [1,0,1,4,0,0,0,0,1,0,0,0,1,0,1],
    [1,0,1,1,1,1,1,0,1,1,1,0,1,0,1],
    [1,0,0,0,0,4,0,0,0,0,1,0,0,0,1],
    [1,1,1,0,1,1,1,1,1,0,1,1,1,0,1],
    [1,0,0,0,0,0,4,0,0,0,0,0,0,0,1],
    [1,0,1,1,1,0,1,1,1,1,1,1,1,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,3,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  ],
  // Chipre (nivel 2) – 15×13
  [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,2,0,0,0,1,0,4,0,0,1,0,0,0,1],
    [1,1,1,1,0,1,0,1,1,0,1,0,1,0,1],
    [1,0,0,0,0,0,0,0,1,0,0,0,1,0,1],
    [1,0,1,1,1,1,1,0,1,1,1,0,1,0,1],
    [1,0,1,4,0,0,1,0,0,0,1,0,0,0,1],
    [1,0,1,1,1,0,1,1,1,0,1,1,1,0,1],
    [1,0,0,0,0,0,0,0,1,0,0,4,0,0,1],
    [1,1,1,0,1,1,1,0,1,1,1,1,1,0,1],
    [1,0,0,0,1,0,0,0,0,0,0,0,0,0,1],
    [1,0,1,1,1,0,1,1,1,1,1,0,1,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,3,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  ],
  // Perge (nivel 3) – 15×13
  [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,2,0,0,1,0,0,0,1,0,4,0,0,0,1],
    [1,0,1,0,1,0,1,0,1,0,1,1,1,0,1],
    [1,0,1,4,0,0,1,0,0,0,0,0,0,0,1],
    [1,0,1,1,1,1,1,1,1,1,1,0,1,1,1],
    [1,0,0,0,0,0,4,0,0,0,1,0,0,0,1],
    [1,1,1,0,1,0,1,1,1,0,1,1,1,0,1],
    [1,0,0,0,1,0,0,4,0,0,0,0,0,0,1],
    [1,0,1,1,1,1,1,1,1,1,1,0,1,0,1],
    [1,0,0,0,0,0,0,0,0,0,1,0,1,0,1],
    [1,1,1,0,1,1,1,1,1,0,1,0,1,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,3,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  ],
  // Iconio (nivel 4) – 17×13
  [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,2,0,0,1,0,4,0,1,0,0,0,1,0,0,0,1],
    [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
    [1,0,1,0,0,0,1,0,0,0,1,4,0,0,1,0,1],
    [1,0,1,1,1,0,1,1,1,0,1,1,1,0,1,0,1],
    [1,0,0,0,1,0,0,0,1,0,0,0,0,0,1,0,1],
    [1,1,1,0,1,1,1,0,1,1,1,0,1,1,1,0,1],
    [1,0,0,0,0,4,0,0,0,0,1,0,0,0,1,0,1],
    [1,0,1,1,1,1,1,1,1,0,1,1,1,0,1,0,1],
    [1,0,0,0,0,0,0,0,1,0,0,0,4,0,0,0,1],
    [1,1,1,0,1,1,1,0,1,1,1,0,1,1,1,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  ],
  // Listra (nivel 5) – 17×15
  [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,2,0,0,1,0,0,4,1,0,0,0,1,0,0,0,1],
    [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
    [1,0,1,4,0,0,1,0,0,0,1,0,0,0,1,0,1],
    [1,0,1,1,1,0,1,1,1,1,1,0,1,1,1,0,1],
    [1,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,1],
    [1,1,1,0,1,1,1,1,1,0,1,1,1,0,1,0,1],
    [1,0,0,0,0,4,0,0,1,0,0,0,0,0,0,0,1],
    [1,0,1,1,1,1,1,0,1,1,1,1,1,1,1,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,4,0,0,1,0,1],
    [1,1,1,0,1,1,1,1,1,0,1,1,1,0,1,0,1],
    [1,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,1],
    [1,0,1,0,1,0,1,0,1,1,1,0,1,1,1,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  ],
  // Derbe – final (nivel 6) – 19×15
  [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,2,0,0,1,0,4,0,1,0,0,0,1,0,4,0,0,0,1],
    [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
    [1,0,1,0,0,0,1,0,0,0,1,0,0,0,1,4,1,0,1],
    [1,0,1,1,1,0,1,1,1,0,1,1,1,0,1,1,1,0,1],
    [1,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,1,0,1],
    [1,1,1,0,1,1,1,0,1,1,1,0,1,1,1,0,1,0,1],
    [1,0,0,0,0,4,0,0,0,0,1,0,0,0,1,0,0,0,1],
    [1,0,1,1,1,1,1,1,1,0,1,1,1,0,1,1,1,0,1],
    [1,0,0,0,0,0,0,0,1,0,0,0,4,0,0,0,1,0,1],
    [1,1,1,0,1,1,1,0,1,1,1,0,1,1,1,0,1,0,1],
    [1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,1,0,1,0,1,1,1,0,1,1,1,0,1,1,1,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  ],
];

/* ══════════════════════════════════════════
   4. ESTADO GLOBAL DEL JUEGO
══════════════════════════════════════════ */
const STATE = {
  currentLevel: 0,
  score: 0,
  lives: 3,
  correctAnswers: 0,
  totalAnswers: 0,
  startTime: 0,
  elapsedTime: 0,
  timerInterval: null,
  playerPos: { row: 0, col: 0 },
  questionsAsked: new Set(),    // IDs ya mostradas
  waitingAnswer: false,
  sfxEnabled: true,
  musicEnabled: false,
  achievements: [],
  gameActive: false,
};

/* Pool de preguntas disponibles (se rellena cada nivel) */
let questionPool = [];
let currentQuestion = null;

/* ══════════════════════════════════════════
   5. REFERENCIAS AL DOM
══════════════════════════════════════════ */
const $ = id => document.getElementById(id);
const screens = {
  start:    $('screen-start'),
  settings: $('screen-settings'),
  game:     $('screen-game'),
  end:      $('screen-end'),
};
const canvas  = $('maze-canvas');
const ctx     = canvas.getContext('2d');
const modQ    = $('modal-question');
const modCity = $('modal-city-complete');
const modDef  = $('modal-defeat');

/* ══════════════════════════════════════════
   6. AUDIO (sintetizado, sin archivos externos)
══════════════════════════════════════════ */
let audioCtx = null;

function getAudioCtx() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  return audioCtx;
}

function playTone(freq, duration, type = 'sine', gain = 0.3) {
  if (!STATE.sfxEnabled) return;
  try {
    const ac = getAudioCtx();
    const o  = ac.createOscillator();
    const g  = ac.createGain();
    o.connect(g); g.connect(ac.destination);
    o.type = type;
    o.frequency.setValueAtTime(freq, ac.currentTime);
    g.gain.setValueAtTime(gain, ac.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + duration);
    o.start(); o.stop(ac.currentTime + duration);
  } catch(e) {}
}

function sfxCorrect() {
  playTone(523, 0.12, 'sine');
  setTimeout(() => playTone(659, 0.12, 'sine'), 120);
  setTimeout(() => playTone(784, 0.22, 'sine'), 240);
}

function sfxWrong() {
  playTone(220, 0.15, 'sawtooth', 0.25);
  setTimeout(() => playTone(180, 0.25, 'sawtooth', 0.2), 160);
}

function sfxStep() {
  playTone(440, 0.04, 'sine', 0.08);
}

function sfxLevelUp() {
  [523,659,784,1047].forEach((f,i) => setTimeout(() => playTone(f, 0.18, 'sine', 0.28), i * 120));
}

/* Música de fondo (oscilador ambiental simple) */
let bgOsc = null, bgGain = null;
function startMusic() {
  if (!STATE.musicEnabled) return;
  try {
    const ac = getAudioCtx();
    bgGain = ac.createGain(); bgGain.gain.value = 0.04;
    bgGain.connect(ac.destination);
    bgOsc = ac.createOscillator();
    bgOsc.type = 'sine';
    bgOsc.frequency.value = 174;
    bgOsc.connect(bgGain);
    bgOsc.start();
  } catch(e) {}
}
function stopMusic() {
  try { bgOsc && bgOsc.stop(); } catch(e) {}
  bgOsc = null; bgGain = null;
}

/* ══════════════════════════════════════════
   7. GESTIÓN DE PANTALLAS
══════════════════════════════════════════ */
function showScreen(name) {
  Object.values(screens).forEach(s => s.classList.remove('active'));
  if (screens[name]) screens[name].classList.add('active');
}

/* ══════════════════════════════════════════
   8. LOCAL STORAGE
══════════════════════════════════════════ */
const LS_KEY = 'bernabe_save';

function saveProgress() {
  const data = {
    level: STATE.currentLevel,
    score: STATE.score,
    lives: STATE.lives,
    correct: STATE.correctAnswers,
    total: STATE.totalAnswers,
    elapsed: STATE.elapsedTime,
    achievements: STATE.achievements,
    questionsAsked: [...STATE.questionsAsked],
  };
  try { localStorage.setItem(LS_KEY, JSON.stringify(data)); } catch(e) {}
}

function loadProgress() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch(e) { return null; }
}

function clearProgress() {
  try { localStorage.removeItem(LS_KEY); } catch(e) {}
}

function showBestScore() {
  const save = loadProgress();
  const el = $('best-score-display');
  if (save && save.score > 0) {
    el.textContent = `Partida guardada — Ciudad: ${CITIES[save.level]?.name} · Puntos: ${save.score}`;
    el.classList.remove('hidden');
  }
}

/* ══════════════════════════════════════════
   9. TEMPORIZADOR
══════════════════════════════════════════ */
function startTimer() {
  STATE.startTime = Date.now() - STATE.elapsedTime * 1000;
  STATE.timerInterval = setInterval(() => {
    STATE.elapsedTime = Math.floor((Date.now() - STATE.startTime) / 1000);
    updateHUD();
  }, 1000);
}

function stopTimer() {
  clearInterval(STATE.timerInterval);
  STATE.timerInterval = null;
}

function formatTime(secs) {
  const m = String(Math.floor(secs / 60)).padStart(2,'0');
  const s = String(secs % 60).padStart(2,'0');
  return `${m}:${s}`;
}

/* ══════════════════════════════════════════
   10. HUD
══════════════════════════════════════════ */
function updateHUD() {
  $('hud-city').textContent    = CITIES[STATE.currentLevel]?.name || '';
  $('hud-lives').textContent   = '♥ '.repeat(STATE.lives).trim() || '☠';
  $('hud-score').textContent   = STATE.score;
  $('hud-correct').textContent = STATE.correctAnswers;
  $('hud-time').textContent    = formatTime(STATE.elapsedTime);
}

/* ══════════════════════════════════════════
   11. LABERINTO – RENDERIZADO
══════════════════════════════════════════ */
const CELL = 40; // px base

/** Colores del laberinto */
const COLORS = {
  wall:    '#2c1a0e',
  wall2:   '#3d2510',
  floor:   '#c8b078',
  floor2:  '#d4bc8a',
  start:   '#3a6b8a',
  goal:    '#c8a45a',
  goalGlow:'#ffe080',
  player:  '#8b1a1a',
  question:'#5a6e3a',
  questionGlow: '#90d060',
  grid:    'rgba(0,0,0,0.08)',
};

let animFrame = 0;
let pulseT    = 0;

function getMaze() { return MAZES[STATE.currentLevel]; }

function findCell(type) {
  const m = getMaze();
  for (let r = 0; r < m.length; r++)
    for (let c = 0; c < m[r].length; c++)
      if (m[r][c] === type) return { row: r, col: c };
  return { row: 1, col: 1 };
}

function initMaze() {
  const m   = getMaze();
  const rows = m.length, cols = m[0].length;

  /* Escalar celda para caber en pantalla */
  const maxW = Math.floor((window.innerWidth - 24) / cols);
  const maxH = Math.floor((window.innerHeight - 160) / rows);
  const cell = Math.min(CELL, maxW, maxH, 48);

  canvas.width  = cols * cell;
  canvas.height = rows * cell;
  canvas._cell  = cell;

  /* Posición inicial */
  const sp = findCell(2);
  STATE.playerPos = { ...sp };
}

function drawMaze() {
  const m    = getMaze();
  const cell = canvas._cell || CELL;
  const rows = m.length, cols = m[0].length;

  pulseT += 0.05;
  const pulse = 0.5 + 0.5 * Math.sin(pulseT);

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = c * cell, y = r * cell;
      const v = m[r][c];

      if (v === 1) {
        /* Pared con textura */
        const grd = ctx.createLinearGradient(x, y, x+cell, y+cell);
        grd.addColorStop(0, COLORS.wall);
        grd.addColorStop(1, COLORS.wall2);
        ctx.fillStyle = grd;
        ctx.fillRect(x, y, cell, cell);
        /* Bevel efecto */
        ctx.strokeStyle = 'rgba(255,255,255,0.06)';
        ctx.lineWidth = 1;
        ctx.strokeRect(x+0.5, y+0.5, cell-1, cell-1);
      } else {
        /* Suelo pergamino */
        ctx.fillStyle = (r+c)%2===0 ? COLORS.floor : COLORS.floor2;
        ctx.fillRect(x, y, cell, cell);
        /* Rejilla suave */
        ctx.strokeStyle = COLORS.grid;
        ctx.lineWidth = 0.5;
        ctx.strokeRect(x, y, cell, cell);
      }

      /* Inicio */
      if (v === 2) {
        ctx.fillStyle = COLORS.start;
        ctx.fillRect(x+2, y+2, cell-4, cell-4);
        ctx.fillStyle = '#aee0ff';
        ctx.font = `${cell*0.55}px serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('✦', x + cell/2, y + cell/2);
      }

      /* Meta */
      if (v === 3) {
        const gl = ctx.createRadialGradient(x+cell/2, y+cell/2, 0, x+cell/2, y+cell/2, cell/2);
        gl.addColorStop(0, COLORS.goalGlow);
        gl.addColorStop(1, COLORS.goal);
        ctx.fillStyle = gl;
        ctx.fillRect(x+2, y+2, cell-4, cell-4);
        ctx.fillStyle = '#fff';
        ctx.font = `${cell*0.55}px serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('🏆', x + cell/2, y + cell/2 + 1);
      }

      /* Pregunta */
      if (v === 4) {
        const alpha = 0.6 + 0.4 * pulse;
        ctx.fillStyle = `rgba(90,110,58,${alpha})`;
        ctx.fillRect(x+2, y+2, cell-4, cell-4);
        ctx.fillStyle = `rgba(160,220,80,${alpha})`;
        ctx.font = `bold ${cell*0.5}px serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('?', x + cell/2, y + cell/2);
      }
    }
  }

  /* Jugador – Bernabé */
  const px = STATE.playerPos.col * cell;
  const py = STATE.playerPos.row * cell;
  const r  = cell * 0.38;

  /* Sombra */
  ctx.beginPath();
  ctx.ellipse(px+cell/2, py+cell*0.88, r*0.7, r*0.18, 0, 0, Math.PI*2);
  ctx.fillStyle = 'rgba(0,0,0,0.25)';
  ctx.fill();

  /* Cuerpo */
  const pGrd = ctx.createRadialGradient(px+cell/2, py+cell/2, 0, px+cell/2, py+cell/2, r);
  pGrd.addColorStop(0, '#d04040');
  pGrd.addColorStop(1, '#6b1010');
  ctx.beginPath();
  ctx.arc(px + cell/2, py + cell/2, r, 0, Math.PI*2);
  ctx.fillStyle = pGrd;
  ctx.fill();

  /* Cruz */
  ctx.strokeStyle = 'rgba(255,255,255,0.9)';
  ctx.lineWidth = cell * 0.07;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(px+cell/2, py+cell*0.27);
  ctx.lineTo(px+cell/2, py+cell*0.73);
  ctx.moveTo(px+cell*0.32, py+cell*0.45);
  ctx.lineTo(px+cell*0.68, py+cell*0.45);
  ctx.stroke();

  animFrame = requestAnimationFrame(drawMaze);
}

/* ══════════════════════════════════════════
   12. MOVIMIENTO DEL JUGADOR
══════════════════════════════════════════ */
const DIRS = {
  up:    { dr: -1, dc:  0 },
  down:  { dr:  1, dc:  0 },
  left:  { dr:  0, dc: -1 },
  right: { dr:  0, dc:  1 },
};

function movePlayer(dir) {
  if (!STATE.gameActive || STATE.waitingAnswer) return;
  const m = getMaze();
  const { dr, dc } = DIRS[dir];
  const nr = STATE.playerPos.row + dr;
  const nc = STATE.playerPos.col + dc;

  if (nr < 0 || nr >= m.length || nc < 0 || nc >= m[nr].length) return;
  if (m[nr][nc] === 1) return; // pared

  STATE.playerPos.row = nr;
  STATE.playerPos.col = nc;
  sfxStep();

  const cell = m[nr][nc];

  if (cell === 4) {
    /* Casilla de pregunta */
    showQuestion();
  } else if (cell === 3) {
    /* Meta alcanzada */
    levelComplete();
  }

  saveProgress();
}

function handleKey(e) {
  const map = {
    ArrowUp:'up', ArrowDown:'down', ArrowLeft:'left', ArrowRight:'right',
    KeyW:'up', KeyS:'down', KeyA:'left', KeyD:'right',
    w:'up', s:'down', a:'left', d:'right',
  };
  const dir = map[e.code] || map[e.key];
  if (dir) { e.preventDefault(); movePlayer(dir); }
}

/* ══════════════════════════════════════════
   13. SISTEMA DE PREGUNTAS
══════════════════════════════════════════ */
function buildQuestionPool() {
  questionPool = BIBLE_QUESTIONS.filter(q => !STATE.questionsAsked.has(q.id));
  shuffleArray(questionPool);
}

function pickQuestion() {
  if (questionPool.length === 0) buildQuestionPool();
  if (questionPool.length === 0) return null;
  return questionPool.shift();
}

function showQuestion() {
  currentQuestion = pickQuestion();
  if (!currentQuestion) return;
  STATE.waitingAnswer = true;

  $('question-city-badge').textContent = CITIES[STATE.currentLevel]?.name || '';
  $('question-text').textContent = `${currentQuestion.q}  (${currentQuestion.ref})`;

  const grid = $('question-options');
  grid.innerHTML = '';
  currentQuestion.opts.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.textContent = `${['A','B','C','D'][i]}) ${opt}`;
    btn.addEventListener('click', () => answerQuestion(i));
    grid.appendChild(btn);
  });

  $('question-feedback').className = 'feedback hidden';
  $('question-feedback').textContent = '';
  modQ.classList.remove('hidden');
}

function answerQuestion(idx) {
  if (!STATE.waitingAnswer) return;

  const buttons = $('question-options').querySelectorAll('.option-btn');
  buttons.forEach(b => b.disabled = true);

  STATE.totalAnswers++;

  if (idx === currentQuestion.a) {
    /* CORRECTO */
    buttons[idx].classList.add('correct');
    STATE.score += 10;
    STATE.correctAnswers++;
    STATE.questionsAsked.add(currentQuestion.id);
    sfxCorrect();
    const fb = $('question-feedback');
    fb.className = 'feedback correct-fb';
    fb.textContent = `✓ ¡Correcto! "${currentQuestion.opts[currentQuestion.a]}" – ${currentQuestion.ref}`;

    setTimeout(() => {
      modQ.classList.add('hidden');
      STATE.waitingAnswer = false;
      updateHUD();
      saveProgress();
    }, 1800);

  } else {
    /* INCORRECTO */
    buttons[idx].classList.add('wrong');
    buttons[currentQuestion.a].classList.add('correct');
    STATE.lives--;
    /* La pregunta queda marcada como usada aunque se falle, para que no se repita */
    STATE.questionsAsked.add(currentQuestion.id);
    sfxWrong();
    const fb = $('question-feedback');
    fb.className = 'feedback wrong-fb';
    fb.textContent = `✗ La respuesta correcta era: "${currentQuestion.opts[currentQuestion.a]}"`;
    updateHUD();

    if (STATE.lives <= 0) {
      setTimeout(() => {
        modQ.classList.add('hidden');
        STATE.waitingAnswer = false;
        showDefeat();
      }, 1800);
      return;
    }

    /* Se cierra el modal y el jugador recupera el control del laberinto:
       fallar cuesta una vida, no quedarse encerrado respondiendo. */
    setTimeout(() => {
      modQ.classList.add('hidden');
      $('question-feedback').className = 'feedback hidden';
      STATE.waitingAnswer = false;
      updateHUD();
      saveProgress();
    }, 1800);
  }
}

/* ══════════════════════════════════════════
   14. NIVEL COMPLETADO
══════════════════════════════════════════ */
function levelComplete() {
  stopTimer();
  STATE.gameActive = false;
  sfxLevelUp();
  const city = CITIES[STATE.currentLevel];

  $('city-complete-title').textContent = `${city.emoji} ¡${city.name} completada!`;
  $('city-complete-verse').textContent  = city.verse;
  $('city-complete-teaching').textContent = city.teaching;

  /* Logro */
  const ach = city.achievement;
  if (ach && !STATE.achievements.find(a => a.name === ach.name)) {
    STATE.achievements.push(ach);
    const achEl = $('achievement-popup');
    achEl.innerHTML = `<span class="achievement-icon">${ach.icon}</span>
      <div><div style="font-family:'Cinzel',serif;color:var(--gold);font-size:.85rem">${ach.name}</div>
      <div style="font-size:.8rem">${ach.desc}</div></div>`;
    achEl.classList.remove('hidden');
  } else {
    $('achievement-popup').classList.add('hidden');
  }

  /* Confeti */
  spawnConfetti();

  modCity.classList.remove('hidden');
  saveProgress();
}

function nextCity() {
  modCity.classList.add('hidden');
  STATE.currentLevel++;

  if (STATE.currentLevel >= CITIES.length) {
    showEndScreen();
    return;
  }

  /* Nuevo nivel */
  STATE.gameActive = true;
  initMaze();
  buildQuestionPool();
  updateHUD();
  startTimer();
}

/* ══════════════════════════════════════════
   15. DERROTA
══════════════════════════════════════════ */
function showDefeat() {
  stopTimer();
  STATE.gameActive = false;
  $('defeat-stats').textContent =
    `Puntos: ${STATE.score} · Aciertos: ${STATE.correctAnswers}/${STATE.totalAnswers} · Tiempo: ${formatTime(STATE.elapsedTime)}`;
  modDef.classList.remove('hidden');
}

/* ══════════════════════════════════════════
   16. PANTALLA FINAL
══════════════════════════════════════════ */
function showEndScreen() {
  stopTimer();
  STATE.gameActive = false;
  cancelAnimationFrame(animFrame);
  stopMusic();

  const pct = STATE.totalAnswers > 0
    ? Math.round(STATE.correctAnswers / STATE.totalAnswers * 100)
    : 0;

  /* Medalla */
  let medal = '🥉', medalName = 'Bronce';
  if (pct >= 90)       { medal = '🥇'; medalName = 'Oro'; }
  else if (pct >= 70)  { medal = '🥈'; medalName = 'Plata'; }

  $('medal-display').textContent = medal;

  $('end-stats').innerHTML = `
    <div class="stat-card"><span class="stat-num">${STATE.score}</span><span class="stat-lbl">Puntos</span></div>
    <div class="stat-card"><span class="stat-num">${pct}%</span><span class="stat-lbl">Aciertos</span></div>
    <div class="stat-card"><span class="stat-num">${formatTime(STATE.elapsedTime)}</span><span class="stat-lbl">Tiempo</span></div>
    <div class="stat-card"><span class="stat-num">${medalName}</span><span class="stat-lbl">Medalla</span></div>
  `;

  /* Logros */
  const achList = $('achievements-final');
  achList.innerHTML = '';
  if (STATE.achievements.length) {
    const title = document.createElement('h3');
    title.style.cssText = 'font-family:Cinzel,serif;color:var(--gold);margin-bottom:10px;font-size:1rem';
    title.textContent = '🏅 Logros Obtenidos';
    achList.appendChild(title);
    STATE.achievements.forEach(a => {
      const div = document.createElement('div');
      div.className = 'ach-item';
      div.innerHTML = `<span class="ach-icon">${a.icon}</span>
        <div><div class="ach-name">${a.name}</div><div>${a.desc}</div></div>`;
      achList.appendChild(div);
    });
  }

  clearProgress();
  showScreen('end');
  spawnConfetti($('end-inner'));
}

/* ══════════════════════════════════════════
   17. INICIO DE PARTIDA
══════════════════════════════════════════ */
function startGame(fromSave = false) {
  cancelAnimationFrame(animFrame);
  modQ.classList.add('hidden');
  modCity.classList.add('hidden');
  modDef.classList.add('hidden');

  if (!fromSave) {
    /* Nueva partida */
    STATE.currentLevel   = 0;
    STATE.score          = 0;
    STATE.lives          = 3;
    STATE.correctAnswers = 0;
    STATE.totalAnswers   = 0;
    STATE.elapsedTime    = 0;
    STATE.achievements   = [];
    STATE.questionsAsked = new Set();
    STATE.waitingAnswer  = false;
  } else {
    const save = loadProgress();
    if (save) {
      STATE.currentLevel   = save.level   || 0;
      STATE.score          = save.score   || 0;
      STATE.lives          = save.lives   || 3;
      STATE.correctAnswers = save.correct || 0;
      STATE.totalAnswers   = save.total   || 0;
      STATE.elapsedTime    = save.elapsed || 0;
      STATE.achievements   = save.achievements || [];
      STATE.questionsAsked = new Set(save.questionsAsked || []);
    }
    STATE.waitingAnswer = false;
  }

  STATE.gameActive = true;
  initMaze();
  buildQuestionPool();
  updateHUD();
  showScreen('game');
  startTimer();
  startMusic();
  drawMaze();
}

function restartGame() {
  clearProgress();
  modDef.classList.add('hidden');
  startGame(false);
}

/* ══════════════════════════════════════════
   18. CONFETI
══════════════════════════════════════════ */
function spawnConfetti(container) {
  const area = container || $('confetti-area');
  if (!area) return;
  area.innerHTML = '';
  const colors = ['#c8a45a','#e8c97a','#a0d060','#60a0d0','#d06060','#e0a030'];
  for (let i = 0; i < 28; i++) {
    const p = document.createElement('div');
    p.className = 'confetti-piece';
    p.style.cssText = `
      left: ${Math.random()*100}%;
      top: ${-10 - Math.random()*20}px;
      background: ${colors[Math.floor(Math.random()*colors.length)]};
      animation-delay: ${Math.random()*0.8}s;
      animation-duration: ${1.2 + Math.random()*0.6}s;
      transform: rotate(${Math.random()*360}deg);
      width: ${6+Math.random()*6}px;
      height: ${6+Math.random()*6}px;
    `;
    area.appendChild(p);
  }
}

/* ══════════════════════════════════════════
   19. UTILIDADES
══════════════════════════════════════════ */
function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i+1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/* ══════════════════════════════════════════
   20. EVENT LISTENERS
══════════════════════════════════════════ */

/* Pantalla de inicio */
$('btn-start').addEventListener('click', () => {
  const save = loadProgress();
  if (save && save.score > 0) {
    if (confirm('¿Deseas continuar tu partida guardada?')) {
      startGame(true);
    } else {
      startGame(false);
    }
  } else {
    startGame(false);
  }
});

$('btn-settings').addEventListener('click', () => showScreen('settings'));

/* Configuración */
$('btn-back-settings').addEventListener('click', () => showScreen('start'));

$('toggle-sfx').addEventListener('click', function() {
  STATE.sfxEnabled = !STATE.sfxEnabled;
  this.textContent = STATE.sfxEnabled ? 'ON' : 'OFF';
  this.classList.toggle('active', STATE.sfxEnabled);
  if (STATE.sfxEnabled) { getAudioCtx(); sfxStep(); }
});

$('toggle-music').addEventListener('click', function() {
  STATE.musicEnabled = !STATE.musicEnabled;
  this.textContent = STATE.musicEnabled ? 'ON' : 'OFF';
  this.classList.toggle('active', STATE.musicEnabled);
  if (STATE.musicEnabled && STATE.gameActive) startMusic();
  else stopMusic();
});

$('btn-clear-save').addEventListener('click', () => {
  if (confirm('¿Seguro que deseas borrar el progreso guardado?')) {
    clearProgress();
    $('best-score-display').classList.add('hidden');
    alert('Progreso eliminado.');
  }
});

/* Ciudad completada */
$('btn-next-city').addEventListener('click', nextCity);

/* Derrota */
$('btn-retry').addEventListener('click', restartGame);
$('btn-defeat-menu').addEventListener('click', () => {
  modDef.classList.add('hidden');
  cancelAnimationFrame(animFrame);
  stopTimer();
  stopMusic();
  showScreen('start');
  showBestScore();
});

/* Pantalla final */
$('btn-play-again').addEventListener('click', () => startGame(false));
$('btn-end-menu').addEventListener('click', () => {
  showScreen('start');
  showBestScore();
});

/* Teclado */
document.addEventListener('keydown', handleKey);

/* Controles táctiles */
document.querySelectorAll('.touch-btn').forEach(btn => {
  btn.addEventListener('click', () => movePlayer(btn.dataset.dir));
  /* Soporte táctil para evitar delay */
  btn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    movePlayer(btn.dataset.dir);
  }, { passive: false });
});

/* Redimensionar */
window.addEventListener('resize', () => {
  if (STATE.gameActive) {
    cancelAnimationFrame(animFrame);
    initMaze();
    drawMaze();
  }
});

/* ══════════════════════════════════════════
   21. INICIALIZACIÓN
══════════════════════════════════════════ */
showScreen('start');
showBestScore();
