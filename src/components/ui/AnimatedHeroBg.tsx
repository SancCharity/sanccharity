"use client";

import { useEffect, useRef } from "react";

export type HeroBgVariant = "blockchain" | "orbs" | "grid";

interface Props {
  variant?: HeroBgVariant;
}

// ─── Variant A: Blockchain Nodes ──────────────────────────────────────────────
// Hexagonal nodes drifting across the canvas, connected by glowing lines.
// Animated "data packets" travel along connections to simulate on-chain activity.
function BlockchainCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    if (!ctx) return;

    let W = 0, H = 0;

    function resize() {
      W = canvas!.offsetWidth;
      H = canvas!.offsetHeight;
      canvas!.width = W;
      canvas!.height = H;
    }
    resize();

    const NODE_COUNT = 30;
    const LINK_DIST = 170;
    const PULSE_SPEED = 0.014;

    interface Node {
      x: number; y: number;
      vx: number; vy: number;
      r: number;
      alpha: number; alphaDir: number;
    }
    interface Pulse { from: number; to: number; t: number; }

    const nodes: Node[] = Array.from({ length: NODE_COUNT }, () => ({
      x: Math.random() * (W || 1200),
      y: Math.random() * (H || 500),
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: 4 + Math.random() * 5,
      alpha: 0.25 + Math.random() * 0.45,
      alphaDir: Math.random() > 0.5 ? 1 : -1,
    }));

    const pulses: Pulse[] = [];
    let frame = 0;
    let raf: number;

    function hex(x: number, y: number, r: number) {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const a = (Math.PI / 3) * i - Math.PI / 6;
        const px = x + r * Math.cos(a);
        const py = y + r * Math.sin(a);
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
    }

    function tick() {
      ctx.clearRect(0, 0, W, H);

      // Spawn a pulse every ~50 frames
      if (frame % 50 === 0) {
        const a = Math.floor(Math.random() * NODE_COUNT);
        let b = Math.floor(Math.random() * NODE_COUNT);
        while (b === a) b = Math.floor(Math.random() * NODE_COUNT);
        const dx = nodes[b].x - nodes[a].x;
        const dy = nodes[b].y - nodes[a].y;
        if (Math.hypot(dx, dy) < LINK_DIST * 1.6)
          pulses.push({ from: a, to: b, t: 0 });
      }

      // Connections
      for (let i = 0; i < NODE_COUNT; i++) {
        for (let j = i + 1; j < NODE_COUNT; j++) {
          const dx = nodes[j].x - nodes[i].x;
          const dy = nodes[j].y - nodes[i].y;
          const d = Math.hypot(dx, dy);
          if (d < LINK_DIST) {
            const a = (1 - d / LINK_DIST) * 0.13;
            ctx.strokeStyle = `rgba(14,165,233,${a})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Pulses (traveling dots)
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        p.t += PULSE_SPEED;
        if (p.t > 1) { pulses.splice(i, 1); continue; }
        const fn = nodes[p.from]; const tn = nodes[p.to];
        const px = fn.x + (tn.x - fn.x) * p.t;
        const py = fn.y + (tn.y - fn.y) * p.t;
        const g = ctx.createRadialGradient(px, py, 0, px, py, 7);
        g.addColorStop(0, "rgba(14,165,233,0.85)");
        g.addColorStop(1, "rgba(14,165,233,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(px, py, 7, 0, Math.PI * 2);
        ctx.fill();
      }

      // Nodes
      for (const n of nodes) {
        n.alpha += 0.004 * n.alphaDir;
        if (n.alpha > 0.7 || n.alpha < 0.18) n.alphaDir *= -1;

        // Soft glow halo
        const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 4);
        g.addColorStop(0, `rgba(14,165,233,${n.alpha * 0.22})`);
        g.addColorStop(1, "rgba(14,165,233,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * 4, 0, Math.PI * 2);
        ctx.fill();

        // Hex outline
        ctx.strokeStyle = `rgba(14,165,233,${n.alpha})`;
        ctx.lineWidth = 1.2;
        hex(n.x, n.y, n.r);
        ctx.stroke();

        // Move + wrap
        n.x += n.vx; n.y += n.vy;
        if (n.x < -25) n.x = W + 25;
        else if (n.x > W + 25) n.x = -25;
        if (n.y < -25) n.y = H + 25;
        else if (n.y > H + 25) n.y = -25;
      }

      frame++;
      raf = requestAnimationFrame(tick);
    }

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);

  return <canvas ref={ref} className="absolute inset-0 w-full h-full opacity-60" />;
}

// ─── Variant B: Gradient Orbs ─────────────────────────────────────────────────
// Large blurred gradient orbs slowly drifting — Aurora / Stripe-style.
// Pure CSS, zero JS.
function GradientOrbs() {
  return (
    <>
      <style>{`
        @keyframes orb-drift-1 {
          0%,100% { transform: translate(0%,0%) scale(1); }
          33%      { transform: translate(8%,10%) scale(1.1); }
          66%      { transform: translate(-6%,6%) scale(0.93); }
        }
        @keyframes orb-drift-2 {
          0%,100% { transform: translate(0%,0%) scale(1); }
          40%      { transform: translate(-9%,-8%) scale(1.14); }
          75%      { transform: translate(7%,-4%) scale(0.9); }
        }
        @keyframes orb-drift-3 {
          0%,100% { transform: translate(0%,0%) scale(1); }
          50%      { transform: translate(6%,-12%) scale(1.08); }
        }
        @keyframes orb-drift-4 {
          0%,100% { transform: translate(0%,0%) scale(1); }
          30%      { transform: translate(-7%,6%) scale(1.12); }
          70%      { transform: translate(5%,9%) scale(0.88); }
        }
        .hero-orb {
          position: absolute;
          border-radius: 9999px;
          filter: blur(60px);
          pointer-events: none;
          opacity: 0.55;
        }
        .hero-orb-1 {
          width: 520px; height: 520px;
          background: radial-gradient(circle, #7DD3FC 0%, #0EA5E9 55%, transparent 100%);
          top: -20%; left: -12%;
          animation: orb-drift-1 8s ease-in-out infinite;
        }
        .hero-orb-2 {
          width: 440px; height: 440px;
          background: radial-gradient(circle, #BAE6FD 0%, #38BDF8 50%, transparent 100%);
          top: 15%; right: -10%;
          animation: orb-drift-2 10s ease-in-out infinite;
        }
        .hero-orb-3 {
          width: 380px; height: 380px;
          background: radial-gradient(circle, #C7D2FE 0%, #818CF8 55%, transparent 100%);
          bottom: -15%; left: 28%;
          animation: orb-drift-3 7s ease-in-out infinite;
        }
        .hero-orb-4 {
          width: 300px; height: 300px;
          background: radial-gradient(circle, #99F6E4 0%, #2DD4BF 55%, transparent 100%);
          top: 8%; left: 38%;
          animation: orb-drift-4 9s ease-in-out infinite;
        }
      `}</style>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-2" />
        <div className="hero-orb hero-orb-3" />
        <div className="hero-orb hero-orb-4" />
      </div>
    </>
  );
}

// ─── Variant C: Perspective Grid ──────────────────────────────────────────────
// Tron-style perspective ground grid scrolling toward the viewer.
function PerspectiveGrid() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    if (!ctx) return;

    let W = 0, H = 0;
    let raf: number;
    let started = false;

    function resize() {
      const dpr  = window.devicePixelRatio || 1;
      const rect = canvas!.getBoundingClientRect();
      W = rect.width  > 0 ? rect.width  : window.innerWidth;
      H = rect.height > 0 ? rect.height : 600;
      // Scale canvas buffer for retina/high-DPI screens
      canvas!.width  = W * dpr;
      canvas!.height = H * dpr;
      canvas!.style.width  = `${W}px`;
      canvas!.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    let offset = 0;
    let scanY = -0.2;
    // Fewer columns on mobile for cleaner look
    const COLS = window.innerWidth < 640 ? 8 : 12;
    const ROWS = 18;

    function draw() {
      ctx.clearRect(0, 0, W, H);

      const vpx = W * 0.5;
      const vpy = H * 0.3;          // vanishing point 30% from top
      const floorH = H - vpy;

      // ── Vertical lines ──
      for (let c = 0; c <= COLS; c++) {
        const t = c / COLS;
        const bx = W * t;                          // spread full width at bottom
        const vx = vpx + (bx - vpx) * 0.05;       // converge tightly at VP

        ctx.strokeStyle = `rgba(14,165,233,0.40)`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(vx, vpy);
        ctx.lineTo(bx, H);
        ctx.stroke();
      }

      // ── Horizontal lines (scrolling) ──
      for (let r = 0; r <= ROWS; r++) {
        const rawT = ((r / ROWS) + (offset % 1)) % 1;
        const perspT = Math.pow(rawT, 2.5);        // compress near VP
        const y = vpy + perspT * floorH;
        if (y > H + 2) continue;

        const lx = vpx - perspT * vpx;
        const rx = vpx + perspT * (W - vpx);
        const alpha = 0.12 + perspT * 0.38;

        ctx.strokeStyle = `rgba(14,165,233,${alpha})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(lx, y);
        ctx.lineTo(rx, y);
        ctx.stroke();
      }

      // ── Scan pulse ──
      if (scanY > 0 && scanY < 1) {
        const perspT = Math.pow(scanY, 2.5);
        const sy  = vpy + perspT * floorH;
        const slx = vpx - perspT * vpx;
        const srx = vpx + perspT * (W - vpx);
        const g = ctx.createLinearGradient(slx, sy, srx, sy);
        g.addColorStop(0,   "rgba(14,165,233,0)");
        g.addColorStop(0.5, "rgba(14,165,233,0.55)");
        g.addColorStop(1,   "rgba(14,165,233,0)");
        ctx.strokeStyle = g as unknown as string;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(slx, sy);
        ctx.lineTo(srx, sy);
        ctx.stroke();
      }

      // ── Vanishing point glow ──
      const glow = ctx.createRadialGradient(vpx, vpy, 0, vpx, vpy, 80);
      glow.addColorStop(0, "rgba(14,165,233,0.18)");
      glow.addColorStop(1, "rgba(14,165,233,0)");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(vpx, vpy, 80, 0, Math.PI * 2);
      ctx.fill();

      const isMobile = W < 640;
      offset += isMobile ? 0.002 : 0.003;
      scanY  += isMobile ? 0.0015 : 0.002;
      if (scanY > 1.1) scanY = -0.2;

      raf = requestAnimationFrame(draw);
    }

    const ro = new ResizeObserver(() => {
      resize();
      if (!started) { started = true; raf = requestAnimationFrame(draw); }
    });
    ro.observe(canvas);

    // Fallback: start immediately if ResizeObserver fires late
    setTimeout(() => {
      if (!started) { resize(); started = true; raf = requestAnimationFrame(draw); }
    }, 50);

    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);

  return <canvas ref={ref} className="absolute inset-0 w-full h-full" />;
}

// ─── Export ───────────────────────────────────────────────────────────────────
export function AnimatedHeroBg({ variant = "blockchain" }: Props) {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      {variant === "blockchain" && <BlockchainCanvas />}
      {variant === "orbs"       && <GradientOrbs />}
      {variant === "grid"       && <PerspectiveGrid />}
    </div>
  );
}
