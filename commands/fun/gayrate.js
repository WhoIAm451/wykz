const { Message, MessageEmbed } = require('discord.js');
const fetch = require("node-fetch");

module.exports = {
    name: "gayrate",
    description: "See how gay is a person (100% real)",
    usage: "gayrate @<member>",
    timeout: 3000,
    run: async (client, message, args) => {
        try {

        let ratus = message.mentions.members.first() || message.author;

        let gayrate = Math.floor(Math.random() * 101);

        if(ratus.user.id === "486845666186756097") {
            message.channel.send(`I'd say that ${ratus.user.username} is not gay.`);
        } else {
            message.channel.send(`I'd say that **__${ratus.user.username}__** is ${gayrate}% gay.`);
        }
    } catch(err) {
        console.error(err)
        return message.channel.send("An error occurred while processing the command.")
    }
    }
}