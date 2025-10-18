import Modal, { ModalTitle, ModalSubtitle } from "./Modal";

const ModalRoot = Modal as typeof Modal & {
	Title: typeof ModalTitle;
	Subtitle: typeof ModalSubtitle;
};

ModalRoot.Title = ModalTitle;
ModalRoot.Subtitle = ModalSubtitle;

export default ModalRoot;
export type { Props as ModalProps } from "./Modal.types";
