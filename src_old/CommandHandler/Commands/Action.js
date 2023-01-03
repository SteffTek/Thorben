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
            return callback("Du kannst dich nicht selbst angeben!");
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
            .setDescription(strings[action].replace("%n1%", `**${message.member.user}**`).replace("%n2%",`**${mentioned.user}**`))
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