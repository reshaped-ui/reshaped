import FileUpload, { FileUploadTrigger } from "./FileUpload";

const FileUploadRoot = FileUpload as typeof FileUpload & {
	Trigger: typeof FileUploadTrigger;
};

FileUploadRoot.Trigger = FileUploadTrigger;

export default FileUploadRoot;
export type { Props as FileUploadProps } from "./FileUpload.types";
