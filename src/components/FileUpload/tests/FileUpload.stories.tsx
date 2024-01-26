import React from "react";
import { Example } from "utilities/storybook";
import FileUpload from "components/FileUpload";
import View from "components/View";
import Image from "components/Image";
import Link from "components/Link";
import Icon from "components/Icon";
import IconMic from "icons/Mic";

export default {
	title: "Components/FileUpload",
	component: FileUpload,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/components/file-upload",
		},
	},
};

const Demo = () => {
	const [files, setFiles] = React.useState<File[]>([]);

	return (
		<View gap={2}>
			<FileUpload name="file" onChange={(args) => setFiles((prev) => [...prev, ...args.value])}>
				<View gap={3}>
					<Icon svg={IconMic} size={8} />
					Drop files to attach
				</View>
			</FileUpload>
			<View paddingBottom={20}>
				<View gap={2} direction="row" position="absolute">
					{files &&
						Array.from(files).map((file) => {
							return (
								<Image
									key={file.name}
									src={URL.createObjectURL(file)}
									width="60px"
									height="60px"
									borderRadius="small"
								/>
							);
						})}
				</View>
			</View>
		</View>
	);
};

export const base = () => (
	<Example>
		<Example.Item title="Base upload with previews">
			<Demo />
		</Example.Item>
		<Example.Item title="With trigger">
			<FileUpload name="file">
				<div>
					Drop files to attach, or{" "}
					<FileUpload.Trigger>
						<Link variant="plain">browse</Link>
					</FileUpload.Trigger>
				</div>
			</FileUpload>
		</Example.Item>
	</Example>
);
