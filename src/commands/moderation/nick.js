const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

 module.exports = {
    data: new SlashCommandBuilder()
          .setName("nick")
          .setDescription("Изменит никнейм пользователю")
          .addUserOption(option => option.setName("member").setDescription("Укажи пользователя которому нужно изменить никнейм").setRequired(true))
          .addStringOption(option => option.setName("nickname").setDescription(`Укажи никнейм`).setRequired(true)),
    async execute(interaction) {
    const member = interaction.options.getMember('member')
    const nickname = interaction.options.getString("nickname")
    const old_nick = member.displayName
    if (nickname.length > 32) {
      return interaction.reply({content: "Длина никнейма должна быть не больше 32 символа", ephemeral: true})
    }
    try {
      await member.setNickname(nickname).then(() => {
        interaction.reply({embeds: [
          new MessageEmbed()
            .setTitle("Изменен никнейм")
            .setDescription(`Участнику ${member} изменен никнейм на \`${nickname}\`\n\n**Прошлый никнейм:** ${old_nick}\n**Moderator:** ${interaction.user}`)
            .setColor(interaction.member.displayHexColor)
              ]
          })
        }
      )
    } catch (error) {
      return interaction.reply({embeds: [
        new MessageEmbed()
          .setTitle("Ошибка")
          .setColor("#ff0000")
          .setDescription(`Я не могу изменить никнейм ${member}:\n\`\`\`${error}\`\`\``)
        ], ephemeral: true})
    }
    },
 }