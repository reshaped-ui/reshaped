let originalStyles = {};

const lockSafariScroll = () => {
	const bodyStyle = document.body.style;
	const offsetLeft = window.visualViewport?.offsetLeft || 0;
	const offsetTop = window.visualViewport?.offsetTop || 0;
	const scrollX = window.scrollX;
	const scrollY = window.scrollY;

	console.log(scrollY);

	originalStyles = {
		position: bodyStyle.position,
		top: bodyStyle.top,
		left: bodyStyle.left,
		right: bodyStyle.right,
		overflowX: bodyStyle.overflowX,
		overflowY: bodyStyle.overflowY,
	};

	Object.assign(bodyStyle, {
		position: "fixed",
		top: `${-(scrollY - Math.floor(offsetTop))}px`,
		left: `${-(scrollX - Math.floor(offsetLeft))}px`,
		right: "0",
		overflow: "hidden",
	});

	return () => {
		Object.assign(bodyStyle, originalStyles);
		window.scrollTo({ top: scrollY, left: scrollX, behavior: "instant" });
		// window.scrollTo(scrollX, scrollY);

		originalStyles = {};
	};
};

export default lockSafariScroll;
