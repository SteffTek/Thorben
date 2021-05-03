const Command = require("../Command");
const CommandManager = require("../CommandManager");
const Discord = require("discord.js");
const logger = require("../../Utils/Logger");
const axios = require("axios");

const emotions = [
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

const actions = [
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

class About extends Command {

    constructor(commandManager, name, description, syntax) {
        super(commandManager, name, description, syntax);
    }

    /*
        @param {Array} List of Arguments
    */
    async handle(message, args, callback) {

        //LOAD GIF LIST JSON
        let gifList = await this.getGIFList();

        if(gifList === null) {
            return callback("GIF Liste konnte nicht geladen werden :(");
        }

        let desc = "";

        //ADD ACTIONS
        desc += "**__ACTIONS:__**\n";
        let breakpoint = 0;
        for(let i = 0; i < gifList.length; i++) {
            let gif = gifList[i];
            if(!actions.includes(gif.category)) continue;

            desc += `**${gif.category}**[${gif.count}] `

            if(!this.isEven(breakpoint)) {
                desc += "\n"
            }
            breakpoint++;
        }

        //ADD EMOTIONS
        desc += "\n**__EMOTIONS:__**\n";
        breakpoint = 0;
        for(let i = 0; i < gifList.length; i++) {
            let gif = gifList[i];
            if(!emotions.includes(gif.category)) continue;

            desc += `**${gif.category}**[${gif.count}] `

            if(!this.isEven(breakpoint)) {
                desc += "\n"
            }
            breakpoint++;
        }

        //CREATING EMBED
        let embed = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.avatarURL())
        .setColor(this.commandManager.config.colors.embed)
        .setTitle("GIF List")
        .setDescription(desc);

        //SENDING MESSAGE
        message.channel.send(embed)

        return callback();
    }

    async getGIFList() {
        let url = "https://images.stefftek.de/categories";
        try {
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            logger.error(error);
            return null;
        }
    }

    isEven(value) {
        if (value%2 == 0)
            return true;
        else
            return false;
    }
}

module.exports = About;