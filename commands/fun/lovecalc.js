const { MessageEmbed, MessageAttachment } = require("discord.js");

module.exports = {
    name: "lovecalc",
    descritpion: "Calculates the amount of Love between 2 users.",
    usage: "lovecalc @<member> @<member>",
    timeout: 3000,
    run: async(client, message, args) => {
        try{

        let member = message.mentions.members.first();
        let member2 = message.mentions.members.last();
        let love = Math.floor(Math.random() * 101);

        let usage = new MessageEmbed()
            .setColor(process.env.embedcolor)

        if(!member) {
            message.channel.send("You have to mention a member.")
        }

        if(!member2) {
            message.channel.send("You have to mention a other member.")
        }

        if(!args[1]) {
            message.channel.send(`**${message.author.username}** + **${member.user.username}** = ${love}% of Love ❤`)
        } else if(member2) {
            message.channel.send(`**${member.user.username}** + **${member2.user.username}** = ${love}% of Love ❤`)
        }
    } catch(err) {
        console.error(err)
        return message.channel.send("An error occurred while processing the command.")
    }
    }
}