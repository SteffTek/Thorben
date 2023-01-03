/**
 * Imports
 */
import { REST, Routes, Client, GatewayIntentBits } from "discord.js";
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import dotenv from "dotenv";


import Logger from "./src/utils/logger.js";
import EventManager from "./src/events/manager.js";
import CommandManager from "./src/commands/manager.js";

/**
 * Load Env
 */
dotenv.config();

/**
 * Constants
 */
const TOKEN = process.env.DISCORD_TOKEN;
const CLIENT_ID = process.env.DISCORD_CLIENT_ID;
const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * Command Manager
 */
const commandManager = new CommandManager();

/**
 * Create Interactions
 */
const rest = new REST({ version: "10" }).setToken(TOKEN);
try {
    Logger.info('Started refreshing application (/) commands.');
    await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commandManager.getCommands() });
    Logger.done('Successfully reloaded application (/) commands.')
} catch (error) {
    Logger.error(error);
    throw error;
}

/**
 * Create Client
 */
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.DirectMessages] });
client.commandManager = commandManager;

/**
 * Event Manager
 */
EventManager(client);

/**
 * Start Client
 */
client.login(TOKEN);