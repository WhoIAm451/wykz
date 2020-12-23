const { hangman } = require('reconlx')

module.exports = {
    name : 'hangman',
    usage: '#<channel> <word to guess>',
    description: 'allows you to play hangman.',
    timeout: 4000,
    run : async(client, message, args) => {
        try {
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send('You need manage messages permission.')
        const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0])
        if(!channel) return message.channel.send('Please specify a channel')
        const word = args.slice(1).join(" ")
        if(!word) return  message.channel.send('Please specify a word to guess.')

        const hang = new hangman({
            message: message,
            word: word,
            client: client,
            channelID: channel.id,
        })
        message.channel.bulkDelete(1, true);
        hang.start();
    } catch(err) {
        console.error(err)
        return message.channel.send("An error occurred while processing the command.")
    }
    }
}