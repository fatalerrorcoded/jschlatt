import { Collection, VoiceChannel } from "discord.js";
import * as fs from "fs-extra";
import { Duplex } from "stream";

export default class QuoteVoice {
	private audioFiles: Collection<string, Buffer>;
	constructor(sfxDir: string) {
		const files = fs.readdirSync(sfxDir);
		console.log(`Reading audio files in directory ${sfxDir}, ${files.length} found...`);
		this.audioFiles = new Collection();
		files.forEach(async (file) => {
			const buf = await fs.readFile(file);
			this.audioFiles.set(file, buf);
		});
	}

	public async playRandom(channel: VoiceChannel) {
		if (channel.guild.voiceConnection !== undefined) return;
		const stream = new Duplex();
		stream.push(this.audioFiles.random());
		stream.push(null);

		const connection = await channel.join();
		const dispatcher = await connection.playStream(stream);
		dispatcher.once("end", () => channel.leave());
	}
}
