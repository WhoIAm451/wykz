const { Message } = require('discord.js')

module.exports=  {
    name : 'unmute',
    usage: '@<member>',
    description: 'unmute somoene.',
    timeout: 5000,
    /**
     * @param {Message} message
     */
    run : async(client, message, args) => {
        try {
        const Member = await message.guild.members.fetch(message.mentions.users.first() || args[0]).catch(console.error);

        if(!Member) return message.channel.send('Member not found')

        const role = message.guild.roles.cache.find(r => r.name.toLowerCase() === 'muted');

        await Member.roles.remove(role)

        message.channel.send(`${Member.displayName} is now unmuted`)
        } catch(err) {
            console.error(err)
            return message.channel.send("An error occurred while processing the command.")
        }
    }
}