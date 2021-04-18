const Command = require("../Command");
const CommandManager = require("../CommandManager");
const Discord = require("discord.js");
const logger = require("../../Utils/Logger");
const axios = require("axios");

class Meme extends Command {

    constructor(commandManager, name, description, syntax) {
        super(commandManager, name, description, syntax);
    }

    /*
        @param {Array} List of Arguments
    */
    async handle(message, args, callback) {

        //SETUP STRING
        let reddit = args.join(" ");

        let meme = await this.getMeme(reddit);

        if (meme == null) {
            return callback("Es konnte kein Meme geladen werden. Bestimmt die Schuld vom Rainerle!")
        }

        if (meme.nsfw || meme.preview.length == 0) {
            return callback("Es konnte kein Meme geladen werden. Bestimmt die Schuld vom Rainerle!")
        }

        //CREATING EMBED
        let embed = new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.avatarURL())
            .setColor(this.commandManager.config.colors.embed)
            .setTitle(meme.title)
            .setImage(meme.preview[meme.preview.length - 1])


        //SENDING MESSAGE
        await message.channel.send(embed)

        return callback();
    }

    async getMeme(reddit) {
        let url = "https://meme-api.herokuapp.com/gimme" + (reddit == "" ? "" : "/" + reddit);
        try {
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            logger.error(error + " [Sub Reddit: " + reddit + "]");
            return null;
        }
    }
}

module.exports = Meme;