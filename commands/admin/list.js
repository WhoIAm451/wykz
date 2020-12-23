const schema = require('../../models/custom-commands');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "cc-list",
    aliases : ['ccl'],
    description: 'The list of all custom command.',
    timeout: 5000,
    run: async(client, message, args) => {
        try{
        const data  = await schema.find({ Guild: message.guild.id });
        if(!!data === false) return message.channel.send('There is no custom commands.');
        message.channel.send(
            new MessageEmbed()
                .setColor('BLUE')
                .setTimestamp()
                .setFooter(`Lumi ™`, client.user.avatarURL())
                .setDescription(
                    data.map((cmd, i) => 
                        `${i + 1}: ${cmd.Command}`
                    ).join('\n')
                )
        )
    } catch(err) {
        console.error(err)
        return message.channel.send("An error occurred while processing the command.")
    }
    }
}