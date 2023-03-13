const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, ButtonBuilder, ActionRowBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('hug')
    .setDescription('Abrace agluém!')
    .addUserOption(option => option.setName('user').setDescription('O usuário que será abraçado').setRequired(true)),
  async execute(interaction) {
    const { data: { url } } = await axios.get('https://api.waifu.pics/sfw/hug');
    const avatar = interaction.user.displayAvatarURL({  format: 'png', dynamic: true });

    const embed = new EmbedBuilder()
      .setDescription(`😊 ${interaction.user} abraçou ${interaction.options.getUser('user')}!`)
      .setImage(url)
      .setColor('#FF69B4')
      .setTimestamp()
      .setFooter({ text: interaction.user.username, iconURL: avatar })

      const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId('hugback')
          .setLabel('Retribuir')
          .setStyle(1),
      );

    interaction.reply({ embeds: [embed], components: [row] });
  },
};
