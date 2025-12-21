import React from "react";

/**
 * Types
 */
type Callback = (e?: KeyboardEvent) => void;
type PressedMap = Map<string, KeyboardEvent>;
export type Hotkeys = Record<string, Callback | null>;
type HotkeyOptions = { preventDefault?: boolean };
type Context = {
	isPressed: (key: string) => boolean;
	addHotkeys: (
		hotkeys: Hotkeys,
		ref: React.RefObject<HTMLElement | null>,
		options?: HotkeyOptions
	) => (() => void) | undefined;
};

type HotkeyData = {
	callback: Callback;
	ref: React.RefObject<HTMLElement | null>;
	options: HotkeyOptions;
};

/**
 * Utilities
 */
const COMBINATION_DELIMETER = "+";
const pressedMap: PressedMap = new Map();
let modifiedKeys: string[] = [];

const formatHotkey = (hotkey: string) => {
	if (hotkey === " ") return hotkey;
	return hotkey.replace(/\s/g, "").toLowerCase();
};

// Normalize passed key combinations to turn them into a consistent ids
const getHotkeyId = (hotkey: string) => {
	return formatHotkey(hotkey).split(COMBINATION_DELIMETER).sort().join(COMBINATION_DELIMETER);
};

const getEventKey = (e: KeyboardEvent) => {
	if (!e.key) return;

	// Having alt pressed modifies e.key value, so relying on e.code for it
	if (e.altKey && /^[Key|Digit|Numpad]/.test(e.code)) {
		return e.code.toLowerCase().replace(/key|digit|numpad/, "");
	}

	return e.key.toLowerCase();
};

// Removing the unknown gets highlighted an invalid syntax
// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint
const walkHotkeys = <T extends unknown>(
	hotkeys: Record<string, T>,
	cb: (id: string, hotkeyData: T) => void
) => {
	Object.keys(hotkeys).forEach((key) => {
		key.split(",").forEach((hotkey) => {
			const data = hotkeys[key];
			if (!data) return;

			cb(getHotkeyId(hotkey), data);
		});
	});
};

export class HotkeyStore {
	hotkeyMap: Record<string, Set<HotkeyData>> = {};

	getSize = () => Object.keys(this.hotkeyMap).length;

	bindHotkeys = (
		hotkeys: Hotkeys,
		ref: React.RefObject<HTMLElement | null>,
		options: HotkeyOptions
	) => {
		walkHotkeys(hotkeys, (id, hotkeyData) => {
			if (!hotkeyData) return;

			if (!this.hotkeyMap[id]) {
				this.hotkeyMap[id] = new Set();
			}

			this.hotkeyMap[id].add({ callback: hotkeyData, ref, options });
		});
	};

	unbindHotkeys = (hotkeys: Hotkeys) => {
		walkHotkeys(hotkeys, (id, hotkeyCallback) => {
			if (!hotkeyCallback) return;

			this.hotkeyMap[id]?.forEach((data) => {
				if (data.callback === hotkeyCallback) {
					this.hotkeyMap[id].delete(data);
				}
			});

			if (!this.hotkeyMap[id]?.size) {
				delete this.hotkeyMap[id];
			}
		});
	};

	handleKeyDown = (pressedMap: PressedMap, e: KeyboardEvent) => {
		if (!pressedMap.size) return;

		const pressedKeys = [...pressedMap.keys()];
		const pressedId = getHotkeyId(pressedKeys.join(COMBINATION_DELIMETER));
		const pressedFormattedKeys = pressedId.split(COMBINATION_DELIMETER);

		const hotkeyData = this.hotkeyMap[pressedId];

		/**
		 * Support for `mod` that represents both Mac and Win keyboards
		 * We create the hotkeyId again to sort the mod key correctly
		 */
		const controlToModPressedId = getHotkeyId(pressedId.replace("control", "mod"));
		const metaToModPressedId = getHotkeyId(pressedId.replace("meta", "mod"));
		const hotkeyControlModData =
			pressedFormattedKeys.includes("control") && this.hotkeyMap[controlToModPressedId];
		const hotkeyMetaModData =
			pressedFormattedKeys.includes("meta") && this.hotkeyMap[metaToModPressedId];

		[hotkeyData, hotkeyControlModData, hotkeyMetaModData].forEach((hotkeyData) => {
			if (!hotkeyData) return;

			if (hotkeyData?.size) {
				hotkeyData.forEach((data) => {
					const eventTarget = e.composedPath()[0] as Node;

					if (
						data.ref.current &&
						!(eventTarget === data.ref.current || data.ref.current.contains(eventTarget))
					) {
						return;
					}

					const resolvedEvent = pressedMap.get(pressedId);

					if (data.options.preventDefault) {
						resolvedEvent?.preventDefault();
						e.preventDefault();
					}

					data.callback(e);
				});
			}
		});
	};
}

const globalHotkeyStore = new HotkeyStore();

/**
 * Components / Hooks
 */
export const HotkeyContext = React.createContext({} as Context);

export const SingletonHotkeysProvider: React.FC<{ children: React.ReactNode }> = (props) => {
	const { children } = props;
	// eslint-disable-next-line
	const [_, setTriggerCount] = React.useState<number>(0);
	// Only handle key presses when there is at least one hook listening for hotkeys
	const [hooksCount, setHooksCount] = React.useState(0);

	const addPressedKey = React.useCallback(
		(e: KeyboardEvent) => {
			if (e.repeat || hooksCount === 0) return;

			const eventKey = getEventKey(e);
			if (!eventKey) return;

			pressedMap.set(eventKey, e);
			setTriggerCount(pressedMap.size);

			// Key up won't trigger for other keys while Meta is pressed so we need to cache them
			// and remove on Meta keyup
			if (e.metaKey) modifiedKeys.push(...pressedMap.keys());

			if (pressedMap.has("Meta")) modifiedKeys.push(eventKey);
		},
		[hooksCount]
	);

	const removePressedKey = React.useCallback(
		(e: KeyboardEvent) => {
			if (hooksCount === 0) return;

			const eventKey = getEventKey(e);
			if (!eventKey) return;

			pressedMap.delete(eventKey);

			if (eventKey === "meta" || eventKey === "control") {
				pressedMap.delete("mod");
			}

			if (eventKey === "meta") {
				modifiedKeys.forEach((key) => {
					if (!pressedMap.has(key)) return;
					pressedMap.delete(key);
				});
				modifiedKeys = [];
			}

			setTriggerCount(pressedMap.size);
		},
		[hooksCount]
	);

	const isPressed = (hotkey: string) => {
		const keys = formatHotkey(hotkey).split(COMBINATION_DELIMETER);

		if (keys.some((key) => !pressedMap.has(key))) return false;
		return true;
	};

	const handleWindowKeyDown = React.useCallback(
		(e: KeyboardEvent) => {
			// Browsers trigger keyboard event without passing e.key when you click on autocomplete
			if (!e.key) return;

			addPressedKey(e);
			globalHotkeyStore.handleKeyDown(pressedMap, e);
		},
		[addPressedKey]
	);

	const handleWindowKeyUp = React.useCallback(
		(e: KeyboardEvent) => {
			if (!e.key) return;

			removePressedKey(e);
		},
		[removePressedKey]
	);

	const handleWindowBlur = React.useCallback(() => {
		pressedMap.clear();
		modifiedKeys = [];
	}, []);

	const addHotkeys: Context["addHotkeys"] = React.useCallback((hotkeys, ref, options = {}) => {
		setHooksCount((prev) => prev + 1);
		globalHotkeyStore.bindHotkeys(hotkeys, ref, options);

		return () => {
			setHooksCount((prev) => prev - 1);
			globalHotkeyStore.unbindHotkeys(hotkeys);
		};
	}, []);

	React.useEffect(() => {
		window.addEventListener("keydown", handleWindowKeyDown);
		window.addEventListener("keyup", handleWindowKeyUp);
		window.addEventListener("blur", handleWindowBlur);

		return () => {
			window.removeEventListener("keydown", handleWindowKeyDown);
			window.removeEventListener("keyup", handleWindowKeyUp);
			window.removeEventListener("blur", handleWindowBlur);
		};
	}, [handleWindowKeyDown, handleWindowKeyUp, handleWindowBlur]);

	return (
		<HotkeyContext.Provider value={{ addHotkeys, isPressed }}>{children}</HotkeyContext.Provider>
	);
};

const useSingletonHotkeys = () => React.useContext(HotkeyContext);

export default useSingletonHotkeys;
