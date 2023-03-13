const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, ButtonBuilder, ActionRowBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('pat')
    .setDescription('Dê um cafuné em agluém!')
    .addUserOption(option => option.setName('user').setDescription('O usuário que você dara o cafuné').setRequired(true)),
  async execute(interaction) {
    const { data: { url } } = await axios.get('https://api.waifu.pics/sfw/pat');
    const avatar = interaction.user.displayAvatarURL({  format: 'png', dynamic: true });

    const embed = new EmbedBuilder()
      .setDescription(`🤗 ${interaction.user} deu um cafuné em ${interaction.options.getUser('user')}!`)
      .setImage(url)
      .setColor('#FF69B4')
      .setTimestamp()
      .setFooter({ text: interaction.user.username, iconURL: avatar })

      const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId('patback')
          .setLabel('Retribuir')
          .setStyle(1),
      );

    interaction.reply({ embeds: [embed], components: [row] });
  },
};
