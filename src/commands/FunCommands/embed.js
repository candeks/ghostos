const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
         .setName("embed")
         .setDescription("Создаст эмбед")
         .addStringOption(option => option.setName("автор").setDescription("author"))
         .addStringOption(option => option.setName("заголовок").setDescription("title"))
         .addStringOption(option => option.setName("описание").setDescription("discriprion"))
         .addStringOption(option => option.setName("миниатюра").setDescription("thumbnail"))
         .addStringOption(option => option.setName("изображение").setDescription("image"))
         .addStringOption(option => option.setName("подвал").setDescription("footer"))
         .addStringOption(option => option.setName("hex").setDescription("hex"))
         .addStringOption(option => option.setName("изображение-подвала").setDescription("footer_image"))
         .addStringOption(option => option.setName("изображение-автора").setDescription("author_image")),
    async execute(interaction, client) {
        client.channels.cache.get("936348496439701595").send({content: `${interaction.user} used \`embed\``})
        const title = interaction.options.getString("заголовок")
        const description = interaction.options.getString("описание")
        const hex = interaction.options.getString("hex")
        const thumbnail = interaction.options.getString("миниатюра")
        const author_image = interaction.options.getString("изображение-автора")
        const footer = interaction.options.getString("подвал")
        const footer_image = interaction.options.getString("изображение-подвала")
        const image = interaction.options.getString("изображение")
        const author = interaction.options.getString("автор")
        const customEmbed = new MessageEmbed()
        .setTitle(`${title || ""}`)
        .setAuthor({ name: `${author || ""}`, iconURL: `${author_image || ""}`})
        .setFooter({ text: `${footer || ""}`, iconURL: `${footer_image || ""}`})
        .setColor(`${hex || '#00000000'}`)
        .setThumbnail(`${thumbnail || ""}`)
        .setImage(`${image || ""}`)
        if (!title && !description && !hex && !thumbnail && !author_image && !footer && !footer_image && !image && !author) return interaction.reply({content: `Вы не указали параметры!`})
        if (!title && !description && !thumbnail && !author_image && !footer && !footer_image && !image && !author) {
          return interaction.reply({content: "Нельзя создать эмбед с цветом, но без содержания"})
        }
        if (!description) {
          return interaction.reply({content: `embed create`, ephemeral: true}).then(() => {
            interaction.channel.send({embeds: [customEmbed.setDescription("")]}).catch(() => {});
          })
         }
  
        if (description.includes("\n") || description) {
          return interaction.reply({content: `embed create`, ephemeral: true}).then(() => {
            interaction.channel.send({embeds: [customEmbed.setDescription(`${description.replace(/\\n/g, "\n")||description}`)
          ]
        }).catch(() => {});
      })
   }
    }
}