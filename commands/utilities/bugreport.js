const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "bugreport",
    description: "Have you encountered an issue while using Xeno? Report it!",
    usage: "bugreport <bug>",
    timeout: 3000,
    run: async (client, message, args) => {
        try{

        let bug = args.join(' ');

        if(!bug) {
            message.channel.send("You have to put a bug to report.")
        }

        let embed = new MessageEmbed()
        .setColor("RANDOM")
        .setTimestamp()
        .setFooter(`Lumi ™`, client.user.avatarURL())
        .setAuthor(`New bug reported by ${message.author.username}#${message.author.discriminator}`, message.author.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
        .setDescription(`**Bug**: ${bug}`)

        const channelreport = client.channels.cache.find(channel => channel.id === "791037869065240627");

        channelreport.send(embed).then(msg => msg.react('✅'))

        message.channel.send(`Bug was successfully reported.`)
    } catch(err) {
        console.error(err)
        return message.channel.send("An error occurred while processing the command.")
    }

    }
}