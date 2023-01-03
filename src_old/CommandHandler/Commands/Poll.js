const Command = require("../Command");
const CommandManager = require("../CommandManager");
const Discord = require("discord.js");
const logger = require("../../Utils/Logger");
let moment = require("moment");

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

class Poll extends Command {

    constructor(commandManager, name, description, syntax) {
        super(commandManager, name, description, syntax);
    }

    /*
        @param {Array} List of Arguments
    */
    handle(message, args, callback) {
        
        //CHECK CHANNEL
        if(message.channel.id != this.commandManager.config.discord.pollChannel) {
            return callback("Bitte nutze den Umfragen Kanal für Umfragen.")
        }

        //SETUP STRING
        let pollArray = args.join(" ").split(";").map(e => e.trim()).filter(e => e.replace(/\s/g, "") !== "");
        let pollOptions = pollArray.slice(1);

        //CHECK FOR OPTIONS
        if (!pollOptions.length || pollOptions.length < 2 || pollOptions.length > 10){
            return callback(`Die Anzahl der angegebenen Antworten (${pollOptions.length}) liegt nicht im gültigen Bereich!`);
        }

        let optionstext = `**${pollArray[0]}**\n\n`;
        pollOptions.forEach((e, i) => (optionstext += `${NUMBERS[i]} - ${e}\n`));

        //CREATING EMBED
        let embed = {
            "embed": {
                "description": `${optionstext}`,
                "timestamp": moment.utc().format(),
                "author": {
                    "name": `Umfrage von ${message.author.username}`,
                    "icon_url": message.author.displayAvatarURL()
                }
            }
        };


        //SENDING MESSAGE
        message.channel.send(/** @type {Object} embed */ (embed)).then(async msg => {
            for (let i in pollOptions) await msg.react(EMOJI[i]);
        });

        return callback();
    }
}

module.exports = Poll;