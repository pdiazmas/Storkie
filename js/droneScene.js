// droneScene.js
// Escena Three.js con dron interactivo y visualización explosionada

let scene, camera, renderer, container;
let droneGroup = null;
const props = [];

// Usar buildDrone como global (window.buildDrone)
const clock = new THREE.Clock();
let activeSprites = [];

// Función para crear texto flotante con fondo
function createTextSprite(text, color = 0x00aaff) {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  canvas.width = 512;
  canvas.height = 256;

  // Fondo semi-transparente
  context.fillStyle = "rgba(0, 0, 0, 0.8)";
  context.roundRect(0, 0, canvas.width, canvas.height, 20);
  context.fill();

  // Borde con el color del componente
  context.strokeStyle = `#${color.toString(16).padStart(6, "0")}`;
  context.lineWidth = 4;
  context.roundRect(0, 0, canvas.width, canvas.height, 20);
  context.stroke();

  // Configurar estilo del texto
  context.font = "bold 32px Arial";
  context.fillStyle = "#FFFFFF";
  context.textAlign = "center";

  // Dibujar cada línea del texto
  const lines = text.split("\\n");
  const lineHeight = 40;
  lines.forEach((line, i) => {
    context.fillText(line, canvas.width / 2, 50 + i * lineHeight);
  });

  // Crear sprite
  const texture = new THREE.CanvasTexture(canvas);
  const material = new THREE.SpriteMaterial({
    map: texture,
    transparent: true,
    opacity: 0,
  });
  const sprite = new THREE.Sprite(material);
  sprite.scale.set(2, 1, 1);

  // Añadir a la lista de sprites activos
  activeSprites.push(sprite);
  return sprite;
}

// Función para limpiar sprites anteriores
function clearSprites() {
  activeSprites.forEach((sprite) => {
    if (sprite && sprite.parent) {
      sprite.parent.remove(sprite);
    }
  });
  activeSprites = [];
}

function createTextSprite(text, color = 0x00aaff) {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  canvas.width = 512;
  canvas.height = 256;

  // Configurar estilo del texto
  context.fillStyle = "#000000";
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.font = "bold 24px Arial";
  context.fillStyle = `#${color.toString(16).padStart(6, "0")}`;
  context.textAlign = "center";

  // Dibujar cada línea del texto
  const lines = text.split("\\n");
  const lineHeight = 30;
  lines.forEach((line, i) => {
    context.fillText(line, canvas.width / 2, 40 + i * lineHeight);
  });

  // Crear sprite
  const texture = new THREE.CanvasTexture(canvas);
  const material = new THREE.SpriteMaterial({
    map: texture,
    transparent: true,
    opacity: 0,
  });
  const sprite = new THREE.Sprite(material);
  sprite.scale.set(2, 1, 1);
  return sprite;
}

function createScene() {
  container = document.getElementById("canvas-container") || document.body;
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);

  const w = Math.max(300, container.clientWidth || window.innerWidth);
  const h = Math.max(200, container.clientHeight || window.innerHeight);

  camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 1000);
  camera.position.set(0, 1.8, 6);

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(w, h);
  if (renderer.outputEncoding) renderer.outputEncoding = THREE.sRGBEncoding;
  container.appendChild(renderer.domElement);

  // Sistema de iluminación avanzado
  const lights = {
    main: new THREE.DirectionalLight(0xffffff, 2.0),
    fill: new THREE.DirectionalLight(0x4477cc, 1.2),
    rim: new THREE.DirectionalLight(0xff8866, 0.8),
    ambient: new THREE.AmbientLight(0xffffff, 0.5),
    spot: new THREE.SpotLight(0xffffff, 2.0),

    // Luces específicas para cada parte
    camera: new THREE.SpotLight(0x00ffff, 0),
    motors: new THREE.SpotLight(0xff3333, 0),
    electronics: new THREE.SpotLight(0x00ff00, 0),
    frame: new THREE.RectAreaLight(0x4444ff, 0, 2, 2),
  };

  // Configuración de luz principal
  lights.main.position.set(5, 10, 7);
  lights.main.castShadow = true;
  lights.main.shadow.mapSize.width = 2048;
  lights.main.shadow.mapSize.height = 2048;
  lights.main.shadow.camera.near = 0.5;
  lights.main.shadow.camera.far = 25;
  lights.main.shadow.bias = -0.0001;

  // Configuración de luces secundarias
  lights.fill.position.set(-3, 2, 4);
  lights.rim.position.set(2, 3, -4);
  lights.spot.position.set(0, 5, 2);
  lights.spot.angle = Math.PI / 4;
  lights.spot.penumbra = 0.5;
  lights.spot.decay = 1.5;

  // Configuración de luces específicas
  lights.camera.position.set(0, 1, 2);
  lights.camera.angle = Math.PI / 6;
  lights.camera.penumbra = 0.2;
  lights.camera.distance = 3;

  lights.motors.position.set(1, 2, 0);
  lights.motors.angle = Math.PI / 4;
  lights.motors.penumbra = 0.3;
  lights.motors.distance = 4;

  lights.electronics.position.set(-1, 2, 1);
  lights.electronics.angle = Math.PI / 5;
  lights.electronics.penumbra = 0.4;
  lights.electronics.distance = 3;

  lights.frame.position.set(0, 3, 0);
  lights.frame.lookAt(0, 0, 0);

  // Añadir todas las luces a la escena
  Object.values(lights).forEach((light) => scene.add(light));

  // Guardar las luces para acceso posterior
  scene.userData.lights = lights;

  if (window.buildDrone) {
    droneGroup = window.buildDrone(props);
    scene.add(droneGroup);
  } else {
    console.error(
      "No se encontró buildDrone. Asegúrate de que droneParts.js se cargue antes que droneScene.js"
    );
  }

  window.addEventListener("resize", onWindowResize);
  animate();
}

// El dron ahora se construye usando el módulo externo

function onWindowResize() {
  const w = Math.max(300, container.clientWidth || window.innerWidth);
  const h = Math.max(200, container.clientHeight || window.innerHeight);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h);
}

function animate() {
  requestAnimationFrame(animate);
  const t = clock.getElapsedTime();

  if (droneGroup) {
    const bob = Math.sin(t * 2.0) * 0.06;
    droneGroup.position.y = (droneGroup.userData.baseY || 1.8) + bob;
    droneGroup.rotation.x = Math.sin(t * 0.5) * 0.03;
  }

  // Animar hélices y LEDs
  props.forEach((propHolder, i) => {
    propHolder.rotation.y += 0.8 + i * 0.05;
    propHolder.children.forEach((prop) => {
      // Efecto de distorsión en las hélices
      const bladeWarp = Math.sin(t * 15) * 0.1;
      prop.scale.z = 1 + bladeWarp;
    });
  });

  // Efectos de luces parpadeantes
  droneGroup.children.forEach((child) => {
    if (child.material && child.material.opacity !== undefined) {
      child.material.opacity = 0.6 + Math.sin(t * 5 + child.position.x) * 0.4;
    }
  });

  if (droneGroup) camera.lookAt(droneGroup.position);
  renderer.render(scene, camera);
}

function animateDrone(step) {
  if (!droneGroup) return;

  // Configuración de explosión y animación para cada parte
  const partConfigs = {
    camera: {
      explodeOffset: { x: 0, y: 2, z: -2 },
      rotation: { x: -0.3, y: Math.PI * 0.2, z: 0 },
      highlight: 0x00ffff,
      cameraPosition: { x: 0, y: 2.5, z: 3 },
    },
    motors: {
      explodeOffset: { x: 3, y: 0.5, z: 0 },
      rotation: { x: 0.2, y: Math.PI * 0.25, z: 0.1 },
      highlight: 0xff3333,
      cameraPosition: { x: 2, y: 2, z: 4 },
    },
    electronics: {
      explodeOffset: { x: -3, y: 1, z: 0 },
      rotation: { x: -0.2, y: -Math.PI * 0.25, z: 0 },
      highlight: 0x00ff00,
      cameraPosition: { x: -2, y: 2.5, z: 4 },
    },
    frame: {
      explodeOffset: { x: 0, y: -2, z: 0 },
      rotation: { x: 0.1, y: Math.PI, z: 0 },
      highlight: 0x00aaff,
      cameraPosition: { x: 0, y: 1, z: 5 },
    },
  };

  const presets = {
    // Vista cercana de la cámara FPV
    1: {
      x: 0,
      y: 2.0,
      z: 3.8,
      rotX: -0.2,
      rotY: 0,
      rotZ: 0,
      camOffsetZ: 0.8,
      scale: 1.5,
      emissiveIntensity: 1.0,
      focusPart: "camera",
      partOffset: { x: 0, y: 0.5, z: -0.5 },
    },
    // Vista de motores y hélices
    2: {
      x: 1.0,
      y: 2.2,
      z: 4.0,
      rotX: 0.3,
      rotY: Math.PI * 0.25,
      rotZ: 0.1,
      camOffsetZ: 2.0,
      scale: 1.2,
      emissiveIntensity: 1.5,
      focusPart: "motors",
    },
    // Vista de electrónica
    3: {
      x: -0.5,
      y: 2.4,
      z: 4.0,
      rotX: -0.4,
      rotY: -Math.PI * 0.15,
      rotZ: 0,
      camOffsetZ: 2.5,
      scale: 1.3,
      emissiveIntensity: 2.0,
      focusPart: "electronics",
    },
    // Vista del framework
    4: {
      x: 0,
      y: 2.0,
      z: 5.0,
      rotX: 0.1,
      rotY: Math.PI,
      rotZ: 0.05,
      camOffsetZ: 3.0,
      scale: 1.0,
      emissiveIntensity: 0.8,
      focusPart: "frame",
    },
    // Vista final montada
    5: {
      x: 0,
      y: 1.8,
      z: 4.0,
      rotX: 0,
      rotY: 0,
      rotZ: 0,
      camOffsetZ: 4.0,
      scale: 1.0,
      emissiveIntensity: 1.8,
      focusPart: "all",
    },
  };

  const p = presets[step] || presets[1];
  // Limpiar animaciones previas
  anime.remove(droneGroup.children);
  anime.remove([camera.position]);

  // Limpiar textos explicativos anteriores
  scene.children.forEach((child) => {
    if (child instanceof THREE.Sprite) {
      scene.remove(child);
    }
  });

  // Configurar la cámara para la parte seleccionada
  const config = p.focusPart !== "all" ? partConfigs[p.focusPart] : null;
  const cameraTarget = config
    ? {
        x: config.cameraPosition.x,
        y: config.cameraPosition.y,
        z: config.cameraPosition.z,
      }
    : {
        x: 0,
        y: 2,
        z: 6,
      };

  // Movimiento suave de cámara
  anime({
    targets: camera.position,
    x: cameraTarget.x,
    y: cameraTarget.y,
    z: cameraTarget.z,
    duration: 1500,
    easing: "easeInOutQuart",
    update: () => {
      camera.updateProjectionMatrix();
    },
  });

  // Rotación del grupo principal
  anime({
    targets: droneGroup.rotation,
    x: p.rotX,
    y: p.rotY,
    z: p.rotZ,
    duration: 1500,
    easing: "easeInOutElastic(1, .8)",
  });

  // Animar intensidad emisiva y gestionar luces específicas
  const lights = scene.userData.lights;

  // Resetear todas las luces específicas
  ["camera", "motors", "electronics", "frame"].forEach((part) => {
    lights[part].intensity = 0;
  });

  // Activar luz específica según la parte enfocada
  if (p.focusPart && p.focusPart !== "all") {
    const partLight = lights[p.focusPart];
    if (partLight) {
      anime({
        targets: partLight,
        intensity: 3.0,
        duration: 1000,
        easing: "easeOutExpo",
      });
    }
  }

  // Ajustar intensidades de luces principales según la vista
  anime({
    targets: [lights.main, lights.fill, lights.rim],
    intensity: p.focusPart === "all" ? [2.0, 1.2, 0.8] : [1.0, 0.6, 0.4],
    duration: 800,
    easing: "easeOutExpo",
  });

  // Animar materiales del dron
  droneGroup.traverse((child) => {
    if (child.material) {
      // Intensidad emisiva base
      if (child.material.emissiveIntensity !== undefined) {
        anime({
          targets: child.material,
          emissiveIntensity: p.emissiveIntensity,
          duration: 800,
          easing: "easeOutExpo",
        });
      }

      // Ajustar metalness y roughness según la parte enfocada
      if (p.focusPart && child.userData.part === p.focusPart) {
        anime({
          targets: child.material,
          metalness: 0.9,
          roughness: 0.1,
          duration: 800,
          easing: "easeOutExpo",
        });
      } else {
        anime({
          targets: child.material,
          metalness: 0.7,
          roughness: 0.3,
          duration: 800,
          easing: "easeOutExpo",
        });
      }
    }
  });
}

window.animateDrone = animateDrone;

if (document.readyState === "loading") {
  window.addEventListener("DOMContentLoaded", createScene);
} else {
  createScene();
}
