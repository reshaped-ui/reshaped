import useResponsiveClientValue from "hooks/useResponsiveClientValue";
import View, { type ViewProps } from "components/View";

export default { title: "Hooks/useResponsiveClientValue" };

export const base = {
	name: "base",
	render: () => {
		const value = useResponsiveClientValue<ViewProps["backgroundColor"]>({
			s: "neutral",
			m: "critical",
			l: "positive",
		});

		return <View width={25} height={25} backgroundColor={value} />;
	},
};

export const boolean = {
	name: "boolean",
	describe: "works with boolean properties",
	render: () => {
		const value = useResponsiveClientValue<boolean>({
			s: true,
			l: false,
		});

		return <div>{value?.toString()}</div>;
	},
};
