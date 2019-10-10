import dotenv from "dotenv";
dotenv.config();

import * as Discord from "discord.js";
import QuoteVoice from "./quotevoice";

const client = new Discord.Client();
const quotevoice = new QuoteVoice("./files/sfx");

client.on("ready", () => {
	console.log(`Logged in as ${client.user.username}`);
});

client.on("message", (message) => {
	if (message.author.bot) return;
	if (message.content === "schlatty boi get here") {
		const channel = message.member.voiceChannel;
		if (channel === undefined) message.reply("join a voice channel first dumbass");
		quotevoice.playRandom(channel);
	}
});

client.login(process.env.DISCORD_TOKEN);
