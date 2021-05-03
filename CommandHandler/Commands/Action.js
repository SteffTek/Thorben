const Command = require("../Command");
const CommandManager = require("../CommandManager");
const Discord = require("discord.js");
const logger = require("../../Utils/Logger");
const axios = require("axios");

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

class Meme extends Command {

    constructor(commandManager, name, description, syntax) {
        super(commandManager, name, description, syntax);
    }

    /*
        @param {Array} List of Arguments
    */
    async handle(message, args, callback) {

        const mentioned = message.mentions.members.first();
        if (mentioned === undefined) {
            return callback("Bitte gib einen Nutzer an!");
        }

        if(mentioned.id === message.author.id) {
            //return callback("Du kannst dich nicht selbst angeben!");
        }

        //SETUP STRING
        let action = args[0];

        if(!categories.includes(action)) {
            return callback("Aktion konnte nicht gefunden werden!");
        }

        let gif = await this.getGIF(action);

        if (gif == null) {
            return callback("Es konnte kein Aktion geladen werden. Sorry :(")
        }

        //CREATING EMBED
        let embed = new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.avatarURL())
            .setColor(this.commandManager.config.colors.embed)
            .setDescription(`**${message.member.user}** >> **${mentioned.user}**`)
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