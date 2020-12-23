//requiring the package
const db = require('quick.db')
const { MessageEmbed } = require('discord.js')

module.exports = {
    name : 'afk',
    usage: '<reason>',
    description: 'I will return your reason to the member who pinged you.',
    timeout: 5000,
    run : async(client, message, args) => {
        try{
            const content = args.join(" ")
            await db.set(`afk-${message.author.id}+${message.guild.id}`, content)
            message.channel.bulkDelete(1);
            const embed = new MessageEmbed()
            .setDescription(`You have been set to afk\n**Reason :** ${content}`)
            .setColor("GREEN")
            .setTimestamp()
            .setFooter(`Lumi ™`, client.user.avatarURL())
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic : true }))
            message.channel.send(embed).then(msg => {
                msg.delete({timeout: 10000})
            }).catch(console.error)
        } catch(err) {
            console.error(err)
            return message.channel.send("An error occurred while processing the command.")
        }           
    }
}