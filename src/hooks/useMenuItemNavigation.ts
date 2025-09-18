"use client";

import React from "react";
import useHotkeys from "./useHotkeys";
import { focusFirstElement, focusLastElement } from "utilities/a11y";
import { getFocusData, focusElement } from "utilities/a11y/focus";
import * as keys from "constants/keys";

/**
 * Options for configuring menu item navigation behavior
 */
export type UseMenuItemNavigationOptions = {
	/**
	 * Whether keyboard navigation is disabled
	 * @default false
	 */
	disabled?: boolean;
	/**
	 * Whether navigation should wrap around (circular)
	 * When false, navigation stops at first/last item (matches DropdownMenu behavior)
	 * @default false
	 */
	circular?: boolean;
	/**
	 * Navigation orientation
	 * - 'vertical': Up/Down arrows navigate (default, matches DropdownMenu)
	 * - 'horizontal': Left/Right arrows navigate
	 * @default 'vertical'
	 */
	orientation?: "vertical" | "horizontal";
	/**
	 * Whether to prevent default behavior for arrow keys
	 * Prevents page scrolling when navigating
	 * @default true
	 */
	preventDefault?: boolean;
};

/**
 * Hook that provides keyboard navigation for standalone MenuItem components.
 *
 * This hook enables the same keyboard navigation capabilities as DropdownMenu.Item
 * for standalone MenuItem components in a list. It provides:
 *
 * - Up/Down arrow navigation between items (or Left/Right for horizontal)
 * - Home/End keys to jump to first/last item
 * - Proper focus management with overflow handling
 * - RTL support (inherited from focus utilities)
 * - Accessibility compliance
 *
 * @example
 * ```tsx
 * const MyMenuList = () => {
 *   const { ref } = useMenuItemNavigation();
 *
 *   return (
 *     <div ref={ref}>
 *       <MenuItem>First Item</MenuItem>
 *       <MenuItem>Second Item</MenuItem>
 *       <MenuItem>Third Item</MenuItem>
 *     </div>
 *   );
 * };
 * ```
 *
 * @example
 * ```tsx
 * // Horizontal navigation with circular behavior
 * const { ref } = useMenuItemNavigation({
 *   orientation: 'horizontal',
 *   circular: true
 * });
 * ```
 *
 * @param options Configuration options for navigation behavior
 * @returns Object containing ref to attach to the container element
 */
const useMenuItemNavigation = <Element extends HTMLElement = HTMLDivElement>(
	options: UseMenuItemNavigationOptions = {}
) => {
	const {
		disabled = false,
		orientation = "vertical",
		preventDefault = true,
		circular = false,
	} = options;

	// Create a ref that will be used in the hotkey functions
	const containerRef = React.useRef<Element>(null);

	// Create hotkey mappings based on orientation
	const hotkeys = React.useMemo(() => {
		// Helper function to focus with circular support
		const focusWithCircular = (target: "next" | "prev") => {
			if (!containerRef.current) return;
			const data = getFocusData({
				root: containerRef.current,
				target,
				options: {
					circular,
					includeNegativeTabIndex: true,
				},
			});
			focusElement(data.el);
		};

		const baseHotkeys: Record<string, (() => void) | null> = {
			[keys.LEFT]: null,
			[keys.RIGHT]: null,
			[keys.UP]: null,
			[keys.DOWN]: null,
			[keys.HOME]: () => {
				console.log("HOME key pressed, focusing first element");
				if (containerRef.current) focusFirstElement(containerRef.current);
			},
			[keys.END]: () => {
				console.log("END key pressed, focusing last element");
				if (containerRef.current) focusLastElement(containerRef.current);
			},
		};

		if (orientation === "horizontal") {
			baseHotkeys[keys.LEFT] = () => {
				console.log("LEFT key pressed, focusing previous element");
				focusWithCircular("prev");
			};
			baseHotkeys[keys.RIGHT] = () => {
				console.log("RIGHT key pressed, focusing next element");
				focusWithCircular("next");
			};
		} else {
			// Default vertical orientation (matches DropdownMenu behavior)
			baseHotkeys[keys.UP] = () => {
				console.log("UP key pressed, focusing previous element");
				focusWithCircular("prev");
			};
			baseHotkeys[keys.DOWN] = () => {
				console.log("DOWN key pressed, focusing next element");
				focusWithCircular("next");
			};
			// In vertical mode, Right arrow opens dropdown menus
			baseHotkeys[keys.RIGHT] = () => {
				const activeElement = document.activeElement;

				// Check if current focused element is a dropdown trigger
				if (activeElement?.getAttribute("aria-haspopup") === "menu") {
					console.log("RIGHT key pressed on dropdown trigger, opening dropdown");
					(activeElement as HTMLElement).click();
					return;
				}

				console.log("RIGHT key pressed, no action (vertical orientation)");
			};
		}

		return baseHotkeys;
	}, [orientation, circular]);

	useHotkeys(
		hotkeys,
		[orientation, circular], // Re-create hotkeys when orientation or circular changes
		{
			disabled,
			preventDefault,
			ref: containerRef,
		}
	);

	return { ref: containerRef };
};

export default useMenuItemNavigation;
