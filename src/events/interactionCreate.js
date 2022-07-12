const { MessageEmbed } = require('discord.js')

module.exports = {
	name: 'interactionCreate',
	async execute(interaction, client) {

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction, client);
	} catch (error) {
		await interaction.reply({ 
			embeds: [new MessageEmbed()
				.setTitle("Ошибка")
				.setDescription(`\`\`\`${error}\`\`\``)
				.setColor("#ff0000")
			]}).catch(() => {});
		}
	},
};