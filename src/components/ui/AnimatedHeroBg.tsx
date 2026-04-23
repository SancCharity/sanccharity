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
        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
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
          33%      { transform: translate(6%,8%) scale(1.08); }
          66%      { transform: translate(-4%,5%) scale(0.95); }
        }
        @keyframes orb-drift-2 {
          0%,100% { transform: translate(0%,0%) scale(1); }
          40%      { transform: translate(-7%,-6%) scale(1.12); }
          75%      { transform: translate(5%,-3%) scale(0.93); }
        }
        @keyframes orb-drift-3 {
          0%,100% { transform: translate(0%,0%) scale(1); }
          50%      { transform: translate(4%,-9%) scale(1.06); }
        }
        @keyframes orb-drift-4 {
          0%,100% { transform: translate(0%,0%) scale(1); }
          30%      { transform: translate(-5%,4%) scale(1.1); }
          70%      { transform: translate(3%,7%) scale(0.9); }
        }
        .hero-orb {
          position: absolute;
          border-radius: 9999px;
          filter: blur(80px);
          pointer-events: none;
          opacity: 0.35;
        }
        .hero-orb-1 {
          width: 500px; height: 500px;
          background: radial-gradient(circle, #BAE6FD 0%, #0EA5E9 60%, transparent 100%);
          top: -15%; left: -10%;
          animation: orb-drift-1 18s ease-in-out infinite;
        }
        .hero-orb-2 {
          width: 420px; height: 420px;
          background: radial-gradient(circle, #E0F2FE 0%, #38BDF8 55%, transparent 100%);
          top: 20%; right: -8%;
          animation: orb-drift-2 22s ease-in-out infinite;
        }
        .hero-orb-3 {
          width: 360px; height: 360px;
          background: radial-gradient(circle, #DBEAFE 0%, #818CF8 60%, transparent 100%);
          bottom: -10%; left: 30%;
          animation: orb-drift-3 16s ease-in-out infinite;
        }
        .hero-orb-4 {
          width: 280px; height: 280px;
          background: radial-gradient(circle, #CCFBF1 0%, #2DD4BF 60%, transparent 100%);
          top: 10%; left: 40%;
          animation: orb-drift-4 20s ease-in-out infinite;
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
// Faint scan-pulse sweeps across the field periodically.
function PerspectiveGrid() {
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

    let offset = 0;
    let scanY = -0.1;
    let raf: number;

    const COLS = 14;
    const ROWS = 20;

    function draw() {
      ctx.clearRect(0, 0, W, H);

      const vpx = W * 0.5;
      const vpy = H * 0.38;
      const floorH = H - vpy;

      // ── Vertical perspective lines ──
      for (let c = 0; c <= COLS; c++) {
        const t = c / COLS;
        // Spread: tight at VP, full width at bottom
        const bx = W * t;
        const vx = vpx + (bx - vpx) * 0.08; // converge toward vp

        const alpha = 0.055 + (Math.abs(t - 0.5) < 0.08 ? 0.03 : 0);
        ctx.strokeStyle = `rgba(14,165,233,${alpha})`;
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(vx, vpy);
        ctx.lineTo(bx, H);
        ctx.stroke();
      }

      // ── Horizontal perspective lines (scrolling) ──
      for (let r = 0; r <= ROWS; r++) {
        const rawT = ((r / ROWS) + (offset % 1)) % 1; // 0..1
        // Perspective compression: exponential - lines bunch near VP
        const perspT = Math.pow(rawT, 2.2);
        const y = vpy + perspT * floorH;
        if (y > H + 2) continue;

        // Left/right X for this row (converge toward vpx at top)
        const spreadFrac = perspT;
        const lx = vpx - spreadFrac * vpx;
        const rx = vpx + spreadFrac * (W - vpx);

        const alpha = perspT * 0.12;
        ctx.strokeStyle = `rgba(14,165,233,${alpha})`;
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(lx, y);
        ctx.lineTo(rx, y);
        ctx.stroke();
      }

      // ── Scan pulse (sweeps floor periodically) ──
      if (scanY > 0 && scanY < 1) {
        const sy = vpy + Math.pow(scanY, 2.2) * floorH;
        const sSpread = Math.pow(scanY, 2.2);
        const slx = vpx - sSpread * vpx;
        const srx = vpx + sSpread * (W - vpx);

        const scanGrad = ctx.createLinearGradient(slx, sy, srx, sy);
        scanGrad.addColorStop(0, "rgba(14,165,233,0)");
        scanGrad.addColorStop(0.5, "rgba(14,165,233,0.25)");
        scanGrad.addColorStop(1, "rgba(14,165,233,0)");
        ctx.strokeStyle = scanGrad as unknown as string;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(slx, sy);
        ctx.lineTo(srx, sy);
        ctx.stroke();
      }

      // Glow at vanishing point
      const vpGlow = ctx.createRadialGradient(vpx, vpy, 0, vpx, vpy, 80);
      vpGlow.addColorStop(0, "rgba(14,165,233,0.12)");
      vpGlow.addColorStop(1, "rgba(14,165,233,0)");
      ctx.fillStyle = vpGlow;
      ctx.beginPath();
      ctx.arc(vpx, vpy, 80, 0, Math.PI * 2);
      ctx.fill();

      offset += 0.006;
      scanY += 0.004;
      if (scanY > 1.1) scanY = -0.15; // reset

      raf = requestAnimationFrame(draw);
    }

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    raf = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);

  return <canvas ref={ref} className="absolute inset-0 w-full h-full opacity-70" />;
}

// ─── Export ───────────────────────────────────────────────────────────────────
export function AnimatedHeroBg({ variant = "blockchain" }: Props) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {variant === "blockchain" && <BlockchainCanvas />}
      {variant === "orbs"       && <GradientOrbs />}
      {variant === "grid"       && <PerspectiveGrid />}
    </div>
  );
}
