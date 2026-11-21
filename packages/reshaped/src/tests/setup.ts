/**
 * Setup for the `browser` vitest project (`*.test.tsx` files).
 * Loads the same theme as Storybook so components render with real styles and layout.
 */
import { configure } from "vitest-browser-react/pure";

import "@/themes/slate/theme.css";

// Match Storybook, which renders every story inside React.StrictMode
configure({ reactStrictMode: true });
