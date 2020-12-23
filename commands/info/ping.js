const { MessageEmbed } = require('discord.js')
module.exports = {
    name : 'ping',
    description : 'Returns latency and API ping',
    timeout: 3000,

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run : async(client, message, args) => {
        try {
        const msg = await message.channel.send(`🏓 Pinging...`)
        const embed = new MessageEmbed()
            .setTitle('Pong!')
            .setDescription(`WebSocket ping is ${client.ws.ping}MS\nMessage edit ping is ${Math.floor(msg.createdAt - message.createdAt)}MS!`)
            await message.channel.send(embed)
            msg.delete()
        } catch(err) {
            console.error(err)
            return message.channel.send("An error occurred while processing the command.")
        }

    }
}
