# ✝ El Viaje de Bernabé

### Laberinto interactivo con preguntas bíblicas

> *"He peleado la buena batalla, he acabado la carrera, he guardado la fe."* — 2 Timoteo 4:7

---

## 📖 Descripción

**El Viaje de Bernabé** es un juego web que recorre las siete ciudades del primer viaje misionero de Pablo y Bernabé. En cada ciudad el jugador debe atravesar un laberinto, recoger los puntos de pregunta y responder correctamente para avanzar. Al completar cada nivel se muestra un versículo, una enseñanza breve y un logro.

Desarrollado en HTML, CSS y JavaScript sin librerías externas.

---

## 🎮 Cómo jugar

1. Presiona **⚔ Comenzar Aventura**.
2. Muévete por el laberinto con las **flechas del teclado** o con los **controles táctiles** en pantalla.
3. Al caer en una casilla de pregunta, responde correctamente: un error cuesta una vida.
4. Llega a la meta para completar la ciudad y avanzar a la siguiente.
5. Completa las **7 ciudades** sin quedarte sin vidas.

---

## ✨ Características

| Característica | Detalle |
|---|---|
| 🗺 Siete niveles | Jerusalén, Antioquía, Chipre, Perge, Iconio, Listra y Derbe |
| 🧩 Laberintos | Siete mapas distintos dibujados en `<canvas>` |
| ❓ Banco de preguntas | 35 preguntas que se reparten sin repetirse dentro del mismo nivel |
| ❤ Vidas y puntaje | Tres vidas, puntos por acierto y contador de aciertos |
| ⏱ Cronómetro | Tiempo total de la partida y registro de la mejor marca |
| 💾 Progreso guardado | La partida y el mejor puntaje se conservan con `localStorage` |
| 🏅 Logros | Un logro por ciudad completada |
| 🎵 Audio generado | Efectos y música ambiental creados con la Web Audio API, sin archivos externos |
| ⌨ Controles | Teclado en escritorio y botones táctiles en móvil |
| 📱 Responsive | El laberinto se redimensiona al tamaño de la pantalla |
| ⚙ Configuración | Interruptores de sonido y música, y opción de borrar el progreso |

---

## 🗂 Estructura de archivos

```
dinamica3/
├── bernabe-juego.html   ← Juego principal (estructura y estilos base)
├── script.js            ← Lógica: laberintos, preguntas, audio, progreso
└── style.css            ← Estilos: paleta de pergamino, pantallas y HUD
```

---

## 🎨 Decisiones de diseño

- **Sin librerías externas** — HTML, CSS y JavaScript puro.
- **Sin archivos de audio** — los efectos y la melodía se generan en tiempo real con osciladores de la Web Audio API.
- **Laberinto en canvas** — cada mapa se codifica como una matriz (`0` libre, `1` pared, `2` inicio, `3` meta, `4` pregunta) y se redibuja con `requestAnimationFrame`.
- **Paleta de pergamino** — tinta sepia, dorado y tonos tierra, acordes con la ambientación del primer siglo.

---

## 🖥 Cómo ejecutarlo

Abre `bernabe-juego.html` en cualquier navegador moderno. No requiere instalación, servidor ni conexión a internet.
