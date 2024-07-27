import React from "react";
import View from "components/View";
import useDrag from "hooks/useDrag";
import useToggle from "hooks/useToggle";
import Button from "components/Button";

export default { title: "Hooks/useDrag" };

function Example() {
	const [state, setState] = React.useState({ x: 0, y: 0 });
	const disabledToggle = useToggle();

	const { ref, containerRef, active } = useDrag(
		(args) => {
			setState(args);
		},
		{
			disabled: disabledToggle.active,
		}
	);

	return (
		<View direction="row" gap={4}>
			<View
				backgroundColor="neutral-faded"
				borderRadius="medium"
				width="200px"
				height="200px"
				attributes={{ ref: containerRef }}
			>
				<View
					height={8}
					width={8}
					borderRadius="small"
					animated
					backgroundColor={active ? "primary" : "neutral"}
					attributes={{
						ref,
						style: { translate: `${state.x}px ${state.y}px`, cursor: active ? "grabbing" : "grab" },
					}}
				/>
			</View>
			<Button onClick={disabledToggle.toggle}>
				{disabledToggle.active ? "Enable" : "Disable"}
			</Button>
		</View>
	);
}

export const state = () => <Example />;
