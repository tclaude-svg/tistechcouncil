#!/usr/bin/env node
// Write a Google Flow prompt sheet (FLOW-PROMPTS.md): free images first, then Veo video.
// No dependencies. See references/google-flow.md for the workflow.
//
//   node flow-prompts.mjs --spec shot.json --out FLOW-PROMPTS.md
//   node flow-prompts.mjs --kind product --subject "a premium flagship smartphone" \
//     --material "deep cherry red anodized aluminum" --details "three camera lenses, one flash" \
//     --background "#020202" --camera turntable --use scroll --out FLOW-PROMPTS.md
import fs from 'fs';

const HELP = `Usage: node flow-prompts.mjs [--spec shot.json] [fields...] [--out FLOW-PROMPTS.md]

Fields (flags or JSON keys):
  subject     what the shot is about, specific (required)      "a premium flagship smartphone"
  kind        product | scene (default scene)
              product: studio shot on a seamless background that matches the page
              scene:   a place the camera travels through (landscape, interior, city)
  material    product only: body material and colour            "deep cherry red anodized aluminum, satin finish"
  details     features that must stay identical in every frame  "three camera lenses, one flash, one sensor"
  count       product only: how many units in the shot (default 1)
  background  product only: page background hex, matched exactly (default #000000)
  setting     scene only: where it is                           "a Mediterranean harbour"
  light       time and light                                    "single soft key light from upper left, thin rim light"
  mood        feel                                              "premium, calm, keynote reveal"
  palette     page colours, comma separated hex                 "#020202,#6b1f2a"
  text        where page text sits: left | right | center | top | bottom | none (default: top for product, left for scene)
  camera      turntable (product default) dolly-in (scene default) dolly-out orbit crane-up crane-down
              truck-left truck-right pan-left pan-right push-through static
  turn        turntable only: degrees the product turns over the clip (default 180)
  use         scroll | loop | play (default scroll)
  angles      free frames to make from the start image, 0 to 8 (default 6 for product, 3 for scene)
  aspect      16:9 | 9:16 | 1:1 (default 16:9)
  name        title for the sheet`;

const args = process.argv.slice(2);
if (args.includes('--help') || args.includes('-h')) { console.log(HELP); process.exit(0); }
const flags = {};
for (let i = 0; i < args.length; i++) {
  if (args[i].startsWith('--')) { const k = args[i].slice(2); const v = args[i + 1] && !args[i + 1].startsWith('--') ? args[++i] : 'true'; flags[k] = v; }
}
let spec = {};
if (flags.spec) spec = JSON.parse(fs.readFileSync(flags.spec, 'utf8'));
spec = { ...spec, ...Object.fromEntries(Object.entries(flags).filter(([k]) => !['spec', 'out'].includes(k))) };
if (!spec.subject) { console.error('Missing --subject.\n\n' + HELP); process.exit(1); }

const fail = (msg) => { console.error(msg); process.exit(1); };
const kind = (spec.kind || 'scene').toLowerCase();
if (!['product', 'scene'].includes(kind)) fail(`--kind must be product or scene (got "${kind}")`);
const product = kind === 'product';
const use = (spec.use || 'scroll').toLowerCase();
if (!['scroll', 'loop', 'play'].includes(use)) fail(`--use must be scroll, loop or play (got "${use}")`);
const camera = (spec.camera || (product ? 'turntable' : use === 'loop' ? 'static' : 'dolly-in')).toLowerCase();
const text = (spec.text || (product ? 'top' : 'left')).toLowerCase();
const aspect = spec.aspect || '16:9';
const count = Math.max(1, Number(spec.count || 1));
const turn = Number(spec.turn || 180);
const angles = Math.min(8, Math.max(0, Number(spec.angles ?? (product ? 6 : 3))));
const cap = (s) => s[0].toUpperCase() + s.slice(1);
const noun = spec.subject.replace(/^(a|an|the)\s+/i, '');            // "a smartphone" -> "smartphone"
const NUM = ['', 'one', 'two', 'three', 'four'];

const CAMERA = {
  turntable:      `the camera stays completely locked off while the ${count > 1 ? 'products rotate in perfect sync' : 'product rotates'} in place around ${count > 1 ? 'their own vertical axes' : 'its own vertical axis'}, turning exactly ${turn} degrees at one smooth constant speed`,
  'dolly-in':     'slow, steady dolly forward toward the subject at constant speed',
  'dolly-out':    'slow, steady dolly backward at constant speed, revealing more of the scene',
  orbit:          'slow orbit around the subject at constant speed, the subject stays centred',
  'crane-up':     'slow crane up, rising smoothly above the subject',
  'crane-down':   'slow crane down, descending smoothly toward the subject',
  'truck-left':   'slow lateral tracking move to the left at constant speed, foreground passing the lens',
  'truck-right':  'slow lateral tracking move to the right at constant speed, foreground passing the lens',
  'pan-left':     'slow, smooth pan to the left across the scene',
  'pan-right':    'slow, smooth pan to the right across the scene',
  'push-through': 'slow push forward through an opening into the scene beyond, constant speed',
  static:         'locked-off static camera, no camera movement at all',
};
const cam = CAMERA[camera];
if (!cam) fail(`Unknown --camera "${camera}". Options: ${Object.keys(CAMERA).join(', ')}`);
if (camera === 'turntable' && !product) fail('--camera turntable needs --kind product');

// Image and video models read colour words, not hex codes.
function colourName(hex) {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex); if (!m) return hex;
  const n = parseInt(m[1], 16), r = (n >> 16) / 255, g = ((n >> 8) & 255) / 255, b = (n & 255) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b), l = (max + min) / 2, d = max - min;
  const s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1));
  let h = 0;
  if (d) h = max === r ? ((g - b) / d) % 6 : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
  h = (h * 60 + 360) % 360;
  if (l < 0.08) return 'near-black';
  if (l > 0.93) return s > 0.3 ? 'pale cream' : 'off-white';
  if (s < 0.12) return l < 0.3 ? 'charcoal' : l < 0.6 ? 'stone grey' : 'silver grey';
  const hue = h < 15 ? 'red' : h < 40 ? 'orange' : h < 55 ? 'amber' : h < 70 ? 'golden yellow' : h < 160 ? 'green' : h < 195 ? 'teal' : h < 250 ? (l < 0.3 ? 'navy' : 'blue') : h < 290 ? 'violet' : h < 335 ? 'magenta' : 'crimson';
  const tone = l < 0.22 ? 'deep' : l < 0.4 ? 'dark' : l < 0.65 ? (s > 0.6 ? 'vivid' : 'muted') : (h >= 20 && h < 60 ? 'warm champagne' : 'soft');
  return tone === 'warm champagne' ? 'warm champagne' : `${tone} ${hue}`;
}
const palette = spec.palette ? spec.palette.split(',').map((s) => s.trim()).filter(Boolean) : [];
const words = [...new Set(palette.map(colourName))].slice(0, 3);
const paletteLine = words.length ? `Colour palette of ${words.length > 1 ? words.slice(0, -1).join(', ') + ' and ' + words.at(-1) : words[0]}.` : '';

const bgHex = (spec.background || '#000000').replace(/^#?/, '#');
const bgLine = `Infinite seamless studio background in solid ${colourName(bgHex)} ${bgHex} at every edge of the frame, with no gradient, vignette, haze, dust, floor line or props.`;
const light = spec.light || (product
  ? 'dramatic low-key studio light with one large soft key light from the upper left, thin bright rim lights tracing every edge and a gentle fill so the colours stay rich'
  : 'soft natural light');
const mood = spec.mood || (product ? 'premium, calm, precise, a keynote product reveal' : 'premium, calm, cinematic');
const details = spec.details ? `${count > 1 ? 'Each unit' : 'It'} always has exactly ${spec.details}.` : '';
const units = count > 1 ? `${NUM[count] || count} identical units of the same ${noun}, side by side with even spacing` : spec.subject;

const SPACE = {
  left: 'Subject in the right two-thirds of the frame, calm empty space on the left third for headline text.',
  right: 'Subject in the left two-thirds of the frame, calm empty space on the right third for headline text.',
  center: 'Subject low in the frame, clean open space in the upper centre for a centred headline.',
  top: product ? 'Subject centred, filling about 70% of the frame height, with even empty space around it.' : 'Subject in the lower half, clean open upper third for text.',
  bottom: 'Subject in the upper half, clean darker lower third for text.',
  none: 'Balanced composition with the subject as the clear focal point.',
};
const space = SPACE[text] || SPACE.left;
const noText = `No text, no letters, no numbers, no logos, no brand marks, no watermarks${product ? `; every surface of the ${noun} is completely blank` : ''}, no hands, no people.`;

const still = (ar) => (product ? [
  `Ultra-high-end studio product photograph for a launch keynote: ${units}, floating upright in mid-air${count > 1 ? ', angled slightly toward each other' : ''}.`,
  spec.material ? `Material: ${spec.material}, with polished edges that catch thin highlights; believable real-world proportions and thickness.` : 'Believable real-world proportions, materials and thickness.',
  details,
  `Lighting: ${light}. A faint mirror reflection fades out on an invisible glossy floor below.`,
  bgLine, paletteLine,
  ar === '9:16' ? 'Vertical frame, subject centred in the middle third with empty space above and below.' : space,
  'Shot on a medium-format camera with a 100mm lens at f/11, tack sharp edge to edge, photorealistic, 8K detail, accurate reflections, no noise.',
  `Mood: ${mood}.`, noText, `Aspect ratio ${ar}.`,
] : [
  `Wide cinematic photograph of ${spec.subject}${spec.setting ? `, ${spec.setting}` : ''}.`,
  `${cap(light)}.`, paletteLine,
  ar === '9:16' ? 'Vertical frame, subject centred with clean space above and below for text.' : space,
  'Clear depth layers: a defined foreground, a midground subject and a distant background with visible separation, so a depth map can move the camera through it. No thin wispy details crossing the frame edges.',
  'Shot on a full-frame cinema camera with a 35mm lens, natural film grain, realistic materials, true-to-life scale, high dynamic range, sharp focus throughout.',
  `Mood: ${mood}.`, noText, `Aspect ratio ${ar}.`,
]).filter(Boolean).join(' ');

// Free frames: product angles for a scroll turn, or scene steps for a camera journey.
const productAngles = [
  'seen from the back, turned 30 degrees to the left so its right side edge shows',
  'seen straight from the back, perfectly facing the camera',
  'seen from the back, turned 30 degrees to the right so its left side edge shows',
  'seen exactly side-on in profile, showing its edge and buttons',
  'seen from the front, turned 30 degrees to the left',
  'seen straight from the front, perfectly facing the camera',
  'seen from the front, turned 30 degrees to the right',
  'seen side-on in profile from the other side',
];
const sceneSteps = ['a few steps further forward along the same path', 'further forward again, closer to the main subject', 'arrived close to the main subject, framed as the final shot', 'a little higher, looking down over the subject', 'turned slightly to the right, same place', 'further forward again, same light', 'closer still', 'the final resting view'];
const editPrompt = (target) => `Keep everything exactly the same: same ${product ? 'product, size, position in the frame' : 'place, time of day, colour grade, lens'}, same lighting, same ${product ? 'background' : 'style'}.${product ? (count > 1 ? ` Only rotate both units together in place so that each one is ${target}.` : ` Only rotate the ${noun} in place so that it is ${target}.`) : ` Only move the camera so it is ${target}.`} ${details} ${noText}`.replace(/\s+/g, ' ').trim();

const USE = {
  scroll: 'one continuous shot with no cuts and no transitions, constant speed from the first frame to the last, no speed ramps, no easing, no camera shake',
  loop: 'a seamless loop where the last frame matches the first frame exactly, gentle cyclical motion, no cuts',
  play: 'one continuous shot with a smooth cinematic move, no cuts, no transitions',
}[use];
const turnEnd = product && camera === 'turntable' && turn === 180 && count === 2
  ? ' By the final frame each unit shows the opposite side, so the last frame mirrors the first.' : '';
const video = [
  `Ultra-premium cinematic ${product ? 'product film' : 'shot'}. The video begins on the exact attached frame and matches it perfectly: same ${product ? 'product, colours, lighting and background' : 'place, light and colour grade'}.`,
  `MOTION: ${cap(cam)}${camera === 'turntable' ? ' with no wobble, drift, bob or change in size' : ''}. ${cap(USE)}.${turnEnd}`,
  product ? 'LIGHT: the rim light slides continuously along the edges as it turns, highlights glide across the finish, and the floor reflection moves in perfect sync.' : `LIGHT: ${light} stays consistent through the shot.`,
  `CONSISTENCY: the ${product ? 'product keeps exactly the same shape, colour, proportions and details on every frame' : 'scene keeps the same geometry, nothing appears or disappears'}. ${details} Solid and rigid, never morphing, melting, bending or flickering.`,
  product ? bgLine : '',
  `LOOK: photorealistic, high-end cinema camera, 24fps, rich contrast, sharp on every frame, no motion blur smearing, no noise. Silent, no music, no dialogue. ${noText}`,
].filter(Boolean).join('\n\n');

const title = spec.name || `${spec.subject}${spec.setting ? `, ${spec.setting}` : ''}`;
const md = `# Google Flow prompts: ${title}

**Kind:** ${kind}. **Page use:** \`${use}\`. **Camera:** ${camera}${camera === 'turntable' ? ` (${turn}°)` : ''}. **Aspect:** ${aspect}.${palette.length ? ` **Palette:** ${palette.join(', ')}.` : ''}${product ? ` **Background:** ${bgHex} (matches the page).` : ''}

Flow names and credit costs change. Images have been free and Veo video has cost credits; check the numbers shown in Flow before generating. Download every result at full size, never a screenshot.

---

## Step 1: start image (Image mode, free)

Highest-quality image model, aspect **${aspect}**, 2 to 4 outputs; keep the best.

\`\`\`text
${still(aspect)}
\`\`\`
${aspect !== '9:16' ? `
Phone version (optional, **9:16**). Skip it if the ${aspect} image still works cropped to its centre:

\`\`\`text
${still('9:16')}
\`\`\`
` : ''}
Check before going on: ${product ? `${spec.details ? `exactly ${spec.details}, ` : ''}no logo or text anywhere, background solid at every edge` : 'nothing melted or doubled, no stray text or signs, the text side of the frame calm'}.
${angles ? `
---

## Step 2: ${product ? 'angle frames' : 'journey frames'} (free, no video needed)

Attach the previous image each time (as a reference or ingredient) and use the edit prompt with the target from the table. The page ${product ? 'blends these frames as you scroll, so the product turns' : 'moves a 3D camera through these frames with depth maps'}; it is the free alternative to Step 3.

\`\`\`text
${editPrompt('[TARGET]')}
\`\`\`

| Save as | \`[TARGET]\` |
|---|---|
${Array.from({ length: angles }, (_, i) => `| \`${product ? 'turn' : 'shot'}-${i + 2}.png\` | ${(product ? productAngles : sceneSteps)[i]} |`).join('\n')}

Save the Step 1 image as \`${product ? 'turn' : 'shot'}-1.png\`. Regenerate any frame where the ${product ? 'product jumps, shrinks, changes colour or gains a logo' : 'place changes'}.
` : ''}
---

## Step ${angles ? 3 : 2}: video (Frames to Video with Veo, costs credits)

${{ scroll: 'Best quality: a real video scrubs the smoothest.', loop: 'Plays forever behind the page, so it starts and ends on the same frame.', play: 'Plays once as the hero video; its last frame becomes the poster.' }[use]} Attach the Step 1 image as the **first frame**${use === 'loop' ? ' and the same image as the **last frame**' : ''}. Highest-quality Veo model, ${aspect}, the longest duration offered. A faster Veo model, if listed, usually costs fewer credits and is fine for a first test.

\`\`\`text
${video}
\`\`\`

If a take warps or drifts, add this to the start of the prompt and generate again:

\`\`\`text
Very slow, minimal, perfectly smooth motion. Nothing changes shape.
\`\`\`

---

## Send back

${angles ? `The free frames (\`${product ? 'turn' : 'shot'}-1.png\` to \`${product ? 'turn' : 'shot'}-${angles + 1}.png\`), the video, or both. ` : 'The video. '}Upload them, share a Drive link, or put them in the repo. They get checked with \`scripts/video-ref.sh\`, then built with \`scripts/frames.sh\` and \`assets/scroll-sequence/\` (video) or \`scripts/prepare-film.mjs\` and \`assets/cinematic/\` (stills).
`;

if (flags.out) { fs.writeFileSync(flags.out, md); console.log(`Wrote ${flags.out}: ${kind}, ${camera}, ${use}, ${angles} free frames + Veo video.`); }
else process.stdout.write(md);
