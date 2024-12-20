import { Meta, StoryObj } from "@storybook/react";

import { Example, Placeholder } from "utilities/storybook";
import Button from "components/Button";
import View from "components/View";
import Image from "components/Image";
import Avatar from "components/Avatar";
import Hotkey from "components/Hotkey";
import IconZap from "icons/Zap";

export default {
	title: "Components/Button",
	component: Button,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/components/button",
		},
	},
};

export const variantAndColor = () => (
	<View gap={4}>
		<View gap={4} direction="row">
			<Button onClick={() => {}}>Button</Button>
			<Button onClick={() => {}} color="primary">
				Button
			</Button>
			<Button onClick={() => {}} color="critical">
				Button
			</Button>
			<Button onClick={() => {}} color="positive">
				Button
			</Button>
		</View>

		<View direction="row" gap={4}>
			<Button onClick={() => {}} variant="faded">
				Button
			</Button>
			<Button onClick={() => {}} color="primary" variant="faded">
				Button
			</Button>
			<Button onClick={() => {}} color="critical" variant="faded">
				Button
			</Button>
			<Button onClick={() => {}} color="positive" variant="faded">
				Button
			</Button>
			<div style={{ color: "#029CFD" }}>
				<Button onClick={() => {}} color="inherit" variant="faded">
					Inherit
				</Button>
			</div>
		</View>

		<View direction="row" gap={4}>
			<Button onClick={() => {}} variant="outline">
				Button
			</Button>
			<Button onClick={() => {}} color="primary" variant="outline">
				Button
			</Button>
			<Button onClick={() => {}} color="critical" variant="outline">
				Button
			</Button>
			<Button onClick={() => {}} color="positive" variant="outline">
				Button
			</Button>

			<div style={{ color: "#029CFD" }}>
				<Button onClick={() => {}} color="inherit" variant="outline">
					Inherit
				</Button>
			</div>
		</View>

		<View direction="row" gap={4}>
			<Button onClick={() => {}} variant="ghost">
				Button
			</Button>
			<Button onClick={() => {}} color="primary" variant="ghost">
				Button
			</Button>
			<Button onClick={() => {}} color="critical" variant="ghost">
				Button
			</Button>
			<Button onClick={() => {}} color="positive" variant="ghost">
				Button
			</Button>
			<div style={{ color: "#029CFD" }}>
				<Button onClick={() => {}} color="inherit" variant="ghost">
					Inherit
				</Button>
			</div>
		</View>

		<View.Item gapBefore={8}>
			<View backgroundColor="primary" borderRadius="medium" padding={4} direction="row" gap={4}>
				<Button onClick={() => {}} color="media">
					Button
				</Button>

				<Button onClick={() => {}} color="media" variant="faded">
					Button
				</Button>
			</View>
		</View.Item>
	</View>
);

export const icon = () => (
	<View direction="row" gap={4}>
		<Button onClick={() => {}} icon={IconZap}>
			Button
		</Button>
		<Button onClick={() => {}} endIcon={IconZap}>
			Button
		</Button>

		<Button onClick={() => {}} icon={IconZap} endIcon={IconZap}>
			Button
		</Button>
		<Button onClick={() => {}} icon={IconZap} attributes={{ "aria-label": "Action" }} />
	</View>
);

export const size = () => (
	<View gap={4}>
		<View gap={4} direction="row">
			<Button size="small" icon={IconZap}>
				Button
			</Button>
			<Button size="small" variant="outline" icon={IconZap}>
				Button
			</Button>
			<Button size="small" variant="ghost" icon={IconZap}>
				Button
			</Button>
		</View>
		<View gap={4} direction="row">
			<Button icon={IconZap}>Button</Button>
			<Button variant="outline" icon={IconZap}>
				Button
			</Button>
			<Button variant="ghost" icon={IconZap}>
				Button
			</Button>
		</View>
		<View gap={4} direction="row">
			<Button size="large" icon={IconZap}>
				Button
			</Button>
			<Button size="large" variant="outline" icon={IconZap}>
				Button
			</Button>
			<Button size="large" variant="ghost" icon={IconZap}>
				Button
			</Button>
		</View>
		<View gap={4} direction="row">
			<Button size="xlarge" icon={IconZap}>
				Button
			</Button>
			<Button size="xlarge" variant="outline" icon={IconZap}>
				Button
			</Button>
			<Button size="xlarge" variant="ghost" icon={IconZap}>
				Button
			</Button>
		</View>
		<View>
			<Button size={{ s: "large", m: "medium" }} icon={IconZap}>
				Responsive
			</Button>
		</View>
	</View>
);

export const elevated = () => (
	<View gap={4}>
		<View direction="row" gap={4}>
			<Button elevated onClick={() => {}}>
				Button
			</Button>
			<Button elevated variant="outline" onClick={() => {}}>
				Button
			</Button>
		</View>
		<View direction="row" gap={4}>
			<Button elevated color="primary">
				Button
			</Button>
			<Button elevated variant="outline" color="primary">
				Button
			</Button>
		</View>
		<View backgroundColor="primary" padding={4} borderRadius="medium">
			<Button color="media" elevated>
				Button
			</Button>
		</View>
	</View>
);
