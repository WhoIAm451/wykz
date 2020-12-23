const  { MessageEmbed } = require("discord.js");
const figlet = require("figlet");

module.exports = {
    name: "asciify",
    aliases: ['ascii'],
    description: "Turns text into ascii art",
    usage: "asciify <text>",
    timeout: 3000,
    run: async (client, message, args) => {

        const text = args.join(" ");

        if(!text) {
            message.channel.send("You have to enter a text.")
        }

        const bigText = figlet.textSync(text, {
            font: 'Ghost',
            horizontalLayout: 'universal smushing',
            verticalLayour: 'universal smushing'
        })

        message.channel.send(`\`\`\`${bigText}\`\`\``);

    }
}