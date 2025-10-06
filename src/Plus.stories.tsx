import Select from "components/Select";
import TextField from "components/TextField";

export default {
	title: "Plus",
};

export const currency = () => {
	return (
		<TextField
			name="foo"
			prefix={
				<Select.Custom name="currency" variant="headless" width="200px" position="bottom-start">
					<Select.Option value="eur" startSlot="EUR">
						Euro
					</Select.Option>
					<Select.Option value="usd" startSlot="USD">
						USD
					</Select.Option>
				</Select.Custom>
			}
		/>
	);
};
