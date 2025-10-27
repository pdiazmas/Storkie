<p align="center">
  <img src="assets/img/storkie_banner.png" alt="Storkie DRN Header" width="100%">
</p>

<h1 align="center">🛩️ Storkie DRN — Scroll Experience</h1>
<p align="center">
  Una experiencia web 3D interactiva que presenta el dron FPV <b>Storkie DRN</b> mediante <b>animaciones sincronizadas con scroll</b> y visualización en tiempo real con <b>Three.js</b> y <b>Anime.js</b>.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/status-prototype-blue?style=for-the-badge&logo=github" />
  <img src="https://img.shields.io/badge/license-MIT-green?style=for-the-badge" />
  <img src="https://img.shields.io/badge/framework-Three.js-black?style=for-the-badge&logo=three.js" />
  <img src="https://img.shields.io/badge/animation-Anime.js-fb7299?style=for-the-badge" />
  <img src="https://img.shields.io/badge/frontend-HTML5%20%7C%20CSS3%20%7C%20JS-yellow?style=for-the-badge" />
</p>

---

## 📖 **Descripción general**

**Storkie DRN Scroll Experience** es una _landing page interactiva_ que fusiona arte y tecnología.  
A medida que el usuario hace **scroll**, el dron FPV se **anima, rota y se desmonta visualmente**, revelando sus características técnicas de forma cinematográfica.

La experiencia combina:

- 🎮 **Renderizado 3D en tiempo real** con Three.js.
- 🌀 **Animaciones fluidas y sincronizadas** con Anime.js.
- 🧠 **Narrativa visual por secciones**, creando un recorrido inmersivo.
- ⚡ **Diseño modular y optimizado**, sin dependencias externas.

---

## 🚀 **Objetivo del Proyecto**

Crear una **experiencia visual inmersiva** que muestre la tecnología detrás del **dron FPV Storkie DRN**, combinando diseño, ingeniería y storytelling digital.

> “No es solo un dron, es una experiencia que cobra vida con el scroll.”

---

## 🧠 **Tecnologías Utilizadas**

| Tecnología                       | Descripción                                                                                                   |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| 🟦 **Three.js**                  | Librería de renderizado 3D con WebGL. Permite mostrar el dron en un entorno tridimensional interactivo.       |
| 🟧 **Anime.js**                  | Framework de animaciones suaves y precisas. Controla la rotación, escala y posición del dron según el scroll. |
| 🟨 **HTML5 + CSS3 + JavaScript** | Estructura, estilo y lógica principal del proyecto. Totalmente adaptable y optimizado.                        |

---

## 🧩 **Arquitectura del Proyecto**

```

storkie-drn-onscroll/
├── index.html              → página principal
├── css/
│   └── style.css           → estilos globales
├── js/
│   ├── main.js             → control del scroll y animaciones
│   └── droneScene.js       → escena 3D y lógica Three.js
└── assets/
├── img/                → imágenes y banner
└── models/             → modelo 3D del dron (futuro)

```

---

## ⚙️ **Flujo de Ejecución**

1️⃣ **Inicialización de la escena 3D** → Se crea cámara, luces y el dron (placeholder).  
2️⃣ **Bucle de renderizado continuo** → Se renderiza la animación en tiempo real.  
3️⃣ **Detección de scroll** → `main.js` calcula la posición del usuario.  
4️⃣ **Sincronización** → Anime.js ejecuta animaciones según la sección activa.  
5️⃣ **Narrativa interactiva** → Los textos y efectos visuales acompañan al usuario.

---

## 🧰 **Requisitos**

- Navegador moderno compatible con **WebGL**.
- No requiere instalación ni backend.
- Resolución recomendada: **1920×1080 o superior**.

---

## ⚡ **Instalación Rápida**

```bash
# Clonar el repositorio
git clone https://github.com/username/storkie-drn-onscroll.git
cd storkie-drn-onscroll

# Abrir directamente en el navegador
open index.html

# O usar servidor local
npx serve .
```

---

## 💎 **Futuras Mejoras**

| Fase                          | Descripción                                                               |
| ----------------------------- | ------------------------------------------------------------------------- |
| 🔜 **Modelo real**            | Integrar `storkie-drn.glb` exportado desde Blender con materiales PBR.    |
| 🧩 **Desmontaje interactivo** | Separar partes del dron (batería, cámara, hélices) con scroll progresivo. |
| 🎚️ **Scroll continuo**        | Controlar animaciones por porcentaje exacto del desplazamiento.           |
| 🌫️ **Efectos visuales**       | Añadir postprocesado, bloom y reflejos HDRI.                              |
| 🖥️ **HUD técnico**            | Mostrar datos del dron: velocidad, autonomía, consumo energético.         |

---

## 👨‍💻 **Autor**

**Pau Díaz**
Desarrollador técnico y diseñador del ecosistema **Storkie FPV**
📧 [storkie@proton.me](mailto:storkie@proton.me)

<p align="center">
  <a href="https://github.com/username">
    <img src="https://img.shields.io/badge/Created_by-Pau_Díaz-00aaff?style=for-the-badge&logo=github" />
  </a>
</p>

---

## 🧾 **Licencia**

Este proyecto se distribuye bajo la licencia **MIT**, permitiendo su uso, modificación y redistribución con atribución al autor original.
Consulta el archivo `LICENSE` para más detalles.

---

<p align="center">
  <sub>© 2025 Storkie FPV — Diseño y desarrollo por Pau Díaz.</sub>
</p>
```
