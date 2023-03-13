const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const akaneko = require('akaneko');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('lewd')
    .setDescription('Nem te conto 😳'),
  async execute(interaction) {
    const avatar = interaction.user.displayAvatarURL({  format: 'png', dynamic: true });

    const embed = new EmbedBuilder()
      .setDescription(`${interaction.user} está **HORNY**!`)
      .setImage(await akaneko.nsfw.hentai())
      .setColor("Red")
      .setTimestamp()
      .setFooter({ text: interaction.user.username, iconURL: avatar });

    interaction.reply({ embeds: [embed] });
  },
};
