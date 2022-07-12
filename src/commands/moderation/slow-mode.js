const { MessageEmbed } = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("slow-mode")
        .setDescription("Устанавливает медленный режим на канал")
        .addIntegerOption(option => option.setName("interval").setDescription("Сколько секунд поставить ограничение на этот канал").setRequired(true)),
    async execute(interaction) {
    const interval = interaction.options.getInteger("interval")
    if (interval > 21600 || interval < 0) return interaction.reply({content: "Не больше 21600 секунд и не меньше 0 секунд", ephemeral: true})

    interaction.channel.setRateLimitPerUser(interval, "").then(() => {
      interaction.reply({embeds: [new MessageEmbed()
                    .setDescription(`Для канала <#${interaction.channel.id}> выставлен медленный режим с интервалом \`${interaction.channel.rateLimitPerUser}\` сек.`)
                  ]
                })
    })
    }
}