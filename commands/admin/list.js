const schema = require('../../models/custom-commands');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "cc-list",
    aliases : ['ccl'],
    description: 'The list of all custom command.',
    timeout: 5000,
    run: async(client, message, args) => {
        try{
        schema.findOne({ Guild : message.guild.id }, async(err, data) => {
        
        if(!data) return message.channel.send('There is no custom commands.');
        const data2  = await schema.find({ Guild: message.guild.id });
        message.channel.send(
            new MessageEmbed()
                .setColor('BLUE')
                .setTimestamp()
                .setFooter(`Lumi ™`, client.user.avatarURL())
                .setDescription(
                    data2.map((cmd, i) => 
                        `${i + 1}: ${cmd.Command}`
                    ).join('\n')
                )
        )
                })
    } catch(err) {
        console.error(err)
        return message.channel.send("An error occurred while processing the command.")
    }
    }
}
