//IMPORTS
const logger = require("./Utils/Logger");
const configHandler = require("./Utils/ConfigHandler");
const config = configHandler.getConfig();

const CommandManager = require("./CommandHandler/CommandManager");

const Discord = require('discord.js');

//VARS
const commandManager = new CommandManager(config);

//DISCORD THINGS
const client = new Discord.Client();

client.on('ready', () => {
    logger.done(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    //REJECT DM CHANNEL
    if(msg.channel.type != "text") {
        return;
    }

    //CHECK CONTENT TYPE
    if(typeof msg.content == "string") {
        let content = msg.cleanContent;

        if(content.startsWith(">")) {
            //IF QUOTE, IGNORE
            if(content.startsWith("> ")) {
                return;
            }

            //SEND TO COMMAND HANDLER
            commandManager.handle(msg);
        }

        //CHECK IF BOT IS PINGED
        if (msg.mentions.has(client.user.id)) {
            msg.channel.send("Was pingst du mich du Hurensohn :angry:");
        }
    }
});

//SETUP
logger.info("Setting up...");
client.login(config.discord.token);