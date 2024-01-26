import React from "react";
import { Example } from "utilities/storybook";
import Avatar from "components/Avatar";
import View from "components/View";
import Badge from "components/Badge";
import Icon from "components/Icon";
import Button from "components/Button";
import IconCheckmark from "icons/Checkmark";
import IconChevronRight from "icons/ChevronRight";

export default {
	title: "Components/Badge",
	component: Badge,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/components/badge",
		},
	},
};

export const variant = () => (
	<Example>
		<Example.Item title="variant: default">
			<Badge>Badge</Badge>
		</Example.Item>
		<Example.Item title="variant: faded">
			<Badge variant="faded">Badge</Badge>
		</Example.Item>
		<Example.Item title="variant: outline">
			<Badge variant="outline">Badge</Badge>
		</Example.Item>
	</Example>
);

export const color = () => (
	<Example>
		<Example.Item title="color: primary, all variants">
			<View direction="row" gap={3}>
				<Badge color="primary">Badge</Badge>
				<Badge variant="faded" color="primary">
					Badge
				</Badge>
				<Badge variant="outline" color="primary">
					Badge
				</Badge>
			</View>
		</Example.Item>

		<Example.Item title="color: positive, all variants">
			<View direction="row" gap={3}>
				<Badge color="positive">Badge</Badge>
				<Badge variant="faded" color="positive">
					Badge
				</Badge>
				<Badge variant="outline" color="positive">
					Badge
				</Badge>
			</View>
		</Example.Item>

		<Example.Item title="color: critical, all variants">
			<View direction="row" gap={3}>
				<Badge color="critical">Badge</Badge>
				<Badge variant="faded" color="critical">
					Badge
				</Badge>
				<Badge variant="outline" color="critical">
					Badge
				</Badge>
			</View>
		</Example.Item>

		<Example.Item title="color: warning, all variants">
			<View direction="row" gap={3}>
				<Badge color="warning">Badge</Badge>
				<Badge variant="faded" color="warning">
					Badge
				</Badge>
				<Badge variant="outline" color="warning">
					Badge
				</Badge>
			</View>
		</Example.Item>
	</Example>
);

export const sizes = () => (
	<Example>
		<Example.Item title="size: small, not rounded and rounded">
			<View gap={3} direction="row">
				<Badge size="small">Badge</Badge>
				<Badge rounded size="small">
					Badge
				</Badge>
			</View>
		</Example.Item>
		<Example.Item title="size: medium, not rounded and rounded">
			<View gap={3} direction="row">
				<Badge>Badge</Badge>
				<Badge rounded>Badge</Badge>
			</View>
		</Example.Item>
		<Example.Item title="size: large, not rounded and rounded">
			<View gap={3} direction="row">
				<Badge size="large">Badge</Badge>
				<Badge rounded size="large">
					Badge
				</Badge>
			</View>
		</Example.Item>
	</Example>
);

export const icon = () => (
	<Example>
		<Example.Item title="size: small, not rounded and rounded">
			<View gap={3} direction="row">
				<Badge icon={IconCheckmark} endIcon={IconChevronRight} size="small">
					Badge
				</Badge>
			</View>
		</Example.Item>
		<Example.Item title="size: medium, not rounded and rounded">
			<View gap={3} direction="row">
				<Badge icon={IconCheckmark} endIcon={IconChevronRight}>
					Badge
				</Badge>
			</View>
		</Example.Item>
		<Example.Item title="size: large, not rounded and rounded">
			<View gap={3} direction="row">
				<Badge size="large" icon={IconCheckmark} endIcon={IconChevronRight}>
					Badge
				</Badge>
			</View>
		</Example.Item>
	</Example>
);

export const actionable = () => (
	<Example>
		<Example.Item title="dismissible, close button is actionable">
			<Badge onDismiss={() => console.log("heyeye")} dismissAriaLabel="Dismiss">
				Badge
			</Badge>
		</Example.Item>
		<Example.Item title="dismissible + onClick, whole badge is actionable">
			<Badge onDismiss={() => console.log("heyeye")} dismissAriaLabel="Dismiss" onClick={() => {}}>
				Badge
			</Badge>
		</Example.Item>
	</Example>
);

export const rounded = () => (
	<Example>
		<Example.Item title="rounded, all variants">
			<View direction="row" gap={3}>
				<Badge rounded>Badge</Badge>
				<Badge rounded variant="faded">
					Badge
				</Badge>
				<Badge rounded variant="outline">
					Badge
				</Badge>
			</View>
		</Example.Item>
		<Example.Item
			title={["rounded, all sizes, color: critical", "one character, renders as circle"]}
		>
			<View direction="row" gap={3}>
				<Badge rounded color="critical" size="small">
					2
				</Badge>
				<Badge rounded color="critical">
					2
				</Badge>
				<Badge rounded color="critical" size="large">
					2
				</Badge>
			</View>
		</Example.Item>
	</Example>
);

export const empty = () => (
	<Example>
		<Example.Item title="empty, not rounded, all sizes, color: critical">
			<View direction="row" gap={3}>
				<Badge size="small" color="critical" />
				<Badge color="critical" />
				<Badge size="large" color="critical" />
			</View>
		</Example.Item>
		<Example.Item title="empty, rounded, all sizes, color: critical">
			<View direction="row" gap={3}>
				<Badge rounded size="small" color="critical" />
				<Badge rounded color="critical" />
				<Badge rounded size="large" color="critical" />
			</View>
		</Example.Item>
	</Example>
);

export const container = () => {
	const [hidden, setHidden] = React.useState(false);

	return (
		<Example title={<Button onClick={() => setHidden(!hidden)}>Toggle badges</Button>}>
			<Example.Item title="position: top-end">
				<Badge.Container>
					<Badge color="primary" hidden={hidden}>
						5
					</Badge>
					<Avatar initials="A" squared />
				</Badge.Container>
			</Example.Item>

			<Example.Item title="position: bottom-end">
				<Badge.Container position="bottom-end">
					<Badge color="primary" hidden={hidden}>
						5
					</Badge>
					<Avatar initials="A" squared />
				</Badge.Container>
			</Example.Item>

			<Example.Item title="position: top-end, rounded, multiple digits">
				<Badge.Container>
					<Badge size="small" color="primary" rounded hidden={hidden}>
						123
					</Badge>
					<Avatar initials="A" squared />
				</Badge.Container>
			</Example.Item>

			<Example.Item title="position: top-end, rounded, empty">
				<Badge.Container>
					<Badge color="primary" rounded hidden={hidden} />
					<Avatar initials="A" squared />
				</Badge.Container>
			</Example.Item>

			<Example.Item title={["position: top-end, overlap", "should cover the circular avatar"]}>
				<Badge.Container overlap>
					<Badge size="small" color="primary" rounded hidden={hidden}>
						2
					</Badge>
					<Avatar initials="A" />
				</Badge.Container>
			</Example.Item>

			<Example.Item title={["position: bottom-end, overlap", "should cover the circular avatar"]}>
				<Badge.Container overlap position="bottom-end">
					<Badge size="small" color="primary" rounded hidden={hidden}>
						2
					</Badge>
					<Avatar initials="A" />
				</Badge.Container>
			</Example.Item>

			<Example.Item title={["position: top-end, overlap", "should cover the icon"]}>
				<Badge.Container overlap position="top-end">
					<Badge size="small" color="primary" rounded hidden={hidden} />
					<Icon svg={IconCheckmark} size={5} />
				</Badge.Container>
			</Example.Item>
		</Example>
	);
};
