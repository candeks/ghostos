const { MessageEmbed } = require('discord.js');
const moment = require("moment")

module.exports = {
    name: "messageUpdate",
    async execute(oldMessage, newMessage) {
        if (oldMessage.author.bot || "") return;
        oldMessage.client.channels.cache.get("936348496439701595").send({
            embeds: [new MessageEmbed()
              .setAuthor({iconURL: oldMessage.guild.iconURL(), name: oldMessage.guild.name})
              .setTitle("📝 | Изменено сообщение")
              .setDescription(`В канале ${oldMessage.channel} было изменено сообщение.`)
              .addFields(
                { name: "**Автор сообщения**", value: `${newMessage.author}`, inline: false },
                { name: "**Старое содержимое**", value: `\`\`\`${oldMessage.content}\`\`\``, inline: false },
                { name: "**Новое содержимое**", value: `\`\`\`${newMessage.content}\`\`\``, inline: false },
                { name: "**Дата изменения**", value: `<t:${moment(newMessage.createdAt).unix()}>`, inline: false}
              )
              .setColor("#3299db")
            ]
        }).catch(() => {});
    }
}  