// droneParts.js
// Construcción modular del dron para Three.js

function createFrame(props) {
  const frameGroup = new THREE.Group();
  // Chasis tubular principal (fibra de carbono)
  const tubeMat = new THREE.MeshPhysicalMaterial({
    color: 0x222222,
    metalness: 0.8,
    roughness: 0.25,
    clearcoat: 0.7,
    reflectivity: 0.5,
  });
  // Tubo central
  const tubeGeo = new THREE.CylinderGeometry(0.13, 0.13, 0.8, 32);
  const tube = new THREE.Mesh(tubeGeo, tubeMat);
  tube.rotation.z = Math.PI / 2;
  frameGroup.add(tube);
  // Refuerzos diagonales
  for (let i = -1; i <= 1; i += 2) {
    const diagGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.7, 24);
    const diag = new THREE.Mesh(diagGeo, tubeMat);
    diag.position.set(i * 0.25, 0, 0);
    diag.rotation.z = (Math.PI / 2.5) * i;
    frameGroup.add(diag);
  }
  // Placa base (fibra de carbono)
  const baseGeo = new THREE.BoxGeometry(0.5, 0.04, 0.35);
  const baseMat = new THREE.MeshPhysicalMaterial({
    color: 0x222222,
    metalness: 0.7,
    roughness: 0.2,
    clearcoat: 0.5,
    reflectivity: 0.3,
  });
  const base = new THREE.Mesh(baseGeo, baseMat);
  base.position.y = -0.07;
  frameGroup.add(base);
  return frameGroup;
}

function createCamera() {
  const cameraGroup = new THREE.Group();
  // Soporte de cámara
  const supportGeo = new THREE.CylinderGeometry(0.025, 0.025, 0.12, 16);
  const supportMat = new THREE.MeshPhysicalMaterial({
    color: 0x222222,
    metalness: 0.7,
    roughness: 0.3,
    clearcoat: 0.5,
  });
  const support = new THREE.Mesh(supportGeo, supportMat);
  support.position.set(0, 0.03, 0.32);
  cameraGroup.add(support);
  // Carcasa de cámara
  const housingGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.09, 32);
  const housingMat = new THREE.MeshPhysicalMaterial({
    color: 0x222222,
    metalness: 0.9,
    roughness: 0.15,
    clearcoat: 0.7,
    reflectivity: 0.6,
  });
  const housing = new THREE.Mesh(housingGeo, housingMat);
  housing.rotation.x = Math.PI / 2;
  housing.position.set(0, 0.05, 0.35);
  cameraGroup.add(housing);
  // Lente avanzada
  const lensGeo = new THREE.SphereGeometry(0.04, 24, 24);
  const lensMat = new THREE.MeshPhysicalMaterial({
    color: 0x2222ff,
    metalness: 0.5,
    roughness: 0.1,
    clearcoat: 1,
    reflectivity: 0.9,
    transmission: 0.7,
    transparent: true,
    opacity: 0.8,
  });
  const lens = new THREE.Mesh(lensGeo, lensMat);
  lens.position.set(0, 0.05, 0.39);
  cameraGroup.add(lens);
  // Detalles de tornillos
  for (let i = 0; i < 4; i++) {
    const screwGeo = new THREE.CylinderGeometry(0.008, 0.008, 0.02, 8);
    const screwMat = new THREE.MeshPhysicalMaterial({
      color: 0xaaaaaa,
      metalness: 1,
      roughness: 0.2,
    });
    const screw = new THREE.Mesh(screwGeo, screwMat);
    screw.position.set(
      Math.cos((i * Math.PI) / 2) * 0.045,
      0.03,
      0.35 + Math.sin((i * Math.PI) / 2) * 0.045
    );
    cameraGroup.add(screw);
  }
  return cameraGroup;
}

function createMotors(props) {
  const motorsGroup = new THREE.Group();
  const positions = [
    [0.45, 0, 0.28],
    [-0.45, 0, 0.28],
    [0.45, 0, -0.28],
    [-0.45, 0, -0.28],
  ];
  positions.forEach((pos, i) => {
    // Motor base
    const motorGeo = new THREE.CylinderGeometry(0.07, 0.07, 0.09, 32);
    const motorMat = new THREE.MeshPhysicalMaterial({
      color: 0x888888,
      metalness: 1,
      roughness: 0.15,
      clearcoat: 0.8,
      reflectivity: 0.7,
    });
    const motor = new THREE.Mesh(motorGeo, motorMat);
    motor.position.set(pos[0], 0.09, pos[2]);
    motor.userData.part = "motors";
    motorsGroup.add(motor);
    // Tapa superior
    const capGeo = new THREE.CylinderGeometry(0.075, 0.075, 0.02, 32);
    const capMat = new THREE.MeshPhysicalMaterial({
      color: 0x222222,
      metalness: 0.9,
      roughness: 0.2,
      clearcoat: 0.7,
    });
    const cap = new THREE.Mesh(capGeo, capMat);
    cap.position.set(pos[0], 0.1, pos[2]);
    motorsGroup.add(cap);
    // Bobinas de cobre
    for (let j = 0; j < 6; j++) {
      const coilGeo = new THREE.TorusGeometry(0.045, 0.008, 8, 16);
      const coilMat = new THREE.MeshPhysicalMaterial({
        color: 0xffa500,
        metalness: 1,
        roughness: 0.1,
      });
      const coil = new THREE.Mesh(coilGeo, coilMat);
      coil.position.set(pos[0], 0.09, pos[2]);
      coil.rotation.x = Math.PI / 2;
      coil.rotation.z = (Math.PI * 2 * j) / 6;
      motorsGroup.add(coil);
    }
    // Hélice curva
    const propHolder = new THREE.Group();
    propHolder.position.set(pos[0], 0.12, pos[2]);
    propHolder.userData.part = "motors";
    // Palas curvas
    for (let k = 0; k < 2; k++) {
      const shape = new THREE.Shape();
      shape.moveTo(-0.04, 0);
      shape.quadraticCurveTo(0, 0.08, 0.04, 0);
      shape.lineTo(0.04, 0.01);
      shape.quadraticCurveTo(0, 0.09, -0.04, 0.01);
      shape.lineTo(-0.04, 0);
      const extrudeSettings = {
        steps: 1,
        depth: 0.01,
        bevelEnabled: false,
      };
      const propGeo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
      const propMat = new THREE.MeshPhysicalMaterial({
        color: 0x222222,
        metalness: 0.7,
        roughness: 0.2,
        clearcoat: 0.6,
        reflectivity: 0.5,
        transparent: true,
        opacity: 0.95,
      });
      const prop = new THREE.Mesh(propGeo, propMat);
      prop.rotation.z = (k * Math.PI) / 2;
      prop.scale.set(1.7, 1.7, 1);
      prop.userData.part = "motors";
      propHolder.add(prop);
      if (props) props.push(propHolder);
    }
    motorsGroup.add(propHolder);
  });
  return motorsGroup;
}

function createElectronics() {
  const electronicsGroup = new THREE.Group();
  // PCB principal
  const pcbGeo = new THREE.BoxGeometry(0.22, 0.01, 0.18);
  const pcbMat = new THREE.MeshPhysicalMaterial({
    color: 0x006600,
    metalness: 0.3,
    roughness: 0.7,
    reflectivity: 0.2,
  });
  const pcb = new THREE.Mesh(pcbGeo, pcbMat);
  pcb.position.set(0, 0.02, 0);
  electronicsGroup.add(pcb);
  // Chips y componentes
  for (let i = 0; i < 4; i++) {
    const chipGeo = new THREE.BoxGeometry(0.04, 0.008, 0.03);
    const chipMat = new THREE.MeshPhysicalMaterial({
      color: 0x222222,
      metalness: 0.7,
      roughness: 0.3,
    });
    const chip = new THREE.Mesh(chipGeo, chipMat);
    chip.position.set(-0.07 + i * 0.045, 0.025, 0.04);
    electronicsGroup.add(chip);
  }
  // Cables
  for (let j = 0; j < 3; j++) {
    const cableGeo = new THREE.CylinderGeometry(0.004, 0.004, 0.13, 8);
    const cableMat = new THREE.MeshPhysicalMaterial({
      color: 0xff0000 - j * 0x330000,
      metalness: 0.5,
      roughness: 0.6,
    });
    const cable = new THREE.Mesh(cableGeo, cableMat);
    cable.position.set(-0.04 + j * 0.04, 0.018, -0.07);
    cable.rotation.z = Math.PI / 2.2;
    electronicsGroup.add(cable);
  }
  return electronicsGroup;
}

function createLEDs(droneGroup) {
  const ledGeo = new THREE.SphereGeometry(0.018, 12, 12);
  const positions = [
    [0.45, 0.13, 0.28],
    [-0.45, 0.13, 0.28],
    [0.45, 0.13, -0.28],
    [-0.45, 0.13, -0.28],
  ];
  positions.forEach((pos, i) => {
    const ledMat = new THREE.MeshPhysicalMaterial({
      color: i % 2 === 0 ? 0xff3333 : 0x33ff33,
      metalness: 0.7,
      roughness: 0.2,
      clearcoat: 1,
      reflectivity: 0.8,
      emissive: i % 2 === 0 ? 0xff0000 : 0x00ff00,
      emissiveIntensity: 0.7,
      transparent: true,
      opacity: 0.95,
    });
    const led = new THREE.Mesh(ledGeo, ledMat);
    led.position.set(pos[0], pos[1], pos[2]);
    droneGroup.add(led);
  });
}

function buildDrone(props) {
  const droneGroup = new THREE.Group();
  // Añadir partes mejoradas
  droneGroup.add(createFrame(props));
  droneGroup.add(createCamera());
  droneGroup.add(createMotors(props));
  droneGroup.add(createElectronics());
  createLEDs(droneGroup);
  droneGroup.userData = { baseY: 1.8 };
  droneGroup.position.set(0, droneGroup.userData.baseY, 4);
  return droneGroup;
}

// Asignar funciones al objeto global para compatibilidad
window.createFrame = createFrame;
window.createCamera = createCamera;
window.createMotors = createMotors;
window.createElectronics = createElectronics;
window.createLEDs = createLEDs;
window.buildDrone = buildDrone;
