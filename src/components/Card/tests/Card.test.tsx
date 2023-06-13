import React from "react";
import Card from "components/Card";
import {
	testChildren,
	testLinkBehavior,
	testLinkButtonBehavior,
	testButtonBehavior,
} from "utilities/testPresets";

describe("Components/Card", () => {
	testChildren(({ children }) => <Card>{children}</Card>);

	testLinkBehavior(({ href }) => <Card href={href}>Children</Card>);

	testLinkButtonBehavior(({ href, onClick }) => (
		<Card href={href} onClick={onClick}>
			Children
		</Card>
	));

	testButtonBehavior(({ onClick }) => <Card onClick={onClick}>Children</Card>);
});
