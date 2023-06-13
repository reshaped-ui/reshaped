import React from "react";
import { Example } from "utilities/storybook";
import Skeleton from "components/Skeleton";
import Text from "components/Text";

export default { title: "Components/Skeleton" };

export const variant = () => (
	<Example>
		<Example.Item title="text">
			<Skeleton />
		</Example.Item>

		<Example.Item title="view, rectangle">
			<Skeleton width="100px" height="100px" />
		</Example.Item>

		<Example.Item title="view, circle">
			<Skeleton width="100px" height="100px" borderRadius="circular" />
		</Example.Item>

		<Example.Item title="view, rectangle, responsive">
			<Skeleton width={{ s: "100px", m: "200px" }} height={{ s: "100px", m: "200px" }} />
		</Example.Item>
	</Example>
);

export const radius = () => (
	<Example>
		<Example.Item title="radius=small">
			<Skeleton width="60px" height="60px" borderRadius="small" />
		</Example.Item>

		<Example.Item title="radius=medium">
			<Skeleton width="60px" height="60px" borderRadius="medium" />
		</Example.Item>

		<Example.Item title="radius=large">
			<Skeleton width="60px" height="60px" borderRadius="large" />
		</Example.Item>

		<Example.Item title="radius=circular">
			<Skeleton width="60px" height="60px" borderRadius="circular" />
		</Example.Item>
	</Example>
);
