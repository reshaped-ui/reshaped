import React from "react";

/**
 * Types
 */
type Callback = (e: KeyboardEvent) => void;
type PressedKeys = Record<string, KeyboardEvent>;
type Hotkeys = Record<string, Callback | null>;
type Context = {
	isPressed: (key: string) => boolean;
	addHotkeys: (
		hotkeys: Hotkeys,
		ref: React.RefObject<HTMLElement | null>
	) => (() => void) | undefined;
};

/**
 * Utilities
 */
const COMBINATION_DELIMETER = "+";
const pressedMap: Record<string, KeyboardEvent> = {};
const modifiedKeys: string[] = [];

const formatHotkey = (hotkey: string) => {
	if (hotkey === " ") return hotkey;
	return hotkey.replace(/\s/g, "").toLowerCase();
};

// Normalize passed key combinations to turn them into a consistent ids
const getHotkeyId = (hotkey: string) => {
	return formatHotkey(hotkey).split(COMBINATION_DELIMETER).sort().join(COMBINATION_DELIMETER);
};

const getEventKey = (e: KeyboardEvent) => {
	// Having alt pressed modifies e.key value, so relying on e.code for it
	if (e.altKey && e.key !== "Alt") {
		return e.code.toLowerCase().replace(/key|digit|numpad/, "");
	}

	return e.key.toLowerCase();
};

const getCombinations = (pressedKeys: string[]) => {
	const result: string[] = [];
	const hotkey = pressedKeys.join(COMBINATION_DELIMETER);
	const id = getHotkeyId(hotkey);
	const sortedKeys = id.split(COMBINATION_DELIMETER);

	const f = (prefix: string, items: string[]) => {
		items.forEach((item, i) => {
			const nextId = prefix ? `${prefix}+${item}` : item;
			result.push(nextId);
			f(nextId, items.slice(i + 1));
		});
	};

	f("", sortedKeys);
	return result;
};

const walkPressedCombinations = (pressed: PressedKeys, cb: (id: string) => void) => {
	const pressedKeys = Object.keys(pressed);

	if (!pressedKeys.length) return;

	getCombinations(pressedKeys).forEach((pressedId) => {
		cb(pressedId);
	});
};

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
	hotkeyMap: Record<
		string,
		{ data: Set<{ callback: Callback; ref: React.RefObject<HTMLElement | null> }>; used: boolean }
	> = {};

	getSize = () => Object.keys(this.hotkeyMap).length;

	bindHotkeys = (hotkeys: Hotkeys, ref: React.RefObject<HTMLElement | null>) => {
		walkHotkeys(hotkeys, (id, hotkeyData) => {
			if (!hotkeyData) return;

			if (!this.hotkeyMap[id]) {
				this.hotkeyMap[id] = { data: new Set(), used: false };
			}

			this.hotkeyMap[id].data.add({ callback: hotkeyData, ref });
		});
	};

	unbindHotkeys = (hotkeys: Hotkeys) => {
		walkHotkeys(hotkeys, (id, hotkeyCallback) => {
			if (!hotkeyCallback) return;

			this.hotkeyMap[id]?.data.forEach((data) => {
				if (data.callback === hotkeyCallback) {
					this.hotkeyMap[id].data.delete(data);
				}
			});

			if (!this.hotkeyMap[id]?.data.size) {
				delete this.hotkeyMap[id];
			}
		});
	};

	handleKeyDown = (pressedMap: PressedKeys, e: KeyboardEvent) => {
		walkPressedCombinations(pressedMap, (pressedId) => {
			const hotkeyData = this.hotkeyMap[pressedId];
			if (!hotkeyData || hotkeyData.used) return;

			if (hotkeyData?.data.size) {
				hotkeyData.data.forEach((data) => {
					if (
						data.ref?.current &&
						!(e.target === data.ref.current || data.ref.current.contains(e.target as Node))
					) {
						return;
					}

					data.callback(pressedMap[pressedId]);
					this.hotkeyMap[pressedId].used = true;
				});
			}
		});
	};

	handleKeyUp = (e: KeyboardEvent) => {
		const id = getHotkeyId(e.key);

		walkHotkeys(this.hotkeyMap, (hotkeyId, data) => {
			const hotkeyIds = hotkeyId.split(COMBINATION_DELIMETER);

			if (hotkeyIds.includes(id)) data.used = false;
		});
	};
}

const globalHotkeyStore = new HotkeyStore();

/**
 * Components / Hooks
 */
export const HotkeyContext = React.createContext({} as Context);

export const SingletonHotkeysProvider = (props: { children: React.ReactNode }) => {
	const { children } = props;
	// eslint-disable-next-line
	const [_, setTriggerCount] = React.useState<number>(0);
	// Only handle key presses when there is at least one hook listening for hotkeys
	const [hooksCount, setHooksCount] = React.useState(0);

	const addPressedKey = React.useCallback(
		(e: KeyboardEvent) => {
			if (e.repeat || hooksCount === 0) return;

			const eventKey = getEventKey(e);

			pressedMap[eventKey] = e;

			if (eventKey === "meta" || eventKey === "control") {
				pressedMap.mod = e;
			}

			setTriggerCount(Object.keys(pressedMap).length);

			// Key up won't trigger for other keys while Meta is pressed so we need to cache them
			// and remove on Meta keyup
			if (eventKey === "meta") {
				modifiedKeys.push(...Object.keys(pressedMap));
			}

			if (pressedMap.Meta) {
				modifiedKeys.push(eventKey);
			}
		},
		[hooksCount]
	);

	const removePressedKey = React.useCallback(
		(e: KeyboardEvent) => {
			if (hooksCount === 0) return;

			const eventKey = getEventKey(e);

			delete pressedMap[eventKey];
			if (eventKey === "meta" || eventKey === "control") {
				delete pressedMap.mod;
			}

			if (eventKey === "meta") {
				modifiedKeys.forEach((key) => {
					delete pressedMap[key];
				});
			}

			setTriggerCount(Object.keys(pressedMap).length);
		},
		[hooksCount]
	);

	const isPressed = (hotkey: string) => {
		const keys = formatHotkey(hotkey).split(COMBINATION_DELIMETER);

		if (keys.some((key) => !pressedMap[key])) return false;
		return true;
	};

	const addHotkeys: Context["addHotkeys"] = React.useCallback((hotkeys, ref) => {
		setHooksCount((prev) => prev + 1);
		globalHotkeyStore.bindHotkeys(hotkeys, ref);

		return () => {
			setHooksCount((prev) => prev - 1);
			globalHotkeyStore.unbindHotkeys(hotkeys);
		};
	}, []);

	const handleWindowKeyDown = React.useCallback(
		(e: KeyboardEvent) => {
			addPressedKey(e);
			globalHotkeyStore.handleKeyDown(pressedMap, e);
		},
		[addPressedKey]
	);

	const handleWindowKeyUp = React.useCallback(
		(e: KeyboardEvent) => {
			removePressedKey(e);
			globalHotkeyStore.handleKeyUp(e);
		},
		[removePressedKey]
	);

	React.useEffect(() => {
		window.addEventListener("keydown", handleWindowKeyDown);
		window.addEventListener("keyup", handleWindowKeyUp);

		return () => {
			window.removeEventListener("keydown", handleWindowKeyDown);
			window.removeEventListener("keyup", handleWindowKeyUp);
		};
	}, [handleWindowKeyDown, handleWindowKeyUp]);

	return (
		<HotkeyContext.Provider value={{ addHotkeys, isPressed }}>{children}</HotkeyContext.Provider>
	);
};

const useSingletonHotkeys = () => React.useContext(HotkeyContext);

export default useSingletonHotkeys;
