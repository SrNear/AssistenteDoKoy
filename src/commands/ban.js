const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Bane um usuário do servidor.')
    .addUserOption(option =>
      option.setName('user')
        .setDescription('O usuário que você deseja banir.')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('motivo')
        .setDescription('O motivo do banimento.')
        .setRequired(false))
        .addIntegerOption(option =>
            option.setName('tempo')
              .setDescription('O tempo de banimento em segundos.')
              .setRequired(false)),
  async execute(interaction) {
    const user = interaction.options.getUser('user') || interaction.user;
    const reason = interaction.options.getString('motivo') || 'Nenhum motivo fornecido.';
    const time = interaction.options.getInteger('tempo') || 0;
    
    if (!interaction.member.permissions.has('BAN_MEMBERS')) {
      return await interaction.reply({ content: 'Você não tem permissão para banir usuários!', ephemeral: true });
    }
    
    if (!user) {
      return await interaction.reply({ content: 'O usuário fornecido não é válido.', ephemeral: true });
    }

    const embed = new EmbedBuilder()
      .setColor("Red")
      .setTitle('Usuário Banido')
      .setThumbnail(user.displayAvatarURL({ dynamic: true }))
      .setImage("https://media.tenor.com/JKeoUTnu-G0AAAAC/chika-ban-gif-chika.gif")
      .setDescription(`O usuário <@${user.id}> foi banido.`)
      .addFields({ name:'Motivo', value: reason })
      .setTimestamp();

      if (time > 0) {
        embed.addFields({ name: 'Tempo de banimento', value: `${time} segundos.` });
      }
  
      embed.setTimestamp();
  
      await interaction.guild.members.ban(user, { reason, days: time });
  
      await interaction.reply({ embeds: [embed] });
    },
  };