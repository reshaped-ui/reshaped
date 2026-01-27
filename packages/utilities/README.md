# @reshaped/utilities

`@reshaped/utilities` is a standalone package that provides common utilities for building components and web applications with any framework. These utilities handle common patterns like focus management, scroll locking, DOM manipulation, and more.

Reshaped uses this package internally to power its component library, and you can use the same utilities in your own projects to build consistent, accessible experiences. In case you're using React, check `@reshaped/headless` instead as it covers more APIs and provides a better built-in integration with React.

```
npm install @reshaped/utilities
```

## API overview

### Flyout

```ts
import { Flyout } from "@reshaped/utilities";

const flyout = new Flyout({
	content: contentElement,
	trigger: triggerElement,
	position: "bottom-start",
});

// Position the flyout content based on the trigger element
flyout.activate();

// Clean-up the flyout behavior on closing the content
flyout.deactivate();

// Update flyout position based on updated options and the current viewport position
flyout.update(options);
```

When you need to position floating elements like dropdowns, popovers, or tooltips, create a new Flyout instance and pass the content and trigger elements. The class handles complex positioning logic, collision detection, and automatic position adjustments to ensure your floating content is always visible and properly aligned.

Flyout support multiple options to tailor its behavior for your use case. These options can be pass when creating a flyout instance or when using the `update` method.

```ts
export type Options = {
	// Element that has to be positioned against the trigger. It has to be rendered at the moment of calling `new Flyout`
	content: HTMLElement;

	// Trigger element to position the content against
	trigger?: HTMLElement | null;

	// In case there is no trigger on the page, pass the x, y coordinates instead. This is useful for building components like context menus
	triggerCoordinates?: { x: number; y: number } | null;

	// Specify a container to position the content within instead of using the viewport boundaries
	container?: HTMLElement | null;

	// Default position to render the content, relative to the trigger
	position:
		| `top`
		| `top-start`
		| `top-end`
		| `bottom`
		| `bottom-start`
		| `bottom-end`
		| `start`
		| `start-top`
		| `start-bottom`
		| `end`
		| `end-top`
		| `end-bottom`;

	// Define which positions are used as fallbacks when default position doesn't fit into the viewport
	// Passing an empty array would always keep the content in the same position
	fallbackPositions?: Position[];

	// Custom content width instead of using the width based on the content children
	width?: Width;

	// Try shifting and resizing the content if it doesn't fit into the viewport first instead of immediately changing the position
	fallbackAdjustLayout?: boolean;

	// Minimal height value for the content when using `fallbackAdjustLayout`
	fallbackMinHeight?: string;

	// Add an additional gap between the trigger and the content
	contentGap?: number;
	// Shift the content alongside the trigger
	contentShift?: number;

	// Handler for the cases when flyout deactivates itself internally based on the event handling
	// For example, it might deactivate itself after scrolling the trigger outside the viewport
	onDeactivate: () => void;
};
```

### TrapFocus

```ts
import { TrapFocus } from "@reshaped/utilities";

class Modal {
	trapFocus;

	constructor() {
		this.trapFocus = new TrapFocus();
	}

	open() {
		this.trapFocus.trap(targetRef.current);
	}

	close() {
		this.trapFocus.release();
	}
}
```

When `TrapFocus` is activated, it traps keyboard and screen reader navigation within the given element until focus is released. Since TrapFocus is a class, you can create a new instance and pass the target element to initialize it. This is useful when an element (like a modal or popup) appears on screen. When the element is dismissed, call the release method to restore normal focus behavior.

There are multiple options you can pass to the trapFocus methods to customize its behavior:

```ts
trapFocus.trap(
  // element to trap the focus within
  rootElement,
  {
    // keep the focus on the trigger and include it in the focus sequence
    includeTrigger: boolean,

    // element to move to the focus to after the initialization
    initialFocusEl: HTMLElement

    // keyboard navigation mode
    // `dialog` - handles Tab and Shift + Tab, looping focus within the element
    // `action-menu` - allows focus navigation with the ArrowUp and ArrowDown keys. Pressing Tab moves focus to the next element after the original trigger and automatically releases the focus trap. You can use the `onRelease` option to dismiss the content when that happens.
    // `action-bar` - works like `action-menu`, but uses the ArrowLeft and ArrowRight keys to move focus instead.
    // `content-menu` - keeps the navigation flow natural by including all focusable elements in the trapped area after the trigger element.
    // Focus navigation uses the Tab key, but pressing Tab on the last element moves focus to the next element after the original trigger.
    // This releases the focus trap, and you can respond to it using the `onRelease` handler.
    mode: 'dialog' | 'action-menu' | 'action-bar' | 'content-menu';

    // callback to run when the focus trap is released internally
    // for example, when Tab is pressed in the action-menu mode
    onRelease?: () => void;
  }
);

trapFocus.release({
  // By default, releasing the focus trap returns focus to the original trigger element.
  // Use the withoutFocusReturn option to disable this behavior.
  // This is useful when closing the element with an outside click and you want to avoid the page scrolling back to the trigger.
  withoutFocusReturn: boolean
})
```

### classNames

The `classNames` utility is a lightweight function for combining multiple class names into a single string. It's similar to the popular classnames library but is included directly in Reshaped, eliminating the need for an additional dependency.

Use this utility when building custom components that need to conditionally apply CSS classes based on props, state, or other conditions. It handles various input types including strings, booleans, null, and undefined values, making it easy to compose dynamic class names.

```tsx
import { classNames } from "@reshaped/utilities";
import styles from "./Button.module.css";

const Button = ({ variant, disabled, className }) => {
	const buttonClassNames = classNames(
		styles.root,
		variant && styles[`variant-${variant}`],
		disabled && styles.disabled,
		className
	);

	return <button className={buttonClassNames}>Click me</button>;
};
```

You can also pass arrays of class names, which is useful when dealing with responsive class names or more complex scenarios:

```tsx
const containerClassNames = classNames(
	styles.container,
	[responsive && styles.responsive, styles.flex],
	padding && [styles.paddingTop, styles.paddingBottom]
);
```

### lockScroll

```ts
import { lockScroll } from "@reshaped/utilities";

class Modal {
	unlock;

	constructor() {}

	open() {
		this.unlock = lockScroll();
	}

	close() {
		this.unlock?.();
	}
}
```

By default, `lockScroll` will lock the scrolling of the document body and there are a few additional options you can pass to customize the behavior. Calling the returned `unlockScroll` function will unlock the scrolling based on the originally passed options.

`lockScroll` options:

```ts
const unlock = lockScroll({
	// lock the scrolling of a specific element
	containerEl,
	// specify an element that triggered the scroll lock
	// specifying it will automatically find the closest scrollable parent to lock its scrolling instead of locking the whole document
	originEl,
	// callback triggered when the scroll gets locked
	// in case it was already locked before when triggered, the callback won't run
	callback,
});

unlock({
	// callback triggered when the scroll gets unlocked
	callback,
});
```

### isRTL

```ts
import { isRTL } from "@reshaped/utilities";

// Call anywhere in your code
const rtl = isRTL();
```
