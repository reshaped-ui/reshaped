import View from "components/View";
import Image from "components/Image";
import Table from "components/Table";

export default {
	title: "Sandbox",
	chromatic: { disableSnapshot: true },
};

const Preview: React.FC<{ children: React.ReactNode }> = (props) => {
	return (
		<View padding={20} gap={6}>
			<View position="absolute" insetTop={0} insetStart={0}>
				<Image src="./logo.svg" />
			</View>

			{props.children}
		</View>
	);
};

export const preview = () => {
	return (
		<Preview>
			<Table>
				<Table.Head>
					<Table.Row>
						<Table.Heading paddingInline={0} width="120px">
							Column 1
						</Table.Heading>
						<Table.Heading paddingInline={0} width="120px">
							Column 2
						</Table.Heading>
						<Table.Heading paddingInline={0} width="120px">
							Column 3
						</Table.Heading>
						<Table.Heading paddingInline={0} width="120px">
							Column 4
						</Table.Heading>
					</Table.Row>
				</Table.Head>
				<Table.Body>
					<Table.Row>
						<Table.Cell paddingInline={0}>Cell 1</Table.Cell>
						<Table.Cell paddingInline={0}>Cell 2</Table.Cell>
						<Table.Cell paddingInline={0}>Cell 3</Table.Cell>
						<Table.Cell paddingInline={0}>Cell 4</Table.Cell>
					</Table.Row>
					<Table.Row>
						<Table.Cell paddingInline={0}>Cell 1</Table.Cell>
						<Table.Cell paddingInline={0}>Cell 2</Table.Cell>
						<Table.Cell paddingInline={0}>Cell 3</Table.Cell>
						<Table.Cell paddingInline={0}>Cell 4</Table.Cell>
					</Table.Row>
				</Table.Body>
			</Table>
		</Preview>
	);
};
