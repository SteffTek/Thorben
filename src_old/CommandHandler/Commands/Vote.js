const Command = require("../Command");
const CommandManager = require("../CommandManager");
const Discord = require("discord.js");
const logger = require("../../Utils/Logger");
let moment = require("moment");

class Vote extends Command {

    constructor(commandManager, name, description, syntax) {
        super(commandManager, name, description, syntax);
    }

    /*
        @param {Array} List of Arguments
    */
    handle(message, args, callback) {

        //SETUP STRING
        let str = args.join(" ");

        //CHECK CHANNEL
        if(message.channel.id != this.commandManager.config.discord.pollChannel) {
            return callback("Bitte nutze den Umfragen Kanal für Umfragen.")
        }

        //CATCH EMPTY
        if(str.length == 0) {
            return callback("Deine Antwort ist zu kurz!");
        } else if(str.length > 255) {
            return callback("Deine Antwort ist zu lang!");
        }

        //CREATING EMBED
        let embed = {
            "embed": {
                "description": `**${str}**`,
                "timestamp": moment.utc().format(),
                "author": {
                    "name": `Umfrage von ${message.author.username}`,
                    "icon_url": message.author.displayAvatarURL()
                }
            }
        };
        //SENDING MESSAGE
        message.channel.send(/** @type {any} embed */ (embed))
        .then(msg => msg.react("👍")
            .then(() => msg.react("😐")
                .then(() => msg.react("👎")
        )));

        return callback();
    }
}

module.exports = Vote;