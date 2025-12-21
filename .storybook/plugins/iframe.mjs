import React from "react";
import { addons, types } from "storybook/manager-api";
import { AddonPanel } from "storybook/internal/components";

const ADDON_ID = "reshaped-iframe";
const PANEL_ID = `${ADDON_ID}/panel`;

addons.register(ADDON_ID, (api) => {
	addons.add(PANEL_ID, {
		type: types.PANEL,
		title: "Reshaped docs",
		render: (props) => {
			const data = api.getCurrentParameter("iframe");

			return React.createElement(
				AddonPanel,
				{ style: { height: "100%" }, ...props },
				data?.url &&
					React.createElement("iframe", {
						src: data.url,
						style: {
							width: "100%",
							height: "100%",
							outline: "none",
							border: "none",
							position: "absolute",
						},
					})
			);
		},
	});
});
