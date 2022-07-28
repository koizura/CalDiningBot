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
    client.user.setActivity('to menu/help', { type: 'LISTENING' });
});
client.on("messageCreate", async message => {
    if(message.author.bot) return;
    if(message.content.toLocaleLowerCase().search("ruff ruff") != -1 && message.guildId == "956676648881766440") {
        console.log("Ruff Ruff");
        message.react('💀');
    }
    if(message.content.toLocaleLowerCase().search("nyaa") != -1 && message.guildId == "956676648881766440") {
        console.log("nyaa");
        message.react('🥶');
    }
    if(message.author.id == "1002281201517744250") {
        message.react('<a:femboy:1002282107369955418>');
    }
    if (!message.content.startsWith(config.prefix)) return;
    

    const args = message.content.slice(config.prefix.length).trim().split(/ +/);

    console.log(`message sent`);
    console.log(args);
    if(args[0] == 'fetch') {
        message.channel.send("force fetching new data...");
        await fetchMenu.update();
        message.channel.send("data has been updated!");
        
    } 
    if(args[0] == 'print') {
        let output = await fetchMenu.getMenu();
        console.log(output);

    }
    if(args[0] == "help") {
        let output = "**Usage:** `menu/<dininghallname> <time>`"
                    + "\n**Dining halls:** `croads` `cafe3` `clarkkerr` `foothill`"
                    + "\n**Times:** `breakfast` `lunch` `dinner`"
                    + "\n**Example:** `menu/cafe3 dinner`"
                    + "\nWhen the command is used for the first time in the day, it will take a few seconds to fetch the data."
                    + "\nCreated by chicken#3413";
        message.channel.send(output);
    }
    if(args[0] == "invite") {
        let output = "Invite me to your server with"
                    + "\nhttps://discord.com/oauth2/authorize?client_id=911100218680934451&permissions=0&scope=bot%20applications.commands";
        message.channel.send(output);
    }
    if(args[0] == 'croads' && args[1] == 'lunch') {
        await fetchMenu.getMenu();
        let data = (await fetchMenu.getMenu()).crossroads.lunch;
        
        let output = "**Crossroads Lunch Menu:**";
        for(let i = 0; i < data.length; i++ ) {
            output += "\n" + data[i];
        }
        message.channel.send(output);
    }
    if(args[0] == 'croads' && args[1] == 'dinner') {
        await fetchMenu.getMenu();
        let data = (await fetchMenu.getMenu()).crossroads.dinner;
        
        let output = "**Crossroads Dinner Menu:**";
        for(let i = 0; i < data.length; i++ ) {
            output += "\n" + data[i];
        }
        message.channel.send(output);
    }
    if(args[0] == 'croads' && args[1] == 'breakfast') {
        await fetchMenu.getMenu();
        let data = (await fetchMenu.getMenu()).crossroads.breakfast;
        
        let output = "**Crossroads Breakfast Menu:**";
        for(let i = 0; i < data.length; i++ ) {
            output += "\n" + data[i];
        }
        message.channel.send(output);
    }
    if(args[0] == 'foothill' && args[1] == 'lunch') {
        await fetchMenu.getMenu();
        let data = (await fetchMenu.getMenu()).foothill.lunch;
        
        let output = "**Foothill Lunch Menu:**";
        for(let i = 0; i < data.length; i++ ) {
            output += "\n" + data[i];
        }
        message.channel.send(output);
    }
    if(args[0] == 'foothill' && args[1] == 'dinner') {
        await fetchMenu.getMenu();
        let data = (await fetchMenu.getMenu()).foothill.dinner;
        
        let output = "**Foothill Dinner Menu:**";
        for(let i = 0; i < data.length; i++ ) {
            output += "\n" + data[i];
        }
        message.channel.send(output);
    }
    if(args[0] == 'foothill' && args[1] == 'breakfast') {
        await fetchMenu.getMenu();
        let data = (await fetchMenu.getMenu()).foothill.breakfast;
        
        let output = "**Foothill Breakfast Menu:**";
        for(let i = 0; i < data.length; i++ ) {
            output += "\n" + data[i];
        }
        message.channel.send(output);
    }
    if(args[0] == 'cafe3' && args[1] == 'lunch') {
        await fetchMenu.getMenu();
        let data = (await fetchMenu.getMenu()).cafe3.lunch;
        
        let output = "**Cafe 3 Lunch Menu:**";
        for(let i = 0; i < data.length; i++ ) {
            output += "\n" + data[i];
        }
        message.channel.send(output);
    }
    if(args[0] == 'cafe3' && args[1] == 'dinner') {
        await fetchMenu.getMenu();
        let data = (await fetchMenu.getMenu()).cafe3.dinner;
        
        let output = "**Cafe 3 Dinner Menu:**";
        for(let i = 0; i < data.length; i++ ) {
            output += "\n" + data[i];
        }
        message.channel.send(output);
    }
    if(args[0] == 'cafe3' && args[1] == 'breakfast') {
        await fetchMenu.getMenu();
        let data = (await fetchMenu.getMenu()).cafe3.breakfast;
        
        let output = "**Cafe 3 Breakfast Menu:**";
        for(let i = 0; i < data.length; i++ ) {
            output += "\n" + data[i];
        }
        message.channel.send(output);
    }
    if(args[0] == 'clarkkerr' && args[1] == 'lunch') {
        await fetchMenu.getMenu();
        let data = (await fetchMenu.getMenu()).clarkkerr.lunch;
        
        let output = "**Clark Kerr Lunch Menu:**";
        for(let i = 0; i < data.length; i++ ) {
            output += "\n" + data[i];
        }
        message.channel.send(output);
    }
    if(args[0] == 'clarkkerr' && args[1] == 'dinner') {
        await fetchMenu.getMenu();
        let data = (await fetchMenu.getMenu()).clarkkerr.dinner;
        
        let output = "**Clark Kerr Dinner Menu:**";
        for(let i = 0; i < data.length; i++ ) {
            output += "\n" + data[i];
        }
        message.channel.send(output);
    }
    if(args[0] == 'clarkkerr' && args[1] == 'breakfast') {
        await fetchMenu.getMenu();
        let data = (await fetchMenu.getMenu()).clarkkerr.breakfast;
        
        let output = "**Clark Kerr Breakfast Menu:**";
        for(let i = 0; i < data.length; i++ ) {
            output += "\n" + data[i];
        }
        message.channel.send(output);
    }
})


// Login to Discord with your client's token
client.login(process.env.TOKEN);
