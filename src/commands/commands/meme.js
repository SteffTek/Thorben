/**
 * Imports
 */
import DiscordJS, { Embed } from "discord.js";
import Embeds from "../../utils/embed.js";
import axios from "axios";

export default {
    // Command Meta
    name: "meme",
    description: "Ein Meimei laden.",
    options: [
        {
            name: "subreddit",
            description: "Ein Unterlases von der Schlag-Seite Gelesen.",
            type: 3,
            required: false
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
        const subreddit = interaction.options.getString("subreddit");

        // Reply with "thinking"
        await interaction.deferReply();

        const meme = await getMeme(subreddit);

        // Check Meme
        if(meme == null || meme.nsfw == true || meme.preview.length == 0) {
            return errorReply(interaction, "Es konnte kein Meme geladen werden. Bestimmt die Schuld vom Rainerle!");
        }

        // Create default embed
        const embed = Embeds.defaultEmbed();
        embed
        .setTitle(meme.title)
        .setImage(meme.url)
        .setURL(meme.postLink);


        // Reply
        interaction.editReply({ embeds: [embed] });
    }
}

/**
 * Get Meme
 * @param {string} subreddit
 * @returns {object} meme
 */
const getMeme = async (subreddit) => {
    const url = "https://meme-api.com/gimme" + (subreddit == null ? "" : "/" + subreddit);
    // Ask nicely
    return await axios({
        method: "GET",
        url
    })
    .then(response => {
        return response.data;
    })
    .catch(err => {
        console.log(err);
        return null;
    });
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