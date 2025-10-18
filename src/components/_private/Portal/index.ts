import Portal, { PortalScope } from "./Portal";

const PortalRoot = Portal as typeof Portal & {
	Scope: typeof PortalScope;
};

export default PortalRoot;
export type { Props as PortalProps } from "./Portal.types";
