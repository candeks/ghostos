const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
      .setName("clear")
      .setDescription("Очистить сообщения в канале")
      .addIntegerOption(option => option.setName('count').setDescription("Укажи сколько сообщений нужно удалить в канале. От 1 до 99").setRequired(true))
      .addUserOption(option => option.setName("user").setDescription("От какого пользователя удалить сообщения?").setRequired(false)),
    async execute(interaction) {
         const count = Number.parseInt(interaction.options.getInteger("count"))
         const user = interaction.options.getUser("user")
      if (count < 1 || count > 100) {
          return interaction.reply({content: "Укажи число от 1 до 100", ephemeral: true})
      } else if (user) {
            const filter = (await interaction.channel.messages.fetch({ limit: count })).filter((m) => m.author.id === user.id)
              await interaction.channel.bulkDelete(filter, true).then(messages => {
                interaction.reply({content: `Clear ${messages.size} messages from ${user}`}).then(() => {
                  setTimeout(() => {
                    interaction.deleteReply()
                      .catch(() => {})
                }, 5000)
              })
            })
          } else {
              await interaction.channel.bulkDelete(count, true).then(messages => {
                interaction.reply({content: `Clear ${messages.size} messages`}).then(() => {
                  setTimeout(() => {
                    interaction.deleteReply()
                      .catch(() => {})
                }, 5000)
              }
            )
          }
        )
      }
    } 
  }