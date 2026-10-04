# Google Flow prompts for iPhone 18 Pro Max

Each prompt makes one image for one slot on `index.html`. Save each file into `images/` with the exact name shown and the page picks it up automatically. Until a file exists, the page shows a drawn placeholder phone.

**Settings in Flow:** Image mode, highest quality model (Nano Banana Pro / Imagen), 2–4 outputs per prompt, download the full-size original.
**Background must be pure black** so the image blends into the page. If it comes out dark grey, add "background is pure #000000 black" and regenerate.

---

## 1. Hero → `images/hero.png` (16:9)

```text
Studio product photograph of a premium flagship smartphone, two units shown side by side: the left phone facing the camera showing an edge-to-edge OLED display with a very small pill-shaped cutout at the top and a vivid abstract wallpaper; the right phone turned around showing its back, which has a full-width raised camera plateau spanning the top of the phone holding three large camera lenses in a triangle arrangement, a flash and a small sensor. The body is deep cherry red anodized aluminum with a soft satin finish and polished chamfered edges. Both phones float upright, slightly angled toward each other, centered in the frame with generous empty space around them. Pure black seamless background, background is pure #000000 black. Single soft key light from upper left, thin crisp rim light tracing the metal edges, a subtle reflection on the floor below. Apple keynote product reveal style, ultra sharp, photorealistic 3D render, true-to-life proportions of a 6.9-inch phone. No text, no logos, no watermarks. Aspect ratio 16:9.
```

## 2. Camera → `images/camera.png` (1:1)

```text
Extreme macro product photograph of a smartphone's rear camera plateau in deep cherry red anodized aluminum: three large sapphire camera lenses with dark blue and violet anti-reflective coatings, the closest lens showing six visible metal aperture blades partially closed inside it, polished metal rings around each lens, a small flash and sensor beside them. Shallow depth of field with the nearest lens tack sharp. Pure black background, background is pure #000000 black. Dramatic low-key lighting with a single specular highlight sweeping across the glass. Photorealistic, Apple product photography style. No text, no logos, no watermarks. Aspect ratio 1:1.
```

## 3. Chip → `images/chip.png` (1:1)

```text
Product render of a futuristic smartphone processor chip lying flat on a pure black surface, viewed at a 30-degree angle: a square dark graphite package with a polished metal lid, finely etched circuit patterns visible around its edges, a soft warm orange and magenta glow emanating from beneath the chip and tracing thin circuit lines outward into the darkness. Background is pure #000000 black. Cinematic low-key lighting, ultra sharp, photorealistic, Apple keynote style. No text, no letters, no numbers, no logos, no watermarks. Aspect ratio 1:1.
```

## 4. Colors (4 images, same framing) → `images/color-*.png` (4:5)

Make the cherry one first. Then, for the other three, attach the cherry image in Flow (as an ingredient / reference) and use the edit prompt so the angle and lighting stay identical.

**Deep Cherry → `images/color-cherry.png`**

```text
Studio product photograph of a single premium flagship smartphone seen from the back, standing upright and turned 15 degrees to the left, with a full-width raised camera plateau across the top holding three large camera lenses in a triangle, a flash and a small sensor. Deep cherry red anodized aluminum body with a soft satin finish and polished chamfered edges. Centered, filling about 70% of the frame height. Pure black seamless background, background is pure #000000 black. Soft key light from upper left, crisp rim light on the edges, faint reflection below. Photorealistic, Apple product photography style. No text, no logos, no watermarks. Aspect ratio 4:5.
```

**Edit prompt for the other colours** (attach `color-cherry.png`, swap the colour words):

```text
Keep this exact image: same phone, same angle, same framing, same lighting and same pure black background. Change only the body colour to [COLOUR]. Do not change the camera lenses or anything else.
```

| File | Replace `[COLOUR]` with |
|---|---|
| `images/color-blue.png` | pale glacier blue anodized aluminum with a frosted satin finish |
| `images/color-graphite.png` | dark graphite grey anodized aluminum with a matte finish |
| `images/color-silver.png` | bright silver aluminum with a frosted white-silver satin finish |

---

## Optional: hero video in Flow (Veo)

Use it with `images/hero.png` as the starting frame (Frames to Video):

```text
Slow cinematic 360-degree turntable rotation of the cherry red smartphone floating in a pure black void, the rim light sliding along the polished metal edges as it turns, the camera lenses catching a brief specular glint. Smooth, slow, perfectly steady camera, no camera shake. Ends facing the back. 8 seconds, no text, no logos.
```

If you make it, save it as `images/hero.mp4` and tell me; I'll swap the hero image for a looping muted video.

---

## Check before saving

- No Apple logo, text, or watermark anywhere (the page is a concept and must not carry Apple branding).
- Lenses aren't melted or doubled; there are exactly three.
- The background is truly black at the edges.
