import View from "components/View";
import Image from "components/Image";
import Table from "components/Table";
import Text from "components/Text";
import DropdownMenu from "components/DropdownMenu";
import Select from "components/Select";
import TextField from "components/TextField";
import { ReactNode, useState } from "react";
import Button from "components/Button";
import FormControl from "components/FormControl";
import Skeleton from "components/Skeleton";
import Modal from "components/Modal";

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

function generateRandomName(length: number) {
	const chars = "abcdefghijklmnopqrstuvwxyz";
	let name = "";
	for (let i = 0; i < length; i++) {
		name += chars[Math.floor(Math.random() * chars.length)];
	}
	return name;
}

const data = Array.from({ length: 1000 }, (_, i) => ({
	id: i + 1,
	name: generateRandomName(Math.floor(Math.random() * 11) + 20), // length 20–30
}));

function FieldSelect(props: any) {
	const {
		value,
		onChange,
		onFocus,
		dLabel,
		label,
		items,
		valueMember = "payload",
		displayMember = "text",
		secondaryDisplayMember = undefined,
		submitted,
		disabled,
		placeholder,
		variant = "outline",
		includeNone = false,
		noneText = "None Selected",
		noneValue = -1,
		errorText,
		filterable,
		lookup,
		dynamic = false,
		startSlot,
		dataTestId,
		lookupItems,
		className,
		removeLegacyPadding = false,
		size,
		...other
	} = props;
	const computedLabel = label;

	let options = items?.map((item: any) =>
		typeof item == "string" ? { payload: item, text: item } : item
	);

	if (includeNone) {
		options = [{ [displayMember]: noneText, [valueMember]: noneValue }, ...(options ?? [])];
	}

	const [filter, setFilter] = useState<string | null>(null);

	let control: ReactNode = null;

	const normalizedFilter = (filter ?? "").toLowerCase().trim();
	const filterTerms = normalizedFilter.split(/\s+/);

	const filteredItems = options.filter((item: any) => {
		const primaryText = item[displayMember]?.toLowerCase() || "";
		const secondaryText = secondaryDisplayMember
			? item[secondaryDisplayMember]?.toLowerCase() || ""
			: "";

		const matchesFilter = (text: string) =>
			filterTerms.every((term) => text.split(/\s+/).some((word) => word.startsWith(term)));

		return matchesFilter(primaryText) || matchesFilter(secondaryText);
	});

	const selected = options?.find((x: any) => x[valueMember] === value);

	const displayValue = selected?.[displayMember] ?? "";
	const startSlotComp = (
		<View gap={1} direction="row" align="center">
			{startSlot} {displayValue}
		</View>
	);
	control = (
		<>
			<DropdownMenu trapFocusMode="selection-menu" position="bottom-start">
				<DropdownMenu.Trigger>
					{(attributes) => (
						<>
							<Select
								name=""
								variant={variant}
								placeholder={!displayValue && (placeholder ?? noneText ?? label)}
								inputAttributes={{ ...attributes, content: displayValue }}
								hasError={submitted && !!errorText}
								className={
									className +
									" " +
									(errorText && !submitted ? "border !border-orange-300" : "border")
								}
								startSlot={startSlotComp}
								data-testid={dataTestId}
								size={size}
								onFocus={onFocus}
							/>
						</>
					)}
				</DropdownMenu.Trigger>
				<DropdownMenu.Content
					className="!w-[fit-content] !min-w-[none] !max-w-[none] !overflow-x-visible"
					// attributes={{ role: 'menu' }}
				>
					<div style={{ maxHeight: 300, overflow: "auto" }}>
						{options.length > 10 && (
							<View paddingBottom={2}>
								<TextField
									name="filter"
									placeholder="Search in list"
									value={filter ?? ""}
									inputAttributes={{ autoComplete: "off" }}
									endSlot={
										filter && (
											<Button variant="ghost" size="small" onClick={() => setFilter(null)} />
										)
									}
									attributes={{ autoFocus: true }}
									onChange={({ value }) => setFilter(value)}
								/>
							</View>
						)}
						{filteredItems.length === 0 && (
							<View padding={2}>
								<Text color="neutral-faded">No items found</Text>
							</View>
						)}

						{filteredItems.slice(0, 10).map((item: any) => (
							<div {...other} key={item[displayMember]}>
								<DropdownMenu.Item
									attributes={{
										style: { display: "inline-block" },
									}}
									disabled={item.disabled}
									onClick={(x) => onChange({ target: { value: item[valueMember] } })}
								>
									<Text className="text-ellipsis text-nowrap">
										{item[displayMember] ?? item[valueMember]}
									</Text>
									{secondaryDisplayMember && (
										<Text variant="caption-1" color="neutral-faded" className="mb-[-8px]">
											{item[secondaryDisplayMember]}
										</Text>
									)}
								</DropdownMenu.Item>
							</div>
						))}
					</div>
				</DropdownMenu.Content>
			</DropdownMenu>
		</>
	);

	return (
		<View paddingBottom={removeLegacyPadding ? 0 : 2}>
			<FormControl disabled={disabled}>
				{computedLabel && <FormControl.Label>{computedLabel}</FormControl.Label>}
				{control}
				{errorText && submitted && <FormControl.Error>{errorText}</FormControl.Error>}
			</FormControl>
		</View>
	);
}

export const preview = () => {
	const [id, setId] = useState();

	return (
		<Preview>
			<Modal
				active
				position="end"
				// attributes={{ style: { overflowY: "auto" } }}
			>
				<View gap={4}>
					<Text variant="title-6">Title</Text>
					<FieldSelect
						className="form-control"
						value={id}
						onChange={(e: any) => setId(e.target.value)}
						items={data}
						displayMember="name"
						valueMember="id"
					/>
					<Skeleton height={500} />
					<FieldSelect
						className="form-control"
						value={id}
						onChange={(e: any) => setId(e.target.value)}
						items={data}
						displayMember="name"
						valueMember="id"
					/>
				</View>
			</Modal>
		</Preview>
	);
};
