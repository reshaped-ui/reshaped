import { wcagContrast, type Oklch } from "culori/fn";
import { oklchToRgb } from "./convert";

const getOnColorWCAG = (args: { bgColor: Oklch; lightColor: Oklch; darkColor: Oklch }) => {
	const { bgColor, lightColor, darkColor } = args;

	return wcagContrast(bgColor, lightColor) > 4.5 ? lightColor : darkColor;
};

function luminanceAPCA(oklch: Oklch) {
	const { r, g, b } = oklchToRgb(oklch);

	return (
		0.2126 * Math.pow(r / 255, 2.2) +
		0.7152 * Math.pow(g / 255, 2.2) +
		0.0722 * Math.pow(b / 255, 2.2)
	);
}

export const getOnColorAPCA = (args: { bgColor: Oklch; lightColor: Oklch; darkColor: Oklch }) => {
	const { bgColor, lightColor, darkColor } = args;

	const backgroundLuminance = luminanceAPCA(bgColor);
	const lightLuminance = luminanceAPCA(lightColor);
	const darkLuminance = luminanceAPCA(darkColor);
	const contrastWithLight = Math.abs(lightLuminance - backgroundLuminance);
	const contrastWithDark = Math.abs(darkLuminance - backgroundLuminance);

	return contrastWithLight > contrastWithDark ? lightColor : darkColor;
};

export const getOnColor = (args: {
	bgColor: Oklch;
	lightColor: Oklch;
	darkColor: Oklch;
	algorithm?: "wcag" | "apca";
}) => {
	if (args.algorithm === "apca") {
		return getOnColorAPCA(args);
	} else {
		return getOnColorWCAG(args);
	}
};
