const isRTL = (): boolean => {
	const root = document.documentElement;
	const dir = root.dir;

	if (dir === "rtl" || dir === "ltr") return dir === "rtl";

	// Fallback to computed style if dir attribute is not set
	const computedStyle = window.getComputedStyle(root);
	return computedStyle.direction === "rtl";
};

export default isRTL;
