const prefixSchema = require('../../models/prefix')
const prefix = require('../../config.json').prefix
const { confirmation } = require('@reconlx/discord.js')

module.exports = {
    name : 'prefix-reset',
    aliases : ['pr'],
    description: 'reset the prefix of the server.',
    timeout: 10000,
    run : async(client, message) => {
        try {
            if(!message.channel.permissionsFor(message.author).has("ADMINISTRATOR")) return message.channel.send("You don't have permission.");
            message.channel.send("Are you sure you want to reset the prefix?").then(async (msg) => {
                const emoji = await confirmation(msg, message.author, ['✅', '❌'], 10000)
                if(emoji === '✅') {
                    msg.delete()
                    await prefixSchema.findOneAndDelete({ Guild : message.guild.id })
                    message.channel.send(`The prefix has been reset to ${prefix}.`)
                }
                if(emoji === '❌') {
                    msg.delete()
                    message.channel.send('reset prefix has been cancelled.')
                }
        })
    } catch(err) {
        console.error(err)
        return message.channel.send("An error occurred while processing the command.")
    }

    }
}