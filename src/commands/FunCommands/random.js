const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed } = require('discord.js')
const cooldown = new Set();

module.exports = {
    data: new SlashCommandBuilder()
        .setName("random")
        .setDescription("Проверь свою удачу! Если тебе выпадет цифра 452 то ты получишь эксклюзивную роль на сервере"),
    async execute(interaction, client) {
        const random = Math.floor(Math.random() * 501)
        if (cooldown.has(interaction.user.id)) {
            return await interaction.reply({
                embeds: [new MessageEmbed()
                    .setTitle("**⚒️ | Перезарядка**")
                    .setDescription(`Проверять свою удачу можно только раз в 5 секунд <3`)
                  ], ephemeral: true })
                } else {
                    cooldown.add(interaction.user.id)
                        setTimeout(() => {
                            cooldown.delete(interaction.user.id)
                        }, 5000);
                if (interaction.member.roles.cache.some(role => role.id === "929407614532612186")) {
                    return await interaction.reply({content: "У вас иммунитет к участию.", ephemeral: true})
                } else if (random === 452) {
                        return await interaction.reply({
                            embeds: [new MessageEmbed()
                                .setTitle("Поздравляю! 🎉🎉🎉")
                                .setDescription(`${interaction.user}, тебе выпало число **452**!\nТы волшебник, в честь этого держи роль <@&929407614532612186>!`)
                                .setColor("#fc0000")
                            ]
                        }).then(() => {
                            interaction.member.roles.add("929407614532612186")
                        })
                    } else {
                        return await interaction.reply({
                            embeds: [new MessageEmbed()
                                .setDescription(`Выпадает число: **${random}**.\nПовезёт в следующий раз!`)
                                .setColor((await client.users.fetch(interaction.user.id, {force: true})).hexAccentColor)
                            ]
                        })
                    }
               }
            }
        }