"use client";

import React from "react";

/**
 * Types
 */
type Callback = (e?: KeyboardEvent) => void;
type PressedMap = Record<string, KeyboardEvent>;
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
const MODIFIER_KEYS = ["meta", "control", "alt", "shift"];

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
	if (e.altKey && /^(Key|Digit|Numpad)/.test(e.code)) {
		return e.code.toLowerCase().replace(/^(key|digit|numpad)/, "");
	}

	return e.key.toLowerCase();
};

/**
 * Support for `mod` that represents both Mac and Win keyboards
 * We create the hotkeyId again to sort the mod key correctly
 */
const getPressedIds = (pressedId: string) => {
	const pressedFormattedKeys = pressedId.split(COMBINATION_DELIMETER);
	const ids = [pressedId];

	if (pressedFormattedKeys.includes("control")) {
		ids.push(getHotkeyId(pressedId.replace("control", "mod")));
	}

	if (pressedFormattedKeys.includes("meta")) {
		ids.push(getHotkeyId(pressedId.replace("meta", "mod")));
	}

	return ids;
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

	hasHandlers = (pressedId: string) => {
		return getPressedIds(pressedId).some((id) => this.hotkeyMap[id]?.size);
	};

	bindHotkeys = (
		hotkeys: Hotkeys,
		ref: React.RefObject<HTMLElement | null>,
		options: HotkeyOptions
	) => {
		const boundData: Array<{ id: string; data: HotkeyData }> = [];

		walkHotkeys(hotkeys, (id, callback) => {
			if (!callback) return;

			const data = { callback, ref, options };

			if (!this.hotkeyMap[id]) {
				this.hotkeyMap[id] = new Set();
			}

			this.hotkeyMap[id].add(data);
			boundData.push({ id, data });
		});

		return () => {
			boundData.forEach(({ id, data }) => {
				this.hotkeyMap[id]?.delete(data);

				if (!this.hotkeyMap[id]?.size) {
					delete this.hotkeyMap[id];
				}
			});
		};
	};

	handleKeyDown = (pressedMap: PressedMap, e: KeyboardEvent) => {
		const pressedKeys = Object.keys(pressedMap);
		if (!pressedKeys.length) return;

		const pressedId = getHotkeyId(pressedKeys.join(COMBINATION_DELIMETER));
		const eventTarget = e.composedPath()[0] as Node;

		getPressedIds(pressedId).forEach((id) => {
			const hotkeyData = this.hotkeyMap[id];
			if (!hotkeyData?.size) return;

			hotkeyData.forEach((data) => {
				if (
					data.ref.current &&
					!(eventTarget === data.ref.current || data.ref.current.contains(eventTarget))
				) {
					return;
				}

				if (data.options.preventDefault) {
					e.preventDefault();
				}

				data.callback(e);
			});
		});
	};
}

const globalHotkeyStore = new HotkeyStore();

/**
 * Components / Hooks
 */
const HotkeyContext = React.createContext({} as Context);

const HotkeysProvider: React.FC<{ children: React.ReactNode }> = (props) => {
	const { children } = props;
	// Ref is the source of truth to keep the map in sync with the native events,
	// state is mirroring it to re-render the consumers relying on isPressed
	const pressedMapRef = React.useRef<PressedMap>({});
	const [, setPressedState] = React.useState<PressedMap>({});
	// Keyup events don't trigger for regular keys while Meta is pressed on macOS,
	// so we track the keys pressed during that time to release them manually
	const metaModifiedKeysRef = React.useRef<string[]>([]);
	const hooksCountRef = React.useRef(0);

	const setPressedMap = React.useCallback((nextPressedMap: PressedMap) => {
		pressedMapRef.current = nextPressedMap;
		setPressedState(nextPressedMap);
	}, []);

	const addPressedKey = React.useCallback(
		(e: KeyboardEvent): PressedMap | undefined => {
			if (e.repeat || hooksCountRef.current === 0) return;

			const eventKey = getEventKey(e);
			if (!eventKey) return;

			const nextPressedMap = { ...pressedMapRef.current };
			nextPressedMap[eventKey] = e;

			if (nextPressedMap["meta"]) {
				if (!MODIFIER_KEYS.includes(eventKey)) {
					// Keys pressed while Meta was held might have been released already
					// without us receiving their keyup events, so when the whole pressed combination
					// doesn't match any hotkey - we treat them as released
					const staleKeys = metaModifiedKeysRef.current.filter(
						(key) => key !== eventKey && key in nextPressedMap
					);
					const pressedId = getHotkeyId(Object.keys(nextPressedMap).join(COMBINATION_DELIMETER));

					if (staleKeys.length && !globalHotkeyStore.hasHandlers(pressedId)) {
						staleKeys.forEach((key) => delete nextPressedMap[key]);
					}
				}

				metaModifiedKeysRef.current = Object.keys(nextPressedMap).filter(
					(key) => !MODIFIER_KEYS.includes(key)
				);
			}

			setPressedMap(nextPressedMap);
			return nextPressedMap;
		},
		[setPressedMap]
	);

	const removePressedKey = React.useCallback(
		(e: KeyboardEvent) => {
			if (hooksCountRef.current === 0) return;

			const eventKey = getEventKey(e);
			if (!eventKey) return;

			const nextPressedMap = { ...pressedMapRef.current };
			delete nextPressedMap[eventKey];

			if (eventKey === "meta") {
				metaModifiedKeysRef.current.forEach((key) => {
					delete nextPressedMap[key];
				});
				metaModifiedKeysRef.current = [];
			}

			setPressedMap(nextPressedMap);
		},
		[setPressedMap]
	);

	const isPressed = React.useCallback((hotkey: string) => {
		const pressedMap = pressedMapRef.current;
		const keys = formatHotkey(hotkey).split(COMBINATION_DELIMETER);

		return keys.every((key) => {
			if (key === "mod") return Boolean(pressedMap["meta"] || pressedMap["control"]);
			return Boolean(pressedMap[key]);
		});
	}, []);

	const handleWindowKeyDown = React.useCallback(
		(e: KeyboardEvent) => {
			// Browsers trigger keyboard event without passing e.key when you click on autocomplete
			if (!e.key) return;

			const nextPressedMap = addPressedKey(e) ?? pressedMapRef.current;
			globalHotkeyStore.handleKeyDown(nextPressedMap, e);
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
		setPressedMap({});
		metaModifiedKeysRef.current = [];
	}, [setPressedMap]);

	const addHotkeys: Context["addHotkeys"] = React.useCallback((hotkeys, ref, options = {}) => {
		hooksCountRef.current += 1;
		const unbindHotkeys = globalHotkeyStore.bindHotkeys(hotkeys, ref, options);

		return () => {
			hooksCountRef.current -= 1;
			unbindHotkeys();
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

export const SingletonHotkeysProvider: React.FC<{ children: React.ReactNode }> = (props) => {
	const { children } = props;
	// Hotkeys are handled globally, so nested providers rely on the root provider
	// instead of attaching their own window event listeners
	const hasParentProvider = Boolean(React.useContext(HotkeyContext).addHotkeys);

	if (hasParentProvider) return <>{children}</>;
	return <HotkeysProvider>{children}</HotkeysProvider>;
};

export const useSingletonHotkeys = () => React.useContext(HotkeyContext);
