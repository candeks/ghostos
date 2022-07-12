const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = { 
    data: new SlashCommandBuilder()
        .setName("memory")
        .setDescription("Показывает подробную оперативную память бота")
        .addStringOption(option =>
            option.setName("ephemeral")
                .setDescription("Отправить эфемерно")
                .addChoices({ name: "true", value: "true"})),
        async execute(interaction, client) {
            const memory = Object.entries(process.memoryUsage()).map((item) => `**${item[0]}**: ${(item[1] / 1024 / 1024).toFixed(4)} MB`).join("\n").toString()
            let reply = false;
            if (interaction.options.getString("ephemeral") === "true") reply = true;
            await interaction.reply({
                embeds: [
                    {
                        title: "🛠️ | Оперативная память",
                        color: (await client.users.fetch(interaction.user.id, {force: true})).hexAccentColor || "#3299db",
                        description: memory,
                    }
                ], ephemeral: reply})
        }
} 
