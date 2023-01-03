const Command = require("../Command");
const CommandManager = require("../CommandManager");
const Discord = require("discord.js");
const logger = require("../../Utils/Logger");

class About extends Command {

    constructor(commandManager, name, description, syntax) {
        super(commandManager, name, description, syntax);
    }

    /*
        @param {Array} List of Arguments
    */
    handle(message, args, callback) {

        //CREATING EMBED
        let embed = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.avatarURL())
        .setColor(this.commandManager.config.colors.embed)
        .setTitle("About")
        .addField("**SteffTek#3664**", "Bot programmer", false)
        .addField("**Clara#6666**", "GIF Database", false);

        //SENDING MESSAGE
        message.channel.send(embed)

        return callback();
    }
}

module.exports = About;