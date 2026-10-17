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
 * - butterflies in the brand palette that flutter across the section;
 * - ladybugs that crawl and take off, ant trails, snails along the bottom
 *   edge, spiders dangling from the top, bees, and darting dragonflies.
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
  readonly layer = 2;
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
  readonly layer = 1;
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
  readonly layer = 2;
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
/* Shared critter plumbing                                             */
/* ------------------------------------------------------------------ */

/** Anything that lives in a section. Lower layers are drawn first. */
type Critter = {
  layer: number;
  update(dt: number, world: World): void;
  draw(ctx: CanvasRenderingContext2D): void;
};

const LADYBUG_RED = "#e8412c";
const SHELL_COLORS = ["#ff8a3d", "#ffd928", "#8c5cff", "#ff735e"];

const pointerNear = (world: World, p: Vec, r: number) => !!world.pointer && dist(world.pointer, p) < r;
const randomInside = (world: World, margin = 0.1): Vec => ({
  x: rand(margin, 1 - margin) * world.w,
  y: rand(margin, 1 - margin) * world.h,
});

/** Turn a heading back toward the middle once it gets close to an edge. */
function steerFromEdges(pos: Vec, heading: number, world: World, margin: number, maxTurn: number) {
  const inside =
    pos.x > margin && pos.x < world.w - margin && pos.y > margin && pos.y < world.h - margin;
  if (inside) return heading;
  const toCenter = Math.atan2(world.h / 2 - pos.y, world.w / 2 - pos.x);
  return heading + clamp(angleDiff(heading, toCenter), -maxTurn, maxTurn);
}

/* ------------------------------------------------------------------ */
/* Ladybug: crawls, pauses, and now and then flies off somewhere else  */
/* ------------------------------------------------------------------ */

class Ladybug {
  readonly layer = 1;
  pos: Vec;
  heading = rand(0, TAU);
  turn = 0;
  walk = 0;
  mode: "crawl" | "pause" | "fly" = "crawl";
  timer = rand(2, 5);
  from: Vec = { x: 0, y: 0 };
  to: Vec = { x: 0, y: 0 };
  flight = 0;
  flightDur = 1;

  constructor(world: World) {
    this.pos = randomInside(world, 0.15);
  }

  private takeOff(world: World) {
    this.mode = "fly";
    this.from = { ...this.pos };
    this.to = randomInside(world, 0.12);
    this.flight = 0;
    this.flightDur = clamp(dist(this.from, this.to) / 160, 0.8, 2.2);
    this.heading = Math.atan2(this.to.y - this.from.y, this.to.x - this.from.x);
  }

  update(dt: number, world: World) {
    this.timer -= dt;
    if (this.mode === "fly") {
      this.flight += dt / this.flightDur;
      const t = Math.min(1, this.flight);
      const e = t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2;
      this.pos = lerp(this.from, this.to, e);
      if (t >= 1) {
        this.mode = "pause";
        this.timer = rand(0.8, 2);
      }
      return;
    }
    if (pointerNear(world, this.pos, 60)) {
      this.takeOff(world);
      return;
    }
    if (this.mode === "pause") {
      if (this.timer <= 0) {
        this.mode = "crawl";
        this.timer = rand(3, 7);
      }
      return;
    }
    if (this.timer <= 0) {
      if (Math.random() < 0.3) {
        this.takeOff(world);
      } else {
        this.mode = "pause";
        this.timer = rand(0.8, 2.5);
      }
      return;
    }
    this.turn = (this.turn + rand(-1, 1) * dt * 6) * (1 - dt * 1.5);
    this.heading = steerFromEdges(this.pos, this.heading + this.turn * dt, world, 30, dt * 3);
    this.walk += dt * 14;
    this.pos.x += Math.cos(this.heading) * 22 * dt;
    this.pos.y += Math.sin(this.heading) * 22 * dt;
  }

  draw(ctx: CanvasRenderingContext2D) {
    const flying = this.mode === "fly";
    const lift = flying ? Math.sin(Math.min(1, this.flight) * Math.PI) : 0;

    ctx.fillStyle = `rgba(0, 0, 0, ${0.12 - lift * 0.06})`;
    ctx.beginPath();
    ctx.ellipse(this.pos.x + lift * 6, this.pos.y + 2 + lift * 10, 7, 5.5, this.heading, 0, TAU);
    ctx.fill();

    ctx.save();
    ctx.translate(this.pos.x, this.pos.y);
    ctx.rotate(this.heading);
    const sc = 1 + lift * 0.25;
    ctx.scale(sc, sc);
    ctx.strokeStyle = INK;
    ctx.lineCap = "round";

    if (!flying) {
      ctx.lineWidth = 1;
      for (const i of [-1, 0, 1]) {
        for (const side of [-1, 1]) {
          const sw = this.mode === "crawl" ? Math.sin(this.walk + i * 2 + (side > 0 ? Math.PI : 0)) * 1.2 : 0;
          ctx.beginPath();
          ctx.moveTo(i * 3, side * 3);
          ctx.lineTo(i * 3.5 + sw, side * 8);
          ctx.stroke();
        }
      }
    }

    // Head with little white eyes.
    ctx.fillStyle = INK;
    ctx.beginPath();
    ctx.arc(6, 0, 3.2, 0, TAU);
    ctx.fill();
    ctx.fillStyle = "#ffffff";
    for (const side of [-1, 1]) {
      ctx.beginPath();
      ctx.arc(7.4, side * 1.6, 0.8, 0, TAU);
      ctx.fill();
    }

    // Gauzy hind wings peek out from under the shell while flying.
    if (flying) {
      ctx.fillStyle = `rgba(220, 230, 245, ${0.45 + Math.sin(this.flight * 160) * 0.2})`;
      ctx.strokeStyle = "rgba(17, 17, 17, 0.4)";
      ctx.lineWidth = 0.8;
      for (const side of [-1, 1]) {
        ctx.beginPath();
        ctx.ellipse(-3, side * 8, 8, 3.5, side * 0.5, 0, TAU);
        ctx.fill();
        ctx.stroke();
      }
    }

    // Wing cases: two halves that split open in flight.
    const open = flying ? 0.55 : 0;
    for (const side of [-1, 1]) {
      ctx.save();
      ctx.rotate(side * open);
      ctx.beginPath();
      ctx.ellipse(-1, 0, 7, 6, 0, side > 0 ? 0 : Math.PI, side > 0 ? Math.PI : TAU);
      ctx.closePath();
      ctx.fillStyle = LADYBUG_RED;
      ctx.fill();
      ctx.strokeStyle = INK;
      ctx.lineWidth = 1.2;
      ctx.stroke();
      ctx.fillStyle = INK;
      for (const [sx, sy, r] of [[1, 3.4, 1.3], [-4, 2.2, 1.1], [-6, 1.5, 0.9]]) {
        ctx.beginPath();
        ctx.arc(sx, side * sy, r, 0, TAU);
        ctx.fill();
      }
      ctx.restore();
    }
    ctx.restore();
  }
}

/* ------------------------------------------------------------------ */
/* Ant trail: a column of ants marching along a curvy path             */
/* ------------------------------------------------------------------ */

type Ant = { d: number; carry: boolean; push: Vec; phase: number };

const ANT_SPEED = 34;
const ANT_GAP = 220; // off-path distance before the column loops back in

class AntTrail {
  readonly layer = 0;
  pts: Vec[] = [];
  cum: number[] = [];
  length = 1;
  builtW = 0;
  ants: Ant[];

  constructor(world: World, count: number) {
    this.build(world);
    this.ants = Array.from({ length: count }, (_, i) => ({
      d: i * 20 + rand(0, 8),
      carry: Math.random() < 0.35,
      push: { x: 0, y: 0 },
      phase: rand(0, TAU),
    }));
  }

  private build(world: World) {
    const { w, h } = world;
    const ltr = Math.random() < 0.5;
    const p0 = { x: ltr ? -20 : w + 20, y: rand(0.2, 0.8) * h };
    const p1 = { x: w * (ltr ? 0.33 : 0.67), y: rand(0.1, 0.9) * h };
    const p2 = { x: w * (ltr ? 0.67 : 0.33), y: rand(0.1, 0.9) * h };
    const p3 = { x: ltr ? w + 20 : -20, y: rand(0.2, 0.8) * h };
    this.pts = [];
    this.cum = [0];
    const n = 120;
    for (let i = 0; i <= n; i++) {
      const t = i / n;
      const u = 1 - t;
      const p = {
        x: u * u * u * p0.x + 3 * u * u * t * p1.x + 3 * u * t * t * p2.x + t * t * t * p3.x,
        y: u * u * u * p0.y + 3 * u * u * t * p1.y + 3 * u * t * t * p2.y + t * t * t * p3.y,
      };
      if (i > 0) this.cum.push(this.cum[i - 1] + dist(this.pts[i - 1], p));
      this.pts.push(p);
    }
    this.length = this.cum[n];
    this.builtW = w;
  }

  private at(d: number) {
    let i = 1;
    while (i < this.cum.length - 1 && this.cum[i] < d) i++;
    const a = this.pts[i - 1];
    const b = this.pts[i];
    const seg = this.cum[i] - this.cum[i - 1] || 1;
    return { p: lerp(a, b, (d - this.cum[i - 1]) / seg), angle: Math.atan2(b.y - a.y, b.x - a.x) };
  }

  update(dt: number, world: World) {
    if (Math.abs(world.w - this.builtW) > 40) this.build(world);
    const loop = this.length + ANT_GAP;
    for (const ant of this.ants) {
      ant.d = (ant.d + ANT_SPEED * dt) % loop;
      ant.phase += dt * 18;
      if (ant.d > this.length) continue;
      const { p } = this.at(ant.d);
      const at = { x: p.x + ant.push.x, y: p.y + ant.push.y };
      if (world.pointer && pointerNear(world, at, 55)) {
        // Scatter away from the cursor, then file back into line.
        const a = Math.atan2(at.y - world.pointer.y, at.x - world.pointer.x);
        ant.push.x = clamp(ant.push.x + Math.cos(a) * 160 * dt, -28, 28);
        ant.push.y = clamp(ant.push.y + Math.sin(a) * 160 * dt, -28, 28);
      } else {
        ant.push.x *= 1 - Math.min(1, dt * 1.5);
        ant.push.y *= 1 - Math.min(1, dt * 1.5);
      }
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    for (const ant of this.ants) {
      if (ant.d > this.length) continue;
      const { p, angle } = this.at(ant.d);
      ctx.save();
      ctx.translate(p.x + ant.push.x, p.y + ant.push.y + Math.sin(ant.phase * 0.3) * 0.8);
      ctx.rotate(angle);
      ctx.strokeStyle = INK;
      ctx.fillStyle = INK;
      ctx.lineCap = "round";
      ctx.lineWidth = 0.9;
      for (const i of [-1, 0, 1]) {
        for (const side of [-1, 1]) {
          ctx.beginPath();
          ctx.moveTo(i * 2, 0);
          ctx.lineTo(i * 2.6 + Math.sin(ant.phase + i + side) * 1.2, side * 4.2);
          ctx.stroke();
        }
      }
      for (const side of [-1, 1]) {
        ctx.beginPath();
        ctx.moveTo(4, side * 0.6);
        ctx.lineTo(6.5, side * 2.3);
        ctx.stroke();
      }
      ctx.beginPath();
      ctx.ellipse(-4, 0, 2.8, 2.1, 0, 0, TAU);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(0, 0, 1.6, 1.1, 0, 0, TAU);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(3, 0, 1.6, 0, TAU);
      ctx.fill();
      if (ant.carry) {
        ctx.fillStyle = "#ffd928";
        ctx.lineWidth = 0.6;
        ctx.beginPath();
        ctx.arc(6.2, 0, 1.9, 0, TAU);
        ctx.fill();
        ctx.stroke();
      }
      ctx.restore();
    }
  }
}

/* ------------------------------------------------------------------ */
/* Snail: inches along the bottom edge, hides in its shell if poked    */
/* ------------------------------------------------------------------ */

class Snail {
  readonly layer = 0;
  x: number;
  y = 0;
  w = 0;
  dir: 1 | -1;
  t = rand(0, TAU);
  hide = 0;
  hideTimer = 0;
  shell: string;

  constructor(world: World) {
    this.x = rand(0.1, 0.9) * world.w;
    this.dir = Math.random() < 0.5 ? 1 : -1;
    this.shell = SHELL_COLORS[Math.floor(Math.random() * SHELL_COLORS.length)];
  }

  update(dt: number, world: World) {
    this.w = world.w;
    this.y = world.h - 3;
    if (pointerNear(world, { x: this.x, y: this.y - 10 }, 70)) this.hideTimer = 2.5;
    else this.hideTimer -= dt;
    const target = this.hideTimer > 0 ? 1 : 0;
    this.hide += (target - this.hide) * Math.min(1, dt * (target ? 10 : 2));
    if (this.hide < 0.1) {
      this.t += dt * 2.2;
      this.x += this.dir * (6 + 10 * (0.5 + 0.5 * Math.sin(this.t))) * dt;
    }
    if (this.x > world.w + 40) this.x = -40;
    if (this.x < -40) this.x = world.w + 40;
  }

  draw(ctx: CanvasRenderingContext2D) {
    const { x, y, dir, hide } = this;

    // Slime trail fading out behind it.
    const tail = x - dir * 140;
    const g = ctx.createLinearGradient(tail, y, x, y);
    g.addColorStop(0, "rgba(160, 180, 215, 0)");
    g.addColorStop(1, "rgba(160, 180, 215, 0.4)");
    ctx.strokeStyle = g;
    ctx.lineWidth = 2.5;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(tail, y);
    ctx.lineTo(x, y);
    ctx.stroke();

    ctx.save();
    ctx.translate(x, y);
    ctx.scale(dir, 1);
    const out = 1 - hide;
    const stretch = 1 + 0.12 * Math.sin(this.t) * out;

    if (out > 0.05) {
      // Foot and head.
      ctx.fillStyle = "#d9c7a7";
      ctx.strokeStyle = INK;
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.ellipse(-1, -3, 15 * stretch * (0.4 + 0.6 * out), 3.5, 0, 0, TAU);
      ctx.fill();
      ctx.stroke();
      const hx = 12 * stretch * out;
      ctx.beginPath();
      ctx.arc(hx, -5, 3.6, 0, TAU);
      ctx.fill();
      ctx.stroke();
      // Eye stalks.
      if (out > 0.4) {
        ctx.lineWidth = 1.2;
        for (const [bx, tx, ty] of [[hx + 1, hx + 4, -14], [hx - 1, hx + 0.5, -13]]) {
          const top = -7 + (ty + 7) * out;
          ctx.beginPath();
          ctx.moveTo(bx, -7);
          ctx.lineTo(tx, top);
          ctx.stroke();
          ctx.fillStyle = INK;
          ctx.beginPath();
          ctx.arc(tx, top, 1.5, 0, TAU);
          ctx.fill();
        }
      }
    }

    // Shell with a spiral.
    ctx.fillStyle = this.shell;
    ctx.strokeStyle = INK;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(-3, -11, 9, 0, TAU);
    ctx.fill();
    ctx.stroke();
    ctx.lineWidth = 1.1;
    ctx.beginPath();
    for (let a = 0; a <= Math.PI * 3.5; a += 0.2) {
      const r = 7.5 - (a / (Math.PI * 3.5)) * 7;
      const px = -3 + Math.cos(a) * r;
      const py = -11 + Math.sin(a) * r;
      if (a === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();
    ctx.restore();
  }
}

/* ------------------------------------------------------------------ */
/* Spider: drops in on a thread, dangles, and climbs back up           */
/* ------------------------------------------------------------------ */

class Spider {
  readonly layer = 3;
  x = 0;
  len = -15;
  target = 0;
  mode: "wait" | "down" | "hang" | "up" = "wait";
  timer = rand(0.5, 3);
  swing = 0;
  legs = 0;
  flee = false;

  private get pos(): Vec {
    const sway = Math.sin(this.swing) * 0.08;
    return { x: this.x + Math.sin(sway) * this.len, y: Math.cos(sway) * this.len };
  }

  update(dt: number, world: World) {
    this.timer -= dt;
    if ((this.mode === "down" || this.mode === "hang") && pointerNear(world, this.pos, 70)) {
      this.mode = "up";
      this.flee = true;
    }
    switch (this.mode) {
      case "wait":
        if (this.timer <= 0) {
          this.x = rand(0.1, 0.9) * world.w;
          this.target = clamp(rand(0.25, 0.6) * Math.min(world.h, 600), 40, world.h - 30);
          this.swing = 0;
          this.mode = "down";
        }
        break;
      case "down":
        this.len += 60 * dt;
        this.legs += dt * 10;
        if (this.len >= this.target) {
          this.mode = "hang";
          this.timer = rand(2, 5);
        }
        break;
      case "hang":
        this.swing += dt * 1.6;
        this.len = this.target + Math.sin(this.swing * 1.3) * 3;
        if (this.timer <= 0) this.mode = "up";
        break;
      case "up":
        this.len -= (this.flee ? 220 : 90) * dt;
        this.legs += dt * 14;
        if (this.len <= -15) {
          this.len = -15;
          this.mode = "wait";
          this.flee = false;
          this.timer = rand(3, 8);
        }
        break;
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.mode === "wait") return;
    const { x, y } = this.pos;

    ctx.strokeStyle = "rgba(17, 17, 17, 0.45)";
    ctx.lineWidth = 0.8;
    ctx.beginPath();
    ctx.moveTo(this.x, 0);
    ctx.lineTo(x, y - 4);
    ctx.stroke();

    ctx.save();
    ctx.translate(x, y);
    ctx.strokeStyle = INK;
    ctx.lineWidth = 1.1;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    for (let i = 0; i < 4; i++) {
      const a = -0.9 + i * 0.6 + Math.sin(this.legs + i * 1.3) * 0.15;
      for (const side of [-1, 1]) {
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(side * Math.cos(a) * 6, Math.sin(a) * 6 - 3);
        ctx.lineTo(side * Math.cos(a) * 10, Math.sin(a) * 10 + 2);
        ctx.stroke();
      }
    }
    ctx.fillStyle = INK;
    ctx.beginPath();
    ctx.arc(0, 3, 5, 0, TAU);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(0, -2.5, 3.3, 0, TAU);
    ctx.fill();
    // Big cartoon eyes.
    for (const side of [-1, 1]) {
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(side * 1.4, -2.6, 1.4, 0, TAU);
      ctx.fill();
      ctx.fillStyle = INK;
      ctx.beginPath();
      ctx.arc(side * 1.4, -2.2, 0.65, 0, TAU);
      ctx.fill();
    }
    ctx.restore();
  }
}

/* ------------------------------------------------------------------ */
/* Bee: loops in lazy figure-eights around a drifting spot             */
/* ------------------------------------------------------------------ */

class Bee {
  readonly layer = 2;
  home: Vec;
  goal: Vec;
  pos: Vec;
  t = rand(0, 100);
  angle = 0;
  wing = 0;
  r = rand(18, 30);

  constructor(world: World) {
    this.home = randomInside(world, 0.15);
    this.goal = { ...this.home };
    this.pos = { ...this.home };
  }

  update(dt: number, world: World) {
    this.t += dt;
    this.wing += dt;
    if (dist(this.home, this.goal) < 10) this.goal = randomInside(world, 0.12);
    const toGoal = Math.atan2(this.goal.y - this.home.y, this.goal.x - this.home.x);
    this.home.x += Math.cos(toGoal) * 35 * dt;
    this.home.y += Math.sin(toGoal) * 35 * dt;
    if (world.pointer && pointerNear(world, this.home, 90)) {
      const a = Math.atan2(this.home.y - world.pointer.y, this.home.x - world.pointer.x);
      this.home.x += Math.cos(a) * 120 * dt;
      this.home.y += Math.sin(a) * 120 * dt;
    }
    const prev = this.pos;
    this.pos = {
      x: this.home.x + Math.sin(this.t * 2.1) * this.r,
      y: this.home.y + Math.sin(this.t * 4.2) * this.r * 0.5 + Math.sin(this.t * 1.3) * 4,
    };
    if (dist(prev, this.pos) > 0.01) this.angle = Math.atan2(this.pos.y - prev.y, this.pos.x - prev.x);
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.translate(this.pos.x, this.pos.y);
    ctx.rotate(this.angle);

    ctx.fillStyle = INK;
    ctx.beginPath();
    ctx.moveTo(-6.2, -1);
    ctx.lineTo(-9.2, 0);
    ctx.lineTo(-6.2, 1);
    ctx.fill();

    // Striped body.
    ctx.beginPath();
    ctx.ellipse(0, 0, 6.5, 4.2, 0, 0, TAU);
    ctx.fillStyle = "#ffd928";
    ctx.fill();
    ctx.save();
    ctx.clip();
    ctx.fillStyle = INK;
    ctx.fillRect(-3.2, -5, 1.8, 10);
    ctx.fillRect(0.4, -5, 1.8, 10);
    ctx.restore();
    ctx.strokeStyle = INK;
    ctx.lineWidth = 1.3;
    ctx.stroke();

    ctx.fillStyle = INK;
    ctx.beginPath();
    ctx.arc(6.6, 0, 2.6, 0, TAU);
    ctx.fill();

    // Blurry wings on top.
    ctx.fillStyle = `rgba(255, 255, 255, ${0.55 + Math.sin(this.wing * 120) * 0.25})`;
    ctx.strokeStyle = "rgba(17, 17, 17, 0.5)";
    ctx.lineWidth = 0.8;
    for (const side of [-1, 1]) {
      ctx.beginPath();
      ctx.ellipse(-0.5, side * 4.5, 4.2, 2.6, side * 0.45, 0, TAU);
      ctx.fill();
      ctx.stroke();
    }
    ctx.restore();
  }
}

/* ------------------------------------------------------------------ */
/* Dragonfly: hovers in place, then darts somewhere else in a blink    */
/* ------------------------------------------------------------------ */

class Dragonfly {
  readonly layer = 2;
  pos: Vec;
  from: Vec = { x: 0, y: 0 };
  to: Vec = { x: 0, y: 0 };
  mode: "hover" | "dart" = "hover";
  timer = rand(0.5, 2);
  t = 0;
  dur = 0.4;
  angle = rand(0, TAU);
  wing = rand(0, 10);

  constructor(world: World) {
    this.pos = randomInside(world, 0.15);
  }

  private dart(world: World) {
    let a = this.angle + rand(-1.3, 1.3);
    if (world.pointer && pointerNear(world, this.pos, 90)) {
      a = Math.atan2(this.pos.y - world.pointer.y, this.pos.x - world.pointer.x) + rand(-0.4, 0.4);
    }
    const d = rand(80, 220);
    const m = 30;
    this.from = { ...this.pos };
    this.to = {
      x: clamp(this.pos.x + Math.cos(a) * d, m, Math.max(m, world.w - m)),
      y: clamp(this.pos.y + Math.sin(a) * d, m, Math.max(m, world.h - m)),
    };
    this.angle = Math.atan2(this.to.y - this.from.y, this.to.x - this.from.x);
    this.dur = dist(this.from, this.to) / 450 + 0.1;
    this.t = 0;
    this.mode = "dart";
  }

  update(dt: number, world: World) {
    this.wing += dt;
    this.timer -= dt;
    if (this.mode === "hover") {
      this.pos.x += Math.sin(this.wing * 3) * 6 * dt;
      this.pos.y += Math.cos(this.wing * 2.3) * 5 * dt;
      if (this.timer <= 0 || pointerNear(world, this.pos, 90)) this.dart(world);
      return;
    }
    this.t += dt / this.dur;
    const t = Math.min(1, this.t);
    this.pos = lerp(this.from, this.to, 1 - (1 - t) ** 3);
    if (t >= 1) {
      this.mode = "hover";
      this.timer = rand(0.6, 2.2);
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.translate(this.pos.x, this.pos.y);
    ctx.rotate(this.angle);
    ctx.lineCap = "round";

    // Long segmented tail.
    ctx.strokeStyle = INK;
    ctx.lineWidth = 4.4;
    ctx.beginPath();
    ctx.moveTo(-1, 0);
    ctx.lineTo(-26, 0);
    ctx.stroke();
    ctx.strokeStyle = "#4a73ff";
    ctx.lineWidth = 2.6;
    ctx.stroke();
    ctx.strokeStyle = INK;
    ctx.lineWidth = 0.8;
    for (let sx = -6; sx > -25; sx -= 4) {
      ctx.beginPath();
      ctx.moveTo(sx, -1.3);
      ctx.lineTo(sx, 1.3);
      ctx.stroke();
    }

    // Four long wings, shimmering.
    const flicker = Math.sin(this.wing * 80) * 0.12;
    ctx.fillStyle = "rgba(220, 235, 255, 0.5)";
    ctx.strokeStyle = "rgba(17, 17, 17, 0.55)";
    ctx.lineWidth = 0.8;
    for (const [ax, base] of [[3, 1.45], [-1, 1.8]]) {
      for (const side of [-1, 1]) {
        ctx.save();
        ctx.translate(ax, 0);
        ctx.rotate(side * (base + flicker));
        ctx.beginPath();
        ctx.ellipse(12, 0, 12, 2.6, 0, 0, TAU);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      }
    }

    // Thorax and big eyes.
    ctx.fillStyle = "#4a73ff";
    ctx.strokeStyle = INK;
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.ellipse(2, 0, 4, 3, 0, 0, TAU);
    ctx.fill();
    ctx.stroke();
    for (const side of [-1, 1]) {
      ctx.fillStyle = INK;
      ctx.beginPath();
      ctx.arc(6.5, side * 2, 2.3, 0, TAU);
      ctx.fill();
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(7.1, side * 2.4, 0.7, 0, TAU);
      ctx.fill();
    }
    ctx.restore();
  }
}

/* ------------------------------------------------------------------ */
/* Casts                                                               */
/* ------------------------------------------------------------------ */

type Species =
  | "gecko" | "fly" | "butterfly" | "ladybug" | "ants" | "snail" | "spider" | "bee" | "dragonfly";

// Sections rotate through these so neighbours always feel different.
// Every cast with a gecko also has a fly for it to hunt.
const CASTS: Species[][] = [
  ["gecko", "fly", "fly", "ladybug"],
  ["butterfly", "bee", "snail", "butterfly"],
  ["spider", "ants", "dragonfly"],
  ["gecko", "fly", "bee", "butterfly"],
  ["ladybug", "dragonfly", "snail", "ladybug"],
  ["ants", "spider", "butterfly", "fly"],
];

function spawnCritter(species: Species, world: World, small: boolean): Critter {
  switch (species) {
    case "gecko":
      return new Gecko(rand(0.2, 0.8) * world.w, rand(0.25, 0.75) * world.h, small ? 0.75 : 0.95);
    case "fly":
      return new Fly(world.w, world.h, false);
    case "butterfly":
      return new Butterfly(world, true);
    case "ladybug":
      return new Ladybug(world);
    case "ants":
      return new AntTrail(world, small ? 6 : 9);
    case "snail":
      return new Snail(world);
    case "spider":
      return new Spider();
    case "bee":
      return new Bee(world);
    case "dragonfly":
      return new Dragonfly(world);
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
  critters: Critter[];
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
    section, canvas, ctx, world, critters: [], visible: false, restorePosition,
  };
  sizeCanvas(habitat);

  const cast = CASTS[index % CASTS.length].slice(0, small ? 3 : undefined);
  habitat.critters = cast
    .map((species) => spawnCritter(species, world, small))
    .sort((p, q) => p.layer - q.layer);
  world.flies = habitat.critters.filter((c): c is Fly => c instanceof Fly);
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
        for (const c of h.critters) c.update(dt, world);
        ctx.clearRect(0, 0, world.w, world.h);
        for (const c of h.critters) c.draw(ctx);
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
