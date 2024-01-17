import "@testing-library/jest-dom";
import transitionEventPolyfill from "./transition-event-polyfill";

transitionEventPolyfill();

global.ResizeObserver = jest.fn().mockImplementation(() => ({
	observe: jest.fn(),
	unobserve: jest.fn(),
	disconnect: jest.fn(),
}));
