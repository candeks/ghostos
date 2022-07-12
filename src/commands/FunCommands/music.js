const { SlashCommandBuilder } = require('@discordjs/builders')
const play = require('play-dl')
const { createAudioPlayer, createAudioResource, joinVoiceChannel, NoSubscriberBehavior } = require('@discordjs/voice')
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
            .setName("music")
            .setDescription("Включит выбранный твой трек в voice канале")
            .addStringOption(option => option.setName("track").setDescription("Название или ссылка на музыку с ютуба").setRequired(true)),
        async execute(interaction, client) {
            const buttons = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setStyle("SUCCESS")
                        .setLabel("Прибавить на 10%")
                        .setCustomId(">")
                        .setEmoji("<a:partytime:852872623658762240>"),
                    new MessageButton()
                        .setStyle("DANGER")
                        .setLabel("Убавить на 10%")
                        .setCustomId("<"))
                const progress = new MessageActionRow() 
                    .addComponents(
                        bar = new MessageButton()
                            .setLabel("Этот музон не в кэше бота")
                            .setStyle("SECONDARY")
                            .setCustomId("bar")
                            .setDisabled(false)) 
            const track = interaction.options.getString("track")
                if (interaction.member.voice?.channelId === "980197496334725151") {
                    await interaction.deferReply()
                        try {
                            const channel = await client.channels.fetch("980197496334725151")
                            let volume = 1;
                            let user_volume = "";
                            let index_first = 10;
                            let index_last = 10;

                            const connection = joinVoiceChannel({
                                channelId: "980197496334725151",
                                guildId: interaction.guild.id, 
                                adapterCreator: interaction.guild.voiceAdapterCreator,
                                selfMute: false,
                                selfDeaf: false
                            })

                            const search = await play.search(track, { 
                                limit: 1
                            }) 

                            const stream = await play.stream(search[0].url)

              
                            const resource = createAudioResource(stream.stream, {
                                inputType: stream.type, 
                                inlineVolume: true
                            }) 
              
                            const player = createAudioPlayer({
                                behaviors: {
                                    noSubscriber: NoSubscriberBehavior.Play
                                }
                            })
                            let time = 0;

                            const music = await play.video_info(search[0].url)
                            
                            if (music.video_details.durationRaw === "00:00") {
                                time = 7200 * 1000
                            } else {
                                time = music.video_details.durationInSec * 1000
                            } 

                            const text = `\n\n**Автор:** ${music.video_details.channel}\n**Время:** \`${music.video_details.durationRaw}\`\n**Лайков:** ${music.video_details.likes}\n**Просмотров:** ${music.video_details.views}\n**Дата публикации:** ${music.video_details.uploadedAt}\n\n`
                            const user_hex = (await client.users.fetch(interaction.user.id, {force: true})).hexAccentColor
                            const message = await interaction.editReply({embeds: [
                                                new MessageEmbed()
                                                    .setTitle(`**🎵 | Играет в ${channel.name}**`)
                                                    .setDescription(`**[${music.video_details.title}](${music.video_details.url})**`)
                                                    .setThumbnail(`${music.video_details.thumbnails[0].url}`)
                                                    .addFields({ name: "**Информация о музыке:**", value: text, inline: false })
                                                    .setColor(user_hex)
                                                ], components: [buttons], fetchReply: true})

                            const collector = message.createMessageComponentCollector({ 
                                componentType: 'BUTTON',
                                time: time,
                                errors: ['time']
                            });

                                connection.subscribe(player)
                                interaction.guild.me.voice.setSuppressed(false).catch(() => {}); 
                                resource.volume.setVolume(volume)
                                player.play(resource)

                            collector.on('collect', async (i) => {
                                if (i.customId === "bar") {
                                        return i.update({embeds: [
                                            new MessageEmbed()
                                                .setTitle(`**🎵 | Играет в ${channel.name}**`)
                                                .setThumbnail(`${music.video_details.thumbnails[0].url}`)
                                                .setDescription(`**[${music.video_details.title}](${music.video_details.url})**`)
                                                .addFields(
                                                    { name: "**Информация о музыке:**", value: text, inline: true},
                                                    { name: "**Обновил громкость:**", value: `${user_volume} — ${String(Math.round(volume * 100))}%`, inline: true}
                                                )
                                                .setColor(user_hex)
                                        ], components: [progress, buttons] 
                                    })
                                }   if (i.member.voice?.channelId === "980197496334725151") {
                                        if (i.customId === ">" || i.customId === "<") { 
                                            if (i.customId === ">") {
                                                if (volume >= 2) {
                                                    return i.reply({content: "Нельзя делать больше 200%", ephemeral: true});
                                                } else {
                                                    volume += 0.1
                                                    resource.volume.setVolume(volume)
                                                    bar.setLabel( `|${"—".repeat(index_first += 1)}🔊${"—".repeat(index_last -= 1)}|`)
                                                }   
                                            } else {
                                                if (String(volume).includes("e-16")) {
                                                    return i.reply({content: "Нельзя делать меньше нуля громкость", ephemeral: true});
                                                } else {
                                                    volume -= 0.1
                                                    resource.volume.setVolume(volume)
                                                    bar.setLabel(`|${"—".repeat(index_first -= 1)}🔊${"—".repeat(index_last += 1)}|`)
                                                }
                                            }
                                
                                user_volume = i.user;
                                
                                return i.update({embeds: [
                                    new MessageEmbed()
                                        .setTitle(`**🎵 | Играет в ${channel.name}**`)
                                        .setThumbnail(`${music.video_details.thumbnails[0].url}`)
                                        .setDescription(`**[${music.video_details.title}](${music.video_details.url})**`)
                                        .addFields(
                                            { name: "**Информация о музыке:**", value: text, inline: true},
                                            { name: "**Обновил громкость:**", value: `${user_volume} — ${String(Math.round(volume * 100))}%`, inline: true}
                                        )
                                        .setColor(user_hex)
                                ], components: [progress, buttons] 
                            })
                        }  
                    } else {
                        return i.reply({
                            content: "Для начала вступите в <#980197496334725151>",
                            ephemeral: true
                        })
                    }
                })  

                collector.on("end", async () => {
                    return interaction.editReply({embeds: [
                        new MessageEmbed()
                            .setTitle(`**🎵 | Играет в ${channel.name}**`)
                            .setDescription(`**[${music.video_details.title}](${music.video_details.url})**`)
                            .setThumbnail(`${music.video_details.thumbnails[0].url}`)
                            .addFields({ name: "**Информация о музыке:**", value: text, inline: false })
                            .setColor(user_hex)
                    ], components: [] 
                }).catch(() => {});
            })
        } catch (error) {
                return interaction.editReply({
                    content: `Не нашлось ...) Попробуй кинуть ссылкой:\n\`\`\`${error}\`\`\``
                })
            }
        } else {
            return interaction.reply({ 
                content: 'Вступите для начала в <#980197496334725151>',
                ephemeral: true
            })
        }
    }
} 