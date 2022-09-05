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
    try {
        
        if(message.author.bot) return;
        if(message.content.toLocaleLowerCase().search("ruff ruff") != -1 && message.guildId == "956676648881766440") {
            console.log("Ruff Ruff");
            message.react('💀');
        }
        if(message.content.toLocaleLowerCase().search("nyaa") != -1 && message.guildId == "956676648881766440") {
            console.log("nyaa");
            message.react('🥶');
        }

        console.log("hi1 " + message);
        if (!message.content.toLowerCase().startsWith(config.prefix)) return;
        
        if (message.guildId == "956676648881766440" && message.channelId != "965098505620299836") {
            message.reply('please use <#965098505620299836> for menu commands.')
                .then(msg => {
                    setTimeout(() => msg.delete(), 3000)
                })
                .catch(/*Your Error handling if the Message isn't returned, sent, etc.*/);
            return;
        }
        console.group("hi2");
        const args = message.content.toLowerCase().slice(config.prefix.length).trim().split(/ +/);


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
                        + "\n**Other:** `menu/ihouse`, `menu/gbc`, `menu/link`, `menu/all`, `menu/invite`"
                        + "\nWhen the command is used for the first time in the day, it will take a few seconds to fetch the data."
                        + "\nCreated by chicken#3413";
            message.channel.send(output);
        }
        if(args[0] == "invite") {
            let output = "Invite me to your server with"
                        + "\nhttps://discord.com/oauth2/authorize?client_id=911100218680934451&permissions=0&scope=bot%20applications.commands";
            message.channel.send(output);
        }
        if (args[0] == 'link' || args[0] == 'all') {
            message.channel.send("here, if you want to check the menu out yourself: https://caldining.berkeley.edu/menus/");
        }
        if(args[0] == 'gbc') {
            message.channel.send({
                files: [{
                    attachment: './images/gbc_menu.png',
                    name: 'GBC_MENU.png'
                }]});
        }
        if(args[0] == 'ihouse') {
            message.channel.send("PDF for iHouse menu: https://ihouse.berkeley.edu/sites/default/files/menu.pdf");
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
        if(args[0] == 'croads' && args[1] == 'brunch') {
            await fetchMenu.getMenu();
            let data = (await fetchMenu.getMenu()).crossroads.brunch;
            
            let output = "**Crossroads Brunch Menu:**";
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
        if(args[0] == 'foothill' && args[1] == 'brunch') {
            await fetchMenu.getMenu();
            let data = (await fetchMenu.getMenu()).foothill.brunch;
            
            let output = "**Foothill Brunch Menu:**";
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
        if(args[0] == 'cafe3' && args[1] == 'brunch') {
            await fetchMenu.getMenu();
            let data = (await fetchMenu.getMenu()).cafe3.brunch;
            
            let output = "**Cafe 3 Brunch Menu:**";
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
        if(args[0] == 'clarkkerr' && args[1] == 'brunch') {
            await fetchMenu.getMenu();
            let data = (await fetchMenu.getMenu()).clarkkerr.brunch;
            
            let output = "**Clark Kerr Brunch Menu:**";
            for(let i = 0; i < data.length; i++ ) {
                output += "\n" + data[i];
            }
            message.channel.send(output);
        }
    }
    catch(err) {
        console.log("error! \n");
    }
})


// Login to Discord with your client's token
client.login(process.env.TOKEN);
