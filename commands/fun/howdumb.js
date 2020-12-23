const { Message, MessageEmbed } = require('discord.js');
const fetch = require("node-fetch");

module.exports = {
    name: "howdumb",
    description: "See how dumb is a user(100% real) ",
    usage: "howdumb @<member>",
    timeout: 3000,
    run: async (client, message, args) => {
        try{

        let ratus = message.mentions.members.first() || message.author;

        let gayrate = Math.floor(Math.random() * 101);

        if(ratus.user.id === "486845666186756097") {
            message.channel.send(`**__${ratus.user.username}__** is obviously a genius!`);
        }
        if (gayrate >= 90) {
            message.channel.send(`I'd say that **__${ratus.user.username}__** is a genius!`)
        }

        if(gayrate <= 10) {
            message.channel.send(`I'd say that **__${ratus.user.username}__** is really dumb...`)
        }
        
        if (gayrate > 10 && gayrate <=50) {
            message.channel.send(`I'd say that **__${ratus.user.username}__** is close to be really dumb...`)

        }
        if (gayrate > 50 && gayrate < 90) {
            message.channel.send(`I'd say that **__${ratus.user.username}__** is close to be a genius!`)
        }

        
    } catch(err) {
        console.error(err)
        return message.channel.send("An error occurred while processing the command.")
    }
    }
}