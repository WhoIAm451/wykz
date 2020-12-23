const schema = require('../../models/custom-commands');

module.exports = {
    name: 'cc-delete',
    aliases : ['ccd'],
    usage: '<command name>',
    description: 'delete a custom command.',
    timeout: 5000,
    run: async(client, message, args) => {
        try{
        if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('You do not have permissions.');

        const name = args[0];

        if(!name) return message.channel.send('Please specify a command name.');

        const data = await schema.findOne({ Guild: message.guild.id, Command: name });
        if(!data) return message.channel.send('That custom command does not exist!');
        await schema.findOneAndDelete({ Guild: message.guild.id, Command: name });
        message.channel.send(`Removed **${name}** from custom commands!`);
    } catch(err) {
        console.error(err)
        return message.channel.send("An error occurred while processing the command.")
    }
    }
}