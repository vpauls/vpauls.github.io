<!-- File: `pages/graphics.js` -->
<script>
/* lightweight particle background + mouse parallax */
(function(){
  // create backdrop element and canvas
  const body = document.body;
  if (!document.querySelector('.site-bg')) {
    const bg = document.createElement('div');
    bg.className = 'site-bg';
    body.prepend(bg);
  }

  const canvas = document.createElement('canvas');
  canvas.id = 'bg-canvas';
  body.prepend(canvas);
  const ctx = canvas.getContext('2d', { alpha: true });

  let w = 0, h = 0, particles = [];
  const PARTICLE_COUNT = Math.max(24, Math.floor((window.innerWidth * window.innerHeight) / 90000)); // scale with size

  function resize(){
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize, { passive: true });
  resize();

  // particle constructor
  function makeParticle(i){
    return {
      x: Math.random()*w,
      y: Math.random()*h,
      r: 6 + Math.random()*10,
      vx: (Math.random()-0.5) * 0.2,
      vy: (Math.random()-0.5) * 0.2,
      hue: 180 + Math.random()*160,
      life: 0
    };
  }
  particles = new Array(PARTICLE_COUNT).fill(0).map(makeParticle);

  // animation
  let raf = null;
  function frame(t){
    ctx.clearRect(0,0,w,h);
    for (let p of particles){
      p.x += p.vx;
      p.y += p.vy;
      p.life += 0.002;
      // bounce edges gently
      if (p.x < -50) p.x = w + 50;
      if (p.x > w + 50) p.x = -50;
      if (p.y < -50) p.y = h + 50;
      if (p.y > h + 50) p.y = -50;

      // draw glow
      const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r*6);
      g.addColorStop(0, `hsla(${p.hue},85%,65%,0.12)`);
      g.addColorStop(0.25, `hsla(${p.hue},80%,60%,0.06)`);
      g.addColorStop(1, 'transparent');

      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r*4.5, 0, Math.PI*2);
      ctx.fill();
    }
    raf = requestAnimationFrame(frame);
  }
  raf = requestAnimationFrame(frame);

  // mouse parallax for blobs and avatar
  const avatar = document.querySelector('.logo .avatar');
  const pageEl = document.querySelector('.page');
  let lastMouse = {x:0,y:0};
  let rafMouse = null;

  function onMove(e){
    const x = (e.clientX / window.innerWidth - 0.5) * 18; // range
    const y = (e.clientY / window.innerHeight - 0.5) * 12;
    lastMouse = {x,y};
    if (!rafMouse){
      rafMouse = requestAnimationFrame(applyParallax);
    }
  }
  function applyParallax(){
    const dx = lastMouse.x;
    const dy = lastMouse.y;
    if (avatar){
      avatar.style.transform = `translate3d(${dx * 0.6}px, ${dy * 0.6}px, 0) rotate(${dx * 0.6}deg)`;
    }
    // nudge page pseudo-elements via CSS variables (used to drive transform)
    pageEl.style.setProperty('--gfx-mx', `${dx}px`);
    pageEl.style.setProperty('--gfx-my', `${dy}px`);
    rafMouse = null;
  }

  // throttle mouse to low frequency for performance
  let mouseThrottle = false;
  window.addEventListener('mousemove', function(e){
    if (mouseThrottle) return;
    onMove(e);
    mouseThrottle = true;
    setTimeout(()=> mouseThrottle = false, 40);
  }, { passive: true });

  // stop when page is hidden
  document.addEventListener('visibilitychange', function(){
    if (document.hidden){
      cancelAnimationFrame(raf);
    } else {
      raf = requestAnimationFrame(frame);
    }
  });

  // optional: small resize/regenerate if density changed significantly
  let lastArea = w*h;
  setInterval(()=>{
    const area = window.innerWidth * window.innerHeight;
    if (Math.abs(area - lastArea) / lastArea > 0.5){
      particles = new Array(Math.max(18, Math.floor(area/90000))).fill(0).map(makeParticle);
      lastArea = area;
    }
  }, 3000);
})();
</script>