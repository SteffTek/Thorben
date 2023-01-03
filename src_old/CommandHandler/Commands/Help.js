const Command = require("../Command");
const CommandManager = require("../CommandManager");
const Discord = require("discord.js");
const logger = require("../../Utils/Logger");

class Help extends Command {

    constructor(commandManager, name, description, syntax) {
        super(commandManager, name, description, syntax);
    }

    /*
        @param {Array} List of Arguments
    */
    handle(message, args, callback) {

        //Description Text
        let desc = "";
        this.commandManager.commands.forEach(command => {
            desc += command.getHelpString() + "\n";
        });

        //CREATING EMBED
        let embed = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.avatarURL())
        .setColor(this.commandManager.config.colors.embed)
        .setTitle("Help!")
        .setDescription(desc);

        //SENDING MESSAGE
        message.channel.send(embed)

        return callback();
    }
}

module.exports = Help;