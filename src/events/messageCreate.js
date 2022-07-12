const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'messageCreate',
    async execute(msg) {
        if (msg.channel.id === "905736308587122709") {
            if (msg.author.id === "875371082880786473") return;
            await msg.delete().then(() => {
                msg.channel.send({
                    embeds: [new MessageEmbed()
                        .setAuthor({
                            iconURL: msg.guild.iconURL(),
                            name: msg.guild.name
                        })
                        .setTitle(`📝 | Идея от ${msg.author.tag}`)
                        .setDescription(msg.content)
                        .setColor("#3299db")
                    ]
                }).then((message) => {
                    message.startThread({
                        name: 'Обсуждение',
                        autoArchiveDuration: 60,
                        reason: `Идея от ${message.author.tag}`,
                    }).catch(() => {});
                })
            }).catch(() => {})
        }
    }
} 