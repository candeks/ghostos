const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("eval")
        .setDescription("Выполнение кода непосредственно в реальном времени")
        .addStringOption(option => option.setName("code").setDescription("Какой код я должен выполнить?").setRequired(true)),
    async execute(interaction, client) {
        try { 
            if (interaction.user.id === "852831119774711839") {
                const code = interaction.options.getString("code").replace(/\\n/g, "\n")
                eval(code)
                interaction.reply({embeds: [
                    new MessageEmbed()
                        .setTitle("**Выполнение кода...**")
                        .setDescription(`\`\`\`${code}\`\`\``)
                        .setColor("#22c9e6")
                    ]
                }).catch(() => {}); 
            } else {
                return interaction.reply({content: "Доступно строго разработчику боту. (Candex#0001)", ephemeral: true})
            }
        } catch (error) {
            interaction.reply({
                embeds: [
                    new MessageEmbed()
                        .setTitle("**Ошибка**")
                        .setColor("#ff0000")
                        .setDescription(`\`\`\`${error}\`\`\``)
                ], ephemeral: true})
        }
    }
}  