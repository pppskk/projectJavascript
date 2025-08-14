/* ABOUT: torusKnot pastel */
(() => {
  const container = document.getElementById('three-about');
  if (!container) return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 1000);
  camera.position.set(0, 0, 6);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  const geo = new THREE.TorusKnotGeometry(1.2, 0.35, 180, 32);
  const mat = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#FFC1D9'),
    emissive: new THREE.Color('#FFE9F2'),
    metalness: 0.2,
    roughness: 0.4
  });
  const mesh = new THREE.Mesh(geo, mat);
  scene.add(mesh);

  const light1 = new THREE.PointLight('#C8E4FF', 1.1, 0); light1.position.set(2, 2, 3); scene.add(light1);
  const light2 = new THREE.PointLight('#FFB3C7', 1.2, 0); light2.position.set(-3, -2, 2); scene.add(light2);
  scene.add(new THREE.AmbientLight('#ffffff', 0.6));

  let mx = 0, my = 0;
  container.addEventListener('pointermove', (e) => {
    const r = container.getBoundingClientRect();
    mx = ((e.clientX - r.left) / r.width - 0.5) * Math.PI * 0.15;
    my = ((e.clientY - r.top) / r.height - 0.5) * Math.PI * 0.15;
  });

  const clock = new THREE.Clock();
  function animate(){
    const t = clock.getElapsedTime();
    mesh.rotation.x += 0.002 + (my - mesh.rotation.x) * 0.02;
    mesh.rotation.y += 0.003 + (mx - mesh.rotation.y) * 0.02;
    mesh.position.z = Math.sin(t * 0.8) * 0.2;
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }
  animate();

  function onResize(){
    const w = container.clientWidth, h = container.clientHeight;
    camera.aspect = w/h; camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  }
  window.addEventListener('resize', onResize);
  onResize();
})();

/* GALLERY: waving plane grid pastel */
(() => {
  const container = document.getElementById('three-gallery');
  if (!container) return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(65, container.clientWidth / container.clientHeight, 0.1, 1000);
  camera.position.set(0, 1.6, 6);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  const geo = new THREE.PlaneGeometry(12, 12, 100, 100);
  const mat = new THREE.MeshBasicMaterial({ color: '#FFFFFF', wireframe: true });
  const plane = new THREE.Mesh(geo, mat);
  plane.rotation.x = -Math.PI / 2.8;
  scene.add(plane);

  const clock = new THREE.Clock();
  function animate(){
    const t = clock.getElapsedTime();
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const wave = Math.sin(t + (x * 0.6) + (y * 0.6)) * 0.12;
      pos.setZ(i, wave);
    }
    pos.needsUpdate = true;
    plane.rotation.z = Math.sin(t * 0.2) * 0.05;
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }
  animate();

  function onResize(){
    const w = container.clientWidth, h = container.clientHeight;
    camera.aspect = w/h; camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  }
  window.addEventListener('resize', onResize);
  onResize();
})();
