/**
 * Imports
 */
import DiscordJS, { Embed } from "discord.js";
import Embeds from "../../utils/embed.js";
import axios from "axios";

// Base Categories
const categories = [
    "baka",
    "bite",
    "bonk",
    "highfive",
    "hug",
    "kill",
    "kiss",
    "lick",
    "love",
    "marry",
    "massage",
    "pat",
    "poke",
    "punch",
    "slap",
    "throw",
    "tickle",
    "wave",
    "yaoihug",
    "yaoikiss",
    "yurihug",
    "yurikiss"
]

// Base Options
const options = [
    {
        name: "action",
        description: "Die Aktion die du ausführen möchtest.",
        type: 3,
        required: true,
        choices: []
    },
    {
        name: "user",
        description: "Der betroffene Benutzer.",
        type: 6,
        required: true
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


// String Interpolation
const strings = {
    "baka":"%n1% findet %n2% doof!",
    "bite":"%n1% beißt %n2%!",
    "bonk":"%n2% **BONK**!",
    "highfive":"%n1% fordert %n2% zum Highfive auf!",
    "hug":"%n1% umarmt %n2%.",
    "kill":"%n1% bringt %n2% um!",
    "kiss":"%n1% küsst %n2% :3",
    "lick":"%n1% leckt %n2% ab.",
    "love":"%n1% liebt %n2%! <3",
    "marry":"%n1% will %n2% heiraten! So Cute :3",
    "massage":"%n1% massiert %n2%.",
    "pat":"%n1% streichelt %n2%! _PAT PAT_",
    "poke":"%n1% stupst %n2% an.",
    "punch":"%n1% schlägt %n2% richtig fest!",
    "slap":"%n1% schlägt %n2%.",
    "throw":"%n1% wirft etwas nach %n2%!",
    "tickle":"%n1% kitzelt %n2%. Hihi ^^",
    "wave":"%n1% winkt %n2% zu.",
    "yaoihug":"%n1% umarmt %n2% :3",
    "yaoikiss":"%n1% küsst %n2% ^^",
    "yurihug":"%n1% umarmt %n2% :3",
    "yurikiss":"%n1% küsst %n2% ^^"
}

export default {
    // Command Meta
    name: "action",
    description: "Führe eine Aktion mit einem anderen Benutzer aus.",
    options,
    /**
     * Executes the Command
     * @param {DiscordJS.Client} client
     * @param {DiscordJS.Guild} guild
     * @param {DiscordJS.Interaction} interaction
     */
    execute: async (client, guild, interaction) => {
        // Get Target
        const action = interaction.options.getString("action");
        const user = interaction.options.getUser("user");

        // Check
        if(interaction.user.id == user.id) {
            return errorReply(interaction, "Du kannst das nicht mit dir selbst machen ( ͡° ͜ʖ ͡°)")
        }

        // Get Gif
        const gif = await getGIF(action);
        if(gif == null) return errorReply(interaction, "Jemand hat dazwischen gefunkt ;_;");

        // Get String Result
        const result = strings[action].replace("%n1%", `**${interaction.user}**`).replace("%n2%",`**${user}**`);

        //CREATING EMBED
        let embed = Embeds.defaultEmbed()
        .setDescription(result)
        .setImage("https://images.stefftek.de" + gif.data.path);

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

const getGIF = async (action) => {
    let url = "https://images.stefftek.de/" + action + "/random";
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