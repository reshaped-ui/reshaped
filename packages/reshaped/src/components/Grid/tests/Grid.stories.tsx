import { StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

import Grid from "components/Grid";
import View from "components/View";
import { Example } from "utilities/storybook";

export default {
	title: "Utility components/Grid",
	component: Grid,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/utilities/grid",
		},
	},
};

export const base = {
	name: "gap, columnGap, rowGap, align, justify, maxWidth, width, height",
	render: () => (
		<Example>
			<Example.Item title="gap: 2">
				<Grid gap={2} columns={2}>
					{[1, 2].map((i) => (
						<View backgroundColor="neutral-faded" borderRadius="medium" padding={4} key={i}>
							{i}
						</View>
					))}
				</Grid>
			</Example.Item>
			<Example.Item title="columnGap: 2, rowGap: 4">
				<Grid columnGap={2} rowGap={4} columns={2}>
					{[1, 2, 3, 4].map((i) => (
						<View backgroundColor="neutral-faded" borderRadius="medium" padding={4} key={i}>
							{i}
						</View>
					))}
				</Grid>
			</Example.Item>
			<Example.Item title="align: center">
				<Grid gap={2} columns={2} align="center">
					<View backgroundColor="neutral-faded" borderRadius="medium" padding={4}>
						1
					</View>
					<View backgroundColor="neutral-faded" borderRadius="medium" padding={8}>
						2
					</View>
				</Grid>
			</Example.Item>
			<Example.Item title="justify: center">
				<Grid gap={2} columns="200px 200px" justify="center">
					<View backgroundColor="neutral-faded" borderRadius="medium" padding={4}>
						1
					</View>
					<View backgroundColor="neutral-faded" borderRadius="medium" padding={4}>
						2
					</View>
				</Grid>
			</Example.Item>

			<Example.Item title="maxWidth: 400px">
				<Grid gap={2} columns="200px 200px" maxWidth="400px">
					<View backgroundColor="neutral-faded" borderRadius="medium" padding={4}>
						1
					</View>
					<View backgroundColor="neutral-faded" borderRadius="medium" padding={4}>
						2
					</View>
				</Grid>
			</Example.Item>

			<Example.Item title="width: 400px, height: 200px">
				<Grid gap={2} columns={2} width="400px" height="200px">
					<View backgroundColor="neutral-faded" borderRadius="medium" padding={4}>
						1
					</View>
					<View backgroundColor="neutral-faded" borderRadius="medium" padding={4}>
						2
					</View>
				</Grid>
			</Example.Item>
		</Example>
	),
};

export const layout = {
	name: "rows, columns",
	render: () => (
		<Example>
			<Example.Item title="simple: 2 rows, 3 columns">
				<Grid gap={4} columns={3} rows={2}>
					{[1, 2, 3, 4, 5].map((i) => (
						<View backgroundColor="neutral-faded" borderRadius="medium" padding={4} key={i}>
							{i}
						</View>
					))}
				</Grid>
			</Example.Item>
			<Example.Item title="columns template, 1fr 2fr 1fr">
				<Grid gap={4} columns="1fr 2fr 1fr" rows={2}>
					{[1, 2, 3, 4, 5].map((i) => (
						<View backgroundColor="neutral-faded" borderRadius="medium" padding={4} key={i}>
							{i}
						</View>
					))}
				</Grid>
			</Example.Item>
			<Example.Item title="rows template, 1fr 2fr">
				<Grid gap={4} columns={3} rows="1fr 2fr">
					{[1, 2, 3, 4, 5].map((i) => (
						<View backgroundColor="neutral-faded" borderRadius="medium" padding={4} key={i}>
							{i}
						</View>
					))}
				</Grid>
			</Example.Item>
			<Example.Item title="responsive">
				<Grid gap={4} columns={{ s: 3, m: "1fr 2fr 1fr" }} rows={{ s: 2, m: "1fr 2fr" }}>
					{[1, 2, 3, 4, 5].map((i) => (
						<View backgroundColor="neutral-faded" borderRadius="medium" padding={4} key={i}>
							{i}
						</View>
					))}
				</Grid>
			</Example.Item>
		</Example>
	),
};

export const itemLayout = {
	name: "colStart, colEnd, rowStart, rowEnd",
	render: () => (
		<Example>
			<Example.Item title="column, start 1, end 3">
				<Grid gap={4} columns={3} rows={2}>
					<Grid.Item colStart={1} colEnd={3}>
						<View backgroundColor="neutral-faded" borderRadius="medium" padding={4} height="100%">
							1
						</View>
					</Grid.Item>
					{[2, 3, 4, 5].map((i) => (
						<View backgroundColor="neutral-faded" borderRadius="medium" padding={4} key={i}>
							{i}
						</View>
					))}
				</Grid>
			</Example.Item>
			<Example.Item title="column, start 1, span 2">
				<Grid gap={4} columns={3} rows={2}>
					<Grid.Item colStart={1} colSpan={2}>
						<View backgroundColor="neutral-faded" borderRadius="medium" padding={4} height="100%">
							1
						</View>
					</Grid.Item>
					{[2, 3, 4, 5].map((i) => (
						<View backgroundColor="neutral-faded" borderRadius="medium" padding={4} key={i}>
							{i}
						</View>
					))}
				</Grid>
			</Example.Item>

			<Example.Item title="row, start 1, end 3">
				<Grid gap={4} columns={3} rows={2}>
					<Grid.Item rowStart={1} rowEnd={3}>
						<View backgroundColor="neutral-faded" borderRadius="medium" padding={4} height="100%">
							1
						</View>
					</Grid.Item>
					{[2, 3, 4, 5].map((i) => (
						<View backgroundColor="neutral-faded" borderRadius="medium" padding={4} key={i}>
							{i}
						</View>
					))}
				</Grid>
			</Example.Item>

			<Example.Item title="row, start 1, span 2">
				<Grid gap={4} columns={3} rows={2}>
					<Grid.Item rowStart={1} rowSpan={2}>
						<View backgroundColor="neutral-faded" borderRadius="medium" padding={4} height="100%">
							1
						</View>
					</Grid.Item>
					{[2, 3, 4, 5].map((i) => (
						<View backgroundColor="neutral-faded" borderRadius="medium" padding={4} key={i}>
							{i}
						</View>
					))}
				</Grid>
			</Example.Item>

			<Example.Item title="responsive">
				<Grid gap={4} columns={3} rows={2}>
					<Grid.Item rowStart={1} rowSpan={{ s: 1, m: 2 }} colStart={1} colSpan={{ s: 1, m: 2 }}>
						<View backgroundColor="neutral-faded" borderRadius="medium" padding={4} height="100%">
							1
						</View>
					</Grid.Item>
					{[2, 3, 4, 5].map((i) => (
						<View backgroundColor="neutral-faded" borderRadius="medium" padding={4} key={i}>
							{i}
						</View>
					))}
				</Grid>
			</Example.Item>
		</Example>
	),
};

export const areas = {
	name: "areas",
	render: () => (
		<Example>
			<Example.Item title="simple: 2 rows, 3 columns">
				<Grid gap={4} rows={2} areas={["a .", "a b"]}>
					{["a", "b"].map((area) => (
						<Grid.Item area={area} key={area}>
							<View backgroundColor="neutral-faded" borderRadius="medium" padding={4} height="100%">
								{area}
							</View>
						</Grid.Item>
					))}
				</Grid>
			</Example.Item>
		</Example>
	),
};

export const auto = {
	name: "autoFlow, autoColumns, autoRows",
	render: () => (
		<Example>
			<Example.Item title="auto flow: column">
				<Grid gap={4} autoFlow="column" rows={2} columns={2}>
					{[1, 2, 3].map((i) => (
						<View backgroundColor="neutral-faded" borderRadius="medium" padding={4} key={i}>
							{i}
						</View>
					))}
				</Grid>
			</Example.Item>
			<Example.Item title="auto rows">
				<Grid gap={4} autoRows="100px" columns={2}>
					{[1, 2, 3].map((i) => (
						<View backgroundColor="neutral-faded" borderRadius="medium" padding={4} key={i}>
							{i}
						</View>
					))}
				</Grid>
			</Example.Item>
			<Example.Item title="auto columns">
				<Grid gap={4} autoColumns="100px" autoFlow="column">
					{[1, 2, 3].map((i) => (
						<View backgroundColor="neutral-faded" borderRadius="medium" padding={4} key={i}>
							{i}
						</View>
					))}
				</Grid>
			</Example.Item>
		</Example>
	),
};

export const as: StoryObj = {
	name: "as",
	render: () => (
		<Grid as="ul">
			<Grid.Item as="li">Content</Grid.Item>
		</Grid>
	),
	play: ({ canvas }) => {
		const ul = canvas.getByRole("list");
		const li = canvas.getByRole("listitem");

		expect(ul).toBeInTheDocument();
		expect(li).toBeInTheDocument();
	},
};

export const className: StoryObj = {
	name: "className, attributes",
	render: () => (
		<div data-testid="root">
			<Grid className="test-class" attributes={{ id: "test-id" }}>
				<Grid.Item className="test-item-class" attributes={{ id: "test-item-id" }}>
					Content
				</Grid.Item>
			</Grid>
		</div>
	),
	play: async ({ canvas }) => {
		const root = canvas.getByTestId("root").firstChild;
		const item = root?.firstChild;

		expect(root).toHaveAttribute("id", "test-id");
		expect(root).toHaveClass("test-class");

		expect(item).toHaveAttribute("id", "test-item-id");
		expect(item).toHaveClass("test-item-class");
	},
};
