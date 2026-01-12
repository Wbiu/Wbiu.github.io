// footer year
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// mobile menu toggle
const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");
if (menuBtn && nav) {
  menuBtn.addEventListener("click", () => {
    const showing = getComputedStyle(nav).display !== "none";
    nav.style.display = showing ? "none" : "flex";
  });
}

// Project 1: HARD scroll-lock scrub (page stops, wheel/touch scrubs swap)
(() => {
    const section = document.getElementById("project-1");
    const block = document.getElementById("p1-media");
    if (!section || !block) return;

    const cluster = block.querySelector('.mediaItem[data-media="cluster"]');
    const tri = block.querySelector('.mediaItem[data-media="triangle"]');
    const ray = block.querySelector('.mediaItem[data-media="raytracing"]');

    const btnCluster = block.querySelector('.thumb[data-media="cluster"]');
    const btnTri = block.querySelector('.thumb[data-media="triangle"]');
    const btnRay = block.querySelector('.thumb[data-media="raytracing"]');

    if (!cluster || !tri || !ray || !btnCluster || !btnTri || !btnRay) return;

    const LOCK_ZONE = 90;     // bigger capture zone than +/-40
    const NEAR_PAD = 200;    // only arm when section is near viewport

    function wheelPixels(e) {
        let dy = e.deltaY;
        if (e.deltaMode === 1) dy *= 16;                // lines -> px (approx)
        else if (e.deltaMode === 2) dy *= innerHeight;  // pages -> px
        return dy;
    }

    function nearSection(rect) {
        return rect.bottom > -NEAR_PAD && rect.top < innerHeight + NEAR_PAD;
    }

    const root = document.documentElement;
    function instantScrollTo(y) {
        const prev = root.style.scrollBehavior;

        // prevent the topbar scroll handler from reacting to this jump
        root.classList.add("suppressTopbar");

        root.style.scrollBehavior = "auto";
        window.scrollTo(0, y);
        root.style.scrollBehavior = prev;

        requestAnimationFrame(() => root.classList.remove("suppressTopbar"));
    }

    const topbar = document.querySelector(".topbar");
    const topOffset = () => (topbar ? topbar.getBoundingClientRect().height : 0) + 8;

    const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
    const lerp = (a, b, t) => a + (b - a) * t;

    // Bigger = needs more scroll to finish the swap
    //const SCRUB_PIXELS = 3200;
    const SCRUB_PIXELS_PER_STEP = 2600; // scroll needed per “swap”
    // Card poses (no rotation)
    const FRONT = { x: 0, y: 0, s: 1.00, o: 1.00 };
    const MID = { x: 20, y: 10, s: 0.985, o: 0.70 };
    const BACK = { x: 40, y: 18, s: 0.970, o: 0.45 };
    const SLOTS = [FRONT, MID, BACK];

    // card order: 0=cluster, 1=triangle, 2=ray
    // step0: cluster front, tri mid, ray back
    // step1: tri front, ray mid, cluster back
    // step2: ray front, tri mid, cluster back
    const MAP = [
        [0, 1, 2], // step 0
        [2, 0, 1], // step 1
        [2, 1, 0], // step 2
    ];

    const cards = [
        { el: cluster, btn: btnCluster, index: 0 },
        { el: tri, btn: btnTri, index: 1 },
        { el: ray, btn: btnRay, index: 2 },
    ];

    let p = 0;              // 0 => clusters front, 1 => triangles front
    let locked = false;
    let lockedScrollY = 0;

    function poseBetween(el, t, from, to) {
        const x = lerp(from.x, to.x, t);
        const y = lerp(from.y, to.y, t);
        const s = lerp(from.s, to.s, t);
        const o = lerp(from.o, to.o, t);
        el.style.transform = `translate3d(${x}px,${y}px,0) scale(${s})`;
        el.style.opacity = String(o);
    }

    function apply() {
        const pp = clamp(p, 0, 2);
        const step = Math.min(1, Math.floor(pp));  // 0 or 1 (between 0->1 or 1->2)
        const t = pp - step;

        // Pose each card by mapping step->step+1
        for (const c of cards) {
            const aSlot = MAP[step][c.index];
            const bSlot = MAP[step + 1][c.index];
            poseBetween(c.el, t, SLOTS[aSlot], SLOTS[bSlot]);

            // depth for z-index: smaller slot index = more front
            const depth = aSlot + (bSlot - aSlot) * t;
            c.el.style.zIndex = String(100 - Math.round(depth * 10));
        }

        // Active button = whichever is closest to FRONT at this moment
        const activeIndex = Math.round(pp); // 0,1,2
        for (const c of cards) {
            const active = c.index === activeIndex;
            c.btn.classList.toggle("isActive", active);
            c.btn.setAttribute("aria-pressed", active ? "true" : "false");
        }
    }

    // Button
    let animRAF = 0;

    function stopAnim() {
        if (animRAF) cancelAnimationFrame(animRAF);
        animRAF = 0;
    }

    function animateTo(target) {
        stopAnim();
        target = clamp(target, 0, 2);
        const start = p;
        const dur = 260; // ms
        const t0 = performance.now();

        const ease = (t) => t * t * (3 - 2 * t); // smoothstep

        function step(now) {
            const t = Math.min(1, (now - t0) / dur);
            p = start + (target - start) * ease(t);
            apply();
            if (t < 1) animRAF = requestAnimationFrame(step);
            else animRAF = 0;
        }

        animRAF = requestAnimationFrame(step);
    }

    // Click: jump/tween to either state, scrolling still scrubs from there
    btnCluster.addEventListener("click", (e) => {
        e.preventDefault();
        animateTo(0); // clusters front
    });

    btnTri.addEventListener("click", (e) => {
        e.preventDefault();
        animateTo(1); // triangles front
    });

    btnRay.addEventListener("click", (e) => {
        e.preventDefault();
        animateTo(2);
    });

    function lockScroll() {
        if (locked) return;

        locked = true;
        lockedScrollY = window.scrollY;

        // prevent layout shift when scrollbar disappears
        const scrollbarW = window.innerWidth - root.clientWidth;
        root.classList.add("isScrollLocked");
        document.body.classList.add("isScrollLocked");
        if (scrollbarW > 0) document.body.style.paddingRight = `${scrollbarW}px`;
    }

    function unlockScroll() {
        if (!locked) return;

        locked = false;
        root.classList.remove("isScrollLocked");
        document.body.classList.remove("isScrollLocked");
        document.body.style.paddingRight = "";

        // keep it exact (and bypass smooth scroll)
        instantScrollTo(lockedScrollY);
    }

    window.addEventListener("latestwork:unlock", () => {
        if (locked) unlockScroll();
    }, { passive: true });

    function snapSectionUnderTopbar() {
        const rect = section.getBoundingClientRect();
        const y = topOffset();
        const target = window.scrollY + rect.top - y;

        instantScrollTo(target);   // <-- instant
        lockedScrollY = target;
    }

    // Start locking when the section reaches the topbar zone
    function shouldStartLock(dy) {
        const rect = section.getBoundingClientRect();
        if (!nearSection(rect)) return false;

        const y = topOffset();
        const top = rect.top;
        const nextTop = top - dy; // predicted next top after scroll

        const inZone = (v) => v >= (y - LOCK_ZONE) && v <= (y + LOCK_ZONE);

        if (dy > 0 && p < 2) {
            // already in zone OR will cross into zone this tick
            return inZone(top) || (top > y + LOCK_ZONE && nextTop <= y + LOCK_ZONE);
        }

        if (dy < 0 && p > 0) {
            return inZone(top) || (top < y - LOCK_ZONE && nextTop >= y - LOCK_ZONE);
        }

        return false;
    }

    function scrub(dy) {
        stopAnim(); // keep: scroll wins over click tween
        p = clamp(p + dy / SCRUB_PIXELS_PER_STEP, 0, 2);
        apply();
    }

    function onWheel(e) {
        const dy = wheelPixels(e);

        // If locked, only release when at ends
        if (locked) {
            if (dy > 0 && p >= 2) { unlockScroll(); return; }
            if (dy < 0 && p <= 0) { unlockScroll(); return; }

            if (dy > 0) topbar?.classList.add("isHidden");
            else if (dy < 0) topbar?.classList.remove("isHidden");

            e.preventDefault();
            scrub(dy);
            return;
        }

      
        if (shouldStartLock(dy)) {
            e.preventDefault();
            snapSectionUnderTopbar();
            lockScroll();
            scrub(dy);
        }
    }

    window.addEventListener("wheel", onWheel, { passive: false });

    // Touch support (mobile)
    let lastTouchY = null;

    window.addEventListener("touchstart", (e) => {
        lastTouchY = e.touches[0]?.clientY ?? null;
    }, { passive: true });

    window.addEventListener("touchmove", (e) => {
        if (lastTouchY == null) return;

        const y = e.touches[0]?.clientY ?? lastTouchY;
        const dy = lastTouchY - y; // swipe up => positive
        lastTouchY = y;

        // same logic as wheel
        if (!locked && shouldStartLock(dy)) {
            e.preventDefault();
            snapSectionUnderTopbar();
            lockScroll();
            scrub(dy);
            return;
        }

        if (locked) {
            if (dy > 0 && p >= 2) { unlockScroll(); return; }
            if (dy < 0 && p <= 0) { unlockScroll(); return; }

            if (dy > 0) topbar?.classList.add("isHidden");
            else if (dy < 0) topbar?.classList.remove("isHidden");

            e.preventDefault();
            scrub(dy);
            return;
        }
    }, { passive: false });

    window.addEventListener("touchend", () => (lastTouchY = null), { passive: true });

    apply();
})();

(() => {
  const btn = document.getElementById("toTop");
  if (!btn) return;

  const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

  const setVisible = () => {
    btn.classList.toggle("isVisible", window.scrollY > 500);
  };

  window.addEventListener("scroll", setVisible, { passive: true });
  setVisible();

  btn.addEventListener("click", () => {
    // keep topbar behavior consistent (show when going up)
    document.querySelector(".topbar")?.classList.remove("isHidden");

    // if Project 1 is currently scroll-locked, unlock it first
    window.dispatchEvent(new Event("latestwork:unlock"));

    // then go to top
    if (reduceMotion) window.scrollTo(0, 0);
    else window.scrollTo({ top: 0, behavior: "smooth" });
  });
})();



// hide topbar on scroll down, show on scroll up
const topbar = document.querySelector(".topbar");
let lastY = window.scrollY;

if (topbar) {
  window.addEventListener("scroll", () => {
    const y = window.scrollY;
    const goingDown = y > lastY;

    // small threshold to avoid jitter
    if (Math.abs(y - lastY) > 8) {
      if (goingDown && y > 60) topbar.classList.add("isHidden");
      else topbar.classList.remove("isHidden");
      lastY = y;
    }
  }, { passive: true });
}

// simple starfield (dark)
const canvas = document.getElementById("stars");
const ctx = canvas?.getContext("2d", { alpha: true });

let w=0, h=0, dpr=1;
let stars=[];
const STAR_COUNT=320;

function resize(){
  if (!canvas) return;
  dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
  w = Math.floor(innerWidth * dpr);
  h = Math.floor(innerHeight * dpr);
  canvas.width = w; canvas.height = h;
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  stars = Array.from({length: STAR_COUNT}, () => ({
    x: Math.random()*w,
    y: Math.random()*h,
    r: 0.4 + Math.random()*1.6,
    a: 0.08 + Math.random()*0.35,
    v: 0.03 + Math.random()*0.12
  }));
}
addEventListener("resize", resize);
resize();

let last = performance.now();
function tick(t){
  if (!ctx) return;
  const dt = Math.min(40, t-last); last=t;

  ctx.clearRect(0,0,w,h);

  const g = ctx.createRadialGradient(w*0.5, h*0.3, 0, w*0.5, h*0.3, Math.max(w,h)*0.7);
  g.addColorStop(0, "rgba(130,190,255,0.07)");
  g.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0,0,w,h);

  for(const s of stars){
    s.y += s.v * dt * dpr;
    if (s.y > h + 10) { s.y = -10; s.x = Math.random()*w; }
    ctx.beginPath();
    ctx.fillStyle = `rgba(220,240,255,${s.a})`;
    ctx.arc(s.x, s.y, s.r, 0, Math.PI*2);
    ctx.fill();
  }

  requestAnimationFrame(tick);
}
requestAnimationFrame(tick);
