const { EmbedBuilder } = require('discord.js');

// Evento guildMemberRemove
module.exports = {
  name: 'guildMemberRemove',
  async execute(member) {
    const channelId = '1074921584692842627';
    const channel = member.guild.channels.cache.get(channelId)

    if (!channel) return;

    const embed = new EmbedBuilder()
      .setColor("Orange")
      .setTitle(`${member.user.username} saiu do servidor :c`)
      .setImage("https://i.pinimg.com/originals/6f/d2/79/6fd27999356011e3b0b239663836c70c.gif")
      .setDescription(`Espero que algum dia ele(a) volte...`)
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
      .setFooter({ text: `ID do usuário: ${member.user.id}` });

    channel.send({ embeds: [embed] });
  }
};
