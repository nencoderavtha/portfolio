/* ============================================================
   home.js — Kinetic homepage motion (Exter)
   Loaded AFTER script.js. Uses the global gsap + ScrollTrigger
   that script.js already registers, and rides the same Lenis
   smooth-scroll (ScrollTrigger.update is wired to Lenis there).
   Everything is progressive-enhancement: if gsap is missing or
   the user prefers reduced motion, content is simply shown.
   ============================================================ */
(() => {
  const root = document.querySelector('.xk-home');
  if (!root) return;

  function init() {
    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    
    // Wait for GSAP CDN to load if Vite executes this module too early
    if (!gsap || !ScrollTrigger) {
      setTimeout(init, 50);
      return;
    }
    
    const hasGsap = true;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // --- Always-on: reveal-on-scroll via IntersectionObserver (robust) ---
  const reveals = document.querySelectorAll('.xk-reveal');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    reveals.forEach((el) => el.classList.add('is-in'));
  } else {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.18, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach((el) => io.observe(el));
  }

  if (!hasGsap || reduceMotion) return; // motion layer below is enhancement only

  gsap.registerPlugin(ScrollTrigger);

  // ---------------------------------------------------------
  // 1. Hero entrance — giant lines wipe up after the intro curtain
  // ---------------------------------------------------------
  const heroLines = gsap.utils.toArray('.xk-hero__type .xk-line');
  if (heroLines.length) {
    gsap.fromTo(
      heroLines,
      { yPercent: 120, opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        duration: 1.1,
        ease: 'power4.out',
        stagger: 0.12,
        delay: 1.65, // begins as the intro curtain lifts
      }
    );
  }

  // hero lead + cue gentle fade in
  gsap.from('.xk-hero__lead, .xk-cue', {
    opacity: 0,
    y: 24,
    duration: 0.9,
    ease: 'power2.out',
    delay: 2.3,
    stagger: 0.1,
  });

  // ---------------------------------------------------------
  // 2. Scroll parallax — each component drifts at its OWN speed,
  //    so they separate into depth layers as you scroll (the
  //    reference feel). A smooth `scrub` lag gives the weighty glide.
  // ---------------------------------------------------------
  const SCRUB = 1.2; // higher = heavier/glide-ier catch-up

  const parallax = (sel, fromY, toY, opts = {}) => {
    const el = typeof sel === 'string' ? document.querySelector(sel) : sel;
    if (!el) return;
    gsap.fromTo(
      el,
      { y: fromY, rotation: opts.fromRot || 0 },
      {
        y: toY,
        rotation: opts.toRot || 0,
        ease: 'none',
        scrollTrigger: {
          trigger: opts.trigger || '.xk-hero',
          start: opts.start || 'top bottom',
          end: opts.end || 'bottom top',
          scrub: opts.scrub != null ? opts.scrub : SCRUB,
          invalidateOnRefresh: true,
        },
      }
    );
  };

  // HERO — character = foreground (fastest); objects = mid depths
  // (each different); giant type = furthest back (slowest).
  const H = { trigger: '.xk-hero', start: 'top top', end: 'bottom top' };
  parallax('.xk-hero__char', 0, -300, { ...H, toRot: -4 });
  parallax('.xk-float--b', 0, -250, { ...H, toRot: -9 });
  parallax('.xk-float--c', 0, -190, { ...H, toRot: 6 });
  parallax('.xk-float--a', 0, -120, { ...H, toRot: 7 });
  parallax('.xk-hero__type', 0, -80, H);

  // STATEMENT — copy and showreel badge travel at different rates
  parallax('.xk-statement__text', 80, -80, { trigger: '.xk-statement' });
  parallax('.xk-showreel', 150, -170, { trigger: '.xk-statement' });

  // CTA — closing character is foreground (fast), type sits behind (slow)
  parallax('.xk-cta__char', 130, -160, { trigger: '.xk-cta', toRot: -3 });
  parallax('.xk-cta__type', 70, -70, { trigger: '.xk-cta' });

  // Gentle idle bob on the float art — target the INNER element so it
  // never fights the scroll-parallax tween that owns the wrapper's `y`.
  gsap.utils.toArray('.xk-float').forEach((el, i) => {
    const inner = el.firstElementChild || el;
    gsap.to(inner, {
      y: '+=16',
      duration: 3 + i * 0.7,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    });
  });

  // ---------------------------------------------------------
  // 3. Giant WORK title drifts horizontally as the section scrolls
  // ---------------------------------------------------------
  const workTitle = document.querySelector('.xk-work__title');
  if (workTitle) {
    gsap.fromTo(
      workTitle,
      { xPercent: -10 },
      {
        xPercent: 8,
        ease: 'none',
        scrollTrigger: {
          trigger: '.xk-work',
          start: 'top bottom',
          end: 'bottom top',
          scrub: SCRUB,
          invalidateOnRefresh: true,
        },
      }
    );
  }

  // ---------------------------------------------------------
  // 4. Work list — round "VIEW" badge follows the cursor on hover
  // ---------------------------------------------------------
  const cursor = document.querySelector('.xk-cursor');
  const rows = gsap.utils.toArray('.xk-work__row');
  const finePointer = window.matchMedia('(hover: hover)').matches;

  if (cursor && rows.length && finePointer) {
    const cxTo = gsap.quickTo(cursor, 'x', { duration: 0.25, ease: 'power3' });
    const cyTo = gsap.quickTo(cursor, 'y', { duration: 0.25, ease: 'power3' });

    let active = false;
    const move = (e) => {
      if (!active) return;
      cxTo(e.clientX);
      cyTo(e.clientY);
    };
    window.addEventListener('pointermove', move, { passive: true });

    rows.forEach((row) => {
      row.addEventListener('pointerenter', (e) => {
        active = true;
        // jump badge to pointer before showing (avoids fly-in from corner)
        gsap.set(cursor, { x: e.clientX, y: e.clientY });
        cursor.classList.add('is-active');
      });
      row.addEventListener('pointerleave', () => {
        active = false;
        cursor.classList.remove('is-active');
        // Instantly snap badge off-screen to prevent drift
        gsap.set(cursor, { x: -9999, y: -9999 });
      });
    });

    // Safety net: kill badge if mouse leaves the entire work section
    const workSection = document.querySelector('.xk-work');
    if (workSection) {
      workSection.addEventListener('pointerleave', () => {
        active = false;
        cursor.classList.remove('is-active');
        gsap.set(cursor, { x: -9999, y: -9999 });
      });
    }
  }

  // ---------------------------------------------------------
  // 5. CTA — hand-drawn ellipse strokes around the email on enter
  // ---------------------------------------------------------
  const ellipse = document.querySelector('.xk-ellipse path');
  if (ellipse) {
    ScrollTrigger.create({
      trigger: '.xk-cta__row',
      start: 'top 78%',
      onEnter: () =>
        gsap.to(ellipse, { strokeDashoffset: 0, duration: 1.4, ease: 'power2.inOut' }),
      onLeaveBack: () =>
        gsap.to(ellipse, { strokeDashoffset: 760, duration: 0.6 }),
    });
  }

  // ---------------------------------------------------------
  // 6. CTA Parallax — Text elements drift down on scroll
  // ---------------------------------------------------------
  const ctaBody = document.querySelector('.xk-cta__body');
  if (ctaBody) {
    const ctaElements = [
      { sel: '.xk-line--cream', y: 40 },
      { sel: '.xk-line--red', y: 80 },
      // Contact block + button drift together as one cohesive unit so their
      // proportional spacing holds at every scroll position; the heading
      // above drifts less (40/80) to keep the depth/parallax effect.
      { sel: '.xk-cta__hint', y: 120 },
      { sel: '.xk-cta__email', y: 120 },
      { sel: '.xk-cta__btn', y: 120 }
    ];
    ctaElements.forEach(({ sel, y }) => {
      const el = ctaBody.querySelector(sel);
      if (el) {
        gsap.to(el, {
          y: y,
          ease: 'none',
          scrollTrigger: {
            trigger: '.xk-cta',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        });
      }
    });
  }

  // ---------------------------------------------------------
  // 7. Recalculate once fonts/layout settle (Syne loads via display:block)
  // ---------------------------------------------------------
  const refresh = () => ScrollTrigger.refresh();
  window.addEventListener('load', refresh);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(refresh);
  setTimeout(refresh, 2600); // after intro curtain has cleared
  
  } // end of init function
  
  init();
})();
