const fs = require('fs');
const dotenv = require('dotenv');
const config = require('./config.json'); // console.log(config.prefix)
const fetchMenu = require('./fetchMenu.js');

dotenv.config();

// Require the necessary discord.js classes
const { Client, Collection, Intents } = require('discord.js');
// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.commands.set(command.data.name, command);
}




client.on("ready", () => {
    console.log(`Ready! Logged in as ${client.user.tag}`);
});
client.on("messageCreate", async message => {
    if(message.author.bot) return;
    if (!message.content.startsWith(config.prefix)) return;
    const args = message.content.slice(config.prefix.length).trim().split(/ +/);

    console.log(`message sent`);
    console.log(args);
    if(args[0] == 'fetch') {
        message.channel.send("fetching...");
        await fetchMenu.execute();
        message.channel.send("fetched! you can now run menu/print");
        
    } 
    if(args[0] == 'print') {
        let output =  fetchMenu.getMenu();
        console.log(output);

    }
    
})


// Login to Discord with your client's token
client.login(process.env.TOKEN);
