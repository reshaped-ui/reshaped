import React from "react";
import Portal from "components/_private/Portal";

export default { title: "Utilities/Internal/Portal" };

export const base = () => {
	const ref = React.useRef<HTMLDivElement | null>(null);
	const [mounted, setMounted] = React.useState(false);

	React.useEffect(() => {
		setMounted(true);
	}, []);

	return (
		<>
			<div style={{ border: "2px solid #333", padding: 16 }}>
				App
				{mounted && <Portal targetRef={ref}>Ported to green</Portal>}
			</div>
			<div ref={ref} style={{ border: "2px solid green", padding: 16 }} />
		</>
	);
};
