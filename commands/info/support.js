const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "support",
    description: "Returns Lumi related links",
    usage: "support",
    timeout: 3000,
    run: async(client, message, args) => {
        try {

        let inviteLink = 'https://discord.com/api/oauth2/authorize?client_id=788877393766514688&permissions=2138566007&scope=bot';
        let supportLink = 'https://www.youtube.com/watch?v=OGYu6Kj3bL0';

        let embed = new MessageEmbed()
            .setColor("RANDOM")
            .setTimestamp()
            .setFooter(`Lumi ™`, client.user.avatarURL())
            .setAuthor(`Lumi`, client.user.avatarURL())
            .setDescription(`To add the bot to your server use this link : ${inviteLink}.\nTo join our discord server use this link : ${supportLink}.`)

        message.channel.send(embed)
    } catch(err) {
        console.error(err)
        return message.channel.send("An error occurred while processing the command.")
    }

    }
}