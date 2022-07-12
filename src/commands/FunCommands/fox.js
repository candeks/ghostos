const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
    .setName("fox")
    .setDescription("Покажет случайную лисичку"),
    async execute(interaction) {
            await interaction.reply({
              embeds: [new MessageEmbed()
                  .setImage(`https://randomfox.ca/images/${Math.floor(Math.random() * 122)}.jpg`)
                  .setColor(interaction.member.displayHexColor)
                ]
              })
            }
          } 