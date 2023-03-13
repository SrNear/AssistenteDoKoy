const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('perfil')
        .setDescription('Exibe o perfil do usuário.')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('O usuário cujo perfil deve ser exibido.')
                .setRequired(false)),

    async execute(interaction) {
        const user = interaction.options.getUser('user') || interaction.user;

        const embed = new EmbedBuilder()
            .setColor("Blue")
            .setTitle(`Perfil de ${user.username}`)
            .setDescription(`Aqui está o perfil de ${user}.`)
            .setThumbnail(user.displayAvatarURL({ dynamic: true }))
            .addFields(
                { name: 'Tag', value: user.tag, inline: true },
                { name: 'ID', value: user.id, inline: true },
                { name: 'Conta criada em', value: user.createdAt.toDateString() },
            );

        interaction.reply({ embeds: [embed] });
    },
};
