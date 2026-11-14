class Cooldown {
	status: "warming" | "warm" | "cooling" | "cold" = "cold";

	timer?: ReturnType<typeof setTimeout>;

	private rewarmListeners = new Set<() => void>();

	/**
	 * Called when another flyout gets hovered while the group is still cooling down
	 */
	onRewarm = (listener: () => void) => {
		this.rewarmListeners.add(listener);
		return () => {
			this.rewarmListeners.delete(listener);
		};
	};

	warm = () => {
		clearTimeout(this.timer);

		if (this.status === "cooling") {
			this.status = "warm";
			this.rewarmListeners.forEach((listener) => listener());
			return;
		}

		this.status = "warming";

		this.timer = setTimeout(() => {
			this.status = "warm";
			this.timer = undefined;
		}, 100);
	};

	cool = () => {
		clearTimeout(this.timer);

		if (this.status === "warming") {
			this.status = "cold";
			return;
		}

		this.status = "cooling";

		this.timer = setTimeout(() => {
			this.status = "cold";
			this.timer = undefined;
		}, 500);
	};
}

export default new Cooldown();
