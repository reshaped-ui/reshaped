class Cooldown {
	status: "cold" | "warm" | "cooling" = "cold";

	timer?: ReturnType<typeof setTimeout>;

	warm = () => {
		clearTimeout(this.timer);
		this.status = "warm";
	};

	cool = () => {
		this.status = "cooling";
		const currentTimer = setTimeout(() => {
			this.status = "cold";
			if (currentTimer === this.timer) this.timer = undefined;
		}, 500);

		this.timer = currentTimer;
	};
}

export default new Cooldown();
