const Client = require('nekos.life');
const neko = new Client();

module.exports = {
    name: "cuddle",
    description: "cuddle a user",
    usage: "cuddle @<member>",
    timeout: 3000,
    run: async(client, message, args) => {
        try{

        const member = message.mentions.members.first() || message.author;
        const hugged = message.author.id === member.id ? "themselfs" : member.user.username;

        neko.sfw.pat().then(m => message.channel.send({embed:{
            title: `${message.author.username} cuddled ${hugged}`,
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