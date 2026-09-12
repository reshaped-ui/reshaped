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
const SPRING_MAX_DURATION = 600;
const SPRING_MIN_DURATION = 50;
const SPRING_REST_DISTANCE = 0.5;
const SPRING_REST_VELOCITY = 20;
/** Velocity is capped so a fast flick doesn't resolve into an unreasonably long easing curve */
const SPRING_MAX_VELOCITY = 3;
/** Duration range used when the browser doesn't support linear() easing */
const FALLBACK_MIN_DURATION = 100;
const FALLBACK_MAX_DURATION = 300;

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

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
 * Browsers without linear() easing support fall back to a decelerating transition scaled by the velocity.
 *
 * @param displacement - current position relative to the target position, in px
 * @param velocity - current velocity in px/ms, measured on the same axis as the displacement
 * and positive when moving away from the target position
 * @returns transition duration in ms and its timing function
 */
export const resolveSpringTransition = (args: { displacement: number; velocity: number }) => {
	const { displacement } = args;
	const velocity = clamp(args.velocity, -SPRING_MAX_VELOCITY, SPRING_MAX_VELOCITY);

	if (!displacement) return { duration: 0, easing: "linear" };

	if (!checkLinearEasing()) {
		const duration = Math.abs(displacement) / Math.max(Math.abs(velocity), 0.001);

		return {
			duration: clamp(duration, FALLBACK_MIN_DURATION, FALLBACK_MAX_DURATION),
			easing: "var(--rs-easing-decelerate)",
		};
	}

	const step = 1000 / SPRING_SAMPLE_RATE;
	// Position over time: (a + b * t) * e^(-omega * t), with the time in seconds
	const a = displacement;
	const b = velocity * 1000 + SPRING_OMEGA * displacement;
	const values: number[] = [];
	let duration = 0;

	while (true) {
		const time = duration / 1000;
		const decay = Math.exp(-SPRING_OMEGA * time);
		const position = (a + b * time) * decay;
		const speed = (b - SPRING_OMEGA * (a + b * time)) * decay;
		const settled =
			Math.abs(position) < SPRING_REST_DISTANCE && Math.abs(speed) < SPRING_REST_VELOCITY;

		values.push(1 - position / displacement);

		if (duration >= SPRING_MAX_DURATION) break;
		if (settled && duration >= SPRING_MIN_DURATION) break;

		duration += step;
	}

	values[values.length - 1] = 1;

	return {
		duration,
		easing: `linear(${values.map((value) => value.toFixed(4)).join(", ")})`,
	};
};
