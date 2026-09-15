import sharp from "sharp";
import path from "node:path";
import fs from "node:fs";

const SRC_DIR = "asset oddlyrinaldi";
const OUT_DIR = "public/characters";
fs.mkdirSync(OUT_DIR, { recursive: true });

const CREAM = [245, 240, 230]; // matches --color-cream in globals.css

// Flood-fill removes a near-white background connected to the image border,
// leaving enclosed light areas (eye highlights, etc.) untouched.
async function removeWhiteBackground({
  input,
  output,
  threshold = 232,
  featherPx = 1,
  eraseRects = [],
  // The flood fill leaves a thin band of partially-transparent edge pixels
  // (anti-aliasing from the original white background). Their retained RGB
  // is near-white/gray, which fringes visibly wherever alpha < 255 unless we
  // recolor those pixels to whatever this asset is actually composited over.
  decontaminateColor = null,
}) {
  const img = sharp(input);
  const { data, info } = await img.ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width: w, height: h, channels: ch } = info;

  // Erase unwanted regions (e.g. watermark text) by flattening to white first.
  for (const [x0, y0, x1, y1] of eraseRects) {
    for (let y = y0; y < y1; y++) {
      for (let x = x0; x < x1; x++) {
        const idx = (y * w + x) * ch;
        data[idx] = 255;
        data[idx + 1] = 255;
        data[idx + 2] = 255;
      }
    }
  }

  const visited = new Uint8Array(w * h);
  const isBg = (x, y) => {
    const idx = (y * w + x) * ch;
    return data[idx] >= threshold && data[idx + 1] >= threshold && data[idx + 2] >= threshold;
  };

  const stack = [];
  for (let x = 0; x < w; x++) {
    stack.push([x, 0], [x, h - 1]);
  }
  for (let y = 0; y < h; y++) {
    stack.push([0, y], [w - 1, y]);
  }

  const alpha = new Uint8Array(w * h).fill(255);

  while (stack.length) {
    const [x, y] = stack.pop();
    if (x < 0 || y < 0 || x >= w || y >= h) continue;
    const i = y * w + x;
    if (visited[i]) continue;
    visited[i] = 1;
    if (!isBg(x, y)) continue;
    alpha[i] = 0;
    stack.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]);
  }

  const rgb = Buffer.alloc(w * h * 3);
  for (let i = 0, p = 0; i < w * h; i++, p += ch) {
    if (decontaminateColor && alpha[i] < 255) {
      rgb[i * 3] = decontaminateColor[0];
      rgb[i * 3 + 1] = decontaminateColor[1];
      rgb[i * 3 + 2] = decontaminateColor[2];
    } else {
      rgb[i * 3] = data[p];
      rgb[i * 3 + 1] = data[p + 1];
      rgb[i * 3 + 2] = data[p + 2];
    }
  }

  let alphaBuf = Buffer.from(alpha);
  if (featherPx > 0) {
    // sharp's blur() silently upsamples a 1-channel raw buffer to 3 channels,
    // so pull channel 0 back out afterwards to keep a true single-band mask.
    const blurred = await sharp(alphaBuf, { raw: { width: w, height: h, channels: 1 } })
      .blur(featherPx)
      .raw()
      .toBuffer({ resolveWithObject: true });
    const bch = blurred.info.channels;
    const single = Buffer.alloc(w * h);
    for (let i = 0; i < w * h; i++) single[i] = blurred.data[i * bch];
    alphaBuf = single;
  }

  await sharp(rgb, { raw: { width: w, height: h, channels: 3 } })
    .joinChannel(alphaBuf, { raw: { width: w, height: h, channels: 1 } })
    .png()
    .toFile(output);

  console.log("wrote", output, `${w}x${h}`);
}

async function main() {
  await removeWhiteBackground({
    input: path.join(SRC_DIR, "cat-peek.jpg"),
    output: path.join(OUT_DIR, "cat-peek.png"),
    threshold: 235,
    decontaminateColor: CREAM, // sits on the cream hero background
  });

  await removeWhiteBackground({
    input: path.join(SRC_DIR, "cool-duck.jpg"),
    output: path.join(OUT_DIR, "cool-duck.png"),
    threshold: 240,
    // sits on the dark manifesto section — cream decontamination would fringe instead of fix
  });

  await removeWhiteBackground({
    input: path.join(SRC_DIR, "running-dog.jpg"),
    output: path.join(OUT_DIR, "running-dog.png"),
    threshold: 245,
    eraseRects: [[590, 610, 736, 736]],
    decontaminateColor: CREAM, // sits on the cream hero background
  });

  await removeWhiteBackground({
    input: path.join(SRC_DIR, "cat-point.png"),
    output: path.join(OUT_DIR, "cat-point.png"),
    threshold: 225,
    decontaminateColor: CREAM, // sits on the cream collection section
  });

  await removeWhiteBackground({
    input: path.join(SRC_DIR, "kucingg.jpg"),
    output: path.join(OUT_DIR, "kucingg.png"),
    threshold: 240,
    decontaminateColor: CREAM, // sits on the cream divider section
  });

  // Already has real alpha — just copy into place.
  await sharp(path.join(SRC_DIR, "cat-peek2-footer.png")).png().toFile(
    path.join(OUT_DIR, "cat-peek2.png")
  );

  console.log("done");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
