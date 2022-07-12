const { MessageEmbed, Interaction } = require('discord.js')

module.exports = {
    name: "modalSubmit",
    async execute(modal, client) {
        if (modal.customId === "modal") {
            await modal.deferReply({ ephemeral: true })
            const name = modal.getTextInputValue('name')
            const age = modal.getTextInputValue("age")
            const server = modal.getTextInputValue("server")
            const hours = modal.getTextInputValue("hours")
            const experience = modal.getTextInputValue("experience")
            await modal.editReply({
                embeds: [new MessageEmbed()
                    .setTitle("**☑️ | Ваша заявка отправлена**")
                    .setColor("#3299db")
                ]
            })
            client.channels.cache.get("876518528012931072").send({
               embeds: [
                   new MessageEmbed()
                        .setAuthor({ name: modal.guild.name, iconURL: modal.guild.iconURL() })
                        .setTitle(`**🛠️ | Заявка на модератора от ${modal.user.tag}**`)
                        .setDescription(`**Как зовут?**\n> ${name}\n**Сколько лет?**\n> ${age}\n**Как хорошо знает правила и сам сервер?**\n> ${server}\n**Сколько часов в неделю готов уделять серверу?**\n> ${hours}\n**Был ли у него опыт модерирования? Если да то какой?**\n> ${experience}`)
                        .setColor("#3299db")
                ]
            })
        }
    }
}