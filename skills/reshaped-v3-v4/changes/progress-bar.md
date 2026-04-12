---
component: ProgressBar
description: Renamed `Progress` to `ProgressBar`
---

## Automated migration

Replace `Progress` with `ProgressBar` in component usage and imports. Replace `ProgressProps` with `ProgressBarProps`.

Before:

```tsx
import { Progress } from "reshaped";
import type { ProgressProps } from "reshaped";

<Progress value={40} />
```

After:

```tsx
import { ProgressBar } from "reshaped";
import type { ProgressBarProps } from "reshaped";

<ProgressBar value={40} />
```
