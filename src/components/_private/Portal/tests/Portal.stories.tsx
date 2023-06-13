import React from "react";
import Portal from "components/_private/Portal";

export default { title: "Utilities/Internal/Portal" };

export const base = () => {
	const ref = React.useRef<HTMLDivElement>(null);

	return (
		<div style={{ border: "2px solid #333", padding: 16 }}>
			App
			<Portal scopeRef={ref}>
				<div ref={ref} style={{ border: "2px solid green", padding: 16 }}>
					Portal scope
					<div style={{ border: "2px solid red", padding: 16 }}>
						Stays in red
						<Portal>Ported to green</Portal>
					</div>
				</div>
			</Portal>
		</div>
	);
};
