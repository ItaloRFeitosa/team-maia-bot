const commands = require("./commands");

const { token, clientId } = require("../config.json");

const Bot = require("./bot");
const ClientBuilder = require("./client");
const CommandInteractionController = require("./command-interaction-controller");
const CommandsManager = require("./commands-manager");

const controller = new CommandInteractionController({ commands });

const client = new ClientBuilder()
  .setToken(token)
  .setClientId(clientId)
  .setInteraction(controller)
  .build();

const manager = new CommandsManager({ client, commands });

const bot = new Bot({
  client,
  commandsManager: manager,
});

bot.init();
