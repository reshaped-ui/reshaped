export const onNextFrame = (cb: () => void) => {
	requestAnimationFrame(() => {
		requestAnimationFrame(() => cb());
	});
};

const transitionAttribute = "data-rs-no-transition";
const reducedMotionMediaQuery = "(prefers-reduced-motion: reduce)";

export const disableTransitions = () => {
	document.documentElement.setAttribute(transitionAttribute, "true");
};

export const enableTransitions = () => {
	document.documentElement.removeAttribute(transitionAttribute);
};

export const checkTransitions = () => {
	if (document.documentElement.hasAttribute(transitionAttribute)) return false;

	if (typeof window === "undefined" || typeof window.matchMedia !== "function") return false;
	return !window.matchMedia(reducedMotionMediaQuery).matches;
};

/**
 * Angular frequency of the critically damped spring used for the gesture release animations, in 1/s.
 * Higher values settle faster, 20 settles from a resting position in ~300ms
 */
const SPRING_OMEGA = 20;
const SPRING_SAMPLE_RATE = 120;
const SPRING_MAX_DURATION = 0.6;
const SPRING_MIN_DURATION = 0.05;
const SPRING_REST_DISTANCE = 0.5;
const SPRING_REST_VELOCITY = 20;

let supportsLinearEasing: boolean | null = null;

const checkLinearEasing = () => {
	if (supportsLinearEasing !== null) return supportsLinearEasing;
	supportsLinearEasing =
		typeof CSS !== "undefined" &&
		typeof CSS.supports === "function" &&
		CSS.supports("transition-timing-function", "linear(0, 1)");
	return supportsLinearEasing;
};

/**
 * Resolves a critically damped spring into a css transition duration and a linear() easing,
 * so the release animation continues from the current velocity of the gesture instead of restarting from zero.
 *
 * @param displacement - current position relative to the target position in px
 * @param velocity - current velocity in px/s measured on the same axis as the displacement
 * @returns null when the browser doesn't support linear() easing or there is nothing to animate
 */
export const resolveSpringTransition = (args: {
	displacement: number;
	velocity: number;
}): { duration: number; easing: string } | null => {
	const { displacement, velocity } = args;

	if (!displacement || !checkLinearEasing()) return null;

	const step = 1 / SPRING_SAMPLE_RATE;
	// Position over time: (a + b * t) * e^(-omega * t)
	const a = displacement;
	const b = velocity + SPRING_OMEGA * displacement;
	const values: number[] = [];
	let time = 0;

	while (true) {
		const decay = Math.exp(-SPRING_OMEGA * time);
		const position = (a + b * time) * decay;
		const speed = (b - SPRING_OMEGA * (a + b * time)) * decay;

		values.push(1 - position / displacement);

		const settled =
			Math.abs(position) < SPRING_REST_DISTANCE && Math.abs(speed) < SPRING_REST_VELOCITY;

		if (settled && time >= SPRING_MIN_DURATION) break;
		if (time >= SPRING_MAX_DURATION) break;

		time += step;
	}

	values[values.length - 1] = 1;

	return {
		duration: time * 1000,
		easing: `linear(${values.map((value) => value.toFixed(4)).join(", ")})`,
	};
};
