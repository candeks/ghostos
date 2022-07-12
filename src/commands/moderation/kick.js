const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
   data: new SlashCommandBuilder()
      .setName("kick")
      .setDescription("Выгнать участника")
      .addUserOption(option => option.setName("member").setDescription("Укажи участника которого нужно выгнать").setRequired(true))
      .addStringOption(option => option.setName("reason").setDescription("Какая причина?")),
   async execute(interaction, client) {
    const member = interaction.options.getMember("member")
    const reason = interaction.options.getString("reason")
      try {
        (await client.users.fetch(member.id)).send({
          embeds: [new MessageEmbed()
            .setTitle(`🔨 | Вы были кикнуты на **${interaction.guild.name}**`)
            .setDescription(`**Модератор:** ${interaction.user}\n**Причина:** ${reason || "Не установлена."}`)
            .setColor("#ff0000")
          ]
        }).catch(() => {})

        await member.kick(reason || "Сын шлюхи").then(() => {
          interaction.reply({embeds: [new MessageEmbed()
            .setAuthor({ name: member.user.tag, iconURL: member.displayAvatarURL()})
            .setTitle(`Был выгнан ${member.displayName}.`)
            .setDescription(`**Причина:** ${reason || "Не установлена."}`)
            .setColor(interaction.member.displayHexColor)]})
        })
      } catch (error) {
        return interaction.reply({embeds: [
          new MessageEmbed()
            .setTitle("Ошибка")
            .setColor("#ff0000")
            .setDescription(`Я не могу выгнать ${member}:\n\`\`\`${error}\`\`\``)
          ], ephemeral: true})
      }
   },
}