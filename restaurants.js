/* ============================================================
   RESTAURANTS page motion layer.
   Transform/opacity only. Everything gated behind
   prefers-reduced-motion and element existence.
   ============================================================ */
(function () {
    'use strict';

    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    document.body.classList.add('rs-loaded');

    /* ---------- 1. Scroll reveals (IntersectionObserver) ---------- */
    var revealEls = document.querySelectorAll('.rs-rise, .rs-route');
    if ('IntersectionObserver' in window && !reduce) {
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (e) {
                if (e.isIntersecting) {
                    e.target.classList.add('is-in');
                    io.unobserve(e.target);
                }
            });
        }, { threshold: 0.25, rootMargin: '0px 0px -40px 0px' });
        revealEls.forEach(function (el) { io.observe(el); });
    } else {
        revealEls.forEach(function (el) { el.classList.add('is-in'); });
    }

    /* ---------- 2. Hero starfield canvas (depth particles) ---------- */
    var canvas = document.getElementById('rs-stars');
    if (canvas && !reduce) {
        var ctx = canvas.getContext('2d');
        var stars = [];
        var W = 0, H = 0, DPR = Math.min(window.devicePixelRatio || 1, 2);
        var px = 0, py = 0, tx = 0, ty = 0; // pointer parallax, spring-lerped
        var running = false, rafId = 0;

        function sizeCanvas() {
            var r = canvas.parentElement.getBoundingClientRect();
            W = r.width; H = r.height;
            canvas.width = W * DPR; canvas.height = H * DPR;
            ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
            stars = [];
            var n = Math.min(140, Math.floor(W * H / 14000));
            for (var i = 0; i < n; i++) {
                stars.push({
                    x: Math.random() * W,
                    y: Math.random() * H,
                    z: 0.25 + Math.random() * 0.75,        // depth -> size, speed, parallax
                    tw: Math.random() * Math.PI * 2
                });
            }
        }

        function draw(t) {
            ctx.clearRect(0, 0, W, H);
            // critically-damped-ish lerp toward pointer target
            px += (tx - px) * 0.045;
            py += (ty - py) * 0.045;
            for (var i = 0; i < stars.length; i++) {
                var s = stars[i];
                s.y -= 0.06 * s.z;                        // slow upward drift
                if (s.y < -4) { s.y = H + 4; s.x = Math.random() * W; }
                var alpha = (0.25 + 0.5 * s.z) * (0.7 + 0.3 * Math.sin(t / 900 + s.tw));
                ctx.fillStyle = 'rgba(167,182,255,' + alpha.toFixed(3) + ')';
                ctx.beginPath();
                ctx.arc(s.x + px * 26 * s.z, s.y + py * 26 * s.z, 0.7 + s.z * 1.3, 0, 6.2832);
                ctx.fill();
            }
            rafId = requestAnimationFrame(draw);
        }

        sizeCanvas();
        window.addEventListener('resize', sizeCanvas);
        if (finePointer) {
            canvas.parentElement.addEventListener('pointermove', function (e) {
                var r = canvas.getBoundingClientRect();
                tx = (e.clientX - r.left) / r.width - 0.5;
                ty = (e.clientY - r.top) / r.height - 0.5;
            });
        }
        // only burn frames while the hero is on screen
        new IntersectionObserver(function (en) {
            var vis = en[0].isIntersecting;
            if (vis && !running) { running = true; rafId = requestAnimationFrame(draw); }
            if (!vis && running) { running = false; cancelAnimationFrame(rafId); }
        }, { threshold: 0.02 }).observe(canvas);
    }

    /* ---------- 3. Phone tilt: pointer-driven, lerped, 1:1 feel ---------- */
    var phone = document.querySelector('.rs-phone');
    var stage = document.querySelector('.rs-hero__stage');
    if (phone && stage && finePointer && !reduce) {
        var base = { rx: 4, ry: -12 };
        var cur = { rx: base.rx, ry: base.ry };
        var goal = { rx: base.rx, ry: base.ry };
        var tilting = false;

        function tiltLoop() {
            cur.rx += (goal.rx - cur.rx) * 0.08;
            cur.ry += (goal.ry - cur.ry) * 0.08;
            phone.style.transform = 'rotateY(' + cur.ry.toFixed(2) + 'deg) rotateX(' + cur.rx.toFixed(2) + 'deg)';
            if (Math.abs(goal.rx - cur.rx) + Math.abs(goal.ry - cur.ry) > 0.01 || tilting) {
                requestAnimationFrame(tiltLoop);
            }
        }
        stage.addEventListener('pointerenter', function () { tilting = true; requestAnimationFrame(tiltLoop); });
        stage.addEventListener('pointermove', function (e) {
            var r = stage.getBoundingClientRect();
            var nx = (e.clientX - r.left) / r.width - 0.5;
            var ny = (e.clientY - r.top) / r.height - 0.5;
            goal.ry = base.ry + nx * 16;
            goal.rx = base.rx - ny * 12;
        });
        stage.addEventListener('pointerleave', function () {
            tilting = false;
            goal.rx = base.rx; goal.ry = base.ry;
            requestAnimationFrame(tiltLoop);
        });
    }

    /* ---------- 4. WhatsApp conversation: self-playing product demo ---------- */
    var feed = document.getElementById('rs-wa-feed');
    if (feed) {
        var typing = feed.querySelector('.rs-typing');
        var script = [
            { who: 'in',  wait: 900,  type: 0,    html: 'Hi! 2 chicken biryani and 1 butter naan please' },
            { who: 'out', wait: 700,  type: 1100, html: 'Great choice! Anything to drink with that?' },
            { who: 'in',  wait: 1100, type: 0,    html: '1 lassi. Deliver to Flat 302, Krishna Residency, Jubilee Hills' },
            { who: 'out', wait: 700,  type: 1300, card: true, html:
                '<span class="rs-card-title">Order summary</span>' +
                '<span class="rs-card-row"><span>2 × Chicken Biryani</span><b>₹520</b></span>' +
                '<span class="rs-card-row"><span>1 × Butter Naan</span><b>₹60</b></span>' +
                '<span class="rs-card-row"><span>1 × Sweet Lassi</span><b>₹80</b></span>' +
                '<hr><span class="rs-card-row"><span>Total</span><b>₹660</b></span>' +
                '<span class="rs-upi-row"><span class="rs-upi">GPay</span><span class="rs-upi">PhonePe</span><span class="rs-upi">Paytm</span></span>' },
            { who: 'in',  wait: 1400, type: 0,    html: 'Paid ✓' },
            { who: 'out', wait: 800,  type: 1200, card: true, html:
                '<span class="rs-card-title">Payment received · ₹660</span>' +
                '<span class="rs-card-row"><span>Rider booked. Arjun, 12 min away, is picking up your order.</span></span>' },
            { who: 'out', wait: 1600, type: 900,  html: 'Out for delivery. Track him live right here 🛵<small>10:42 <span class="tick">✓✓</span></small>' }
        ];
        var idx = 0, playing = false, timer = 0;
        var MAX_VISIBLE = 6;

        function pushMsg(step) {
            var el = document.createElement('div');
            el.className = 'rs-msg rs-msg--' + step.who + (step.card ? ' rs-msg--card' : '');
            el.innerHTML = step.html;
            feed.insertBefore(el, typing);
            // trim old messages so the feed never overflows
            var msgs = feed.querySelectorAll('.rs-msg');
            if (msgs.length > MAX_VISIBLE) msgs[0].remove();
            requestAnimationFrame(function () {
                requestAnimationFrame(function () { el.classList.add('on'); });
            });
        }

        function nextStep() {
            if (!playing) return;
            if (idx >= script.length) {
                // hold the finished conversation, then restart the loop
                timer = setTimeout(function () {
                    feed.querySelectorAll('.rs-msg').forEach(function (m) { m.remove(); });
                    idx = 0;
                    nextStep();
                }, 5200);
                return;
            }
            var step = script[idx];
            timer = setTimeout(function () {
                if (step.type > 0 && !reduce) {
                    typing.classList.add('on');
                    timer = setTimeout(function () {
                        typing.classList.remove('on');
                        pushMsg(step);
                        idx++;
                        nextStep();
                    }, step.type);
                } else {
                    pushMsg(step);
                    idx++;
                    nextStep();
                }
            }, reduce ? 400 : step.wait);
        }

        new IntersectionObserver(function (en) {
            if (en[0].isIntersecting && !playing) { playing = true; nextStep(); }
            if (!en[0].isIntersecting && playing) { playing = false; clearTimeout(timer); typing.classList.remove('on'); }
        }, { threshold: 0.3 }).observe(feed);
    }

    /* ---------- 5. Steps: horizontal pan (GSAP, desktop only) ---------- */
    var pinWrap = document.querySelector('.rs-steps__pin');
    var track = document.querySelector('.rs-steps__track');
    if (pinWrap && track && !reduce && window.innerWidth > 860 &&
        typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        var rail = document.querySelector('.rs-steps__rail i');
        var distance = function () { return track.scrollWidth - window.innerWidth; };
        gsap.to(track, {
            x: function () { return -distance(); },
            ease: 'none',
            scrollTrigger: {
                trigger: pinWrap,
                start: 'top top',
                end: function () { return '+=' + distance(); },
                pin: true,
                scrub: 1,
                invalidateOnRefresh: true,
                onUpdate: function (self) {
                    if (rail) rail.style.transform = 'scaleX(' + self.progress.toFixed(4) + ')';
                }
            }
        });
    }

    /* ---------- 6. Count-ups (stats + the big 28) ---------- */
    function countUp(el) {
        var target = parseFloat(el.getAttribute('data-count'));
        var suffix = el.getAttribute('data-suffix') || '';
        var dur = 1400;
        if (reduce) { el.firstChild.nodeValue = target + suffix; return; }
        var t0 = null;
        function tick(t) {
            if (!t0) t0 = t;
            var p = Math.min((t - t0) / dur, 1);
            var eased = 1 - Math.pow(1 - p, 4); // strong ease-out
            el.firstChild.nodeValue = Math.round(target * eased) + suffix;
            if (p < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
    }
    var counters = document.querySelectorAll('[data-count]');
    if (counters.length) {
        var cio = new IntersectionObserver(function (entries) {
            entries.forEach(function (e) {
                if (e.isIntersecting) { countUp(e.target); cio.unobserve(e.target); }
            });
        }, { threshold: 0.6 });
        counters.forEach(function (c) { cio.observe(c); });
    }

    /* ---------- 7. Call grid: a live switchboard of 28 lines ---------- */
    var callGrid = document.getElementById('rs-callgrid');
    if (callGrid) {
        var cells = [].slice.call(callGrid.querySelectorAll('.rs-call'));
        var timerEls = [].slice.call(callGrid.querySelectorAll('[data-timer]'));
        var timerSecs = timerEls.map(function () { return 40 + Math.floor(Math.random() * 260); });

        function fmt(total) {
            var m = Math.floor(total / 60), s = total % 60;
            return m + ':' + (s < 10 ? '0' : '') + s;
        }
        timerEls.forEach(function (el, i) { el.textContent = fmt(timerSecs[i]); });

        var lit = false;
        new IntersectionObserver(function (en) {
            if (!en[0].isIntersecting || lit) return;
            lit = true;
            var order = cells.map(function (c, i) { return i; })
                .sort(function () { return Math.random() - 0.5; });
            order.forEach(function (cellIdx, i) {
                setTimeout(function () { cells[cellIdx].classList.add('on'); }, reduce ? 0 : 90 * i);
            });
            if (reduce) return;
            // call timers tick up like real calls in progress
            setInterval(function () {
                timerEls.forEach(function (el, i) {
                    timerSecs[i]++;
                    if (timerSecs[i] > 420) timerSecs[i] = 12; // call ends, a new one is answered
                    el.textContent = fmt(timerSecs[i]);
                });
            }, 1000);
            // new calls keep landing: a random line flashes an incoming ring
            setInterval(function () {
                var c = cells[Math.floor(Math.random() * cells.length)];
                if (!c.classList.contains('on') || c.classList.contains('ring')) return;
                c.classList.add('ring');
                setTimeout(function () { c.classList.remove('ring'); }, 1350);
            }, 1150);
        }, { threshold: 0.4 }).observe(callGrid);
    }

    /* ---------- 8. Magnetic CTAs (subtle pull, desktop only) ---------- */
    if (finePointer && !reduce) {
        document.querySelectorAll('.rs-btn--fill').forEach(function (btn) {
            var mx = 0, my = 0, gx = 0, gy = 0, live = false;
            function magLoop() {
                mx += (gx - mx) * 0.14;
                my += (gy - my) * 0.14;
                btn.style.transform = 'translate(' + mx.toFixed(2) + 'px,' + my.toFixed(2) + 'px)';
                if (live || Math.abs(mx) + Math.abs(my) > 0.05) requestAnimationFrame(magLoop);
                else btn.style.transform = '';
            }
            btn.addEventListener('pointerenter', function () { live = true; requestAnimationFrame(magLoop); });
            btn.addEventListener('pointermove', function (e) {
                var r = btn.getBoundingClientRect();
                gx = (e.clientX - r.left - r.width / 2) * 0.18;
                gy = (e.clientY - r.top - r.height / 2) * 0.3;
            });
            btn.addEventListener('pointerleave', function () { live = false; gx = 0; gy = 0; });
        });
    }

})();
