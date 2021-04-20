const Command = require("../Command");
const CommandManager = require("../CommandManager");
const Discord = require("discord.js");
const logger = require("../../Utils/Logger");

class Mock extends Command {

    constructor(commandManager, name, description, syntax) {
        super(commandManager, name, description, syntax);
    }

    /*
        @param {Array} List of Arguments
    */
    async handle(message, args, callback) {

        //SETUP STRING
        let str = args.join(" ").trim();

        //CHECK IF MOCKED = EMPTY
        // => GET QUOTED MESSAGE
        if(str.length == 0) {
            let reference = message.reference;
            let ref_msg = await message.channel.messages.fetch(reference.messageID);

            if(ref_msg != null) {
                str = ref_msg.cleanContent;
            }
        }

        //MOCK STRING
        str = this.mocking(str);

        //CATCH EMPTY
        if(str.length == 0 || str.length > 255) {
            return callback();
        }

        //CREATING EMBED
        let embed = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.avatarURL())
        .setColor(this.commandManager.config.colors.embed)
        .setTitle(str);

        //SENDING MESSAGE
        message.channel.send(embed)

        return callback();
    }

    mocking(string) {
        let str = "";

        for(let i = 0; i < string.length; i++) {
            let char = string.charAt(i);
            str += this.transform(char);
        }

        return str;
    }

    transform(char) {
        if (char === "ß" || char === "ẞ") return char;
        return Math.random() < 0.5 ? char.toLowerCase() : char.toUpperCase();
    }
}

module.exports = Mock;