document.addEventListener("DOMContentLoaded", () => {
    // ========================================================
    // Failsafe: Hide loader after 5 seconds no matter what
    // ========================================================
    setTimeout(() => {
        const loader = document.getElementById('loader');
        if (loader && loader.style.display !== 'none') {
            loader.style.opacity = '0';
            loader.style.transition = 'opacity 0.5s ease';
            setTimeout(() => loader.style.display = 'none', 500);
        }
    }, 5000);

    // ========================================================
    // 0. Mobile navigation drawer — runs on every page
    // ========================================================
    (function initMobileDrawer() {
        const toggle = document.querySelector('.nav-toggle');
        const drawer = document.getElementById('mobile-drawer');
        if (!toggle || !drawer) return;

        const closers = drawer.querySelectorAll('[data-drawer-close]');
        const panel = drawer.querySelector('.mobile-drawer__panel');
        const firstLink = drawer.querySelector('.mobile-drawer__nav a');
        let lastFocused = null;

        function openDrawer() {
            lastFocused = document.activeElement;
            drawer.classList.add('is-open');
            drawer.setAttribute('aria-hidden', 'false');
            toggle.setAttribute('aria-expanded', 'true');
            toggle.setAttribute('aria-label', 'Close menu');
            document.body.classList.add('drawer-open');
            // Focus the first link for keyboard users
            setTimeout(() => firstLink && firstLink.focus(), 200);
        }

        function closeDrawer() {
            drawer.classList.remove('is-open');
            drawer.setAttribute('aria-hidden', 'true');
            toggle.setAttribute('aria-expanded', 'false');
            toggle.setAttribute('aria-label', 'Open menu');
            document.body.classList.remove('drawer-open');
            if (lastFocused && typeof lastFocused.focus === 'function') {
                lastFocused.focus();
            }
        }

        toggle.addEventListener('click', () => {
            if (drawer.classList.contains('is-open')) closeDrawer();
            else openDrawer();
        });

        closers.forEach(el => el.addEventListener('click', closeDrawer));

        // Close on Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && drawer.classList.contains('is-open')) {
                closeDrawer();
            }
        });

        // Simple focus trap inside the drawer
        panel.addEventListener('keydown', (e) => {
            if (e.key !== 'Tab' || !drawer.classList.contains('is-open')) return;
            const focusables = panel.querySelectorAll(
                'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
            );
            if (!focusables.length) return;
            const first = focusables[0];
            const last = focusables[focusables.length - 1];
            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        });

        // Close drawer if viewport is resized to desktop (e.g., device rotation)
        window.addEventListener('resize', () => {
            if (window.innerWidth >= 768 && drawer.classList.contains('is-open')) {
                closeDrawer();
            }
        });
    })();

    // GSAP/ScrollTrigger may not be loaded on every page — guard
    if (typeof gsap === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    // Honor user motion preferences. When prefers-reduced-motion is on we
    // skip the smooth-scroll and scrubbed animations entirely so the page
    // is usable for vestibular-sensitive visitors.
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Mark JS as ready so CSS can reveal hero content that was hidden
    // pre-animation (fallback for users with JS disabled — they see content).
    document.body.classList.add('js-ready');

    // 1. Lenis Smooth Scrolling (Global) — skipped on reduce-motion
    const lenis = reduceMotion ? null : new Lenis({
        duration: 1.5,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        smooth: true,
        smoothWheel: true,
        mouseMultiplier: 1,
        wheelMultiplier: 1.8,
        lerp: 0.08,
    });

    if (lenis) {
        lenis.on('scroll', () => {
            ScrollTrigger.update();
            const header = document.querySelector('.site-header');
            if (header) {
                header.classList.toggle('scrolled', window.scrollY > 80);
            }
        });

        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });
        gsap.ticker.lagSmoothing(0);
    } else {
        // No Lenis — still toggle header.scrolled on native scroll
        window.addEventListener('scroll', () => {
            const header = document.querySelector('.site-header');
            if (header) {
                header.classList.toggle('scrolled', window.scrollY > 80);
            }
        }, { passive: true });
    }

    // 2. Landing Page Mascot & Scrollytelling Logic
    const canvas = document.getElementById("mascot-canvas");
    const isMobile = window.innerWidth <= 767;

    // Reduced-motion fast path: skip the 400-frame sequence and scrubbed scenes.
    // Just dismiss the loader and let CSS render every scene at full opacity.
    // NOTE: Do NOT return here — sections 4 (cookie), 5 (mobile video), and 6
    // (mobile scroll polish) still need to run.
    if (canvas && reduceMotion) {
        const loader = document.getElementById('loader');
        if (loader) loader.style.display = 'none';
        document.body.classList.add('reduce-motion');
    }

    // Mobile fast path: the desktop scrollytelling (400-frame canvas +
    // scrubbed GSAP timelines) doesn't translate well to phones. We rely on
    // the mobile video backdrop and let scenes flow as static content with
    // a lightweight IntersectionObserver fade-in.
    // NOTE: Do NOT return — sections 4/5/6 must still run on mobile.
    else if (canvas && isMobile) {
        const loader = document.getElementById('loader');
        if (loader) loader.style.display = 'none';
        document.body.classList.add('mobile-static');

        // Fade scenes in as they enter the viewport
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(e => {
                    if (e.isIntersecting) {
                        e.target.classList.add('in-view');
                        observer.unobserve(e.target);
                    }
                });
            }, { threshold: 0.15, rootMargin: '0px 0px -10% 0px' });
            document.querySelectorAll('.scene .content-wrapper').forEach(el => {
                el.classList.add('reveal-on-scroll');
                observer.observe(el);
            });

            // Stagger reveal cascade inside each grid — siblings fade in
            // sequentially. Pure CSS via custom property; no per-frame work.
            const staggerGroups = [
                '.services-grid > .service-card',
                '.process-grid > .process-step',
                '.work-grid > .work-card',
                '.footer-content > *',
            ];
            staggerGroups.forEach(sel => {
                document.querySelectorAll(sel).forEach((el, i) => {
                    el.classList.add('reveal-on-scroll');
                    el.style.setProperty('--reveal-delay', (i * 0.08) + 's');
                    observer.observe(el);
                });
            });

            // Lower-threshold observer for the process through-line + crown stroke
            const lineObserver = new IntersectionObserver((entries) => {
                entries.forEach(e => {
                    if (e.isIntersecting) {
                        e.target.classList.add('in-view');
                        lineObserver.unobserve(e.target);
                    }
                });
            }, { threshold: 0.25 });
            document.querySelectorAll('.process-grid, .crown-doodle').forEach(el => {
                lineObserver.observe(el);
            });
        }
    }

    // Desktop scrollytelling path — runs only when neither reduce-motion nor
    // mobile-layout was selected above.
    else if (canvas) {
        const context = canvas.getContext("2d");
        const frameCount = 400;
        const isLocalFile = window.location.protocol === 'file:';
        const currentFrame = index => (
            isLocalFile 
                ? `./public/webp/Man_hanging_on_rope_poses_202605132219${index.toString().padStart(3, '0')}.webp`
                : `/webp/Man_hanging_on_rope_poses_202605132219${index.toString().padStart(3, '0')}.webp`
        );

        const images = [];
        const sequence = { frame: 0 };
        let imagesLoaded = 0;
        const loader = document.getElementById('loader');
        const loaderBar = document.getElementById('loader-bar');

        function loadImagesSequentially(startIndex, batchSize) {
            const endIndex = Math.min(startIndex + batchSize, frameCount);
            let batchProcessed = 0;
            for (let i = startIndex; i < endIndex; i++) {
                const img = new Image();
                img.src = currentFrame(i);
                const handleLoad = () => {
                    imagesLoaded++;
                    batchProcessed++;
                    const progress = (imagesLoaded / frameCount) * 100;
                    if (loaderBar) loaderBar.style.width = `${progress}%`;
                    if (imagesLoaded === 1) {
                        initCanvas(img);
                    } else {
                        render(true); // Ensure current frame is drawn if it loaded late
                    }
                    if (imagesLoaded >= 40) { // Hide loader early (after Scene 1 batch)
                        if (loader) {
                            gsap.to(loader, { opacity: 0, duration: 0.5, onComplete: () => {
                                loader.style.display = 'none';
                                assembleHero(); 
                            }});
                        }
                    }
                    if (batchProcessed === (endIndex - startIndex) && endIndex < frameCount) {
                        loadImagesSequentially(endIndex, batchSize);
                    }
                };
                img.onload = handleLoad;
                img.onerror = handleLoad;
                images.push(img);
            }
        }

        let lastFrame = -1;
        function resizeCanvas() {
            const ratio = window.devicePixelRatio || 1;
            canvas.width = window.innerWidth * ratio;
            canvas.height = window.innerHeight * ratio;
            context.imageSmoothingEnabled = true;
            context.imageSmoothingQuality = 'high';
            render(true);
        }

        function initCanvas(firstImg) {
            resizeCanvas();
            window.addEventListener("resize", resizeCanvas);
            render(); 
        }

        function render(force = false) {
            if (!images[sequence.frame]) return;
            const img = images[sequence.frame];
            
            // Fix: Prevent crashing if the image failed to load
            if (!img.complete || img.naturalWidth === 0) return;

            if (!force && lastFrame === sequence.frame) return;
            lastFrame = sequence.frame;

            const canvasRatio = canvas.width / canvas.height;
            const imgRatio = img.naturalWidth / img.naturalHeight;
            let drawWidth, drawHeight, x, y;
            if (canvasRatio > imgRatio) {
                drawWidth = canvas.width;
                drawHeight = canvas.width / imgRatio;
                x = 0;
                y = (canvas.height - drawHeight) / 2;
            } else {
                drawWidth = canvas.height * imgRatio;
                drawHeight = canvas.height;
                x = (canvas.width - drawWidth) / 2;
                y = 0;
            }
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(img, x, y, drawWidth, drawHeight);
            if (sequence.frame === 0 && !window.bgSet) {
                try {
                    const pixel = context.getImageData(10, 10, 1, 1).data;
                    const rgb = `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`;
                    document.documentElement.style.setProperty('--bg-color', rgb);
                    window.bgSet = true;
                } catch (e) {
                    document.documentElement.style.setProperty('--bg-color', '#C31C1D');
                    window.bgSet = true;
                }
            }
        }

        // Image Sequence Animation
        gsap.to(sequence, {
            frame: frameCount - 1,
            snap: "frame",
            ease: "none",
            scrollTrigger: {
                trigger: ".scroll-container",
                start: "top top",
                end: "bottom bottom",
                scrub: 0.4,
                onUpdate: render
            }
        });

        // Spotlight Scale
        gsap.to(".spotlight", {
            scale: 1.5,
            ease: "none",
            scrollTrigger: {
                trigger: ".scroll-container",
                start: "top top",
                end: "bottom bottom",
                scrub: 1.5
            }
        });

        // Hero Assembly
        const heroWords = gsap.utils.toArray("#scene-1 .word");
        
        // Hero text animation removed: render words/subtext instantly with no
        // entrance reveal. assembleHero is kept (callers below still invoke it)
        // but now just guarantees the static, fully-visible state.
        function assembleHero() {
            if (!heroWords.length) return;
            gsap.set(heroWords, { clipPath: "none", filter: "none", x: 0, opacity: 1 });
            gsap.set(".hero-subtext", { opacity: 1, y: 0 });
        }

        ScrollTrigger.create({
            trigger: "#scene-1",
            start: "top top",
            onEnterBack: () => { if (window.scrollY < 100) assembleHero(); }
        });

        // Scene Synchronization
        const getProgress = (frame) => frame / (frameCount - 1);

        // Hero text scatter animation removed. The hero is sticky-pinned over a
        // tall (300vh) runway on desktop, so the text must still clear before
        // Scene 2 arrives — do that with a plain opacity fade (no movement, no
        // scatter) so the text stays put and simply dissolves. Desktop only:
        // mobile uses normal document flow, so the hero scrolls away naturally
        // and needs no exit animation.
        if (window.innerWidth > 768) {
            gsap.to("#scene-1 .tagline, .hero-subtext, .hero-actions, .trust-strip", {
                opacity: 0,
                scrollTrigger: {
                    trigger: "#scene-1",
                    start: "35% top",
                    end: "60% top",
                    scrub: true
                }
            });
        }

        /* 
        // --- CONTENT ANIMATIONS REMOVED PER REQUEST ---
        // Hero Exit
        gsap.to(heroWords, {
            opacity: 0, y: -100, filter: "blur(10px)", stagger: 0.05, ease: "power2.in",
            scrollTrigger: {
                trigger: ".scroll-container",
                start: `${getProgress(35) * 100}% top`,
                end: `${getProgress(60) * 100}% top`,
                scrub: true
            }
        });
        gsap.to(".hero-subtext, .hero-actions, .trust-strip", {
            opacity: 0,
            scrollTrigger: {
                trigger: ".scroll-container",
                start: `${getProgress(35) * 100}% top`,
                end: `${getProgress(55) * 100}% top`,
                scrub: true
            }
        });

        function syncScene(sceneId, entryFrames, holdFrames, exitFrames, stagger = 0) {
            const section = document.getElementById(sceneId);
            if (!section) return;
            const selector = `#${sceneId} .content-wrapper`;
            const children = stagger ? gsap.utils.toArray(`${selector} > *`) : selector;
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: ".scroll-container",
                    start: `${getProgress(entryFrames[0]) * 100}% top`,
                    end: `${getProgress(exitFrames[1]) * 100}% top`,
                    scrub: 0.5
                }
            });
            tl.fromTo(children, { opacity: 0, filter: "blur(10px)", y: 50 }, { opacity: 1, filter: "blur(0px)", y: 0, duration: 1, stagger: stagger });
            tl.to(children, { opacity: 1, duration: 2 });
            tl.to(children, { opacity: 0, filter: "blur(10px)", y: -50, duration: 1, stagger: stagger });
        }

        // syncScene("scene-2", [35, 65], [65, 95], [95, 125]); // Replaced with custom glitch effect
        syncScene("scene-3", [100, 130], [130, 165], [165, 195]);
        syncScene("scene-4", [170, 200], [200, 235], [235, 265]);
        syncScene("scene-5", [220, 255], [255, 305], [305, 330]);
        syncScene("scene-6", [280, 320], [320, 365], [365, 385]);

        const scene7Tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".scroll-container",
                start: `${getProgress(385) * 100}% top`,
                end: "bottom bottom",
                scrub: 1
            }
        });
        scene7Tl.fromTo("#scene-7 .content-wrapper", { opacity: 0, filter: "blur(15px)", y: 60 }, { opacity: 1, filter: "blur(0px)", y: 0, duration: 1.5 });
        */

        // --- CUSTOM PIXEL GLITCH EFFECT FOR SCENE 2 ---
        const binaryChars = "01";
        const encryptedChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*+<>_[]{}|\\";
        
        function setupTextGlitch(selector, triggerElementSelector) {
            const triggerEl = document.querySelector(triggerElementSelector);
            if (!triggerEl) return;
            const sceneEl = triggerEl.closest('.scene');
            if (!sceneEl) return;
            const elements = document.querySelectorAll(selector);
            if (!elements.length) return;
            
            elements.forEach(el => {
                const originalText = el.innerText;
                const length = originalText.length;
                const proxy = { progress: 0 };
                
                const setGlitchedText = (p) => {
                    let result = "";
                    for (let i = 0; i < length; i++) {
                        if (originalText[i] === " " || originalText[i] === "\n") {
                            result += originalText[i];
                            continue;
                        }
                        
                        if (p < 0.33) {
                            result += binaryChars[Math.floor(Math.random() * binaryChars.length)];
                        } else if (p < 0.66) {
                            result += encryptedChars[Math.floor(Math.random() * encryptedChars.length)];
                        } else {
                            const resolveProgress = (p - 0.66) / 0.34;
                            if (i < resolveProgress * length) {
                                result += originalText[i];
                            } else {
                                result += encryptedChars[Math.floor(Math.random() * encryptedChars.length)];
                            }
                        }
                    }
                    el.innerText = result;
                };

                gsap.to(proxy, {
                    progress: 1,
                    scrollTrigger: {
                        trigger: sceneEl, // Use the non-sticky parent scene for predictable scrolling
                        start: "top 60%", // Starts decoding early
                        end: "top 20%",   // Fully decoded well before the middle
                        scrub: 0.1
                    },
                    onUpdate: () => {
                        if (el.dataset.exitFlicker !== "true") {
                            setGlitchedText(proxy.progress);
                        }
                    },
                    onEnter: () => setGlitchedText(0)
                });
                
                // Exit Phase: Snap to password dots when 80% scrolled through
                ScrollTrigger.create({
                    trigger: sceneEl,
                    start: "bottom 20%", // 0.80 part of the scene scrolled
                    end: "bottom top",
                    onEnter: () => {
                        el.dataset.exitFlicker = "true";
                        let result = "";
                        for (let i = 0; i < length; i++) {
                            if (originalText[i] === " " || originalText[i] === "\n") {
                                result += originalText[i];
                            } else {
                                result += "•"; // Thick password dot
                            }
                        }
                        el.innerText = result;
                    },
                    onLeaveBack: () => {
                        el.dataset.exitFlicker = "false";
                        setGlitchedText(1);
                    }
                });
            });
        }

        if (document.querySelector("#scene-2 .hacker-card")) {
            setupTextGlitch("#scene-2 .card-title, #scene-2 .card-body", "#scene-2 .hacker-card");

            const scene2GlitchTl = gsap.timeline({
                scrollTrigger: {
                    trigger: "#scene-2 .hacker-card",
                    start: "top 85%",
                    end: "top 35%",
                    scrub: 1 // Slower scrub for the card itself
                }
            });

            // Stuttering glitch scale/opacity reveal
            scene2GlitchTl.fromTo("#scene-2 .hacker-card", 
                { opacity: 0, scale: 0.9, y: 50, skewX: 10 }, 
                { opacity: 1, scale: 1, y: 0, skewX: 0, duration: 1, ease: "steps(6)" }
            );
        }

        // Idle Effects
        gsap.to("#mascot-canvas", { y: 5, rotation: 0.3, duration: 3, repeat: -1, yoyo: true, ease: "sine.inOut" });

        // Smooth, interesting reveal for "Why work with us?" section
        if (document.querySelector("#scene-7 .vision-card")) {
            const whyWorkTl = gsap.timeline({
                scrollTrigger: {
                    trigger: "#scene-7 .vision-card",
                    start: "top 85%", // Starts as soon as it enters viewport
                    end: "top 25%",   // Finishes completely while perfectly in view
                    scrub: 1.5
                }
            });
            
            // Ultra-premium subtle scale and fade for the card
            whyWorkTl.fromTo("#scene-7 .vision-card", 
                { opacity: 0, y: 60, scale: 0.97 }, 
                { opacity: 1, y: 0, scale: 1, duration: 1.5, ease: "power3.out" }
            );
            
            // High-end text masking wipe for bullet points (Awwwards style)
            whyWorkTl.fromTo("#scene-7 .work-bullets li", 
                { opacity: 0, y: 30, clipPath: "inset(100% 0% 0% 0%)" }, 
                { opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0%)", duration: 1.2, stagger: 0.15, ease: "power3.out" },
                "-=1" // Overlap heavily with the card entrance
            );
        }
        gsap.to(".spotlight", { opacity: 0.4, duration: 5, repeat: -1, yoyo: true, ease: "sine.inOut" });

        // Crown Doodle
        if (document.querySelector("#scene-6")) {
            ScrollTrigger.create({
                trigger: "#scene-6",
                start: "top 50%",
                onEnter: () => { gsap.to(".crown-path", { strokeDashoffset: 0, duration: 2, ease: "power2.out" }); },
                onLeaveBack: () => { gsap.to(".crown-path", { strokeDashoffset: 400, duration: 1 }); }
            });
        }

        // Start loading
        if (window.innerWidth > 768) {
            // Desktop: Load massive 3D sequence
            loadImagesSequentially(0, 10);
        } else {
            // Mobile: Bypass heavy image loading, instantly dismiss loader and animate hero
            const loader = document.getElementById('loader');
            if (loader) {
                gsap.to(loader, { opacity: 0, duration: 0.4, delay: 0.2, onComplete: () => {
                    loader.style.display = 'none';
                    assembleHero();
                }});
            } else {
                assembleHero();
            }
        }
    } else {
        // No mascot canvas: Hide loader immediately
        const loader = document.getElementById('loader');
        if (loader) {
            gsap.to(loader, { opacity: 0, duration: 0.3, onComplete: () => {
                loader.style.display = 'none';
            }});
        }
    }

    // Global Footer Smooth-exit Logic
    const footer = document.querySelector(".site-footer");
    const canvasContainer = document.querySelector(".canvas-container");
    if (footer && canvasContainer) {
        gsap.to(".canvas-container, .spotlight", {
            scrollTrigger: {
                trigger: ".site-footer",
                start: "top bottom",
                end: "top 60%",
                scrub: true,
                markers: false
            },
            opacity: 0,
            scale: 0.8,
            filter: "blur(15px)"
        });
    }

    // 4. Cookie Consent Banner Logic
    const cookieConsent = localStorage.getItem('cookie-consent');
    if (!cookieConsent) {
        const bannerHTML = `
            <div id="cookie-banner" class="cookie-banner">
                <div class="cookie-text">
                    <strong>THE DIGITAL CRUMB.</strong><br>
                    We use cookies to feed the machine and improve your experience. By staying, you're cool with it. 
                    <a href="./cookies.html">View Policy</a>
                </div>
                <div class="cookie-buttons">
                    <button id="cookie-reject" class="btn-reject">Reject</button>
                    <button id="cookie-accept" class="btn-accept">Feed the Machine</button>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', bannerHTML);

        const banner = document.getElementById('cookie-banner');
        const rejectBtn = document.getElementById('cookie-reject');
        const acceptBtn = document.getElementById('cookie-accept');

        if (acceptBtn) {
            acceptBtn.addEventListener('click', () => {
                localStorage.setItem('cookie-consent', 'accepted');
                banner.classList.add('hidden');
                setTimeout(() => banner.remove(), 400);
            });
        }

        if (rejectBtn) {
            rejectBtn.addEventListener('click', () => {
                localStorage.setItem('cookie-consent', 'rejected');
                banner.classList.add('hidden');
                setTimeout(() => banner.remove(), 400);
            });
        }
    }

    // 5. Mobile Character Loop Logic
    // Skip entirely if the user prefers reduced motion — CSS already hides
    // the element, this prevents wasted bandwidth + decoder cycles.
    const mobileVideo = !reduceMotion ? document.querySelector('.mobile-character-loop') : null;
    if (mobileVideo) {
        if (window.location.protocol === 'file:') {
            // Fix video source for local testing
            const source = mobileVideo.querySelector('source');
            if (source) source.src = './public/videos/character-climb-loop.mp4';
            mobileVideo.load();
        }
        
        const handleCanPlay = () => mobileVideo.classList.add('loaded');
        
        if (mobileVideo.readyState >= 3) {
            handleCanPlay();
        } else {
            mobileVideo.addEventListener('canplay', handleCanPlay);
        }

        // Visibility handling to save battery
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                mobileVideo.pause();
            } else {
                mobileVideo.play().catch(() => {});
            }
        });

        // Network awareness (Optional fallback for slow connections)
        if (navigator.connection && navigator.connection.saveData) {
            mobileVideo.style.display = 'none';
        }
    }

    // ========================================================
    // 5.5. Service Pages Scroll Reveal
    // ========================================================
    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        document.querySelectorAll('.service-section, .step-card, .stat, .cta-block').forEach(el => {
            revealObserver.observe(el);
        });
    }

    // ========================================================
    // 6. Mobile premium polish — scroll progress + shrunk header

    //    Runs only when the viewport is in mobile breakpoint.
    //    Uses matchMedia + rAF throttle to keep the main thread free.
    // ========================================================
    (function initMobileScrollPolish() {
        const mq = window.matchMedia('(max-width: 767px)');
        if (!mq.matches) return;

        const header = document.querySelector('.site-header');
        const progress = document.querySelector('.scroll-progress');
        const stickyCta = document.querySelector('.sticky-cta');
        const footer = document.querySelector('.site-footer');
        if (!header && !progress && !stickyCta) return;

        let ticking = false;
        const onScroll = () => {
            if (ticking) return;
            ticking = true;
            requestAnimationFrame(() => {
                const y = window.scrollY || window.pageYOffset;
                const vh = window.innerHeight;
                const max = Math.max(
                    document.documentElement.scrollHeight - vh,
                    1
                );
                const pct = Math.min(100, (y / max) * 100);
                if (progress) progress.style.setProperty('--scroll-progress', pct + '%');
                if (header) header.classList.toggle('shrunk', y > 80);
                if (y > 24) document.body.classList.add('has-scrolled');

                // Sticky CTA: show once past 60% of first viewport, hide as footer approaches
                if (stickyCta) {
                    const showThreshold = vh * 0.6;
                    let nearFooter = false;
                    if (footer) {
                        const fr = footer.getBoundingClientRect();
                        // Hide when the footer's top enters the lower 25% of the viewport
                        nearFooter = fr.top < vh * 0.75;
                    }
                    const shouldShow = y > showThreshold && !nearFooter;
                    stickyCta.classList.toggle('visible', shouldShow);
                }
                ticking = false;
            });
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll, { passive: true });
        onScroll();
    })();

    // ========================================================
    // 7. GA4 Custom Events Tracking
    // ========================================================
    function trackGA4Event(eventName, params = {}) {
        if (typeof gtag === 'function') {
            gtag('event', eventName, params);
        } else if (window.dataLayer) {
            window.dataLayer.push({ event: eventName, ...params });
        }
    }

    // 7.1. Book Call Clicks
    document.body.addEventListener('click', (e) => {
        const target = e.target.closest('a');
        if (target && (target.href.includes('book') || target.textContent.toLowerCase().includes('book a call'))) {
            trackGA4Event('book_call_click', {
                page_path: window.location.pathname,
                cta_location: target.className || 'text_link'
            });
        }
    });

    // 7.2. Contact Form Submit
    const bookForm = document.querySelector('#booking-form');
    if (bookForm) {
        bookForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            trackGA4Event('contact_form_submit', {
                form_id: bookForm.id || 'book_form',
                page_path: window.location.pathname
            });

            const submitBtn = bookForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            try {
                const response = await fetch(bookForm.action, {
                    method: 'POST',
                    body: new FormData(bookForm),
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    bookForm.reset();
                    submitBtn.textContent = 'Message Sent!';
                    submitBtn.style.backgroundColor = '#4CAF50';
                    submitBtn.style.color = '#FFFFFF';
                    setTimeout(() => {
                        submitBtn.textContent = originalBtnText;
                        submitBtn.style.backgroundColor = '';
                        submitBtn.style.color = '';
                        submitBtn.disabled = false;
                    }, 3000);
                } else {
                    let data;
                    try {
                        data = await response.json();
                    } catch (e) {
                        data = {};
                    }
                    if (data && Object.hasOwn(data, 'errors')) {
                        alert(data.errors.map(error => error.message).join(', '));
                    } else {
                        alert('Oops! There was a problem submitting your form (Status: ' + response.status + ')');
                    }
                    submitBtn.textContent = originalBtnText;
                    submitBtn.disabled = false;
                }
            } catch (error) {
                console.error("Formspree Error:", error);
                alert('Oops! There was a problem submitting your form: ' + error.message + '\n\nIf you have an adblocker, it might be blocking the submission.');
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
            }
        });
    }

    // 7.3. Service Page View
    if (window.location.pathname.includes('/services/') && window.location.pathname !== '/services/index.html' && window.location.pathname !== '/services/') {
        const serviceType = window.location.pathname.split('/').pop().replace('.html', '');
        trackGA4Event('service_page_view', { service_type: serviceType });
    }

    // 7.4. External Link Clicks
    document.body.addEventListener('click', (e) => {
        const target = e.target.closest('a');
        if (target && target.hostname && target.hostname !== window.location.hostname) {
            trackGA4Event('external_link_click', {
                destination_domain: target.hostname
            });
        }
    });

    // 7.5. Blog Scroll 75%
    if (window.location.pathname.includes('/blog/') && document.querySelector('article')) {
        let firedScroll = false;
        const scrollObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !firedScroll) {
                firedScroll = true;
                trackGA4Event('blog_scroll_75', {
                    post_slug: window.location.pathname.split('/').pop(),
                    time_on_page: Math.round(performance.now() / 1000)
                });
                scrollObserver.disconnect();
            }
        }, { threshold: 0 });
        
        // Find an element roughly 75% down the article
        const articleElements = document.querySelectorAll('article > *, .article-content > *');
        if (articleElements.length > 0) {
            const targetIndex = Math.floor(articleElements.length * 0.75);
            scrollObserver.observe(articleElements[targetIndex]);
        }
    }

    // ========================================================
    // 8. Low-end device optimizations
    // ========================================================
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4)) {
        document.body.classList.add('reduced-motion');
        const grain = document.querySelector('.film-grain');
        if(grain) grain.style.animation = 'none';
        if(typeof lenis !== 'undefined') lenis.destroy();
    }
});
