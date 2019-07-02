const DCommando = require('discord.js-commando');

class MuteCommand extends DCommando.Command
{
    constructor(client)
    {
        super(client, {
            name: 'mute',
            group: 'admin',
            memberName: 'mute',
            description: 'Admin has the power to mute a member in the server'
        });

    }

    async run (message, args)
    {
        // If the commander has permission to use the command
        if (!message.member.hasPermission('MANAGE_ROLES') || !message.guild.owner)
        {
            return message.channel.send('You don\'t have permission to use this command!');
        }

        if (!message.guild.me.hasPermission('MANAGE_ROLES'))
        {
            return message.channel.send('I don\'t have enough permission to use this command!')
        }

        // Stating the reason and who to mute
        let offender = message.mentions.members.first() || message.guild.members.get(args[0]);
        if (!offender) 
        {
            return message.channel.send('Please put the name of the user to be muted!');
        }

        let reason = args.split(1).join(' ');
        if (!reason) 
        {
            reason = 'No reason given!';
        }

        // Giving Muted role to the offender and if it doesn't exist, create one
        let muteRole = message.guild.roles.find( m => m.name === 'Muted')
        if (!muteRole)
        {
            try
            {
                muteRole = await message.guild.createRole({
                    name: 'Muted',
                    color: '#B99FBA',
                    permissions: []
                });
                message.guild.channels.forEach(async (channel, id) => {
                    await channel.overwritePermissions(muteRole, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false,
                        SEND_TTS_MESSAGES: false,
                        ATTACH_FILES: false,
                        SPEAK: false
                    });
                });
            }
            catch(e)
            {
                console.log(e.stack);
            }
        }

        // Adding the Muted role to the offender
        offender.addRole(muteRole.id).then(() => {
            message.channel.send(`<@${offender.user.id}> was successfully muted.`);
        });
    
    }
}

module.exports = MuteCommand;