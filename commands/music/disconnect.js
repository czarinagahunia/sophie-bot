const DCommando = require('discord.js-commando');

class DisconnectCommand extends DCommando.Command
{
    constructor(client)
    {
        super(client,{
            name: 'disconnect',
            group: 'music',
            memberName: 'disconnect',
            description: 'Disconnects from the voice channel'
        });
    }

    async run (message)
    {
        if(message.guild.voiceConnection)
        {
            message.guild.voiceConnection.disconnect();
        }
        else
        {
            message.reply(`I wasn't even in a voice channel!`);
        }
    }
}

module.exports = DisconnectCommand;

/*
My current problem is 
when I am not in a voice channel, I can still use the disconnect command
to force the bot to leave the voice channel
*/