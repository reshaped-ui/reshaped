import React from "react";
import { render, screen } from "@testing-library/react";
import useScrollLock from "hooks/useScrollLock";

const fixtures = {
	text: "Test content",
};

const Component = (props: { unlock?: boolean }) => {
	const { unlock } = props;
	const { lockScroll, unlockScroll, scrollLocked } = useScrollLock();

	React.useEffect(() => {
		lockScroll();
	}, [lockScroll]);

	React.useEffect(() => {
		if (scrollLocked && unlock) unlockScroll();
	}, [scrollLocked, unlock, unlockScroll]);

	return <div />;
};

const ComponentContainer = (props: { unlock?: boolean }) => {
	const { unlock } = props;
	const ref = React.useRef(null);
	const { lockScroll, unlockScroll, scrollLocked } = useScrollLock({ ref });

	React.useEffect(() => {
		lockScroll();
	}, [lockScroll]);

	React.useEffect(() => {
		if (scrollLocked && unlock) unlockScroll();
	}, [scrollLocked, unlock, unlockScroll]);

	return <div ref={ref}>{fixtures.text}</div>;
};

describe("useScrollLock", () => {
	/* We test unlock first so the second test starts with the unlocked scroll on body again */
	test("unlocks scroll", () => {
		render(<Component unlock />);

		expect(document.body).not.toHaveStyle("overflow: hidden");
	});

	test("locks scroll", () => {
		render(<Component />);

		expect(document.body).toHaveStyle("overflow: hidden");
	});

	test("locks scroll of a custom container", () => {
		render(<ComponentContainer />);

		const container = screen.getByText(fixtures.text);
		expect(container).toHaveStyle("overflow: hidden");
	});

	test("unlocks scroll of a custom container", () => {
		render(<ComponentContainer unlock />);

		const container = screen.getByText(fixtures.text);
		expect(container).not.toHaveStyle("overflow: hidden");
	});
});
