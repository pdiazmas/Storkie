// buildDrone.js
// Agrega las partes y construye el dron completo usando las funciones globales

function buildDrone(props) {
  const droneGroup = new THREE.Group();
  droneGroup.name = "drone";
  // crear y añadir frame
  if (window.createFrame) droneGroup.add(window.createFrame(props));
  // crear y añadir camera pivot
  if (window.createCamera) droneGroup.add(window.createCamera());
  // crear y añadir motores (pasar el array props para hélices)
  if (window.createMotors) droneGroup.add(window.createMotors(props));
  // electrónica
  if (window.createElectronics) droneGroup.add(window.createElectronics());
  // LEDs
  if (window.createLEDs) window.createLEDs(droneGroup);

  droneGroup.userData = { baseY: 1.8 };
  droneGroup.position.set(0, droneGroup.userData.baseY, 4);
  return droneGroup;
}

window.buildDrone = buildDrone;
