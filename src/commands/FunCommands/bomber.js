const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders');
const plural = require('plural-ru')
const cooldown = new Set();

module.exports = {
  data: new SlashCommandBuilder()
      .setName("bomber")
      .setDescription("Пингает определенного пользователя n раз")
      .addUserOption(option => option.setName("user").setDescription("Кому запустить бомбер?").setRequired(true))
      .addIntegerOption(option => option.setName("count").setDescription("Сколько раз упомянуть пользователя? Ограничение 100 раз.").setRequired(true))
      .addStringOption(option => option.setName("text").setDescription("каким текстом его уничтожить?").setRequired(true)),
  async execute(interaction, client) {
  const user = interaction.options.getUser("user")
  const count = interaction.options.getInteger("count")
  const string = interaction.options.getString("text")
  let stop = false;

      if (count > 100 || count <= 0) {
        return interaction.reply({
          content: "Все-таки, мне за него тоже страшно будет, так что выбери число не больше 100 и не меньше нуля"
        })
      } else if (string.length > 2000) {
        return interaction.reply({
          content: "Я технически не могу отправить такой текст, так как он содержит больше 2к символов"
        })
      } else {
        if (cooldown.has(interaction.user.id)) {
          return interaction.reply({
            embeds: [new MessageEmbed()
              .setTitle("**⚒️ | Перезарядка**")
              .setDescription(`Следующий бомбер можно запустить <t:${60 + Date.now() / 1000 | 0}:R> после ввода первоначального бомбера.`)
            ], ephemeral: true
          }) 
        } else {
         cooldown.add(interaction.user.id)
          setTimeout(() => {
            cooldown.delete(interaction.user.id)
          }, 60000);

          const stop_button = new MessageActionRow()
              .addComponents(
                new MessageButton() 
                  .setStyle("DANGER")
                  .setLabel(`Завершить досрочно`)
                  .setEmoji("<:stop:963452446594703461>") 
                  .setCustomId("stop_button"))
          const stop_xd = new MessageActionRow()
              .addComponents( 
                new MessageButton() 
                  .setStyle("DANGER")
                  .setLabel(`Завершено`)
                  .setEmoji("<:success:963452456984006736>") 
                  .setCustomId("stop")
                  .setDisabled(true))
              
      const message = await interaction.reply({
         embeds: [new MessageEmbed()
           .setTitle("**💣 | Запущен бомбер**")
           .addFields(
              { name: "**Пользователь:**", value: user.toString(), inline: true},
              { name: "**Количество бомб:**", value: count.toString(), inline: true}
           )
           .setColor("#257bc9")
           ], components: [stop_button], fetchReply: true})

       const filter = i => i.customId === 'stop_button' && i.user.id === interaction.user.id;
       const collector = message.createMessageComponentCollector({ filter, time: (count + client.ws.ping) * 1000, max: 1, errors: ['time'] });
       const amount = count
       let i = count

       collector.on('collect', async (bomber) => {
        stop = true; 
         return bomber.update({ 
           embeds: [new MessageEmbed()
             .setTitle("**Рассылка закончена**")
             .addFields(
              { name: "**Пользователь:**", value: user.toString(), inline: true},
              { name: "**Количество бомб:**", value: count.toString(), inline: true}
            )
            .setFooter({ text: `Было выслано ${amount - i + 1} ${plural(amount - i + 1, "бомба", "бомбы", "бомб")}`})
            .setColor("RANDOM")
          ], components: [stop_xd]})
       });

       const sleep = (ms = 1000) => {
         return new Promise(r => setTimeout(() => r(true), ms)) 
       }
     
         for (; i > 0 && !stop; i--) {
                await sleep();
                await client.channels.cache.get("942838131617579029").send({  
                  content: `${user}`,
                  embeds: [new MessageEmbed()
                     .setDescription(`${string}`)
                     .setFooter({ text: `${plural(i-1, "остался ", "осталось ", "осталось ") + 
                     `${i-1}` + plural(i-1, " пинг", " пинга", " пингов")}`})
                     .setColor("#2F3136")
                 ],
               }).catch(() => {})
         } 

           await client.channels.cache.get("942838131617579029").send({content: "**=========END=========**"})
            if (stop === false) {
              await interaction.editReply({
                embeds: [new MessageEmbed()
                   .setTitle("**Рассылка закончена**")
                   .addFields(
                     { name: "**Пользователь:**", value: user.toString(), inline: true},
                     { name: "**Количество бомб:**", value: count.toString(), inline: true}
                   )
                   .setFooter({ text: `Было выслано все ${amount} ${plural(amount, "бомба", "бомбы", "бомб")}`})
                   .setColor("RANDOM")
                  ], components: [stop_xd]}).catch(() => {});
             }
          }
        }
      }
    }


