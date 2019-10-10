import dotenv from "dotenv";
dotenv.config();

import * as Discord from "discord.js";
const client = new Discord.Client();

client.on("ready", () => {
	console.log(`Logged in as ${client.user.username}`);
});

client.login(process.env.DISCORD_TOKEN);
