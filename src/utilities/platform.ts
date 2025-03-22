const testPlatform = (re: RegExp) => {
	// Using experimentral and deprecated features here since that's the only way to detect platform consistently
	const platform =
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		window.navigator.userAgentData?.platform || window.navigator.platform;

	return typeof window !== "undefined" ? re.test(platform) : false;
};

const isIPhone = () => testPlatform(/^iPhone/i);
const isMac = () => testPlatform(/^Mac/i);
const isIPad = () => {
	return (
		testPlatform(/^iPad/i) ||
		// iPadOS 13 lies and says it's a Mac, but we can distinguish by detecting touch support.
		(isMac() && navigator.maxTouchPoints > 1)
	);
};

export const isIOS = () => isIPhone() || isIPad();
