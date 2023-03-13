const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('slap')
    .setDescription('Dê um tapa em alguém!')
    .addUserOption(option => option.setName('user').setDescription('O usuário que você dara o tapa!').setRequired(true)),
  async execute(interaction) {
    const { data: { url } } = await axios.get('https://api.waifu.pics/sfw/slap');
    const avatar = interaction.user.displayAvatarURL({  format: 'png', dynamic: true });

    const embed = new EmbedBuilder()
      .setDescription(`💥 ${interaction.user} deu um tapa em ${interaction.options.getUser('user')}!`)
      .setImage(url)
      .setColor('#FF69B4')
      .setTimestamp()
      .setFooter({ text: interaction.user.username, iconURL: avatar });

      const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId('slapback')
          .setLabel('Retribuir')
          .setStyle(1),
      );

    interaction.reply({ embeds: [embed], components: [row] });
  },
};
