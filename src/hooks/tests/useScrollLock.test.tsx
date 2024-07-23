import React from "react";
import { render } from "@testing-library/react";
import useScrollLock from "hooks/useScrollLock";

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
});
