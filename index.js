const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const client = new Discord.Client();

//show in console if bot is active (start with "node index.js" in cmd.bat)
client.once('ready',  () => {
    console.log('Ready!')
});

//!help command to show bot commands
client.on('message', message => {
    if(message.content.startsWith(`${prefix}help`)){
        message.channel.send(`
I can perform the following commands:

**!command1** - First command description
**!command2** - Second command description
        `);
    }
});

//discbot text commands
client.on('message', message => {
    //discbot greets on !hi command
    if(message.content.startsWith(`${prefix}hi`)){
        message.channel.send("Greetings.");
    };
    //if someones mentions @everyone discbot tells them that nobody likes them.
    if(message.content.includes(`@everyone`)){
        message.channel.send("Nobody likes you.");
    };
    //if discbot gets mentioned he asks how he can help. also mentions that people can use the !help command.
    if (message.mentions.users.has(client.user.id) && !message.author.bot) {
        message.channel.send("How may I help you?, Maybe use !help to gain knowledge of a few of my commands.");
    }
});

//If somebody joins the server discbot welcomes them in the welcome channel.
client.on('guildMemberAdd', member =>{
    const channel = member.guild.channels.cache.find(channel => channel.name === "welcome");
    if(!channel) return;
    channel.send(`Welcome ${member}, have some fun in all the chatrooms. Or if you're confident, join a voicechat. `);
});

client.login(token);