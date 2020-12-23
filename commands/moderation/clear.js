module.exports = {
    name : 'clear',
    aliases : ['purge'],
    usage: '<number>',
    description: 'delete a specific number of messages.',
    timeout: 5000,
    run : async(client, message, args) => {
        try{
            if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("You don't have permission.")
            if(!message.channel.permissionsFor(client.user).has("MANAGE_MESSAGES")) {
                message.channel.send("I don't have permission.")
                return;
            }
            if(!args[0]) return message.channel.send('Please specify a number of messages to delete ranging from 1 - 99.')
            if(isNaN(args[0])) return message.channel.send('Numbers are only allowed.')
            if(parseInt(args[0]) > 99) return message.channel.send('The max amount of messages that I can delete is 99.')
            await message.channel.bulkDelete(parseInt(args[0]) + 1)
                .catch(err => console.log(err))
            message.channel.send('Deleted ' + args[0]  + " messages.").then(msg => {
                msg.delete({timeout: 10000})
            }).catch(console.error)
        } catch(err) {
            console.error(err)
            return message.channel.send("An error occurred while processing the command.")
        }
    }
}