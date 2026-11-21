---
"reshaped": patch
---

`Overlay` and `Modal` start their open animation in the same frame they're triggered in. They used to stay hidden for around 3 frames (50ms on 60Hz screens) before starting to animate, which made opening them feel delayed after a tap. `Overlay` rendered inside `containerRef` also applies the container scroll offset before its first frame
