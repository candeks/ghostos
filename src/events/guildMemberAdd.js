const { MessageEmbed } = require('discord.js')
const moment = require("moment")

module.exports = {
    name: 'guildMemberAdd',
    async execute(user_add, client) {
    const embed = new MessageEmbed()
            .setAuthor({ iconURL: client.guilds.cache.get("876058982609989654").iconURL(), name: `У нас новый участник!`})
            .setThumbnail(user_add.displayAvatarURL({dynamic: true }))
            .setColor((await client.users.fetch(user_add.user.id, {force: true})).hexAccentColor || "#3299db")
            .setDescription(`Здравствуй, ${user_add.user} <:love:963452435123277905>\nРады тебя видеть на сервере **${user_add.guild.name}!**\nОзнакомься с <#876516812483870741>**!**`) 
            .addFields(
                { name: "**Дата регистрации:**", value: `<t:${moment(user_add.user.createdAt).unix()}>`, inline: true},
                { name: "**По счёту:**", value: `${user_add.guild.memberCount} участник!`, inline: true}
            )
                user_add.roles.add("972195264720957550").catch(() => {});
                client.user.setActivity(`за ${user_add.guild.memberCount} участниками | Prefix /`, { type: 'WATCHING' });
                if ((await client.users.fetch(user_add.user.id, {force: true})).bannerURL()) {
                    return client.channels.cache.get("876540658519781386")
                        .send({
                            content: `${user_add.user}`,
                            embeds: [embed.setImage((await client.users.fetch(user_add.user.id, {force: true})).bannerURL({ size: 4096, dynamic: true })), 
                                new MessageEmbed()
                                    .setColor((await client.users.fetch(user_add.user.id, {force: true})).hexAccentColor || "#3299db")
                                    .setImage("https://cdn.discordapp.com/attachments/953370553673216000/959878345431060520/IMG_5110.png")
                            ]
                        }).catch(() => {}) 
                    } else {
                        return client.channels.cache.get("876540658519781386")
                        .send({
                            content: `${user_add.user}`,
                            embeds: [
                                embed.setImage("https://cdn.discordapp.com/attachments/953370553673216000/959878345431060520/IMG_5110.png")
                            ]
                        }).catch(() => {})
                    }
                }
}