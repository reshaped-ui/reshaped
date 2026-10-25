---
"reshaped": patch
---

Toast: Fixed toasts not being removed after hiding when their height transition is removed with custom styles. Hovering the toasts now pauses the timer and resumes it with the remaining time instead of restarting the full timeout, and moving the focus out of a toast no longer restarts its timer while the toasts are still hovered.
