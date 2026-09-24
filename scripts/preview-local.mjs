// Builds + serves the production site with local-friendly headers
// (no HSTS / anti-framing), so it works over http://localhost and in preview panes.
// Cross-platform replacement for `LOCAL_PREVIEW=1 next build && next start`.
import { spawnSync } from "node:child_process";

const env = { ...process.env, LOCAL_PREVIEW: "1" };
const run = (args) => spawnSync("npx", ["next", ...args], { stdio: "inherit", env, shell: true }).status;
if (run(["build"]) !== 0) process.exit(1);
process.exit(run(["start"]) ?? 0);
