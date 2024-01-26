import { Example } from "utilities/storybook";
import Modal from "components/Modal";
import View from "components/View";
import Button from "components/Button";
import Dismissible from "components/Dismissible";
import DropdownMenu from "components/DropdownMenu";
import Switch from "components/Switch";
import TextField from "components/TextField";
import useToggle from "hooks/useToggle";
import Radio from "components/Radio";

export default {
	title: "Components/Modal",
	component: Modal,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/components/modal",
		},
	},
};

const Demo = (props: any) => {
	const { active: activeProp, title, subtitle, children, ...modalProps } = props;
	const { active, activate, deactivate } = useToggle(activeProp);

	return (
		<>
			<Button onClick={activate}>Open dialog</Button>
			<Modal {...modalProps} active={active} onClose={deactivate}>
				<View gap={3}>
					{(title || subtitle) && (
						<Dismissible onClose={deactivate} closeAriaLabel="Close modal">
							{title && <Modal.Title>{title}</Modal.Title>}
							{subtitle && <Modal.Subtitle>{subtitle}</Modal.Subtitle>}
						</Dismissible>
					)}
					{children ||
						"Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups."}
					<Button onClick={() => {}}>Hey</Button>
					<TextField name="hey" />
				</View>
			</Modal>
		</>
	);
};

export const position = () => (
	<Example>
		<Example.Item title="position: center">
			<Demo position="center" />
		</Example.Item>
		<Example.Item title="position: bottom">
			<Demo position="bottom" />
		</Example.Item>
		<Example.Item title="position: start">
			<Demo position="start" />
		</Example.Item>
		<Example.Item title="position: end">
			<Demo position="end" />
		</Example.Item>
		<Example.Item title={["responsive position", "[s] bottom", "[m] center", "[l] end"]}>
			<Demo position={{ s: "bottom", m: "center", l: "end" }} />
		</Example.Item>
	</Example>
);

export const size = () => {
	return (
		<Example>
			<Example.Item title="size: default">
				<Demo />
			</Example.Item>
			<Example.Item title="size: 300px">
				<Demo size="300px" />
			</Example.Item>
			<Example.Item
				title={["size: 800px", "should have max width of 100% minus gaps on the sides"]}
			>
				<Demo size="800px" />
			</Example.Item>
			<Example.Item
				title={[
					"responsive size, responsive position",
					"[s] auto",
					"[m+] 600px",
					"bottom position changes height instead of width",
				]}
			>
				<Demo position={{ s: "bottom", m: "center", l: "end" }} size={{ s: "auto", m: "600px" }} />
			</Example.Item>
		</Example>
	);
};

export const padding = () => (
	<Example>
		<Example.Item title="padding: 0">
			<Demo padding={0} />
		</Example.Item>
		<Example.Item title="padding: 6">
			<Demo padding={6} />
		</Example.Item>
		<Example.Item title={["responsive padding", "[s] 2", "[m+]: 6"]}>
			<Demo padding={{ s: 2, m: 6 }} />
		</Example.Item>
	</Example>
);

export const composition = () => (
	<Example>
		<Example.Item title="title, subtitle, dismissible">
			<Demo title="Modal title" subtitle="Modal subtitle" />
		</Example.Item>
	</Example>
);

export const overlay = () => (
	<Example>
		<Example.Item title="transparentOverlay, doesn't lock scroll">
			<Demo transparentOverlay />
			<View height="1000px" />
		</Example.Item>
	</Example>
);

export const edgeCases = () => {
	const { active, activate, deactivate } = useToggle();

	return (
		<Example>
			<Example.Item title="trap focus works with custom children components">
				<Demo title="Modal title">
					<View gap={3} direction="row">
						<Button onClick={() => {}}>Button</Button>
						<Switch name="switch" />
					</View>
				</Demo>
			</Example.Item>
			<Example.Item
				title={[
					"trap focus works correctly when it was already trapped",
					"focus return back to the dropdown trigger on modal close",
					"closing dropdown inside the modal doesn't close the modal",
				]}
			>
				<DropdownMenu>
					<DropdownMenu.Trigger>
						{(attributes) => <Button attributes={attributes}>Open menu</Button>}
					</DropdownMenu.Trigger>
					<DropdownMenu.Content>
						<DropdownMenu.Item onClick={activate}>Open dialog</DropdownMenu.Item>
						<DropdownMenu.Item>Item 2</DropdownMenu.Item>
					</DropdownMenu.Content>
				</DropdownMenu>
				<Modal active={active} onClose={deactivate}>
					<View gap={3}>
						<DropdownMenu>
							<DropdownMenu.Trigger>
								{(attributes) => <Button attributes={attributes}>Open menu</Button>}
							</DropdownMenu.Trigger>
							<DropdownMenu.Content>
								<DropdownMenu.Item>Item 1</DropdownMenu.Item>
								<DropdownMenu.Item>Item 2</DropdownMenu.Item>
							</DropdownMenu.Content>
						</DropdownMenu>
						<Button onClick={deactivate}>Close</Button>
					</View>
				</Modal>
			</Example.Item>

			<Example.Item title="scroll locks on open">
				<Demo />
				<View height="1000px" />
			</Example.Item>
		</Example>
	);
};

export const trapFocusEdgeCases = () => {
	const toggle = useToggle();

	return (
		<Example>
			<Example.Item title="Radio should be navigatable with arrow keys">
				<Button onClick={toggle.activate}>Open modal</Button>
				<Modal active={toggle.active} onClose={toggle.deactivate}>
					<View gap={2}>
						<Button onClick={() => {}}>Action 1</Button>
						<Radio name="radio" value="1">
							Option 1
						</Radio>
						<Radio name="radio" value="2">
							Option 2
						</Radio>
						<Button onClick={() => {}}>Action 2</Button>
					</View>
				</Modal>
			</Example.Item>
		</Example>
	);
};
