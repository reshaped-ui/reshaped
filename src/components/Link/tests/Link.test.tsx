import React from "react";
import Link from "components/Link";
import {
	testChildren,
	testLinkBehavior,
	testLinkButtonBehavior,
	testButtonBehavior,
	testButtonType,
	testDisabledButton,
	testAriaLabel,
} from "utilities/testPresets";

describe("Link", () => {
	testChildren(({ children }) => <Link>{children}</Link>);

	testLinkBehavior(({ href }) => <Link href={href}>Children</Link>);

	testLinkButtonBehavior(({ href, onClick }) => (
		<Link href={href} onClick={onClick}>
			Children
		</Link>
	));

	testButtonBehavior(({ onClick }) => <Link onClick={onClick}>Children</Link>);

	testButtonType(() => <Link type="button">Children</Link>);

	testDisabledButton(({ onClick }) => (
		<Link onClick={onClick} disabled>
			Children
		</Link>
	));

	testAriaLabel(({ ariaLabel }) => (
		<Link type="button" attributes={{ "aria-label": ariaLabel }}>
			Children
		</Link>
	));
});
