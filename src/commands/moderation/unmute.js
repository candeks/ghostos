const { MessageEmbed } = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
      .setName("unmute")
      .setDescription("Доссрочно снимает мут участнику")
      .addUserOption(option => option.setName("member").setDescription('Укажи кому снять мут').setRequired(true)),
    async execute(interaction) {
        const member = interaction.options.getMember("member")
        try {
          await member.timeout(null).then(() => {
            interaction.reply({embeds: [
              new MessageEmbed()
                .setTitle("Произашло снятие мута")
                .setDescription(`${member} размьючен от пользователя ${interaction.user}`)
                .setColor(interaction.member.displayHexColor)
              ]
            })
          })
        } catch (error) {
          return interaction.reply({embeds: [
            new MessageEmbed()
              .setTitle("Ошибка")
              .setColor("#ff0000")
              .setDescription(`\`\`\`${error}\`\`\``)
            ], ephemeral: true})
          }
        },
    }