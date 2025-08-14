/* Smooth nav */
document.querySelectorAll('.nav-links a').forEach(a=>{
  a.addEventListener('click', e=>{
    const id = a.getAttribute('href');
    if (id && id.startsWith('#')) {
      e.preventDefault();
      document.querySelector(id)?.scrollIntoView({behavior:'smooth', block:'start'});
    }
  });
});

/* Reveal on Scroll */
const io = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      io.unobserve(entry.target);
    }
  });
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

/* Subtle Tilt on .tilt cards */
document.querySelectorAll('.tilt').forEach(card=>{
  let rafId = 0;
  const maxDeg = 8;
  function onMove(e){
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    const rotX = (0.5 - y) * maxDeg;
    const rotY = (x - 0.5) * maxDeg;
    cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(()=>{ card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg)`; });
  }
  function reset(){ card.style.transform = 'perspective(800px) rotateX(0) rotateY(0)' }
  card.addEventListener('pointermove', onMove);
  card.addEventListener('pointerleave', reset);
});

/* Mousemove parallax for elements with .depth-* (works every section) */
const depthEls = document.querySelectorAll('.depth-1, .depth-2, .depth-3, .picon');
let mouseX = 0, mouseY = 0;
window.addEventListener('pointermove', (e)=>{
  const cx = window.innerWidth / 2;
  const cy = window.innerHeight / 2;
  mouseX = (e.clientX - cx) / cx;
  mouseY = (e.clientY - cy) / cy;

  depthEls.forEach(el=>{
    const d = el.classList.contains('depth-3') ? 12 : el.classList.contains('depth-2') ? 8 : 4;
    el.style.transform = `translate3d(${mouseX * d}px, ${mouseY * d}px, 0)`;
  });
});

/* Experience floating icons random positions */
(function placeIcons(){
  const area = document.querySelector('#experience .parallax-icons');
  if (!area) return;
  const icons = area.querySelectorAll('.picon');
  icons.forEach((icon,i)=>{
    const x = Math.random() * 80 + 10; // 10–90 vw
    const y = Math.random() * 60 + 10; // 10–70 vh
    icon.style.left = x + 'vw';
    icon.style.top  = y + 'vh';
  });
})();

/* Gallery modal zoom */
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modal-img');
const modalCap = document.getElementById('modal-cap');
const closeBtn = document.querySelector('.modal-close');
document.querySelectorAll('.gallery-item').forEach(item=>{
  const img = item.querySelector('img');
  item.addEventListener('click', ()=>{
    modalImg.src = img.src;
    modalCap.textContent = item.querySelector('figcaption')?.textContent || '';
    modal.classList.add('show');
  });
});
closeBtn.addEventListener('click', ()=> modal.classList.remove('show'));
modal.addEventListener('click', (e)=>{ if (e.target === modal) modal.classList.remove('show'); });

/* SKILLS: 2D Bubble particles (canvas) */
(function(){
  const canvas = document.getElementById('skills-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  function resize(){ canvas.width = canvas.clientWidth; canvas.height = canvas.clientHeight; }
  const parent = canvas.parentElement;
  const ro = new ResizeObserver(resize); ro.observe(parent); resize();

  const colors = ['#FFB6C1','#C8E4FF','#D7F9F1','#FFE6C9','#EBD4FF'];
  const bubbles = [];
  const N = 70;
  for (let i=0;i<N;i++) {
    bubbles.push({
      x: Math.random()*canvas.width,
      y: Math.random()*canvas.height,
      r: Math.random()*6+2,
      vx: (Math.random()-.5)*0.4,
      vy: Math.random()*.8 + .2,
      c: colors[(Math.random()*colors.length)|0],
      a: Math.random()*0.5 + 0.4
    });
  }
  function step(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    bubbles.forEach(b=>{
      ctx.beginPath();
      ctx.globalAlpha = b.a;
      ctx.fillStyle = b.c;
      ctx.arc(b.x, b.y, b.r, 0, Math.PI*2);
      ctx.fill();
      b.y -= b.vy; b.x += b.vx;
      if (b.y < -10) { b.y = canvas.height + 10; b.x = Math.random()*canvas.width; }
      if (b.x < -10) b.x = canvas.width + 10;
      if (b.x > canvas.width + 10) b.x = -10;
    });
    ctx.globalAlpha = 1;
    requestAnimationFrame(step);
  }
  
  step();
})();

