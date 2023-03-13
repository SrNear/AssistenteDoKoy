const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('kiss')
    .setDescription('Envia uma imagem de anime de beijo!')
    .addUserOption(option => option.setName('user').setDescription('O usuário que será beijado').setRequired(true)),
  async execute(interaction) {
    const { data: { url } } = await axios.get('https://api.waifu.pics/sfw/kiss');
    const avatar = interaction.user.displayAvatarURL({  format: 'png', dynamic: true });

    const embed = new EmbedBuilder()
      .setDescription(`💋 ${interaction.user} beijou ${interaction.options.getUser('user')}!`)
      .setImage(url)
      .setColor('#FF69B4')
      .setTimestamp()
      .setFooter({ text: interaction.user.username, iconURL: avatar });

      const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId('kissback')
          .setLabel('Retribuir')
          .setStyle(1),
      );

    interaction.reply({ embeds: [embed], components: [row] });
  },
};
