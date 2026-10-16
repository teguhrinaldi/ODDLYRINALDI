"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Ambient critters living inside every page section, drawn procedurally (no
 * external animation files, so nothing to license and only a few KB):
 *
 * - a house gecko (cicak) that roams its section in quick dashes and
 *   freezes, stalks and eats flies, and scurries away from the cursor;
 * - flies that buzz around, land now and then, and respawn after being eaten;
 * - butterflies in the brand palette that flutter across the section.
 *
 * Each top-level `main > section` (and the footer) gets its own canvas, so
 * the critters scroll with the content. Only on-screen sections animate.
 * Canvases ignore pointer events, and nothing renders for visitors who
 * prefer reduced motion.
 */

type Vec = { x: number; y: number };

const TAU = Math.PI * 2;
const INK = "#111111";
const GECKO_FILL = "#cdb88f";
const GECKO_SPOT = "#a8916a";
const WING_COLORS = ["#ff735e", "#ffd928", "#8c5cff", "#4a73ff", "#ff8a3d"];

const rand = (a: number, b: number) => a + Math.random() * (b - a);
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
const dist = (a: Vec, b: Vec) => Math.hypot(a.x - b.x, a.y - b.y);
const lerp = (a: Vec, b: Vec, t: number): Vec => ({ x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t });
const angleDiff = (from: number, to: number) => {
  let d = (to - from) % TAU;
  if (d > Math.PI) d -= TAU;
  if (d < -Math.PI) d += TAU;
  return d;
};

type World = { w: number; h: number; pointer: Vec | null; flies: Fly[] };

/* ------------------------------------------------------------------ */
/* Fly                                                                 */
/* ------------------------------------------------------------------ */

class Fly {
  pos: Vec = { x: 0, y: 0 };
  vel: Vec = { x: 0, y: 0 };
  home: Vec = { x: 0, y: 0 };
  homeGoal: Vec = { x: 0, y: 0 };
  angle = 0;
  landed = 0;
  wing = 0;
  eaten = false;
  respawnIn = 0;

  constructor(w: number, h: number, offscreen: boolean) {
    this.spawn(w, h, offscreen);
  }

  spawn(w: number, h: number, offscreen: boolean) {
    this.eaten = false;
    this.landed = 0;
    this.vel = { x: 0, y: 0 };
    this.home = { x: rand(0.1, 0.9) * w, y: rand(0.15, 0.9) * h };
    this.homeGoal = { ...this.home };
    if (!offscreen) {
      this.pos = { ...this.home };
      return;
    }
    // Fly in from a random edge.
    const side = Math.floor(Math.random() * 4);
    this.pos =
      side === 0 ? { x: -20, y: rand(0, h) }
      : side === 1 ? { x: w + 20, y: rand(0, h) }
      : side === 2 ? { x: rand(0, w), y: -20 }
      : { x: rand(0, w), y: h + 20 };
  }

  update(dt: number, world: World) {
    if (this.eaten) {
      this.respawnIn -= dt;
      if (this.respawnIn <= 0) this.spawn(world.w, world.h, true);
      return;
    }
    const { pointer } = world;
    const near = pointer && dist(pointer, this.pos) < 90;

    if (this.landed > 0) {
      this.landed -= dt;
      if (near) this.landed = 0;
      return;
    }

    this.wing += dt;
    if (dist(this.home, this.homeGoal) < 20) {
      this.homeGoal = { x: rand(0.05, 0.95) * world.w, y: rand(0.1, 0.95) * world.h };
    }
    const toGoal = Math.atan2(this.homeGoal.y - this.home.y, this.homeGoal.x - this.home.x);
    this.home.x += Math.cos(toGoal) * 45 * dt;
    this.home.y += Math.sin(toGoal) * 45 * dt;

    // Spring toward the drifting home point plus a lot of jitter = buzzing.
    let ax = (this.home.x - this.pos.x) * 5 + rand(-1, 1) * 1100;
    let ay = (this.home.y - this.pos.y) * 5 + rand(-1, 1) * 1100;
    if (near && pointer) {
      const a = Math.atan2(this.pos.y - pointer.y, this.pos.x - pointer.x);
      ax += Math.cos(a) * 3000;
      ay += Math.sin(a) * 3000;
    }
    this.vel.x = (this.vel.x + ax * dt) * (1 - 2.5 * dt);
    this.vel.y = (this.vel.y + ay * dt) * (1 - 2.5 * dt);
    const sp = Math.hypot(this.vel.x, this.vel.y);
    if (sp > 280) {
      this.vel.x *= 280 / sp;
      this.vel.y *= 280 / sp;
    }
    this.pos.x += this.vel.x * dt;
    this.pos.y += this.vel.y * dt;
    if (sp > 20) this.angle = Math.atan2(this.vel.y, this.vel.x);

    if (!near && Math.random() < dt * 0.12) this.landed = rand(1.5, 4.5);
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.eaten) return;
    ctx.save();
    ctx.translate(this.pos.x, this.pos.y);
    ctx.rotate(this.angle);

    // Wings: a fast flicker while flying, folded back while landed.
    const flying = this.landed <= 0;
    const spread = flying ? 0.9 + Math.sin(this.wing * 90) * 0.5 : 0.25;
    ctx.fillStyle = flying ? "rgba(190, 205, 220, 0.55)" : "rgba(190, 205, 220, 0.8)";
    ctx.strokeStyle = "rgba(17, 17, 17, 0.45)";
    ctx.lineWidth = 0.8;
    for (const side of [-1, 1]) {
      ctx.save();
      ctx.rotate(Math.PI + side * spread);
      ctx.beginPath();
      ctx.ellipse(4, 0, 4.5, 2.2, 0, 0, TAU);
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    }

    ctx.fillStyle = INK;
    ctx.beginPath();
    ctx.ellipse(-0.5, 0, 3.4, 2.2, 0, 0, TAU);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(3, 0, 1.7, 0, TAU);
    ctx.fill();
    ctx.restore();
  }
}

/* ------------------------------------------------------------------ */
/* Gecko                                                               */
/* ------------------------------------------------------------------ */

// Half-width of the body at each spine point, snout (0) to tail tip.
const BODY_WIDTH = [1.5, 4.2, 5.8, 6, 4.4, 5.4, 7, 7.6, 7.8, 7.6, 7, 6, 4.8, 4, 3.4, 2.9, 2.4, 2, 1.6, 1.2, 0.8, 0.4];
const FRONT_ANCHOR = 6;
const HIND_ANCHOR = 11;

type Foot = {
  anchor: number;
  side: 1 | -1;
  fwd: number;
  lat: number;
  group: 0 | 1;
  front: boolean;
  pos: Vec;
  from: Vec;
  to: Vec;
  t: number;
  stepping: boolean;
  stepDur: number;
};

type GeckoMode = "dash" | "freeze" | "flee" | "hunt";

class Gecko {
  s: number;
  seg: number;
  spine: Vec[];
  feet: Foot[];
  heading: number;
  speed = 0;
  speedTarget = 0;
  gait = 0;
  mode: GeckoMode = "freeze";
  timer = rand(0.5, 1.5);
  target: Vec;
  prey: Fly | null = null;
  huntCooldown = rand(2, 5);
  tongue = 0;

  constructor(x: number, y: number, scale: number) {
    this.s = scale;
    this.seg = 4.6 * scale;
    this.heading = rand(0, TAU);
    this.target = { x, y };
    const back = this.heading + Math.PI;
    this.spine = BODY_WIDTH.map((_, i) => ({
      x: x + Math.cos(back) * this.seg * i,
      y: y + Math.sin(back) * this.seg * i,
    }));
    const mk = (anchor: number, side: 1 | -1, fwd: number, lat: number, group: 0 | 1): Foot => {
      const f: Foot = {
        anchor, side, fwd, lat, group, front: anchor === FRONT_ANCHOR,
        pos: { x: 0, y: 0 }, from: { x: 0, y: 0 }, to: { x: 0, y: 0 },
        t: 0, stepping: false, stepDur: 0.1,
      };
      f.pos = this.idealFoot(f);
      return f;
    };
    // Diagonal pairs step together: front-left + hind-right, front-right + hind-left.
    this.feet = [
      mk(FRONT_ANCHOR, -1, 6, 13, 0),
      mk(FRONT_ANCHOR, 1, 6, 13, 1),
      mk(HIND_ANCHOR, -1, -4, 13.5, 1),
      mk(HIND_ANCHOR, 1, -4, 13.5, 0),
    ];
  }

  private frame(i: number) {
    const a = this.spine[Math.max(0, i - 1)];
    const b = this.spine[Math.min(this.spine.length - 1, i + 1)];
    const len = Math.hypot(a.x - b.x, a.y - b.y) || 1;
    const fwd = { x: (a.x - b.x) / len, y: (a.y - b.y) / len };
    return { fwd, normal: { x: -fwd.y, y: fwd.x } };
  }

  private idealFoot(f: Foot): Vec {
    const p = this.spine[f.anchor];
    const { fwd, normal } = this.frame(f.anchor);
    return {
      x: p.x + (fwd.x * f.fwd + normal.x * f.side * f.lat) * this.s,
      y: p.y + (fwd.y * f.fwd + normal.y * f.side * f.lat) * this.s,
    };
  }

  private pickRoamTarget(world: World) {
    // Anywhere inside the section, clear of the edges where it would be clipped.
    const m = 30;
    this.target = { x: rand(m, Math.max(m, world.w - m)), y: rand(m, Math.max(m, world.h - m)) };
  }

  private findPrey(world: World, radius: number) {
    const head = this.spine[0];
    let best: Fly | null = null;
    let bestD = radius;
    for (const f of world.flies) {
      if (f.eaten) continue;
      // Landed flies are much more tempting.
      const d = dist(head, f.pos) * (f.landed > 0 ? 0.6 : 1);
      if (d < bestD) {
        bestD = d;
        best = f;
      }
    }
    return best;
  }

  update(dt: number, world: World) {
    const s = this.s;
    const head = this.spine[0];
    const mid = this.spine[8];
    this.timer -= dt;
    this.huntCooldown -= dt;
    if (this.tongue > 0) this.tongue = Math.max(0, this.tongue - dt * 4);

    const { pointer } = world;
    const threat = pointer && Math.min(dist(pointer, head), dist(pointer, mid)) < 105 * s;

    if (threat && pointer) {
      const a = Math.atan2(mid.y - pointer.y, mid.x - pointer.x);
      this.mode = "flee";
      this.timer = 0.55;
      this.prey = null;
      this.target = { x: head.x + Math.cos(a) * 260, y: head.y + Math.sin(a) * 260 };
    } else if (this.mode === "flee") {
      if (this.timer <= 0) {
        this.mode = "freeze";
        this.timer = rand(1, 2.5);
      }
    } else if (this.mode === "hunt") {
      const prey = this.prey;
      if (!prey || prey.eaten || dist(head, prey.pos) > 340 * s) {
        this.prey = null;
        this.mode = "freeze";
        this.timer = rand(0.6, 1.4);
      } else {
        this.target = prey.pos;
        if (dist(head, prey.pos) < 24 * s) {
          prey.eaten = true;
          prey.respawnIn = rand(5, 10);
          this.tongue = 1;
          this.prey = null;
          this.mode = "freeze";
          this.timer = rand(1.5, 3);
          this.huntCooldown = rand(4, 9);
        }
      }
    } else {
      const prey = this.huntCooldown <= 0 ? this.findPrey(world, 230 * s) : null;
      if (prey) {
        this.prey = prey;
        this.mode = "hunt";
      } else if (this.mode === "dash" && (this.timer <= 0 || dist(head, this.target) < 25 * s)) {
        this.mode = "freeze";
        this.timer = rand(0.5, 3);
      } else if (this.mode === "freeze" && this.timer <= 0) {
        this.mode = "dash";
        this.timer = rand(0.5, 1.8);
        if (Math.random() < 0.7 || dist(head, this.target) < 40 * s) this.pickRoamTarget(world);
      }
    }

    // Never wander off for good (e.g. after the window shrinks).
    if (head.x < -260 || head.x > world.w + 260 || head.y < -260 || head.y > world.h + 260) {
      this.target = { x: world.w / 2, y: world.h / 2 };
      if (this.mode === "freeze") this.mode = "dash";
      this.timer = 1;
    }

    // Speed: cicak go from standstill to a dash almost instantly.
    const dHead = dist(head, this.target);
    this.speedTarget =
      this.mode === "flee" ? 330 * s
      : this.mode === "dash" ? 150 * s
      : this.mode === "hunt" ? (dHead > 70 * s ? 170 * s : dHead > 40 * s ? 45 * s : 260 * s)
      : 0;
    this.speed += (this.speedTarget - this.speed) * Math.min(1, dt * 14);

    if (this.speed > 2) {
      const desired = Math.atan2(this.target.y - head.y, this.target.x - head.x);
      const turn = (this.mode === "flee" ? 8 : 5) * dt;
      this.heading += clamp(angleDiff(this.heading, desired), -turn, turn);
      // Lateral body swing while running.
      this.gait += (this.speed * dt) / (9 * s);
      const sway = Math.sin(this.gait) * 0.32 * Math.min(1, this.speed / (150 * s));
      const h = this.heading + sway;
      head.x += Math.cos(h) * this.speed * dt;
      head.y += Math.sin(h) * this.speed * dt;
    }

    // Follow-the-leader spine with a bend limit so the body never kinks.
    for (let i = 1; i < this.spine.length; i++) {
      const prev = this.spine[i - 1];
      const cur = this.spine[i];
      let a = Math.atan2(cur.y - prev.y, cur.x - prev.x);
      if (i >= 2) {
        const pp = this.spine[i - 2];
        const pa = Math.atan2(prev.y - pp.y, prev.x - pp.x);
        const d = angleDiff(pa, a);
        if (Math.abs(d) > 0.38) a = pa + Math.sign(d) * 0.38;
      }
      cur.x = prev.x + Math.cos(a) * this.seg;
      cur.y = prev.y + Math.sin(a) * this.seg;
    }

    // Feet stay planted until they lag too far behind, then step diagonally.
    const threshold = 10 * s;
    for (const f of this.feet) {
      if (f.stepping) {
        f.t += dt / f.stepDur;
        const e = f.t >= 1 ? 1 : 1 - (1 - f.t) * (1 - f.t);
        f.pos = lerp(f.from, f.to, e);
        if (f.t >= 1) f.stepping = false;
        continue;
      }
      const ideal = this.idealFoot(f);
      const lag = dist(f.pos, ideal);
      const otherGroupStepping = this.feet.some((o) => o.group !== f.group && o.stepping);
      const moving = this.speed > 5;
      if (!otherGroupStepping && (lag > threshold || (!moving && lag > 3 * s))) {
        const { fwd } = this.frame(f.anchor);
        const lead = moving ? threshold * 0.6 : 0;
        f.from = { ...f.pos };
        f.to = { x: ideal.x + fwd.x * lead, y: ideal.y + fwd.y * lead };
        f.t = 0;
        f.stepDur = clamp((14 * s) / Math.max(this.speed, 1), 0.06, 0.16);
        f.stepping = true;
      }
    }
  }

  private drawLeg(ctx: CanvasRenderingContext2D, f: Foot) {
    const s = this.s;
    const { fwd, normal } = this.frame(f.anchor);
    const base = this.spine[f.anchor];
    const w = BODY_WIDTH[f.anchor] * s * 0.55;
    const S = { x: base.x + normal.x * f.side * w, y: base.y + normal.y * f.side * w };
    const L = 8.4 * s;
    const F = f.pos;
    const dx = F.x - S.x;
    const dy = F.y - S.y;
    const d = clamp(Math.hypot(dx, dy), 0.01, L * 2 - 0.01);
    const baseA = Math.atan2(dy, dx);
    const off = Math.acos(clamp(d / (2 * L), -1, 1));
    const k1 = { x: S.x + Math.cos(baseA + off) * L, y: S.y + Math.sin(baseA + off) * L };
    const k2 = { x: S.x + Math.cos(baseA - off) * L, y: S.y + Math.sin(baseA - off) * L };
    const dot = (k: Vec) => (k.x - S.x) * fwd.x + (k.y - S.y) * fwd.y;
    // Elbows point back, knees point forward.
    const K = f.front ? (dot(k1) < dot(k2) ? k1 : k2) : dot(k1) > dot(k2) ? k1 : k2;
    const foot = { x: S.x + (dx / Math.hypot(dx, dy || 0.01)) * d, y: S.y + (dy / Math.hypot(dx, dy || 0.01)) * d };

    const toeA = Math.atan2(foot.y - K.y, foot.x - K.x);
    const toes = [-0.95, -0.48, 0, 0.48, 0.95].map((o) => ({
      x: foot.x + Math.cos(toeA + o) * 4.6 * s,
      y: foot.y + Math.sin(toeA + o) * 4.6 * s,
    }));

    const limb = (width: number, color: string) => {
      ctx.strokeStyle = color;
      ctx.lineWidth = width;
      ctx.beginPath();
      ctx.moveTo(S.x, S.y);
      ctx.lineTo(K.x, K.y);
      ctx.lineTo(foot.x, foot.y);
      ctx.stroke();
      ctx.lineWidth = width * 0.45;
      for (const t of toes) {
        ctx.beginPath();
        ctx.moveTo(foot.x, foot.y);
        ctx.lineTo(t.x, t.y);
        ctx.stroke();
      }
    };
    limb(2.7 * s + 2.4, INK);
    limb(2.7 * s, GECKO_FILL);

    // Sticky toe pads.
    for (const t of toes) {
      ctx.fillStyle = GECKO_FILL;
      ctx.strokeStyle = INK;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(t.x, t.y, 1.4 * s, 0, TAU);
      ctx.fill();
      ctx.stroke();
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    const s = this.s;
    const sp = this.spine;
    const n = sp.length;
    const head = this.frame(0);

    // Tongue flick.
    if (this.tongue > 0) {
      const len = Math.sin(this.tongue * Math.PI) * 20 * s;
      ctx.strokeStyle = "#ff735e";
      ctx.lineWidth = 2 * s;
      ctx.beginPath();
      ctx.moveTo(sp[0].x, sp[0].y);
      ctx.lineTo(sp[0].x + head.fwd.x * len, sp[0].y + head.fwd.y * len);
      ctx.stroke();
    }

    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    for (const f of this.feet) this.drawLeg(ctx, f);

    // Body outline: left edge down to the tail tip, right edge back up.
    const left: Vec[] = [];
    const right: Vec[] = [];
    for (let i = 0; i < n; i++) {
      const { normal } = this.frame(i);
      const w = BODY_WIDTH[i] * s;
      left.push({ x: sp[i].x + normal.x * w, y: sp[i].y + normal.y * w });
      right.push({ x: sp[i].x - normal.x * w, y: sp[i].y - normal.y * w });
    }
    const tail = this.frame(n - 1);
    const pts: Vec[] = [
      { x: sp[0].x + head.fwd.x * 3 * s, y: sp[0].y + head.fwd.y * 3 * s },
      ...left,
      { x: sp[n - 1].x - tail.fwd.x * 2 * s, y: sp[n - 1].y - tail.fwd.y * 2 * s },
      ...right.reverse(),
    ];
    ctx.beginPath();
    const m0 = lerp(pts[pts.length - 1], pts[0], 0.5);
    ctx.moveTo(m0.x, m0.y);
    for (let i = 0; i < pts.length; i++) {
      const p = pts[i];
      const m = lerp(p, pts[(i + 1) % pts.length], 0.5);
      ctx.quadraticCurveTo(p.x, p.y, m.x, m.y);
    }
    ctx.closePath();
    ctx.save();
    ctx.shadowColor = "rgba(0, 0, 0, 0.14)";
    ctx.shadowBlur = 6;
    ctx.shadowOffsetY = 3;
    ctx.fillStyle = GECKO_FILL;
    ctx.fill();
    ctx.restore();
    ctx.strokeStyle = INK;
    ctx.lineWidth = 1.6;
    ctx.stroke();

    // Freckles down the back.
    ctx.fillStyle = GECKO_SPOT;
    for (let i = 5; i < 17; i++) {
      const { normal } = this.frame(i);
      const o = (i % 2 ? 1 : -1) * BODY_WIDTH[i] * 0.38 * s;
      ctx.beginPath();
      ctx.arc(sp[i].x + normal.x * o, sp[i].y + normal.y * o, BODY_WIDTH[i] * 0.17 * s, 0, TAU);
      ctx.fill();
    }

    // Eyes.
    const eyeBase = this.frame(2);
    for (const side of [-1, 1]) {
      const ex = sp[2].x + eyeBase.normal.x * side * 3.5 * s;
      const ey = sp[2].y + eyeBase.normal.y * side * 3.5 * s;
      ctx.fillStyle = INK;
      ctx.beginPath();
      ctx.arc(ex, ey, 2.2 * s, 0, TAU);
      ctx.fill();
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(ex + head.fwd.x * 0.6 * s, ey + head.fwd.y * 0.6 * s, 0.75 * s, 0, TAU);
      ctx.fill();
    }
  }
}

/* ------------------------------------------------------------------ */
/* Butterfly                                                           */
/* ------------------------------------------------------------------ */

class Butterfly {
  pos: Vec = { x: 0, y: 0 };
  heading = 0;
  turn = 0;
  phase = rand(0, TAU);
  color = WING_COLORS[0];
  scale = 1;

  constructor(world: World, onscreen: boolean) {
    this.spawn(world, onscreen);
  }

  spawn(world: World, onscreen = false) {
    const fromLeft = Math.random() < 0.5;
    this.pos = onscreen
      ? { x: rand(0.1, 0.9) * world.w, y: rand(0.2, 0.8) * world.h }
      : { x: fromLeft ? -40 : world.w + 40, y: rand(0.15, 0.85) * world.h };
    this.heading = (fromLeft ? 0 : Math.PI) + rand(-0.35, 0.35);
    this.turn = 0;
    this.color = WING_COLORS[Math.floor(Math.random() * WING_COLORS.length)];
    this.scale = rand(1.15, 1.5);
  }

  update(dt: number, world: World) {
    this.phase += dt * 15;
    this.turn = (this.turn + rand(-1, 1) * dt * 4) * (1 - dt * 0.8);
    this.heading += this.turn * dt;

    const { pointer } = world;
    if (pointer && dist(pointer, this.pos) < 120) {
      const away = Math.atan2(this.pos.y - pointer.y, this.pos.x - pointer.x);
      this.heading += clamp(angleDiff(this.heading, away), -3 * dt, 3 * dt);
    }

    // Each wingbeat gives a little surge forward and a little lift.
    const beat = Math.max(0, Math.sin(this.phase));
    const speed = 40 + 45 * beat;
    this.pos.x += Math.cos(this.heading) * speed * dt;
    this.pos.y += Math.sin(this.heading) * speed * dt - beat * 18 * dt + 7 * dt;

    const m = 70;
    if (this.pos.x < -m || this.pos.x > world.w + m || this.pos.y < -m || this.pos.y > world.h + m) {
      this.spawn(world);
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    const flap = 0.12 + 0.88 * Math.abs(Math.cos(this.phase));
    ctx.save();
    ctx.translate(this.pos.x, this.pos.y);
    ctx.rotate(this.heading + Math.PI / 2);
    ctx.scale(this.scale, this.scale);
    ctx.lineJoin = "round";

    for (const side of [-1, 1]) {
      ctx.save();
      ctx.scale(side * flap, 1);
      ctx.fillStyle = this.color;
      ctx.strokeStyle = INK;
      ctx.lineWidth = 1.3;
      // Forewing.
      ctx.beginPath();
      ctx.moveTo(0.5, -3);
      ctx.bezierCurveTo(6, -17, 18, -15, 16, -6);
      ctx.bezierCurveTo(15, -1, 7, 1, 0.5, 0);
      ctx.fill();
      ctx.stroke();
      // Hindwing.
      ctx.beginPath();
      ctx.moveTo(0.5, 0);
      ctx.bezierCurveTo(10, 1, 14, 9, 8, 12);
      ctx.bezierCurveTo(4, 14, 1, 8, 0.5, 4);
      ctx.fill();
      ctx.stroke();
      // Wing spot.
      ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
      ctx.beginPath();
      ctx.arc(10, -8, 2.2, 0, TAU);
      ctx.fill();
      ctx.restore();
    }

    // Body and antennae.
    ctx.fillStyle = INK;
    ctx.beginPath();
    ctx.ellipse(0, 1, 1.7, 8, 0, 0, TAU);
    ctx.fill();
    ctx.strokeStyle = INK;
    ctx.lineWidth = 1;
    for (const side of [-1, 1]) {
      ctx.beginPath();
      ctx.moveTo(0, -6);
      ctx.quadraticCurveTo(side * 2, -11, side * 4.5, -13);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(side * 4.5, -13, 1, 0, TAU);
      ctx.fill();
    }
    ctx.restore();
  }
}


/* ------------------------------------------------------------------ */
/* Per-section hosts                                                   */
/* ------------------------------------------------------------------ */

// Max backing-store pixels per canvas, so tall sections stay cheap on memory.
const MAX_CANVAS_PIXELS = 6_000_000;
const MIN_SECTION_HEIGHT = 160;

type Habitat = {
  section: HTMLElement;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  world: World;
  geckos: Gecko[];
  butterflies: Butterfly[];
  visible: boolean;
  restorePosition: boolean;
};

/** Sections that are not nested inside another section, plus the footer. */
function findSections(): HTMLElement[] {
  const all = Array.from(document.querySelectorAll<HTMLElement>("main section, body footer"));
  return all.filter(
    (el) => !el.parentElement?.closest("main section") && el.offsetHeight >= MIN_SECTION_HEIGHT,
  );
}

function sizeCanvas(h: Habitat) {
  const w = h.section.clientWidth;
  const ht = h.section.clientHeight;
  const dpr = Math.min(window.devicePixelRatio || 1, 2, Math.sqrt(MAX_CANVAS_PIXELS / Math.max(1, w * ht)));
  h.world.w = w;
  h.world.h = ht;
  h.canvas.width = Math.round(w * dpr);
  h.canvas.height = Math.round(ht * dpr);
  h.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

function createHabitat(section: HTMLElement, index: number, small: boolean): Habitat | null {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  canvas.setAttribute("aria-hidden", "true");
  canvas.dataset.critters = "";
  canvas.className = "pointer-events-none absolute inset-0 z-30 h-full w-full print:hidden";

  // The canvas is positioned against its section.
  const restorePosition = getComputedStyle(section).position === "static";
  if (restorePosition) section.style.position = "relative";
  section.appendChild(canvas);

  const world: World = { w: 1, h: 1, pointer: null, flies: [] };
  const habitat: Habitat = {
    section, canvas, ctx, world, geckos: [], butterflies: [], visible: false, restorePosition,
  };
  sizeCanvas(habitat);

  // Rotate through a few casts so neighbouring sections feel different.
  const cast = index % 3;
  const geckoScale = small ? 0.75 : 0.95;
  const spawnGecko = () =>
    new Gecko(rand(0.2, 0.8) * world.w, rand(0.25, 0.75) * world.h, geckoScale);
  const flyCount = cast === 0 ? 2 : 1;
  world.flies = Array.from({ length: small ? 1 : flyCount }, () => new Fly(world.w, world.h, false));
  if (cast !== 1) habitat.geckos.push(spawnGecko());
  const butterflyCount = cast === 1 ? (small ? 1 : 2) : cast === 2 && !small ? 1 : 0;
  habitat.butterflies = Array.from({ length: butterflyCount }, () => new Butterfly(world, true));
  return habitat;
}

export default function LivelyCritters() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let habitats: Habitat[] = [];
    let raf = 0;
    let last = performance.now();
    let pointer: Vec | null = null;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const h = habitats.find((x) => x.section === e.target);
          if (h) h.visible = e.isIntersecting;
        }
      },
      { rootMargin: "100px 0px" },
    );
    const ro = new ResizeObserver((entries) => {
      for (const e of entries) {
        const h = habitats.find((x) => x.section === e.target);
        if (h) sizeCanvas(h);
      }
    });

    const tick = (now: number) => {
      // Clamp so a backgrounded tab doesn't teleport everything on return.
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      for (const h of habitats) {
        if (!h.visible) continue;
        const { world, ctx } = h;
        if (pointer) {
          const r = h.section.getBoundingClientRect();
          world.pointer = { x: pointer.x - r.left, y: pointer.y - r.top };
        } else {
          world.pointer = null;
        }
        for (const f of world.flies) f.update(dt, world);
        for (const g of h.geckos) g.update(dt, world);
        for (const b of h.butterflies) b.update(dt, world);

        ctx.clearRect(0, 0, world.w, world.h);
        for (const g of h.geckos) g.draw(ctx);
        for (const f of world.flies) f.draw(ctx);
        for (const b of h.butterflies) b.draw(ctx);
      }
      raf = requestAnimationFrame(tick);
    };

    // Wait a frame so the new page's sections are in the DOM.
    const start = requestAnimationFrame(() => {
      const small = window.innerWidth < 640;
      habitats = findSections()
        .map((s, i) => createHabitat(s, i, small))
        .filter((h): h is Habitat => h !== null);
      for (const h of habitats) {
        io.observe(h.section);
        ro.observe(h.section);
      }
      last = performance.now();
      raf = requestAnimationFrame(tick);
    });

    const onMove = (e: PointerEvent) => {
      pointer = { x: e.clientX, y: e.clientY };
    };
    const onLeave = () => {
      pointer = null;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(start);
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      for (const h of habitats) {
        h.canvas.remove();
        if (h.restorePosition) h.section.style.position = "";
      }
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [pathname]);

  return null;
}
