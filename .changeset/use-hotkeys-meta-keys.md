---
"reshaped": patch
---

useHotkeys: Fixed hotkeys not triggering when switching between different keys while holding Meta on macOS, since the keyup events for regular keys are not emitted while Meta is pressed. Also fixed the pressed keys tracking for quick key sequences, the `mod` key support in `checkHotkeyState`, duplicate hotkey calls when multiple Reshaped providers are rendered on the same page and hotkeys removal when the same callback is used by multiple components
