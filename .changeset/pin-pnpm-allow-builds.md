---
"reshaped": patch
---

Pin pnpm to 11.3.0 across CI and migrate the build-script allowlist to the new `allowBuilds` setting, since pnpm 11 removed `ignoredBuiltDependencies`. This unblocks installs in CI.
