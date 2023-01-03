/**
 * Imports
 */
import Vote from "./commands/vote.js";
import Poll from "./commands/poll.js";
import Meme from "./commands/meme.js";
import Mock from "./commands/mock.js";
import About from "./commands/about.js";
import Action from "./commands/action.js";
import Emotion from "./commands/emotion.js";
import MockContext from "./commands/mockContext.js";

/**
 * Manager
 */
export default class CommandManager {
    constructor() {
        // CommandList
        this.commands = [Vote, Poll, Meme, Mock, About, Action, Emotion, MockContext];
    }

    /**
     * Return a list of all Commands
     * @returns {Array} array of commands
     */
    getCommands() {
        return this.commands;
    }

    /**
     * Get specific Command by name
     * @param {String} name command name
     * @return {Command} command
     */
    getCommand(name) {
        return this.commands.find(c => c.name == name);
    }
}