let snekfetch = require("snekfetch");
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "shorten",
    description: "Shortens the given URL",
    usage: "shorten <link>",
    timeout: 3000,
    run: async (client, message, args) => {
        try{

        let url = args.join(" ");

        if(!url) {
            message.channel.send("Please specify an url to shorten.")
        }

        let res = `https://is.gd/create.php?format=simple&url=${url}`;
        snekfetch.get(res).then(r => message.channel.send(`Shortened URL: <${decodeURIComponent(r.body)}>`))
    } catch(err) {
        console.error(err)
        return message.channel.send("An error occurred while processing the command.")
    }  
    }
}