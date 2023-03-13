const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('clear')
        .setDescription('Limpa as mensagens do chat.')
        .addIntegerOption(option =>
            option.setName('quantidade')
                .setDescription('O número de mensagens a serem apagadas.')
                .setRequired(true)),

    async execute(interaction) {
        const amount = interaction.options.getInteger('quantidade');
        if (amount <= 0 || amount > 100) {
            return interaction.reply('Você deve escolher um número entre 1 e 100 para apagar mensagens!');
        }

        await interaction.channel.bulkDelete(amount, true)
            .then(messages => {
                const embed = new EmbedBuilder()
                    .setColor("Green")
                    .setDescription(`Foram apagadas ${messages.size} mensagens!`)
                    .setThumbnail("https://media.discordapp.net/attachments/817966535024181288/832288050574131210/limpav2.gif")
                    .setTimestamp();
                interaction.reply({ embeds: [embed] });
            })
            .catch(error => {
                const embed = new EmbedBuilder()
                    .setColor("Red")
                    .setDescription(`Ocorreu um erro ao tentar apagar mensagens: ${error.message}`);
                interaction.reply({ embeds: [embed] });
            });
    },
};
