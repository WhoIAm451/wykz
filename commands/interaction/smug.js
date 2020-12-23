const Client = require('nekos.life');
const neko = new Client();

module.exports = {
    name: "smug",
    description: "smug :)",
    usage: "smug",
    timeout: 3000,
    run: async(client, message, args) => {
        try{

        neko.sfw.smug().then(m => message.channel.send({embed:{
            title: `${message.author.username} smug`,
            color: Math.floor(Math.random() * 16777214) + 1,
            image:{
                url:m.url
            },
            timestamp:new Date(),
        footer:{
            icon_url:client.user.avatarURL(),
            text:`Lumi ™`
        }
    }}))
    } catch(err) {
        console.error(err)
        return message.channel.send("An error occurred while processing the command.")
    }
    }
}