const { ContextMenuCommandBuilder } = require('@discordjs/builders')
const { ApplicationCommandType } = require("discord-api-types/v9");
const { MessageEmbed } = require('discord.js');
const moment = require('moment')

module.exports = {
    data: new ContextMenuCommandBuilder()
        .setName("user-info")
        .setType(ApplicationCommandType.User),
    async execute(interaction, client) {
        const target = await interaction.guild.members.fetch(interaction.targetMember)
            interaction.reply({embeds: [
                new MessageEmbed()
                    .setAuthor({ iconURL: target.user.displayAvatarURL({ dynamic: true }), name: `Информация о ${target.user.tag}`})
                    .setThumbnail((await client.users.fetch(target.id, {force: true})).displayAvatarURL({ dynamic: true }))
                    .setColor((await client.users.fetch(target.id, {force: true})).hexAccentColor)
                    .setImage((await client.users.fetch(target.id, {force: true})).bannerURL({ size: 4096, dynamic: true }))
                    .addFields(
                            { name: "**Дата регистрации:**", value: `<t:${moment(target.user.createdAt).unix()}>`, inline: false},
                            { name: "**Присоединился:**", value: `<t:${moment(target.joinedAt).unix()}>`, inline: false}
                          )
                ], ephemeral: true
        }).then(() => {
            client.channels.cache.get("936348496439701595").send({
                content: `${interaction.user} использовал \`user-info\` против ${target.user}`
            })
        })
    }
}