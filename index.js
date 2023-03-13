const { Client, Events, GatewayIntentBits, Collection, ActivityType, EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js')
const axios = require('axios');

// dotenv
const dotenv = require('dotenv')
dotenv.config()
const { TOKEN } = process.env

// importação dos comandos
const fs = require("node:fs")
const path = require("node:path");
const { clear } = require('node:console');
const commandsPath = path.join(__dirname, "./src/commands")
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"))

const client = new Client({ intents: [
    GatewayIntentBits.Guilds, 
    GatewayIntentBits.GuildMembers, 
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMessageReactions
    ]
});

const { DisTube } = require("distube");
const { SpotifyPlugin } = require("@distube/spotify");

const commands = [];

client.commands = new Collection()

for (const file of commandFiles){
    const filePath = path.join(commandsPath, file)
    const command = require(filePath)
    if ("data" in command && "execute" in command) {
        fs.readdirSync(commandsPath)
        console.log(`${file} Carregado!`);
        client.commands.set(command.data.name, command)
    } else  {
        console.log(`Esse comando em ${filePath} está com "data" ou "execute ausentes"`)
    } 
}

const eventFiles = fs
	.readdirSync("./src/events")
	.filter(file => file.endsWith(".js"));

for (const file of eventFiles) {
	const event = require(`./src/events/${file}`);
	
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args, commands));
	} else {
		client.on(event.name, (...args) => event.execute(...args, commands));
	}
}
/*module.exports = client;
client.distube = new DisTube(client, {
  emitNewSongOnly: true,
  leaveOnFinish: false,
  emitAddSongWhenCreatingQueue: false,
  plugins: [new SpotifyPlugin()]
});*/

// Login do bot
client.once(Events.ClientReady, c => {
  console.clear()
	console.log(`Say my name, ${c.user.tag}`)
    client.user.setPresence({
        activities: [{
            name: "O bucetão do HP",
            type: ActivityType.Watching
        }],
        status: 'idle'
    });
});

client.login(TOKEN)

// Listener de interações com o bot
client.on('interactionCreate', async interaction => {
    if (interaction.isButton() && interaction.customId === 'hugback') {
      const { data: { url } } = await axios.get('https://api.waifu.pics/sfw/hug');
  
      const embed = new EmbedBuilder()
        .setDescription(`😊 ${interaction.user} retribuiu o abraço para ${interaction.message.embeds[0].description.split(' ')[1]}!`)
        .setImage(url)
        .setColor('#FF69B4')
        .setTimestamp()
        .setFooter({ text: interaction.user.username, iconURL: interaction.user.displayAvatarURL({  format: 'png', dynamic: true }) });
  
      interaction.reply({ embeds: [embed], components: [row] });
    }
  });

  client.on('interactionCreate', async interaction => {
    if (interaction.isButton() && interaction.customId === 'kissback') {
      const { data: { url } } = await axios.get('https://api.waifu.pics/sfw/kiss');
  
      const embed = new EmbedBuilder()
        .setDescription(`💋 ${interaction.user} retribuiu o beijo para ${interaction.message.embeds[0].description.split(' ')[1]}!`)
        .setImage(url)
        .setColor('#FF69B4')
        .setTimestamp()
        .setFooter({ text: interaction.user.username, iconURL: interaction.user.displayAvatarURL({  format: 'png', dynamic: true }) });
  
      interaction.reply({ embeds: [embed], components: [] });
    }
  });

  client.on('interactionCreate', async interaction => {
    if (interaction.isButton() && interaction.customId === 'patback') {
      const { data: { url } } = await axios.get('https://api.waifu.pics/sfw/pat');
  
      const embed = new EmbedBuilder()
        .setDescription(`🤗 ${interaction.user} retribuiu o cafuné em ${interaction.message.embeds[0].description.split(' ')[1]}!`)
        .setImage(url)
        .setColor('#FF69B4')
        .setTimestamp()
        .setFooter({ text: interaction.user.username, iconURL: interaction.user.displayAvatarURL({  format: 'png', dynamic: true }) });
  
      interaction.reply({ embeds: [embed], components: [] });
    }
  });

  client.on('interactionCreate', async interaction => {
    if (interaction.isButton() && interaction.customId === 'slapback') {
      const { data: { url } } = await axios.get('https://api.waifu.pics/sfw/slap');
  
      const embed = new EmbedBuilder()
        .setDescription(`💥 ${interaction.user} retribuiu o tapa em ${interaction.message.embeds[0].description.split(' ')[1]}!`)
        .setImage(url)
        .setColor('#FF69B4')
        .setTimestamp()
        .setFooter({ text: interaction.user.username, iconURL: interaction.user.displayAvatarURL({  format: 'png', dynamic: true }) });
  
      interaction.reply({ embeds: [embed], components: [] });
    }
  });
  
client.on(Events.InteractionCreate, async interaction =>{
    if (interaction.isStringSelectMenu()){
        const selected = interaction.values[0]
        if (selected == "javascript"){
            await interaction.update("Documentação do Javascript: https://developer.mozilla.org/en-US/docs/Web/JavaScript")
        } else if (selected == "python"){
            await interaction.update("Documentação do Python: https://www.python.org")
        } else if (selected == "csharp"){
            await interaction.update("Documentação do C#: https://learn.microsoft.com/en-us/dotnet/csharp/")
        } else if (selected == "discordjs"){
            await interaction.update("Documentação do Discord.js: https://discordjs.guide/#before-you-begin")
        }
    }
    if (!interaction.isChatInputCommand()) return
    const command = interaction.client.commands.get(interaction.commandName)
    if (!command) {
        console.error("Comando não encontrado")
        return
    }
    try {
        await command.execute(interaction)
    } 
    catch (error) {
        console.error(error)
        await interaction.reply("Houve um erro ao executar esse comando!")
    }
})
