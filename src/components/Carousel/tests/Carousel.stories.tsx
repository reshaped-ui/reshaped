import React from "react";
import { Example, Placeholder } from "utilities/storybook";
import Carousel, { CarouselInstanceRef } from "components/Carousel";
import Button from "components/Button";
import View from "components/View";

export default { title: "Components/Carousel" };

export const visibleItems = () => (
	<Example>
		<Example.Item title="visibleItems: 3">
			<Carousel visibleItems={3}>
				<Placeholder h={100} />
				<Placeholder h={100} />
				<Placeholder h={100} />
				<Placeholder h={100} />
				<Placeholder h={100} />
				<Placeholder h={100} />
			</Carousel>
		</Example.Item>

		<Example.Item title={["responsive visibleItems", "[s] 2", "[m+] 3"]}>
			<Carousel visibleItems={{ s: 2, m: 3 }}>
				<Placeholder h={100} />
				<Placeholder h={100} />
				<Placeholder h={100} />
				<Placeholder h={100} />
				<Placeholder h={100} />
				<Placeholder h={100} />
			</Carousel>
		</Example.Item>

		<Example.Item title="visibleItems: auto">
			<Carousel>
				<Placeholder h={100} />
				<Placeholder h={100} w={200} />
				<Placeholder h={100} w={300} />
				<Placeholder h={100} />
				<Placeholder h={100} />
				<Placeholder h={100} />
			</Carousel>
		</Example.Item>
	</Example>
);

export const gap = () => (
	<Example>
		<Example.Item title="gap: 2, visibleItems 3">
			<Carousel visibleItems={3} gap={2}>
				<Placeholder h={100} />
				<Placeholder h={100} />
				<Placeholder h={100} />
				<Placeholder h={100} />
				<Placeholder h={100} />
				<Placeholder h={100} />
			</Carousel>
		</Example.Item>

		<Example.Item title={["responsive gap, visibleItems: 3", "[s] 2", "[l] 8"]}>
			<Carousel visibleItems={3} gap={{ s: 2, l: 8 }}>
				<Placeholder h={100} />
				<Placeholder h={100} />
				<Placeholder h={100} />
				<Placeholder h={100} />
				<Placeholder h={100} />
				<Placeholder h={100} />
			</Carousel>
		</Example.Item>
	</Example>
);

export const bleed = () => (
	<Example>
		<Example.Item title="bleed: 4, visibleItems: 3">
			<Carousel visibleItems={3} bleed={4}>
				<Placeholder h={100} />
				<Placeholder h={100} />
				<Placeholder h={100} />
				<Placeholder h={100} />
				<Placeholder h={100} />
				<Placeholder h={100} />
			</Carousel>
		</Example.Item>

		<Example.Item title={["responsive bleed, visibleItems: 3", "[s] 4, [l+] 0"]}>
			<Carousel visibleItems={3} bleed={{ s: 4, l: 0 }}>
				<Placeholder h={100} />
				<Placeholder h={100} />
				<Placeholder h={100} />
				<Placeholder h={100} />
				<Placeholder h={100} />
				<Placeholder h={100} />
			</Carousel>
		</Example.Item>
	</Example>
);

const RefDemo = () => {
	const carouselRef = React.useRef<CarouselInstanceRef>();

	return (
		<View gap={3}>
			<View gap={3} direction="row">
				<Button onClick={() => carouselRef.current?.navigateBack()}>Back</Button>
				<Button onClick={() => carouselRef.current?.navigateForward()}>Forward</Button>
			</View>
			<Carousel visibleItems={2} instanceRef={carouselRef} navigationDisplay="hidden">
				<Placeholder h={100}>Item 1</Placeholder>
				<Placeholder h={100}>Item 2</Placeholder>
				<Placeholder h={100}>Item 3</Placeholder>
				<Placeholder h={100}>Item 4</Placeholder>
				<Placeholder h={100}>Item 5</Placeholder>
				<Placeholder h={100}>Item 6</Placeholder>
			</Carousel>
		</View>
	);
};

export const navigation = () => (
	<Example>
		<Example.Item title="navigation: hidden">
			<Carousel visibleItems={3} navigationDisplay="hidden">
				<Placeholder h={100} />
				<Placeholder h={100} />
				<Placeholder h={100} />
				<Placeholder h={100} />
				<Placeholder h={100} />
				<Placeholder h={100} />
			</Carousel>
		</Example.Item>

		<Example.Item title="navigation: external">
			<RefDemo />
		</Example.Item>
	</Example>
);
