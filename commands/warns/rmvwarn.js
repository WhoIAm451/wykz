const db = require('../../models/warns')

module.exports = {
    name : 'remove-warn',
    aliases : ['rw'],
    usage: '@<member> <number of the warn>',
    description: 'remove a specific warn of a member.',
    timeout: 5000,
    run : async(client, message, args) => {
        try{
        if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('You do not have permission to use this command.')
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if(!user) return message.channel.send('User not found.')
        db.findOne({ guildid : message.guild.id, user: user.user.id}, async(err,data) => {
            if(err) throw err;
            if(data) {
                let number = parseInt(args[1]) - 1
                data.content.splice(number, 1)
                message.channel.send('deleted the warn')
                data.save()
            } else {
                message.channel.send('This user does not have any warns in this server!')
            }
        })
    } catch(err) {
        console.error(err)
        return message.channel.send("An error occurred while processing the command.")
    } 
    }
}