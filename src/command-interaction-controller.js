class CommandInteractionController {
  constructor({ commands }) {
    this.commands = commands;
  }

  async handle(interaction) {
    if (!interaction.isCommand()) {
      console.log("not a command");
      return;
    }

    const command = this.commands.get(interaction.commandName);

    return command.execute(interaction);
  }
}

module.exports = CommandInteractionController;
