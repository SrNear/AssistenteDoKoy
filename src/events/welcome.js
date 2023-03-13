const { EmbedBuilder } = require('discord.js');

// Evento guildMemberAdd
module.exports = {
  name: 'guildMemberAdd',
  async execute(member) {
    const channelId = '1074921584692842627';
    const channel = member.guild.channels.cache.get(channelId)
    const server = member.guild.name;

    if (!channel) return;

    const embed = new EmbedBuilder()
      .setColor("Orange")
      .setTitle(`Bem-vindo(a) ao ${server}!`)
      .setImage("https://i.pinimg.com/originals/b3/84/91/b38491f07b7277abc4a6d30c26a95ff0.gif")
      .setDescription(`${member.user} Estamos felizes em tê-lo(a) conosco!\nEspero que goste do servidor :D`)
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
      .setFooter({ text: `ID do usuário: ${member.user.id}` });

    channel.send({ embeds: [embed] });
  }
};
