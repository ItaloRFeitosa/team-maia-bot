const { SlashCommandBuilder,  } = require("@discordjs/builders");
const { MessageEmbed,  } = require("discord.js");

const teamMakerCommand = new SlashCommandBuilder()
  .setName("team_maker")
  .setDescription("coloque /team_maker [nome_do_canal]")
  .addStringOption((option) =>
    option
      .setName("voice_channel")
      .setDescription("Canal de Voz")
      .setRequired(true)
  )
  .toJSON();

const makeEmbed = ({ color, title, members }) => {
  const description = members.reduce((memo, member) => {
    return `${memo}${member}\n`;
  }, "");

  return new MessageEmbed()
    .setColor(color)
    .setTitle(title)
    .setDescription(description);
};
module.exports = {
  command: teamMakerCommand,
  handler(interaction) {
    const voiceChannel = interaction.options.get("voice_channel").value;

    const channel = interaction.guild.channels.cache.find(
      (ch) => ch.name == voiceChannel && ch.isVoice()
    );

    console.log("channel", channel.members)

    const membersName = [
      ...channel.members.map(
        (member) => member.nickname || member.user.username
      ),
    ].sort(() => Math.random() - 0.5);

    const total = membersName.length;
    const teamQuantity = parseInt(total / 2);

    const teamBlue = membersName.slice(0, teamQuantity);
    const teamRed = membersName.slice(teamQuantity, total);
    interaction.reply({
      embeds: [
        makeEmbed({ color: "#101ee6", title: "Time Azul", members: teamBlue }),
        makeEmbed({
          color: "#d41919",
          title: "Time Vermelho",
          members: teamRed,
        }),
      ],
    });
  },
};
