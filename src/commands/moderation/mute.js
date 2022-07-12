const { MessageEmbed } = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
    		.setName('mute')
    		.setDescription('Закроет доступ ко всем каналам сервера участнику')
    		.addUserOption(option => option.setName('member').setDescription('Укажи кому выдать мут').setRequired(true))
    		.addStringOption(option => option.setName('reason').setDescription("Что он натворил?").setRequired(true))
    		.addIntegerOption(option => option.setName('time').setDescription('Время мута указывать в минутах').setRequired(true)),
	async execute(interaction) {
		const member = interaction.options.getMember('member')
		const reason = interaction.options.getString('reason')
		const time = interaction.options.getInteger('time')
	try {
	  await member.timeout(time * 60 * 1000 + 10000, reason)
	  	.then(() => {
			interaction.reply({embeds: [new MessageEmbed()
				.setAuthor({ name: member.user.tag, iconURL: member.user.displayAvatarURL()})
				.setDescription(`${interaction.user} дал мут ${member} на ${time} мин.\n\n**Причина:** ${reason}`) 
				.setColor(interaction.member.displayHexColor)
					]
				})
		  }
		)
	} catch (error) {
	  	return await interaction.reply({embeds: [
			  new MessageEmbed()
					.setTitle("Ошибка")
					.setColor("#ff0000")
					.setDescription(`Я не могу замутить ${member}:\n\`\`\`${error}\`\`\``)
				], ephemeral: true})
			}
	},
};