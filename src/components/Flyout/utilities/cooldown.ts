import * as timeouts from "../Flyout.constants";

class Cooldown {
	status: "warming" | "warm" | "cooling" | "cold" = "cold";

	timer?: ReturnType<typeof setTimeout>;

	warm = () => {
		clearTimeout(this.timer);

		if (this.status === "cooling") {
			this.status = "warm";
			return;
		}

		this.status = "warming";

		this.timer = setTimeout(() => {
			this.status = "warm";
			this.timer = undefined;
		}, timeouts.mouseEnterShort);
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
