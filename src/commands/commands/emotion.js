/**
 * Imports
 */
import DiscordJS, { Embed } from "discord.js";
import Embeds from "../../utils/embed.js";
import axios from "axios";

// Base Categories
const categories = [
    "angry",
    "awkward",
    "blush",
    "bored",
    "cry",
    "dance",
    "facepalm",
    "laugh",
    "no",
    "nom",
    "nosebleed",
    "pout",
    "run",
    "shrug",
    "sip",
    "sleep",
    "smile",
    "smug",
    "stare",
    "yawn",
    "yes"
]

// Base Options
const options = [
    {
        name: "emotion",
        description: "Die Emotion die du zeigen möchtest.",
        type: 3,
        required: true,
        choices: []
    }
];

// Create Options from Categories
categories.forEach(category => {
    // Create Option
    const option = {
        name: category,
        value: category
    };
    // Push
    options[0].choices.push(option);
});

export default {
    // Command Meta
    name: "emotion",
    description: "Zeige eine Emotion.",
    options,
    /**
     * Executes the Command
     * @param {DiscordJS.Client} client
     * @param {DiscordJS.Guild} guild
     * @param {DiscordJS.Interaction} interaction
     */
    execute: async (client, guild, interaction) => {
        // Get Target
        const emotion = interaction.options.getString("emotion");
        const user = interaction.options.getUser("user");


        // Get Gif
        const gif = await getGIF(emotion);
        if(gif == null) return errorReply(interaction, "Jemand hat dazwischen gefunkt ;_;");


        //CREATING EMBED
        let embed = Embeds.defaultEmbed()
        .setDescription(`**${emotion.toUpperCase()}!**`)
        .setImage("https://images.stefftek.de" + gif.data.path);
        //.setAuthor({ name: interaction.user.tag, iconURL: interaction.user.avatarURL() })

        // Reply
        interaction.reply({ embeds: [embed] });
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

const getGIF = async (emotion) => {
    let url = "https://images.stefftek.de/" + emotion + "/random";
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