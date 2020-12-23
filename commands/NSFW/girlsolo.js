const Client = require('nekos.life');
const neko = new Client();

module.exports = {
    name: "girlsolo",
    description: "random nsfw girl solo",
    usage: "girlsolo",
    timeout: 3000,
    run: async(client, message, args) => {
        try{
        if (!message.channel.nsfw) return message.channel.send("This is not an nsfw channel.")

        let gayrate = Math.floor(Math.random() * 3);
        if (gayrate = 1) {
        neko.nsfw.girlSolo().then(m => message.channel.send({embed:{
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
    } else {
        neko.nsfw.girlSoloGif().then(m => message.channel.send({embed:{
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
    }   
    } catch(err) {
        console.error(err)
        return message.channel.send("An error occurred while processing the command.")
    }
    }
}