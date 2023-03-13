const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Kicka um usuário do servidor.')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('O usuário que será kickado.')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('O motivo do kick.')
                .setRequired(false)
        ),
    async execute(interaction) {
        const user = interaction.options.getUser('user');
        const reason = interaction.options.getString('reason') || 'Sem motivo especificado.';

        if (!interaction.member.permissions.has('KICK_MEMBERS')) {
            return interaction.reply({ content: 'Você não tem permissão para kickar usuários!', ephemeral: true });
        }

        if (user) {
            const member = interaction.guild.members.cache.get(user.id);

            if (member) {
                member.kick(reason)
                    .then(() => {
                        const embed = new EmbedBuilder()
                            .setColor("Red")
                            .setTitle('Usuário kickado com sucesso!')
                            .setImage("https://media.tenor.com/WYcG7rzRqJ4AAAAC/meme-discord.gif")
                            .setDescription(`${member.user.username} foi kickado por ${interaction.user}.\n\nMotivo: ${reason}`)
                            .setTimestamp();

                        interaction.reply({ embeds: [embed] });
                    })
                    .catch(error => {
                        console.error(error);
                        interaction.reply({ content: 'Não foi possível kickar o usuário!', ephemeral: true });
                    });
            } else {
                interaction.reply({ content: 'O usuário não é um membro deste servidor!', ephemeral: true });
            }
        } else {
            interaction.reply({ content: 'Você não mencionou o usuário para kickar!', ephemeral: true });
        }
    },
};
