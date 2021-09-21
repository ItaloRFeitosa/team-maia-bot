const { SlashCommandBuilder } = require("@discordjs/builders");

const teamMaiaCommand = new SlashCommandBuilder()
  .setName("o_que_eu_quero")
  .setDescription("o que será?")
  .toJSON();

module.exports = {
  command: teamMaiaCommand,
  handler(interaction) {
    interaction.reply({ content: "É sossego!", tts: true});
  },
};
