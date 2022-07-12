const { SlashCommandBuilder } = require('@discordjs/builders');
const { Modal, TextInputComponent, showModal } = require('discord-modals');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("moderator-form")
        .setDescription("Подать заявку на модератора сервера"),
    async execute(interaction, client) {
            const modal = new Modal() 
                .setCustomId('modal')
                .setTitle("Заявка на модератора")
                .addComponents(
                    new TextInputComponent()
                        .setCustomId('name')
                        .setLabel("Как вас зовут?")
                        .setStyle('SHORT') 
                        .setMinLength(3)
                        .setMaxLength(50)
                        .setPlaceholder('Ваше имя...')
                        .setRequired(true),
                    new TextInputComponent()
                        .setCustomId("age")
                        .setLabel("Сколько вам лет?")
                        .setStyle("SHORT")
                        .setMaxLength(30)
                        .setPlaceholder("Ваш возраст...")
                        .setRequired(true),
                    new TextInputComponent()
                        .setCustomId("server")
                        .setLabel("Как хорошо вы знаете правила и сам сервер?")
                        .setStyle("LONG")
                        .setMaxLength(500)
                        .setPlaceholder("Ваши знания...")
                        .setRequired(true),
                    new TextInputComponent()
                        .setCustomId("hours")
                        .setLabel("Сколько часов в неделю готовы уделять?")
                        .setStyle("LONG")
                        .setMaxLength(200)
                        .setPlaceholder("Ваша степень к любопытству сервера...")
                        .setRequired(true),
                    new TextInputComponent()
                        .setCustomId("experience")
                        .setLabel("Был ли у вас опыт модерирования?")
                        .setStyle("LONG")
                        .setMaxLength(1000)
                        .setPlaceholder("Опишите свой опыт...")
                        .setRequired(true))
            showModal(modal, {
                client: client,
                interaction: interaction 
            })
        }
    }  