````markdown
# 🛩️ Storkie DRN — Scroll Experience (Demo Interactiva)

Experiencia web 3D basada en scroll que presenta el dron FPV **Storkie DRN** de forma inmersiva.  
Desarrollada con **Three.js** (visualización 3D) y **Anime.js** (animaciones sincronizadas).

<p align="center">
  <img src="https://img.shields.io/badge/status-prototype-blue?style=for-the-badge" />
  <img src="https://img.shields.io/badge/license-MIT-green?style=for-the-badge" />
  <img src="https://img.shields.io/badge/tech-Three.js%20%7C%20Anime.js%20%7C%20HTML5%20%7C%20CSS3-yellow?style=for-the-badge" />
</p>

---

## 📑 Tabla de contenidos

1. [Vista general](#-vista-general)
2. [Tecnologías utilizadas](#-tecnologías-utilizadas)
3. [Arquitectura del proyecto](#-arquitectura-del-proyecto)
4. [Flujo de ejecución](#-flujo-de-ejecución)
5. [Requisitos](#-requisitos)
6. [Instalación rápida](#-instalación-rápida)
7. [Futuras mejoras](#-futuras-mejoras)
8. [Autor](#-autor)
9. [Licencia](#-licencia)

---

## 🧐 Vista general

Esta demo combina una escena 3D renderizada en el navegador con animaciones controladas por desplazamiento vertical (_scroll_).  
Mientras el usuario avanza por la página:

- Un objeto 3D (actualmente una **esfera**) simula el dron FPV.
- Cada sección activa una animación distinta:
  - 🔁 Rotación estructural
  - ⬆️ Elevación
  - 🔍 Zoom / Escalado
  - 🎨 Cambio de color
- Los bloques de texto se sincronizan con los movimientos del dron para crear una narrativa visual fluida.

---

## 🧠 Tecnologías utilizadas

### 🟦 Three.js

Librería JavaScript para renderizado 3D con WebGL.

- Cámara de perspectiva, luces direccional y ambiental.
- Placeholder actual: **esfera 3D** (futura sustitución por el modelo real `storkie-drn.glb`).
- Soporte para materiales PBR, animaciones complejas y efectos visuales.

### 🟧 Anime.js

Framework de animación para web.

- Control de propiedades 3D: `rotation`, `position`, `scale`, `color`.
- Transiciones de interfaz: efectos _fade-in_ y _fade-out_ en texto.
- Basado en el evento `onScroll`, que sincroniza las animaciones con el desplazamiento del usuario.

**Ejemplo:**

```js
anime({
  targets: dronePlaceholder.rotation,
  y: [0, Math.PI / 2],
  duration: 1500,
  easing: "easeInOutSine",
});
```
````

### 🟨 HTML5, CSS3 y JavaScript

- **HTML5:** estructura semántica moderna.
- **CSS3:** estilo oscuro, responsive y visual limpio.
- **JavaScript:** gestiona la integración entre Three.js, Anime.js y el evento de scroll.

---

## ⚙️ Arquitectura del proyecto

```bash
storkie-drn-onscroll/
├── index.html              # Punto de entrada principal
├── css/
│   └── style.css           # Estilos globales
├── js/
│   ├── main.js             # Lógica de scroll y activación de animaciones
│   └── droneScene.js       # Configuración Three.js (escena, luces, objeto)
└── assets/                 # Recursos futuros (modelos, imágenes, texturas)
```

---

## 🔄 Flujo de ejecución

1. `droneScene.js` inicializa la escena 3D con cámara, luces y objeto placeholder.
2. Se lanza un bucle de renderizado continuo (`requestAnimationFrame`).
3. `main.js` detecta la posición del scroll del usuario.
4. Anime.js ejecuta animaciones según la sección activa.
5. Los textos se sincronizan con el movimiento y la narrativa visual.

---

## 🧰 Requisitos

- Navegador moderno con soporte **WebGL** (Chrome, Firefox, Edge, Safari).
- No requiere backend.

---

## ⚡ Instalación rápida

```bash
# Clona el repositorio
git clone https://github.com/username/storkie-drn-onscroll.git
cd storkie-drn-onscroll

# Opción 1: abrir directamente
# Haz doble clic en index.html

# Opción 2: usar servidor local
npx serve .
```

---

## 🚀 Futuras mejoras

| Etapa                       | Descripción                                                                    |
| :-------------------------- | :----------------------------------------------------------------------------- |
| 🔜 Integración modelo real  | Reemplazar la esfera por `storkie-drn.glb` con materiales PBR.                 |
| 🧩 Desmontaje real          | Animar partes independientes (cámara, brazos, batería) controladas por scroll. |
| 🎚️ Scroll-timeline continua | Transiciones proporcionales al porcentaje de desplazamiento.                   |
| 🌫️ Efectos visuales         | Añadir _bloom_, sombras suaves y reflejos HDRI.                                |
| 🖥️ UI informativa           | Mostrar datos técnicos (velocidad, autonomía, peso) en overlay.                |

---

## 👨‍💻 Autor

**Pau Díaz**
Desarrollador técnico y diseñador del ecosistema **Storkie FPV**
📧 [storkie@proton.me](mailto:storkie@proton.me)

---

## 🧾 Licencia

Este proyecto está bajo la licencia **MIT**.
Consulta el archivo `LICENSE` para más detalles.

---

<p align="center">
  <sub>© 2025 Storkie FPV — Proyecto educativo y demostrativo. Todos los derechos reservados.</sub>
</p>
```

---
