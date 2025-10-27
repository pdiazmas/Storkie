// parts/leds.js
// Parte: LEDs RGB y efectos simples

function createLEDs(droneGroup) {
  const ledGeo = new THREE.SphereGeometry(0.018, 12, 12);
  const positions = [
    [0.45, 0.13, 0.28],
    [-0.45, 0.13, 0.28],
    [0.45, 0.13, -0.28],
    [-0.45, 0.13, -0.28],
    [0, 0.08, 0.18],
    [0, 0.08, -0.18],
  ];
  positions.forEach((pos, i) => {
    const colors = [0xff3333, 0x33ff33, 0x3333ff, 0xff00ff, 0x00ffff, 0xffff00];
    const emissives = [
      0xff0000, 0x00ff00, 0x0000ff, 0xff00ff, 0x00ffff, 0xffff00,
    ];
    const ledMat = new THREE.MeshPhysicalMaterial({
      color: colors[i % colors.length],
      metalness: 0.7,
      roughness: 0.2,
      clearcoat: 1,
      reflectivity: 0.8,
      emissive: emissives[i % emissives.length],
      emissiveIntensity: 1.2,
      transparent: true,
      opacity: 0.97,
    });
    const led = new THREE.Mesh(ledGeo, ledMat);
    led.position.set(pos[0], pos[1], pos[2]);
    led.userData = { part: "led" };
    droneGroup.add(led);
  });
}

window.createLEDs = createLEDs;
