const {Message, MessageEmbed}= require('discord.js')
const ms = require('ms')

module.exports = {
    name : 'tempmute',
    usage: '@<mute> <time>',
    description: 'tempmute somoene.',
    timeout: 5000,
    /**
     * @param {Message} message
     */
    run : async(client, message, args) => {
        try{
        if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("You don't have permission.")
        if(!message.channel.permissionsFor(client.user).has("MANAGE_MESSAGES")) {
            message.channel.send("I don't have permission.")
            return;
        }
        if(!message.channel.permissionsFor(message.author).has("MANAGE_ROLES")) {
            message.channel.send("You don't have permission.")
            return;
        }

        if(!message.channel.permissionsFor(client.user).has("MANAGE_ROLES")) {
            message.channel.send("I don't have permission.")
            return;
        }

        if(member.id === message.author.id) {
            message.channel.send("You can't mute yourself.")
            return;
        }
        const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        const time = args[1]
        if(!Member) return message.channel.send('Member is not found.')
        if(!time) return message.channel.send('Please specify a time.\nFor example: 10s or 10m')
        const role = message.guild.roles.cache.find(role => role.name.toLowerCase() === 'muted')
        if(!role) {
            try {
                message.channel.send('Muted role is not found, attempting to create muted role.')

                let muterole = await message.guild.roles.create({
                    data : {
                        name : 'muted',
                        permissions: []
                    }
                });
                message.guild.channels.cache.filter(c => c.type === 'text').forEach(async (channel, id) => {
                    await channel.createOverwrite(muterole, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false
                    })
                });
                message.channel.send('Muted role has sucessfully been created.')
            } catch (error) {
                console.log(error)
            }
        };
        let role2 = message.guild.roles.cache.find(r => r.name.toLowerCase() === 'muted')
        if(Member.roles.cache.has(role2.id)) return message.channel.send(`${Member.displayName} has already been muted.`)
        await Member.roles.add(role2)
        message.channel.send(`${Member.displayName} is now muted.`)

        setTimeout(async () => {
            await Member.roles.remove(role2)
            message.channel.send(`${Member.displayName} is now unmuted`)
        }, ms(time))
    } catch(err) {
        console.error(err)
        return message.channel.send("An error occurred while processing the command.")
    }
    }
}