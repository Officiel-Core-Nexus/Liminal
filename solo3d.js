// =========================
// LIMINAL – MODE SOLO 3D
// =========================

// SCENE
const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x0d0d0f, 0.03);

// CAMERA FPS
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 1.7, 0);

// RENDERER
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000);
document.body.appendChild(renderer.domElement);

// LUMIÈRE
const light = new THREE.PointLight(0xffddaa, 1, 20);
light.position.set(0, 3, 0);
scene.add(light);

// SOL
const floorGeo = new THREE.PlaneGeometry(200, 200);
const floorMat = new THREE.MeshStandardMaterial({ color: 0x111111 });
const floor = new THREE.Mesh(floorGeo, floorMat);
floor.rotation.x = -Math.PI / 2;
scene.add(floor);

// MURS COULOIR
function createWall(x, z) {
  const geo = new THREE.BoxGeometry(1, 3, 20);
  const mat = new THREE.MeshStandardMaterial({ color: 0x222222 });
  const wall = new THREE.Mesh(geo, mat);
  wall.position.set(x, 1.5, z);
  scene.add(wall);
}

createWall(-3, 0);
createWall(3, 0);

// CONTROLS FPS
let keys = {};

window.addEventListener("keydown", e => keys[e.key] = true);
window.addEventListener("keyup", e => keys[e.key] = false);

function updateMovement() {
  const speed = 0.05;

  if (keys["w"] || keys["ArrowUp"]) camera.position.z -= speed;
  if (keys["s"] || keys["ArrowDown"]) camera.position.z += speed;
  if (keys["a"] || keys["ArrowLeft"]) camera.position.x -= speed;
  if (keys["d"] || keys["ArrowRight"]) camera.position.x += speed;
}

// AMBIANCE SONORE
const listener = new THREE.AudioListener();
camera.add(listener);

const sound = new THREE.Audio(listener);
const audioLoader = new THREE.AudioLoader();

audioLoader.load("assets/ambience.mp3", buffer => {
  sound.setBuffer(buffer);
  sound.setLoop(true);
  sound.setVolume(0.4);
  sound.play();
});

// LOOP
function animate() {
  requestAnimationFrame(animate);
  updateMovement();
  renderer.render(scene, camera);
}

animate();

// RESIZE
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
