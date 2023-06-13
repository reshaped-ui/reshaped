type ID = number;
type Item<T> = {
	previousId?: ID | null;
	nextId?: ID | null;
	data: T;
};

class Chain<T = unknown> {
	chain: Record<ID, Item<T>> = {};

	tailId: ID | null = null;

	idCounter: ID = 0;

	generateId() {
		this.idCounter += 1;
		return this.idCounter;
	}

	getAll() {
		return this.chain;
	}

	get(id: ID) {
		return this.chain[id];
	}

	isLast(id: ID) {
		return this.tailId !== null && id === this.tailId;
	}

	isEmpty() {
		return typeof this.tailId !== "number";
	}

	add(data: T) {
		const previousId = this.tailId;
		const previousItem = previousId && this.get(previousId);
		const id = this.generateId();

		this.chain[id] = { previousId, data };

		if (previousItem) previousItem.nextId = id;
		this.tailId = id;
		return id;
	}

	remove(id: ID) {
		const target = this.chain[id];

		if (!target) return;

		const previousId = target.previousId;
		const previousItem = previousId && this.get(previousId);
		const nextId = target.nextId;
		const nextItem = nextId && this.get(nextId);

		if (previousItem) previousItem.nextId = target.nextId ?? null;
		if (nextItem) nextItem.previousId = target.previousId ?? null;
		if (!nextId) this.tailId = previousId ?? null;

		const data = this.get(id).data;
		delete this.chain[id];

		return data;
	}

	removePreviousTill(id: ID, condition: (item: Item<T>) => boolean): T | undefined {
		const target = this.get(id);
		const data = this.remove(id);

		if (!target || !target.previousId) return data;

		const keepIterating = !condition(target);
		if (keepIterating) return this.removePreviousTill(target.previousId, condition);
		return data;
	}
}

export default Chain;
