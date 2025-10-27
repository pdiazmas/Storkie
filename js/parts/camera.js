// parts/camera.js
// Parte: cámara FPV con pivot inclinable

function createCamera() {
  // Pivot para permitir inclinación y animación
  const cameraPivot = new THREE.Group();
  cameraPivot.name = "camera";
  cameraPivot.userData = { part: "camera" };

  // Soporte de cámara (conectar al pivot)
  const supportGeo = new THREE.CylinderGeometry(0.025, 0.025, 0.12, 16);
  const supportMat = new THREE.MeshPhysicalMaterial({
    color: 0x222222,
    metalness: 0.7,
    roughness: 0.3,
    clearcoat: 0.5,
  });
  const support = new THREE.Mesh(supportGeo, supportMat);
  support.position.set(0, 0.03, 0.32);
  cameraPivot.add(support);

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
  cameraPivot.add(housing);

  // Lente avanzada
  const lensGeo = new THREE.SphereGeometry(0.04, 24, 24);
  const lensMat = new THREE.MeshPhysicalMaterial({
    color: 0x223366,
    metalness: 0.5,
    roughness: 0.08,
    clearcoat: 1,
    reflectivity: 0.9,
    transmission: 0.7,
    transparent: true,
    opacity: 0.85,
  });
  const lens = new THREE.Mesh(lensGeo, lensMat);
  lens.position.set(0, 0.05, 0.39);
  lens.userData = { part: "camera" };
  cameraPivot.add(lens);

  // Tornillos y detalles estéticos
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
    cameraPivot.add(screw);
  }

  // Ajuste inicial de inclinación para estética
  cameraPivot.rotation.x = -0.12;

  return cameraPivot;
}

window.createCamera = createCamera;
