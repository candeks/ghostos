const { ContextMenuCommandBuilder } = require('@discordjs/builders')
const { ApplicationCommandType } = require("discord-api-types/v9");
const { MessageEmbed } = require('discord.js');
const moment = require('moment')

module.exports = {
    data: new ContextMenuCommandBuilder()
        .setName("delete")
        .setType(ApplicationCommandType.Message),
    async execute(interaction) {
      try {
        await interaction.targetMessage.delete()
            .then(() => interaction.reply({
              content: "☑️",
              ephemeral: true
            })
          )
      } catch (error) {
        return interaction.reply({
          content: `\`\`\`${error}\`\`\``
        })
      }
    }
  }