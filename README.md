Perfecto ⚙️
Aquí tienes el **README.md profesional y totalmente listo para copiar y pegar directamente en tu repositorio GitHub**.
Incluye badges, secciones visuales, estructura limpia y tono técnico-corporativo.

---

````markdown
# 🛩️ **Storkie DRN — Scroll Experience (Demo Interactiva)**

> Experiencia web 3D basada en _scroll_ que presenta y desmonta el dron FPV **Storkie DRN** de forma interactiva.  
> Desarrollado con **Three.js** + **Anime.js**, esta demo sienta las bases del futuro _showcase_ visual del modelo real.

---

![GitHub last commit](https://img.shields.io/github/last-commit/username/storkie-drn-onscroll?color=00aaff)
![Status](https://img.shields.io/badge/status-prototype-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Tech](https://img.shields.io/badge/Tech-Three.js%20%7C%20Anime.js%20%7C%20HTML5%20%7C%20CSS3-yellow)

---

## 📸 **Vista general**

Esta versión de demostración combina una escena 3D renderizada en tiempo real con animaciones controladas por desplazamiento (_onScroll_).  
Mientras el usuario navega hacia abajo:

- Un objeto 3D (actualmente una **esfera placeholder**) simula el **dron FPV Storkie DRN**.
- Cada sección activa una animación diferente:
  - 🔁 Rotación estructural
  - ⬆️ Elevación
  - 🔍 Zoom / Escalado
  - 🎨 Cambio de color
- El texto de las secciones aparece en sincronía con los movimientos del dron, creando una experiencia inmersiva.

---

## 🧠 **Tecnologías utilizadas**

### 🟦 **Three.js**

> Librería 3D de JavaScript para visualización en tiempo real dentro del navegador.

- Renderizado mediante **WebGL** sin dependencias externas.
- Configuración de cámara, luces y materiales PBR.
- El objeto 3D actual es una **esfera** que servirá como plantilla para integrar el modelo real (`.glb` / `.gltf`).
- Permite reemplazar fácilmente la geometría por el dron completo Storkie DRN exportado desde **Blender**, **Maya** o **Cinema 4D**.

---

### 🟧 **Anime.js**

> Framework de animación ligera para transiciones suaves y controladas por eventos.

- Coordina las transformaciones del objeto 3D (`rotation`, `position`, `scale`, `color`).
- Gestiona la aparición de texto con efectos _fade-in / fade-out_.
- El evento principal **`onScroll`** dispara animaciones de forma secuencial según la posición del usuario en la página.

Ejemplo de uso:

```js
anime({
  targets: dronePlaceholder.rotation,
  y: [0, Math.PI / 2],
  duration: 1500,
  easing: "easeInOutSine",
});
```
````

---

### 🟨 **HTML5, CSS3 y JavaScript nativo**

> Base del proyecto y del sistema de scroll.

- **HTML5:** estructura semántica y adaptable.
- **CSS3:** diseño limpio, fondo oscuro y tipografía moderna para máximo contraste visual.
- **JavaScript:** vincula Anime.js y Three.js, controla eventos de scroll y render loop.

---

## ⚙️ **Arquitectura del proyecto**

```
storkie-drn-onscroll/
├── index.html              # Punto de entrada principal
├── css/
│   └── style.css           # Estilos generales
├── js/
│   ├── main.js             # Control del scroll y activación de animaciones
│   └── droneScene.js       # Configuración de la escena 3D (Three.js)
└── assets/                 # Modelos 3D y recursos futuros
```

---

## 🧩 **Flujo de ejecución**

1. `droneScene.js` inicializa la escena Three.js (cámara, luces, esfera 3D).
2. `main.js` detecta la posición de scroll y determina qué sección está activa.
3. Anime.js aplica las animaciones correspondientes al objeto 3D.
4. Las secciones de texto cambian de opacidad para sincronizar la narrativa.
5. Todo ocurre en un único ciclo de renderizado con **rendimiento en tiempo real**.

---

## 🧰 **Requisitos**

- Navegador moderno compatible con **WebGL** (Chrome, Edge, Firefox, Safari).
- No requiere backend ni instalación adicional.

### 🔧 Opción 1 — Abrir directamente

Simplemente abre `index.html` en tu navegador.

### 💻 Opción 2 — Servidor local (recomendado)

```bash
# Instalar un servidor de desarrollo
npm install -g serve

# Ejecutar en el puerto por defecto
serve .
```

---

## 🚀 **Futuras mejoras**

| Etapa                           | Descripción                                                               |
| ------------------------------- | ------------------------------------------------------------------------- |
| 🔜 **Integración modelo real**  | Reemplazar la esfera por `storkie-drn.glb` con materiales PBR.            |
| 🧩 **Desmontaje real**          | Animar las piezas del dron (cámara, brazos, batería) al hacer scroll.     |
| 🎚️ **Scroll-timeline continua** | Transiciones fluidas dependientes del porcentaje de scroll.               |
| 🌫️ **Efectos visuales**         | Añadir _bloom_, sombras suaves y reflejos HDRI.                           |
| 🖥️ **UI informativa**           | Mostrar datos técnicos (velocidad, autonomía, peso) como HUD interactivo. |

---

## 👨‍💻 **Autor**

**Pau Díaz**
Desarrollador técnico y diseñador del ecosistema **Storkie FPV**
📧 [storkie@proton.me](mailto:storkie@proton.me)

---

## 🧾 **Licencia**

Este proyecto se distribuye bajo licencia **MIT**, permitiendo su uso y modificación con atribución al autor original.

---

### 🏁 **Estado actual**

> **Versión 0.1** — prototipo funcional con sistema `onScroll` y animación 3D placeholder completamente operativa.

```

---

```
