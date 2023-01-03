/**
 * Imports
 */
import { Client, GuildMember } from "discord.js";
import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";
import DiscordJS from "discord.js";
import axios from "axios";
import dotenv from "dotenv";

import logger from "../utils/logger.js";
import Embeds from "../utils/embed.js";

/**
 * Load Vars
 */
dotenv.config();

/**
 * Constants
 */
const IMAGE_API_URL = "https://images.stefftek.de/";
const VALID_GUILD_ID = process.env.DISCORD_GUILD_ID;

/**
 * Listening to Discord Events
 * @param {Client} client discord client
 */
export default (client) => {
    // Ready Event
    client.on("ready", async () => {
        logger.done(`Client ${client.user.tag} successfully logged in!`);
    });

    // Discord Interactions
    client.on("interactionCreate", async (interaction) => {
        // Check if Valid Guild
        //if(!interaction.inGuild() || interaction.guildId !== VALID_GUILD_ID) return errorReply(interaction, "Invalid Server!");

        // Check if Command
        if(!interaction.isChatInputCommand() && !interaction.isButton() && !interaction.isMessageContextMenuCommand()) return errorReply(interaction, "Invalid Command!");

        // Handle Button
        if(interaction.isButton()) {
            if(interaction.customId !== "EMPTY") return errorReply(interaction, "Invalid Command!");
            // Handle Button Click
            return;
        }

        // Get Command
        const command = client.commandManager.getCommand(interaction.commandName);
        // Check Command
        if(!command) errorReply(interaction, "Invalid Command!");
        // Execute Command
        command.execute(client, interaction.guild, interaction);
    });

    // Message Ping Easteregg
    client.on('messageCreate', msg => {
        //CHECK IF BOT IS PINGED
        if (msg.mentions.has(client.user.id) && msg.author.bot == false) {
            msg.channel.send({ content: "Was pingst du mich du ||redacted|| :angry:", reply: { messageReference: msg.id }});
        }
    });
}


/**
 * Default Response
 */
const errorReply = (interaction, error) => {
    const embed = Embeds.errorEmbed(error);
    interaction.reply({ embeds: [ embed ], ephemeral: true });
}