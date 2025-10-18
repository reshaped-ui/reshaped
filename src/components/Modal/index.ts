import Modal, { ModalTitle, ModalSubtitle } from "./Modal";
import type * as T from "./Modal.types";

const ModalRoot = Modal as React.FC<T.Props> & {
	Title: typeof ModalTitle;
	Subtitle: typeof ModalSubtitle;
};

ModalRoot.Title = ModalTitle;
ModalRoot.Subtitle = ModalSubtitle;

export default ModalRoot;
export type { Props as ModalProps } from "./Modal.types";
