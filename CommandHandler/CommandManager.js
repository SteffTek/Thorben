const logger = require("../Utils/Logger");
let moment = require("moment");

//COMMANDS
const Help = require("./Commands/Help");
const Mock = require("./Commands/Mock");
const Vote = require("./Commands/Vote");
const Poll = require("./Commands/Poll");
const Meme = require("./Commands/Meme");

class CommandManager {
    constructor(config) {
        //VARS
        this.config = config;

        //INIT COMMAND LIST
        this.commands = [];

        //ADD COMMANDS
        this.commands.push(new Help(this, "help","",""));
        this.commands.push(new Mock(this, "mock","Text Mocking","<Text>"));
        this.commands.push(new Vote(this, "vote","Erstellt eine Ja/Nein/Neutral Umfrage.","<Frage>"));
        this.commands.push(new Poll(this, "poll","Erstellt eine Umfrage mit 2-10 Antworten.","<Frage>;<Antwort1>;<Antwort2>;..."));
        this.commands.push(new Meme(this, "meme","Holt ein Meme von Haha Funny Seite.","[Subreddit]"));
    }

    async handle(message) {
        let args = message.cleanContent.split(" ");
        let command = args[0].substring(1);

        //Remove First Entry
        args.shift();

        //Fire Command
        try {
            //GET COMMAND
            let cmd_handler = this.getCommand(command);

            if(cmd_handler == null) {
                return;
            }

            //DELETING ORIGINAL
            await message.delete({ timeout: 1000 }).catch(logger.error);

            //EXECUTING COMMAND
            await cmd_handler.handle(message, args, async function(error) {
                if(!error) {
                    return;
                }

                //CREATING EMBED
                let embed = {
                    "embed": {
                        "description": `${error}`,
                        "timestamp": moment.utc().format(),
                        "author": {
                            "name": `${message.author.username}`,
                            "icon_url": message.author.displayAvatarURL()
                        }
                    }
                };

                await message.channel.send(/** @type {Object} embed */ (embed)).then(msg => msg.delete({timeout: 5000}));
            });

        } catch(e) {
            //Command not found!
            logger.error(e);
        }
    }

    getCommand(name) {
        for(let i = 0; i < this.commands.length; i++) {
            if(this.commands[i].name.toLowerCase() === name.toLowerCase()) {
                return this.commands[i];
            }
        }
        return null;
    }
}

module.exports = CommandManager;