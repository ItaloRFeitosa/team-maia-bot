const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");

class CommandsManager {
  constructor({ client, commands }) {
    this.rest = new REST({ version: "9" }).setToken(client.token);
    this.commands = commands;
    this.client = client;
  }

  async registerAll() {
    try {
      console.log("Started refreshing application (/) commands.");

      await this._registerAll();

      console.log("Successfully reloaded application (/) commands.");
    } catch (error) {
      console.error(error);
    }
  }

  async _registerAll() {
    const guilds = this.client.getGuilds();

    await Promise.all(guilds.map((guild) => this._register(guild.id)));
  }

  async _register(guildId) {
    const path = Routes.applicationGuildCommands(this.client.id, guildId);
    
    const config = {
      body: this.commands.configs(),
    };

    await this.rest.put(path, config);
  }
}

module.exports = CommandsManager;
