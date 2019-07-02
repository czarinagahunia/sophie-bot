const DCommando = require('discord.js-commando');
const YTDL = require('ytdl-core');

// The !play command is still underconstruction as there's some problems with yt-dl package.

function play(connection, message)
{
    var server = servers[message.guild.id];
    server.dispatcher = connection.playStream(YTDL(server.queue[0], {filter: 'audioonly'}));
    server.queue.shift();
    
    server.dispatcher.on('end', function(){
        if(server.queue[0])
        {
            play(connection, message);
        }
        else
        {
            connection.disconnect();
        }
    });
}

class PlayCommand extends DCommando.Command
{
    constructor(client)
    {
         super(client,{
            name: 'play',
            group: 'music',
            memberName: 'play',
            description: 'Plays songs from YouTube',
            guildOnly: true,
            clientPermissions: ['SPEAK', 'CONNECT']
        });
    }

    async run(message, args)
    {
        if(message.member.voiceChannel)
        {
            if(!message.guild.voiceConnection)
            {
                //if server id doesn't exist in the list, we will give it its own queue
                if(!servers[message.guild.id])
                {
                    servers[message.guild.id] = { queue : []};
                }
                message.member.voiceChannel.join()
                    .then(connection => {
                        var server = servers[message.guild.id]
                        message.channel.send('Now playing!');
                        server.queue.push(args); //adds URL of the song
                        play(connection, message);
                    })
                    .catch(error => {console.log(error)});                      
            }
        }
        else
        {
            message.reply('You must be in a voice channel! Please try again');
        }
    }
   
}

module.exports = PlayCommand;