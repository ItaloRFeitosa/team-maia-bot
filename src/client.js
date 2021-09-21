const { Client } = require("discord.js");

class DiscordClient {
  constructor({ client, token, id }) {
    this.client = client;
    this.token = token;
    this.id = id;
  }

  async login() {
    await this.client.login(this.token);

  }

  getGuilds() {
    return this.client.guilds.cache;
  }
}

class ClientBuilder {
  constructor() {
    this.interactions = [];
  }

  setClientId(clientId) {
    this.clientId = clientId;
    return this;
  }

  setToken(token) {
    this.token = token;
    return this;
  }

  setInteraction(controller) {
    this.interactions.push(controller);

    return this;
  }

  build() {
    const client = new Client({
      intents: [
        "GUILD_VOICE_STATES",
        "GUILDS",
        "GUILD_MEMBERS",
        "GUILD_MESSAGES",
        "GUILD_MESSAGE_TYPING",
        "GUILD_PRESENCES",
        "GUILD_MESSAGE_REACTIONS",
        "GUILD_INTEGRATIONS",
      ],
    });

    client.once("ready", () => {
      console.log("Team Maia is ready!");
    });

    this.interactions.forEach((controller) => {
      client.on("interactionCreate", (interaction) => controller.handle(interaction));
    });

    return new DiscordClient({ client, token: this.token, id: this.clientId });
  }
}

module.exports = ClientBuilder;
