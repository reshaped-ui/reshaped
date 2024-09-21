import React, { useEffect, useState, useRef, forwardRef } from "react";
import root from "react-shadow";
import { Example } from "utilities/storybook";
import Autocomplete, { type AutocompleteProps } from "components/Autocomplete";
import View from "components/View";
import DropdownMenu from "components/DropdownMenu";
import Reshaped from "components/Reshaped";
import Select from "components/Select";
import Button from "components/Button";
import Text from "components/Text";

export default {
	title: "Meta/ShadowDOM",
};

// Shadow DOM Component
type ShadowDivProps = {
	children?: React.ReactNode;
};

const getStylesData = () => {
	const sourceStylesContainer = document.head;

	return Array.from(sourceStylesContainer.children).filter((x) => x instanceof HTMLStyleElement);
};

// Create a component to render inside the Shadow DOM
const ShadowDiv = forwardRef<HTMLDivElement, ShadowDivProps>((props, ref) => {
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

		return () => {
			observer.disconnect();
		};
	}, []);

	return (
		<Reshaped>
			<root.div className="quote" ref={shadowRef}>
				<div ref={ref}>{props.children}</div>
			</root.div>
		</Reshaped>
	);
});

// Main Component
const Component: React.FC = () => {
	const divRef = useRef<HTMLDivElement | null>(null);

	const [valueAutoShadow, setValueAutoShadow] = useState("");
	const [valueDropdownShadow, setValueDropdownShadow] = useState("");

	const [valueAuto, setValueAuto] = useState("");
	const [valueDropdown, setValueDropdown] = useState("");

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

	const handleChangeAuto: AutocompleteProps["onChange"] = (args) => {
		console.log("Autocomlete value=", args);
		setValueAuto(args.value);
	};

	const handleChangeDropdown = (val: string) => {
		console.log("Dropdown value=", val);
		setValueDropdown(val);
	};

	return (
		<>
			<Text variant="title-6">Inside shadow DOM</Text>
			<View
				width="100%"
				divided
				gap={4}
				padding={4}
				direction="row"
				backgroundColor="elevation-base"
				borderColor="neutral-faded"
				wrap={false}
			>
				<View width="40px" backgroundColor="neutral-faded" />
				<View grow>
					<ShadowDiv ref={divRef}>
						<View gap={4} direction="row" wrap={false}>
							<Autocomplete
								name="fruit-auto"
								placeholder="Pick your food"
								value={valueAutoShadow}
								onChange={handleChangeAutoShadow}
								containerRef={divRef}
							>
								<Button onClick={() => console.log("233232")}>sdds</Button>
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

							<DropdownMenu containerRef={divRef}>
								<DropdownMenu.Trigger>
									{(attributes) => (
										<Select placeholder="Pick your animal" name="font" inputAttributes={attributes}>
											{valueDropdownShadow}
										</Select>
									)}
								</DropdownMenu.Trigger>
								<DropdownMenu.Content>
									{optionsDropdown.map((option) => (
										<DropdownMenu.Item
											onClick={() => handleChangeDropdownShadow(option)}
											key={option}
										>
											{option}
										</DropdownMenu.Item>
									))}
								</DropdownMenu.Content>
							</DropdownMenu>

							{/* <Tooltip containerRef={divRef} active text="Tooltip for button">
                {(attributes) => (
                  <Button attributes={attributes}>Hover me</Button>
                )}
              </Tooltip> */}
						</View>
					</ShadowDiv>
				</View>
			</View>

			{/* Without shadow dom */}
			<Text variant="title-6">Main DOM</Text>

			<View
				width="100%"
				divided
				gap={4}
				padding={4}
				direction="row"
				backgroundColor="elevation-base"
				borderColor="neutral-faded"
				wrap={false}
			>
				<View width="40px" backgroundColor="neutral-faded" />
				<View grow>
					<View gap={4} direction="row" wrap={false}>
						<Autocomplete
							name="fruit-2"
							placeholder="Pick your food"
							value={valueAuto}
							onChange={handleChangeAuto}
						>
							{optionsAuto.map((option) => (
								<Autocomplete.Item
									key={option}
									value={option}
									onClick={() => handleChangeAuto({ value: option, name: "fruit-2" })}
								>
									{option}
								</Autocomplete.Item>
							))}
						</Autocomplete>

						<DropdownMenu>
							<DropdownMenu.Trigger>
								{(attributes) => (
									<Select placeholder="Pick your animal" name="font-2" inputAttributes={attributes}>
										{valueDropdown}
									</Select>
								)}
							</DropdownMenu.Trigger>
							<DropdownMenu.Content>
								{optionsDropdown.map((option) => (
									<DropdownMenu.Item onClick={() => handleChangeDropdown(option)} key={option}>
										{option}
									</DropdownMenu.Item>
								))}
							</DropdownMenu.Content>
						</DropdownMenu>

						{/* <Tooltip active text="Tooltip for button">
              {(attributes) => (
                <Button attributes={attributes}>Hover me</Button>
              )}
            </Tooltip> */}
					</View>
				</View>
			</View>
		</>
	);
};

export const behavior = () => (
	<Example>
		<Example.Item title="base">
			<Component />
		</Example.Item>
	</Example>
);
