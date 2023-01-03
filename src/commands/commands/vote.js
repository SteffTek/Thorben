/**
 * Imports
 */
import DiscordJS, { Embed } from "discord.js";
import Embeds from "../../utils/embed.js";


export default {
    // Command Meta
    name: "vote",
    description: "Erstellt eine Ja/Nein/Neutral Umfrage.",
    options: [
        {
            name: "question",
            description: "Die Umfrage-Frage(?)",
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
        // Get Targets
        let question = interaction.options.getString("question").trim();
        // Check length
        if(question.length > 255) return errorReply(interaction, "Deine Frage ist leider zu lang (╯°Д°)╯︵/(.□ . \\) (Maximal 255 Zeichen)");
        // Create Embed
        const embed = Embeds.defaultEmbed();
        embed.setAuthor({ name: `Eine Umfrage von ${interaction.user.tag}`, iconURL: interaction.user.avatarURL() });
        embed.setDescription(`**${question}**`);
        // Send
        await interaction.reply({ embeds: [embed] });
        // Get Message
        const message = await interaction.fetchReply();
        // Fetch Channel
        await client.channels.fetch(message.channelId);
        // Add Reacts
        await message.react("👍");
        await message.react("😐");
        await message.react("👎");
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