/**
 * Imports
 */
import DiscordJS, { Embed } from "discord.js";
import mock from "../../utils/mock.js";

export default {
    // Command Meta
    name: "Mock User",
    type: 3,
    /**
     * Executes the Command
     * @param {DiscordJS.Client} client
     * @param {DiscordJS.Guild} guild
     * @param {DiscordJS.Interaction} interaction
     */
    execute: async (client, guild, interaction) => {
        // Get Target Message
        const { targetId, channelId } = interaction;
        // Find Message
        const channel = await client.channels.fetch(channelId);
        if(channel == null) return errorReply(interaction, "Nachricht konnte nicht gemockt werden ._.");
        const message = await channel.messages.fetch(targetId);
        if(message == null) return errorReply(interaction, "Nachricht konnte nicht gemockt werden ._.");
        // Check Content
        if(message.content.length == 0) return errorReply(interaction, "Nachricht konnte nicht gemockt werden ._.");
        // Get Message Content
        const final = mock(message.content);
        // Reply
        interaction.reply({ content: final, allowedMentions: { parse: [] }});
    }
}

/**
 * Send an error response to the user
 * @param {object} interaction
 * @param {string} error
 */
const errorReply = (interaction, error) => {
    const embed = Embeds.errorEmbed(error);
    interaction.reply({ embeds: [ embed ], ephemeral: true });
}