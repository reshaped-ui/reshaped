import React from "react";
import { Example } from "utilities/storybook";
import View from "components/View";
import Icon from "components/Icon";
import IconZap from "icons/Zap";
import Image from "../Image";

export default { title: "Utilities/Image" };

const imgUrl =
	"https://images.unsplash.com/photo-1536880756060-98a6a140f0a7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1600&q=80";

export const size = () => (
	<Example>
		<Example.Item title="size: auto">
			<Image src={imgUrl} alt="Image alt" />
		</Example.Item>
		<Example.Item title="width: 200px">
			<Image src={imgUrl} width="200px" />
		</Example.Item>
		<Example.Item title="height: 200px">
			<Image src={imgUrl} height="200px" />
		</Example.Item>
		<Example.Item title={["responsive width", "[s] 200px", "[m+] 300px"]}>
			<Image src={imgUrl} width={{ s: "200px", m: "300px" }} />
		</Example.Item>
	</Example>
);

export const radius = () => (
	<Example>
		<Example.Item title="radius: small">
			<View width="300px">
				<Image src={imgUrl} borderRadius="small" />
			</View>
		</Example.Item>
		<Example.Item title="radius: medium">
			<View width="300px">
				<Image src={imgUrl} borderRadius="medium" />
			</View>
		</Example.Item>
		<Example.Item title="radius: large">
			<View width="300px">
				<Image src={imgUrl} borderRadius="large" />
			</View>
		</Example.Item>
	</Example>
);

export const displayMode = () => (
	<Example>
		<Example.Item title="mode: cover">
			<Image src={imgUrl} height="200px" width="100%" displayMode="cover" />
		</Example.Item>
		<Example.Item title="mode: contain">
			<Image src={imgUrl} height="200px" width="100%" displayMode="contain" />
		</Example.Item>
	</Example>
);

export const ratio = () => (
	<Example>
		<Example.Item title="ratio: 16/9">
			<View aspectRatio={16 / 9}>
				<Image src={imgUrl} />
			</View>
		</Example.Item>
		<Example.Item title="ratio: 16/9, displayMode: contain">
			<View aspectRatio={16 / 9}>
				<Image src={imgUrl} displayMode="contain" />
			</View>
		</Example.Item>
	</Example>
);

export const fallback = () => (
	<Example>
		<Example.Item title="fallback, background, on error">
			<View width="300px">
				<View aspectRatio={16 / 9}>
					<Image src="error" fallback />
				</View>
			</View>
		</Example.Item>
		<Example.Item title="fallback, image, on error">
			<View width="300px">
				<View aspectRatio={16 / 9}>
					<Image src="error" fallback={imgUrl} />
				</View>
			</View>
		</Example.Item>

		<Example.Item title="fallback, icon, on error">
			<View width="300px">
				<View aspectRatio={16 / 9}>
					<Image src="error" fallback={<Icon svg={IconZap} size={10} />} />
				</View>
			</View>
		</Example.Item>
		<Example.Item title="fallback, icon, no url">
			<View width="300px">
				<View aspectRatio={16 / 9}>
					<Image fallback={<Icon svg={IconZap} size={10} />} />
				</View>
			</View>
		</Example.Item>
	</Example>
);
