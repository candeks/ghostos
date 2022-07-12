const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("russia")
        .setDescription('Показывает флаг России')
        .addIntegerOption(option => option.setName("x").setDescription("Ширина флага (Каждое 1 = 1 смайлик в ширину флага)").setRequired(true))
        .addIntegerOption(option => option.setName("y").setDescription("Высота флага (Каждое 1 = 1 смайлик в высоту флага)").setRequired(true)),
    async execute(interaction) {
        const option = interaction.options;
            if (20 < option.getInteger("x") || option.getInteger("x") <= 0 || 0 >= option.getInteger("y") || option.getInteger("y") > 20) {
                return interaction.reply({content: "Твой флаг России невозможно создать", ephemeral: true}) 
            } else {
                return interaction.reply({
                        content: Array.from("⬜🟦🟥")
                            .reduce((acc, x) => 
                                acc.concat([`${x.repeat(option.getInteger("x")) + '\n'}`.repeat(option.getInteger("y"))]),
                            []).join('')
            })
        }
    }
}