const fs = require("fs");

class Commands extends Map {
  configs(){
    return [...this.values()].map((command) => command.getConfig())
  }
}

const commands = new Commands();

class Command {
  constructor({config, handler}) {
    this.handler = handler
    this.config = config
  }

  getName(){
    return this.config.name
  }

  getConfig(){
    return this.config
  }

  execute(interaction){
    return this.handler(interaction)
  }
}

const commandFiles = fs
  .readdirSync("./src/commands")
  .filter((file) => file.endsWith(".js") && !file.endsWith("index.js"));

for (const file of commandFiles) {
  const _import = require(`./${file}`);
  const command = new Command({config: _import.command, handler: _import.handler})
  commands.set(command.getName(), command);
}

module.exports = commands;
