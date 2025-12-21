import React, { useEffect, useState, useRef, forwardRef } from "react";
import root from "react-shadow";

import Autocomplete, { type AutocompleteProps } from "components/Autocomplete";
import Button from "components/Button";
import DropdownMenu from "components/DropdownMenu";
import Reshaped from "components/Reshaped";
import Select from "components/Select";
import Tooltip from "components/Tooltip";
import View from "components/View";
import { Example } from "utilities/storybook";

export default {
	title: "Internal/ShadowDOM",
};

const getStylesData = () => {
	const sourceStylesContainer = document.head;

	return Array.from(sourceStylesContainer.children).filter((x) => x instanceof HTMLStyleElement);
};

// Create a component to render inside the Shadow DOM
const ShadowDiv = forwardRef<HTMLDivElement, React.PropsWithChildren>((props, ref) => {
	const shadowRef = useRef<HTMLDivElement>(null);

	// Load styles
	useEffect(() => {
		if (!shadowRef?.current) return;

		// Add styles to the shadow DOM
		// const shadowEl = shadowRef?.current.shadowRoot;
		const shadowEl = shadowRef?.current.shadowRoot;

		if (!shadowEl) return;

		const sourceStylesContainer = document.head;

		const observer = new MutationObserver(getStylesData);
		observer.observe(sourceStylesContainer, {
			characterData: true,
			childList: true,
			subtree: true,
		});

		let styleBlock = shadowEl.getElementById("custom-outer-style");

		if (!styleBlock) {
			styleBlock = document.createElement("span");
			styleBlock.id = "custom-outer-style";
			shadowEl.appendChild(styleBlock);
		} else {
			styleBlock.innerHTML = "";
		}

		styleBlock.append(
			...getStylesData() // finds all <style> tags containing your web component ID
				.map((x) => x.cloneNode(true)) // copies styles into the current instance of your web component. You might need to have multiple instances, so all of them need to track the styles.
		);

		return () => observer.disconnect();
	}, []);

	return (
		<Reshaped>
			<root.div className="quote" ref={shadowRef}>
				<div ref={ref}>
					{/* 
						Adding padding here since otherwise mouseenter won't trigger on contents 
						when mouse is switching from outside the shadow dom
					*/}
					<View padding={4}>{props.children}</View>
				</div>
			</root.div>
		</Reshaped>
	);
});

// Main Component
const Component: React.FC = () => {
	const [valueAutoShadow, setValueAutoShadow] = useState("");
	const [valueDropdownShadow, setValueDropdownShadow] = useState("");

	const optionsAuto = ["Pizza", "Pie", "Ice-cream"];
	const optionsDropdown = ["Turtle", "Cat", "Long-necked giraffe"];

	const handleChangeAutoShadow: AutocompleteProps["onChange"] = (args) => {
		console.log("Autocomlete shadow value=", args);
		setValueAutoShadow(args.value);
	};

	const handleChangeDropdownShadow = (val: string) => {
		console.log("Dropdown shadow value=", val);
		setValueDropdownShadow(val);
	};

	return (
		<View paddingBottom={50}>
			<ShadowDiv>
				<View gap={4} direction="row" wrap={false}>
					<Autocomplete
						name="fruit-shadow"
						placeholder="Pick your food"
						value={valueAutoShadow}
						onChange={handleChangeAutoShadow}
						inputAttributes={{ "aria-label": "Label" }}
					>
						{optionsAuto.map((option) => (
							<Autocomplete.Item
								key={option}
								value={option}
								onClick={() => handleChangeAutoShadow({ value: option, name: "fruit-auto" })}
							>
								{option}
							</Autocomplete.Item>
						))}
					</Autocomplete>

					<DropdownMenu>
						<DropdownMenu.Trigger>
							{(attributes) => (
								<Select placeholder="Pick your animal" name="font" inputAttributes={attributes}>
									{valueDropdownShadow}
								</Select>
							)}
						</DropdownMenu.Trigger>
						<DropdownMenu.Content>
							{optionsDropdown.map((option) => (
								<DropdownMenu.Item onClick={() => handleChangeDropdownShadow(option)} key={option}>
									{option}
								</DropdownMenu.Item>
							))}
						</DropdownMenu.Content>
					</DropdownMenu>

					<Tooltip text="Tooltip for button">
						{(attributes) => <Button attributes={attributes}>Hover me</Button>}
					</Tooltip>
				</View>
			</ShadowDiv>
		</View>
	);
};

export const behavior = () => (
	<Example>
		<Example.Item title="base">
			<Component />
		</Example.Item>
	</Example>
);
