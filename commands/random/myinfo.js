const DCommando = require('discord.js-commando');
const Discord = require('discord.js');

class InfoCommand extends DCommando.Command
{
    constructor(client)
    {
        super(client, {
           name: 'myinfo' ,
           group: 'random',
           memberName: 'myinfo',
           description: 'Posts information about the author'
        });
    }

    async run (message)
    {
        //Format the Date to MM/DD/YYYY
        const date = message.member.joinedAt;
        const newDate = date.toLocaleDateString();

        var userInfo = new Discord.RichEmbed()
            .setTitle('__**Get to Know Me!**__')
            .setColor('#C4E532')
            .setDescription(`This displays a little bit of info about **${message.author.username}**`)
            .addField(`**Username**`, `${message.author.username}`, false)
            .addField(`**Discord Tag**`, `${message.author.tag}`, false)
            .addField(`**Joined ${message.guild.name} At**`, `${newDate}`, false)
            .setImage(message.author.displayAvatarURL)
            .setFooter(`${message.guild.name}`, `${message.guild.iconURL}`)
            .setTimestamp()

        message.channel.send(userInfo);
    }
}

module.exports = InfoCommand;