# Images and footage with Google Flow

Use this when the page needs visuals the user does not have (a product hero, a turning product, a place to travel through) and the user has Google Flow. Flow makes images with Google's image models and video with Veo. You write the prompts; the user generates in Flow and sends the files back; you build the page. This is the default AI path in this repo. Higgsfield (`references/higgsfield.md`) is only for users who already have an account there.

Credits shape the plan. Flow images have been free and Veo video has cost credits (around 100 for the highest-quality model), so always offer the free route first and say what the video adds. Menus, model names and prices change: tell the user to check the numbers Flow shows.

## Pick the route

| Route | What the user makes | What you build | Cost |
|---|---|---|---|
| Free stills | One start image, plus angle or journey frames as edits of it | `prepare-film.mjs` + `assets/cinematic/` (depth-map camera moves), or a scroll blend between angle frames | Free |
| Veo video | One start image, then Frames to Video | `video-ref.sh` → `frames.sh` → `assets/scroll-sequence/` | Credits |

A real video turns a product smoothly and shows its sides; stills with depth maps can only fake depth. Use the video when the motion is the point of the page (a product turn, a fly-through) and the user is happy to spend the credits. A faster Veo model, when listed, costs less and is good for a first test.

## Workflow

1. **Shot spec.** From the example (`video-ref.sh` for a video): subject, product or scene, the details that must not change (lens count, buttons, logo-free surfaces), light, camera move, where page text sits, how the clip is used (`scroll`, `loop`, `play`). Pull the background and palette from the page tokens.
2. **Prompt sheet:**
   ```bash
   node <skill-dir>/scripts/flow-prompts.mjs --kind product --count 2 \
     --subject "a premium flagship smartphone" --material "deep cherry red anodized aluminum" \
     --details "three camera lenses and one flash" --background "#020202" --palette "#020202,#6b1f2a" \
     --camera turntable --use scroll --out FLOW-PROMPTS.md
   node <skill-dir>/scripts/flow-prompts.mjs --subject "a quiet harbour town" --setting "on the Mediterranean coast" \
     --light "blue hour, warm window lights" --camera dolly-in --use scroll --text left --out FLOW-PROMPTS.md
   ```
   `--help` lists every field. The sheet has: the start image (16:9 plus an optional 9:16), free angle or journey frames as edit prompts, the Veo Frames to Video prompt, a calmer-motion fallback, and what to send back.
3. **Hand it over.** Give the user the file and the short version in chat: Image mode for Step 1, which steps are free, which one costs credits, and what to send back.
4. **Check what comes back.** Video: `video-ref.sh`, then read `sheet.png` for cuts, warping, drift, changed details and made-up logos or text. Stills: read each at full size. Say which check failed and give the matching fix (regenerate with the edit prompt, or add the calmer-motion line).
5. **Build.**
   - Video for `scroll`: `frames.sh`, or ffmpeg with a crop that keeps every unit whole (measure the subject's extent with `cropdetect` across the clip first; two side-by-side products do not survive a 9:16 crop). Then the `assets/scroll-sequence/` player. If the subject must stay whole on phones, draw frames with contain instead of cover.
   - Video for `loop` / `play`: a compressed MP4 in `<video autoplay muted loop playsinline poster>`.
   - Stills: `prepare-film.mjs`, then `assets/cinematic/`.
   - Match the page background to the footage black (sample a corner pixel) so the frame edges never show.
6. Then the normal compare / record / slop-check loop in `SKILL.md`.

## Prompt rules the script follows

- **Product shots are studio shots.** A seamless background in the page's own colour, given as a hex value and a colour word, "at every edge". No landscape cues (sky, foreground layers) in product prompts.
- **Name what must not change** (`--details`): "always exactly three camera lenses and one flash". Image and video models add, drop and melt small parts without it.
- **Ask for blank surfaces.** Models invent fake logos and lettering on products; every prompt says the surfaces are completely blank with no text or brand marks.
- **Start image first, then animate it** (Frames to Video). The look is locked before motion is added.
- **Video prompt order:** start-frame lock, motion (one move, constant speed, no cuts), light behaviour, consistency, background, look. Flow has no negative prompt box, so the avoid list is written into the prompt.
- **Turntables:** the camera stays locked off and the product turns a stated number of degrees at constant speed. Two units turning 180 degrees in sync end mirrored, which loops cleanly.
- **Loops:** the same image as the first and last frame.
- Never prompt for real brands, logos, celebrities or named products ("a premium flagship smartphone", never a named phone). Brand names go on the page, never in the images.
