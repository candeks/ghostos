const { MessageActionRow, MessageButton, MessageEmbed, Formatters } = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("calculator")
        .setDescription("Калькулятор"),
        async execute(interaction) {
            const calc_buttons1 = new MessageActionRow()
			    .addComponents(
			    	new MessageButton()
			    		.setStyle("PRIMARY")
			    		.setLabel("(")
			    		.setCustomId("("),
			    	new MessageButton()
			    		.setStyle("PRIMARY")
			    		.setLabel(")")
			    		.setCustomId(")"),
			    	new MessageButton()
			    		.setStyle("DANGER")
			    		.setLabel("Exit")
			    		.setCustomId("Exit"),
			    	new MessageButton()
			    		.setStyle("DANGER")
			    		.setLabel("Clear")
			    		.setCustomId("Clear"))
			const calc_buttons2 = new MessageActionRow()
			    .addComponents(
			    	new MessageButton()
			    		.setStyle("SECONDARY")
			    		.setLabel("1")
			    		.setCustomId("1"),
			    	new MessageButton()
			    		.setStyle("SECONDARY")
			    		.setLabel("2")
			    		.setCustomId("2"),
			    	new MessageButton()
			    		.setStyle("SECONDARY")
			    		.setLabel("3")
			    		.setCustomId("3"),
			    	new MessageButton()
			    		.setStyle("PRIMARY")
			    		.setLabel("÷")
			    		.setCustomId("÷"))
			const calc_buttons3 = new MessageActionRow()
			    .addComponents(
			    	new MessageButton()
			    		.setStyle("SECONDARY")
			    		.setLabel("4")
			    		.setCustomId("4"),
			    	new MessageButton()
			    		.setStyle("SECONDARY")
			    		.setLabel("5")
			    		.setCustomId("5"),
			    	new MessageButton()
			    		.setStyle("SECONDARY")
			    		.setLabel("6")
			    		.setCustomId("6"),
			    	new MessageButton()
			    		.setStyle("PRIMARY")
			    		.setLabel("x")
			    		.setCustomId("x"))
			const calc_buttons4 = new MessageActionRow()
			    .addComponents(
			    	new MessageButton()
			    		.setStyle("SECONDARY")
			    		.setLabel("7")
			    		.setCustomId("7"),
			    	new MessageButton()
			    		.setStyle("SECONDARY")
			    		.setLabel("8")
			    		.setCustomId("8"),
			    	new MessageButton()
			    		.setStyle("SECONDARY")
			    		.setLabel("9")
			    		.setCustomId("9"),
			    	new MessageButton()
			    		.setStyle("PRIMARY")
			    		.setLabel("-")
			    		.setCustomId("-"))
			const calc_buttons5 = new MessageActionRow()
			    .addComponents(
			    	new MessageButton()
			    		.setStyle("SECONDARY")
			    		.setLabel("0")
			    		.setCustomId("0"),
			    	new MessageButton()
			    		.setStyle("SECONDARY")
			    		.setLabel(".")
			    		.setCustomId("."),
			    	result = new MessageButton()
			    		.setStyle("SUCCESS")
			    		.setLabel("=")
			    		.setCustomId("="),
			    	new MessageButton()
			    		.setStyle("PRIMARY")
			    		.setLabel("+")
			    		.setCustomId("+"))

			const calc_embed = new MessageEmbed()
				.setTitle("**Калькулятор**")
				.setColor("#2F3136")

			const repeat = " ".repeat(15)
			
			const calculator = await interaction.reply({
				embeds: [calc_embed.setDescription(`\`\`\`${repeat}0${repeat}\`\`\``).setColor("#2F3136")],
				components: [calc_buttons1, calc_buttons2, calc_buttons3, calc_buttons4, calc_buttons5],
				fetchReply: true
			})

			const collector = calculator.createMessageComponentCollector({ 
				componentType: 'BUTTON',
				time: 3600000,
				errors: ['time']
			});

			let string = "";

			collector.on("collect", async(i) => {
				if (i.user.id === interaction.user.id) {
					if (string.length > 4000) {
						if (i.member.roles.cache.some(role => role.id === "970281512362721302")) {
							return i.reply({content: "Единоразовая акция уже была с вашей любопытностью."})
						} else {
							return i.reply({
								content: "Вижу, что вы очень любопытный человек и пытались сломать калькулятор. Вы на 100% заслуживаете роль <@&970281512362721302>!",
							}).then(() => i.member.roles.add("970281512362721302"))
						}
					} 
						if (i.customId === "1" || 
							i.customId === "2" ||  
							i.customId === "3" || 
							i.customId === "4" || 
							i.customId === "5" || 
							i.customId === "6" ||
							i.customId === "7" ||
							i.customId === "8" ||
							i.customId === "9" ||
							i.customId === "0" ||
							i.customId === ")" ||
							i.customId === "(" ||
							i.customId === ".") {
								result.setDisabled(false)
							return await i.update({
								embeds: [calc_embed.setDescription(`\`\`\`${repeat}${string += `${i.customId}`}${repeat}\`\`\``)],
								components: [calc_buttons1, calc_buttons2, calc_buttons3, calc_buttons4, calc_buttons5]
							})
						}
						
						if (i.customId === "÷" ||
							i.customId === "x" || 
							i.customId === "+" ||
							i.customId === "-") {
								result.setDisabled(false)
							return await i.update({ 
								embeds: [calc_embed.setDescription(`\`\`\`${repeat}${string += ` ${i.customId} `}${repeat}\`\`\``)],
								components: [calc_buttons1, calc_buttons2, calc_buttons3, calc_buttons4, calc_buttons5]
							})
						}
					
						if (i.customId === "Exit") {
							await i.message.delete()
							await collector.stop();
						}  
						
						if (i.customId === "=") {
							try {
								string = string.replace(/[\x\÷]/g, function(a) {
									if (a === "x") {return "*"}
									if (a === "÷") {return "/"}
								}) || string;

							result.setDisabled(true)
								await i.update({
									embeds: [calc_embed.setDescription(`\`\`\`${repeat}${string = `${eval(string)}`}${repeat}\`\`\``)],
									components: [calc_buttons1, calc_buttons2, calc_buttons3, calc_buttons4, calc_buttons5]
								}) 
							} catch {
								await i.update({
									embeds: [calc_embed.setDescription(`\`\`\`${repeat}Ошибка${repeat}\`\`\``)],
									components: [calc_buttons1, calc_buttons2, calc_buttons3, calc_buttons4, calc_buttons5]
								})
							return string = ""
							}
						}
	
					   if (i.customId === "Clear") {
							if ( string?.endsWith("1") || 
								string?.endsWith("2") || 
								string?.endsWith("3") || 
								string?.endsWith("4") ||
								string?.endsWith("5") ||
								string?.endsWith("6") ||
								string?.endsWith("7") ||
								string?.endsWith("8") ||
								string?.endsWith("9") ||
								string?.endsWith("0") ||
								string?.endsWith("(") ||
								string?.endsWith(")") ||
								string?.endsWith(".") ||
								string?.endsWith("-")) {
					string = string.slice(0, -1)
					if (string === "") {
						await i.update({
							embeds: [calc_embed.setDescription(`\`\`\`${repeat}0${repeat}\`\`\``)],
							components: [calc_buttons1, calc_buttons2, calc_buttons3, calc_buttons4, calc_buttons5]
						})
					} else {
						await i.update({
							embeds: [calc_embed.setDescription(`\`\`\`${repeat}${string}${repeat}\`\`\``)],
							components: [calc_buttons1, calc_buttons2, calc_buttons3, calc_buttons4, calc_buttons5]
						})
					}
				} else if (string?.endsWith("+ ") || string?.endsWith("- ") || string?.endsWith("x ") || string?.endsWith("÷ ")) {
					string = string.slice(0, -3)
					if (string === "") {
						await i.update({
							embeds: [calc_embed.setDescription(`\`\`\`${repeat}0${repeat}\`\`\``)],
							components: [calc_buttons1, calc_buttons2, calc_buttons3, calc_buttons4, calc_buttons5]
						})
					} else {
						await i.update({
							embeds: [calc_embed.setDescription(`\`\`\`${repeat}${string}${repeat}\`\`\``)],
							components: [calc_buttons1, calc_buttons2, calc_buttons3, calc_buttons4, calc_buttons5]
						})
					} 
				} else {
						await i.update({
							embeds: [calc_embed.setDescription(`\`\`\`${repeat}0${repeat}\`\`\``)],
							components: [calc_buttons1, calc_buttons2, calc_buttons3, calc_buttons4, calc_buttons5]
						})
					}
				}
			} else {
					if (string === "") {
						await i.update({
							embeds: [calc_embed.setDescription(`\`\`\`${repeat}0${repeat}\`\`\``)],
							components: [calc_buttons1, calc_buttons2, calc_buttons3, calc_buttons4, calc_buttons5]
						})
					} else {
						await i.update({
							embeds: [calc_embed.setDescription(`\`\`\`${repeat}${string}${repeat}\`\`\``)],
							components: [calc_buttons1, calc_buttons2, calc_buttons3, calc_buttons4, calc_buttons5]
						})
					}
				}	
			})
		}
	} 