const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

const actions = new MessageActionRow()
    .addComponents(
        done = new MessageButton()
            .setLabel("Принять")
            .setCustomId("done")
            .setStyle("SUCCESS"),
        new MessageButton()
            .setLabel("Отклонить")
            .setCustomId("cancel")
            .setStyle("DANGER")
    )

module.exports = {
    data: new SlashCommandBuilder()
        .setName("mem")
        .setDescription("Отправить на проверку мем в #┌📽・лента")
        .addAttachmentOption(option => option.setName("attachment").setDescription("Какой мем предложить опубликовать?").setRequired(true))
        .addStringOption(option => option.setName("description").setDescription("Краткое описание вашего мема")),
    async execute(interaction, client) {
        const attachment = interaction.options.getAttachment("attachment").url
        const description = interaction.options.getString("description")

        if (description?.length >= 1024) return interaction.reply({content: `Описание мема не больше 1024 символов`, ephemeral: true})

        interaction.reply({
            embeds: [
                new MessageEmbed()
                    .setTitle(`**✔️ | Ваш мем отправлен на проверку**`)
                    .setColor("#22c9e6")
                    .setDescription(`${description || ""}`)
                    .setImage(`${attachment}`)
            ], ephemeral: true})

        const message = await client.channels.cache.get("976172721148944424").send({
            content: `<@&876059285593935922>, <@&876059772208709652>`,
            embeds: [new MessageEmbed()
                .setTitle(`🚬 **| Предложен мем от ${interaction.user.tag}**`)
                .setColor("#22c9e6")
                .addFields({ name: "**Его описание:**", value: `${description || "Отсутствует"}`, inline: false })
                .setImage(`${attachment}`)
            ], fetchReply: true, components: [actions]})

        const collector = message.createMessageComponentCollector({ 
            componentType: 'BUTTON',
            errors: ['time']
        });

        collector.on("collect", async (i) => {
            if (i.customId === "done") {
                i.update({
                    content: `<@&876059285593935922>, <@&876059772208709652>`,
                    embeds: [new MessageEmbed()
                        .setTitle(`🚬 **| Предложен мем от ${interaction.user.tag}**`)
                        .setColor("#22c9e6")
                        .addFields({ name: "**Его описание:**", value: `${description || "Отсутствует"}`, inline: false })
                        .setImage(`${attachment}`)],  
                    components: [new MessageActionRow()
                        .addComponents(
                            new MessageButton()
                                .setLabel(`Принято (от ${i.user.tag})`)
                                .setStyle("SUCCESS")
                                .setDisabled(true)
                                .setCustomId("done_xd"))
                        ],
                    fetchReply: true,
                })
                client.channels.cache.get("936661386019340348").send({
                    embeds: [
                        new MessageEmbed()
                            .setTitle(`**Мем от ${interaction.user.tag}**`)
                            .addFields({ name: "**Его описание:**", value: `${description || "Отсутствует"}`, inline: false })
                            .setImage(`${attachment}`)
                            .setColor("RANDOM")
                    ]
                })
                collector.stop();
            } if (i.customId === "cancel") {
                i.update({
                    content: `<@&876059285593935922>, <@&876059772208709652>`,
                    embeds: [new MessageEmbed()
                        .setTitle(`🚬 **| Предложен мем от ${interaction.user.tag}**`)
                        .setColor("#22c9e6")
                        .addFields({ name: "**Его описание:**", value: `${description || "Отсутствует"}`, inline: false })
                        .setImage(`${attachment}`)],  
                    components: [new MessageActionRow()
                        .addComponents(
                            new MessageButton()
                                .setLabel(`Отклонено (от ${i.user.tag})`)
                                .setStyle("DANGER")
                                .setDisabled(true)
                                .setCustomId("done_xd"))
                        ],
                    fetchReply: true,
                })
                collector.stop();
            }
        })
    }
}