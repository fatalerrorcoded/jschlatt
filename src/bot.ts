import dotenv from "dotenv";
dotenv.config();

import * as Discord from "discord.js";
import QuoteChat from "./quotechat";
import QuoteVoice from "./quotevoice";

const client = new Discord.Client();
const quotechat = new QuoteChat("./files/quotes.txt");
const quotevoice = new QuoteVoice("./files/sfx");

let presenceTimeout: number = 0;
const updatePresence = (check: boolean) => {
	if (check && new Date().getTime() < presenceTimeout + (20 * 1000)) return;
	presenceTimeout = new Date().getTime();
	client.user.setActivity(`clips in ${client.guilds.size} servers | @${client.user.tag} help`, { type: "PLAYING" });
};

client.on("ready", () => {
	console.log(`Logged in as ${client.user.username}`);
	updatePresence(false);
});

client.on("guildCreate", () => updatePresence(true));
client.on("guildDelete", () => updatePresence(true));

client.on("message", (message) => {
	if (message.author.bot) return;
	if (message.content === `<@${client.user.id}>` || message.content === `<@!${client.user.id}>`) {
		const channel = message.member.voiceChannel;
		if (channel === undefined) quotechat.sendRandom(message.channel);
		else quotevoice.playRandom(channel);
	}
});

if (process.env.DISCORD_TOKEN === undefined) {
	console.error("DISCORD_TOKEN not found in environment, set it in .env");
	process.exit(-1);
}

client.login(process.env.DISCORD_TOKEN);
