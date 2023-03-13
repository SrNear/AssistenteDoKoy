const { EmbedBuilder, SlashCommandBuilder} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName('avatar')
    .setDescription('Exibe o avatar do usuário')
    .addUserOption(option => option.setName('usuário').setDescription('O usuário que deseja ver o avatar')),
async execute(interaction) {
    const user = interaction.options.getUser('usuário') || interaction.user;
    const avatar = user.displayAvatarURL({ size: 1024, format: 'png', dynamic: true });
    const uvatar = interaction.user.displayAvatarURL({  format: 'png', dynamic: true });

        const embed = new EmbedBuilder()
            .setTitle(`Avatar de ${user.username}`)
            .setImage(avatar)
            .setColor("Purple")
            .setFooter({ text: interaction.user.username, iconURL: uvatar });

        await interaction.reply({ embeds: [embed], ephemeral: false });
    },
};