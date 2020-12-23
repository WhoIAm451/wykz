  
const db = require('../../models/warns')

module.exports = {
    name : 'remove-all-warns',
    aliases : ['raw'],
    usage: '@<member>',
    description: 'remove all the warn of a specific member.',
    timeout: 5000,
    run : async(client, message, args) => {
        try{
        if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('You do not have permission to use this command.')
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if(!user) return message.channel.send('User not found.')
        db.findOne({ guildid : message.guild.id, user: user.user.id}, async(err,data) => {
            if(err) throw err;
            if(data) {
                await db.findOneAndDelete({ user : user.user.id, guildid: message.guild.id})
                message.channel.send(`Cleared ${user.user.tag}'s warns`)
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