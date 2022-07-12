const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'guildMemberRemove',
    async execute(user, client) {
        client.channels.cache.get("936348496439701595")
            .send({embeds: [
                new MessageEmbed()
                    .setTitle(`🚪| Ушёл ${user.user.tag}`)
                    .setDescription(`Он ${user}`)
                    .setColor("#fc0000")
            ]
        }).catch(() => {})
        client.user.setActivity(`за ${user.guild.memberCount} участниками | Prefix /`, { type: 'WATCHING' });
 }
}