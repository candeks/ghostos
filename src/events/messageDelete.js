const { MessageEmbed, Interaction } = require('discord.js')
const moment = require('moment')

module.exports = {
    name: "messageDelete",
    async execute(msg) {
        if (msg.channel.id === "936348496439701595" || msg.channel.id === "978583170440101898") return;
        msg.client.channels.cache.get("936348496439701595").send({
            embeds: [new MessageEmbed()
              .setAuthor({iconURL: msg.guild.iconURL(), name: msg.guild.name })
              .setTitle("❌ | Удалено сообщение")
              .setDescription(`В канале ${msg.channel} было удалено сообщение.`)
              .addFields(
                { name: "**Автор сообщения**", value: `${msg.author}`, inline: false },
                { name: "**Контент сообщения**", value: `\`\`\`${msg.content}\`\`\``, inline: false },
                { name: "**Дата сообщения**", value: `<t:${moment(msg.createdAt).unix()}>`, inline: false }
              )
              .setColor("#3299db") 
            ]
        }).catch(() => {});
    }
} 