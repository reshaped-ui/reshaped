declare module "*.css" {
	const content: Record<string, string>;
	interface IClassNames {
		[className: string]: string;
	}
	const classNames: IClassNames;
	export = classNames;
	export default content;
}
