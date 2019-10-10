import { Collection, VoiceChannel } from "discord.js";
import * as fs from "fs-extra";
import * as path from "path";

export default class QuoteVoice {
	private sfxDir: string;
	private audioFiles: string[];
	constructor(sfxDir: string) {
		this.sfxDir = sfxDir;
		this.audioFiles = fs.readdirSync(sfxDir);
	}

	public async playRandom(channel: VoiceChannel) {
		if (channel.guild !== null && channel.guild.voiceConnection !== null) return;

		const file = this.audioFiles[Math.floor(Math.random() * this.audioFiles.length)];
		const connection = await channel.join();
		const dispatcher = await connection.playFile(path.join(this.sfxDir, file));
		dispatcher.once("end", () => channel.leave());
	}
}
