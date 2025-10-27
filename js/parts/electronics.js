// parts/electronics.js
// Parte: electrónica, PCB, batería y cables

function createElectronics() {
  const electronicsGroup = new THREE.Group();
  electronicsGroup.name = "electronics";
  electronicsGroup.userData = { part: "electronics" };
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

  // Batería LiPo con correas y conector XT60
  const batteryGeo = new THREE.BoxGeometry(0.13, 0.03, 0.05);
  const batteryMat = new THREE.MeshPhysicalMaterial({
    color: 0x111133,
    metalness: 0.6,
    roughness: 0.25,
    clearcoat: 0.6,
  });
  const battery = new THREE.Mesh(batteryGeo, batteryMat);
  battery.position.set(0, 0.045, -0.13);
  battery.userData = { part: "electronics", type: "battery" };
  electronicsGroup.add(battery);
  // Correa (visual)
  const strapGeo = new THREE.BoxGeometry(0.14, 0.008, 0.012);
  const strapMat = new THREE.MeshPhysicalMaterial({
    color: 0x222222,
    metalness: 0.6,
    roughness: 0.2,
  });
  const strap = new THREE.Mesh(strapGeo, strapMat);
  strap.position.set(0, 0.055, -0.13);
  electronicsGroup.add(strap);
  // Conector XT60
  const xtGeo = new THREE.CylinderGeometry(0.01, 0.01, 0.02, 8);
  const xtMat = new THREE.MeshPhysicalMaterial({
    color: 0xffcc00,
    metalness: 0.95,
    roughness: 0.15,
  });
  const xt = new THREE.Mesh(xtGeo, xtMat);
  xt.position.set(0.06, 0.045, -0.13);
  electronicsGroup.add(xt);

  return electronicsGroup;
}

window.createElectronics = createElectronics;
