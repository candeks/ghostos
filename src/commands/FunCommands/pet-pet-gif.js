const petPetGif = require('pet-pet-gif')
const { MessageAttachment } = require('discord.js')
const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("pet-pet")
        .setDescription("Погладить себя, либо кого то другого")
        .addUserOption(option => option.setName("user").setDescription("Какого пользователя погладить? Себя если не указано"))
        .addAttachmentOption(option => option.setName("attachment").setDescription("Кого нужно погладить? Себя если не указано")),
    async execute(interaction) {
        await interaction.deferReply()
        const user = interaction.options.getUser("user") || interaction.user;
        const attachment = interaction.options.getAttachment("attachment");
        const animatedGif = await petPetGif(attachment?.url || user.displayAvatarURL({ format: "png" }))

        return interaction.editReply({
            embeds: [
                {
                    color: "#3299db",
                    image: {
                        url: 'attachment://pet.gif'
                    } 
                }
            ], files: [
                new MessageAttachment(animatedGif, 'pet.gif')
            ]
        })
    }
}