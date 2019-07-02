const DCommando = require('discord.js-commando');
const bot = new DCommando.Client();

//Make a group of commands for music which is to be put in separate folder
bot.registry.registerGroup('music','Music');
bot.registry.registerGroup('random', 'Random');
bot.registry.registerGroup('admin', 'Admin');

bot.registry.registerDefaults(); //lists down functionality of the command
bot.registry.registerCommandsIn(__dirname + '/commands'); //location where the commands will be put

global.servers = {};

//Bot connects to the server
bot.on('ready', () => {
    //Adds activity to Sophie bot
    //You can set the activity to PLAYING, STREAMING, LISTENING, or WATCHING
    bot.user.setActivity("in the backyard", {type: "PLAYING"});

    console.log('Bork!');
});//end of ready event

//When someone sends a message, the bot will respond:
bot.on('message', (message) => {
   if(message.content === 'sit') {
       message.channel.send('bork!!');
   }
});//end of message event

//When someone joins the server, the bot will send a 'Welcome Message' to the #Welcome channel
bot.on('guildMemberAdd', newMember => {
    let welcomeChannel = newMember.guild.channels.find(ch => ch.name === 'welcome');
    let rulesChannel = newMember.guild.channels.find(ch => ch.name === 'rules');
    
    welcomeChannel.send(`Welcome, ${newMember}:tada:! Thank you for joining :sparkles:**${newMember.guild.name}**:sparkles:! Please read the ${rulesChannel} before proceeding. Enjoy your stay and have fun:smile:!`);
});//end of guildMemberAdd event

bot.login(process.env.BOT_TOKEN); //Bot's token must be hidden for security reasons