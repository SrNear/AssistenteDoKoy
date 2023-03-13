const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('unban')
    .setDescription('Remove o banimento de um usuário.')
    .addStringOption(option =>
      option.setName('user')
        .setDescription('O usuário que você deseja desbanir.')
        .setRequired(true)),
  async execute(interaction) {
    const userTag = interaction.options.getString('user');

    if (!interaction.member.permissions.has('BAN_MEMBERS')) {
      return await interaction.reply({ content: 'Você não tem permissão para desbanir usuários!', ephemeral: true });
    }

    const bans = await interaction.guild.bans.fetch();
    const bannedUser = bans.find(user => user.user.tag === userTag);

    if (!bannedUser) {
      return await interaction.reply({ content: 'O usuário fornecido não está banido.', ephemeral: true });
    }

    const embed = new EmbedBuilder()
      .setColor("Green")
      .setTitle('Usuário Desbanido')
      .setThumbnail(bannedUser.user.displayAvatarURL({ dynamic: true }))
      .setDescription(`O usuário **${bannedUser.user.tag}** foi desbanido.`)
      .setTimestamp();

    await interaction.guild.members.unban(bannedUser.user.id, 'Desbanimento solicitado pelo usuário.');

    await interaction.reply({ embeds: [embed] });
  },
};
