const db = require('../../models/warns')
const { Message, MessageEmbed } = require('discord.js')

module.exports = {
    name :'warn',
    usage: '@<member> <reason>',
    description: 'warn somoene.',
    timeout: 5000,
    /**
     * @param {Message} message
     */
    run : async(client, message, args) => {
        try {
        if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('You do not have permissions to use this command.')
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if(!user) return message.channel.send('User not found.')
        const reason = args.slice(1).join(" ")
        db.findOne({ guildid: message.guild.id, user: user.user.id}, async(err, data) => {
            if(err) throw err;
            if(!data) {
                data = new db({
                    guildid: message.guild.id,
                    user : user.user.id,
                    content : [
                        {
                            moderator : message.author.id,
                            reason : reason
                        }
                    ]
                })
            } else {
                const obj = {
                    moderator: message.author.id,
                    reason : reason
                }
                data.content.push(obj)
            }
            data.save()
        });
        user.send(new MessageEmbed()
            .setTimestamp()
            .setFooter(`Lumi ™`, client.user.avatarURL())
            .setDescription(`You have been warned for ${reason}`)
            .setColor("RED")
        )
        message.channel.send(new MessageEmbed()
            .setDescription(`Warned ${user} for ${reason}`).setColor('BLUE')
            .setTimestamp()
            .setFooter(`Lumi ™`, client.user.avatarURL())
        )
    } catch(err) {
        console.error(err)
        return message.channel.send("An error occurred while processing the command.")
    }     
    }
}