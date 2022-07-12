const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("role")
        .setDescription("Выдает или уберает определённую роль определённому участнику")
        .addUserOption(option => option.setName("member").setDescription("Какому участнику выдать или убрать роль?").setRequired(true))
        .addRoleOption(option => option.setName("role").setDescription("Какую роль выдать или убрать?").setRequired(true)),
    async execute(interaction) {
      const member = interaction.options.getMember("member")
      const role_mention = interaction.options.getRole("role")
        if (role_mention.id === "876059285593935922") return;
        if (member.roles.cache.some(role => role.id === role_mention.id)) {
          return member.roles.remove(role_mention.id).then(() => {
            interaction.reply({
              embeds: [new MessageEmbed()
                .setTitle("**Убрана роль**")
                .setDescription(`Участнику ${member} убрана роль "<@&${role_mention.id}>"`)
                .setColor(interaction.member.displayHexColor)
              ]
            })
          })
        } else {
          return member.roles.add(role_mention.id).then(() => {
            interaction.reply({
              embeds: [new MessageEmbed()
                .setTitle("**Выдана роль**")
                .setDescription(`Участнику ${member} добавлена роль "<@&${role_mention.id}>"`)
                .setColor(interaction.member.displayHexColor)
              ]
            })
          })
        }
    }
}