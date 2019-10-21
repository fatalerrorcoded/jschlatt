import { DMChannel, GroupDMChannel, TextChannel } from "discord.js";
import * as fs from "fs-extra";

export default class QuoteChat {
	private quotes: string[];
	constructor(quotesFile: string) {
		this.quotes = fs.readFileSync(quotesFile, "utf8").split("\n")
			.filter((value) => value.trim() !== "" && !value.startsWith("#"));
		console.log(`Read in ${this.quotes.length} quotes from ${quotesFile}`);
	}

	public async sendRandom(channel: DMChannel | GroupDMChannel | TextChannel) {
		const quote = this.quotes[Math.floor(Math.random() * this.quotes.length)];
		channel.send(quote);
	}
}
