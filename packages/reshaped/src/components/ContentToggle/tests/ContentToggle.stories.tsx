import React from "react";

import Button from "@/components/Button";
import ContentToggle from "@/components/ContentToggle";
import Text from "@/components/Text";
import View from "@/components/View";
import IconChevronLeft from "@/icons/ChevronLeft";
import IconChevronRight from "@/icons/ChevronRight";

export default {
	title: "Utility components/ContentToggle",
	component: ContentToggle,
};

const chapters = [
	{
		paragraphs: [
			"The troposphere holds almost all of the water vapour on the planet, which makes it the only layer where weather happens. It gets colder the higher you go, right up to the point where the temperature stops falling.",
			"That point is the tropopause, and it works as a lid. Storm clouds flatten out against it instead of growing taller, which is why the tallest ones spread sideways into an anvil.",
		],
	},
	{
		paragraphs: [
			"The stratosphere reverses the pattern and gets warmer with altitude, because the ozone in it absorbs ultraviolet light. That inversion makes the air very stable, so almost nothing mixes vertically.",
			"Long-haul aircraft cruise in the lower part of it for exactly that reason: no convection, no turbulence from rising air, and far less drag than the denser layer below.",
		],
	},
	{
		paragraphs: [
			"In the mesosphere the temperature falls again, down to the coldest point anywhere in the atmosphere. Meteors burn up here, far below the altitude most people imagine.",
			"Higher still, the thermosphere is hot but almost empty, and the aurora forms in it. Somewhere along the way the air simply thins out into space rather than ending at a line.",
			"That point is the tropopause, and it works as a lid. Storm clouds flatten out against it instead of growing taller, which is why the tallest ones spread sideways into an anvil.",
		],
	},
];

export const example = {
	name: "example",
	render: () => {
		const [index, setIndex] = React.useState(0);
		// The content follows the direction it moves in: going forward slides it to the start
		const [direction, setDirection] = React.useState<"start" | "end">("start");
		const chapter = chapters[index];

		const handleChange = (nextIndex: number) => {
			setDirection(nextIndex > index ? "start" : "end");
			setIndex(nextIndex);
		};

		return (
			<View width="480px">
				<View gap={3}>
					<View direction="row" align="center" gap={2}>
						<View.Item grow>
							<Text variant="body-2" weight="medium">
								Layers of the atmosphere
							</Text>
						</View.Item>

						<View direction="row" gap={1}>
							<Button
								variant="ghost"
								size="small"
								icon={IconChevronLeft}
								disabled={index === 0}
								onClick={() => handleChange(index - 1)}
								attributes={{ "aria-label": "Previous chapter" }}
							/>
							<Button
								size="small"
								variant="ghost"
								icon={IconChevronRight}
								disabled={index === chapters.length - 1}
								onClick={() => handleChange(index + 1)}
								attributes={{ "aria-label": "Next chapter" }}
							/>
						</View>
					</View>

					<ContentToggle id={index} direction={direction}>
						<View gap={3}>
							{chapter.paragraphs.map((paragraph) => (
								<Text key={paragraph} variant="body-3" color="neutral-faded">
									{paragraph}
								</Text>
							))}
						</View>
					</ContentToggle>
				</View>
			</View>
		);
	},
};
