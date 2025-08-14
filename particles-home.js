(() => {
  const container = document.getElementById('three-home');
  if (!container) return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(65, container.clientWidth / container.clientHeight, 0.1, 1000);
  camera.position.z = 60;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  const count = 1400;
  const geom = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const palette = ['#FFD6E8', '#C8E4FF', '#D7F9F1', '#FFF7FB', '#FDEBD7'].map(c => new THREE.Color(c));

  for (let i = 0; i < count; i++) {
    const i3 = i * 3, r = 80;
    positions[i3] = (Math.random() - 0.5) * r;
    positions[i3+1] = (Math.random() - 0.5) * r;
    positions[i3+2] = (Math.random() - 0.5) * r;
    const col = palette[(Math.random() * palette.length) | 0];
    colors[i3] = col.r; colors[i3+1] = col.g; colors[i3+2] = col.b;
  }
  geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geom.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const mat = new THREE.PointsMaterial({ size: 0.6, vertexColors: true, transparent: true, opacity: 0.88, depthWrite: false });
  const points = new THREE.Points(geom, mat);
  scene.add(points);

  const mouse = { x: 0, y: 0 };
  let targetRotX = 0, targetRotY = 0;
  container.addEventListener('pointermove', (e) => {
    const rect = container.getBoundingClientRect();
    mouse.x = (e.clientX - rect.left) / rect.width * 2 - 1;
    mouse.y = (e.clientY - rect.top) / rect.height * 2 - 1;
    targetRotX = mouse.y * 0.25;
    targetRotY = mouse.x * 0.25;
  });

  const clock = new THREE.Clock();
  function tick() {
    const t = clock.getElapsedTime();
    points.rotation.y = t * 0.06;
    points.rotation.x += (targetRotX - points.rotation.x) * 0.06;
    points.rotation.z += (targetRotY - points.rotation.z) * 0.06;
    const s = 1 + Math.sin(t * 0.6) * 0.03;
    points.scale.set(s, s, s);
    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  }
  tick();

  function onResize() {
    const w = container.clientWidth, h = container.clientHeight;
    camera.aspect = w / h; camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  }
  window.addEventListener('resize', onResize);
  onResize();
})();
