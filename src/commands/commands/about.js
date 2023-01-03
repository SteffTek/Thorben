/**
 * Imports
 */
import DiscordJS, { Embed } from "discord.js";
import Embeds from "../../utils/embed.js";


export default {
    // Command Meta
    name: "about",
    description: "Informationen über den Bot.",
    /**
     * Executes the Command
     * @param {DiscordJS.Client} client
     * @param {DiscordJS.Guild} guild
     * @param {DiscordJS.Interaction} interaction
     */
    execute: async (client, guild, interaction) => {
        // Create Info Embed
        const embed = Embeds.defaultEmbed();
        // Edit
        embed.setTitle("About")
        embed.addFields({ name: "**SteffTek#3664**", value: "Bot programmer", inline: false })
        embed.addFields({ name: "**Clara#6666**", value: "GIF Database", inline: false });

        // Reply
        interaction.reply({ embeds: [embed], ephemeral: true });
    }
}