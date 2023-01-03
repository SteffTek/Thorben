/**
 * Imports
 */
import { EmbedBuilder } from "discord.js";

/**
 * Embed Funcs
 */
const defaultEmbed = () => {
    // Create Embed
    const embed = new EmbedBuilder();

    // Prefill
    embed.setColor(11871353)
    .setDescription("**Thorben 🤖**")
    .setTimestamp(Date.now())
    .setFooter({ text: "Haha funny meme bot! 🍻 By SteffTek.de" });

    return embed;
}

const infoEmbed = (message) => {
    const embed = defaultEmbed();
    embed.addFields({ name: "Info ℹ️:", value: `\`${message}\`` });
    return embed;
}

const errorEmbed = (message) => {
    const embed = defaultEmbed();
    embed.setColor("#E57373");
    embed.addFields({ name: "Error ⚠️:", value: `\`${message}\`` });
    return embed;
}

/**
 * Export
 */
export default {
    infoEmbed,
    errorEmbed,
    defaultEmbed
}