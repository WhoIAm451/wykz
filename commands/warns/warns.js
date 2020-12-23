const db = require('../../models/warns')
const { Message, MessageEmbed } = require('discord.js')

module.exports = {
    name :'warns',
    usage: '@<member>',
    description: 'show you all the warn of a specific member.',
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
            if(data) {
                message.channel.send(new MessageEmbed()
                    .setTitle(`${user.user.tag}'s warns`)
                    .setTimestamp()
                    .setFooter(`Lumi ™`, client.user.avatarURL())
                    .setDescription(
                        data.content.map(
                            (w, i) => 
                            `\`${i + 1}\` | Moderator : ${message.guild.members.cache.get(w.moderator).user.tag}\nReason : ${w.reason}`
                        )
                    )
                    .setColor("BLUE")
                )
            } else {
                message.channel.send('User has no warn.')
            }

        })
    } catch(err) {
        console.error(err)
        return message.channel.send("An error occurred while processing the command.")
    }  
    }
}