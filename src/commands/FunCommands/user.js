const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const moment = require('moment')

module.exports = {
    data: new SlashCommandBuilder()
     .setName("user")
     .setDescription("Подробная информация о пользователе")
     .addUserOption(option => option.setName("id").setDescription("Индефикатор пользователя"))
     .addStringOption(option =>
      option.setName("ephemeral")
          .setDescription("Отправить эфемерно")
          .addChoices({ name: "true", value: "true"})),
    async execute(interaction, client) { 
         const member_stats = interaction.options.getMember("id");
         const user_stats = interaction.options.getUser("id") || interaction.user;
         const embed = new MessageEmbed()
                .setAuthor({ iconURL: user_stats.displayAvatarURL({ dynamic: true }), name: `Информация о ${user_stats.tag}`})
                .setThumbnail((await client.users.fetch(user_stats.id, {force: true})).displayAvatarURL({ dynamic: true }))
                .setColor((await client.users.fetch(user_stats.id, {force: true})).hexAccentColor)
                .setImage((await client.users.fetch(user_stats.id, {force: true})).bannerURL({ size: 2048, dynamic: true }))
        let reply = false;
        if (interaction.options.getString("ephemeral") === "true") reply = true;

        try {
          if ((await interaction.guild.members.fetch(member_stats.id, {force: true}))) {
            return interaction.reply({embeds: [
                embed
                  .addFields(
                    { name: "**Дата регистрации**:", value: `<t:${moment(user_stats.createdAt).unix()}>`, inline: false},
                    { name: "**Присоединился**:", value: `<t:${moment(member_stats.joinedAt).unix()}>`, inline: false}
                  )
              ], ephemeral: reply});
          }
        } catch {
          if (interaction.options.getUser("id")) {
            return interaction.reply({embeds: [
                embed.addField("**Дата регистрации**:", `<t:${moment(user_stats.createdAt).unix()}>`, false)
            ], ephemeral: reply});
        } else {
            return interaction.reply({embeds: [
              embed
                  .addFields(
                    { name: "**Дата регистрации**:", value: `<t:${moment(interaction.user.createdAt).unix()}>`, inline: false},
                    { name: "**Присоединился**:", value: `<t:${moment(interaction.member.joinedAt).unix()}>`, inline: false}
                  )
              ], ephemeral: reply});
        }
      } finally {
        if (reply === true) return client.channels.cache.get("953370553673216000").send(`${interaction.user} использовал \`${interaction.commandName}\``)
      }
    }
}