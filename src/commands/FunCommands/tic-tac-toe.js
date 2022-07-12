const { MessageEmbed, MessageActionRow, MessageButton, ButtonInteraction } = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("xo")
        .setDescription("Играть в крестики-нолики с кем-то")
        .addUserOption(option => option.setName("user").setDescription("С кем сыграть?").setRequired(true)),
    async execute(interaction, client) {
        let button_1 = new MessageButton()
                    .setCustomId("1")
                    .setLabel(" ")
                    .setStyle("SECONDARY")
        let button_2 = new MessageButton()
                    .setCustomId("2")
                    .setLabel(" ")
                    .setStyle("SECONDARY")
        let button_3 = new MessageButton()
                    .setCustomId("3")
                    .setLabel(" ")
                    .setStyle("SECONDARY")
        let button_4 = new MessageButton()
                    .setCustomId("4")
                    .setLabel(" ")
                    .setStyle("SECONDARY")
        let button_5 = new MessageButton()
                    .setCustomId("5")
                    .setLabel(" ")
                    .setStyle("SECONDARY")
        let button_6 = new MessageButton()
                    .setCustomId("6")
                    .setLabel(" ")
                    .setStyle("SECONDARY")
        let button_7 = new MessageButton()
                    .setCustomId("7")
                    .setLabel(" ")
                    .setStyle("SECONDARY")
        let button_8 = new MessageButton()
                    .setCustomId("8")
                    .setLabel(" ")
                    .setStyle("SECONDARY")
        let button_9 = new MessageButton()
                    .setCustomId("9")
                    .setLabel(" ")
                    .setStyle("SECONDARY")
                    
        const line_1 = new MessageActionRow()
            .addComponents(button_1, button_2, button_3)

        const line_2 = new MessageActionRow()
            .addComponents(button_4, button_5, button_6)

        const line_3 = new MessageActionRow()
            .addComponents(button_7, button_8, button_9)

        const user = interaction.options.getUser("user")

        if (user.id === interaction.user.id) {
            return interaction.reply({content: "С собой нельзя играть, к сожалению", ephemeral: true})
        }

        const message = await interaction.reply({content: `${user} вам ${interaction.user} предлагает сыграть в крестики-нолики.`, embeds: [
            new MessageEmbed()
                .setTitle("**🎲 | Крестики-нолики**")
                .setDescription("Используйте кнопки как игровое поле.")
                .setColor("#3299db")
                .addFields({ name: "Ходит:", value: String(user), inline: true})
        ], components: [line_1, line_2, line_3], fetchReply: true})

        const collector = message.createMessageComponentCollector({ 
            componentType: 'BUTTON',
            time: 600000, 
            errors: ['time']
        })

        let reply = user; 

        collector.on("collect", async(i) => {
            if (i.user.id === reply.id && i.customId) { 
                    if (i.customId === "1") {
                        if (reply.id === interaction.user.id) {
                            button_1.setStyle("SUCCESS").setDisabled(true)
                        } else if (reply.id === user.id) {
                            button_1.setStyle("DANGER").setDisabled(true)
                        }
                    } else if (i.customId === "2") {
                        if (reply.id === interaction.user.id) {
                            button_2.setStyle("SUCCESS").setDisabled(true)
                        } else if (reply.id === user.id) {
                            button_2.setStyle("DANGER").setDisabled(true)
                        }
                    } else if (i.customId === "3") {
                        if (reply.id === interaction.user.id) {
                            button_3.setStyle("SUCCESS").setDisabled(true)
                        } else if (reply.id === user.id) {
                            button_3.setStyle("DANGER").setDisabled(true)
                        }
                    } else if (i.customId === "4") {
                        if (reply.id === interaction.user.id) {
                            button_4.setStyle("SUCCESS").setDisabled(true)
                        } else if (reply.id === user.id) {
                            button_4.setStyle("DANGER").setDisabled(true)
                        }
                    } else if (i.customId === "5") {
                        if (reply.id === interaction.user.id) {
                            button_5.setStyle("SUCCESS").setDisabled(true)
                        } else if (reply.id === user.id) {
                            button_5.setStyle("DANGER").setDisabled(true)
                        }
                    } else if (i.customId === "6") {
                        if (reply.id === interaction.user.id) {
                            button_6.setStyle("SUCCESS").setDisabled(true)
                        } else if (reply.id === user.id) {
                            button_6.setStyle("DANGER").setDisabled(true)
                        }
                    } else if (i.customId === "7") {
                        if (reply.id === interaction.user.id) {
                            button_7.setStyle("SUCCESS").setDisabled(true)
                        } else if (reply.id === user.id) {
                            button_7.setStyle("DANGER").setDisabled(true)
                        }
                    } else if (i.customId === "8") {
                        if (reply.id === interaction.user.id) {
                            button_8.setStyle("SUCCESS").setDisabled(true)
                        } else if (reply.id === user.id) {
                            button_8.setStyle("DANGER").setDisabled(true)
                        }
                    } else if (i.customId === "9") {
                        if (reply.id === interaction.user.id) {
                            button_9.setStyle("SUCCESS").setDisabled(true)
                        } else if (reply.id === user.id) {
                            button_9.setStyle("DANGER").setDisabled(true)
                        }
                    }  
                    if (i.user.id === user.id) {
                        reply = interaction.user
                    } else if (i.user.id === interaction.user.id) {
                        reply = user
                    }
                    if (button_1.style === "SUCCESS" && button_4.style === "SUCCESS" && button_7.style === "SUCCESS" ||
                        button_2.style === "SUCCESS" && button_5.style === "SUCCESS" && button_8.style === "SUCCESS" ||
                        button_3.style === "SUCCESS" && button_6.style === "SUCCESS" && button_9.style === "SUCCESS" ||
                        button_1.style === "SUCCESS" && button_2.style === "SUCCESS" && button_3.style === "SUCCESS" ||
                        button_4.style === "SUCCESS" && button_5.style === "SUCCESS" && button_6.style === "SUCCESS" ||
                        button_7.style === "SUCCESS" && button_8.style === "SUCCESS" && button_9.style === "SUCCESS" ||
                        button_1.style === "SUCCESS" && button_5.style === "SUCCESS" && button_9.style === "SUCCESS" ||
                        button_3.style === "SUCCESS" && button_5.style === "SUCCESS" && button_7.style === "SUCCESS") {
                            i.update({
                                content: null,
                                embeds: [
                                    new MessageEmbed()
                                        .setTitle("**🎲 | Крестики-нолики**")
                                        .setDescription(`Игра окончена. Победитель: ${interaction.user}`)
                                        .setColor("#3299db")
                                ],
                                components: [line_1, line_2, line_3], fetchReply: true
                            })
                            return collector.stop()
                  } else if (button_1.style === "DANGER" && button_4.style === "DANGER" && button_7.style === "DANGER" ||
                        button_2.style === "DANGER" && button_5.style === "DANGER" && button_8.style === "DANGER" ||
                        button_3.style === "DANGER" && button_6.style === "DANGER" && button_9.style === "DANGER" ||
                        button_1.style === "DANGER" && button_2.style === "DANGER" && button_3.style === "DANGER" ||
                        button_4.style === "DANGER" && button_5.style === "DANGER" && button_6.style === "DANGER" ||
                        button_7.style === "DANGER" && button_8.style === "DANGER" && button_9.style === "DANGER" ||
                        button_1.style === "DANGER" && button_5.style === "DANGER" && button_9.style === "DANGER" ||
                        button_3.style === "DANGER" && button_5.style === "DANGER" && button_7.style === "DANGER") {
                            i.update({
                                content: null,
                                embeds: [
                                    new MessageEmbed()
                                        .setTitle("**🎲 | Крестики-нолики**")
                                        .setDescription(`Игра окончена. Победитель: ${user}`)
                                        .setColor("#3299db")
                                ],
                                components: [line_1, line_2, line_3], fetchReply: true
                            })
                            return collector.stop()
                    } else if (button_1.style !== "SECONDARY" && 
                            button_2.style !== "SECONDARY"&& 
                            button_3.style !== "SECONDARY"&& 
                            button_4.style !== "SECONDARY"&& 
                            button_5.style !== "SECONDARY"&& 
                            button_6.style !== "SECONDARY"&& 
                            button_7.style !== "SECONDARY"&& 
                            button_8.style !== "SECONDARY"&&
                            button_9.style !== "SECONDARY") {
                                i.update({
                                    content: null,
                                    embeds: [
                                        new MessageEmbed()
                                            .setTitle("**🎲 | Крестики-нолики**")
                                            .setDescription(`Игра окончена. Ничья.`)
                                            .setColor("#3299db")
                                    ],
                                    components: [line_1, line_2, line_3], fetchReply: true
                                })
                                return collector.stop()
                            }
                    await i.update({
                        content: null,
                        embeds: [
                            new MessageEmbed()
                                .setTitle("**🎲 | Крестики-нолики**")
                                .setDescription("Используйте кнопки как игровое поле.")
                                .setColor("#3299db")
                                .addFields({ name: "Ходит:", value: String(reply), inline: true})
                        ], components: [line_1, line_2, line_3], fetchReply: true})  
                } else {
                    return i.reply({
                        content: "Сейчас не Ваш ход или Вы не участвуете вовсе.",
                        ephemeral: true
                    })
            }
        })
    }
}