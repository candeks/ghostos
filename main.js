const { Client, Intents, Collection, MessageEmbed } = require('discord.js');
const fs = require("fs");
const discordModals = require('discord-modals')
const client = new Client({ 
  ws: { properties: { $browser: "Discord iOS" }},
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES],
})

require("dotenv").config(); discordModals(client)

client.commands = new Collection();  

const functions = fs.readdirSync("./src/functions").filter(file => file.endsWith(".js"));
const eventFiles = fs.readdirSync("./src/events").filter(file => file.endsWith(".js"));
const commandFolders = fs.readdirSync("./src/commands");

(async () => {
  for (file of functions) {
    require(`./src/functions/${file}`)(client) 
  }
    client.handleEvents(eventFiles, "./src/events"); 
    client.handleCommands(commandFolders, "./src/commands");
    client.login(process.env.BOT_TOKEN); 
})(); 

client.once("ready", () => {
    client.user.setPresence({ 
      activities: [
        { 
            name: `за ${client.guilds.cache.get("876058982609989654").memberCount} участниками | Prefix /`,
            type: 'WATCHING'
        }
      ], status: 'dnd' }) 

})

process.on('unhandledRejection', error => {
  console.error('Необработанный отказ от обещания:', error);
});

const randomNumber = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

setInterval(() => {
  client.channels.cache.get("929139799422562325")
     .send({embeds: [new MessageEmbed() 
          .setColor('RANDOM') 
          .setImage(`http://admem.ru/content/images/${randomNumber(1391093637, 1391119653)}.jpg`)
          .setFooter({text: `Мем под номером ${randomNumber(1391093637, 1391119653) - 1391093637}`})
        ]
      }).then((sentMessage) => {
        sentMessage.react("😂").then(() => sentMessage.react('💩')); 
      })
}, 1200000);

