import { Example } from "utilities/storybook";
import Pagination from "components/Pagination";

export default {
	title: "Components/Pagination",
	component: Pagination,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/components/pagination",
		},
	},
};

export const truncate = () => {
	return (
		<Example>
			<Example.Item title="start">
				<Pagination
					total={10}
					previousAriaLabel="Previous page"
					nextAriaLabel="Next page"
					pageAriaLabel={(args) => `Page ${args.page}`}
				/>
			</Example.Item>
			<Example.Item title="middle">
				<Pagination
					total={10}
					defaultPage={5}
					previousAriaLabel="Previous page"
					nextAriaLabel="Next page"
					pageAriaLabel={(args) => `Page ${args.page}`}
				/>
			</Example.Item>
			<Example.Item title="end">
				<Pagination
					total={10}
					defaultPage={10}
					previousAriaLabel="Previous page"
					nextAriaLabel="Next page"
					pageAriaLabel={(args) => `Page ${args.page}`}
				/>
			</Example.Item>
			<Example.Item title="no truncation">
				<Pagination
					total={4}
					previousAriaLabel="Previous page"
					nextAriaLabel="Next page"
					pageAriaLabel={(args) => `Page ${args.page}`}
				/>
			</Example.Item>
		</Example>
	);
};
