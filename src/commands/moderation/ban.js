const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
      .setName("ban")
      .setDescription("Забанить участника")
      .addUserOption(option => option.setName("member").setDescription("Укажи участника которого нужно забанить").setRequired(true))
      .addStringOption(option => option.setName('reason').setDescription("Причина бана"))
      .addIntegerOption(option => option.setName("clear-messages").setDescription("Переод скольких дней очистить сообщения пользователя? (1-7д лимит)")),
    async execute(interaction, client) {
      const member = interaction.options.getMember("member")
      const reason = interaction.options.getString("reason")
      const clear_messages = interaction.options.getInteger("clear-messages")
    try {
      if (0 > clear_messages || clear_messages > 7) return interaction.reply({content: "вась лимит 1-7 дней", ephemeral: true});
      (await client.users.fetch(member.id)).send({
        embeds: [new MessageEmbed()
          .setTitle(`🔨 | Вы были забанены на **${interaction.guild.name}**`)
          .setDescription(`О-паньки!?!?! Желаете вернуться на сервер? Тогда свяжитесь с модератором давший пермач.\n\n**Модератор:** ${interaction.user}\n**Причина:** ${reason || "Не указана."}`)
          .setColor("#ff0000")
        ]
      }).catch(() => {})
      
      await member.ban({
        reason: reason || "Сын шлюхи",
        days: clear_messages || 0
      }).then(() => interaction.reply({
          embeds: [new MessageEmbed()
              .setAuthor({ name: `${member.user.tag}`, iconURL: member.displayAvatarURL()})
              .setTitle(`Был забанен ${member.displayName}.`)
              .setDescription(`**Причина:** ${reason || "Не установлена."}\n**Дни очистки сообщений:** \`${clear_messages || "0"}\``)
              .setColor(interaction.member.displayHexColor)
          ]
        })
      )
    } catch (error) {
      return interaction.reply({embeds: [
          new MessageEmbed()
              .setTitle("Ошибка")
              .setColor("#ff0000")
              .setDescription(`Я не могу забанить ${member}:\n\`\`\`${error}\`\`\``)
            ], ephemeral: true})
        }
    }
}