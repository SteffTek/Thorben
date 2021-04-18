const CommandManager = require("./CommandManager");
const logger = require("../Utils/Logger");

class Command {
    constructor(commandManager, name, description, syntax) {
        this.commandManager = commandManager;
        this.name = name;
        this.description = description;
        this.syntax = syntax;
    }

    /**
     * Get Command Name
    */
    getName() {
        return this.name;
    }

    /**
     * Get Command Description
    */
    getDescription() {
        return this.description;
    }

    /**
     * Get Command Syntax
    */
    getSyntax() {
        return this.syntax;
    }

    /**
     * Get Command HelpString
    */
    getHelpString() {
        let help = "**" + this.commandManager.config.discord.commandPrefix + this.getName() + "**";

        //Additional Information
        if(this.getSyntax().length) {
            help += " " + this.getSyntax();
        }
        if(this.getDescription().length) {
            help += " - " + this.getDescription();
        }

        //Return
        return help;
    }

    /**
     * Handle Command
     * @param {Array} args - Arguments for the Command.
    */
    handle(message, args, callback) {
        logger.warn(`${this.name} has no command handler`)
        return callback(`${this.name} has no command handler`);
    }
}

module.exports = Command;