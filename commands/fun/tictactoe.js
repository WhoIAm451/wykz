const { tictactoe } = require('reconlx')

module.exports = {
    name : 'tictactoe',
    usage: '@<member>',
    description: 'allows you to play tictactoe with somoene.',
    timeout: 4000,
    run : async(client, message, args) => {
        try{
        const member = message.mentions.members.first() 
            if(!member)  return  message.channel.send('Please specify a member')
        
        new tictactoe({
            player_two: member, 
            message: message
        })
    } catch(err) {
        console.error(err)
        return message.channel.send("An error occurred while processing the command.")
    }
    }
}