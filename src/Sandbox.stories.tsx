import View from "components/View";
import Image from "components/Image";
import React from "react";
import Text from "components/Text";
import Button from "components/Button";
import ProgressIndicator from "components/ProgressIndicator";
import Scrim from "components/Scrim";
import IconChevronLeft from "icons/ChevronLeft";
import IconChevronRight from "icons/ChevronRight";

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
			<Component />
		</Preview>
	);
};

const Component = () => {
	const [activeIndex, setActiveIndex] = React.useState(0);
	const total = 10;

	return (
		<View gap={4} align="center" justify="center">
			<View direction="row" gap={2} align="center">
				<Button
					variant="outline"
					onClick={() => {
						setActiveIndex((prev) => Math.max(0, prev - 1));
					}}
					icon={IconChevronLeft}
				/>
				<Button
					variant="outline"
					onClick={() => {
						setActiveIndex((prev) => Math.min(total - 1, prev + 1));
					}}
					icon={IconChevronRight}
				/>
			</View>

			<View borderRadius="medium" overflow="hidden" width="300px">
				<Scrim
					position="bottom"
					backgroundSlot={<View aspectRatio={16 / 9} backgroundColor="neutral-faded" />}
				>
					<View align="center">
						<ProgressIndicator total={total} activeIndex={activeIndex} color="media" />
					</View>
				</Scrim>
			</View>
		</View>
	);
};
