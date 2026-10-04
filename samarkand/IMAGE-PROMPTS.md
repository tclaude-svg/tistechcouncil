# Image prompts: Registan square in Samarkand, Uzbekistan: Ulugh Beg madrasah on the left, Sher-Dor madrasah on the right, Tilya-Kori madrasah in the centre, symmetrical straight-on view from the bottom of the central walkway, the paved plaza in front of the three madrasahs, low hedges, cypress trees, ribbed turquoise domes, tall tiled minarets

These images become the page's scroll film: each still gets a depth map, then the camera moves through it in 3D as the visitor scrolls, with drifting sky, fog, light and particles added in code. **Text sits:** top. **Frames in the journey:** 3. **Palette:** #0b1a3a (deep navy), #1e6f8f (dark blue), #e8b04a (vivid orange).

**Which tool**
- **Nano Banana (Gemini app or Google AI Studio):** best for the journey frames, because you can attach the previous image and ask for the next step while it keeps the scene consistent. Pick the 16:9 aspect ratio where offered.
- **ChatGPT (image generation):** excellent single heroes and supporting stills. Ask for "wide 16:9" (or pick landscape). It can also make a transparent-background PNG for the layers option.
- **Resolution matters most:** pick the highest output size offered (Nano Banana Pro: 4K; ChatGPT: the largest landscape/portrait size). If an image comes out under about 2560 px wide, upscale it x2 or x4 with the free Upscayl app before sending it. Never resize it up in a normal editor.
- Generate 2 to 4 options per prompt and keep the best. Download the full-size original file (PNG or high-quality JPG), not a screenshot or a chat preview.

---

## 1. Hero frame (16:9)

```text
Wide cinematic photograph of Registan square in Samarkand, Uzbekistan: Ulugh Beg madrasah on the left, Sher-Dor madrasah on the right, Tilya-Kori madrasah in the centre, symmetrical straight-on view from the bottom of the central walkway, the paved plaza in front of the three madrasahs, low hedges, cypress trees, ribbed turquoise domes, tall tiled minarets. Blue hour, deep indigo sky, warm golden floodlights glowing inside the arched portals. Colour palette of deep navy, dark blue and vivid orange. The subject sits in the lower half; the top third is open and calm for text. Clear depth layers: a defined foreground element, a midground subject and a distant background, with visible separation between them. Open sky or distant scenery in part of the frame. No thin, wispy foreground details at the frame edges (no stray branches, wires, hair or fences crossing the frame). Sharp focus throughout. Photorealistic, shot on a full-frame cinema camera with a 35mm lens, natural film grain, realistic materials, true-to-life scale, high dynamic range. Mood: majestic, calm, timeless. No text, no letters, no logos, no watermarks, no signs, no people facing the camera. Aspect ratio 16:9, highest resolution available.
```

Phone version (optional, 9:16). Skip it if the hero still works cropped around its subject; the engine crops toward the focus point on phones:

```text
Vertical cinematic photograph of Registan square in Samarkand, Uzbekistan: Ulugh Beg madrasah on the left, Sher-Dor madrasah on the right, Tilya-Kori madrasah in the centre, symmetrical straight-on view from the bottom of the central walkway, the paved plaza in front of the three madrasahs, low hedges, cypress trees, ribbed turquoise domes, tall tiled minarets. Blue hour, deep indigo sky, warm golden floodlights glowing inside the arched portals. Colour palette of deep navy, dark blue and vivid orange. Subject centred in the middle third, open calm space above and below for text. Clear depth layers: a defined foreground element, a midground subject and a distant background, with visible separation between them. Open sky or distant scenery in part of the frame. No thin, wispy foreground details at the frame edges (no stray branches, wires, hair or fences crossing the frame). Sharp focus throughout. Photorealistic, shot on a full-frame cinema camera with a 35mm lens, natural film grain, realistic materials, true-to-life scale, high dynamic range. Mood: majestic, calm, timeless. No text, no letters, no logos, no watermarks, no signs, no people facing the camera. Aspect ratio 9:16, highest resolution available.
```

---

## 2. Journey frames (attach the previous image each time)

Camera path: walk straight up the central walkway across the plaza, then push in to the glowing golden arch of the Tilya-Kori madrasah. Use Nano Banana with the previous frame attached, or ChatGPT in the same chat with the previous image. If a frame drifts (new colours, a different building, extra objects), regenerate that step before moving on.

**Frame 2 of 3**

```text
Using the attached image as the previous frame: walk straight up the central walkway across the plaza, then push in to the glowing golden arch of the Tilya-Kori madrasah. This is step 2 of 3: the camera is now about 50% of the way along that path. Keep everything else identical: same place, same time of day and light (blue hour, deep indigo sky, warm golden floodlights glowing inside the arched portals), same colour grade, same weather, same style and lens. Nothing new appears that would not be visible from the new position. The subject sits in the lower half; the top third is open and calm for text. Clear depth layers: a defined foreground element, a midground subject and a distant background, with visible separation between them. Open sky or distant scenery in part of the frame. No thin, wispy foreground details at the frame edges (no stray branches, wires, hair or fences crossing the frame). Sharp focus throughout. No text, no letters, no logos, no watermarks, no signs, no people facing the camera. Aspect ratio 16:9, highest resolution available.
```

**Frame 3 of 3**

```text
Using the attached image as the previous frame: walk straight up the central walkway across the plaza, then push in to the glowing golden arch of the Tilya-Kori madrasah. This is step 3 of 3: the camera is now at the final resting point, a composed, satisfying view of the destination. Keep everything else identical: same place, same time of day and light (blue hour, deep indigo sky, warm golden floodlights glowing inside the arched portals), same colour grade, same weather, same style and lens. Nothing new appears that would not be visible from the new position. The subject sits in the lower half; the top third is open and calm for text. Clear depth layers: a defined foreground element, a midground subject and a distant background, with visible separation between them. Open sky or distant scenery in part of the frame. No thin, wispy foreground details at the frame edges (no stray branches, wires, hair or fences crossing the frame). Sharp focus throughout. No text, no letters, no logos, no watermarks, no signs, no people facing the camera. Aspect ratio 16:9, highest resolution available.
```

---

## Before sending them back, check each image

- Nothing melted or doubled (hands, windows, railings, wheels), no stray text or logo anywhere, including tiny signs.
- The text side of the frame is calm.
- Journey frames look like one place seen from a moving camera, not different places.

Then send the files (upload, Drive link or file path). Next step on this side: `scripts/depth.mjs` makes a depth map for each, and the page is built with `assets/cinematic/`.
