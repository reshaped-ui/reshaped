import { Example } from "utilities/storybook";
import Alert from "components/Alert";
import Link from "components/Link";
import IconZap from "icons/Zap";

export default {
	title: "Components/Alert",
	component: Alert,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/components/alert",
		},
	},
};

export const color = () => (
	<Example>
		<Example.Item title="color: neutral">
			<Alert
				title="Alert title goes here"
				icon={IconZap}
				actionsSlot={
					<>
						<Link variant="plain">View now</Link>
						<Link variant="plain">Dismiss</Link>
					</>
				}
			>
				Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
				been the industry's standard
			</Alert>
		</Example.Item>

		<Example.Item title="color: primary">
			<Alert
				color="primary"
				title="Alert title goes here"
				icon={IconZap}
				actionsSlot={
					<>
						<Link variant="plain">View now</Link>
						<Link variant="plain">Dismiss</Link>
					</>
				}
			>
				Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
				been the industry's standard
			</Alert>
		</Example.Item>

		<Example.Item title="color: critical">
			<Alert
				color="critical"
				title="Alert title goes here"
				icon={IconZap}
				actionsSlot={
					<>
						<Link variant="plain" color="critical">
							View now
						</Link>
						<Link variant="plain" color="critical">
							Dismiss
						</Link>
					</>
				}
			>
				Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
				been the industry's standard
			</Alert>
		</Example.Item>

		<Example.Item title="color: positive">
			<Alert
				color="positive"
				title="Alert title goes here"
				icon={IconZap}
				actionsSlot={
					<>
						<Link variant="plain" color="positive">
							View now
						</Link>
						<Link variant="plain" color="positive">
							Dismiss
						</Link>
					</>
				}
			>
				Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
				been the industry's standard
			</Alert>
		</Example.Item>

		<Example.Item title="color: warning">
			<Alert
				color="warning"
				title="Alert title goes here"
				icon={IconZap}
				actionsSlot={
					<>
						<Link variant="plain">View now</Link>
						<Link variant="plain">Dismiss</Link>
					</>
				}
			>
				Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
				been the industry's standard
			</Alert>
		</Example.Item>
	</Example>
);

export const inline = () => (
	<Example>
		<Example.Item title="inline: true">
			<Alert
				inline
				title="Alert title goes here"
				icon={IconZap}
				actionsSlot={
					<>
						<Link variant="plain">View now</Link>
						<Link variant="plain">Dismiss</Link>
					</>
				}
			>
				Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
				been the industry's standard
			</Alert>
		</Example.Item>
	</Example>
);

export const bleed = () => (
	<Example>
		<Example.Item title="bleed: 4">
			<Alert bleed={4} icon={IconZap}>
				Content
			</Alert>
		</Example.Item>
		<Example.Item title={["responsive bleed", "[s] 4", "[m+] 0"]}>
			<Alert bleed={{ s: 4, m: 0 }} icon={IconZap}>
				Content
			</Alert>
		</Example.Item>
	</Example>
);
