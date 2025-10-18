import FileUpload, { FileUploadTrigger } from "./FileUpload";
import type * as T from "./FileUpload.types";

const FileUploadRoot = FileUpload as React.FC<T.Props> & {
	Trigger: typeof FileUploadTrigger;
};

FileUploadRoot.Trigger = FileUploadTrigger;

export default FileUploadRoot;
export type { Props as FileUploadProps } from "./FileUpload.types";
