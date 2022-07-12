const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Показывает задержку бота")
    .addStringOption(option =>
        option.setName("ephemeral")
            .setDescription("Отправить эфемерно")
            .addChoices({ name: "true", value: "true"})),
async execute(interaction, client) {
        let reply = false;
        if (interaction.options.getString("ephemeral") === "true") reply = true;

        const sent = await interaction.reply({ 
            content: 'Вычисление пинга...',
            fetchReply: true,
            ephemeral: reply
        });

       interaction.editReply({
            content: null,
            embeds: [
                {
                    title: "🏓 | Ping",
                    description: `**API**: ${client.ws.ping}ms\n**Roundtrip**: ${sent.createdTimestamp - interaction.createdTimestamp}ms`,
                    color: (await client.users.fetch(interaction.user.id, {force: true})).hexAccentColor || "#3299db"
                }
            ]
        });
    },
}
