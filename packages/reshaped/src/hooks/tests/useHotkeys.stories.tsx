import useHotkeys from "../useHotkeys";

export default {
	title: "Hooks/useHotkeys",
	parameters: {
		chromatic: { disableSnapshot: true },
	},
};

export const base = {
	name: "base",
	render: () => {
		const { checkHotkeyState } = useHotkeys({
			"shift + b + n": () => console.log("pressed"),
			"c + v": () => console.log("c + v"),
			"Meta + k": () => console.log("meta + k"),
			"Meta + f": () => console.log("meta + f"),
			"Meta + v": () => console.log("meta + v"),
			"Meta + b": () => console.log("meta + b"),
			"control + enter": () => console.log("control + enter"),
			"meta + enter": () => console.log("meta + enter"),
			"mod + enter": () => console.log("mod + enter"),
			"mod + ArrowRight": () => console.log("right"),
			"mod + ArrowUp": () => console.log("top"),
			"shift + ArrowRight": () => console.log("right"),
			"shift + ArrowUp": () => console.log("top"),
			"alt+shift+n": () => console.log("alt+shift+n"),
			"shift+alt+n": () => console.log("shift+alt+n"),
			"alt+shiftLeft+n": () => console.log("alt+shiftLeft+n"),
		});
		const active = checkHotkeyState("shift + b + n");
		const shiftActive = checkHotkeyState("shift");
		const bActive = checkHotkeyState("b");
		const nActive = checkHotkeyState("n");

		return (
			<div
				style={{
					display: "flex",
					gap: 8,
					padding: 8,
					background: active ? "violet" : "transparent",
				}}
			>
				<div
					style={{
						padding: 4,
						borderRadius: 4,
						backgroundColor: shiftActive ? "tomato" : "transparent",
					}}
				>
					Shift
				</div>
				<div
					style={{
						padding: 4,
						borderRadius: 4,
						backgroundColor: bActive ? "tomato" : "transparent",
					}}
				>
					b
				</div>
				<div
					style={{
						padding: 4,
						borderRadius: 4,
						backgroundColor: nActive ? "tomato" : "transparent",
					}}
				>
					n
				</div>
			</div>
		);
	},
};
