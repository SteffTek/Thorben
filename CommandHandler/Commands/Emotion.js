const Command = require("../Command");
const CommandManager = require("../CommandManager");
const Discord = require("discord.js");
const logger = require("../../Utils/Logger");
const axios = require("axios");

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

class Meme extends Command {

    constructor(commandManager, name, description, syntax) {
        super(commandManager, name, description, syntax);
    }

    /*
        @param {Array} List of Arguments
    */
    async handle(message, args, callback) {

        //SETUP STRING
        let emotion = args[0];

        console.log(emotion);

        if(!categories.includes(emotion)) {
            return callback("Emotion konnte nicht gefunden werden!");
        }

        let gif = await this.getGIF(emotion);

        if (gif == null) {
            return callback("Es konnte kein Emotion geladen werden. Sorry :(")
        }

        //CREATING EMBED
        let embed = new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.avatarURL())
            .setColor(this.commandManager.config.colors.embed)
            .setDescription(`**${emotion.toUpperCase()}!**`)
            .setImage("https://images.stefftek.de" + gif.url);

        //SENDING MESSAGE
        await message.channel.send(embed)

        return callback();
    }

    async getGIF(action) {
        let url = "https://images.stefftek.de/" + (action == "" ? "" : "/" + action);
        try {
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            logger.error(error + " [Image Category: " + reddit + "]");
            return null;
        }
    }
}

module.exports = Meme;