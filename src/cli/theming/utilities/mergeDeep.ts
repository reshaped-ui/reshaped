type Obj = { [key: string]: unknown };

const isObject = (item: any): item is Obj => {
	return item && typeof item === "object" && !Array.isArray(item);
};

const mergeDeep = (target: Obj, ...sources: Obj[]): Obj => {
	if (!sources.length) return target;
	const source = sources.shift();

	if (isObject(target) && isObject(source)) {
		Object.keys(source).forEach((key) => {
			if (isObject(source[key]) && isObject(target[key])) {
				if (!target[key]) Object.assign(target, { [key]: {} });
				mergeDeep(target[key] as Obj, source[key] as Obj);
			} else {
				Object.assign(target, { [key]: source[key] });
			}
		});
	}

	return mergeDeep(target, ...sources);
};

export default mergeDeep;
