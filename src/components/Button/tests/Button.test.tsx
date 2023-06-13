import React from "react";
import Button from "components/Button";
import {
	testChildren,
	testLinkBehavior,
	testLinkButtonBehavior,
	testButtonBehavior,
	testButtonType,
	testDisabledButton,
	testAriaLabel,
} from "utilities/testPresets";

describe("Components/Button", () => {
	testChildren(({ children }) => <Button>{children}</Button>);

	testLinkBehavior(({ href }) => <Button href={href}>Children</Button>);

	testLinkButtonBehavior(({ href, onClick }) => (
		<Button href={href} onClick={onClick}>
			Children
		</Button>
	));

	testButtonBehavior(({ onClick }) => <Button onClick={onClick}>Children</Button>);

	testButtonType(() => <Button onClick={() => {}}>Children</Button>);

	testDisabledButton(({ onClick }) => (
		<Button onClick={onClick} disabled>
			Children
		</Button>
	));

	testAriaLabel(({ ariaLabel }) => (
		<Button attributes={{ "aria-label": ariaLabel }} onClick={() => {}}>
			Children
		</Button>
	));
});
