import React from "react";

import Alert from "components/Alert";
import Avatar from "components/Avatar";
import Badge from "components/Badge";
import Button from "components/Button";
import Card from "components/Card";
import Checkbox from "components/Checkbox";
import CheckboxGroup from "components/CheckboxGroup";
import Divider from "components/Divider";
import DropdownMenu from "components/DropdownMenu";
import FormControl from "components/FormControl";
import Grid from "components/Grid";
import Image from "components/Image";
import Link from "components/Link";
import Switch from "components/Switch";
import Table from "components/Table";
import Text from "components/Text";
import TextField from "components/TextField";
import View, { ViewProps } from "components/View";
import useToggle from "hooks/useToggle";
import IconChevronDown from "icons/ChevronDown";
import IconChevronRight from "icons/ChevronRight";
import IconZap from "icons/Zap";

const Color = (props: Pick<ViewProps, "backgroundColor" | "borderColor" | "children">) => {
	return (
		<View
			padding={2}
			height={25}
			gap={2}
			direction="row"
			borderRadius="medium"
			backgroundColor={props.backgroundColor}
			borderColor={props.borderColor}
			attributes={{
				style: {
					borderWidth: 4,
				},
			}}
		>
			{props.children}
		</View>
	);
};

const NeutralContrastTest = () => (
	<View gap={1}>
		<View direction="row" gap={1}>
			<View height={6} width={6} backgroundColor="neutral" borderRadius="small" />
			<View height={6} width={6} backgroundColor="neutral-faded" borderRadius="small" />
		</View>

		<View direction="row" gap={1}>
			<View height={6} width={6} backgroundColor="disabled" borderRadius="small" />
			<View
				height={6}
				width={6}
				backgroundColor="disabled-faded"
				borderRadius="small"
				borderColor="disabled"
			/>
		</View>
	</View>
);

const Palette = () => {
	return (
		<View gap={2}>
			<View direction="row" gap={2}>
				<View gap={2} grow>
					<Color backgroundColor="neutral" borderColor="neutral">
						<Text weight="medium">Aa</Text>
					</Color>
					<Color backgroundColor="neutral-faded" borderColor="neutral-faded">
						<Text weight="medium">Aa</Text>
					</Color>
				</View>

				<View gap={2} grow>
					<Color backgroundColor="primary" borderColor="primary">
						<Text weight="medium">Aa</Text>
					</Color>
					<Color backgroundColor="primary-faded" borderColor="primary-faded">
						<Text weight="medium" color="primary">
							Aa
						</Text>
						<Text weight="medium">Aa</Text>
					</Color>
				</View>

				<View gap={2} grow>
					<Color backgroundColor="critical" borderColor="critical">
						<Text weight="medium">Aa</Text>
					</Color>
					<Color backgroundColor="critical-faded" borderColor="critical-faded">
						<Text weight="medium" color="critical">
							Aa
						</Text>
						<Text weight="medium">Aa</Text>
					</Color>
				</View>

				<View gap={2} grow>
					<Color backgroundColor="positive" borderColor="positive">
						<Text weight="medium">Aa</Text>
					</Color>
					<Color backgroundColor="positive-faded" borderColor="positive-faded">
						<Text weight="medium" color="positive">
							Aa
						</Text>
						<Text weight="medium">Aa</Text>
					</Color>
				</View>

				<View gap={2} grow>
					<Color backgroundColor="warning" borderColor="warning">
						<Text weight="medium">Aa</Text>
					</Color>
					<Color backgroundColor="warning-faded" borderColor="warning-faded">
						<Text weight="medium" color="warning">
							Aa
						</Text>
						<Text weight="medium">Aa</Text>
					</Color>
				</View>

				<View gap={2} grow>
					<Color backgroundColor="disabled" borderColor="disabled">
						<Text weight="medium" color="disabled">
							Aa
						</Text>
					</Color>
					<Color backgroundColor="disabled-faded" borderColor="disabled">
						<Text weight="medium" color="disabled">
							Aa
						</Text>
					</Color>
				</View>
			</View>
			<Divider />
			<View gap={2} direction="row">
				<View.Item grow>
					<Color backgroundColor="elevation-base" borderColor="neutral-faded">
						<View gap={2}>
							<Text weight="medium" variant="caption-1">
								Base
							</Text>

							<NeutralContrastTest />
						</View>
					</Color>
				</View.Item>
				<View.Item grow>
					<Color backgroundColor="elevation-raised" borderColor="neutral-faded">
						<View gap={2}>
							<Text weight="medium" variant="caption-1">
								Raised
							</Text>

							<NeutralContrastTest />
						</View>
					</Color>
				</View.Item>
				<View.Item grow>
					<Color backgroundColor="elevation-overlay" borderColor="neutral-faded">
						<View gap={2}>
							<Text weight="medium" variant="caption-1">
								Overlay
							</Text>

							<NeutralContrastTest />
						</View>
					</Color>
				</View.Item>
				<View.Item grow>
					<Color backgroundColor="page" borderColor="neutral-faded">
						<View gap={2}>
							<Text weight="medium" variant="caption-1">
								Page
							</Text>

							<NeutralContrastTest />
						</View>
					</Color>
				</View.Item>
				<View.Item grow>
					<Color backgroundColor="page-faded" borderColor="neutral-faded">
						<View gap={2}>
							<Text weight="medium" variant="caption-1">
								Page faded
							</Text>

							<NeutralContrastTest />
						</View>
					</Color>
				</View.Item>
				<View.Item grow>
					<Color backgroundColor="neutral-faded" borderColor="neutral-faded">
						<View gap={2}>
							<Text weight="medium" variant="caption-1">
								Neutral faded
							</Text>

							<NeutralContrastTest />
						</View>
					</Color>
				</View.Item>
			</View>
		</View>
	);
};

const ExampleAnalytics = () => (
	<Card>
		<View gap={1}>
			<View gap={4} direction="row" align="center">
				<View gap={1} direction="row" align="center" grow>
					<Text variant="body-2" weight="bold">
						Audience
					</Text>
				</View>
				<Button.Aligner>
					<Button variant="ghost" color="primary" size="small" endIcon={IconChevronRight}>
						View
					</Button>
				</Button.Aligner>
			</View>
			<Text variant="featured-2" color="positive">
				+76.28%
			</Text>
			<View gap={2}>
				<View gap={3} direction="row" align="baseline">
					<View.Item grow>
						<Text color="neutral-faded">Signed up</Text>
					</View.Item>
					<Text color="neutral-faded">320 users</Text>
					<Text color="primary" weight="medium">
						81%
					</Text>
				</View>
				<View gap={3} direction="row" align="baseline">
					<View.Item grow>
						<Text color="neutral-faded">Onboarded</Text>
					</View.Item>
					<Text color="neutral-faded">182 users</Text>
					<Text color="warning" weight="medium">
						62%
					</Text>
				</View>
				<View gap={3} direction="row" align="baseline">
					<View.Item grow>
						<Text color="neutral-faded">Purchased</Text>
					</View.Item>
					<Text color="neutral-faded">120 users</Text>
					<Text color="critical" weight="medium">
						47%
					</Text>
				</View>
			</View>
		</View>
	</Card>
);

const ExampleSocial = () => {
	return (
		<Card height="100%">
			<View gap={3}>
				<View direction="row" gap={2} align="center">
					<Avatar size={10} color="neutral" />
					<View.Item grow>
						<Text weight="medium">Esther Naomi</Text>
						<Text color="neutral-faded" variant="caption-1">
							31 Jan 2037, 10:28
						</Text>
					</View.Item>
					<Badge variant="faded" color="warning">
						Archived
					</Badge>
				</View>
				<Text color="neutral-faded">
					I have been to 27 countries and only 5 of them call this social network X, while others
					named it Twitter for some reason. Why is this happening?!
				</Text>
				<View direction="row" gap={2}>
					<View grow aspectRatio={1}>
						<Image src="" borderRadius="medium" fallback />
					</View>
					<View grow aspectRatio={1}>
						<Image src="" borderRadius="medium" fallback />
					</View>
					<View grow aspectRatio={1}>
						<Image src="" borderRadius="medium" fallback />
					</View>
				</View>
			</View>
		</Card>
	);
};

const ExampleLogin = () => {
	const passwordVisibility = useToggle();

	return (
		<Card height="100%">
			<View gap={3}>
				<Text variant="featured-3">Sign in to your account</Text>

				<Button variant="outline" fullWidth>
					Sign in with Figma
				</Button>

				<View gap={3} direction="row" align="center">
					<View.Item grow>
						<Divider />
					</View.Item>
					<Text>or</Text>
					<View.Item grow>
						<Divider />
					</View.Item>
				</View>

				<FormControl>
					<FormControl.Label>Email</FormControl.Label>
					<TextField name="email" placeholder="hello@reshaped.so" />
				</FormControl>
				<FormControl>
					<View direction="row" align="baseline">
						<View.Item grow>
							<FormControl.Label>Password</FormControl.Label>
						</View.Item>
						<Text variant="caption-1" weight="medium">
							<Link variant="plain" onClick={() => {}}>
								Forgot password?
							</Link>
						</Text>
					</View>
					<TextField
						name="password"
						inputAttributes={{ type: passwordVisibility.active ? "text" : "password" }}
						// endSlot={
						// 	<Button
						// 		variant="ghost"
						// 		size="small"
						// 		icon={passwordVisibility.active ? IconEyeOff : IconEye}
						// 		onClick={passwordVisibility.toggle}
						// 	/>
						// }
					/>
				</FormControl>
				<Button color="primary">Sign in</Button>
			</View>
		</Card>
	);
};

const ExampleSettings = () => (
	<Card height="100%">
		<View gap={6} height="100%">
			<Text variant="body-1" weight="medium">
				Notification settings
			</Text>

			<View gap={3} grow>
				<View as="label" direction="row" align="center" gap={2}>
					<View.Item grow>
						<Text weight="medium">Enable email notifications</Text>
					</View.Item>
					<Switch name="email" />
				</View>
				<View as="label" direction="row" align="center" gap={2}>
					<View.Item grow>
						<Text weight="medium">Enable Slack notifications</Text>
					</View.Item>
					<Switch name="email" />
				</View>
				<View as="label" direction="row" align="center" gap={2}>
					<View.Item grow>
						<Text weight="medium">Enable paper mail notifications</Text>
					</View.Item>
					<Switch name="email" defaultChecked />
				</View>

				<Text variant="caption-1" color="neutral-faded">
					Enable all notifications to unsubscribe from our marketing and promotional materials.
				</Text>

				<View grow justify="end">
					<Button color="primary" variant="faded">
						Save settings
					</Button>
				</View>
			</View>
		</View>
	</Card>
);

const ExampleAlert = () => (
	<Alert
		icon={IconZap}
		color="primary"
		title={
			<View direction="row" gap={2} align="center">
				Auto-approve code reviews with AI
				<Badge color="primary" size="small">
					New
				</Badge>
			</View>
		}
		actionsSlot={[
			<Button key={1}>Keep using</Button>,
			<Button key={2} variant="ghost" color="critical">
				Opt-out
			</Button>,
		]}
	>
		Try our new GPT-powered code assistant features and never worry about reviewing other
		developer's pull requests again. Free for the first 5 pull requests.
	</Alert>
);

const ExampleCheckboxCard = () => {
	const [value, setValue] = React.useState(["hobby"]);

	return (
		<CheckboxGroup
			name="1"
			value={value}
			onChange={(args) => {
				setValue(args.value);
			}}
		>
			<View gap={3}>
				<Card as="label" selected={value.includes("pro")}>
					<View direction="row" gap={2} align="center">
						<Checkbox value="pro">Figma library</Checkbox>
					</View>
				</Card>
				<Card as="label" selected={value.includes("hobby")}>
					<View direction="row" gap={2} align="center">
						<View.Item grow>
							<Checkbox value="hobby">React library</Checkbox>
						</View.Item>
						<Badge color="positive">Free</Badge>
					</View>
				</Card>
			</View>
		</CheckboxGroup>
	);
};

const ExampleTable = () => {
	const rows = [
		{
			name: "File downloaded",
			id: "rshpd_23jb237dh",
			time: "Jul 4, 12:36",
		},
		{
			name: "User registered",
			id: "rshpd_27d223jfh",
			time: "Jul 4, 12:36",
		},
		{
			name: "New version released",
			id: "rshpd_sjdniu223nj",
			time: "Jul 4, 12:35",
		},
	];
	const [value, setValue] = React.useState<string[]>([rows[1].id]);
	const allSelected = value.length === rows.length;

	return (
		<Card padding={0}>
			<Table>
				<Table.Row>
					<Table.Heading width="auto">
						<Checkbox
							inputAttributes={{ "aria-label": "Select all" }}
							name="all"
							checked={allSelected}
							indeterminate={!!value.length && value.length < rows.length}
							onChange={() => {
								setValue(allSelected ? [] : rows.map((row) => row.id));
							}}
						/>
					</Table.Heading>
					<Table.Heading minWidth="180px">Event type</Table.Heading>
					<Table.Heading>Event ID</Table.Heading>
					<Table.Heading align="end" minWidth="120px">
						Triggered at
					</Table.Heading>
					<Table.Heading />
				</Table.Row>
				{rows.map((row) => (
					<Table.Row key={row.id} highlighted={value.includes(row.id)}>
						<Table.Cell>
							<Checkbox
								name="hey"
								value={row.id}
								inputAttributes={{ "aria-label": "Select the row" }}
								checked={value.includes(row.id)}
								onChange={(args) => {
									setValue((prev) => {
										if (!args.value) return prev;
										if (args.checked) return [...prev, args.value];
										return prev.filter((item) => item !== args.value);
									});
								}}
							/>
						</Table.Cell>
						<Table.Cell>{row.name}</Table.Cell>
						<Table.Cell>{row.id}</Table.Cell>
						<Table.Cell align="end">{row.time}</Table.Cell>
						<Table.Cell width="auto">
							<DropdownMenu position="bottom-end">
								<DropdownMenu.Trigger>
									{(attributes) => (
										<Button.Aligner>
											<Button
												attributes={attributes}
												icon={IconChevronDown}
												variant="ghost"
												size="small"
											/>
										</Button.Aligner>
									)}
								</DropdownMenu.Trigger>
								<DropdownMenu.Content>
									<DropdownMenu.Section>
										<DropdownMenu.Item>Trigger event</DropdownMenu.Item>
										<DropdownMenu.Item>Log details</DropdownMenu.Item>
									</DropdownMenu.Section>
									<DropdownMenu.Section>
										<DropdownMenu.Item color="critical">Remote entry</DropdownMenu.Item>
									</DropdownMenu.Section>
								</DropdownMenu.Content>
							</DropdownMenu>
						</Table.Cell>
					</Table.Row>
				))}
			</Table>
		</Card>
	);
};

const ThemePlayground = () => {
	return (
		<Grid gap={4} columns={12}>
			<Grid.Item colSpan={12}>
				<Palette />
			</Grid.Item>
			<Grid.Item colSpan={6}>
				<View gap={4}>
					<ExampleAnalytics />
					<ExampleLogin />
					<ExampleAlert />
				</View>
			</Grid.Item>
			<Grid.Item colSpan={6}>
				<View gap={4}>
					<ExampleSocial />
					<ExampleSettings />
					<ExampleCheckboxCard />
				</View>
			</Grid.Item>
			<Grid.Item colSpan={12}>
				<ExampleTable />
			</Grid.Item>
			<Grid.Item colSpan={12}>
				<View gap={2} padding={4} backgroundColor="page-faded" borderRadius="medium">
					<View direction="row" gap={2}>
						<Button color="neutral" onClick={() => {}}>
							Neutral
						</Button>
						<Button color="primary" onClick={() => {}}>
							Primary
						</Button>
						<Button color="critical" onClick={() => {}}>
							Critical
						</Button>
						<Button color="positive" onClick={() => {}}>
							Positive
						</Button>
						<Button color="primary" disabled onClick={() => {}}>
							Disabled
						</Button>
						<Badge color="warning">Warning</Badge>
					</View>
					<View direction="row" gap={2}>
						<Button color="neutral" variant="faded" onClick={() => {}}>
							Neutral
						</Button>
						<Button color="primary" variant="faded" onClick={() => {}}>
							Primary
						</Button>
						<Button color="critical" variant="faded" onClick={() => {}}>
							Critical
						</Button>
						<Button color="positive" variant="faded" onClick={() => {}}>
							Positive
						</Button>
						<Button color="primary" variant="faded" disabled onClick={() => {}}>
							Disabled
						</Button>
						<Badge color="warning" variant="faded">
							Warning
						</Badge>
					</View>
					<View direction="row" gap={2}>
						<Button color="neutral" variant="outline" onClick={() => {}}>
							Neutral
						</Button>
						<Button color="primary" variant="outline" onClick={() => {}}>
							Primary
						</Button>
						<Button color="critical" variant="outline" onClick={() => {}}>
							Critical
						</Button>
						<Button color="positive" variant="outline" onClick={() => {}}>
							Positive
						</Button>
						<Button color="primary" variant="outline" disabled onClick={() => {}}>
							Disabled
						</Button>
						<Badge color="warning" variant="outline">
							Warning
						</Badge>
					</View>
					{/* <View direction="row" gap={4}>
						<View
							borderColor="primary"
							padding={2}
							borderRadius="small"
							attributes={{ style: { borderWidth: 2 } }}
						>
							<Text color="primary" weight="medium">
								Primary
							</Text>
						</View>
						<View
							borderColor="warning"
							padding={2}
							borderRadius="small"
							attributes={{ style: { borderWidth: 2 } }}
						>
							<Text color="warning" weight="medium">
								Warning
							</Text>
						</View>
					</View> */}
				</View>
			</Grid.Item>
		</Grid>
	);
};

export default ThemePlayground;
