const { Message } = require('discord.js')

module.exports = {
    name : 'addrole',
    aliases : ['ar'],
    usage: '@<member> @<role>',
    description: 'add the role of your choice to the specified member.',
    timeout: 5000,
    run : async(client, message, args) => {
        try {
        //lets use parameters (optional)
        /**
         * @param {Message} message
         */
        //so firstly we will check whether the author of the message has permissions
        //this line means if the author doesn't have manage roles permission it will stop the process and send the following text
            if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send('You do not have permission.')
        //next we define some variables
            const target = await message.guild.members.fetch(message.mentions.users.first() || args[0]).catch(console.error);
            if(!target) return message.channel.send('No member specified.') //when no member is pinged
            const role = message.mentions.roles.first() // roles = mentions
            if(!role) return message.channel.send('No role specified.') //when no role is specified or pinged
        //now the code!
            await target.roles.add(role) // adding the role to the user
            message.channel.bulkDelete(1);
            message.channel.send(`${target.user.username} has obtained the role **${role.name}** !`).then(msg => {
                msg.delete({timeout: 10000})
            }).catch(console.error)
        } catch(err) {
            console.error(err)
            return message.channel.send("An error occurred while processing the command.")
        }
    }
}