// parts/motors.js
// Parte: motores, hélices y detalles

function createMotors(props) {
  const motorsGroup = new THREE.Group();
  motorsGroup.name = "motors";
  motorsGroup.userData = { part: "motors" };

  const positions = [
    [0.45, 0, 0.28],
    [-0.45, 0, 0.28],
    [0.45, 0, -0.28],
    [-0.45, 0, -0.28],
  ];
  positions.forEach((pos, i) => {
    // Motor base con detalles
    const motorGeo = new THREE.CylinderGeometry(0.07, 0.07, 0.09, 32);
    const motorMat = new THREE.MeshPhysicalMaterial({
      color: 0x888888,
      metalness: 1,
      roughness: 0.12,
      clearcoat: 0.9,
      reflectivity: 0.8,
    });
    const motor = new THREE.Mesh(motorGeo, motorMat);
    motor.position.set(pos[0], 0.09, pos[2]);
    motor.userData.part = "motors";
    motorsGroup.add(motor);

    // Tapa superior con anillo de color
    const capGeo = new THREE.CylinderGeometry(0.075, 0.075, 0.02, 32);
    const capMat = new THREE.MeshPhysicalMaterial({
      color: 0x222222,
      metalness: 0.9,
      roughness: 0.18,
      clearcoat: 0.8,
    });
    const cap = new THREE.Mesh(capGeo, capMat);
    cap.position.set(pos[0], 0.1, pos[2]);
    motorsGroup.add(cap);

    const ringGeo = new THREE.TorusGeometry(0.07, 0.006, 8, 24);
    const ringMat = new THREE.MeshPhysicalMaterial({
      color: 0x00aaff,
      metalness: 0.8,
      roughness: 0.2,
      clearcoat: 0.7,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.position.set(pos[0], 0.11, pos[2]);
    ring.rotation.x = Math.PI / 2;
    motorsGroup.add(ring);

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

    // Tornillos y ventilación
    for (let t = 0; t < 4; t++) {
      const screwGeo = new THREE.CylinderGeometry(0.008, 0.008, 0.018, 8);
      const screwMat = new THREE.MeshPhysicalMaterial({
        color: 0xaaaaaa,
        metalness: 1,
        roughness: 0.2,
      });
      const screw = new THREE.Mesh(screwGeo, screwMat);
      screw.position.set(
        pos[0] + Math.cos((t * Math.PI) / 2) * 0.055,
        0.1,
        pos[2] + Math.sin((t * Math.PI) / 2) * 0.055
      );
      motorsGroup.add(screw);
    }

    // Hélice curva translúcida
    const propHolder = new THREE.Group();
    propHolder.position.set(pos[0], 0.12, pos[2]);
    propHolder.userData = { part: "motors" };
    for (let k = 0; k < 2; k++) {
      const shape = new THREE.Shape();
      shape.moveTo(-0.04, 0);
      shape.quadraticCurveTo(0, 0.08, 0.04, 0);
      shape.lineTo(0.04, 0.01);
      shape.quadraticCurveTo(0, 0.09, -0.04, 0.01);
      shape.lineTo(-0.04, 0);
      const extrudeSettings = { steps: 1, depth: 0.012, bevelEnabled: false };
      const propGeo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
      const propMat = new THREE.MeshPhysicalMaterial({
        color: 0x99ccff,
        metalness: 0.3,
        roughness: 0.1,
        clearcoat: 0.8,
        reflectivity: 0.7,
        transmission: 0.6,
        transparent: true,
        opacity: 0.7,
      });
      const prop = new THREE.Mesh(propGeo, propMat);
      prop.rotation.z = (k * Math.PI) / 2;
      prop.scale.set(1.7, 1.7, 1);
      prop.userData = { part: "motors" };
      propHolder.add(prop);
    }
    if (props && Array.isArray(props)) props.push(propHolder);
    motorsGroup.add(propHolder);
  });
  return motorsGroup;
}

window.createMotors = createMotors;
