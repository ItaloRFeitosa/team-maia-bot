class Bot {
  constructor({ client, commandsManager }) {
    this.client = client;
    this.commandsManager = commandsManager;
  }

  async init() {
    await this.client.login();

    setTimeout(async () => {
      await this.commandsManager.registerAll();

    }, 2000)

  }
}

module.exports = Bot
