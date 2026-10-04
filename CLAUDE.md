# TIS Tech Council

For any UI work (pages, components, landing pages, restyling, "make it look like…"), use the repo skills in `.claude/skills/`:

- `reference-to-ui`: leads the build from a real example and proves it with its capture, compare and slop-check scripts.
- `ui-ux-pro-max`: design system search, UX rules and the pre-delivery checklist.
- Images or video the user doesn't have: `reference-to-ui` writes Google Flow prompts (`scripts/flow-prompts.mjs`).

Both skills are also in the owner's claude.ai account, so they load in every session even outside this repo. Run skill scripts from the "Base directory for this skill" shown when the skill loads.

## Browser tools in cloud sessions

The `playwright-cli` skill needs its command installed: `npm install -g @playwright/cli@latest`. Cloud containers have Chromium but not Google Chrome, so before `playwright-cli open`, write `.playwright/cli.config.json` in the working directory:

```bash
mkdir -p .playwright && printf '{"browser":{"browserName":"chromium","launchOptions":{"executablePath":"%s","chromiumSandbox":false}}}\n' "$(ls /opt/pw-browsers/chromium-*/chrome-linux*/chrome | head -1)" > .playwright/cli.config.json
```

It blocks `file:` URLs, so serve pages first (`python3 -m http.server`) and open `http://localhost:<port>/`. `brag` fetches Hyperframes through `npx` on its own.
