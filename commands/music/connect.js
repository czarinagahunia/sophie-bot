const DCommando = require('discord.js-commando');

class ConnectCommmand extends DCommando.Command
{
    constructor(client)
    {
        super(client,{
            name: 'connect',
            group: 'music',
            memberName: 'connect',
            description: 'Connects to the voice channel'
        });
    }

    //the function for the command
    async run (message)
    {
        //if the commander is in a voice channel and is in the right guild/server,
        //the bot will join the same voice channel and server
        if(message.member.voiceChannel)
        {
            if(!message.guild.voiceConnection)
            {
                message.member.voiceChannel.join()
                    //the codes in this brackets are gonna wait to be run until the bot has successfully joined
                    .then
                        message.channel.send('Successfully connected!');
            }
        } 
        else
        {
            message.reply('You must be in a voice channel! Please try again.');
        }
        
    }

}

module.exports = ConnectCommmand;