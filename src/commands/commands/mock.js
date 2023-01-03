/**
 * Imports
 */
import DiscordJS, { Embed } from "discord.js";
import mock from "../../utils/mock.js";

export default {
    // Command Meta
    name: "mock",
    description: "Eingegebenen Text mocken.",
    options: [
        {
            name: "text",
            description: "Text zum mocken",
            type: 3,
            required: true
        }
    ],
    /**
     * Executes the Command
     * @param {DiscordJS.Client} client
     * @param {DiscordJS.Guild} guild
     * @param {DiscordJS.Interaction} interaction
     */
    execute: async (client, guild, interaction) => {
        // Get Target Message
        const content = interaction.options.getString("text");
        // Get Message Content
        const final = mock(content);
        // Reply
        interaction.reply({ content: final, allowedMentions: { parse: [] }});
    }
}