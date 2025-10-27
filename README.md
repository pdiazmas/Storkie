---
<p align="center">
<img src="assets/img/storkie_banner.png" alt="Storkie DRN Header">
</p>

**Storkie DRN — Scroll Experience** es una experiencia web 3D interactiva que combina **animaciones controladas por scroll** y **visualización en tiempo real**.
Diseñada para presentar el dron FPV **Storkie DRN** de manera **inmersiva, fluida y visualmente impactante**.
---

## **📌 Objetivo del Proyecto**

Crear una **landing interactiva 3D** donde el usuario pueda **explorar el dron Storkie DRN** a través del desplazamiento de la página.  
El objetivo es ofrecer una **narrativa visual atractiva** que muestre las características técnicas y el diseño del dron de forma moderna y profesional.

---

## **📌 Características Principales**

🔹 **Visualización 3D en tiempo real** gracias a **Three.js**, con una escena totalmente interactiva.  
🔹 **Animaciones sincronizadas con el scroll** mediante **Anime.js**, controlando rotaciones, escalas y posiciones.  
🔹 **Narrativa visual dinámica**, donde cada sección del scroll revela una parte del dron o una característica técnica.  
🔹 **Diseño modular**, fácilmente integrable con modelos `.glb` o `.gltf` exportados desde Blender o Maya.  
🔹 **Código ligero**, sin dependencias externas, 100 % optimizado para WebGL.

---

## **📌 Tecnologías Utilizadas**

### 🟦 Three.js

Librería de renderizado 3D basada en WebGL.

- Cámara de perspectiva y sistema de iluminación ambiental.
- Placeholder actual: **esfera 3D**, que representa el dron durante la fase de prototipo.
- Preparado para materiales PBR, postprocesado y sombras dinámicas.

### 🟧 Anime.js

Framework de animación en JavaScript.

- Control de propiedades del objeto 3D (`rotation`, `position`, `scale`, `color`).
- Sincronización con desplazamiento (scroll) usando eventos `onScroll`.
- Transiciones fluidas y naturales para una experiencia cinematográfica.

### 🟨 HTML5 + CSS3 + JavaScript

- **HTML5**: estructura semántica y adaptable.
- **CSS3**: estilo oscuro, enfoque en contraste, responsive.
- **JavaScript nativo**: conexión entre Three.js, Anime.js y el scroll del usuario.

---

## **📌 Arquitectura del Proyecto**

```

storkie-drn-onscroll/
├── index.html              → punto de entrada principal
├── css/
│   └── style.css           → estilos globales
├── js/
│   ├── main.js             → control de scroll y activación de animaciones
│   └── droneScene.js       → configuración de escena, luces y objeto 3D
└── assets/
├── img/                → imágenes y banners
└── models/             → modelos 3D futuros (storkie-drn.glb)

```

---

## **📌 Flujo de Ejecución**

1️⃣ **Inicialización 3D** — `droneScene.js` crea la escena con cámara, luces y el objeto placeholder.  
2️⃣ **Render Loop** — mantiene el renderizado en tiempo real (`requestAnimationFrame`).  
3️⃣ **Detección de scroll** — `main.js` identifica la sección activa del documento.  
4️⃣ **Sincronización de animaciones** — Anime.js aplica transformaciones al dron según el scroll.  
5️⃣ **Narrativa visual** — los textos y efectos se coordinan para acompañar cada animación.

---

## **📌 Requisitos**

✔️ Navegador moderno con soporte **WebGL** (Chrome, Edge, Firefox, Safari).  
✔️ No requiere backend ni instalación.  
✔️ Compatible con pantallas Full HD y 4K.

---

## **📌 Instalación Rápida**

```bash
# Clonar el repositorio
git clone https://github.com/username/storkie-drn-onscroll.git
cd storkie-drn-onscroll

# Abrir directamente
open index.html

# O usar un servidor local
npx serve .
```

---

## **📌 Futuras Mejoras**

| **Etapa**                         | **Descripción**                                                              |
| --------------------------------- | ---------------------------------------------------------------------------- |
| 🔜 **Integración modelo real**    | Reemplazar la esfera por `storkie-drn.glb` con materiales PBR y texturas HD. |
| 🧩 **Desmontaje real**            | Animar componentes individuales (batería, cámara, brazos).                   |
| 🎚️ **Scroll-timeline continua**   | Controlar las animaciones mediante porcentaje de desplazamiento.             |
| 🌫️ **Efectos visuales avanzados** | Bloom, partículas, reflejos HDRI y postprocesado.                            |
| 🖥️ **Interfaz informativa (HUD)** | Mostrar datos técnicos del dron en tiempo real.                              |

---

## **📌 Autor**

👤 **Pau Díaz**
Desarrollador técnico y diseñador del ecosistema **Storkie FPV**
📧 [storkie@proton.me](mailto:storkie@proton.me)

---

## **📌 Licencia**

Este proyecto se distribuye bajo la licencia **MIT**, permitiendo su uso y modificación con atribución al autor original.
Consulta el archivo `LICENSE` para más información.

---

## **📌 Estado Actual del Proyecto**

🚀 **Versión 0.1** — Prototipo funcional con sistema `onScroll` operativo y escena 3D placeholder completamente integrada.
💡 Próxima versión incluirá el modelo 3D completo del **Storkie DRN** con animaciones de desmontaje y presentación técnica.

---

<p align="center">
  <sub>© 2025 Storkie FPV — Desarrollo y diseño técnico por Pau Díaz.</sub>
</p>
---
