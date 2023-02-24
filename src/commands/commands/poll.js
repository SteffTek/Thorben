/**
 * Imports
 */
import DiscordJS, { Embed } from "discord.js";
import Embeds from "../../utils/embed.js";

const NUMBERS = [
    ":one:",
    ":two:",
    ":three:",
    ":four:",
    ":five:",
    ":six:",
    ":seven:",
    ":eight:",
    ":nine:",
    ":keycap_ten:"
];

const EMOJI = [
    "1️⃣",
    "2️⃣",
    "3️⃣",
    "4️⃣",
    "5️⃣",
    "6️⃣",
    "7️⃣",
    "8️⃣",
    "9️⃣",
    "🔟"
];

export default {
    // Command Meta
    name: "poll",
    description: "Erstellt eine Umfrage mit 2-10 Antworten.",
    options: [
        {
            name: "question",
            description: "Die Umfrage-Frage(?)",
            type: 3,
            required: true
        },
        {
            name: "answer1",
            description: "Eine mögliche Antwort",
            type: 3,
            required: true
        },
        {
            name: "answer2",
            description: "Eine mögliche Antwort",
            type: 3,
            required: true
        },
        {
            name: "answer3",
            description: "Eine mögliche Antwort",
            type: 3,
            required: false
        },
        {
            name: "answer4",
            description: "Eine mögliche Antwort",
            type: 3,
            required: false
        },
        {
            name: "answer5",
            description: "Eine mögliche Antwort",
            type: 3,
            required: false
        },
        {
            name: "answer6",
            description: "Eine mögliche Antwort",
            type: 3,
            required: false
        },
        {
            name: "answer7",
            description: "Eine mögliche Antwort",
            type: 3,
            required: false
        },
        {
            name: "answer8",
            description: "Eine mögliche Antwort",
            type: 3,
            required: false
        },
        {
            name: "answer9",
            description: "Eine mögliche Antwort",
            type: 3,
            required: false
        },
        {
            name: "answer10",
            description: "Eine mögliche Antwort",
            type: 3,
            required: false
        },
    ],
    /**
     * Executes the Command
     * @param {DiscordJS.Client} client
     * @param {DiscordJS.Guild} guild
     * @param {DiscordJS.Interaction} interaction
     */
    execute: async (client, guild, interaction) => {
        // Get Targets
        let question = interaction.options.getString("question")?.trim();
        if(question.length > 255) return errorReply(interaction, "Sorry, aber deine Frage ist zu lang :[ (Maximal 255 Zeichen)");
        let answers = [];
        for(let i = 1; i < 10; i++) {
            answers.push(interaction.options.getString(`answer${i}`)?.trim());
            // Check Length
            if(answers[i - 1].length > 255) {
                return errorReply(interaction, `Sorry aber deine ${i}te Antwort ist zu lang :/ (Maximal 255 Zeichen)`);
            }
        }
        // Cleanup answers
        answers = answers.filter(answer => answer != null);
        // Check for question mark
        if(!question.endsWith("?")) question += "?";
        // Create Options
        let optionsText = `**${question}**\n\n`;
        answers.forEach((answer, i) => {
            optionsText += `${NUMBERS[i]} - ${answer}\n`;
        });
        // Create Embed
        const embed = Embeds.defaultEmbed();
        embed.setAuthor({ name: `Eine Umfrage von ${interaction.user.tag}`, iconURL: interaction.user.avatarURL() });
        embed.setDescription(optionsText);
        // Send
        await interaction.reply({ embeds: [embed] });
        // Get Message
        const message = await interaction.fetchReply();
        // Fetch Channel
        await client.channels.fetch(message.channelId);
        // Add Reacts
        for(let i in answers) {
            await message.react(EMOJI[i]);
        }
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