const { SlashCommandBuilder } = require('@discordjs/builders');
const { Interaction } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("coin")
        .setDescription("Орел или решка?"),
    async execute(interaction) {
        let answer = ["Орёл!", "Решка!"];
        let randomIndex = Math.floor(Math.random() * 2);
        interaction.reply({content: `${answer[randomIndex]}`})
    }
}