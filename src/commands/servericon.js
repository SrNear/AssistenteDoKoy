const { EmbedBuilder, SlashCommandBuilder} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName('servericon')
    .setDescription('Exibe o ícone do servidor'),
async execute(interaction) {
    const server = interaction.guild;
    const icon = server.iconURL({ size: 1024, dynamic: true });
    const avatar = interaction.user.displayAvatarURL({  format: 'png', dynamic: true });


        const embed = new EmbedBuilder()
            .setTitle(`Ícone de ${server.name}`)
            .setImage(icon)
            .setColor("Purple")
            .setFooter({ text: interaction.user.username, iconURL: avatar });

        await interaction.reply({ embeds: [embed], ephemeral: true });
    },
};