// parts/frame.js
// Parte: chasis / frame - Estilo FPV Racing

function createFrame(props) {
  const frameGroup = new THREE.Group();
  frameGroup.name = "frame";
  frameGroup.userData = { part: "frame" };

  // Material fibra de carbono mejorado
  const carbonMat = new THREE.MeshPhysicalMaterial({
    color: 0x222222,
    metalness: 0.4,
    roughness: 0.6,
    clearcoat: 0.8,
    clearcoatRoughness: 0.3,
    reflectivity: 0.5,
  });

  // Crear el frame completo como una sola pieza
  const frameShape = new THREE.Shape();

  // Definir el contorno exterior del frame basado en las posiciones de los motores
  function createFrameOutline() {
    // Definir los puntos de los motores
    const motorPositions = [
      { x: 0.45, z: 0.28 }, // Delantero derecho
      { x: -0.45, z: 0.28 }, // Delantero izquierdo
      { x: -0.45, z: -0.28 }, // Trasero izquierdo
      { x: 0.45, z: -0.28 }, // Trasero derecho
    ];

    // Comenzar desde el centro
    frameShape.moveTo(0, 0);

    // Crear los brazos que conectan con cada motor
    motorPositions.forEach((pos, i) => {
      // Calcular el ángulo hacia el motor
      const angle = Math.atan2(pos.z, pos.x);
      const length = Math.sqrt(pos.x * pos.x + pos.z * pos.z);

      // Ancho del brazo
      const armWidth = 0.06;

      // Vectores perpendiculares para el ancho del brazo
      const perpX = -Math.sin(angle) * armWidth;
      const perpZ = Math.cos(angle) * armWidth;

      // Dibujar el brazo con ancho
      frameShape.lineTo(pos.x - perpX, pos.z - perpZ);

      // Crear el área del motor (más ancha)
      const motorMountWidth = 0.08;
      frameShape.lineTo(pos.x - perpX * 1.5, pos.z - perpZ * 1.5);
      frameShape.lineTo(pos.x + perpX * 1.5, pos.z + perpZ * 1.5);
      frameShape.lineTo(pos.x + perpX, pos.z + perpZ);

      // Volver al centro para el siguiente brazo
      frameShape.lineTo(0, 0);
    });
  }

  createFrameOutline();

  // Crear los agujeros en el frame
  const holes = [];

  // Función para crear agujeros circulares
  function createHole(x, y, radius) {
    const hole = new THREE.Path();
    hole.absarc(x, y, radius, 0, Math.PI * 2, true);
    return hole;
  }

  // Agujeros centrales (patrón de X)
  const centerHoleSize = 0.03;
  const centerDist = 0.06;

  [
    [0, 0],
    [centerDist, 0],
    [-centerDist, 0],
    [0, centerDist],
    [0, -centerDist],
  ].forEach(([x, y]) => {
    holes.push(createHole(x, y, centerHoleSize));
  });

  // Agujeros para los motores en las posiciones exactas
  const motorPositions = [
    { x: 0.45, z: 0.28 }, // Delantero derecho
    { x: -0.45, z: 0.28 }, // Delantero izquierdo
    { x: -0.45, z: -0.28 }, // Trasero izquierdo
    { x: 0.45, z: -0.28 }, // Trasero derecho
  ];

  // Crear los agujeros de montaje para cada motor
  motorPositions.forEach((pos) => {
    // Patrón de montaje M3 estándar (16x16mm)
    const mountSpacing = 0.016; // 16mm convertido a unidades Three.js

    // Crear los 4 agujeros para cada motor
    [
      [-1, -1],
      [-1, 1],
      [1, -1],
      [1, 1],
    ].forEach(([mx, my]) => {
      holes.push(
        createHole(
          pos.x + mx * mountSpacing,
          pos.z + my * mountSpacing,
          0.002 // Tamaño del agujero M3
        )
      );
    });
  });

  frameShape.holes = holes;

  // Crear la geometría del frame completo
  const frameGeo = new THREE.ExtrudeGeometry(frameShape, {
    depth: 0.004, // Más delgado para simular fibra de carbono
    bevelEnabled: true,
    bevelThickness: 0.001,
    bevelSize: 0.001,
    bevelSegments: 1,
  });

  const frameMesh = new THREE.Mesh(frameGeo, carbonMat);
  frameMesh.rotation.x = -Math.PI / 2; // Rotar para que quede horizontal
  frameMesh.position.y = 0.002;
  frameGroup.add(frameMesh);

  // Agregar rigidizadores en el centro
  const centerReinforcement = new THREE.Shape();
  centerReinforcement.moveTo(-0.1, -0.1);
  centerReinforcement.lineTo(0.1, -0.1);
  centerReinforcement.lineTo(0.1, 0.1);
  centerReinforcement.lineTo(-0.1, 0.1);
  centerReinforcement.lineTo(-0.1, -0.1);

  const reinforcementGeo = new THREE.ExtrudeGeometry(centerReinforcement, {
    depth: 0.002,
    bevelEnabled: false,
  });

  const reinforcement = new THREE.Mesh(reinforcementGeo, carbonMat);
  reinforcement.rotation.x = -Math.PI / 2; // Rotar para que coincida con el frame
  reinforcement.position.y = 0.004;
  frameGroup.add(reinforcement);

  // Placa superior (stack)
  const stackShape = new THREE.Shape();
  stackShape.moveTo(-0.12, -0.12);
  stackShape.lineTo(0.12, -0.12);
  stackShape.lineTo(0.12, 0.12);
  stackShape.lineTo(-0.12, 0.12);
  stackShape.lineTo(-0.12, -0.12);

  const stackGeo = new THREE.ExtrudeGeometry(stackShape, {
    depth: 0.02,
    bevelEnabled: true,
    bevelThickness: 0.005,
    bevelSize: 0.005,
    bevelSegments: 2,
  });

  const stack = new THREE.Mesh(stackGeo, carbonMat);
  stack.position.y = 0.1;
  stack.rotation.x = Math.PI / 2;
  frameGroup.add(stack);

  // Soportes para batería
  const batteryMount = new THREE.Group();
  const strapGeo = new THREE.BoxGeometry(0.3, 0.02, 0.02);
  const strapMat = new THREE.MeshPhysicalMaterial({
    color: 0x222222,
    roughness: 0.6,
  });

  const frontStrap = new THREE.Mesh(strapGeo, strapMat);
  const backStrap = frontStrap.clone();
  frontStrap.position.set(0, -0.05, 0.1);
  backStrap.position.set(0, -0.05, -0.1);
  batteryMount.add(frontStrap, backStrap);
  frameGroup.add(batteryMount);

  // Soportes adicionales para los motores
  const motorMountGeo = new THREE.CylinderGeometry(0.012, 0.012, 0.008, 16);

  // Crear soportes en las puntas de cada brazo
  for (let i = 0; i < 4; i++) {
    const angle = (Math.PI / 2) * i;
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);

    // Crear 4 soportes por motor
    for (let mx = -1; mx <= 1; mx += 2) {
      for (let my = -1; my <= 1; my += 2) {
        const mount = new THREE.Mesh(motorMountGeo, carbonMat);
        mount.position.set(
          cos * 0.36 + mx * 0.025 * sin,
          0.006,
          sin * 0.36 + my * 0.025 * cos
        );
        mount.rotation.x = -Math.PI / 2; // Rotar para que coincida con el frame
        frameGroup.add(mount);
      }
    }
  } // Patas de aterrizaje minimalistas estilo FPV
  const legGeo = new THREE.BoxGeometry(0.03, 0.06, 0.03);
  const legMat = new THREE.MeshPhysicalMaterial({
    color: 0x222222,
    metalness: 0.4,
    roughness: 0.6,
  });

  // Crear patas en las esquinas traseras
  [-0.3, 0.3].forEach((x) => {
    const leg = new THREE.Mesh(legGeo, legMat);
    leg.position.set(x, -0.15, -0.3);
    frameGroup.add(leg);
  });

  // No aplicamos rotación para mantener el frame completamente horizontal
  return frameGroup;
}

// expose globally
window.createFrame = createFrame;
