const prefixSchema = require('../../models/prefix')
const { Message } = require('discord.js')
module.exports = {
    name : 'prefix',
    usage: '<new prefix>',
    description: 'Change the prefix of the bot.',
    timeout: 10000,
    /**
     * @param {Message} message
     */
    run : async(client, message, args) => {
        try {
            const res = await args.join(" ")
            if(!message.channel.permissionsFor(message.author).has("ADMINISTRATOR")) return message.channel.send("You don't have permission.");
            if(!res) return message.channel.send('Please specify a prefix to change to.')
            prefixSchema.findOne({ Guild : message.guild.id }, async(err, data) => {
                if(err) throw err;
                if(data) {
                    await prefixSchema.findOneAndDelete({ Guild : message.guild.id })
                    data = new prefixSchema({
                        Guild : message.guild.id,
                        Prefix : res
                    })
                    data.save()
                    message.channel.send(`Your prefix has been updated to **${res}**.`)
                } else {
                    data = new prefixSchema({
                        Guild : message.guild.id,
                        Prefix : res
                    })
                    data.save()
                    message.channel.send(`Custom prefix in this server is now set to **${res}**.`)
                }
        })
    } catch(err) {
        console.error(err)
        return message.channel.send("An error occurred while processing the command.")
    }
}
}
